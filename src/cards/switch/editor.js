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
      select {
        width: 100%;
        height: 40px;
        padding: 8px;
        border-radius: 4px;
        background: var(--card-background-color, white);
        border: 1px solid var(--divider-color, #e0e0e0);
        color: var(--primary-text-color);
        font-size: 16px;
      }
      .select-container {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
    `;
  }

  // ... rest of the code remains the same until render()

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const entities = this.getEntitiesInDomain;

    return html`
      <div class="card-config">
        <div class="overall-config">
          <div class="editor-side-by-side">
            <div class="select-container">
              <span class="editor-label">Entity (Required)</span>
              <select
                .value=${this._entity}
                .configValue=${'entity'}
                @change=${this.valueChanged}
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

          <!-- Rest of the form remains the same -->
        </div>
      </div>
    `;
  }
}