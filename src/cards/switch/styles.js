import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    height: 100%;
    --internal-padding: 12px;
    --icon-size: min(40px, calc(var(--grid-card-height, 1px) * 0.25));
    --font-size-name: min(1.2rem, calc(var(--grid-card-height, 1px) * 0.15));
    --font-size-status: min(0.9rem, calc(var(--grid-card-height, 1px) * 0.12));
  }

  ha-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .toggle-button {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: var(--internal-padding);
    box-sizing: border-box;
    transition: all var(--animation-duration, 500ms) ease-in-out;
    border: none;
    cursor: pointer;
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
    min-width: 0;
    flex: 1;
  }

  .room-name {
    font-size: var(--font-size-name);
    font-weight: 500;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }

  .status {
    font-size: var(--font-size-status);
    opacity: 0.7;
  }

  .icon-container {
    width: var(--icon-size);
    height: var(--icon-size);
    min-width: var(--icon-size);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--animation-duration, 500ms);
    margin-left: var(--internal-padding);
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
    padding: var(--internal-padding);
  }

  ha-icon {
    --mdc-icon-size: calc(var(--icon-size) * 0.6);
  }
`;