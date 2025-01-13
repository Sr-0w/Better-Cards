import{css as n,LitElement as t,html as e}from"lit";var r=function(){for(var n=arguments.length,t=new Array(n),e=0;e<n;e++)t[e]=arguments[e];return console.info("[Better Cards]",...t)};function i(n,t,e,r,i,o,a){try{var c=n[o](a),s=c.value}catch(n){return void e(n)}c.done?t(s):Promise.resolve(s).then(r,i)}function o(n){return function(){var t=this,e=arguments;return new Promise((function(r,o){var a=n.apply(t,e);function c(n){i(a,r,o,c,s,"next",n)}function s(n){i(a,r,o,c,s,"throw",n)}c(void 0)}))}}function a(n,t,e){return(t=function(n){var t=function(n,t){if("object"!=typeof n||!n)return n;var e=n[Symbol.toPrimitive];if(void 0!==e){var r=e.call(n,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(n)}(n,"string");return"symbol"==typeof t?t:t+""}(t))in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}function c(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.push.apply(e,r)}return e}function s(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?c(Object(e),!0).forEach((function(t){a(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):c(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}function l(n,t){return t||(t=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(t)}}))}var u,d,f,h,g,p="Better Switch Card",b=["switch","light","input_boolean"],m={entity:"",name:"",icon:"",animation_duration:500,show_name:!0,show_state:!0,show_animation:!0},y=n(u||(u=l(["\n  :host {\n    display: block;\n    height: 100%;\n  }\n\n  ha-card {\n    height: 100%;\n  }\n\n  .toggle-button {\n    width: 100%;\n    height: 100%;\n    min-height: 48px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 16px;\n    transition: all var(--animation-duration, 500ms) ease-in-out;\n    border: none;\n    border-radius: var(--ha-card-border-radius, 12px);\n    cursor: pointer;\n    margin: 0;\n    background: var(--ha-card-background, #1c1c1e);\n    color: var(--primary-text-color, white);\n  }\n\n  .toggle-button.off {\n    background-color: black;\n    color: var(--primary-text-color, white);\n  }\n\n  .toggle-button.on {\n    background-color: white;\n    color: black;\n  }\n\n  .toggle-text {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .room-name {\n    font-size: 1.15rem;\n    font-weight: 500;\n    margin-bottom: 4px;\n  }\n\n  .status {\n    font-size: 0.85rem;\n    opacity: 0.8;\n  }\n\n  .icon-container {\n    width: 42px;\n    height: 42px;\n    border-radius: 50%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    transition: all var(--animation-duration, 500ms);\n  }\n\n  .off .icon-container {\n    background-color: white;\n    color: var(--ha-card-background, #1c1c1e);\n  }\n\n  .on .icon-container {\n    background-color: var(--ha-card-background, #1c1c1e);\n    color: white;\n  }\n\n  .warning {\n    display: block;\n    color: var(--error-color);\n    padding: 16px;\n  }\n\n  ha-icon {\n    --mdc-icon-size: 24px;\n  }\n"])));console.info("%c ".concat(p," %c ").concat("1.0.0"," "),"color: white; background: #555; font-weight: 700;","color: white; background: #000; font-weight: 700;"),window.customCards=window.customCards||[],window.customCards.push({type:"better-switch-card",name:p,description:"A stylish switch card with animations",preview:!0});customElements.define("better-switch-card",class extends t{static get properties(){return{hass:{type:Object},config:{type:Object}}}static get styles(){return y}static getConfigElement(){return o((function*(){return yield import("./editor-5fd9149f.js"),document.createElement("better-switch-card-editor")}))()}static getStubConfig(){return{entity:"",name:"",icon:"",animation_duration:500}}setConfig(n){if(this.hass&&!n.entity)throw new Error("Please define an entity");this.config=s(s({},m),n)}_toggle(n){n.stopPropagation(),n.preventDefault();var t=this.hass.states[this.config.entity];if(t){var e="on"===t.state?"turn_off":"turn_on",[r]=this.config.entity.split(".");this.hass.callService(r,e,{entity_id:this.config.entity})}}render(){if(!this.hass||!this.config)return e(d||(d=l([""])));if(!this.config.entity)return e(f||(f=l(['\n        <ha-card>\n          <div class="card-content">\n            Please define an entity\n          </div>\n        </ha-card>\n      '])));var n=this.hass.states[this.config.entity];if(!n)return e(h||(h=l(['\n        <ha-card>\n          <div class="warning">\n            Entity not found: ',"\n          </div>\n        </ha-card>\n      "])),this.config.entity);var t="on"===n.state,r=this.config.name||n.attributes.friendly_name,i=this.config.icon||(t?"mdi:toggle-switch":"mdi:toggle-switch-off");return e(g||(g=l(['\n      <ha-card>\n        <button \n          class="toggle-button ','"\n          @click="','"\n          type="button"\n          style="--animation-duration: ','ms"\n        >\n          <div class="toggle-text">\n            <span class="room-name">','</span>\n            <span class="status">','</span>\n          </div>\n          <div class="icon-container">\n            <ha-icon .icon=',"></ha-icon>\n          </div>\n        </button>\n      </ha-card>\n    "])),t?"on":"off",this._toggle,this.config.animation_duration,r,t?"On":"Off",i)}}),r("Better Cards loaded");export{b as D,s as _,l as a,o as b};
//# sourceMappingURL=index.js.map
