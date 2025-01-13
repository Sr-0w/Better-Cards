// editor.js
import { html, nothing } from 'lit';
import { BaseElement } from './utils/base-element';
import { fireEvent } from 'custom-card-helpers';
import { loadHaComponents } from './utils/loader';
import { DOMAINS } from './const';

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

export class BetterSwitchCardEditor extends BaseElement {
    static get properties() {
        return {
            ...super.properties,
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
        
        const entityName = "Entity";
        const defaultLabels = {
            "entity": entityName,
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
