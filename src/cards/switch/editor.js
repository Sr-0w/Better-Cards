import { LitElement, html } from 'lit';
import { DEFAULT_CONFIG } from './const';

export class BetterSwitchCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
    };
  }

  async firstUpdated() {
    await this._loadComponents();
  }

  async _loadComponents() {
    if (!customElements.get("ha-form")) {
      await customElements.whenDefined("hui-button-card");
    }
  }

  setConfig(config) {
    this._config = { ...DEFAULT_CONFIG, ...config };
  }

  static get styles() {
    return '';
  }

  _valueChanged(ev) {
    const config = ev.detail.value;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  get _entity() {
    return this._config.entity || '';
  }

  get _name() {
    return this._config.name || '';
  }

  get _icon() {
    return this._config.icon || '';
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <paper-input
          label="Entity (Required)"
          .value="${this._entity}"
          .configValue=${'entity'}
          @value-changed=${this._valueChanged}
        ></paper-input>

        <paper-input
          label="Name (Optional)"
          .value="${this._name}"
          .configValue=${'name'}
          @value-changed=${this._valueChanged}
        ></paper-input>

        <paper-input
          label="Icon (Optional)"
          .value="${this._icon}"
          .configValue=${'icon'}
          @value-changed=${this._valueChanged}
        ></paper-input>
        
        <paper-input
          label="Animation Duration (ms)"
          type="number"
          .value="${this._config.animation_duration}"
          .configValue=${'animation_duration'}
          @value-changed=${this._valueChanged}
        ></paper-input>
      </div>
    `;
  }
}

if (!customElements.get('better-switch-card-editor')) {
  customElements.define('better-switch-card-editor', BetterSwitchCardEditor);
}