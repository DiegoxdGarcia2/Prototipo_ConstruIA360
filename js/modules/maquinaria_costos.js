/**
 * ConstruIA 360 - Módulo de Telemetría de Maquinaria y Control de Ociosidad
 * Medición de horas productivas vs ociosas y costos de inactividad
 */

import { CONSTRUCCION_DATA } from '../data.js';

export class MaquinariaCostosModule {
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
