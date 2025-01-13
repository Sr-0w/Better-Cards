// editor.js
import { LitElement, html } from 'lit';
import { fireEvent } from 'custom-card-helpers';
import { DOMAINS } from './const';

const SCHEMA = [
  { 
    name: "entity", 
    selector: { 
      entity: { domain: DOMAINS } 
    } 
  },
  { 
    name: "name", 
    selector: { 
      text: {} 
    } 
  },
  {
    type: "grid",
    name: "",
    schema: [
      { 
        name: "icon",
        selector: { 
          icon: {} 
        }
      }
    ]
  },
  { 
    name: "animation_duration", 
    selector: { 
      number: {
        min: 100,
        step: 100,
        mode: "box",
        unit_of_measurement: "ms"
      } 
    } 
  }
];

export class BetterSwitchCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
      _loaded: { type: Boolean, state: true }
    };
  }

  constructor() {
    super();
    this._loaded = false;
  }

  setConfig(config) {
    this._config = { ...config };
  }

  async firstUpdated() {
    await this._loadComponents();
  }

  async _loadComponents() {
    if (!window.customCards) window.customCards = [];

    // Make sure we only load components once
    if (this._loaded) return;

    try {
      if (!customElements.get('ha-form')) {
        await customElements.whenDefined('hui-action-editor');
        const helpers = await window.loadCardHelpers();
        if (helpers) {
          await helpers.importMoreInfoControl("light");
        }
      }

      // Wait a bit to ensure everything is properly registered
      await new Promise(resolve => setTimeout(resolve, 0));
      this._loaded = true;
      await this.updateComplete;
    } catch (error) {
      console.error("Failed to load components:", error);
    }
  }

  _valueChanged(ev) {
    if (!this._config || !this.hass) return;
    
    const config = ev.detail.value;
    fireEvent(this, 'config-changed', { config });
  }

  render() {
    if (!this.hass || !this._config || !this._loaded) {
      return html`<div>Loading editor...</div>`;
    }

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${(schema) => schema.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}

// Important: Register the editor element AFTER the class definition
if (!customElements.get('better-switch-card-editor')) {
  customElements.define('better-switch-card-editor', BetterSwitchCardEditor);
}
