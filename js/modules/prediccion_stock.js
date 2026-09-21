/**
 * ConstruIA 360 - Módulo de Predicción de Stock y Compras Inteligentes
 * Series temporales para quiebre de materiales + Matriz de decisión multicriterio de proveedores
 */

import { CONSTRUCCION_DATA } from '../data.js';

export class PrediccionStockModule {
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
