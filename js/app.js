/**
 * ConstruIA 360 - Aplicación Principal y Enrutador de Obra
 * Grupo 9 - Ingeniería de Software II (UAGRM)
 */

import { CONSTRUCCION_DATA } from './data.js';
import { DashboardModule } from './modules/dashboard.js';
import { VisionEPPModule } from './modules/vision_epp.js';
import { OCRAlmacenModule } from './modules/ocr_almacen.js';
import { PrediccionStockModule } from './modules/prediccion_stock.js';
import { MaquinariaCostosModule } from './modules/maquinaria_costos.js';
import { BitacoraRAGModule } from './modules/bitacora_rag.js';

class ConstruIAApp {
  constructor() {
    this.currentRole = 'gerente';
    this.currentView = 'dashboard';

    // Instanciar módulos
    this.dashboardMod = new DashboardModule(this);
    this.visionMod = new VisionEPPModule(this);
    this.ocrMod = new OCRAlmacenModule(this);
    this.prediccionMod = new PrediccionStockModule(this);
    this.maquinariaMod = new MaquinariaCostosModule(this);
    this.bitacoraMod = new BitacoraRAGModule(this);
  }

  init() {
    this.setupTheme();
    this.setupRoleSwitcher();
    this.setupNavigation();

    // Inicializar módulos
    this.dashboardMod.init();
    this.visionMod.init();
    this.ocrMod.init();
    this.prediccionMod.init();
    this.maquinariaMod.init();
    this.bitacoraMod.init();

    this.navegarA('dashboard');

    if (window.lucide) window.lucide.createIcons();
    window.construApp = this;
  }

  setupRoleSwitcher() {
    const selector = document.getElementById('roleSelectorObra');
    if (!selector) return;

    selector.addEventListener('change', (e) => {
      this.currentRole = e.target.value;
      this.adaptarInterfazPorRol();
    });
  }

  adaptarInterfazPorRol() {
    const role = this.currentRole;
    const label = document.getElementById('currentRoleLabelObra');
    if (label) label.textContent = role.toUpperCase();

    if (role === 'gerente') {
      this.navegarA('dashboard');
      this.mostrarNotificacion("Modo Gerencia: Acceso integral al Dashboard Ejecutivo 360 y Curva S.", "info");
    } else if (role === 'residente') {
      this.navegarA('bitacora_rag');
      this.mostrarNotificacion("Modo Residente: Enfoque en Bitacora Diaria por Voz y avance fisico.", "info");
    } else if (role === 'seguridad') {
      this.navegarA('vision_epp');
      this.mostrarNotificacion("Modo Seguridad EPP: Inspeccion visual automatizada con Bounding Boxes.", "info");
    } else if (role === 'almacen') {
      this.navegarA('ocr_almacen');
      this.mostrarNotificacion("Modo Almacen: Scanner OCR de remisiones y conciliacion de stock.", "info");
    } else if (role === 'compras') {
      this.navegarA('prediccion_stock');
      this.mostrarNotificacion("Modo Compras: Prediccion de quiebre y comparador multicriterio.", "info");
    }
  }

  setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const view = item.dataset.view;
        if (view) this.navegarA(view);
      });
    });

    const tourBtn = document.getElementById('btnIniciarDemoTourObra');
    if (tourBtn) {
      tourBtn.addEventListener('click', () => this.ejecutarDemoTour());
    }
  }

  navegarA(viewId) {
    this.currentView = viewId;

    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.view === viewId);
    });

    document.querySelectorAll('.view-panel').forEach(panel => {
      panel.classList.remove('active');
    });

    const target = document.getElementById(`view_${viewId}`);
    if (target) target.classList.add('active');

    if (viewId === 'vision_epp') {
      this.visionMod.renderVisionCanvas();
    } else if (viewId === 'ocr_almacen') {
      this.ocrMod.renderDocumentoSimulado();
    } else if (viewId === 'prediccion_stock') {
      this.prediccionMod.initStockChart();
      this.prediccionMod.actualizarGraficoStock();
    }

    if (window.lucide) window.lucide.createIcons();
  }

  setupTheme() {
    const btn = document.getElementById('btnToggleThemeObra');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isCurrentlyDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isCurrentlyDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      btn.innerHTML = newTheme === 'light' 
        ? '<i data-lucide="moon" style="width:18px;height:18px;"></i>' 
        : '<i data-lucide="sun" style="width:18px;height:18px;"></i>';
      if (window.lucide) window.lucide.createIcons();
    });
  }

  mostrarNotificacion(mensaje, tipo = "info") {
    let toast = document.getElementById('globalToastObra');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'globalToastObra';
      toast.style.position = 'fixed';
      toast.style.bottom = '24px';
      toast.style.right = '24px';
      toast.style.padding = '12px 20px';
      toast.style.borderRadius = '10px';
      toast.style.color = '#080c14';
      toast.style.fontWeight = '700';
      toast.style.fontSize = '0.85rem';
      toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.6)';
      toast.style.zIndex = '9999';
      toast.style.transition = 'all 0.3s ease';
      document.body.appendChild(toast);
    }

    if (tipo === "success") {
      toast.style.backgroundColor = '#10b981';
      toast.style.color = '#080c14';
    } else if (tipo === "danger") {
      toast.style.backgroundColor = '#f43f5e';
      toast.style.color = '#ffffff';
    } else {
      toast.style.backgroundColor = '#f59e0b';
      toast.style.color = '#080c14';
    }

    toast.innerHTML = mensaje;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
    }, 3500);
  }

  solicitarCompraMaterial(matId) {
    this.navegarA('prediccion_stock');
    const compBox = document.getElementById('proveedoresComparadorContainer');
    if (compBox) compBox.scrollIntoView({ behavior: 'smooth' });
    this.mostrarNotificacion("Abriendo cotizador inteligente para abastecimiento de Cemento IP-30.", "info");
  }

  emitirOrdenCompra(proveedor) {
    this.mostrarNotificacion(`Orden de Compra Generada con Exito a ${proveedor}. Entrega prioritaria programada.`, "success");
  }

  ejecutarDemoTour() {
    this.mostrarNotificacion("Iniciando Recorrido Demostrativo ConstruIA 360...", "info");
    
    // Paso 1: Dashboard
    this.navegarA('dashboard');

    setTimeout(() => {
      // Paso 2: Visión EPP
      this.navegarA('vision_epp');
      
      setTimeout(() => {
        // Paso 3: OCR Almacén
        this.navegarA('ocr_almacen');
        this.ocrMod.ejecutarEscaneoOCR();

        setTimeout(() => {
          // Paso 4: Predicción de Stock
          this.navegarA('prediccion_stock');

          setTimeout(() => {
            // Paso 5: Bitácora
            this.navegarA('bitacora_rag');
            this.bitacoraMod.generarBitacoraEstructurada();
            this.mostrarNotificacion("Recorrido completado: Pruebe el Asistente RAG para consultar especificaciones de hormigon H-25.", "success");
          }, 3500);
        }, 3000);
      }, 3000);
    }, 2000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new ConstruIAApp();
  app.init();
});
