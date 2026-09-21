/**
 * ConstruIA 360 - Mock Database & Construction Knowledge Base
 * Grupo 9 - Ingeniería de Software II (UAGRM)
 */

export const CONSTRUCCION_DATA = {
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
