/**
 * ConstruIA 360 - Módulo de Dashboard Ejecutivo 360
 * Visualización de KPIs globales (Seguridad, Avance, Cronograma, Costos, Stock, Maquinaria)
 */

import { CONSTRUCCION_DATA } from '../data.js';

export class DashboardModule {
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
