// utils/loader.js
export const loadHaComponents = async () => {
    if (!customElements.get("ha-form")) {
        await customElements.whenDefined("hui-view");
        await window.loadCardHelpers();
        await customElements.whenDefined("ha-form");
    }
};
