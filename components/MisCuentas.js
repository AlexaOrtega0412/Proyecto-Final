import { LitElement, html, css } from "lit";

export class MisCuentas extends LitElement {
  constructor() {
    super();
    //inicializar el valor por defecto de las props
    const storedUser = sessionStorage.getItem("user");
    this.user = storedUser ? JSON.parse(storedUser) : null;
    this.cuentaSeleccionada = JSON.parse(sessionStorage.getItem("cuentaSeleccionada"));
  }

  //Propiedades que van a ser observadas (cambios)
  static properties = {
    user: { type: Object },
    cuentaSeleccionada: {type: Object},
  };

  static styles = css`
  .icon-header {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
  i {
    color: white;
    margin-right: 0.5rem;
    cursor: pointer;
  }

  @media (min-width: 1024px) {
      .icon-header {
          position: absolute;
          right: 28rem;
          top: 8rem;
        }
  }
  `;

  logout() {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("cuentaSeleccionada");
    window.location.href = "/";
  }

  handleCardClicked(event){
    //Actualiza la cuenta seleccionada
    this.cuentaSeleccionada = event.detail;
    sessionStorage.setItem("cuentaSeleccionada", JSON.stringify(this.cuentaSeleccionada))
  }

backMyAccounts() {
  this.cuentaSeleccionada = null;
  sessionStorage.removeItem("cuentaSeleccionada");
  console.log("Cuenta seleccionada:", this.cuentaSeleccionada); 
  window.location.reload() 
}

  //Se renderiza en el shadow DOM
  render() {
    if(this.cuentaSeleccionada) {
      return html`
      <detalles-cuenta .cuenta=${this.cuentaSeleccionada} .user=${this.user} .backPage=${this.backMyAccounts}></detalles-cuenta>
      `;
    }
    return html`
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <section class="icon-header">
          <i class="icon material-icons" @click=${this.logout}>exit_to_app</i>
        </section>
      <header-app .user=${this.user}></header-app>
      <card-app .user=${this.user} @card-clicked=${this.handleCardClicked}></card-app>
    `;
  }
}

export class Header extends LitElement {
  //Propiedades que van a ser observadas (cambios)
  static properties = {
    user: { type: Object },
  };

  static styles = css`
    h3 {
      color: #fff;
      font-weight: 300;
    }
    header {
      display: flex;
      flex-direction: column;
      background-color: #0a588b;
      justify-content: center;
      align-items: center;
    }
  `;
  
  //Se renderiza en el shadow DOM
  render() {
    const name = this.user ? this.user.name : "Usuario";
    console.log(this.user);
    return html`
      <header>
        <h3>Hola, ${name}</h3>
      </header>
    `;
  }
}

export class Card extends LitElement {
  //Propiedades que van a ser observadas (cambios)
  static properties = {
    user: { type: Object },
    showAccounts: { type: Number }
  };

  constructor() {
    super();
    this.showAccounts = 3;
}

  static styles = css`
    main {
      padding: 1rem;
      display:flex;
      flex-direction: column;
      height: 100vh;
      overflow: scroll;

    }

    .card {
      background-color: #fff;
      border-radius: 0.5rem;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      align-items: center;
      cursor: pointer;
    }
    .card :nth-child(2) {
      text-align: right;
    }
    h3 {
      font-weight: 400;
      color: #9c9c9c;
    }
    .saldo {
      color: #9c9c9c;
    }
    .account-type {
      color: #0a588b;
      font-weight: bold;
    }
    .btn-more{
        margin-top: 1.5rem;
        background-color: transparent;
        border: none;
        color: #fff;
        font-size: 1.2rem;
        cursor: pointer;
        text-decoration: underline; 
    }
    .btn-more:hover{
        font-weight: bold;
    }
    img{
        width: 7rem;
    }
  `;

  moreAccounts(){
    this.showAccounts += 3;
  }

  cardClicked(cuenta) {
    const event = new CustomEvent("card-clicked", {
      detail: cuenta,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }


  //Se renderiza en el shadow DOM
  render() {
    const cuentas = this.user ? this.user.cuentas : [];
    console.log(cuentas);
    const cuentasAMostrar = cuentas.slice(0, this.showAccounts);

    return html`
      <main>
        <h3>MIS CUENTAS</h3>
        ${cuentasAMostrar.length > 0
          ? html`
              ${cuentasAMostrar.map(
                (cuenta) => html`
                  <section class="card" @click=${() => this.cardClicked(cuenta)}>
                    <section>
                      <p class="account-type">${cuenta.tipo}</p>
                      <img src="${cuenta.img}">
                    </section>
                    <section>
                      <p>${cuenta.saldo}</p>
                      <p class="saldo">Saldo disponible</p>
                    </section>
                  </section>
                `)}
                 ${cuentasAMostrar.length < cuentas.length
                  ? html`<button class="btn-more" @click=${this.moreAccounts}>Cargar más</button>` 
                  : ''
                  }
            `
          : html`<p>No tienes cuentas registradas</p>`}
      </main>
    `;
  }
}
