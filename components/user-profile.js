import { LitElement, html, css } from "lit";

export class UserProfile extends LitElement {
  static styles = css`
    main{
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
   
    .enter-button {
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
      background-color: #ccc;
    }

    .error-message {
      color: #f25959;
    }
    @media (min-width: 1024px) {
      .image-container{
        border-radius: 10px 10px 0 0;
      }
    }
  `;

  constructor() {
    super();
    this.userName = ''; 
    this.password = '';
    this.error = '';
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';;
  }

  static properties ={
    userName: {type: String},
    password: {type:String},
    error: { type: String },
    isLoggedIn: { type: Boolean }
    

  }

  async dataUser() {
    try{
      const response = await fetch('http://localhost:3000/users');
      const data = await response.json();
      const buscarUsuario = data.find(user => user.user === this.userName && user.pass === this.password);

      if (buscarUsuario) {
        sessionStorage.setItem('user', JSON.stringify(buscarUsuario));
        sessionStorage.setItem('isLoggedIn', 'true'); // Guarda el estado en sessionStorage
        this.isLoggedIn = true;
      } else {
        this.error = 'Usuario o contraseña incorrectos';
        this.password = '';
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      this.error = 'Error de conexión';
    }
  }

  handleUserNameInput(event) {
    this.userName = event.target.value; 
  }
  handlePassInput(event) {
    this.password = event.target.value; 
  }


  render() {
    return this.isLoggedIn
      ? html`<mis-cuentas .user=${JSON.parse(sessionStorage.getItem('user'))}></mis-cuentas>`
      : html`
      <main>
      <div class="image-container"></div>
      ${this.error ? html`<p class="error-message">${this.error}</p>` : ''}
        <section>
          <input type="text" placeholder="Usuario" .value=${this.userName} @input=${this.handleUserNameInput} required>
          <div class="password-container">
            <input placeholder="Contraseña" .value=${this.password} @input=${this.handlePassInput} type="password" required>
          </div>
          <button class="enter-button" @click=${this.dataUser}>Iniciar sesión</button>
        </section>
      </main>
        
      `;
  }
}