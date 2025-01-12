import { LitElement, html, css } from 'lit';
import { fireEvent } from 'custom-card-helpers';
import { DOMAINS } from './const';

export class BetterSwitchCardEditor extends LitElement {
  static get styles() {
    return css`
      .card-config {
        padding: 16px;
      }
      .editor-side-by-side {
        display: flex;
        margin: 8px 0;
      }
      .editor-side-by-side > * {
        flex: 1;
        padding-right: 4px;
      }
      .editor-label {
        margin-left: 6px;
        font-size: 0.8em;
        opacity: 0.75;
      }
      paper-input {
        width: 100%;
      }
    `;
  }

  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
    };
  }

  setConfig(config) {
    this._config = { ...config };
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

  get getEntitiesInDomain() {
    return Object.keys(this.hass.states).filter(
      eid => DOMAINS.includes(eid.split('.')[0])
    );
  }

  valueChanged(ev) {
    if (!this._config || !this.hass) {
      return;
    }
    
    const target = ev.target;
    if (this[`_${target.configValue}`] === target.value) {
      return;
    }

    let newValue = target.value;
    if (target.configValue === 'animation_duration') {
      newValue = parseInt(newValue, 10);
    }

    if (newValue === '') {
      delete this._config[target.configValue];
    } else {
      this._config = {
        ...this._config,
        [target.configValue]: newValue
      };
    }
    
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
            <div>
              <span class="editor-label">Entity (Required)</span>
              <select
                .value=${this._entity}
                .configValue=${'entity'}
                @change=${this.valueChanged}
                class="dropdown"
              >
                <option value="">Select entity</option>
                ${entities.map(entity => html`
                  <option value=${entity} ?selected=${entity === this._entity}>
                    ${entity}
                  </option>
                `)}
              </select>
            </div>
          </div>

          <div class="editor-side-by-side">
            <paper-input
              label="Name"
              .value=${this._name}
              .configValue=${'name'}
              @value-changed=${this.valueChanged}
            ></paper-input>

            <paper-input
              label="Icon"
              .value=${this._icon}
              .configValue=${'icon'}
              @value-changed=${this.valueChanged}
            ></paper-input>
          </div>

          <div class="editor-side-by-side">
            <paper-input
              label="Animation Duration (ms)"
              type="number"
              min="100"
              step="100"
              .value=${this._animation_duration}
              .configValue=${'animation_duration'}
              @value-changed=${this.valueChanged}
            ></paper-input>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('better-switch-card-editor', BetterSwitchCardEditor);