import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }
  
  ha-card {
    height: 100%;
  }

  .toggle-button {
    width: 100%;
    height: 100%;
    min-height: 128px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    transition: all var(--animation-duration, 500ms) ease-in-out;
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .toggle-button.off {
    background-color: var(--ha-card-background, black);
    color: var(--primary-text-color, white);
  }

  .toggle-button.on {
    background-color: var(--primary-color, white);
    color: var(--text-primary-color, black);
  }

  .toggle-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    z-index: 1;
  }

  .room-name {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 4px;
  }

  .status {
    font-size: 0.9rem;
    opacity: 0.7;
  }

  .icon-container {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--animation-duration, 500ms);
    z-index: 1;
  }

  .off .icon-container {
    background-color: var(--primary-color, white);
    color: var(--ha-card-background, black);
  }

  .on .icon-container {
    background-color: var(--ha-card-background, black);
    color: var(--primary-color, white);
  }

  .warning {
    display: block;
    color: var(--error-color);
    padding: 16px;
  }

  ha-icon {
    --mdc-icon-size: 24px;
  }
`;