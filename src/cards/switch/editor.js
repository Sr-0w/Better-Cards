import { html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { DOMAINS } from './const';

const SCHEMA = [
  { 
    name: "entity", 
    selector: { 
      entity: { 
        domain: DOMAINS 
      } 
    } 
  },
  { 
    name: "name", 
    selector: { 
      text: {} 
    } 
  },
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "icon",
        selector: { icon: {} },
        context: { icon_entity: "entity" },
      }
    ],
  },
  {
    type: "grid",
    name: "",
    schema: [
      { 
        name: "animation_duration", 
        selector: { 
          number: {
            min: 100,
            max: 2000,
            step: 100,
            unit_of_measurement: "ms",
            mode: "slider",
          }
        } 
      },
    ],
  }
];

@customElement("better-switch-card-editor")
export class BetterSwitchCardEditor extends LitElement {
  @state() private _config?;

  setConfig(config) {
    this._config = config;
  }

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev) {
    const config = ev.detail.value;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }
}