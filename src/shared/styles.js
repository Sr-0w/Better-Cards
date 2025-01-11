import { css } from 'lit';

// Common styles that will be used across multiple cards
export const sharedStyles = css`
  :host {
    display: block;
    padding: 16px;
  }
  
  .better-card {
    border-radius: var(--ha-card-border-radius, 16px);
    box-shadow: var(--ha-card-box-shadow, 0 2px 4px 0 rgba(0,0,0,0.16));
  }

  .better-card-content {
    padding: 16px;
  }

  .better-card-title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 4px;
  }
`;

// Common animation durations and transitions
export const animations = {
  default: 'all 500ms ease-in-out',
  quick: 'all 300ms ease-in-out',
  slow: 'all 800ms ease-in-out'
};
