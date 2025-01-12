import{css as t,LitElement as i,html as e}from"lit";import{fireEvent as n}from"custom-card-helpers";const a=(...t)=>console.info("[Better Cards]",...t),o="Better Switch Card",r=["switch","light","input_boolean"],c={entity:"",name:"",icon:"",animation_duration:500},s=t`
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
`;customElements.define("better-switch-card-editor",class extends i{static get properties(){return{hass:{type:Object},_config:{type:Object}}}static get styles(){return t`
      .card-config {
        padding: 16px;
      }
      ha-textfield {
        display: block;
        margin: 8px 0;
      }
      ha-entity-picker {
        display: block;
        margin: 8px 0;
      }
      ha-icon-picker {
        display: block;
        margin: 8px 0;
      }
    `}setConfig(t){this._config=t}_computeLabel(t){return{entity:"Entity (Required)",name:"Name (Optional)",icon:"Icon",animation_duration:"Animation Duration (ms)"}[t.name]||t.name}get _entity(){return this._config.entity||""}get _name(){return this._config.name||""}get _icon(){return this._config.icon||""}get _animation_duration(){return this._config.animation_duration||500}_valueChanged(t){if(!this._config||!this.hass)return;const i=t.target;if(this[`_${i.configValue}`]===i.value)return;let e=t.detail?.value||i.value;"animation_duration"===i.configValue&&(e=parseInt(e));const a={...this._config,[i.configValue]:e};n(this,"config-changed",{config:a})}render(){return this.hass&&this._config?e`
      <div class="card-config">
        <ha-entity-picker
          .label="${this._computeLabel({name:"entity"})}"
          .hass=${this.hass}
          .value=${this._entity}
          .configValue=${"entity"}
          .includeDomains=${r}
          @value-changed=${this._valueChanged}
          allow-custom-entity
        ></ha-entity-picker>
        <ha-textfield
          label="${this._computeLabel({name:"name"})}"
          .value=${this._name}
          .configValue=${"name"}
          @input=${this._valueChanged}
        ></ha-textfield>
        <ha-icon-picker
          label="${this._computeLabel({name:"icon"})}"
          .value=${this._icon}
          .configValue=${"icon"}
          @value-changed=${this._valueChanged}
        ></ha-icon-picker>
        <ha-textfield
          label="${this._computeLabel({name:"animation_duration"})}"
          type="number"
          .value=${this._animation_duration}
          .configValue=${"animation_duration"}
          @input=${this._valueChanged}
        ></ha-textfield>
      </div>
    `:e``}}),a(`%c ${o} %c 1.0.0 `,"color: white; background: #555; font-weight: 700;","color: white; background: #000; font-weight: 700;"),window.customCards=window.customCards||[],window.customCards.push({type:"better-switch-card",name:o,description:"A stylish switch card with animations",preview:!0});customElements.define("better-switch-card",class extends i{static get properties(){return{hass:{type:Object},config:{type:Object}}}static get styles(){return s}static getConfigElement(){return document.createElement("better-switch-card-editor")}static getStubConfig(){return c}setConfig(t){if(!t.entity)throw new Error("Please define an entity");this.config={...c,...t}}_toggle(t){t.stopPropagation(),t.preventDefault();const i=this.hass.states[this.config.entity];if(!i)return;const e="on"===i.state?"turn_off":"turn_on",[n]=this.config.entity.split(".");this.hass.callService(n,e,{entity_id:this.config.entity})}render(){if(!this.hass||!this.config)return e``;const t=this.hass.states[this.config.entity];if(!t)return e`
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
