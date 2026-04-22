// js/app.js - VERSIÓN COMPLETA Y CORREGIDA (funciona en Chrome y Brave)

function renderLabs(filteredLabs) {
  const container = document.getElementById('labsContainer');
  if (!container) return;

  container.innerHTML = '';

  filteredLabs.forEach(lab => {
    const card = document.createElement('div');
    card.className = 'repo-card bg-zinc-900 border border-zinc-700 rounded-2xl p-6 hover:border-emerald-500 transition-all';
    card.innerHTML = `
      <div class="flex justify-between items-start">
        <h3 class="text-xl font-semibold">${lab.nombre}</h3>
        <span class="text-xs bg-emerald-900 text-emerald-300 px-3 py-1 rounded-full">${lab.categoria}</span>
      </div>
      <p class="text-zinc-400 text-sm mt-3">${lab.descripcion}</p>
      <div class="mt-4 text-xs flex items-center gap-2">
        <span class="text-emerald-400">@${lab.autor}</span>
        ${lab.colaboradores && lab.colaboradores.length ? ' • ' + lab.colaboradores.join(', ') : ''}
      </div>
      <div class="mt-6 flex justify-between items-center">
        <button onclick="descargar('${lab.archivo}')" class="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-sm">
          ⬇ ${lab.archivo}
        </button>
        <span class="text-xs text-zinc-500">${lab.fecha}</span>
      </div>
    `;
    container.appendChild(card);
  });

  if (filteredLabs.length === 0) {
    container.innerHTML = `<p class="text-center py-12 text-zinc-400">No hay laboratorios</p>`;
  }
}

function descargar(filename) {
  alert(`✅ Descargando: ${filename} (simulado)`);
}

function filtrarLabs() {
  const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
  const categoria = document.getElementById('categoryFilter')?.value || '';

  let filtered = window.laboratorios || [];
  if (search) filtered = filtered.filter(l => l.nombre.toLowerCase().includes(search));
  if (categoria) filtered = filtered.filter(l => l.categoria === categoria);

  renderLabs(filtered);
}

// ====================== FORMULARIO DE SUBIDA ======================
if (document.getElementById('uploadForm')) {
  console.log('📤 Formulario de subida detectado');

  let archivoSeleccionado = null;
  let colaboradoresTemp = [];

  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('fileInput');
  const filePreview = document.getElementById('filePreview');
  const fileNameEl = document.getElementById('fileName');
  const fileSizeEl = document.getElementById('fileSize');
  const removeFileBtn = document.getElementById('removeFileBtn');
  const selectFileBtn = document.getElementById('selectFileBtn');

  // Click para seleccionar archivo
  selectFileBtn?.addEventListener('click', () => fileInput.click());
  dropZone?.addEventListener('click', () => fileInput.click());

  // Drag & Drop
  dropZone?.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.classList.add('border-emerald-500');
  });
  dropZone?.addEventListener('dragleave', () => dropZone.classList.remove('border-emerald-500'));
  dropZone?.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('border-emerald-500');
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  });

  fileInput?.addEventListener('change', () => {
    if (fileInput.files[0]) handleFile(fileInput.files[0]);
  });

  function handleFile(file) {
    archivoSeleccionado = file;
    fileNameEl.textContent = file.name;
    fileSizeEl.textContent = (file.size / 1024 / 1024).toFixed(2) + " MB";
    filePreview.classList.remove('hidden');
  }

  removeFileBtn?.addEventListener('click', () => {
    archivoSeleccionado = null;
    filePreview.classList.add('hidden');
    fileInput.value = '';
  });

  // Colaboradores
  document.getElementById('addColabBtn')?.addEventListener('click', () => {
    const input = document.getElementById('colaboradorInput');
    if (input.value.trim()) {
      colaboradoresTemp.push(input.value.trim());
      renderColaboradores();
      input.value = '';
    }
  });

  function renderColaboradores() {
    const container = document.getElementById('colaboradoresList');
    container.innerHTML = colaboradoresTemp.map((c, i) => `
      <div class="bg-zinc-800 text-xs px-4 py-1 rounded-2xl flex items-center gap-2">
        ${c} <span onclick="this.parentElement.remove(); colaboradoresTemp.splice(${i},1)" class="cursor-pointer text-red-400">✕</span>
      </div>
    `).join('');
  }

  // SUBMIT - Subir laboratorio
  document.getElementById('uploadForm').addEventListener('submit', (e) => {
    e.preventDefault();

    if (!archivoSeleccionado) {
      alert("⚠️ Debes seleccionar un archivo");
      return;
    }

    const nuevoLab = {
      id: Date.now(),
      nombre: document.getElementById('nombre').value,
      descripcion: document.getElementById('descripcion').value || 'Sin descripción',
      categoria: document.getElementById('categoria').value,
      archivo: archivoSeleccionado.name,
      autor: localStorage.getItem('currentUser') || 'estudiante',
      colaboradores: colaboradoresTemp,
      fecha: new Date().toISOString().split('T')[0]
    };

    window.laboratorios.unshift(nuevoLab);
    localStorage.setItem('laboratorios', JSON.stringify(window.laboratorios));

    alert(`✅ ¡${archivoSeleccionado.name} subido correctamente!`);
    window.location.href = 'index.html';
  });
}

// ====================== INICIALIZACIÓN (index.html) ======================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 LabHub iniciando...');

  if (!window.laboratorios || window.laboratorios.length === 0) {
    console.error('❌ No se cargaron los laboratorios');
    return;
  }

  console.log(`✅ ${window.laboratorios.length} laboratorios cargados`);

  // Solo para index.html
  if (document.getElementById('labsContainer')) {
    const select = document.getElementById('categoryFilter');
    const categorias = [...new Set(window.laboratorios.map(l => l.categoria))];
    categorias.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      select.appendChild(option);
    });

    renderLabs(window.laboratorios);

    document.getElementById('searchInput')?.addEventListener('input', filtrarLabs);
    document.getElementById('categoryFilter')?.addEventListener('change', filtrarLabs);
  }

  console.log('✅ Todo listo');
});
// // js/app.js - Versión con Firebase Auth real

// // Inicializar Firebase
// let auth;
// function initFirebase() {
//   if (typeof firebase !== 'undefined') {
//     firebase.initializeApp(firebaseConfig);
//     auth = firebase.auth();
//     console.log('✅ Firebase Auth conectado');
//   }
// }

// // === LOGIN / REGISTRO ===
// if (document.getElementById('authForm')) {
//   initFirebase();

//   const form = document.getElementById('authForm');
//   const submitBtn = document.getElementById('submitBtn');
//   const registerBtn = document.getElementById('registerBtn');
//   const messageEl = document.getElementById('message');

//   let isLogin = true;

//   registerBtn.addEventListener('click', () => {
//     isLogin = !isLogin;
//     submitBtn.textContent = isLogin ? 'Iniciar sesión' : 'Registrarse';
//     registerBtn.textContent = isLogin ? 'Crear cuenta nueva' : '¿Ya tienes cuenta? Inicia sesión';
//   });

//   form.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const email = document.getElementById('email').value.trim();
//     const password = document.getElementById('password').value;

//     messageEl.textContent = '';

//     try {
//       if (isLogin) {
//         await auth.signInWithEmailAndPassword(email, password);
//         messageEl.innerHTML = `<span class="text-emerald-400">✅ Sesión iniciada</span>`;
//       } else {
//         await auth.createUserWithEmailAndPassword(email, password);
//         messageEl.innerHTML = `<span class="text-emerald-400">✅ Cuenta creada correctamente</span>`;
//       }
//       setTimeout(() => window.location.href = 'index.html', 1200);
//     } catch (error) {
//       messageEl.innerHTML = `<span class="text-red-400">⚠️ ${error.message}</span>`;
//     }
//   });
// }

// // === Proteger páginas (index y subir) ===
// function checkAuth() {
//   initFirebase();
//   if (!auth) return;

//   auth.onAuthStateChanged(user => {
//     if (!user && (window.location.pathname.includes('index.html') || window.location.pathname.includes('subir.html'))) {
//       window.location.href = 'login.html';
//     }
//     if (user && window.location.pathname.includes('login.html')) {
//       window.location.href = 'index.html';
//     }
//   });
// }

// // === Navbar con usuario real y logout ===
// function updateNavbar() {
//   const userInfo = document.getElementById('userInfo');
//   if (!userInfo) return;

//   auth.onAuthStateChanged(user => {
//     if (user) {
//       userInfo.innerHTML = `
//         <div class="flex items-center gap-3">
//           <div class="text-sm">
//             <span class="text-emerald-400">@${user.email.split('@')[0]}</span>
//           </div>
//           <button onclick="logout()" 
//                   class="text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-1 rounded-xl">
//             Cerrar sesión
//           </button>
//         </div>`;
//     }
//   });
// }

// window.logout = () => {
//   auth.signOut().then(() => {
//     window.location.href = 'login.html';
//   });
// };

// // === Inicializar todo ===
// document.addEventListener('DOMContentLoaded', () => {
//   checkAuth();
//   updateNavbar();
//   // (el resto de tu código anterior de labs, formulario, etc. se mantiene igual)
// });