import { LitElement } from 'lit';

export class BaseElement extends LitElement {
    static get properties() {
        return {
            hass: { type: Object },
        };
    }
}
