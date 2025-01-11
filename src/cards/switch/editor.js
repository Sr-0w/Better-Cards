import { LitElement, html } from 'lit';
import { DEFAULT_CONFIG } from './const';

export class BetterSwitchCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
    };
  }

  setConfig(config) {
    this._config = { ...DEFAULT_CONFIG, ...config };
  }

  // This prevents a card-editor background
  static get styles() {
    return '';
  }

  async firstUpdated() {
    // Load card-tools for better editor support
    await this.loadCardHelpers();
  }

  async loadCardHelpers() {
    this._helpers = await window.loadCardHelpers();
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <div class="side-by-side">
          <paper-input
            label="Entity (Required)"
            .value="${this._config.entity}"
            .configValue="entity"
            @value-changed="${this._valueChanged}"
          ></paper-input>
        </div>
        <div class="side-by-side">
          <paper-input
            label="Name (Optional)"
            .value="${this._config.name || ''}"
            .configValue="name"
            @value-changed="${this._valueChanged}"
          ></paper-input>
        </div>
        <div class="side-by-side">
          <paper-input
            label="Icon (Optional)"
            .value="${this._config.icon || ''}"
            .configValue="icon"
            @value-changed="${this._valueChanged}"
          ></paper-input>
        </div>
        <div class="side-by-side">
          <paper-input
            label="Animation Duration (ms)"
            type="number"
            .value="${this._config.animation_duration || 500}"
            .configValue="animation_duration"
            @value-changed="${this._valueChanged}"
          ></paper-input>
        </div>
      </div>
    `;
  }

  _valueChanged(ev) {
    if (!this._config || !this.hass) return;

    const target = ev.target;
    const value = target.value || '';
    
    if (this[`_${target.configValue}`] === value) return;

    let newConfig;
    if (target.configValue) {
      if (target.type === 'number') {
        newConfig = { 
          ...this._config,
          [target.configValue]: parseInt(value) || 500
        };
      } else {
        newConfig = {
          ...this._config,
          [target.configValue]: value
        };
      }
    }

    const event = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}

customElements.define('better-switch-card-editor', BetterSwitchCardEditor);