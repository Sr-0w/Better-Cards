// editor.js
import { LitElement, html, css } from 'lit';
import { fireEvent } from 'custom-card-helpers';
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

  _valueChanged(ev) {
    const target = ev.target;
    const value = ev.detail?.value || target.value;
    
    if (this._config) {
      const newConfig = {
        ...this._config,
        [target.configValue]: value
      };
      
      fireEvent(this, 'config-changed', { config: newConfig });
    }
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <div class="values">
          <ha-selector-entity
            .hass=${this.hass}
            .value=${this._config.entity}
            .configValue=${"entity"}
            .includeDomains=${DOMAINS}
            .required=${true}
            @value-changed=${this._valueChanged}
          ></ha-selector-entity>
        </div>
        <div class="values">
          <ha-textfield
            label="Name (Optional)"
            .value=${this._config.name || ''}
            .configValue=${"name"}
            @change=${this._valueChanged}
          ></ha-textfield>
        </div>
        <div class="values">
          <ha-selector-icon
            label="Icon (Optional)"
            .hass=${this.hass}
            .value=${this._config.icon}
            .configValue=${"icon"}
            @value-changed=${this._valueChanged}
          ></ha-selector-icon>
        </div>
        <div class="values">
          <ha-textfield
            label="Animation Duration (ms)"
            type="number"
            .value=${this._config.animation_duration || 500}
            .configValue=${"animation_duration"}
            @change=${this._valueChanged}
          ></ha-textfield>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .values {
        padding-bottom: 8px;
      }
      ha-textfield {
        width: 100%;
      }
    `;
  }
}

customElements.define('better-switch-card-editor', BetterSwitchCardEditor);
