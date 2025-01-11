import { LitElement, html, nothing } from 'lit';
import { DEFAULT_CONFIG } from './const';

// Form schema definition
const SCHEMA = [
  {
    name: "entity",
    selector: {
      entity: {
        domain: ["switch", "light", "input_boolean"]
      }
    }
  },
  {
    name: "name",
    selector: { text: {} }
  },
  {
    name: "icon",
    selector: { icon: {} }
  },
  {
    name: "animation_duration",
    selector: {
      number: {
        min: 0,
        max: 5000,
        step: 100,
        unit_of_measurement: "ms",
        mode: "box"
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
    this._config = { ...DEFAULT_CONFIG, ...config };
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadComponents();
  }

  async _loadComponents() {
    await Promise.all([
      customElements.whenDefined("ha-form"),
      customElements.whenDefined("ha-entity-picker"),
    ]);
  }

  _computeLabel(schema) {
    switch (schema.name) {
      case "entity":
        return "Entity (Required)";
      case "name":
        return "Name (Optional)";
      case "icon":
        return "Icon (Optional)";
      case "animation_duration":
        return "Animation Duration";
      default:
        return schema.name;
    }
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
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  _valueChanged(ev) {
    const config = ev.detail.value;
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("better-switch-card-editor", BetterSwitchCardEditor);