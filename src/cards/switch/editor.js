// editor.js
import { LitElement, html, nothing } from 'lit';
import { fireEvent } from 'custom-card-helpers';
import { DOMAINS } from './const';

// Keep schema simple but structured like the working example
const SCHEMA = [
  { 
    name: "entity", 
    selector: { 
      entity: { 
        domain: DOMAINS 
      } 
    } 
  },
  { 
    name: "name", 
    selector: { 
      text: {} 
    } 
  },
  { 
    name: "icon", 
    selector: { 
      icon: {} 
    } 
  },
  { 
    name: "animation_duration", 
    selector: { 
      number: {
        min: 100,
        step: 100
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

  _valueChanged(ev) {
    fireEvent(this, 'config-changed', { config: ev.detail.value });
  }

  render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}

customElements.define('better-switch-card-editor', BetterSwitchCardEditor);
