import { LitElement, html } from 'lit';
import { DEFAULT_CONFIG, CARD_VERSION, CARD_NAME } from './const';
import { styles } from './styles';
import { SmartLightCardEditor } from './editor';

console.info(
  `%c ${CARD_NAME} %c ${CARD_VERSION} `,
  'color: white; background: #555; font-weight: 700;',
  'color: white; background: #000; font-weight: 700;',
);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "smart-light-card",
  name: CARD_NAME,
  description: "A stylish light control card with animations",
  preview: true,
});

class SmartLightCard extends LitElement {
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
    return document.createElement("smart-light-card-editor");
  }

  static getStubConfig() {
    return DEFAULT_CONFIG;
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("Please define an entity");
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
    const brightness = stateObj.attributes.brightness || 0;
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
          
          ${this.config.show_brightness ? html`
            <div class="brightness-slider">
              <ha-slider
                .min=${0}
                .max=${255}
                .value=${brightness}
                @change=${this._setBrightness}
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
    
    this.hass.callService('light', this.hass.states[this.config.entity].state === 'on' ? 'turn_off' : 'turn_on', {
      entity_id: this.config.entity,
    });
  }

  _setBrightness(e) {
    e.stopPropagation();
    
    this.hass.callService('light', 'turn_on', {
      entity_id: this.config.entity,
      brightness: e.target.value,
    });
  }
}

customElements.define('smart-light-card', SmartLightCard);
customElements.define('smart-light-card-editor', SmartLightCardEditor);
