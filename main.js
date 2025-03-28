import { UserProfile } from "./components/user-profile.js";
import { MisCuentas } from "./components/MisCuentas.js";
import { Header } from "./components/MisCuentas.js";
import { Card } from "./components/MisCuentas.js";
import { DetallesCuenta } from "./components/DetallesCuenta.js";

window.customElements.define('user-profile', UserProfile);
window.customElements.define('mis-cuentas', MisCuentas);
window.customElements.define('header-app', Header);
window.customElements.define('card-app', Card);
window.customElements.define('detalles-cuenta', DetallesCuenta);