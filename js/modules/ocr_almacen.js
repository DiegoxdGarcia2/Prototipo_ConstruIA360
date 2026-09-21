/**
 * ConstruIA 360 - Módulo de Recepción de Materiales y Scanner OCR
 * Digitalización de remisiones, extracción de metadatos y conciliación con Órdenes de Compra
 */

import { CONSTRUCCION_DATA } from '../data.js';

export class OCRAlmacenModule {
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
