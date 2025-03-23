import { LitElement, html, css } from "lit";


export class MisCuentas extends LitElement {
    constructor() {
        super();
        //inicializar el valor por defecto de las props
    }

    //Propiedades que van a ser observadas (cambios)
    static properties = {

    }
    static styles = css `
    
    
    `;

    //Se renderiza en el shadow DOM
    render() {
        return html`
           <header-app></header-app>
           <card-app></card-app>
        `;
    }
}



export class Header extends LitElement {
    constructor() {
        super();
        //inicializar el valor por defecto de las props

    }

    //Propiedades que van a ser observadas (cambios)
    static properties = {

    }

    static styles = css `
        h3{
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
        .icon-header{
            position: absolute;
            right: 1rem;
            top: 1rem;
        }
        i {
            color: white;
            margin-right: 0.5rem;
        }
       
    `;
    //Se renderiza en el shadow DOM
    render() {
        return html `
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <header>
            <h3>Hola, User</h3>
            <section class="icon-header">
                <i class="icon material-icons">help</i>
                <i class="icon material-icons">menu</i>
            </section>

        </header>
        `;
    }

}