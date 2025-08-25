// Importar Firebase desde CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Configuración del proyecto Firebase
const firebaseConfig = {
    apiKey: "AIzaSyABTVN53G-WVa_9917ehc0AEkvFCv2OTvU",
    authDomain: "taekwondoparana-b8e30.firebaseapp.com",
    projectId: "taekwondoparana-b8e30",
    storageBucket: "taekwondoparana-b8e30.appspot.com",
    messagingSenderId: "3478244979",
    appId: "1:3478244979:web:30460edc2b6a4166452406",
    measurementId: "G-39ZVM00JSL"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


// ========== CRONOGRAMA DE EVENTOS ========== >
export async function cargarEventos() {
    const eventosRef = collection(db, "eventos");
    const snapshot = await getDocs(eventosRef);

    const contenedor = document.getElementById("lista-eventos");
    if (!contenedor) return;

    const eventos = [];
    snapshot.forEach((doc) => {
        eventos.push(doc.data());
    });

    eventos.sort((a, b) => {
        if (a.fecha === b.fecha) {
            return (a.hora || '').localeCompare(b.hora || '');
        }
        return (a.fecha || '').localeCompare(b.fecha || '');
    });

    contenedor.innerHTML = `
    <div class="table-responsive">
      <table class="table table-hover table-bordered align-middle shadow-sm">
        <thead class="table-light">
          <tr>
            <th scope="col" class="text-secondary">
              <i class="fas fa-calendar-day me-1"></i> Fecha
            </th>
            <th scope="col" class="text-secondary">
              <i class="fas fa-clock me-1"></i> Hora
            </th>
            <th scope="col" class="text-secondary">
              <i class="fas fa-bullhorn me-1"></i> Evento
            </th>
            <th scope="col" class="text-secondary">
              <i class="fas fa-map-marker-alt me-1"></i> Sede
            </th>
            <th scope="col" class="text-secondary">
              <i class="fas fa-align-left me-1"></i> Descripción
            </th>
          </tr>
        </thead>
        <tbody>
          ${eventos.map(evento => `
            <tr>
              <td><span class="badge bg-light text-dark">${evento.fecha || ''}</span></td>
              <td><span class="text-muted">${evento.hora || ''}</span></td>
              <td class="fw-semibold text-primary">${evento.titulo || ''}</td>
              <td>${evento.sede || ''}</td>
              <td class="text-muted">${evento.descripcion || ''}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}
