import{css as t,LitElement as e,html as i}from"lit";const n=(...t)=>console.info("[Better Cards]",...t),o="Better Switch Card",a=["switch","light","input_boolean"],s={entity:"",name:"",icon:"",animation_duration:500},c=t`
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
`;await import("https://unpkg.com/custom-card-helpers@1.9.0/dist/index.js?module"),await import("https://www.home-assistant.io/package/ha-entity-picker.js?type=module"),await import("https://www.home-assistant.io/package/ha-icon-picker.js?type=module");class r extends e{static get properties(){return{hass:{type:Object},_config:{type:Object}}}setConfig(t){console.log("Editor setConfig called with:",t),this._config={...t}}get _entity(){return console.log("Getting entity value:",this._config?.entity),this._config?.entity||""}get _name(){return this._config?.name||""}get _icon(){return this._config?.icon||""}get _animation_duration(){return this._config?.animation_duration||500}get getEntitiesInDomain(){return this.hass?Object.keys(this.hass.states).filter((t=>a.includes(t.split(".")[0]))):[]}valueChanged(t){if(console.log("Value changed event:",t),!this._config)return;const e=t.target,i=t.detail?.value??e.value,n=e.configValue;if(console.log("Updating config:",{configValue:n,value:i}),!n)return;let o={...this._config,[n]:i};"animation_duration"===n&&(o[n]=parseInt(i,10));const a=new CustomEvent("config-changed",{detail:{config:o},bubbles:!0,composed:!0});console.log("Dispatching config-changed event:",a),this.dispatchEvent(a)}connectedCallback(){super.connectedCallback(),console.log("Editor connected")}firstUpdated(){console.log("Editor first updated")}updated(t){console.log("Editor updated:",t)}render(){return console.log("Editor rendering with config:",this._config),this._config?(this.getEntitiesInDomain,i`
      <div class="card-config">
        <div class="side-by-side">
          <ha-entity-picker
            .label="Entity (Required)"
            .hass=${this.hass}
            .value=${this._entity}
            .configValue=${"entity"}
            .includeDomains=${a}
            @value-changed=${this.valueChanged}
          ></ha-entity-picker>
        </div>

        <div class="side-by-side">
          <paper-input
            label="Name"
            .value=${this._name}
            .configValue=${"name"}
            @value-changed=${this.valueChanged}
          ></paper-input>
          
          <ha-icon-picker
            .label="Icon"
            .value=${this._icon}
            .configValue=${"icon"}
            @value-changed=${this.valueChanged}
          ></ha-icon-picker>
        </div>

        <div class="side-by-side">
          <paper-input
            label="Animation Duration (ms)"
            type="number"
            min="100"
            step="100"
            .value=${this._animation_duration}
            .configValue=${"animation_duration"}
            @value-changed=${this.valueChanged}
          ></paper-input>
        </div>
      </div>
    `):i``}static get styles(){return t`
      .card-config {
        padding: 16px;
      }
      .side-by-side {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 8px 0;
      }
      ha-entity-picker {
        width: 100%;
      }
      paper-input {
        width: 100%;
      }
      paper-input[type="number"] {
        width: 100%;
      }
    `}}customElements.define("better-switch-card-editor",r);var d=Object.freeze({__proto__:null,BetterSwitchCardEditor:r});console.info(`%c ${o} %c 1.0.0 `,"color: white; background: #555; font-weight: 700;","color: white; background: #000; font-weight: 700;"),window.customCards=window.customCards||[],window.customCards.push({type:"better-switch-card",name:o,description:"A stylish switch card with animations",preview:!0});customElements.define("better-switch-card",class extends e{static get properties(){return{hass:{type:Object},config:{type:Object}}}static get styles(){return c}static async getConfigElement(){return await Promise.resolve().then((function(){return d})),document.createElement("better-switch-card-editor")}static getStubConfig(){return{entity:"",name:"",icon:"",animation_duration:500}}setConfig(t){if(!t.entity)throw new Error("Please define an entity");this.config={...s,...t}}_toggle(t){t.stopPropagation(),t.preventDefault();const e=this.hass.states[this.config.entity];if(!e)return;const i="on"===e.state?"turn_off":"turn_on",[n]=this.config.entity.split(".");this.hass.callService(n,i,{entity_id:this.config.entity})}render(){if(!this.hass||!this.config)return i``;const t=this.hass.states[this.config.entity];if(!t)return i`
        <ha-card>
          <div class="warning">
            Entity not found: ${this.config.entity}
          </div>
        </ha-card>
      `;const e="on"===t.state,n=this.config.name||t.attributes.friendly_name,o=this.config.icon||(e?"mdi:toggle-switch":"mdi:toggle-switch-off");return i`
      <ha-card>
        <button 
          class="toggle-button ${e?"on":"off"}"
          @click="${this._toggle}"
          type="button"
          style="--animation-duration: ${this.config.animation_duration}ms"
        >
          <div class="toggle-text">
            <span class="room-name">${n}</span>
            <span class="status">${e?"On":"Off"}</span>
          </div>
          <div class="icon-container">
            <ha-icon .icon=${o}></ha-icon>
          </div>
        </button>
      </ha-card>
    `}}),n("Better Cards loaded");
//# sourceMappingURL=index.js.map
