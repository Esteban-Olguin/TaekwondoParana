// Componente personalizado para el footer
class MyFooter extends HTMLElement {
  connectedCallback() {
    // Contenido HTML del footer
    this.innerHTML = `
      <footer class="footer bg-light border-top shadow-sm mt-auto pt-4 pb-3">
        <div class="container">
          <div class="row gy-4 text-secondary text-center text-lg-start">

            <!-- Columna 1: Logo y nombre institucional -->
            <div class="col-12 col-lg-4 d-flex flex-column align-items-center align-items-lg-start">
              <a href="/" class="d-inline-flex align-items-center text-decoration-none mb-2">
                <img src="/assets/img/tkd_parana_logo.png" alt="TaekwondoParaná Logo" width="48" height="48" class="me-2" style="object-fit: contain;">
                <span class="fs-4 fw-bold text-primary">TaekwondoParaná</span>
              </a>
              <p class="mb-0 small text-center text-lg-start">"Promoviendo el Taekwondo en Paraná y la región"</p>
            </div>

            <!-- Columna 2: Enlaces de navegación y redes sociales -->
            <div class="col-12 col-lg-4 d-flex flex-column align-items-center">
              <nav class="d-flex flex-wrap justify-content-center gap-2 mb-3">
                <a href="../index.html" class="text-secondary text-decoration-none">Inicio</a>
                <a href="../content/teoria.html" class="text-secondary text-decoration-none">Teoría</a>
                <a href="../content/foro.html" class="text-secondary text-decoration-none">Foro</a>
                <a href="../contact/contacto.html" class="text-secondary text-decoration-none">Contacto</a>
              </nav>
              <div class="d-flex justify-content-center gap-3">
                <a href="https://facebook.com" target="_blank" class="text-secondary" aria-label="Facebook">
                  <i class="fab fa-facebook fa-lg"></i>
                </a>
                <a href="https://www.instagram.com/exequieltkd/" target="_blank" class="text-secondary" aria-label="Instagram">
                  <i class="fab fa-instagram fa-lg"></i>
                </a>
                <a href="mailto:olguinesteban20@gmail.com" class="text-secondary" aria-label="Email">
                  <i class="fas fa-envelope fa-lg"></i>
                </a>
              </div>
            </div>

            <!-- Columna 3: Derechos de autor y crédito de desarrollo -->
            <div class="col-12 col-lg-4 d-flex flex-column align-items-center align-items-lg-end">
              <p class="mb-1 small">&copy; ${new Date().getFullYear()} TaekwondoParaná</p>
              <p class="mb-0 small">Desarrollado por <span class="fw-bold text-primary"><a href="https://www.instagram.com/emi_olguin_/" target="_blank" class="text-primary text-decoration-none">Esteban Olguin</a></span></p>
            </div>

          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("my-footer", MyFooter);