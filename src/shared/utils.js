// Helper for consistent logging
export const log = {
  info: (...args) => console.info('[Better Cards]', ...args),
  warn: (...args) => console.warn('[Better Cards]', ...args),
  error: (...args) => console.error('[Better Cards]', ...args),
};

// Helper for common entity operations
export const entityUtils = {
  isUnavailable: (stateObj) => !stateObj || stateObj.state === 'unavailable',
  getName: (stateObj, config) => config.name || stateObj.attributes.friendly_name,
  getIcon: (stateObj, config) => config.icon || stateObj.attributes.icon
};

// Error handling
export const throwError = (message) => {
  throw new Error(`[Better Cards] ${message}`);
};
