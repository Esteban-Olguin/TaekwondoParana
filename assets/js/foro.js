import { auth, db } from "/assets/js/firebase-init.js";
import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
    collection,
    addDoc,
    getDocs,
    serverTimestamp,
    query,
    orderBy,
    doc,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const listaTemas = document.getElementById("temas-ul");
const crearTema = document.getElementById("crear-tema");
const mensajeLogin = document.getElementById("mensaje-login");
const formNuevoTema = document.getElementById("form-nuevo-tema");
const busquedaForm = document.getElementById("busqueda-form");
const busquedaInput = document.getElementById("busqueda-input");

let usuarioActual = null;

onAuthStateChanged(auth, async (user) => {
    usuarioActual = user;

    if (user) {
        crearTema.classList.remove("d-none");
        mensajeLogin.classList.add("d-none");

        formNuevoTema.addEventListener("submit", async (e) => {
            e.preventDefault();
            const titulo = document.getElementById("titulo-tema").value.trim();
            const contenido = document.getElementById("contenido-tema").value.trim();

            if (!titulo || !contenido) return;

            await addDoc(collection(db, "foro-temas"), {
                titulo,
                contenido,
                autor: user.displayName || user.email,
                fecha: serverTimestamp()
            });

            formNuevoTema.reset();
            cargarTemas();
        });
    } else {
        crearTema.classList.add("d-none");
        mensajeLogin.classList.remove("d-none");
    }

    cargarTemas();
});

busquedaForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const termino = busquedaInput.value.trim().toLowerCase();
    if (!termino) {
        cargarTemas();
        return;
    }

    listaTemas.innerHTML = "";
    const temasRef = query(collection(db, "foro-temas"), orderBy("fecha", "desc"));
    const snapshot = await getDocs(temasRef);

    const resultados = snapshot.docs.filter(doc => {
        const tema = doc.data();
        return (
            tema.titulo.toLowerCase().includes(termino) ||
            tema.autor.toLowerCase().includes(termino)
        );
    });

    if (resultados.length === 0) {
        listaTemas.innerHTML = `<li class="list-group-item text-center text-muted">No se encontraron temas que coincidan.</li>`;
        return;
    }

    renderTemas(resultados);
});

async function cargarTemas() {
    const temasRef = query(collection(db, "foro-temas"), orderBy("fecha", "desc"));
    const snapshot = await getDocs(temasRef);
    renderTemas(snapshot.docs);
}

async function renderTemas(docs) {
    listaTemas.innerHTML = "";

    for (const docTema of docs) {
        const tema = docTema.data();
        const temaId = docTema.id;

        const item = document.createElement("li");
        item.className = "list-group-item mb-4";
        item.innerHTML = `
      <h6 class="fw-bold mb-1">${tema.titulo}</h6>
      <p class="mb-1 text-muted">${tema.contenido}</p>
      <small class="text-secondary d-block mb-2">Publicado por ${tema.autor}</small>
      ${usuarioActual && tema.autor === (usuarioActual.displayName || usuarioActual.email) ? `
        <div class="mt-2">
          <button class="btn btn-sm eliminar-tema" data-id="${temaId}">Eliminar tema</button>
        </div>
      ` : ''}
      <div id="respuestas-${temaId}" class="mb-3"></div>
      ${usuarioActual ? `
        <form class="form-respuesta" data-tema="${temaId}">
          <div class="input-group mb-2">
            <input type="text" class="form-control" placeholder="Escribí tu respuesta..." required>
            <button class="btn enviar-respuesta" type="submit">Responder</button>
          </div>
        </form>
      ` : ''}
    `;

        listaTemas.appendChild(item);

        const respuestasRef = collection(db, "foro-temas", temaId, "respuestas");
        const respuestasSnap = await getDocs(respuestasRef);
        const respuestasDiv = document.getElementById(`respuestas-${temaId}`);

        respuestasSnap.forEach((res) => {
            const r = res.data();
            const resId = res.id;
            const fecha = r.fecha?.toDate().toLocaleString("es-AR") || "Sin fecha";

            const respuestaEl = document.createElement("div");
            respuestaEl.className = "border-start ps-3 mb-2";
            respuestaEl.innerHTML = `
        <p class="mb-1">${r.texto}</p>
        <small class="text-muted">— ${r.autor} | ${fecha}</small>
      `;

            if (usuarioActual && r.autor === (usuarioActual.displayName || usuarioActual.email)) {
                respuestaEl.innerHTML += `
          <div class="mt-2">
            <button class="btn btn-sm me-2 editar-respuesta" data-id="${resId}" data-tema="${temaId}">Editar</button>
            <button class="btn btn-sm eliminar-respuesta" data-id="${resId}" data-tema="${temaId}">Eliminar</button>
          </div>
        `;
            }

            respuestasDiv.appendChild(respuestaEl);
        });
    }

    document.querySelectorAll(".form-respuesta").forEach(form => {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const temaId = form.dataset.tema;
            const input = form.querySelector("input");
            const texto = input.value.trim();
            if (!texto) return;

            await addDoc(collection(db, "foro-temas", temaId, "respuestas"), {
                texto,
                autor: usuarioActual.displayName || usuarioActual.email,
                fecha: serverTimestamp()
            });

            input.value = "";
            cargarTemas();
        });
    });

    document.querySelectorAll(".editar-respuesta").forEach(btn => {
        btn.addEventListener("click", async () => {
            const temaId = btn.dataset.tema;
            const resId = btn.dataset.id;
            const nuevoTexto = prompt("Editá tu respuesta:");
            if (!nuevoTexto) return;

            const resRef = doc(db, "foro-temas", temaId, "respuestas", resId);
            await updateDoc(resRef, { texto: nuevoTexto });
            cargarTemas();
        });
    });

    document.querySelectorAll(".eliminar-respuesta").forEach(btn => {
        btn.addEventListener("click", async () => {
            const temaId = btn.dataset.tema;
            const resId = btn.dataset.id;
            if (!confirm("¿Eliminar esta respuesta?")) return;

            const resRef = doc(db, "foro-temas", temaId, "respuestas", resId);
            await deleteDoc(resRef);
            cargarTemas();
        });
    });

    document.querySelectorAll(".eliminar-tema").forEach(btn => {
        btn.addEventListener("click", async () => {
            const temaId = btn.dataset.id;
            if (!confirm("¿Eliminar este tema y todas sus respuestas?")) return;

            const respuestasRef = collection(db, "foro-temas", temaId, "respuestas");
            const respuestasSnap = await getDocs(respuestasRef);
            for (const res of respuestasSnap.docs) {
                await deleteDoc(doc(db, "foro-temas", temaId, "respuestas", res.id));
            }

            await deleteDoc(doc(db, "foro-temas", temaId));
            cargarTemas();
        });
    });
}
