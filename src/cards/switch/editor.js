import { LitElement, html, css } from 'lit';

export class BetterSwitchCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
    };
  }

  static get styles() {
    return css`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
      }

      h2 {
        font-size: 1.25rem;
        font-weight: bold;
        margin: 0 0 8px;
        color: var(--primary-text-color, #000);
      }

      ha-entity-picker {
        width: 100%;
      }

      ha-textfield,
      ha-icon-picker {
        width: 100%;
      }
    `;
  }

  setConfig(config) {
    this.config = config;
  }

  get _entity() {
    return this.config?.entity || '';
  }

  get _name() {
    return this.config?.name || '';
  }

  get _icon() {
    return this.config?.icon || '';
  }

  get _animation_duration() {
    return this.config?.animation_duration || 500;
  }

  _valueChanged(ev) {
    if (!this.config || !this.hass) return;

    const target = ev.target;
    if (!target.configValue) return;

    const newValue = ev.detail?.value || target.value;

    const newConfig = {
      ...this.config,
      [target.configValue]: newValue,
    };

    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    if (!this.hass || !this.config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <h2>General Settings</h2>
        <!-- Entity Picker -->
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._entity}
          .configValue=${"entity"}
          .includeDomains=${["switch", "light", "input_boolean"]}
          @value-changed=${this._valueChanged}
          label="Select Entity"
        ></ha-entity-picker>

        <!-- Name Field -->
        <ha-textfield
          label="Custom Name (Optional)"
          .value=${this._name}
          .configValue=${"name"}
          @input=${this._valueChanged}
        ></ha-textfield>

        <h2>Appearance</h2>
        <!-- Icon Picker -->
        <ha-icon-picker
          .hass=${this.hass}
          .value=${this._icon}
          .configValue=${"icon"}
          @value-changed=${this._valueChanged}
          label="Select Icon"
        ></ha-icon-picker>

        <!-- Animation Duration -->
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

customElements.define('better-switch-card-editor', BetterSwitchCardEditor);