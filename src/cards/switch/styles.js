import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    height: 100%;
    --internal-padding: 12px;
    --icon-size: min(40px, calc(var(--card-height, 100px) * 0.4));
    --font-size-name: min(1.2rem, calc(var(--card-height, 100px) * 0.15));
    --font-size-status: min(0.9rem, calc(var(--card-height, 100px) * 0.12));
  }

  ha-card {
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .toggle-button {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--internal-padding);
    background: none;
    transition: all var(--animation-duration, 500ms) ease-in-out;
    border: none;
    cursor: pointer;
    margin: 0;
    box-sizing: border-box;
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
    flex: 1;
    min-width: 0;
    padding-right: var(--internal-padding);
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
  }

  .off .icon-container {
    background-color: var(--primary-color, white);
    color: var(--ha-card-background, black);
  }

  .on .icon-container {
    background-color: var(--ha-card-background, black);
    color: var(--primary-color, white);
  }

  ha-icon {
    --mdc-icon-size: calc(var(--icon-size) * 0.6);
    display: flex;
  }

  .warning {
    display: block;
    color: var(--error-color);
    padding: var(--internal-padding);
  }
`;