import { html, LitElement } from "lit";
import { fireEvent } from "custom-card-helpers";
import { DOMAINS } from "./const";

export class BetterSwitchCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
    };
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

  get _entity() {
    return this._config.entity || "";
  }

  get _name() {
    return this._config.name || "";
  }

  get _icon() {
    return this._config.icon || "";
  }

  get _animation_duration() {
    return this._config.animation_duration || 500;
  }

  _valueChanged(ev) {
    if (!this._config || !this.hass) {
      return;
    }
    
    const target = ev.target;
    if (this[`_${target.configValue}`] === target.value) {
      return;
    }

    let newValue = ev.detail?.value || target.value;
    if (target.configValue === 'animation_duration') {
      newValue = parseInt(newValue);
    }

    const newConfig = {
      ...this._config,
      [target.configValue]: newValue
    };
    
    fireEvent(this, "config-changed", { config: newConfig });
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <ha-entity-picker
          .label="${this._computeLabel({ name: 'entity' })}"
          .hass=${this.hass}
          .value=${this._entity}
          .configValue=${"entity"}
          .includeDomains=${DOMAINS}
          @value-changed=${this._valueChanged}
          allow-custom-entity
        ></ha-entity-picker>
        <ha-textfield
          label="${this._computeLabel({ name: 'name' })}"
          .value=${this._name}
          .configValue=${"name"}
          @input=${this._valueChanged}
        ></ha-textfield>
        <ha-icon-picker
          label="${this._computeLabel({ name: 'icon' })}"
          .value=${this._icon}
          .configValue=${"icon"}
          @value-changed=${this._valueChanged}
        ></ha-icon-picker>
        <ha-textfield
          label="${this._computeLabel({ name: 'animation_duration' })}"
          type="number"
          .value=${this._animation_duration}
          .configValue=${"animation_duration"}
          @input=${this._valueChanged}
        ></ha-textfield>
      </div>
    `;
  }

  static styles = {
    card-config: {
      padding: "16px"
    }
  }
}

customElements.define("better-switch-card-editor", BetterSwitchCardEditor);