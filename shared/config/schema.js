// shared/config/schema.js
export const SWITCH_SCHEMA = [
    { 
        name: "entity", 
        selector: { 
            entity: { 
                domain: ["switch", "light", "input_boolean"] 
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
    ...APPEARANCE_FORM_SCHEMA,
    {
        type: "grid",
        name: "",
        schema: [
            { 
                name: "show_animation", 
                selector: { boolean: {} } 
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
        ],
    }
];
