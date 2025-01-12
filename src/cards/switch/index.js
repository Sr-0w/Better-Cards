// index.js
import { LitElement, html } from 'lit';
import { DEFAULT_CONFIG, CARD_VERSION, CARD_NAME } from './const';
import { styles } from './styles';
import './editor';

console.info(
  `%c ${CARD_NAME} %c ${CARD_VERSION} `,
  'color: white; background: #555; font-weight: 700;',
  'color: white; background: #000; font-weight: 700;',
);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "better-switch-card",
  name: CARD_NAME,
  description: "A stylish switch card with animations",
  preview: true
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
    await import('./editor');
    return document.createElement("better-switch-card-editor");
  }

  static getStubConfig() {
    return {
      entity: "",
      name: "",
      icon: "",
      animation_duration: 500,
    };
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("Please define an entity");
    }
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  _toggle(e) {
    e.stopPropagation();
    e.preventDefault();
    
    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) return;

    const service = stateObj.state === 'on' ? 'turn_off' : 'turn_on';
    const [domain] = this.config.entity.split('.');
    
    this.hass.callService(domain, service, {
      entity_id: this.config.entity,
    });
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
    const icon = this.config.icon || 
                (isOn ? 'mdi:toggle-switch' : 'mdi:toggle-switch-off');

    return html`
      <ha-card>
        <button 
          class="toggle-button ${isOn ? 'on' : 'off'}"
          @click="${this._toggle}"
          type="button"
          style="--animation-duration: ${this.config.animation_duration}ms"
        >
          <div class="toggle-text">
            <span class="room-name">${name}</span>
            <span class="status">${isOn ? 'On' : 'Off'}</span>
          </div>
          <div class="icon-container">
            <ha-icon .icon=${icon}></ha-icon>
          </div>
        </button>
      </ha-card>
    `;
  }
}

customElements.define('better-switch-card', BetterSwitchCard);

export default BetterSwitchCard;