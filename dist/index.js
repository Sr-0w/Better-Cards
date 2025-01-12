import{css as t,LitElement as i,html as e}from"lit";import{fireEvent as n}from"custom-card-helpers";const a=function(){for(var t=arguments.length,i=new Array(t),e=0;e<t;e++)i[e]=arguments[e];return console.info("[Better Cards]",...i)},o="Better Switch Card",r=["switch","light","input_boolean"],s={entity:"",name:"",icon:"",animation_duration:500},c=t`
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
`;class d extends i{static get properties(){return{hass:{type:Object},_config:{type:Object}}}setConfig(t){this._config={...t}}firstUpdated(){customElements.whenDefined("ha-entity-picker").then((()=>{this.requestUpdate()}))}get _entity(){return this._config?.entity||""}get _name(){return this._config?.name||""}get _icon(){return this._config?.icon||""}get _animation_duration(){return this._config?.animation_duration||500}valueChanged(t){if(!this._config||!this.hass)return;const i=t.target,e=t.detail?.value??i.value,a=i.configValue;if(!a)return;let o={...this._config,[a]:e};"animation_duration"===a&&(o[a]=parseInt(e,10)||500),n(this,"config-changed",{config:o})}render(){return this._config&&this.hass?e`
      <div class="card-config">
        <div class="side-by-side">
          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._entity}
            .configValue=${"entity"}
            .includeDomains=${r}
            @value-changed=${this.valueChanged}
            allow-custom-entity
          ></ha-entity-picker>
        </div>

        <div class="side-by-side">
          <ha-textfield
            label="Name"
            .value=${this._name}
            .configValue=${"name"}
            @input=${this.valueChanged}
          ></ha-textfield>
          
          <ha-icon-picker
            label="Icon"
            .value=${this._icon}
            .configValue=${"icon"}
            @value-changed=${this.valueChanged}
          ></ha-icon-picker>
        </div>

        <div class="side-by-side">
          <ha-textfield
            label="Animation Duration (ms)"
            type="number"
            min="100"
            step="100"
            .value=${this._animation_duration}
            .configValue=${"animation_duration"}
            @input=${this.valueChanged}
          ></ha-textfield>
        </div>
      </div>
    `:e``}static get styles(){return t`
      .card-config {
        padding: 16px;
      }
      .side-by-side {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 8px 0;
      }
      ha-entity-picker,
      ha-textfield {
        width: 100%;
      }
    `}}customElements.define("better-switch-card-editor",d);var h=Object.freeze({__proto__:null,BetterSwitchCardEditor:d});console.info(`%c ${o} %c 1.0.0 `,"color: white; background: #555; font-weight: 700;","color: white; background: #000; font-weight: 700;"),window.customCards=window.customCards||[],window.customCards.push({type:"better-switch-card",name:o,description:"A stylish switch card with animations",preview:!0});customElements.define("better-switch-card",class extends i{static get properties(){return{hass:{type:Object},config:{type:Object}}}static get styles(){return c}static async getConfigElement(){return await Promise.resolve().then((function(){return h})),document.createElement("better-switch-card-editor")}static getStubConfig(){return{entity:"",name:"",icon:"",animation_duration:500}}setConfig(t){if(!t.entity)throw new Error("Please define an entity");this.config={...s,...t}}_toggle(t){t.stopPropagation(),t.preventDefault();const i=this.hass.states[this.config.entity];if(!i)return;const e="on"===i.state?"turn_off":"turn_on",[n]=this.config.entity.split(".");this.hass.callService(n,e,{entity_id:this.config.entity})}render(){if(!this.hass||!this.config)return e``;const t=this.hass.states[this.config.entity];if(!t)return e`
        <ha-card>
          <div class="warning">
            Entity not found: ${this.config.entity}
          </div>
        </ha-card>
      `;const i="on"===t.state,n=this.config.name||t.attributes.friendly_name,a=this.config.icon||(i?"mdi:toggle-switch":"mdi:toggle-switch-off");return e`
      <ha-card>
        <button 
          class="toggle-button ${i?"on":"off"}"
          @click="${this._toggle}"
          type="button"
          style="--animation-duration: ${this.config.animation_duration}ms"
        >
          <div class="toggle-text">
            <span class="room-name">${n}</span>
            <span class="status">${i?"On":"Off"}</span>
          </div>
          <div class="icon-container">
            <ha-icon .icon=${a}></ha-icon>
          </div>
        </button>
      </ha-card>
    `}}),a("Better Cards loaded");
//# sourceMappingURL=index.js.map
