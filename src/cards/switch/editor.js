import { html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { fireEvent } from "custom-card-helpers";
import { LovelaceCardEditor } from "custom-card-helpers";
import { HaFormSchema } from "../../utils/form/ha-form";

customElement("better-switch-card-editor")
export class BetterSwitchCardEditor
  extends HTMLElement
  implements LovelaceCardEditor
{
  @state() private _config?: Record<string, any>;

  setConfig(config: Record<string, any>): void {
    this._config = config;
  }

  private _computeLabel = (schema: HaFormSchema) => {
    const labels: Record<string, string> = {
      entity: "Entity (Required)",
      name: "Name (Optional)",
      icon: "Icon",
      animation_duration: "Animation Duration (ms)",
    };
    return labels[schema.name] || schema.name;
  };

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    const SCHEMA: HaFormSchema[] = [
      { name: "entity", selector: { entity: { domain: ["switch", "light", "input_boolean"] } } },
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      { name: "animation_duration", selector: { number: { mode: "box", min: 100, step: 100 } } },
    ];

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    fireEvent(this, "config-changed", { config: ev.detail.value });
  }
}