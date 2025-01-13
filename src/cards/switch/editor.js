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
    };
  }

  setConfig(config) {
    this._config = { ...config };
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadComponents();
  }

  async _loadComponents() {
    if (customElements.get('ha-form')) return;
    
    await customElements.whenDefined('hui-action-editor');
    const helpers = await window.loadCardHelpers();
    if (helpers) await helpers.importMoreInfoControl("light");
  }

  _valueChanged(ev) {
    if (!this._config || !this.hass) return;
    
    const config = ev.detail.value;
    fireEvent(this, 'config-changed', { config });
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
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

customElements.define('better-switch-card-editor', BetterSwitchCardEditor);