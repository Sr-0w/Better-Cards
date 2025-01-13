const SWITCH_LABELS = [
    "show_animation",
    "animation_duration",
    "show_name",
    "show_state"
];

export const setupCustomLocalize = (hass) => (key) => {
    const prefix = "editor.card.switch.";
    if (key.startsWith("editor.card.generic.")) {
        return hass.localize(key);
    }
    
    const translateKey = `${prefix}${key}`;
    const translation = hass.localize(translateKey);
    if (translation) return translation;
    
    // Fallback translations
    const fallback = {
        "show_animation": "Show Animation",
        "animation_duration": "Animation Duration",
        "show_name": "Show Name",
        "show_state": "Show State",
        "entity": "Entity",
        "name": "Name",
        "icon": "Icon"
    };
    
    return fallback[key] || key;
};

export const GENERIC_LABELS = ["entity", "name", "icon"];
