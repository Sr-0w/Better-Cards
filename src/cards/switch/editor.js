// editor.js
import { html, nothing } from 'lit';
import { fireEvent } from 'custom-card-helpers';
import { BaseElement } from './utils/base-element';
import { DOMAINS } from './const';

// Schema definition matching mushroom's pattern more closely
const SCHEMA = [
    { 
        name: "entity", 
        required: true,
        selector: { 
            entity: { 
                domain: DOMAINS,
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
        name: "animation_duration", 
        selector: { 
            number: {
                min: 100,
                step: 100,
                mode: "box",
                unit_of_measurement: "ms"
            } 
        } 
    }
];

export class BetterSwitchCardEditor extends BaseElement {
    static get properties() {
        return {
            ...super.properties,
            _config: { state: true },
            _loaded: { state: true, type: Boolean }
        };
    }

    constructor() {
        super();
        this._loaded = false;
    }

    async connectedCallback() {
        super.connectedCallback();
        await this._loadComponents();
    }

    async _loadComponents() {
        try {
            if (!customElements.get("ha-form")) {
                const helpers = await window.loadCardHelpers();
                if (helpers) {
                    await helpers.importMoreInfoControl("light");
                }
            }
            await customElements.whenDefined("ha-selector");
            await customElements.whenDefined("ha-entity-selector");
            this._loaded = true;
            this.requestUpdate();
        } catch (error) {
            console.error("Failed to load components:", error);
        }
    }

    setConfig(config) {
        this._config = { ...config };
    }

    _valueChanged(ev) {
        fireEvent(this, "config-changed", { config: ev.detail.value });
    }

    render() {
        if (!this.hass || !this._config || !this._loaded) {
            return html`<div>Loading editor...</div>`;
        }

        return html`
            <ha-form
                .hass=${this.hass}
                .data=${this._config}
                .schema=${SCHEMA}
                .computeLabel=${(schema) => schema.name}
                @value-changed=${this._valueChanged}
            ></ha-form>
        `;
    }
}

customElements.define('better-switch-card-editor', BetterSwitchCardEditor);
