import { LitElement, html } from 'lit';
import { DEFAULT_CONFIG, CARD_VERSION, CARD_NAME } from './const';
import { styles } from './styles';
import './editor';  // Just import the file, don't try to get the class
import { log, throwError } from '../../shared/utils';

log.info(
  `%c ${CARD_NAME} %c ${CARD_VERSION} `,
  'color: white; background: #555; font-weight: 700;',
  'color: white; background: #000; font-weight: 700;',
);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "better-switch-card",
  name: CARD_NAME,
  description: "A stylish switch card with animations",
  preview: true,
});

class BetterSwitchCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
    };
  }

  static get styles() {
    return styles;
  }

  static async getConfigElement() {
    return document.createElement("better-switch-card-editor");
  }

  static getStubConfig() {
    return DEFAULT_CONFIG;
  }

  setConfig(config) {
    if (!config.entity) {
      throwError("Please define an entity");
    }
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  getCardSize() {
    return 3;
  }

  render() {
    if (!this.hass || !this.config) {
      return html``;
    }

    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) {
      return html`
        <ha-card>
          <div class="warning">
            Entity not found: ${this.config.entity}
          </div>
        </ha-card>
      `;
    }

    const isOn = stateObj.state === 'on';
    const name = this.config.name || stateObj.attributes.friendly_name;

    return html`
      <ha-card>
        <button 
          class="toggle-button ${isOn ? 'on' : 'off'}"
          @click="${this._toggle}"
          style="--animation-duration: ${this.config.animation_duration}ms"
        >
          <div class="toggle-text">
            <span class="room-name">${name}</span>
            <span class="status">${isOn ? 'On' : 'Off'}</span>
          </div>
          
          <div class="icon-container">
            <ha-icon
              .icon=${isOn ? 'mdi:white-balance-sunny' : 'mdi:moon-waning-crescent'}
            ></ha-icon>
          </div>
          
          ${this.config.show_slider ? html`
            <div class="switch-slider">
              <ha-slider
                .min=${0}
                .max=${100}
                .value=${isOn ? 100 : 0}
                @change=${this._handleSlider}
              ></ha-slider>
            </div>
          ` : ''}
        </button>
      </ha-card>
    `;
  }

  _toggle(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const service = this.hass.states[this.config.entity].state === 'on' ? 'turn_off' : 'turn_on';
    this.hass.callService('switch', service, {
      entity_id: this.config.entity,
    });
  }

  _handleSlider(e) {
    e.stopPropagation();
    
    const value = e.target.value;
    const service = value > 0 ? 'turn_on' : 'turn_off';
    
    this.hass.callService('switch', service, {
      entity_id: this.config.entity
    });
  }
}

customElements.define('better-switch-card', BetterSwitchCard);