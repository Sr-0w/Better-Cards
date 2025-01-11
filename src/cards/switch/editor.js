import { LitElement, html } from 'lit';
import { DEFAULT_CONFIG } from './const';

export class SmartLightCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
    };
  }

  setConfig(config) {
    this._config = { ...DEFAULT_CONFIG, ...config };
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <ha-entity-picker
          .hass="${this.hass}"
          .value="${this._config.entity}"
          .configValue="entity"
          .includeDomains='["light"]'
          @value-changed="${this._valueChanged}"
          label="Entity (Required)"
        ></ha-entity-picker>
        
        <paper-input
          label="Name (Optional)"
          .value="${this._config.name}"
          .configValue="name"
          @value-changed="${this._valueChanged}"
        ></paper-input>
        
        <ha-formfield label="Show Brightness Slider">
          <ha-switch
            .checked=${this._config.show_brightness}
            .configValue="show_brightness"
            @change="${this._valueChanged}"
          ></ha-switch>
        </ha-formfield>
        
        <paper-input
          label="Animation Duration (ms)"
          type="number"
          .value="${this._config.animation_duration}"
          .configValue="animation_duration"
          @value-changed="${this._valueChanged}"
        ></paper-input>
      </div>
    `;
  }

  _valueChanged(ev) {
    if (!this._config || !this.hass) return;

    const target = ev.target;
    if (!target.configValue) return;

    const newConfig = {
      ...this._config,
      [target.configValue]: target.checked !== undefined 
        ? target.checked 
        : ev.detail?.value || target.value
    };

    const event = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }
}
