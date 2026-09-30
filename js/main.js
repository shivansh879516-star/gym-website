/**
 * SHIVANSH FITNESS | NATIVE MOBILE APP ENGINE
 * Non-scrolling Single-Page Application (SPA) Multi-Screen Architecture
 * Instant Screen Switcher, Active Dock States, Interactive Rest Timer with Chimes,
 * Weekly Date Picker, Daily Hydration Counter & PWA Offline Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initAppClock();
  initScreenNavigation();
  initOnboardingFlow();
  initDatePillsAndAnalytics();
  initHydrationTracker();
  initWorkoutRestTimer();
  initCategoryFilters();
  initCoachAndUPIActions();
  initInstallAppModal();
  initServiceWorker();
});

/* ==========================================================================
   1. LIVE STATUS BAR CLOCK
   ========================================================================== */
function initAppClock() {
  const clockEl = document.getElementById('appClockTime');
  if (!clockEl) return;

  function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? '' : '';
    hours = hours % 12 || 12;
    clockEl.textContent = `${hours}:${minutes.toString().padStart(2, '0')}`;
  }

  updateTime();
  setInterval(updateTime, 30000);
}

/* ==========================================================================
   2. SINGLE-PAGE SCREEN SWITCHER & BOTTOM DOCK
   ========================================================================== */
function switchAppScreen(targetScreenId) {
  const screens = document.querySelectorAll('.app-screen');
  const dockButtons = document.querySelectorAll('.dock-nav-button');
  const bottomDock = document.getElementById('appBottomNavDock');

  screens.forEach(screen => {
    screen.classList.remove('active');
  });

  const targetScreen = document.getElementById(targetScreenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
    const viewport = document.getElementById('appScreensViewport');
    if (viewport) viewport.scrollTop = 0;
  }

  // Update Bottom Dock State
  dockButtons.forEach(btn => {
    if (btn.getAttribute('data-screen') === targetScreenId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Hide Dock on Onboarding screen
  if (bottomDock) {
    if (targetScreenId === 'screenOnboarding') {
      bottomDock.style.display = 'none';
    } else {
      bottomDock.style.display = 'flex';
    }
  }

  playBeepSound(480, 0.04);
}

function initScreenNavigation() {
  const dockButtons = document.querySelectorAll('.dock-nav-button');
  dockButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const screenId = btn.getAttribute('data-screen');
      if (screenId) switchAppScreen(screenId);
    });
  });

  // Header quick links
  const avatar = document.getElementById('btnHeaderAvatar');
  if (avatar) avatar.addEventListener('click', () => switchAppScreen('screenCoach'));

  const promoBtn = document.getElementById('btnJoinGymPromo');
  if (promoBtn) promoBtn.addEventListener('click', () => switchAppScreen('screenCoach'));

  const seeDetails = document.getElementById('linkViewAllProgress');
  if (seeDetails) {
    seeDetails.addEventListener('click', (e) => {
      e.preventDefault();
      switchAppScreen('screenActivity');
    });
  }
}

/* ==========================================================================
   3. ONBOARDING SCREEN FLOW
   ========================================================================== */
function initOnboardingFlow() {
  const getStartedBtn = document.getElementById('btnGetStarted');
  const skipBtn = document.getElementById('btnSkipOnboarding');

  const enterApp = () => {
    localStorage.setItem('sf_onboarding_done', 'true');
    switchAppScreen('screenHome');
  };

  if (getStartedBtn) getStartedBtn.addEventListener('click', enterApp);
  if (skipBtn) skipBtn.addEventListener('click', enterApp);

  // If already onboarded, go directly to Home
  if (localStorage.getItem('sf_onboarding_done') === 'true') {
    switchAppScreen('screenHome');
  } else {
    switchAppScreen('screenOnboarding');
  }
}

/* ==========================================================================
   4. WEEKLY DATE PILLS & ACTIVITY WAVE CHART
   ========================================================================== */
const ACTIVITY_DATA = {
  sat: { calories: 1420, label: '+8% vs avg', running: '1.10 hours', distance: '7.80 km' },
  sun: { calories: 1250, label: 'Rest Day', running: '0.45 hours', distance: '3.20 km' },
  mon: { calories: 1680, label: '+14% vs avg', running: '1.32 hours', distance: '9.50 km' },
  tue: { calories: 1540, label: '+10% vs avg', running: '1.15 hours', distance: '8.40 km' },
  wed: { calories: 1720, label: '+18% vs avg', running: '1.40 hours', distance: '10.2 km' }
};

function initDatePillsAndAnalytics() {
  const pills = document.querySelectorAll('.date-pill-btn');
  const calorieNum = document.getElementById('activityCalorieNum');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const day = pill.getAttribute('data-day');
      if (ACTIVITY_DATA[day] && calorieNum) {
        calorieNum.textContent = ACTIVITY_DATA[day].calories.toLocaleString();
      }
      playBeepSound(520, 0.03);
    });
  });
}

/* ==========================================================================
   5. HYDRATION TRACKER
   ========================================================================== */
function initHydrationTracker() {
  let water = parseInt(localStorage.getItem('sf_app_water') || '2250', 10);
  const maxWater = 3500;
  const textEl = document.getElementById('activityWaterText');
  const addBtn = document.getElementById('btnActivityAddWater');

  function updateUI() {
    const pct = Math.min(100, Math.round((water / maxWater) * 100));
    if (textEl) textEl.textContent = `${water.toLocaleString()} / 3,500 ml (${pct}%)`;
  }
  updateUI();

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      water = Math.min(maxWater, water + 250);
      localStorage.setItem('sf_app_water', water.toString());
      updateUI();
      playBeepSound(650, 0.05);
      showAppToast('💧 +250ml Water Added!');
    });
  }
}

/* ==========================================================================
   6. WORKOUT REST INTERVAL LIVE TIMER
   ========================================================================== */
function initWorkoutRestTimer() {
  let duration = 45;
  let remaining = 45;
  let timerInterval = null;
  let isRunning = false;

  const display = document.getElementById('screenTimerDisplay');
  const startBtn = document.getElementById('btnScreenTimerStart');
  const resetBtn = document.getElementById('btnScreenTimerReset');
  const pills = document.querySelectorAll('.timer-preset-btn');

  function render() {
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    if (display) {
      display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  }

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      duration = parseInt(pill.getAttribute('data-sec'), 10);
      clearInterval(timerInterval);
      isRunning = false;
      remaining = duration;
      if (startBtn) startBtn.innerHTML = '<i class="fas fa-play me-1"></i> Start Rest';
      render();
      playBeepSound(400, 0.04);
    });
  });

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.innerHTML = '<i class="fas fa-play me-1"></i> Resume Rest';
      } else {
        if (remaining <= 0) remaining = duration;
        isRunning = true;
        startBtn.innerHTML = '<i class="fas fa-pause me-1"></i> Pause';

        timerInterval = setInterval(() => {
          remaining--;
          render();
          if (remaining <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            startBtn.innerHTML = '<i class="fas fa-redo me-1"></i> Restart';
            playChimeAudio();
            if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
            showAppToast('🔔 Rest Over! Time for next set!');
          }
        }, 1000);
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      clearInterval(timerInterval);
      isRunning = false;
      remaining = duration;
      if (startBtn) startBtn.innerHTML = '<i class="fas fa-play me-1"></i> Start Rest';
      render();
    });
  }
}

/* ==========================================================================
   7. CATEGORY FILTERS & CARDS
   ========================================================================== */
function initCategoryFilters() {
  const pills = document.querySelectorAll('.category-pill');
  const cards = document.querySelectorAll('.app-workout-card');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.getAttribute('data-cat');

      cards.forEach(card => {
        if (cat === 'all') {
          card.style.display = 'flex';
        } else if (cat === 'strength' && (card.dataset.workout === 'push' || card.dataset.workout === 'pull')) {
          card.style.display = 'flex';
        } else if (cat === 'fatloss' && card.dataset.workout === 'legs') {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
      playBeepSound(500, 0.02);
    });
  });

  // Clicking any workout card switches to Workout Studio
  cards.forEach(card => {
    card.addEventListener('click', () => {
      switchAppScreen('screenWorkouts');
    });
  });
}

/* ==========================================================================
   8. COACH PROFILE & COPY UPI
   ========================================================================== */
function initCoachAndUPIActions() {
  const copyBtn = document.getElementById('btnCopyUpiId');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('9555514847@ptyes').then(() => {
        showAppToast('✅ UPI ID (9555514847@ptyes) Copied!');
        playBeepSound(600, 0.05);
      });
    });
  }
}

/* ==========================================================================
   9. WEB AUDIO CHIMES & POP FEEDBACK
   ========================================================================== */
function playBeepSound(freq, duration) {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Audio context not allowed without interaction
  }
}

function playChimeAudio() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioCtx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.12);
      gain.gain.setValueAtTime(0.12, now + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.35);
    });
  } catch (e) {}
}

/* ==========================================================================
   10. IN-APP TOAST NOTIFICATION
   ========================================================================== */
function showAppToast(message) {
  let toast = document.getElementById('appInAppToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appInAppToast';
    toast.style.position = 'fixed';
    toast.style.top = '50px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = '#14213d';
    toast.style.color = '#ffffff';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '9999px';
    toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
    toast.style.zIndex = '99999';
    toast.style.fontSize = '0.85rem';
    toast.style.fontWeight = '600';
    toast.style.transition = 'opacity 0.3s ease';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.display = 'block';
  toast.style.opacity = '1';
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => { toast.style.display = 'none'; }, 300);
  }, 2500);
}

/* ==========================================================================
   11. INSTALL APP / APK MODAL & PWA PROMPT
   ========================================================================== */
let appDeferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  appDeferredPrompt = e;
  console.log('[PWA] beforeinstallprompt captured');
});

function initInstallAppModal() {
  const modal = document.getElementById('modalAppInstall');
  const headerBtn = document.getElementById('btnHeaderInstall');
  const closeBtn = document.getElementById('btnCloseInstallModal');
  const directInstallBtn = document.getElementById('btnPwaDirectInstall');

  const openModal = () => {
    if (modal) modal.style.display = 'flex';
  };

  const closeModal = () => {
    if (modal) modal.style.display = 'none';
  };

  if (headerBtn) headerBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (directInstallBtn) {
    directInstallBtn.addEventListener('click', () => {
      if (appDeferredPrompt) {
        appDeferredPrompt.prompt();
        appDeferredPrompt.userChoice.then((choice) => {
          if (choice.outcome === 'accepted') {
            showAppToast('🎉 Thank you! Shivansh Fitness installed!');
            closeModal();
          }
          appDeferredPrompt = null;
        });
      } else {
        showAppToast('📱 Use browser menu (⋮ / ⬆️) -> Add to Home Screen!');
      }
    });
  }

  window.addEventListener('appinstalled', () => {
    showAppToast('🚀 Shivansh Fitness App installed successfully!');
    if (headerBtn) headerBtn.style.display = 'none';
    closeModal();
  });
}

/* ==========================================================================
   12. SERVICE WORKER FOR OFFLINE
   ========================================================================== */
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => {
      console.warn('SW registration skipped:', err);
    });
  }
}

