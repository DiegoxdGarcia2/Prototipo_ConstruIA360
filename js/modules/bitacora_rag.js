/**
 * ConstruIA 360 - Módulo de Bitácora Diaria Inteligente y Asistente RAG de Obra
 * Transcripción por voz de novedades de obra + Chatbot RAG sobre especificaciones técnicas
 */

import { CONSTRUCCION_DATA } from '../data.js';

export class BitacoraRAGModule {
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
