import { LitElement, html, css } from "lit";
import { MisCuentas } from "./MisCuentas.js";

export class UserProfile extends LitElement {
  static styles = css`
    main {
      text-align: center;
      color: #ffffff;
    }
    .image-container {
      height: 200px;
      background-image: url("icons/inicio.png");
      background-size: cover;
      background-position: center;
      margin-bottom: 2rem;
    }
    section {
      margin-bottom: 15px;
      padding: 0 15px;
    }
    .password-container {
      position: relative;
      margin-top: 10px;
    }
    input {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 14px;
      margin-bottom: 2rem;
    }
    input[valid] {
      background-color: #e8f5e9;
      border-color: green;
    }
    input[invalid] {
      background-color: #ffebee; 
      border-color: red;
    }
    .enter-button {
      padding: 10px;
      background-color: #1c9df2;
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
      background-color: #ccc;
    }
    .error-message {
      color: #f25959;
    }
    @media (min-width: 1024px) {
      .image-container {
        border-radius: 10px 10px 0 0;
      }
    }

    
    .loader-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background: linear-gradient(135deg, #1e3c72, #2a5298); 
      color: white;
      font-family: Arial, sans-serif;
    }
    .loader {
      width: 50px;
      height: 50px;
    }
    .loading-text {
      margin-top: 10px;
      font-size: 1.2em;
    }
  `;

  constructor() {
    super();
    this.userName = "";
    this.password = "";
    this.error = "";
    this.isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    this.isLoading = false;
    this.showLoader = false;
  }

  static properties = {
    userName: { type: String },
    password: { type: String },
    error: { type: String },
    isLoggedIn: { type: Boolean },
    isLoading: { type: Boolean },
    showLoader: { type: Boolean },
  };

  async dataUser() {
    this.isLoading = true;
    this.error = "";

    try {
      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();
      const buscarUsuario = data.find(
        (user) => user.user === this.userName && user.pass === this.password
      );

      if (buscarUsuario) {
        this.isLoading = false;

        
        this.shadowRoot.querySelector('input[name="username"]').setAttribute("valid", "");
        this.shadowRoot.querySelector('input[name="password"]').setAttribute("valid", "");

        
        setTimeout(() => {
          this.showLoader = true;
          this.requestUpdate();

          
          setTimeout(() => {
            sessionStorage.setItem("user", JSON.stringify(buscarUsuario));
            sessionStorage.setItem("isLoggedIn", "true");
            this.isLoggedIn = true;
            this.showLoader = false;
            this.requestUpdate(); 
          }, 2000); 
        }, 500); 
      } else {
        
        this.error = "Usuario o contraseña incorrectos";
        this.password = "";
        this.isLoading = false;

        
        this.shadowRoot.querySelector('input[name="username"]').setAttribute("invalid", "");
        this.shadowRoot.querySelector('input[name="password"]').setAttribute("invalid", "");
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
      this.error = "Error de conexión";
      this.isLoading = false;

      
      this.shadowRoot.querySelector('input[name="username"]').setAttribute("invalid", "");
      this.shadowRoot.querySelector('input[name="password"]').setAttribute("invalid", "");
    }
  }

  handleUserNameInput(event) {
    this.userName = event.target.value;
  }

  handlePassInput(event) {
    this.password = event.target.value;
  }

  renderLoader() {
    return html`
      <div class="loader-container">
        <img class="loader" src="https://i.gifer.com/ZZ5H.gif" alt="Cargando..." />
        <p class="loading-text">Cargando la siguiente vista...</p>
      </div>
    `;
  }

  render() {
    if (this.isLoggedIn) {
      return html`<mis-cuentas .user=${JSON.parse(sessionStorage.getItem("user"))}></mis-cuentas>`;
    }

    if (this.showLoader) {
      return this.renderLoader();
    }

    return html`
      <main>
        <div class="image-container"></div>
        ${this.error ? html`<p class="error-message">${this.error}</p>` : ""}
        <section>
          <input
            type="text"
            name="username"
            placeholder="Usuario"
            .value=${this.userName}
            @input=${this.handleUserNameInput}
            required
          />
          <div class="password-container">
            <input
              name="password"
              placeholder="Contraseña"
              .value=${this.password}
              @input=${this.handlePassInput}
              type="password"
              required
            />
          </div>
          <button class="enter-button" @click=${this.dataUser} ?disabled=${this.isLoading}>
            ${this.isLoading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </section>
      </main>
    `;
  }
}
