// editor.js
import { LitElement, html, css } from 'lit';
import { fireEvent, hasConfigOrEntityChanged } from 'custom-card-helpers';
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
    // Ensure editor updates when config changes
    fireEvent(this, 'config-changed', { config: this._config });
  }

  // Add shouldUpdate lifecycle method
  shouldUpdate(changedProps) {
    return hasConfigOrEntityChanged(this, changedProps);
  }

  get _entity() {
    return this._config?.entity || '';
  }

  get getEntitiesInDomain() {
    if (!this.hass) return [];
    return Object.keys(this.hass.states).filter(
      eid => DOMAINS.includes(eid.split('.')[0])
    );
  }

  valueChanged(ev) {
    if (!this._config || !this.hass) return;
    
    const target = ev.target;
    if (target.configValue === undefined) return;

    if (this[`_${target.configValue}`] === target.value) return;

    let newValue = target.value;
    if (target.configValue === 'animation_duration') {
      newValue = parseInt(newValue, 10);
    }

    this._config = {
      ...this._config,
      [target.configValue]: newValue
    };
    
    fireEvent(this, 'config-changed', { config: this._config });
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const entities = this.getEntitiesInDomain;

    return html`
      <div class="card-config">
        <div class="overall-config">
          <div class="editor-side-by-side">
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._entity}
              .configValue=${'entity'}
              .includeDomains=${DOMAINS}
              @value-changed=${this.valueChanged}
              allow-custom-entity
            ></ha-entity-picker>
          </div>

          <div class="editor-side-by-side">
            <ha-textfield
              label="Name"
              .value=${this._config.name || ''}
              .configValue=${'name'}
              @input=${this.valueChanged}
            ></ha-textfield>

            <ha-icon-picker
              label="Icon"
              .value=${this._config.icon || ''}
              .configValue=${'icon'}
              @value-changed=${this.valueChanged}
            ></ha-icon-picker>
          </div>

          <div class="editor-side-by-side">
            <ha-textfield
              label="Animation Duration (ms)"
              type="number"
              min="100"
              step="100"
              .value=${this._config.animation_duration || 500}
              .configValue=${'animation_duration'}
              @input=${this.valueChanged}
            ></ha-textfield>
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    ha-textfield {
      display: block;
      margin: 8px 0;
    }
    
    .editor-side-by-side {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 8px;
      margin: 8px 0;
    }
    
    .card-config {
      padding: 16px;
    }
  `;
}

customElements.define('better-switch-card-editor', BetterSwitchCardEditor);