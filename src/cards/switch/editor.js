import { LitElement, html } from 'lit';

export class BetterSwitchCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object }
    };
  }

  setConfig(config) {
    this.config = config;
  }

  get _entity() {
    return this.config.entity || '';
  }

  get _name() {
    return this.config.name || '';
  }

  get _icon() {
    return this.config.icon || '';
  }

  get _animation_duration() {
    return this.config.animation_duration || 500;
  }

  _valueChanged(ev) {
    if (!this.config || !this.hass) return;

    const target = ev.target;
    if (!target.configValue) return;

    let newValue = ev.detail?.value || target.value;
    
    if (target.configValue === 'animation_duration') {
      newValue = parseInt(newValue) || 500;
    }

    const newConfig = {
      ...this.config,
      [target.configValue]: newValue
    };

    const event = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  render() {
    if (!this.hass || !this.config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._entity}
          .configValue=${"entity"}
          .includeDomains=${["switch", "light", "input_boolean"]}
          @value-changed=${this._valueChanged}
          label="Entity (Required)"
        ></ha-entity-picker>

        <ha-textfield
          label="Name (Optional)"
          .value=${this._name}
          .configValue=${"name"}
          @input=${this._valueChanged}
        ></ha-textfield>

        <ha-icon-picker
          .hass=${this.hass}
          .value=${this._icon}
          .configValue=${"icon"}
          @value-changed=${this._valueChanged}
        ></ha-icon-picker>

        <ha-textfield
          label="Animation Duration (ms)"
          type="number"
          .value=${this._animation_duration}
          .configValue=${"animation_duration"}
          @input=${this._valueChanged}
        ></ha-textfield>
      </div>
    `;
  }
}

customElements.define("better-switch-card-editor", BetterSwitchCardEditor);