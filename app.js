/**
 * Query Logic - Presentation Slide Deck Engine
 * Clean, sober, professional architecture presentation
 * No emojis, 100% corporate styling, PDF export integration
 */

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide-item');
  const prevBtn = document.getElementById('prev-slide-btn');
  const nextBtn = document.getElementById('next-slide-btn');
  const slideCounter = document.getElementById('slide-counter');
  const slideJumpSelect = document.getElementById('slide-jump-select');
  const fullscreenToggleBtn = document.getElementById('fullscreen-toggle-btn');
  const downloadPdfBtn = document.getElementById('download-pdf-btn');
  const cornerLogo = document.getElementById('slide-corner-logo');
  const slideCanvas = document.getElementById('slide-canvas');
  const slideStage = document.getElementById('slide-stage');

  let currentSlideIndex = 0;
  const totalSlides = slides.length;

  // 1. AUTO-SCALE 16:9 CANVAS TO FIT ANY SCREEN
  function scaleSlideCanvas() {
    if (!slideCanvas || !slideStage) return;
    const stageWidth = slideStage.clientWidth - 20;
    const stageHeight = slideStage.clientHeight - 20;
    const targetWidth = 1280;
    const targetHeight = 720;

    const scale = Math.min(stageWidth / targetWidth, stageHeight / targetHeight, 1.1);
    slideCanvas.style.transform = `scale(${scale})`;
    slideCanvas.style.transformOrigin = 'center center';
  }

  window.addEventListener('resize', scaleSlideCanvas);
  scaleSlideCanvas();

  // 2. SLIDE NAVIGATION
  function showSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    currentSlideIndex = index;

    slides.forEach((slide, i) => {
      if (i === currentSlideIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update Counter
    if (slideCounter) {
      slideCounter.textContent = `Diapositiva ${currentSlideIndex + 1} / ${totalSlides}`;
    }

    // Update Jump Select Dropdown
    if (slideJumpSelect) {
      slideJumpSelect.value = currentSlideIndex.toString();
    }

    // Update Prev / Next Buttons
    if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
    if (nextBtn) nextBtn.disabled = currentSlideIndex === totalSlides - 1;

    // Corner logo logic: hide on cover (0), separators (2, 5, 8), and closing (13)
    const isSeparatorOrCover = (
      currentSlideIndex === 0 || 
      currentSlideIndex === 2 || 
      currentSlideIndex === 5 || 
      currentSlideIndex === 8 || 
      currentSlideIndex === totalSlides - 1
    );

    if (cornerLogo) {
      cornerLogo.style.display = isSeparatorOrCover ? 'none' : 'block';
    }
  }

  // Button listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentSlideIndex > 0) showSlide(currentSlideIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentSlideIndex < totalSlides - 1) showSlide(currentSlideIndex + 1);
    });
  }

  // Dropdown listener
  if (slideJumpSelect) {
    slideJumpSelect.addEventListener('change', (e) => {
      showSlide(parseInt(e.target.value, 10));
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ' || e.key === 'Enter') {
      if (currentSlideIndex < totalSlides - 1) {
        e.preventDefault();
        showSlide(currentSlideIndex + 1);
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'Backspace') {
      if (currentSlideIndex > 0) {
        e.preventDefault();
        showSlide(currentSlideIndex - 1);
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      showSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      showSlide(totalSlides - 1);
    } else if (e.key === 'f' || e.key === 'F') {
      toggleFullscreen();
    }
  });

  // Fullscreen toggle
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      if (fullscreenToggleBtn) fullscreenToggleBtn.textContent = 'Salir Pantalla Completa';
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        if (fullscreenToggleBtn) fullscreenToggleBtn.textContent = 'Pantalla Completa';
      }
    }
  }

  if (fullscreenToggleBtn) {
    fullscreenToggleBtn.addEventListener('click', toggleFullscreen);
  }

  // =========================================================================
  // 3. DIRECT PDF DOWNLOAD ENGINE
  // =========================================================================
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.href = 'Query_Logic_Propuestas_Final.pdf';
      link.download = 'Query_Logic_Propuestas_Final.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // =========================================================================
  // 4. INTERACTIVE MINI SIMULATORS (Zero Emojis, Clean Engineering Output)
  // =========================================================================

  // Slide 5: QLine Concurrency Test
  const qlineBtn = document.getElementById('qline-sim-btn');
  const qlineResult = document.getElementById('qline-sim-result');
  let qlineQueue = ["A-015", "A-016", "A-017", "A-018", "A-019"];

  if (qlineBtn && qlineResult) {
    qlineBtn.addEventListener('click', () => {
      if (qlineQueue.length < 2) {
        qlineQueue = ["A-015", "A-016", "A-017", "A-018", "A-019"];
      }
      const t1 = qlineQueue.shift();
      const t2 = qlineQueue.shift();

      qlineResult.innerHTML = `
        <span style="color: #38bdf8;">[T=0ms] Ventanilla 1: ${t1}</span> &bull; 
        <span style="color: #38bdf8;">[T=1ms] Ventanilla 2: ${t2}</span> &bull; 
        <span style="color: #4ade80;">[Validado] Duplicados = 0 (Atómico en Redis)</span> &bull; 
        Restantes: [${qlineQueue.join(', ')}]
      `;
    });
  }

  // Slide 8: NutriBridge FEFO Test
  const nutriBtn = document.getElementById('nutri-sim-btn');
  const nutriResult = document.getElementById('nutri-sim-result');

  if (nutriBtn && nutriResult) {
    nutriBtn.addEventListener('click', () => {
      nutriResult.innerHTML = `
        <span style="color: #fb923c;">1º Lote-B (14h vida restante):</span> <strong style="color: #fff;">DESPACHADO</strong> &rarr; Comedor San José &bull; 
        <span style="color: #4ade80;">[FEFO Redis] Orden estricto por caducidad</span> &bull; 
        MongoDB: +120kg de alimento rescatado.
      `;
    });
  }

  // Slide 11: AgroLogic Offline & Sync Test
  const agroBtn = document.getElementById('agro-sim-btn');
  const agroSyncBtn = document.getElementById('agro-sync-btn');
  const agroResult = document.getElementById('agro-sim-result');

  if (agroBtn && agroResult && agroSyncBtn) {
    agroBtn.addEventListener('click', () => {
      agroResult.innerHTML = `
        <span style="color: #38bdf8;">[SQLite Local - Offline]:</span> Registro de plaga "Broca del Café" guardado con éxito. (0.7ms, sin señal).
      `;
      agroBtn.style.display = 'none';
      agroSyncBtn.style.display = 'inline-block';
    });

    agroSyncBtn.addEventListener('click', () => {
      agroResult.innerHTML = `
        <span style="color: #4ade80;">[Sincronización Cloud] Lote insertado en MongoDB</span> &bull; 
        <span style="color: #38bdf8;">Dashboard Redis invalidado en 2.1ms</span> &bull; 
        Trazabilidad GlobalGAP confirmada.
      `;
      agroSyncBtn.style.display = 'none';
      agroBtn.style.display = 'inline-block';
      agroBtn.textContent = 'Guardar Otro Registro';
    });
  }

  // Initial render
  showSlide(0);
});
