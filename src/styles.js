import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    padding: 16px;
  }
  .toggle-button {
    width: 100%;
    height: 128px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px;
    transition: all var(--animation-duration, 500ms) ease-in-out;
    box-shadow: var(--ha-card-box-shadow, 0 2px 2px 0 rgba(0, 0, 0, 0.14));
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .toggle-button.off {
    background-color: var(--ha-card-background, var(--card-background-color, black));
    color: var(--primary-text-color, white);
  }
  .toggle-button.on {
    background-color: var(--light-primary-color, white);
    color: var(--primary-text-color, black);
  }
  .toggle-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    z-index: 1;
  }
  .room-name {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 4px;
  }
  .status {
    font-size: 14px;
    opacity: 0.7;
  }
  .icon-container {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--animation-duration, 500ms);
    z-index: 1;
  }
  .off .icon-container {
    background-color: var(--light-primary-color, white);
    color: var(--primary-text-color, black);
  }
  .on .icon-container {
    background-color: var(--ha-card-background, black);
    color: var(--light-primary-color, white);
  }
  .brightness-slider {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 8px 24px;
    box-sizing: border-box;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
  .toggle-button:hover .brightness-slider {
    opacity: 1;
  }
`;
