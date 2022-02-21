import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('app-header')
export class AppHeader extends LitElement {
  @property({ type: String }) title = 'Hey welcome to elePWAnty!';

  @property() enableBack: boolean = false;

  static get styles() {
    return css`
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--accent-foreground-rest);
        color: white;
        height: 4rem;
      }

      header h1 {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 1.5rem;
        font-weight: semibold;
      }

      #header-block {
        display: flex;
        align-items: center;
      }

      #logo-container {
        width: 8rem;
        height: 8rem;
        display: flex;
        align-items: center;
      }

      #logo {
        max-inline-size: 100%;
        block-size: auto;
      }

      @media (prefers-color-scheme: light) {
        header {
          color: black;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <header>
        <div id="header-block">
          <div id="logo-container">
            <img
              src="assets/icons/windows11/Wide310x150Logo.scale-400.png"
              alt="elePWAnty icon"
              width="310"
              height="150"
              id="logo"
              loading="eager"
            />
          </div>
          <h1>${this.title}</h1>
        </div>
      </header>
    `;
  }
}
