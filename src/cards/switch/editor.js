// editor.js
import { LitElement, html, nothing } from 'lit';
import { fireEvent } from 'custom-card-helpers';
import { DOMAINS } from './const';

// Loader function included directly
const loadHaComponents = async () => {
    if (!customElements.get("ha-form")) {
        await customElements.whenDefined("hui-view");
        await window.loadCardHelpers();
        await customElements.whenDefined("ha-form");
    }
};

const SCHEMA = [
    { 
        name: "entity", 
        required: true,
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

export class BetterSwitchCardEditor extends LitElement {
    static get properties() {
        return {
            hass: { type: Object },
            _config: { state: true },
        };
    }

    connectedCallback() {
        super.connectedCallback();
        void loadHaComponents();
    }

    setConfig(config) {
        this._config = { ...config };
    }

    _valueChanged(ev) {
        fireEvent(this, "config-changed", { config: ev.detail.value });
    }

    _computeLabel(schema) {
        if (!this.hass) return "";
        
        const defaultLabels = {
            "entity": "Entity",
            "name": "Name",
            "icon": "Icon",
            "animation_duration": "Animation Duration"
        };

        return defaultLabels[schema.name] || schema.name;
    }

    render() {
        if (!this.hass || !this._config) {
            return nothing;
        }

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
}

customElements.define('better-switch-card-editor', BetterSwitchCardEditor);
