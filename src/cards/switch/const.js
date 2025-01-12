export const CARD_VERSION = '1.0.0';
export const CARD_NAME = 'Better Switch Card';
export const DOMAINS = ['switch', 'light', 'input_boolean'];

export const DEFAULT_CONFIG = {
  entity: '',
  name: '',
  icon: '',
  animation_duration: 500,
};

// Add validation schema if needed
export const configStruct = {
  entity: String,
  name: String,
  icon: String,
  animation_duration: Number,
};