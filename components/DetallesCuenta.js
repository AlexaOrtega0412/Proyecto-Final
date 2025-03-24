import { LitElement, html, css } from "lit";

export class DetallesCuenta extends LitElement {
  constructor() {
    super();
  }

  //Propiedades que van a ser observadas (cambios)
  static properties = {
    user: { type: Object },
    cuenta: { type: Object },
    backPage: { type: Function },
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
    .icon{
        position: absolute;
        top: 1rem;
        left: 1rem;
    }
    h2{
        font-weight: 300;
        text-align:center;
        margin-bottom: 3.5rem;
    }
    img{
        height: 9rem;
    }
    main{
        padding:1rem;
        background-color: #fff;
        margin: 1rem;
        border-radius: 0.5rem;
        padding-bottom: 6rem;
    }
    .tag{
        display:flex;
        justify-content: space-around;
    }
    .tag:nth-child(2){
        text-align: right;
    }
    .sub{
        color: #ccc;
        margin:0;
    }
    p{
        margin-top: 0;
    }
    li{
        margin-bottom: 1rem;
    }
    @media (min-width: 1024px) {
        .icon-header {
            position: absolute;
            right: 28rem;
            top: 8rem;
          }
        .icon{
            position:absolute;
            left: 28rem;
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

  render() {
    if (!this.cuenta) {
      return html`<p>No se ha seleccionado ninguna cuenta.</p>`;
    }
    return html`
    <i class="icon material-icons" @click=${this.backPage}>arrow_back</i>
    <header-app .user=${this.user}></header-app>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <section class="icon-header">
        <i class="material-icons" @click=${this.logout}>exit_to_app</i>
      </section>

      <main>
      
      <h2>Detalles de la cuenta <strong>${this.cuenta.tipo}</strong></h2>
        <section class="tag">
        <img src="${this.cuenta.img}">
            <section>
                <p class="sub">Número de tarjeta</p>
                <p>${this.cuenta.numero}</p>
                <p class="sub">Saldo disponible</p>
                <p>${this.cuenta.saldo}</p>
                <p class="sub">Saldo deudor</p>
                <p>${this.cuenta.deuda}</p>
                <p class="sub">CVV</p>
                <p>${this.cuenta.cvv}</p>
                <p class="sub">Valido hasta</p>
                <p>${this.cuenta.fecha}</p>
            </section>
        </section>
        <hr>
        <h2>Beneficios</h2>
        <ul>
            ${this.cuenta.caracteristicas.map(
            (caracteristica) => html`<li>${caracteristica}</li>`
            )}
        </ul>
      </main>
    `;
  }
}
