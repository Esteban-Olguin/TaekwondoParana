import { auth } from "/assets/js/firebase-init.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

class MyHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="header bg-light fixed-top">
        <nav class="navbar container navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand d-flex align-items-center" href="/index.html">
              <img src="/assets/img/tkd_parana_logo.png" alt="TaekwondoParaná Logo" class="logo me-2" width="48" height="48" style="object-fit:contain;">
              <span class="fw-bold fs-4">TaekwondoParaná</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item"><a class="nav-link" href="/index.html">Inicio</a></li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="formacionDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Formación
                  </a>
                  <ul class="dropdown-menu bg-light" aria-labelledby="formacionDropdown">
                    <li><a class="dropdown-item" href="/content/teoria.html">Teoría del Taekwondo</a></li>
                    <li><a class="dropdown-item" href="/content/foro.html">Foro</a></li>
                  </ul>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="institucionalDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Institucional
                  </a>
                  <ul class="dropdown-menu bg-light" aria-labelledby="institucionalDropdown">
                    <li><a class="dropdown-item" href="/content/cronograma.html">Cronograma de eventos</a></li>
                    <li><a class="dropdown-item" href="/content/sedes.html">Sedes institucionales</a></li>
                  </ul>
                </li>
                <li class="nav-item"><a class="nav-link" href="/contact/contacto.html">Contacto</a></li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="cuentaDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Cuenta
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end bg-light" id="cuenta-dropdown" aria-labelledby="cuentaDropdown">
                    <li><a class="dropdown-item" href="/auth/login.html">Iniciar sesión</a></li>
                    <li><a class="dropdown-item" href="/auth/registro.html">Registro</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    `;

    // Actualizar dropdown según sesión
    onAuthStateChanged(auth, (user) => {
      const cuentaDropdown = this.querySelector("#cuenta-dropdown");
      if (!cuentaDropdown) return;

      if (user) {
        const nombre = user.displayName || user.email;

        cuentaDropdown.innerHTML = `
          <li><a class="dropdown-item disabled">Bienvenido, ${nombre}</a></li>
          <li><a class="dropdown-item" href="#" id="cerrar-sesion">Cerrar sesión</a></li>
        `;

        this.querySelector("#cerrar-sesion").addEventListener("click", () => {
          signOut(auth).then(() => location.reload());
        });
      } else {
        cuentaDropdown.innerHTML = `
          <li><a class="dropdown-item" href="/auth/login.html">Iniciar sesión</a></li>
          <li><a class="dropdown-item" href="/auth/registro.html">Registro</a></li>
        `;
      }
    });
  }
}

customElements.define("my-header", MyHeader);