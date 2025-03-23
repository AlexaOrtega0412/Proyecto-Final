import { LitElement, html, css } from "lit";

export class UserProfile extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: 100vh;
      margin: 0;
      text-align: center;
      background: linear-gradient(to bottom, #6ad2fe, #053b5f);
      color: #ffffff;
      position: relative;
      overflow: hidden;
    }
    .image-container {
      height: 150px;
      background-image: url("icons/inicio.png");
      background-size: cover;
      background-position: center;
      position: relative;
    }
    .menu-icon {
      position: absolute;
      top: 15px;
      left: 15px;
      cursor: pointer;
      font-size: 25px;
      color: #000000;
      z-index: 2;
      transition: all 0.3s ease;
    }
    .menu-icon:hover {
      transform: scale(1.1);
    }
    .menu {
      display: none;
      position: absolute;
      top: 45px;
      left: 15px;
      background-color: #ffffff;
      border-radius: 5px;
      padding: 10px;
      z-index: 1;
      transition: all 0.3s ease;
    }
    .menu.open {
      display: block;
    }
    .menu-item {
      color: #0B588B;
      padding: 8px 16px;
      cursor: pointer;
      text-align: left;
      font-size: 14px;
      transition: all 0.3s ease;
    }
    .menu-item:hover {
      background-color: #f0f0f0;
    }
    h1 {
      font-size: 20px;
      margin-bottom: 10px;
      margin-top: 15px;
    }
    section {
      margin-bottom: 15px;
      padding: 0 15px;
    }
    .change-user {
      color: #1C9DF2;
      cursor: pointer;
      margin-top: 10px;
      background: none;
      border: none;
      padding: 0;
      font: inherit;
      font-size: 14px;
      transition: all 0.3s ease;
    }
    .change-user:hover {
      opacity: 0.8;
    }
    .password-container {
      position: relative;
      margin-top: 10px;
    }
    input {
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 14px;
    }
    .forgot-password {
      color: #1C9DF2;
      cursor: pointer;
      display: block;
      margin-top: 10px;
      text-decoration: none;
      font-size: 14px;
      transition: all 0.3s ease;
    }
    .forgot-password:hover {
      opacity: 0.8;
    }
    .show-password {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      color: #ffffff;
      font-size: 20px;
      transition: all 0.3s ease;
    }
    .show-password:hover {
      transform: translateY(-50%) scale(1.1);
    }
    .enter-button {
      width: 90%;
      padding: 10px;
      background-color: #1C9DF2;
      color: #ffffff;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 20px;
      transition: all 0.3s ease;
      margin-bottom: 20px;
    }
    .enter-button:hover {
      background-color: #0B588B;
    }
  `;

  constructor() {
    super();
    this.showPassword = false;
    this.menuOpen = false;
    this.userName = ''; 
  }

  render() {
    return html`
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <div class="image-container">
      
        <i class="material-icons menu-icon" @click=${this.toggleMenu}>menu</i>
        <div class="menu ${this.menuOpen ? 'open' : ''}">
          <div class="menu-item" @click=${this.menuAction}>Opción 1</div>
          <div class="menu-item" @click=${this.menuAction}>Opción 2</div>
          <div class="menu-item" @click=${this.menuAction}>Opción 3</div>
        </div>
      </div>
      <h1>HOLA</h1>
      <section>
        <input
          type="text"
          placeholder="Ingresa tu nombre"
          .value=${this.userName}
          @input=${this.handleUserNameInput}
          style="width: 100%; padding: 8px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 5px; font-size: 14px;"
        >
        <button class="change-user" @click=${this.changeUser}>
          Cambiar Usuario
        </button>
      </section>
      <section>
        <div class="password-container">
          <input
            type="${this.showPassword ? 'text' : 'password'}"
            id="password"
            placeholder="Contraseña"
          >
         <i
            class="material-icons show-password"
            @click=${this.togglePasswordVisibility}
          >
            ${this.showPassword ? 'visibility_off' : 'visibility'}
          </i>
        </div>
        <a href="#" class="forgot-password" @click=${this.forgotPassword}>
          Olvidé mi contraseña
        </a>
      </section>
      <button class="enter-button" @click=${this.enter}>
        Entrar
      </button>
    `;
  }

  handleUserNameInput(event) {
    this.userName = event.target.value; 
  }

  changeUser() {
    alert(`Usuario cambiado a: ${this.userName}`);
  }

  forgotPassword() {
    alert('Olvidé mi contraseña');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.requestUpdate();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.requestUpdate();
  }

  menuAction() {
    alert('Opción seleccionada');
  }

  enter() {
    alert(`Bienvenido, ${this.userName || 'Usuario'}`);
  }
}