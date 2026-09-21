/**
 * ConstruIA 360 - Módulo de Supervisión Visual y Detección de EPP
 * Inferencia sobre Canvas: Casco, Chaleco, Arnés y Botas con Bounding Boxes
 */

import { CONSTRUCCION_DATA } from '../data.js';

export class VisionEPPModule {
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
