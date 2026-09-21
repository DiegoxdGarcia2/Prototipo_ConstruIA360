(function() {
"use strict";

// ==================== js/data.js ====================
/**
 * ConstruIA 360 - Mock Database & Construction Knowledge Base
 * Grupo 9 - Ingeniería de Software II (UAGRM)
 */

const CONSTRUCCION_DATA = {
  // Datos generales del proyecto de obra activa
  proyecto: {
    id: "OBRA-2026-TME",
    nombre: "Torre Mirador Equipetrol",
    ubicación: "Equipetrol Norte, Santa Cruz de la Sierra - Bolivia",
    tipo: "Edificación Residencial / Comercial de 18 Plantas",
    directorObra: "Ing. Carlos Gabriel Lobo",
    residenteObra: "Ing. David García Caballero",
    supervisorSeguridad: "Ing. José Diego García",
    responsableAlmacen: "Téc. Leonardo Serrate",
    responsableCompras: "Lic. Brandon Líder Vásquez",
    fechaInicio: "2026-02-01",
    fechaFinEstimada: "2027-04-30",
    presupuestoTotal: 1250000, // USD
    gastoAcumulado: 825000, // USD
    kpisEjecutivos: {
      seguridadEPP: {
        score: 94,
        max: 100,
        incumplimientosSemana: 3,
        tendencia: "+2 pts vs mes anterior",
        estado: "Aceptable con observaciones en trabajos en altura"
      },
      avanceFisico: {
        real: 63,
        planificado: 69,
        desviacion: -6,
        estado: "Retraso moderado en Frente de Losa Nivel 4"
      },
      cronograma: {
        riesgoRetrasoProbabilidad: 72, // %
        impactoEstimadoDias: 7,
        rutaCriticaAfectada: "Encofrado y vaciado de losa Nivel 4 a Nivel 5"
      },
      presupuesto: {
        avanceFinanciero: 66,
        desviacionProyectada: 8, // +8%
        sobrecostoEstimadoUSD: 42000,
        burnRateSemanalUSD: 18500
      },
      materiales: {
        critico: "Cemento Portland IP-30",
        diasRestantes: 2.4,
        stockActual: 180, // bolsas
        consumoDiarioPromedio: 75,
        estadoAlerta: "Quiebre inminente en 2.4 días"
      },
      maquinaria: {
        equipoCritico: "Excavadora Oruga CAT 320",
        tiempoOciosoPorcentaje: 41,
        costoInactividadDiarioUSD: 184.50,
        estado: "Baja utilización por cuello de botella en volquetes"
      },
      compras: {
        cotizacionesPendientes: 2,
        ordenRecomendada: "OC-8890 a Hormigones del Oriente por entrega en 24h"
      }
    }
  },

  // Frentes de trabajo y avance
  frentes: [
    {
      id: "FR-01",
      nombre: "Frente A: Vaciado de Losa Nivel 4",
      responsable: "Ing. David García",
      estado: "En Ejecución con Retraso",
      avanceFisico: 78, // % de la actividad
      personalAsignado: 14,
      retrasoDias: 2
    },
    {
      id: "FR-02",
      nombre: "Frente B: Armado de Columnas y Encofrados Nivel 5",
      responsable: "Capataz Juan Condori",
      estado: "En Progreso Normal",
      avanceFisico: 45,
      personalAsignado: 12,
      retrasoDias: 0
    },
    {
      id: "FR-03",
      nombre: "Frente C: Muros de Contención e Instalaciones",
      responsable: "Ing. Marcelo Torrico",
      estado: "En Progreso Normal",
      avanceFisico: 88,
      personalAsignado: 8,
      retrasoDias: 0
    }
  ],

  // Casos de Visión Artificial para Supervisión de EPP
  casosVisionEPP: [
    {
      id: "EPP-FOTO-01",
      titulo: "Frente Losa Nivel 4 - Trabajo en Altura y Armadura",
      descripcion: "Inspección de operarios en borde de losa con riesgo de caída a distinto nivel.",
      tipoFrente: "Altura",
      detecciones: [
        {
          persona: "Operario 1 (Armador)",
          coordenadas: { x: 22, y: 35, w: 20, h: 50 },
          elementos: [
            { item: "Casco de Seguridad", ok: true, confianza: 98.4 },
            { item: "Chaleco Reflectante", ok: true, confianza: 95.1 },
            { item: "Botas de Puntera", ok: true, confianza: 92.0 },
            { item: "Arnés de Seguridad", ok: true, confianza: 94.6 }
          ],
          infraccion: false
        },
        {
          persona: "Operario 2 (Encofrador de Borde)",
          coordenadas: { x: 58, y: 30, w: 22, h: 55 },
          elementos: [
            { item: "Casco de Seguridad", ok: true, confianza: 96.2 },
            { item: "Chaleco Reflectante", ok: true, confianza: 93.8 },
            { item: "Botas de Puntera", ok: true, confianza: 89.4 },
            { item: "Línea de Vida / Arnés", ok: false, confianza: 91.5, alerta: "SIN ARNÉS EN BORDE DE LOSA (RIESGO CAÍDA 12m)" }
          ],
          infraccion: true,
          gravedad: "CRÍTICA"
        }
      ],
      recomendacionIA: "Detener inmediatamente la tarea del Operario 2 en el perímetro norte hasta enganchar línea de vida reglamentaria. Emitir amonestación preventiva."
    },
    {
      id: "EPP-FOTO-02",
      titulo: "Zona de Carga y Descarga de Grúa Torre",
      descripcion: "Recepción de canastilla de insumos en planta baja.",
      tipoFrente: "Superficie / Izaje",
      detecciones: [
        {
          persona: "Ayudante de Almacén",
          coordenadas: { x: 38, y: 38, w: 24, h: 48 },
          elementos: [
            { item: "Casco de Seguridad", ok: false, confianza: 94.8, alerta: "SIN CASCO BAJO RADIO DE CARGA SUSPENDIDA" },
            { item: "Chaleco Reflectante", ok: true, confianza: 96.0 },
            { item: "Botas de Puntera", ok: true, confianza: 91.2 }
          ],
          infraccion: true,
          gravedad: "ALTA"
        }
      ],
      recomendacionIA: "Despejar radio de izaje de la Grúa Torre. No permitir circulación sin casco de alta resistencia."
    }
  ],

  // Recepción de Materiales y Remisiones para OCR
  remisionesOCR: [
    {
      id: "REM-01",
      codigoDocumento: "REM-2026-0489",
      proveedor: "Hormigones & Áridos Santa Cruz SRL",
      nitProveedor: "1028394021",
      fechaEmision: "2026-09-21 09:30",
      chofer: "Felipe Zeballos Mercado",
      placaCamion: "3482-KPL",
      ordenCompraAsociada: "OC-8821",
      materialSolicitadoOC: {
        item: "Cemento Portland IP-30",
        cantidadSolicitada: 300,
        unidad: "Bolsas (50 kg)"
      },
      datosExtraidosOCR: {
        material: "Cemento Portland Especial IP-30",
        cantidadRecibida: 250,
        unidad: "Bolsas",
        precioUnitarioBs: 58.50,
        totalBs: 14625.00,
        selloFirmaValida: true,
        confianzaOCR: 98.6
      },
      discrepanciaDetectada: {
        hayDiscrepancia: true,
        diferencia: -50,
        observacion: "FALTANTE DE 50 BOLSAS: La Orden de Compra OC-8821 solicitó 300 bolsas, pero la remisión y descarga física registra únicamente 250 bolsas.",
        accionSugerida: "Firmar remisión en conformidad únicamente por 250 bolsas y generar nota de crédito/ajuste con el proveedor."
      }
    }
  ],

  // Inventario y Modelo Predictivo de Agotamiento de Stock
  inventarioMateriales: [
    {
      id: "MAT-01",
      nombre: "Cemento Portland IP-30 (50kg)",
      categoria: "Aglomerantes",
      stockActual: 180,
      unidad: "Bolsas",
      consumoDiarioPromedio: 75,
      puntoReorden: 200,
      diasParaQuiebre: 2.4,
      critico: true,
      historicoConsumo: [65, 80, 70, 95, 85, 75, 75]
    },
    {
      id: "MAT-02",
      nombre: "Fierro Corrugado 12mm (12m)",
      categoria: "Aceros de Refuerzo",
      stockActual: 12.5,
      unidad: "Toneladas",
      consumoDiarioPromedio: 0.8,
      puntoReorden: 3.0,
      diasParaQuiebre: 15.6,
      critico: false,
      historicoConsumo: [0.7, 0.9, 0.8, 1.1, 0.8, 0.7, 0.8]
    },
    {
      id: "MAT-03",
      nombre: "Arena Fina Lavada",
      categoria: "Áridos",
      stockActual: 45,
      unidad: "m³",
      consumoDiarioPromedio: 7.2,
      puntoReorden: 15,
      diasParaQuiebre: 6.2,
      critico: false,
      historicoConsumo: [6, 8, 7, 9, 8, 7, 7]
    },
    {
      id: "MAT-04",
      nombre: "Grava Clasificada 3/4\"",
      categoria: "Áridos",
      stockActual: 60,
      unidad: "m³",
      consumoDiarioPromedio: 8.5,
      puntoReorden: 18,
      diasParaQuiebre: 7.0,
      critico: false,
      historicoConsumo: [8, 9, 8, 10, 9, 8, 8]
    }
  ],

  // Compras Inteligentes y Comparativa Multicriterio de Cotizaciones
  comparadorProveedores: [
    {
      proveedor: "Hormigones del Oriente SRL",
      precioUnitarioBolsaUSD: 8.40,
      plazoEntregaHoras: 24,
      calificacionCalidad: 98,
      disponibilidadInmediata: true,
      recomendadoIA: true,
      justificacionIA: "RECOMENDACIÓN ÓPTIMA: Aunque su costo es 5% mayor que el de menor precio, su entrega en 24 horas previene la paralización de la losa Nivel 4 (costo de parada estimado en $2,400 USD/día)."
    },
    {
      proveedor: "Cemento Fancesa Distribuidor Central",
      precioUnitarioBolsaUSD: 7.90,
      plazoEntregaHoras: 120, // 5 días
      calificacionCalidad: 92,
      disponibilidadInmediata: false,
      recomendadoIA: false,
      justificacionIA: "NO RECOMENDADO PARA EMERGENCIA: El plazo de 5 días provocaría 2.6 días de obra parada por quiebre de stock."
    },
    {
      proveedor: "Itacamba Express Logística",
      precioUnitarioBolsaUSD: 8.25,
      plazoEntregaHoras: 48,
      calificacionCalidad: 94,
      disponibilidadInmediata: true,
      recomendadoIA: false,
      justificacionIA: "OPCIÓN SECUNDARIA: Buena opción como contingencia si Hormigones del Oriente agota cupo."
    }
  ],

  // Telemetría y Monitoreo de Maquinaria
  maquinaria: [
    {
      id: "MAQ-01",
      equipo: "Excavadora Oruga CAT 320D",
      operador: "Ramiro Peñaranda",
      estado: "Operando con Baja Eficiencia",
      horasProductivas: 3.5,
      horasOciosas: 4.5,
      porcentajeOcioso: 41, // 41% reportado en caso de estudio
      costoHoraAlquilerUSD: 45.00,
      perdidaOciosaUSD: 202.50,
      causaOciosidad: "Esperas prolongadas de volquetes en rampa de salida.",
      alertaCritica: true
    },
    {
      id: "MAQ-02",
      equipo: "Grúa Torre Liebherr 50K (45m)",
      operador: "Marcelo Gutiérrez",
      estado: "Alta Productividad",
      horasProductivas: 7.2,
      horasOciosas: 0.8,
      porcentajeOcioso: 10,
      costoHoraAlquilerUSD: 60.00,
      perdidaOciosaUSD: 48.00,
      causaOciosidad: "Cambios normales de estiba de carga.",
      alertaCritica: false
    },
    {
      id: "MAQ-03",
      equipo: "Camión Mixer Mercedes-Benz Actros",
      operador: "Jorge Saldías",
      estado: "Rendimiento Normal",
      horasProductivas: 5.8,
      horasOciosas: 2.2,
      porcentajeOcioso: 27,
      costoHoraAlquilerUSD: 50.00,
      perdidaOciosaUSD: 110.00,
      causaOciosidad: "Demoras en colocación de bomba en losa.",
      alertaCritica: false
    }
  ],

  // Simulación de Nota de Voz del Residente para Bitácora Diaria
  dictadoBitacoraDemo: "Al cierre de la jornada de hoy 21 de septiembre, en el proyecto Torre Mirador Equipetrol contamos con 34 obreros en total. En el Frente A se continuó el vaciado de la losa del nivel 4, alcanzando un 78% de avance. Clima caluroso, 29 grados, sin lluvias. En seguridad tuvimos una llamada de atención seria al encofrador por no anclarse en el borde norte. En almacén llegaron 250 bolsas de cemento con faltante de 50 respecto a la orden, ya se hizo el reclamo. Mañana requerimos urgente 3 volquetes más para que la excavadora no siga parada.",

  // Base de Conocimiento RAG de Obra
  documentosRAG: [
    {
      tema: "Hormigón Estructural H-25",
      contenido: "El hormigón estructural especificado para losas y columnas de Torre Mirador es tipo H-25 (Resistencia característica f'ck = 250 kg/cm² a los 28 días). La relación agua/cemento máxima permitida es 0.48. El curado con agua continua debe mantenerse como mínimo durante 7 días consecutivos."
    },
    {
      tema: "Plazos de Desencofrado",
      contenido: "Según especificaciones técnicas CBH-87: Costados de vigas y columnas: 3 días. Fondos de vigas y losas de hasta 4m de luz: 14 días. Fondos de losas y vigas con luces mayores a 4m: 21 días completos. No se permite descimbrar antes de alcanzar el 80% de la resistencia de proyecto."
    },
    {
      tema: "Protocolos EPP y Trabajos en Altura",
      contenido: "Toda tarea ejecutada a más de 1.80 metros sobre el nivel del suelo requiere uso obligatorio de arnés de cuerpo entero con doble línea de vida y absorbedor de impacto, anclado a punto fijo certificado (resistencia 22 kN). Infracciones reiteradas ameritan separación inmediata del frente de trabajo."
    }
  ]
};

// ==================== js/modules/dashboard.js ====================
/**
 * ConstruIA 360 - Módulo de Dashboard Ejecutivo 360
 * Visualización de KPIs globales (Seguridad, Avance, Cronograma, Costos, Stock, Maquinaria)
 */



class DashboardModule {
  constructor(app) {
    this.app = app;
    this.curvaSChart = null;
    this.burnRateChart = null;
  }

  init() {
    this.renderKpiCards();
    this.renderFrentesResumen();
    this.initCharts();
  }

  renderKpiCards() {
    const kpis = CONSTRUCCION_DATA.proyecto.kpisEjecutivos;
    const container = document.getElementById('dashboardKpisContainer');
    if (!container) return;

    container.innerHTML = `
      <!-- KPI 1: Seguridad EPP -->
      <div class="kpi-card kpi-amber">
        <div class="kpi-header">
          <i data-lucide="shield-check" style="width:16px;height:16px;color:var(--accent-amber);"></i>
          <span>Seguridad EPP</span>
        </div>
        <div class="kpi-value">${kpis.seguridadEPP.score}/100</div>
        <div class="kpi-footer" style="color:var(--accent-red); font-weight:700;">
          ${kpis.seguridadEPP.incumplimientosSemana} infracciones detectadas
        </div>
      </div>

      <!-- KPI 2: Avance Físico -->
      <div class="kpi-card kpi-orange">
        <div class="kpi-header">
          <i data-lucide="hard-hat" style="width:16px;height:16px;color:var(--primary);"></i>
          <span>Avance Fisico de Obra</span>
        </div>
        <div class="kpi-value">${kpis.avanceFisico.real}% <span style="font-size:1rem; color:var(--text-muted); font-weight:500;">/ ${kpis.avanceFisico.planificado}% plan</span></div>
        <div class="kpi-footer" style="color:var(--accent-red); font-weight:700;">
          Desviacion: ${kpis.avanceFisico.desviacion}% (Retraso Losa)
        </div>
      </div>

      <!-- KPI 3: Riesgo Cronograma -->
      <div class="kpi-card kpi-red">
        <div class="kpi-header">
          <i data-lucide="clock" style="width:16px;height:16px;color:var(--accent-red);"></i>
          <span>Riesgo de Retraso IA</span>
        </div>
        <div class="kpi-value" style="color:var(--accent-red);">${kpis.cronograma.riesgoRetrasoProbabilidad}%</div>
        <div class="kpi-footer" style="color:var(--text-main); font-weight:600;">
          Impacto estimado: <strong>+${kpis.cronograma.impactoEstimadoDias} dias</strong>
        </div>
      </div>

      <!-- KPI 4: Presupuesto & Burn Rate -->
      <div class="kpi-card kpi-cyan">
        <div class="kpi-header">
          <i data-lucide="dollar-sign" style="width:16px;height:16px;color:var(--accent-cyan);"></i>
          <span>Avance Financiero</span>
        </div>
        <div class="kpi-value">${kpis.presupuesto.avanceFinanciero}%</div>
        <div class="kpi-footer" style="color:var(--accent-amber); font-weight:700;">
          Desviacion: +${kpis.presupuesto.desviacionProyectada}% (+$42k USD)
        </div>
      </div>

      <!-- KPI 5: Materiales Críticos -->
      <div class="kpi-card kpi-red">
        <div class="kpi-header">
          <i data-lucide="boxes" style="width:16px;height:16px;color:var(--accent-red);"></i>
          <span>Material Mas Critico</span>
        </div>
        <div class="kpi-value" style="color:var(--accent-red);">${kpis.materiales.diasRestantes} <span style="font-size:1rem;">DIAS</span></div>
        <div class="kpi-footer" style="color:var(--accent-red); font-weight:700;">
          Critico: ${kpis.materiales.critico}
        </div>
      </div>

      <!-- KPI 6: Maquinaria Ociosa -->
      <div class="kpi-card kpi-amber">
        <div class="kpi-header">
          <i data-lucide="truck" style="width:16px;height:16px;color:var(--accent-amber);"></i>
          <span>Tiempo Ocioso Maquinaria</span>
        </div>
        <div class="kpi-value">${kpis.maquinaria.tiempoOciosoPorcentaje}%</div>
        <div class="kpi-footer" style="color:var(--text-muted);">
          CAT 320: -$${kpis.maquinaria.costoInactividadDiarioUSD}/dia
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  renderFrentesResumen() {
    const container = document.getElementById('frentesTrabajoTable');
    if (!container) return;

    container.innerHTML = CONSTRUCCION_DATA.frentes.map(f => `
      <tr>
        <td><strong>${f.nombre}</strong></td>
        <td>${f.responsable}</td>
        <td>
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="flex:1; background:var(--border-color); height:8px; border-radius:4px; overflow:hidden;">
              <div style="width:${f.avanceFisico}%; height:100%; background:${f.retrasoDias > 0 ? 'var(--primary)' : 'var(--accent-green)'};"></div>
            </div>
            <strong style="font-size:0.8rem; font-family:var(--font-mono);">${f.avanceFisico}%</strong>
          </div>
        </td>
        <td>
          <span class="project-pill" style="background:${f.retrasoDias > 0 ? 'var(--accent-red-bg)' : 'var(--accent-green-bg)'}; color:${f.retrasoDias > 0 ? 'var(--accent-red)' : 'var(--accent-green)'};">
            ${f.retrasoDias > 0 ? `Retraso: +${f.retrasoDias} dias` : 'En Plazo'}
          </span>
        </td>
        <td><strong>${f.personalAsignado}</strong> obreros</td>
      </tr>
    `).join('');
  }

  initCharts() {
    // 1. Gráfico Curva S (Avance Físico Planificado vs Real vs Financiero)
    const ctxCurvaS = document.getElementById('curvaSChart');
    if (ctxCurvaS && !this.curvaSChart) {
      this.curvaSChart = new Chart(ctxCurvaS, {
        type: 'line',
        data: {
          labels: ['Mes 1', 'Mes 2', 'Mes 3', 'Mes 4', 'Mes 5', 'Mes 6 (Actual)', 'Mes 7', 'Mes 8'],
          datasets: [
            {
              label: 'Avance Planificado (%)',
              data: [8, 18, 32, 45, 58, 69, 82, 100],
              borderColor: '#06b6d4',
              backgroundColor: 'rgba(6, 182, 212, 0.1)',
              borderDash: [5, 5],
              tension: 0.3,
              fill: false
            },
            {
              label: 'Avance Fisico Real (%)',
              data: [7, 16, 30, 42, 53, 63, null, null],
              borderColor: '#ea580c',
              backgroundColor: 'rgba(234, 88, 12, 0.2)',
              tension: 0.3,
              fill: true,
              borderWidth: 3
            },
            {
              label: 'Avance Financiero / Gasto (%)',
              data: [9, 19, 34, 48, 59, 66, null, null],
              borderColor: '#f59e0b',
              tension: 0.3,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: '#64748b', font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' } }
            },
            tooltip: { mode: 'index', intersect: false }
          },
          scales: {
            y: {
              min: 0,
              max: 100,
              ticks: { color: '#64748b', callback: val => val + '%' },
              grid: { color: 'rgba(148, 163, 184, 0.15)' }
            },
            x: {
              ticks: { color: '#64748b' },
              grid: { color: 'rgba(148, 163, 184, 0.15)' }
            }
          }
        }
      });
    }

    // 2. Gráfico Burn Rate y Presupuesto
    const ctxBurn = document.getElementById('burnRateChart');
    if (ctxBurn && !this.burnRateChart) {
      this.burnRateChart = new Chart(ctxBurn, {
        type: 'bar',
        data: {
          labels: ['Materiales', 'Mano de Obra', 'Maquinaria', 'Subcontratos', 'Gastos Generales'],
          datasets: [
            {
              label: 'Presupuestado ($)',
              data: [450000, 320000, 180000, 200000, 100000],
              backgroundColor: 'rgba(148, 163, 184, 0.35)',
              borderRadius: 6
            },
            {
              label: 'Comprometido / Gastado ($)',
              data: [485000, 310000, 215000, 195000, 105000],
              backgroundColor: '#ea580c',
              borderRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: '#64748b', font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' } } }
          },
          scales: {
            y: {
              ticks: { color: '#64748b', callback: val => '$' + (val / 1000) + 'k' },
              grid: { color: 'rgba(148, 163, 184, 0.15)' }
            },
            x: {
              ticks: { color: '#64748b' },
              grid: { display: false }
            }
          }
        }
      });
    }
  }
}

// ==================== js/modules/vision_epp.js ====================
/**
 * ConstruIA 360 - Módulo de Supervisión Visual y Detección de EPP
 * Inferencia sobre Canvas: Casco, Chaleco, Arnés y Botas con Bounding Boxes
 */



class VisionEPPModule {
  constructor(app) {
    this.app = app;
    this.currentCase = CONSTRUCCION_DATA.casosVisionEPP[0];
    this.showOverlays = true;
    this.siteImage = null;
    this.preloadImages();
  }

  preloadImages() {
    this.siteImage = new Image();
    this.siteImage.src = 'assets/obra_epp.jpg';
  }

  init() {
    this.renderCaseButtons();
    this.renderVisionCanvas();
    this.attachEventListeners();
  }

  renderCaseButtons() {
    const container = document.getElementById('eppCasesSelector');
    if (!container) return;

    container.innerHTML = CONSTRUCCION_DATA.casosVisionEPP.map((c, idx) => `
      <button class="btn btn-sm btn-epp-case ${idx === 0 ? 'btn-primary active' : 'btn-secondary'}" data-id="${c.id}">
        <span>${c.titulo}</span>
      </button>
    `).join('');
  }

  attachEventListeners() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-epp-case');
      if (btn) {
        document.querySelectorAll('.btn-epp-case').forEach(b => {
          b.classList.remove('btn-primary', 'active');
          b.classList.add('btn-secondary');
        });
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary', 'active');

        const id = btn.dataset.id;
        this.currentCase = CONSTRUCCION_DATA.casosVisionEPP.find(c => c.id === id);
        this.renderVisionCanvas();
      }
    });

    const toggleBtn = document.getElementById('btnToggleBBoxesEPP');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.showOverlays = !this.showOverlays;
        this.renderVisionCanvas();
      });
    }

    const inputUpload = document.getElementById('inputSubirFotoObra');
    if (inputUpload) {
      inputUpload.addEventListener('change', (e) => this.procesarFotoSubida(e));
    }

    const btnIncidencia = document.getElementById('btnGenerarIncidenciaEPP');
    if (btnIncidencia) {
      btnIncidencia.addEventListener('click', () => this.generarIncidenciaOficial());
    }
  }

  renderVisionCanvas() {
    const c = this.currentCase;
    const canvas = document.getElementById('visionCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = 680;
    canvas.height = 380;

    const drawContent = () => {
      // Dibujar imagen fotográfica real de obra
      if (this.siteImage && this.siteImage.complete && this.siteImage.naturalWidth > 0) {
        ctx.drawImage(this.siteImage, 0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Malla HUD sutil de visor técnico
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 40; x < canvas.width; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 40; y < canvas.height; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Inferencia de IA (Bounding boxes YOLO HUD)
      if (this.showOverlays && c.detecciones) {
        c.detecciones.forEach(det => {
          const bx = (det.coordenadas.x / 100) * canvas.width;
          const by = (det.coordenadas.y / 100) * canvas.height;
          const bw = (det.coordenadas.w / 100) * canvas.width;
          const bh = (det.coordenadas.h / 100) * canvas.height;

          const esPeligro = det.infraccion;
          const strokeColor = esPeligro ? '#ef4444' : '#10b981';

          // Caja semitransparente
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = 2;
          ctx.strokeRect(bx, by, bw, bh);

          ctx.fillStyle = esPeligro ? 'rgba(239, 68, 68, 0.16)' : 'rgba(16, 185, 129, 0.12)';
          ctx.fillRect(bx, by, bw, bh);

          // Esquinas técnicas HUD estilo visor militar/industrial
          const s = 10;
          ctx.lineWidth = 3.5;
          ctx.strokeStyle = strokeColor;
          // Sup izq
          ctx.beginPath(); ctx.moveTo(bx, by + s); ctx.lineTo(bx, by); ctx.lineTo(bx + s, by); ctx.stroke();
          // Sup der
          ctx.beginPath(); ctx.moveTo(bx + bw - s, by); ctx.lineTo(bx + bw, by); ctx.lineTo(bx + bw, by + s); ctx.stroke();
          // Inf izq
          ctx.beginPath(); ctx.moveTo(bx, by + bh - s); ctx.lineTo(bx, by + bh); ctx.lineTo(bx + s, by + bh); ctx.stroke();
          // Inf der
          ctx.beginPath(); ctx.moveTo(bx + bw - s, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx + bw, by + bh - s); ctx.stroke();

          // Header de la caja
          ctx.fillStyle = strokeColor;
          ctx.fillRect(bx, by - 22, bw, 22);
          ctx.fillStyle = '#080c14';
          ctx.font = 'bold 10px JetBrains Mono, monospace';
          ctx.fillText(det.persona.toUpperCase(), bx + 6, by - 7);
        });
      }
    };

    if (this.siteImage.complete) {
      drawContent();
    } else {
      this.siteImage.onload = drawContent;
    }

    this.renderDetalleDetecciones(c);
  }

  renderDetalleDetecciones(c) {
    const infoContainer = document.getElementById('eppDetalleDetecciones');
    const recoContainer = document.getElementById('eppRecomendacionIA');
    if (!infoContainer) return;

    infoContainer.innerHTML = c.detecciones.map(d => `
      <div class="card" style="margin-bottom:12px; border-left:4px solid ${d.infraccion ? 'var(--accent-red)' : 'var(--accent-green)'};">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <strong style="color:var(--text-main); font-size:0.9rem;">${d.persona}</strong>
          <span class="project-pill" style="border-color:${d.infraccion ? 'var(--accent-red)' : 'var(--accent-green)'}; color:${d.infraccion ? 'var(--accent-red)' : 'var(--accent-green)'};">
            ${d.infraccion ? `INFRACCIÓN ${d.gravedad}` : 'CONFORME EPP'}
          </span>
        </div>
        <div style="display:flex; flex-direction:column; gap:4px; font-size:0.78rem;">
          ${d.elementos.map(e => `
            <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.04); padding-bottom:3px;">
              <span style="color:${e.ok ? 'var(--text-muted)' : 'var(--accent-red); font-weight:700;'}">
                ${e.alerta || e.item}
              </span>
              <span style="font-family:var(--font-mono); color:${e.ok ? 'var(--accent-green)' : 'var(--accent-red)'}; font-weight:700;">
                ${e.confianza}%
              </span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    if (recoContainer) {
      recoContainer.innerHTML = `
        <div style="background:var(--primary-subtle); color:var(--primary); padding:10px 14px; border-radius:8px; font-size:0.8rem; border-left:3px solid var(--primary); line-height:1.5;">
          <strong>Protocolo Sugerido por ConstruIA:</strong><br>
          ${c.recomendacionIA}
        </div>
      `;
    }
  }

  procesarFotoSubida(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.getElementById('visionCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 680;
        canvas.height = 380;
        ctx.drawImage(img, 0, 0, 680, 380);

        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(180, 80, 240, 220);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.18)';
        ctx.fillRect(180, 80, 240, 220);

        ctx.fillStyle = '#ef4444';
        ctx.fillRect(180, 58, 240, 22);
        ctx.fillStyle = '#080c14';
        ctx.font = 'bold 10px JetBrains Mono, monospace';
        ctx.fillText('OPERARIO DETECTADO (94.2% CONFIANZA)', 186, 73);

        this.app.mostrarNotificacion("Fotografía de obra procesada por el modelo de Visión Artificial.", "success");
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  generarIncidenciaOficial() {
    const infraccion = this.currentCase.detecciones.find(d => d.infraccion);
    if (!infraccion) {
      alert("No hay infracciones detectadas en la toma actual.");
      return;
    }

    this.app.mostrarNotificacion(
      `Incidencia #INC-2026-088 registrada: "${infraccion.persona} - ${infraccion.elementos.find(e=>!e.ok)?.alerta}".`,
      "danger"
    );
  }
}

// ==================== js/modules/ocr_almacen.js ====================
/**
 * ConstruIA 360 - Módulo de Recepción de Materiales y Scanner OCR
 * Digitalización de remisiones, extracción de metadatos y conciliación con Órdenes de Compra
 */



class OCRAlmacenModule {
  constructor(app) {
    this.app = app;
    this.remisionData = CONSTRUCCION_DATA.remisionesOCR[0];
    this.isScanning = false;
    this.isScanned = false;
    this.docImage = new Image();
    this.docImage.src = 'assets/remision_ocr.jpg';
    this.docImage.onload = () => {
      this.renderDocumentoSimulado();
    };
  }

  init() {
    this.renderDocumentoSimulado();
    this.attachEventListeners();
  }

  renderDocumentoSimulado() {
    const rem = this.remisionData;
    const canvas = document.getElementById('ocrCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = 440;
    canvas.height = 360;

    if (this.docImage.complete && this.docImage.naturalWidth > 0) {
      // Dibujar imagen fotográfica de la remisión
      ctx.drawImage(this.docImage, 0, 0, canvas.width, canvas.height);
      // Filtro sutil para realzar contraste de digitalización
      ctx.fillStyle = 'rgba(15, 23, 42, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      // Fallback si la imagen aún carga
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 13px Outfit, sans-serif';
      ctx.fillText(rem.proveedor.toUpperCase(), 30, 40);

      ctx.fillStyle = '#64748b';
      ctx.font = '10px Plus Jakarta Sans, sans-serif';
      ctx.fillText(`NIT: ${rem.nitProveedor} | Tel: +591 3-3459900`, 30, 56);
      ctx.fillText(`Fecha: ${rem.fechaEmision} | Chofer: ${rem.chofer}`, 30, 70);

      ctx.fillStyle = '#ea580c';
      ctx.fillRect(canvas.width - 160, 26, 130, 24);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px JetBrains Mono, monospace';
      ctx.fillText(rem.codigoDocumento, canvas.width - 150, 42);

      ctx.strokeStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.moveTo(30, 85);
      ctx.lineTo(canvas.width - 30, 85);
      ctx.stroke();

      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 10px Plus Jakarta Sans, sans-serif';
      ctx.fillText("DESCRIPCION DE MATERIAL", 30, 105);
      ctx.fillText("CANT.", 240, 105);
      ctx.fillText("P. UNIT", 300, 105);
      ctx.fillText("TOTAL (Bs)", 360, 105);

      ctx.fillStyle = '#334155';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText(rem.datosExtraidosOCR.material, 30, 130);
      ctx.fillText(`${rem.datosExtraidosOCR.cantidadRecibida} bsa`, 240, 130);
      ctx.fillText(`${rem.datosExtraidosOCR.precioUnitarioBs}`, 300, 130);
      ctx.fillText(`${rem.datosExtraidosOCR.totalBs}`, 360, 130);
    }

    // Si ya fue escaneado, dibujar cajas HUD de detección OCR sobre la remisión
    if (this.isScanned) {
      this.drawOcrBoundingBoxes(ctx);
    }
  }

  drawOcrBoundingBoxes(ctx) {
    const boxes = [
      { x: 18, y: 22, w: 220, h: 48, label: 'EMPRESA PROVEEDOR [99.4%]', color: '#38bdf8' },
      { x: 260, y: 22, w: 162, h: 36, label: 'FOLIO: REM-2026-0489 [99.8%]', color: '#f59e0b' },
      { x: 18, y: 120, w: 404, h: 56, label: 'DETALLE: CEMENTO IP-30 (250 BSA) [99.1%]', color: '#10b981' },
      { x: 250, y: 230, w: 172, h: 76, label: 'SELLO ALMACEN C/ OBSERVACION [97.5%]', color: '#f43f5e' },
      { x: 18, y: 288, w: 180, h: 50, label: 'BARCODE: #780491028491 [99.9%]', color: '#a855f7' }
    ];

    boxes.forEach(b => {
      // Relleno transparente
      ctx.fillStyle = b.color === '#f43f5e' ? 'rgba(244, 63, 94, 0.16)' : 'rgba(56, 189, 248, 0.12)';
      ctx.fillRect(b.x, b.y, b.w, b.h);

      // Borde bounding box
      ctx.strokeStyle = b.color;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 2]);
      ctx.strokeRect(b.x, b.y, b.w, b.h);
      ctx.setLineDash([]);

      // Label badge
      ctx.fillStyle = b.color;
      ctx.fillRect(b.x, b.y - 14, ctx.measureText(b.label).width + 12, 14);
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 8.5px JetBrains Mono, monospace';
      ctx.fillText(b.label, b.x + 4, b.y - 3);
    });
  }

  attachEventListeners() {
    const btnScan = document.getElementById('btnEscanearOCR');
    if (btnScan) {
      btnScan.addEventListener('click', () => this.ejecutarEscaneoOCR());
    }

    const btnIngresar = document.getElementById('btnIngresarStockOCR');
    if (btnIngresar) {
      btnIngresar.addEventListener('click', () => this.confirmarIngresoStock());
    }
  }

  ejecutarEscaneoOCR() {
    const container = document.getElementById('ocrScannerBox');
    const statusText = document.getElementById('ocrStatusText');
    const resultBox = document.getElementById('ocrResultadosCard');

    if (container) container.classList.add('scanning');
    if (statusText) statusText.textContent = "Escaneando documento con OCR de alta precision y contrastando contra OC-8821...";

    setTimeout(() => {
      if (container) container.classList.remove('scanning');
      this.isScanned = true;
      this.renderDocumentoSimulado();

      if (statusText) statusText.textContent = "Extraccion OCR completada con 98.6% de confianza.";
      if (resultBox) resultBox.style.display = 'block';

      this.mostrarResultadosExtraccion();
      if (window.lucide) window.lucide.createIcons();
    }, 1800);
  }

  mostrarResultadosExtraccion() {
    const rem = this.remisionData;

    document.getElementById('ocrProveedor').textContent = rem.proveedor;
    document.getElementById('ocrNroRemision').textContent = rem.codigoDocumento;
    document.getElementById('ocrMaterial').textContent = rem.datosExtraidosOCR.material;
    document.getElementById('ocrCantidad').textContent = `${rem.datosExtraidosOCR.cantidadRecibida} ${rem.datosExtraidosOCR.unidad}`;
    document.getElementById('ocrOrdenCompra').textContent = rem.ordenCompraAsociada;

    const discBox = document.getElementById('ocrDiscrepanciaBox');
    if (discBox) {
      if (rem.discrepanciaDetectada.hayDiscrepancia) {
        discBox.innerHTML = `
          <div style="background:var(--accent-red-bg); border:1px solid var(--accent-red); border-radius:8px; padding:12px; margin-top:12px;">
            <div style="display:flex; align-items:center; gap:8px; color:var(--accent-red); font-size:0.85rem; font-weight:700; text-transform:uppercase; letter-spacing:0.04em;">
              <span class="status-indicator alert"></span>
              DISCREPANCIA DETECTADA POR CONSTRUIA
            </div>
            <div style="font-size:0.85rem; color:var(--text-main); margin-top:6px; line-height:1.4;">
              ${rem.discrepanciaDetectada.observacion}
            </div>
            <div style="font-size:0.78rem; color:var(--accent-amber); font-weight:700; margin-top:8px;">
              Accion recomendada: ${rem.discrepanciaDetectada.accionSugerida}
            </div>
          </div>
        `;
      }
    }
  }

  confirmarIngresoStock() {
    const cemento = CONSTRUCCION_DATA.inventarioMateriales.find(m => m.id === 'MAT-01');
    const cantidadRecibida = this.remisionData.datosExtraidosOCR.cantidadRecibida;

    if (cemento) {
      cemento.stockActual += cantidadRecibida;
      // Recalcular días de quiebre
      cemento.diasParaQuiebre = +(cemento.stockActual / cemento.consumoDiarioPromedio).toFixed(1);
      cemento.critico = cemento.diasParaQuiebre < 3;

      // Actualizar KPI
      CONSTRUCCION_DATA.proyecto.kpisEjecutivos.materiales.stockActual = cemento.stockActual;
      CONSTRUCCION_DATA.proyecto.kpisEjecutivos.materiales.diasRestantes = cemento.diasParaQuiebre;
    }

    this.app.mostrarNotificacion(
      `Stock actualizado: +${cantidadRecibida} bolsas de Cemento ingresadas. Nuevo stock: ${cemento.stockActual} bolsas (${cemento.diasParaQuiebre} dias de autonomia).`,
      "success"
    );

    // Refrescar dashboard y predicción
    this.app.dashboardMod.renderKpiCards();
    this.app.prediccionMod.renderInventarioYPrediccion();
  }
}

// ==================== js/modules/prediccion_stock.js ====================
/**
 * ConstruIA 360 - Módulo de Predicción de Stock y Compras Inteligentes
 * Series temporales para quiebre de materiales + Matriz de decisión multicriterio de proveedores
 */



class PrediccionStockModule {
  constructor(app) {
    this.app = app;
    this.stockChart = null;
  }

  init() {
    this.renderInventarioYPrediccion();
    this.renderComparadorProveedores();
    this.attachEventListeners();
    this.initStockChart();
  }

  renderInventarioYPrediccion() {
    const tableBody = document.getElementById('inventarioStockTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = CONSTRUCCION_DATA.inventarioMateriales.map(mat => `
      <tr style="${mat.critico ? 'background:var(--accent-red-bg);' : ''}">
        <td>
          <strong>${mat.nombre}</strong><br>
          <span style="font-size:0.75rem; color:var(--text-muted);">${mat.categoria}</span>
        </td>
        <td>
          <span style="font-family:var(--font-mono); font-size:1.05rem; font-weight:700;">
            ${mat.stockActual} ${mat.unidad}
          </span>
        </td>
        <td>
          <span style="font-family:var(--font-mono); font-size:0.85rem;">
            ${mat.consumoDiarioPromedio} ${mat.unidad}/dia
          </span>
        </td>
        <td>
          <div style="display:flex; align-items:center; gap:8px;">
            <strong style="font-family:var(--font-mono); font-size:1.1rem; ${mat.critico ? 'color:var(--accent-red); font-weight:900;' : 'color:var(--accent-green);'}">
              ${mat.diasParaQuiebre} dias
            </strong>
            ${mat.critico ? '<span class="project-pill" style="background:var(--accent-red); color:white; font-size:0.65rem; font-weight:700;">QUIEBRE INMINENTE</span>' : ''}
          </div>
        </td>
        <td>
          <button class="btn btn-sm ${mat.critico ? 'btn-primary' : 'btn-secondary'}" style="display:inline-flex; align-items:center; gap:6px;" onclick="window.construApp.solicitarCompraMaterial('${mat.id}')">
            <i data-lucide="shopping-cart" style="width:14px;height:14px;"></i>
            <span>Cotizar Compra</span>
          </button>
        </td>
      </tr>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  renderComparadorProveedores() {
    const container = document.getElementById('proveedoresComparadorContainer');
    if (!container) return;

    container.innerHTML = CONSTRUCCION_DATA.comparadorProveedores.map(p => `
      <div class="card" style="margin-bottom:14px; border: ${p.recomendadoIA ? '2px solid var(--accent-amber);' : '1px solid var(--border-color);'}; background:${p.recomendadoIA ? 'var(--bg-card)' : 'var(--bg-card-solid)'};">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <strong style="font-size:1.05rem; color:var(--text-main);">${p.proveedor}</strong>
            ${p.recomendadoIA ? `
              <span class="project-pill" style="background:linear-gradient(135deg, #f59e0b, #ea580c); color:#080c14; font-weight:900; font-size:0.68rem; letter-spacing:0.04em;">
                RECOMENDADO CONSTRUIA
              </span>
            ` : ''}
          </div>
          <div style="font-family:var(--font-mono); font-size:1.15rem; font-weight:800; color:var(--text-main);">
            $${p.precioUnitarioBolsaUSD.toFixed(2)} <span style="font-size:0.75rem; color:var(--text-muted);">USD / bolsa</span>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; font-size:0.8rem; margin-bottom:10px;">
          <div>Plazo de Entrega: <strong style="color:var(--text-main); font-family:var(--font-mono);">${p.plazoEntregaHoras} horas</strong></div>
          <div>Calidad / Fiabilidad: <strong style="color:var(--accent-green); font-family:var(--font-mono);">${p.calificacionCalidad}/100</strong></div>
          <div>Disponibilidad Inmediata: <strong style="color:${p.disponibilidadInmediata ? 'var(--accent-green)' : 'var(--accent-red)'};">${p.disponibilidadInmediata ? 'SI' : 'NO'}</strong></div>
        </div>

        <div style="background:${p.recomendadoIA ? 'var(--accent-amber-bg)' : 'var(--bg-app)'}; color:${p.recomendadoIA ? 'var(--accent-amber)' : 'var(--text-muted)'}; padding:8px 12px; border-radius:6px; font-size:0.8rem; line-height:1.4;">
          <strong style="letter-spacing:0.03em;">EVALUACION ALGORITMICA:</strong> ${p.justificacionIA}
        </div>

        <div style="margin-top:10px; display:flex; justify-content:flex-end;">
          <button class="btn btn-sm ${p.recomendadoIA ? 'btn-primary' : 'btn-secondary'}" style="display:inline-flex; align-items:center; gap:6px;" onclick="window.construApp.emitirOrdenCompra('${p.proveedor}')">
            <i data-lucide="file-check-2" style="width:14px;height:14px;"></i>
            <span>Emitir Orden de Compra (OC)</span>
          </button>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  attachEventListeners() {
    const sliderConsumo = document.getElementById('sliderRitmoConsumo');
    if (sliderConsumo) {
      sliderConsumo.addEventListener('input', (e) => {
        const nuevoRitmo = parseInt(e.target.value);
        document.getElementById('displayRitmoConsumo').textContent = `${nuevoRitmo} bolsas/dia`;

        const mat = CONSTRUCCION_DATA.inventarioMateriales.find(m => m.id === 'MAT-01');
        if (mat) {
          mat.consumoDiarioPromedio = nuevoRitmo;
          mat.diasParaQuiebre = +(mat.stockActual / nuevoRitmo).toFixed(1);
          mat.critico = mat.diasParaQuiebre < 3;
          CONSTRUCCION_DATA.proyecto.kpisEjecutivos.materiales.diasRestantes = mat.diasParaQuiebre;
        }

        this.renderInventarioYPrediccion();
        this.app.dashboardMod.renderKpiCards();
        this.actualizarGraficoStock();
      });
    }
  }

  initStockChart() {
    const ctx = document.getElementById('stockProjectionChart');
    if (!ctx || this.stockChart) return;

    this.stockChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Hoy', '+1 Dia', '+2 Dias', '+3 Dias', '+4 Dias', '+5 Dias'],
        datasets: [
          {
            label: 'Stock Cemento IP-30 (Bolsas)',
            data: [180, 105, 30, 0, 0, 0],
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            fill: true,
            borderWidth: 3,
            tension: 0.2
          },
          {
            label: 'Punto Critico de Seguridad (Reorden)',
            data: [200, 200, 200, 200, 200, 200],
            borderColor: '#f59e0b',
            borderDash: [5, 5],
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#9ca3af', font: { family: 'Plus Jakarta Sans', size: 11 } } }
        },
        scales: {
          y: {
            ticks: { color: '#9ca3af' },
            grid: { color: 'rgba(255, 255, 255, 0.05)' }
          },
          x: {
            ticks: { color: '#9ca3af' },
            grid: { color: 'rgba(255, 255, 255, 0.05)' }
          }
        }
      }
    });
  }

  actualizarGraficoStock() {
    if (!this.stockChart) return;
    const mat = CONSTRUCCION_DATA.inventarioMateriales.find(m => m.id === 'MAT-01');
    const s0 = mat.stockActual;
    const c = mat.consumoDiarioPromedio;

    this.stockChart.data.datasets[0].data = [
      s0,
      Math.max(0, s0 - c),
      Math.max(0, s0 - c * 2),
      Math.max(0, s0 - c * 3),
      Math.max(0, s0 - c * 4),
      Math.max(0, s0 - c * 5)
    ];
    this.stockChart.update();
  }
}

// ==================== js/modules/maquinaria_costos.js ====================
/**
 * ConstruIA 360 - Módulo de Telemetría de Maquinaria y Control de Ociosidad
 * Medición de horas productivas vs ociosas y costos de inactividad
 */



class MaquinariaCostosModule {
  constructor(app) {
    this.app = app;
  }

  init() {
    this.renderMaquinariaCards();
  }

  renderMaquinariaCards() {
    const container = document.getElementById('maquinariaCardsContainer');
    if (!container) return;

    container.innerHTML = CONSTRUCCION_DATA.maquinaria.map(m => `
      <div class="card" style="margin-bottom:16px; border-left:4px solid ${m.alertaCritica ? 'var(--accent-amber)' : 'var(--accent-green)'};">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
          <div>
            <strong style="font-size:1.1rem; color:var(--text-main); font-family:var(--font-heading);">${m.equipo}</strong>
            <div style="font-size:0.8rem; color:var(--text-muted);">Operador asignado: <strong>${m.operador}</strong></div>
          </div>
          <span class="project-pill" style="background:${m.alertaCritica ? 'var(--accent-amber-bg)' : 'var(--accent-green-bg)'}; color:${m.alertaCritica ? 'var(--accent-amber)' : 'var(--accent-green)'};">
            ${m.estado}
          </span>
        </div>

        <div class="grid-3" style="margin-bottom:14px;">
          <div style="background:var(--bg-card-solid); padding:10px; border-radius:8px; border:1px solid var(--border-color);">
            <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Horas Efectivas</div>
            <div style="font-family:var(--font-mono); font-size:1.2rem; font-weight:700; color:var(--accent-green);">${m.horasProductivas} h</div>
          </div>
          <div style="background:var(--bg-card-solid); padding:10px; border-radius:8px; border:1px solid var(--border-color);">
            <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Horas Ociosas</div>
            <div style="font-family:var(--font-mono); font-size:1.2rem; font-weight:700; color:${m.alertaCritica ? 'var(--accent-red)' : 'var(--text-main)'};">${m.horasOciosas} h (${m.porcentajeOcioso}%)</div>
          </div>
          <div style="background:var(--bg-card-solid); padding:10px; border-radius:8px; border:1px solid var(--border-color);">
            <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Costo Inactividad Hoy</div>
            <div style="font-family:var(--font-mono); font-size:1.2rem; font-weight:700; color:var(--accent-red);">$${m.perdidaOciosaUSD.toFixed(2)} USD</div>
          </div>
        </div>

        <!-- Barra de Distribución de Tiempo -->
        <div style="margin-bottom:10px;">
          <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-muted); margin-bottom:4px;">
            <span>Trabajo Efectivo: ${100 - m.porcentajeOcioso}%</span>
            <span>Ocioso: ${m.porcentajeOcioso}%</span>
          </div>
          <div style="display:flex; height:10px; border-radius:5px; overflow:hidden; background:var(--border-color);">
            <div style="width:${100 - m.porcentajeOcioso}%; background:var(--accent-green);"></div>
            <div style="width:${m.porcentajeOcioso}%; background:var(--accent-amber);"></div>
          </div>
        </div>

        <div style="font-size:0.8rem; color:var(--text-muted); background:var(--bg-app); padding:8px 12px; border-radius:6px;">
          <strong style="color:var(--accent-amber); font-weight:700;">DIAGNOSTICO TELEMETRICO:</strong> ${m.causaOciosidad}
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }
}

// ==================== js/modules/bitacora_rag.js ====================
/**
 * ConstruIA 360 - Módulo de Bitácora Diaria Inteligente y Asistente RAG de Obra
 * Transcripción por voz de novedades de obra + Chatbot RAG sobre especificaciones técnicas
 */



class BitacoraRAGModule {
  constructor(app) {
    this.app = app;
    this.isRecordingVoice = false;
    this.audioTimer = null;
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    // Grabador de voz de bitácora
    const btnVoz = document.getElementById('btnGrabarVozBitacora');
    if (btnVoz) {
      btnVoz.addEventListener('click', () => this.toggleGrabacionVoz());
    }

    // Botón generar bitácora manual
    const btnGenerar = document.getElementById('btnGenerarBitacoraAuto');
    if (btnGenerar) {
      btnGenerar.addEventListener('click', () => this.generarBitacoraEstructurada());
    }

    // Botón imprimir / exportar bitácora
    const btnPrint = document.getElementById('btnImprimirBitacora');
    if (btnPrint) {
      btnPrint.addEventListener('click', () => window.print());
    }

    // Chatbot RAG de Obra
    const btnRAG = document.getElementById('btnEnviarPreguntaRAG');
    const inputRAG = document.getElementById('inputPreguntaRAG');
    if (btnRAG && inputRAG) {
      btnRAG.addEventListener('click', () => this.procesarConsultaRAG());
      inputRAG.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.procesarConsultaRAG();
      });
    }

    // Botones de preguntas frecuentes RAG
    document.querySelectorAll('.btn-rag-faq').forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.textContent.replace(/^["'\s]+|["'\s]+$/g, '');
        const input = document.getElementById('inputPreguntaRAG');
        if (input) {
          input.value = query;
          this.procesarConsultaRAG();
        }
      });
    });
  }

  toggleGrabacionVoz() {
    const btn = document.getElementById('btnGrabarVozBitacora');
    const statusText = document.getElementById('bitacoraVoiceStatus');
    const audioBox = document.getElementById('bitacoraVoiceBox');
    const timerElem = document.getElementById('bitacoraTimerClock');
    const rawFeed = document.getElementById('bitacoraTranscripcionCruda');

    if (!this.isRecordingVoice) {
      this.isRecordingVoice = true;
      btn.innerHTML = `<i data-lucide="square" style="width:16px;height:16px;color:var(--accent-red);"></i> <span>Detener y Procesar Bitacora</span>`;
      btn.classList.replace('btn-primary', 'btn-danger');
      if (statusText) statusText.textContent = "Grabando dictado del residente de obra en tiempo real...";
      if (audioBox) audioBox.classList.add('recording');

      let secs = 0;
      this.audioTimer = setInterval(() => {
        secs++;
        const s = String(secs % 60).padStart(2, '0');
        const m = String(Math.floor(secs / 60)).padStart(2, '0');
        if (timerElem) timerElem.textContent = `${m}:${s}`;
      }, 1000);

      // Simular dictado
      if (rawFeed) {
        rawFeed.innerHTML = "<em>Escuchando audio del residente...</em>";
        setTimeout(() => {
          rawFeed.innerHTML = `"${CONSTRUCCION_DATA.dictadoBitacoraDemo}"`;
        }, 1200);
      }

    } else {
      this.isRecordingVoice = false;
      clearInterval(this.audioTimer);
      btn.innerHTML = `<i data-lucide="mic" style="width:16px;height:16px;"></i> <span>Iniciar Dictado por Voz</span>`;
      btn.classList.replace('btn-danger', 'btn-primary');
      if (statusText) statusText.textContent = "Transcripcion procesada. Generando informe oficial de bitacora...";
      if (audioBox) audioBox.classList.remove('recording');

      this.generarBitacoraEstructurada();
    }

    if (window.lucide) window.lucide.createIcons();
  }

  generarBitacoraEstructurada() {
    const container = document.getElementById('bitacoraOficialReporte');
    if (!container) return;

    container.innerHTML = `
      <div style="background:var(--bg-card-solid); border:2px solid var(--border-color); border-radius:12px; padding:24px; font-family:var(--font-body);">
        <!-- Encabezado Oficial -->
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid var(--border-color); padding-bottom:14px; margin-bottom:16px;">
          <div>
            <h2 style="font-family:var(--font-heading); font-size:1.3rem; color:var(--text-main); font-weight:800;">
              BITACORA DIARIA DIGITAL DE OBRA #BIT-2026-174
            </h2>
            <div style="font-size:0.85rem; color:var(--text-muted);">
              Proyecto: <strong>${CONSTRUCCION_DATA.proyecto.nombre}</strong> | Residente: <strong>${CONSTRUCCION_DATA.proyecto.residenteObra}</strong>
            </div>
          </div>
          <span class="project-pill" style="background:var(--accent-green-bg); color:var(--accent-green); font-size:0.8rem; font-weight:700;">
            VALIDADO POR RESIDENCIA
          </span>
        </div>

        <!-- Metadatos de la Jornada -->
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px; margin-bottom:18px; background:var(--bg-app); padding:12px; border-radius:8px; font-size:0.8rem;">
          <div style="display:flex; align-items:center; gap:6px;">
            <i data-lucide="calendar" style="width:14px;height:14px;color:var(--accent-amber);"></i>
            <span><strong>Fecha:</strong> 21/09/2026</span>
          </div>
          <div style="display:flex; align-items:center; gap:6px;">
            <i data-lucide="sun" style="width:14px;height:14px;color:var(--accent-amber);"></i>
            <span><strong>Clima:</strong> 29°C Despejado</span>
          </div>
          <div style="display:flex; align-items:center; gap:6px;">
            <i data-lucide="users" style="width:14px;height:14px;color:var(--primary);"></i>
            <span><strong>Personal en Obra:</strong> 34 Obreros</span>
          </div>
          <div style="display:flex; align-items:center; gap:6px;">
            <i data-lucide="clock" style="width:14px;height:14px;color:var(--accent-cyan);"></i>
            <span><strong>Jornada:</strong> 8.5 Horas</span>
          </div>
        </div>

        <!-- Secciones Estructuradas por el LLM -->
        <div style="margin-bottom:14px;">
          <h4 style="font-size:0.9rem; color:var(--accent-amber); margin-bottom:4px; text-transform:uppercase;">1. Avance por Frentes de Trabajo</h4>
          <p style="font-size:0.85rem; line-height:1.5; color:var(--text-main);">
            • <strong>Frente A (Losa Nivel 4):</strong> Vaciado continuo con hormigon H-25, alcanzando 78% del volumen programado.<br>
            • <strong>Frente B (Columnas Nivel 5):</strong> Armadura de acero corrugado al 45%.<br>
            • <strong>Frente C (Subsuelo 2):</strong> Muros de contencion al 88%.
          </p>
        </div>

        <div style="margin-bottom:14px;">
          <h4 style="font-size:0.9rem; color:var(--accent-red); margin-bottom:4px; text-transform:uppercase;">2. Seguridad Laboral e Incidencias EPP</h4>
          <p style="font-size:0.85rem; line-height:1.5; color:var(--text-main);">
            • Se registro infraccion critica en borde de losa norte: operario sin arnes de seguridad anclado a linea de vida. Tarea detenida preventivamente hasta subsanacion inmediata.
          </p>
        </div>

        <div style="margin-bottom:14px;">
          <h4 style="font-size:0.9rem; color:var(--accent-cyan); margin-bottom:4px; text-transform:uppercase;">3. Suministros y Recepción en Almacén</h4>
          <p style="font-size:0.85rem; line-height:1.5; color:var(--text-main);">
            • Arribo de Remision #REM-2026-0489 con 250 bolsas de Cemento Portland IP-30. Se registro observacion formal por faltante de 50 bolsas respecto a la OC-8821.
          </p>
        </div>

        <div style="margin-bottom:18px;">
          <h4 style="font-size:0.9rem; color:var(--accent-amber); margin-bottom:4px; text-transform:uppercase;">4. Requerimientos para Jornada Siguiente</h4>
          <p style="font-size:0.85rem; line-height:1.5; color:var(--text-main);">
            • Gestionar con urgencia 3 unidades adicionales de camiones volquete para abatir el 41% de tiempo ocioso en la excavadora CAT 320.
          </p>
        </div>

        <div style="border-top:1px solid var(--border-color); padding-top:12px; display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:var(--text-muted);">
          <span>Firma Digital: <strong>SHA-256 Validated by ConstruIA</strong></span>
          <span>Generado Automaticamente mediante LLM de Obra</span>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    this.app.mostrarNotificacion("Bitacora estructurada generada y lista para firma del Director de Obra.", "success");
  }

  procesarConsultaRAG() {
    const input = document.getElementById('inputPreguntaRAG');
    const feed = document.getElementById('chatRAGFeed');
    if (!input || !feed || !input.value.trim()) return;

    const consulta = input.value.trim();
    input.value = '';

    // Renderizar mensaje del usuario
    feed.innerHTML += `
      <div style="align-self:flex-end; background:var(--primary); color:#080c14; font-weight:700; padding:9px 14px; border-radius:12px; font-size:0.85rem; max-width:80%;">
        ${consulta}
      </div>
    `;
    feed.scrollTop = feed.scrollHeight;

    // Buscar en la base RAG de especificaciones técnicas
    setTimeout(() => {
      const lower = consulta.toLowerCase();
      let respuestaDoc = null;

      if (lower.includes("desencofr") || lower.includes("viga") || lower.includes("losa") || lower.includes("plazo")) {
        respuestaDoc = CONSTRUCCION_DATA.documentosRAG.find(d => d.tema.includes("Desencofrado"));
      } else if (lower.includes("hormig") || lower.includes("resistencia") || lower.includes("h-25") || lower.includes("curado")) {
        respuestaDoc = CONSTRUCCION_DATA.documentosRAG.find(d => d.tema.includes("H-25"));
      } else if (lower.includes("epp") || lower.includes("altura") || lower.includes("arn") || lower.includes("seguridad")) {
        respuestaDoc = CONSTRUCCION_DATA.documentosRAG.find(d => d.tema.includes("EPP"));
      } else {
        // Respuesta general con conocimiento del proyecto
        respuestaDoc = {
          tema: "Datos Generales del Proyecto Torre Mirador",
          contenido: `Actualmente el proyecto cuenta con un avance fisico real del 63% frente a un 69% planificado. El material mas urgente es el cemento con 2.4 dias de autonomia y se recomienda la OC a Hormigones del Oriente por entrega en 24h.`
        };
      }

      feed.innerHTML += `
        <div style="align-self:flex-start; background:var(--bg-card-solid); border:1px solid var(--border-color); color:var(--text-main); padding:12px 16px; border-radius:12px; font-size:0.85rem; max-width:85%; border-left:3px solid var(--accent-cyan);">
          <div style="font-size:0.75rem; color:var(--accent-cyan); font-weight:800; margin-bottom:4px; text-transform:uppercase; display:flex; align-items:center; gap:6px;">
            <i data-lucide="book-open" style="width:13px;height:13px;"></i>
            <span>Fuente RAG: ${respuestaDoc.tema}</span>
          </div>
          ${respuestaDoc.contenido}
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      feed.scrollTop = feed.scrollHeight;
    }, 500);
  }
}

// ==================== js/app.js ====================
/**
 * ConstruIA 360 - Aplicación Principal y Enrutador de Obra
 * Grupo 9 - Ingeniería de Software II (UAGRM)
 */









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

})();
