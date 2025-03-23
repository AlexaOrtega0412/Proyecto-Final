import { LitElement, html, css } from "lit";

export class Card extends LitElement {
    constructor() {
        super();
        //inicializar el valor por defecto de las props

    }

    //Propiedades que van a ser observadas (cambios)
    static properties = {

    }

    static styles = css `
    main{
        padding: 1rem;
    }
    
    .card{
        background-color: #fff;
        border-radius: 0.5rem;
        padding: 1rem;
        display: flex;
        justify-content: space-between
    }
    .card :nth-child(2){
        text-align: right;
    }
    h3{
        font-weight: 400;
        color: #9C9C9C;
    }
    .saldo {
        color: #9C9C9C;
    }
    .account-type{
        color: #0a588b;
        font-weight: bold;
    }
    `;

    //Se renderiza en el shadow DOM
    render() {
        return html `
        <main>
        <h3>CUENTAS</h3>
            <section class="card">
               
                <section>
                    <p class="account-type">Ahorro</p>
                    <p>5412 34 14 7892 6391</p>
                </section>
                <section>
                    <p>$200</p>
                    <p class="saldo">Saldo disponible</p>
                </section>
            </section>
        </main>
        `;
    }
}