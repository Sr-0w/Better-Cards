// editor.js
import { html, nothing } from 'lit';
import { fireEvent } from 'custom-card-helpers';
import { BaseElement } from './utils/base-element';
import { SWITCH_SCHEMA } from './shared/config/schema';
import { setupCustomLocalize, GENERIC_LABELS } from './utils/localize';
import { DOMAINS } from './const';

export class BetterSwitchCardEditor extends BaseElement {
    static get properties() {
        return {
            ...super.properties,
            _config: { state: true },
        };
    }

    async firstUpdated() {
        await this._loadComponents();
    }

    async _loadComponents() {
        if (!customElements.get("ha-form")) {
            await customElements.whenDefined("hui-action-editor");
            const helpers = await window.loadCardHelpers();
            if (helpers) await helpers.importMoreInfoControl("light");
        }
    }

    setConfig(config) {
        this._config = { ...config };
    }

    _computeLabel(schema) {
        const customLocalize = setupCustomLocalize(this.hass);

        if (GENERIC_LABELS.includes(schema.name)) {
            return customLocalize(`editor.card.generic.${schema.name}`);
        }
        
        return customLocalize(schema.name);
    }

    _valueChanged(ev) {
        fireEvent(this, "config-changed", { config: ev.detail.value });
    }

    render() {
        if (!this.hass || !this._config) {
            return nothing;
        }

        return html`
            <ha-form
                .hass=${this.hass}
                .data=${this._config}
                .schema=${SWITCH_SCHEMA}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._valueChanged}
            ></ha-form>
        `;
    }
}

customElements.define('better-switch-card-editor', BetterSwitchCardEditor);
