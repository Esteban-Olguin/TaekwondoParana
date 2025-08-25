import { auth } from "/assets/js/firebase-init.js";

// Importar funciones para detectar sesión y cerrar sesión
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Componente personalizado para el header
class MyHeader extends HTMLElement {
  connectedCallback() {
    // Estructura HTML del header
    this.innerHTML = `
      <header class="header bg-light fixed-top">
        <nav class="navbar container navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <!-- Logo y nombre -->
            <a class="navbar-brand d-flex align-items-center" href="/index.html">
              <img src="/assets/img/tkd_parana_logo.png" alt="TaekwondoParaná Logo" class="logo me-2" width="48" height="48" style="object-fit:contain;">
              <span class="fw-bold fs-4">TaekwondoParaná</span>
            </a>

            <!-- Botón hamburguesa para móviles -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Menú de navegación -->
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item"><a class="nav-link" href="/index.html">Inicio</a></li>

                <!-- Menú Formación -->
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="formacionDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Formación
                  </a>
                  <ul class="dropdown-menu bg-light" aria-labelledby="formacionDropdown">
                    <li><a class="dropdown-item" href="/content/teoria.html">Teoría del Taekwondo</a></li>
                    <li><a class="dropdown-item" href="/content/foro.html">Foro</a></li>
                  </ul>
                </li>

                <!-- Menú Institucional -->
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

                <!-- Menú Cuenta (se actualiza según sesión) -->
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

    // Detectar cambios en la sesión y actualizar el menú Cuenta
    onAuthStateChanged(auth, (user) => {
      const cuentaDropdown = this.querySelector("#cuenta-dropdown");
      if (!cuentaDropdown) return;

      if (user) {
        // Si hay sesión iniciada, mostrar nombre y botón para cerrar sesión
        const nombre = user.displayName || user.email;

        cuentaDropdown.innerHTML = `
          <li><a class="dropdown-item disabled">Bienvenido, ${nombre}</a></li>
          <li><a class="dropdown-item" href="#" id="cerrar-sesion">Cerrar sesión</a></li>
        `;

        // Cerrar sesión al hacer clic
        this.querySelector("#cerrar-sesion").addEventListener("click", () => {
          signOut(auth).then(() => location.reload());
        });
      } else {
        // Si no hay sesión, mostrar opciones de login y registro
        cuentaDropdown.innerHTML = `
          <li><a class="dropdown-item" href="/auth/login.html">Iniciar sesión</a></li>
          <li><a class="dropdown-item" href="/auth/registro.html">Registro</a></li>
        `;
      }
    });
  }
}

customElements.define("my-header", MyHeader);