class MyFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer bg-light border-top shadow-sm mt-5 pt-4 pb-3">
        <div class="container">
          <div class="row gy-4 align-items-center text-secondary text-center text-md-start">
            
            <!-- Columna 1: Logo y nombre -->
            <div class="col-12 col-md-4 d-flex flex-column align-items-center align-items-md-start">
              <a href="/" class="d-inline-flex align-items-center text-decoration-none mb-2 mb-md-1">
                <img src="/assets/img/tkd_parana_logo.png" alt="TaekwondoParaná Logo" width="48" height="48" class="me-2" style="object-fit: contain;">
                <span class="fs-4 fw-bold text-primary">TaekwondoParaná</span>
              </a>
              <p class="mb-0 small text-center text-md-start">"Promoviendo el Taekwondo en Paraná y la región"</p>
            </div>

            <!-- Columna 2: Enlaces + redes -->
            <div class="col-12 col-md-4">
              <nav class="d-flex flex-wrap justify-content-center justify-content-center gap-2 gap-md-3 mb-3">
                <a href="/" class="text-secondary text-decoration-none">Inicio</a>
                <a href="/content/teoria.html" class="text-secondary text-decoration-none">Teoría</a>
                <a href="/forum/foro.html" class="text-secondary text-decoration-none">Foro</a>
                <a href="/contact/contacto.html" class="text-secondary text-decoration-none">Contacto</a>
              </nav>
              <div class="d-flex justify-content-center justify-content-center gap-3">
                <a href="https://facebook.com" target="_blank" class="text-secondary" aria-label="Facebook">
                  <i class="fab fa-facebook fa-lg"></i>
                </a>
                <a href="https://instagram.com" target="_blank" class="text-secondary" aria-label="Instagram">
                  <i class="fab fa-instagram fa-lg"></i>
                </a>
                <a href="mailto:taekwondoparana@gmail.com" class="text-secondary" aria-label="Email">
                  <i class="fas fa-envelope fa-lg"></i>
                </a>
              </div>
            </div>

            <!-- Columna 3: Copyright + autor -->
            <div class="col-12 col-md-4 d-flex flex-column align-items-center align-items-md-end">
              <p class="mb-1 small">&copy; ${new Date().getFullYear()} TaekwondoParaná</p>
              <p class="mb-0 small">Desarrollado por <span class="fw-bold text-primary">Esteban Olguin</span></p>
            </div>

          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("my-footer", MyFooter);
