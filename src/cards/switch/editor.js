// editor.js
import { LitElement, html, css } from 'lit';
import { DOMAINS } from './const';

// Import required Home Assistant components
await import('https://unpkg.com/custom-card-helpers@1.9.0/dist/index.js?module');
await import('https://www.home-assistant.io/package/ha-entity-picker.js?type=module');
await import('https://www.home-assistant.io/package/ha-icon-picker.js?type=module');

export class BetterSwitchCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
    };
  }

  setConfig(config) {
    console.log('Editor setConfig called with:', config);
    this._config = { ...config };
  }

  get _entity() {
    console.log('Getting entity value:', this._config?.entity);
    return this._config?.entity || '';
  }

  get _name() {
    return this._config?.name || '';
  }

  get _icon() {
    return this._config?.icon || '';
  }

  get _animation_duration() {
    return this._config?.animation_duration || 500;
  }

  get getEntitiesInDomain() {
    if (!this.hass) return [];
    return Object.keys(this.hass.states).filter(
      eid => DOMAINS.includes(eid.split('.')[0])
    );
  }

  valueChanged(ev) {
    console.log('Value changed event:', ev);
    if (!this._config) return;

    const target = ev.target;
    const value = ev.detail?.value ?? target.value;
    const configValue = target.configValue;
    
    console.log('Updating config:', { configValue, value });
    
    if (!configValue) return;

    let newConfig = {
      ...this._config,
      [configValue]: value
    };

    if (configValue === 'animation_duration') {
      newConfig[configValue] = parseInt(value, 10);
    }

    // Fire the config changed event
    const event = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true
    });
    console.log('Dispatching config-changed event:', event);
    this.dispatchEvent(event);
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('Editor connected');
  }

  firstUpdated() {
    console.log('Editor first updated');
  }

  updated(changedProps) {
    console.log('Editor updated:', changedProps);
  }

  render() {
    console.log('Editor rendering with config:', this._config);
    if (!this._config) {
      return html``;
    }

    const entities = this.getEntitiesInDomain;

    return html`
      <div class="card-config">
        <div class="side-by-side">
          <ha-entity-picker
            .label="Entity (Required)"
            .hass=${this.hass}
            .value=${this._entity}
            .configValue=${"entity"}
            .includeDomains=${DOMAINS}
            @value-changed=${this.valueChanged}
          ></ha-entity-picker>
        </div>

        <div class="side-by-side">
          <paper-input
            label="Name"
            .value=${this._name}
            .configValue=${"name"}
            @value-changed=${this.valueChanged}
          ></paper-input>
          
          <ha-icon-picker
            .label="Icon"
            .value=${this._icon}
            .configValue=${"icon"}
            @value-changed=${this.valueChanged}
          ></ha-icon-picker>
        </div>

        <div class="side-by-side">
          <paper-input
            label="Animation Duration (ms)"
            type="number"
            min="100"
            step="100"
            .value=${this._animation_duration}
            .configValue=${"animation_duration"}
            @value-changed=${this.valueChanged}
          ></paper-input>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .card-config {
        padding: 16px;
      }
      .side-by-side {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 8px 0;
      }
      ha-entity-picker {
        width: 100%;
      }
      paper-input {
        width: 100%;
      }
      paper-input[type="number"] {
        width: 100%;
      }
    `;
  }
}

customElements.define('better-switch-card-editor', BetterSwitchCardEditor);