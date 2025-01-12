import { html, nothing } from "lit";
import { fireEvent } from "custom-card-helpers";

class BetterSwitchCardEditor extends HTMLElement {
  constructor() {
    super();
    this._config = {};
  }

  setConfig(config) {
    this._config = config;
  }

  _computeLabel(schema) {
    const labels = {
      entity: "Entity (Required)",
      name: "Name (Optional)",
      icon: "Icon",
      animation_duration: "Animation Duration (ms)",
    };
    return labels[schema.name] || schema.name;
  }

  render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    const schema = [
      { name: "entity", selector: { entity: { domain: ["switch", "light", "input_boolean"] } } },
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      { name: "animation_duration", selector: { number: { mode: "box", min: 100, step: 100 } } },
    ];

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  _valueChanged(ev) {
    fireEvent(this, "config-changed", { config: ev.detail.value });
  }
}

customElements.define("better-switch-card-editor", BetterSwitchCardEditor);

export default BetterSwitchCardEditor;