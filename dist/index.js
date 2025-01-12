import{css as t,LitElement as i,html as e}from"lit";import{fireEvent as n}from"custom-card-helpers";const o=(...t)=>console.info("[Better Cards]",...t),a="Better Switch Card",r=["switch","light","input_boolean"],s={entity:"",name:"",icon:"",animation_duration:500},c=t`
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
`;customElements.define("better-switch-card-editor",class extends i{static get styles(){return t`
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
    `}static get properties(){return{hass:{type:Object},_config:{type:Object}}}setConfig(t){this._config={...t}}get _entity(){return this._config.entity||""}get _name(){return this._config.name||""}get _icon(){return this._config.icon||""}get _animation_duration(){return this._config.animation_duration||500}get getEntitiesInDomain(){return Object.keys(this.hass.states).filter((t=>r.includes(t.split(".")[0])))}valueChanged(t){if(!this._config||!this.hass)return;const i=t.target;if(this[`_${i.configValue}`]===i.value)return;let e=i.value;"animation_duration"===i.configValue&&(e=parseInt(e,10)),""===e?delete this._config[i.configValue]:this._config={...this._config,[i.configValue]:e},n(this,"config-changed",{config:this._config})}render(){if(!this.hass||!this._config)return e``;const t=this.getEntitiesInDomain;return e`
      <div class="card-config">
        <div class="overall-config">
          <div class="editor-side-by-side">
            <div class="select-container">
              <span class="editor-label">Entity (Required)</span>
              <select
                .value=${this._entity}
                .configValue=${"entity"}
                @change=${this.valueChanged}
              >
                <option value="">Select entity</option>
                ${t.map((t=>e`
                  <option value=${t} ?selected=${t===this._entity}>
                    ${t}
                  </option>
                `))}
              </select>
            </div>
          </div>

          <div class="editor-side-by-side">
            <paper-input
              label="Name"
              .value=${this._name}
              .configValue=${"name"}
              @value-changed=${this.valueChanged}
            ></paper-input>

            <paper-input
              label="Icon"
              .value=${this._icon}
              .configValue=${"icon"}
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
              .configValue=${"animation_duration"}
              @value-changed=${this.valueChanged}
            ></paper-input>
          </div>
        </div>
      </div>
    `}}),o(`%c ${a} %c 1.0.0 `,"color: white; background: #555; font-weight: 700;","color: white; background: #000; font-weight: 700;"),window.customCards=window.customCards||[],window.customCards.push({type:"better-switch-card",name:a,description:"A stylish switch card with animations",preview:!0});customElements.define("better-switch-card",class extends i{static get properties(){return{hass:{type:Object},config:{type:Object}}}static get styles(){return c}static getConfigElement(){return document.createElement("better-switch-card-editor")}static getStubConfig(){return s}setConfig(t){if(!t.entity)throw new Error("Please define an entity");this.config={...s,...t}}_toggle(t){t.stopPropagation(),t.preventDefault();const i=this.hass.states[this.config.entity];if(!i)return;const e="on"===i.state?"turn_off":"turn_on",[n]=this.config.entity.split(".");this.hass.callService(n,e,{entity_id:this.config.entity})}render(){if(!this.hass||!this.config)return e``;const t=this.hass.states[this.config.entity];if(!t)return e`
        <ha-card>
          <div class="warning">
            Entity not found: ${this.config.entity}
          </div>
        </ha-card>
      `;const i="on"===t.state,n=this.config.name||t.attributes.friendly_name,o=this.config.icon||(i?"mdi:toggle-switch":"mdi:toggle-switch-off");return e`
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
            <ha-icon .icon=${o}></ha-icon>
          </div>
        </button>
      </ha-card>
    `}}),o("Better Cards loaded");
//# sourceMappingURL=index.js.map
