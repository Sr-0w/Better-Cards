import{css as t,nothing as e,html as n,LitElement as i}from"lit";import{fireEvent as o}from"custom-card-helpers";const a=(...t)=>console.info("[Better Cards]",...t),r="Better Switch Card",c={entity:"",name:"",icon:"",animation_duration:500},s=t`
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
`;class d extends HTMLElement{constructor(){super(),this._config={}}setConfig(t){this._config=t}_computeLabel(t){return{entity:"Entity (Required)",name:"Name (Optional)",icon:"Icon",animation_duration:"Animation Duration (ms)"}[t.name]||t.name}render(){if(!this.hass||!this._config)return e;return n`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${[{name:"entity",selector:{entity:{domain:["switch","light","input_boolean"]}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"animation_duration",selector:{number:{mode:"box",min:100,step:100}}}]}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}_valueChanged(t){o(this,"config-changed",{config:t.detail.value})}}customElements.define("better-switch-card-editor",d),a(`%c ${r} %c 1.0.0 `,"color: white; background: #555; font-weight: 700;","color: white; background: #000; font-weight: 700;"),window.customCards=window.customCards||[],window.customCards.push({type:"better-switch-card",name:r,description:"A stylish switch card with animations",preview:!0});customElements.define("better-switch-card",class extends i{static get properties(){return{hass:{type:Object},config:{type:Object}}}static get styles(){return s}static getConfigElement(){return document.createElement("better-switch-card-editor")}static getStubConfig(){return c}setConfig(t){if(!t.entity)throw new Error("Please define an entity");this.config={...c,...t}}_toggle(t){t.stopPropagation(),t.preventDefault();const e=this.hass.states[this.config.entity];if(!e)return;const n="on"===e.state?"turn_off":"turn_on",[i]=this.config.entity.split(".");this.hass.callService(i,n,{entity_id:this.config.entity})}render(){if(!this.hass||!this.config)return n``;const t=this.hass.states[this.config.entity];if(!t)return n`
        <ha-card>
          <div class="warning">
            Entity not found: ${this.config.entity}
          </div>
        </ha-card>
      `;const e="on"===t.state,i=this.config.name||t.attributes.friendly_name,o=this.config.icon||(e?"mdi:toggle-switch":"mdi:toggle-switch-off");return n`
      <ha-card>
        <button 
          class="toggle-button ${e?"on":"off"}"
          @click="${this._toggle}"
          type="button"
        >
          <div class="toggle-text">
            <span class="room-name">${i}</span>
            <span class="status">${e?"On":"Off"}</span>
          </div>
          <div class="icon-container">
            <ha-icon .icon=${o}></ha-icon>
          </div>
        </button>
      </ha-card>
    `}}),a("Better Cards loaded");
//# sourceMappingURL=index.js.map
