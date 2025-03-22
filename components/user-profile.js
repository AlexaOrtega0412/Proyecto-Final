import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class UserProfile extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      padding: 20px;
      max-width: 300px;
      margin: auto;
      text-align: center;
    }
    h1 {
      font-size: 24px;
      margin-bottom: 10px;
    }
    .user-info {
      margin-bottom: 20px;
    }
    .change-user {
      color: #0B588B;
      cursor: pointer;
      text-decoration: underline;
    }
    .password-section, .token-section {
      margin-top: 20px;
    }
    input {
      width: 100%;
      padding: 10px;
      margin-top: 10px;
      box-sizing: border-box;
    }
    .forgot-password {
      color: blue;
      cursor: pointer;
      text-decoration: underline;
      display: block;
      margin-top: 10px;
    }
    .qr-operation {
      margin-top: 20px;
      font-weight: bold;
    }
  `;

  render() {
    return html`
      <h1>HOLA</h1>
      <div class="user-info">
        Juanito Perez
        <div class="change-user" @click=${this.changeUser}>Cambiar Usuario</div>
      </div>
      <div class="password-section">
        Contraseña
        <input type="password" placeholder="Contraseña">
        <div class="forgot-password" @click=${this.forgotPassword}>Olvidé mi contraseña</div>
      </div>
      <div class="token-section">
        Token Móvil
        <div class="qr-operation">Operación QR</div>
      </div>
    `;
  }

  changeUser() {
    alert('Cambiar Usuario');
  }

  forgotPassword() {
    alert('Olvidé mi contraseña');
  }
}
