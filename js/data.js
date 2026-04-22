// js/data.js - Versión corregida (variable global)

const laboratoriosIniciales = [
  { id: 1, nombre: "Caída Libre con Sensor", autor: "Juan Pérez", categoria: "Física", descripcion: "Medición experimental de aceleración gravitatoria", archivo: "caida_libre.pdf", colaboradores: ["María López"], fecha: "2026-04-10" },
  { id: 2, nombre: "Síntesis de Aspirina", autor: "Ana Ramírez", categoria: "Química", descripcion: "Procedimiento de síntesis orgánica", archivo: "aspirina_lab.pdf", colaboradores: ["Carlos Díaz"], fecha: "2026-04-09" },
  { id: 3, nombre: "Genética de Drosophila", autor: "Luis Mendoza", categoria: "Biología", descripcion: "Cruces genéticos y observación de fenotipos", archivo: "drosophila.pdf", colaboradores: [], fecha: "2026-04-08" },
  { id: 4, nombre: "Algoritmo de Dijkstra", autor: "Pablo Torres", categoria: "Informática", descripcion: "Implementación visual del algoritmo", archivo: "dijkstra.py", colaboradores: ["Sofía Vargas"], fecha: "2026-04-07" },
  { id: 5, nombre: "Cálculo de Derivadas Numéricas", autor: "Elena Soto", categoria: "Matemáticas", descripcion: "Método de diferencias finitas", archivo: "derivadas.pdf", colaboradores: [], fecha: "2026-04-06" },
  { id: 6, nombre: "Resistencia Eléctrica", autor: "Miguel Castro", categoria: "Física", descripcion: "Ley de Ohm experimental", archivo: "ohm.pdf", colaboradores: ["Laura Ruiz"], fecha: "2026-04-05" },
  { id: 7, nombre: "Titulación Ácido-Base", autor: "Carla Vargas", categoria: "Química", descripcion: "Determinación de concentración", archivo: "titulacion.pdf", colaboradores: [], fecha: "2026-04-04" },
  { id: 8, nombre: "Ecosistema Acuático", autor: "Diego Morales", categoria: "Biología", descripcion: "Cadena trófica en acuario", archivo: "ecosistema.pdf", colaboradores: ["Andrea Flores"], fecha: "2026-04-03" },
  { id: 9, nombre: "Machine Learning Básico", autor: "Valeria Ortiz", categoria: "Informática", descripcion: "Clasificador de imágenes simple", archivo: "ml_basico.ipynb", colaboradores: [], fecha: "2026-04-02" },
  { id: 10, nombre: "Cálculo Integral Aplicado", autor: "Jorge Silva", categoria: "Matemáticas", descripcion: "Áreas bajo la curva", archivo: "integral.pdf", colaboradores: ["Rosa Pérez"], fecha: "2026-04-01" }
];

// Hacemos la variable GLOBAL para que app.js la pueda leer
window.laboratorios = JSON.parse(localStorage.getItem('laboratorios')) || laboratoriosIniciales;

// Si no hay nada guardado, guardamos los iniciales
if (window.laboratorios.length === 0) {
  window.laboratorios = laboratoriosIniciales;
  localStorage.setItem('laboratorios', JSON.stringify(window.laboratorios));
}

console.log('✅ LabHub cargó', window.laboratorios.length, 'laboratorios');