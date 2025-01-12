// editor.js
import { LitElement, html, css } from 'lit';
import { fireEvent, createThing } from 'custom-card-helpers';
import { DOMAINS } from './const';

export class BetterSwitchCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
    };
  }

  setConfig(config) {
    this._config = { ...config };
  }

  firstUpdated() {
    // Ensure all custom elements are loaded
    customElements.whenDefined('ha-entity-picker').then(() => {
      this.requestUpdate();
    });
  }

  get _entity() {
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

  valueChanged(ev) {
    if (!this._config || !this.hass) return;

    const target = ev.target;
    const value = ev.detail?.value ?? target.value;
    const configValue = target.configValue;
    
    if (!configValue) return;

    let newConfig = {
      ...this._config,
      [configValue]: value
    };

    if (configValue === 'animation_duration') {
      newConfig[configValue] = parseInt(value, 10) || 500;
    }

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  render() {
    if (!this._config || !this.hass) {
      return html``;
    }

    return html`
      <div class="card-config">
        <div class="side-by-side">
          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._entity}
            .configValue=${"entity"}
            .includeDomains=${DOMAINS}
            @value-changed=${this.valueChanged}
            allow-custom-entity
          ></ha-entity-picker>
        </div>

        <div class="side-by-side">
          <ha-textfield
            label="Name"
            .value=${this._name}
            .configValue=${"name"}
            @input=${this.valueChanged}
          ></ha-textfield>
          
          <ha-icon-picker
            label="Icon"
            .value=${this._icon}
            .configValue=${"icon"}
            @value-changed=${this.valueChanged}
          ></ha-icon-picker>
        </div>

        <div class="side-by-side">
          <ha-textfield
            label="Animation Duration (ms)"
            type="number"
            min="100"
            step="100"
            .value=${this._animation_duration}
            .configValue=${"animation_duration"}
            @input=${this.valueChanged}
          ></ha-textfield>
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
      ha-entity-picker,
      ha-textfield {
        width: 100%;
      }
    `;
  }
}

customElements.define('better-switch-card-editor', BetterSwitchCardEditor);