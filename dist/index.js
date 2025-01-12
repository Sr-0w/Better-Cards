import{css as t,LitElement as o,html as i}from"lit";import"custom-card-helpers";const e=(...t)=>console.info("[Better Cards]",...t),n="Better Switch Card",r={entity:"",name:"",icon:"",animation_duration:500},a=t`
  :host {
    display: block;
    height: 100%;
  }

  ha-card {
    height: 100%;
  }

  .toggle-button {
    width: 100%;
    height: 100%;
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    transition: all var(--animation-duration, 500ms) ease-in-out;
    border: none;
    border-radius: var(--ha-card-border-radius, 12px);
    cursor: pointer;
    margin: 0;
    background: var(--ha-card-background, #1c1c1e);
    color: var(--primary-text-color, white);
  }

  .toggle-button.off {
    background-color: var(--ha-card-background, #1c1c1e);
    color: var(--primary-text-color, white);
  }

  .toggle-button.on {
    background-color: white;
    color: black;
  }

  .toggle-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .room-name {
    font-size: 1.15rem;
    font-weight: 500;
    margin-bottom: 4px;
  }

  .status {
    font-size: 0.85rem;
    opacity: 0.8;
  }

  .icon-container {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--animation-duration, 500ms);
  }

  .off .icon-container {
    background-color: white;
    color: var(--ha-card-background, #1c1c1e);
  }

  .on .icon-container {
    background-color: var(--ha-card-background, #1c1c1e);
    color: white;
  }

  .warning {
    display: block;
    color: var(--error-color);
    padding: 16px;
  }

  ha-icon {
    --mdc-icon-size: 24px;
  }
`;e(`%c ${n} %c 1.0.0 `,"color: white; background: #555; font-weight: 700;","color: white; background: #000; font-weight: 700;"),window.customCards=window.customCards||[],window.customCards.push({type:"better-switch-card",name:n,description:"A stylish switch card with animations",preview:!0});customElements.define("better-switch-card",class extends o{static get properties(){return{hass:{type:Object},config:{type:Object}}}static get styles(){return a}static getConfigElement(){return document.createElement("better-switch-card-editor")}static getStubConfig(){return r}setConfig(t){if(!t.entity)throw new Error("Please define an entity");this.config={...r,...t}}_toggle(t){t.stopPropagation(),t.preventDefault();const o=this.hass.states[this.config.entity];if(!o)return;const i="on"===o.state?"turn_off":"turn_on",[e]=this.config.entity.split(".");this.hass.callService(e,i,{entity_id:this.config.entity})}render(){if(!this.hass||!this.config)return i``;const t=this.hass.states[this.config.entity];if(!t)return i`
        <ha-card>
          <div class="warning">
            Entity not found: ${this.config.entity}
          </div>
        </ha-card>
      `;const o="on"===t.state,e=this.config.name||t.attributes.friendly_name,n=this.config.icon||(o?"mdi:toggle-switch":"mdi:toggle-switch-off");return i`
      <ha-card>
        <button 
          class="toggle-button ${o?"on":"off"}"
          @click="${this._toggle}"
          type="button"
        >
          <div class="toggle-text">
            <span class="room-name">${e}</span>
            <span class="status">${o?"On":"Off"}</span>
          </div>
          <div class="icon-container">
            <ha-icon .icon=${n}></ha-icon>
          </div>
        </button>
      </ha-card>
    `}}),e("Better Cards loaded");
//# sourceMappingURL=index.js.map
