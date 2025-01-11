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

  get _entity() {
    return this._config.entity || '';
  }

  get _name() {
    return this._config.name || '';
  }

  get _icon() {
    return this._config.icon || '';
  }

  get _animation_duration() {
    return this._config.animation_duration || 500;
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <ha-entity-picker
          .hass="${this.hass}"
          .value="${this._entity}"
          .configValue="entity"
          .includeDomains='["switch", "light", "input_boolean"]'
          @value-changed="${this._valueChanged}"
          label="Entity (Required)"
        ></ha-entity-picker>
        
        <ha-textfield
          label="Name (Optional)"
          .value="${this._name}"
          .configValue="name"
          @input="${this._valueChanged}"
        ></ha-textfield>

        <ha-icon-picker
          .hass="${this.hass}"
          .value="${this._icon}"
          .configValue="icon"
          @value-changed="${this._valueChanged}"
          label="Icon (Optional)"
        ></ha-icon-picker>
        
        <ha-textfield
          label="Animation Duration (ms)"
          type="number"
          .value="${this._animation_duration}"
          .configValue="animation_duration"
          @input="${this._valueChanged}"
        ></ha-textfield>
      </div>
    `;
  }

  _valueChanged(ev) {
    if (!this._config || !this.hass) return;

    const target = ev.target;
    if (!target.configValue) return;

    let newValue = ev.detail?.value || target.value;
    
    if (target.configValue === 'animation_duration') {
      newValue = parseInt(newValue) || 500;
    }

    const newConfig = {
      ...this._config,
      [target.configValue]: newValue
    };

    const event = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }
}

customElements.define('better-switch-card-editor', BetterSwitchCardEditor);