/**
 * VYRA | COMMERCIAL FITNESS APPLICATION JAVASCRIPT ENGINE
 * State Management, 7-Step Onboarding, Active Workout Logger & Rest Timer,
 * Indian Food Database & Nutrition Math, 6 Science Calculators,
 * Progress Analytics & Conversational AI Fitness Coach
 */

// ==========================================================================
// 1. GLOBAL APP STATE & PERSISTENCE
// ==========================================================================
const DEFAULT_USER_STATE = {
  name: 'Shivansh',
  goal: 'muscle_gain', // fat_loss, muscle_gain, maintenance, strength, general
  gender: 'male',
  age: 23,
  height: 178, // cm
  weight: 74.5, // kg
  experience: 'intermediate',
  trainingDays: 5,
  equipment: 'full_gym',
  diet: 'high_protein_veg',
  streak: 7,
  caloriesTarget: 2200,
  caloriesConsumed: 1840,
  proteinTarget: 120,
  proteinConsumed: 92,
  carbsConsumed: 210,
  fatsConsumed: 48,
  waterTarget: 3.0,
  waterConsumed: 1.8,
  stepsTarget: 10000,
  stepsConsumed: 6420,
  workoutHistory: [
    { date: '2026-09-30', title: 'Chest & Triceps Hypertrophy', duration: '45 mins', exercises: 5 }
  ],
  units: 'metric',
  notifications: { workouts: true, water: true, streak: true },
  onboardingDone: true
};

let AppState = { ...DEFAULT_USER_STATE };

// Load from LocalStorage
try {
  const saved = localStorage.getItem('vyra_app_state');
  if (saved) {
    AppState = { ...DEFAULT_USER_STATE, ...JSON.parse(saved) };
  }
} catch (e) {
  console.warn('Could not read localStorage:', e);
}

function saveAppState() {
  try {
    localStorage.setItem('vyra_app_state', JSON.stringify(AppState));
  } catch (e) {}
  renderDashboardUI();
}

// ==========================================================================
// 2. DOM INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
  initClock();
  initNavigation();
  initOnboardingWizard();
  initDashboardQuickActions();
  initWorkoutLibraryAndLiveSession();
  initNutritionAndCalculators();
  initProgressSlider();
  initAICoach();
  initProfileSettings();
  renderDashboardUI();
  initServiceWorker();
});

function initSplashScreen() {
  const splash = document.getElementById('vyraSplashScreen');
  if (!splash) return;
  setTimeout(() => {
    splash.classList.add('fade-out');
    setTimeout(() => {
      splash.style.display = 'none';
    }, 450);
  }, 1000);
}

function triggerHaptic(duration = 15) {
  if (window.navigator && window.navigator.vibrate) {
    try {
      window.navigator.vibrate(duration);
    } catch (e) {}
  }
}

/* ==========================================================================
   3. CLOCK & NAVIGATION ROUTER
   ========================================================================== */
function initClock() {
  const clock = document.getElementById('vyraClockTime');
  if (!clock) return;
  const update = () => {
    const now = new Date();
    let hours = now.getHours();
    const mins = now.getMinutes().toString().padStart(2, '0');
    hours = hours % 12 || 12;
    clock.textContent = `${hours}:${mins}`;
  };
  update();
  setInterval(update, 30000);
}

function switchScreen(targetScreenId) {
  const screens = document.querySelectorAll('.vyra-screen');
  const dockBtns = document.querySelectorAll('.dock-tab-btn');
  const dock = document.getElementById('vyraBottomDock');

  screens.forEach(s => s.classList.remove('active'));
  const target = document.getElementById(targetScreenId);
  if (target) {
    target.classList.add('active');
    const viewport = document.getElementById('vyraViewport');
    if (viewport) viewport.scrollTop = 0;
  }

  dockBtns.forEach(btn => {
    if (btn.getAttribute('data-screen') === targetScreenId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (dock) {
    dock.style.display = targetScreenId === 'screenOnboarding' ? 'none' : 'flex';
  }

  triggerHaptic(18);
  playMicroBeep(480, 0.03);
}

function initNavigation() {
  document.querySelectorAll('.dock-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const screenId = btn.getAttribute('data-screen');
      if (screenId) switchScreen(screenId);
    });
  });

  const headerProfile = document.getElementById('btnHeaderProfile');
  if (headerProfile) headerProfile.addEventListener('click', () => switchScreen('screenProfile'));
}

/* ==========================================================================
   4. 7-STEP ONBOARDING WIZARD
   ========================================================================== */
let onboardingCurrentStep = 1;
const ONBOARDING_STEPS = [
  {
    step: 1,
    title: "What's your name & gender?",
    render: () => `
      <div class="calc-input-group mb-3">
        <label>Your Full Name</label>
        <input type="text" id="obInputName" value="${AppState.name}" placeholder="e.g., Shivansh">
      </div>
      <div class="calc-input-group">
        <label>Gender</label>
        <select id="obSelectGender">
          <option value="male" ${AppState.gender === 'male' ? 'selected' : ''}>Male</option>
          <option value="female" ${AppState.gender === 'female' ? 'selected' : ''}>Female</option>
        </select>
      </div>`
  },
  {
    step: 2,
    title: "What is your primary fitness goal?",
    render: () => `
      <div class="d-flex flex-column gap-2">
        <label class="p-3 rounded-3 border d-flex align-items-center justify-content-between cursor-pointer">
          <span class="fw-bold">🔥 Fat Loss & Recomposition</span>
          <input type="radio" name="obGoal" value="fat_loss" ${AppState.goal === 'fat_loss' ? 'checked' : ''} style="accent-color: var(--gold-500);">
        </label>
        <label class="p-3 rounded-3 border d-flex align-items-center justify-content-between cursor-pointer">
          <span class="fw-bold">💪 Muscle Gain & Hypertrophy</span>
          <input type="radio" name="obGoal" value="muscle_gain" ${AppState.goal === 'muscle_gain' ? 'checked' : ''} style="accent-color: var(--gold-500);">
        </label>
        <label class="p-3 rounded-3 border d-flex align-items-center justify-content-between cursor-pointer">
          <span class="fw-bold">⚡ Strength & Powerlifting</span>
          <input type="radio" name="obGoal" value="strength" ${AppState.goal === 'strength' ? 'checked' : ''} style="accent-color: var(--gold-500);">
        </label>
      </div>`
  },
  {
    step: 3,
    title: "Height & Body Weight",
    render: () => `
      <div class="calc-input-group mb-3">
        <label>Height (cm)</label>
        <input type="number" id="obInputHeight" value="${AppState.height}">
      </div>
      <div class="calc-input-group">
        <label>Current Body Weight (kg)</label>
        <input type="number" id="obInputWeight" value="${AppState.weight}">
      </div>`
  },
  {
    step: 4,
    title: "Your Fitness Experience",
    render: () => `
      <div class="d-flex flex-column gap-2">
        <label class="p-3 rounded-3 border d-flex align-items-center justify-content-between">
          <span><strong>Beginner</strong> (Under 6 months)</span>
          <input type="radio" name="obExp" value="beginner" ${AppState.experience === 'beginner' ? 'checked' : ''} style="accent-color: var(--gold-500);">
        </label>
        <label class="p-3 rounded-3 border d-flex align-items-center justify-content-between">
          <span><strong>Intermediate</strong> (1 - 3 years)</span>
          <input type="radio" name="obExp" value="intermediate" ${AppState.experience === 'intermediate' ? 'checked' : ''} style="accent-color: var(--gold-500);">
        </label>
        <label class="p-3 rounded-3 border d-flex align-items-center justify-content-between">
          <span><strong>Advanced</strong> (3+ years)</span>
          <input type="radio" name="obExp" value="advanced" ${AppState.experience === 'advanced' ? 'checked' : ''} style="accent-color: var(--gold-500);">
        </label>
      </div>`
  },
  {
    step: 5,
    title: "Weekly Training Frequency",
    render: () => `
      <div class="d-flex flex-column gap-2">
        <label class="p-3 rounded-3 border d-flex align-items-center justify-content-between">
          <span class="fw-bold">3 Days / Week (Full Body Routine)</span>
          <input type="radio" name="obDays" value="3" ${AppState.trainingDays === 3 ? 'checked' : ''} style="accent-color: var(--gold-500);">
        </label>
        <label class="p-3 rounded-3 border d-flex align-items-center justify-content-between">
          <span class="fw-bold">4 Days / Week (Upper / Lower Split)</span>
          <input type="radio" name="obDays" value="4" ${AppState.trainingDays === 4 ? 'checked' : ''} style="accent-color: var(--gold-500);">
        </label>
        <label class="p-3 rounded-3 border d-flex align-items-center justify-content-between">
          <span class="fw-bold">5 Days / Week (PPL + Upper/Lower)</span>
          <input type="radio" name="obDays" value="5" ${AppState.trainingDays === 5 ? 'checked' : ''} style="accent-color: var(--gold-500);">
        </label>
      </div>`
  },
  {
    step: 6,
    title: "Available Workout Equipment",
    render: () => `
      <div class="d-flex flex-column gap-2">
        <label class="p-3 rounded-3 border d-flex align-items-center justify-content-between">
          <span class="fw-bold">🏋️ Full Commercial Gym</span>
          <input type="radio" name="obEquip" value="full_gym" ${AppState.equipment === 'full_gym' ? 'checked' : ''} style="accent-color: var(--gold-500);">
        </label>
        <label class="p-3 rounded-3 border d-flex align-items-center justify-content-between">
          <span class="fw-bold">🏠 Dumbbells & Bench (Home Gym)</span>
          <input type="radio" name="obEquip" value="dumbbells" ${AppState.equipment === 'dumbbells' ? 'checked' : ''} style="accent-color: var(--gold-500);">
        </label>
        <label class="p-3 rounded-3 border d-flex align-items-center justify-content-between">
          <span class="fw-bold">🤸 Bodyweight Calisthenics</span>
          <input type="radio" name="obEquip" value="bodyweight" ${AppState.equipment === 'bodyweight' ? 'checked' : ''} style="accent-color: var(--gold-500);">
        </label>
      </div>`
  },
  {
    step: 7,
    title: "Dietary Preferences",
    render: () => `
      <div class="d-flex flex-column gap-2">
        <label class="p-3 rounded-3 border d-flex align-items-center justify-content-between">
          <span class="fw-bold">🥗 High Protein Indian Vegetarian (Paneer, Soya, Dal)</span>
          <input type="radio" name="obDiet" value="high_protein_veg" checked style="accent-color: var(--gold-500);">
        </label>
        <label class="p-3 rounded-3 border d-flex align-items-center justify-content-between">
          <span class="fw-bold">🍗 Indian Non-Vegetarian (Eggs, Chicken, Fish)</span>
          <input type="radio" name="obDiet" value="non_veg" style="accent-color: var(--gold-500);">
        </label>
        <label class="p-3 rounded-3 border d-flex align-items-center justify-content-between">
          <span class="fw-bold">🍳 Eggitarian</span>
          <input type="radio" name="obDiet" value="eggitarian" style="accent-color: var(--gold-500);">
        </label>
      </div>`
  }
];

function initOnboardingWizard() {
  const content = document.getElementById('onboardingStepContent');
  const stepLabel = document.getElementById('onboardingStepLabel');
  const percentLabel = document.getElementById('onboardingPercentLabel');
  const bar = document.getElementById('onboardingProgressBar');
  const nextBtn = document.getElementById('btnOnboardingNext');
  const prevBtn = document.getElementById('btnOnboardingPrev');

  function renderStep(idx) {
    const s = ONBOARDING_STEPS[idx - 1];
    if (!s) return;
    if (stepLabel) stepLabel.textContent = `STEP ${idx} OF 7`;
    const pct = Math.round((idx / 7) * 100);
    if (percentLabel) percentLabel.textContent = `${pct}% Completed`;
    if (bar) bar.style.width = `${pct}%`;
    if (content) {
      content.innerHTML = `
        <h3 class="fw-bold mb-3" style="font-size: 1.15rem; color: var(--text-main);">${s.title}</h3>
        ${s.render()}
      `;
    }
    if (prevBtn) prevBtn.style.display = idx === 1 ? 'none' : 'block';
    if (nextBtn) nextBtn.innerHTML = idx === 7 ? '<span>Generate Dashboard</span> <i class="fas fa-check fa-xs"></i>' : '<span>Continue</span> <i class="fas fa-arrow-right fa-xs"></i>';
  }

  if (AppState.onboardingDone) {
    switchScreen('screenHome');
  } else {
    switchScreen('screenOnboarding');
    renderStep(1);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      // Save current step data
      if (onboardingCurrentStep === 1) {
        const nameInput = document.getElementById('obInputName');
        const genderSelect = document.getElementById('obSelectGender');
        if (nameInput && nameInput.value.trim()) AppState.name = nameInput.value.trim();
        if (genderSelect) AppState.gender = genderSelect.value;
      } else if (onboardingCurrentStep === 2) {
        const selectedGoal = document.querySelector('input[name="obGoal"]:checked');
        if (selectedGoal) AppState.goal = selectedGoal.value;
      } else if (onboardingCurrentStep === 3) {
        const h = document.getElementById('obInputHeight');
        const w = document.getElementById('obInputWeight');
        if (h) AppState.height = parseFloat(h.value) || 175;
        if (w) AppState.weight = parseFloat(w.value) || 72;
      } else if (onboardingCurrentStep === 4) {
        const exp = document.querySelector('input[name="obExp"]:checked');
        if (exp) AppState.experience = exp.value;
      } else if (onboardingCurrentStep === 5) {
        const days = document.querySelector('input[name="obDays"]:checked');
        if (days) AppState.trainingDays = parseInt(days.value, 10);
      } else if (onboardingCurrentStep === 6) {
        const eq = document.querySelector('input[name="obEquip"]:checked');
        if (eq) AppState.equipment = eq.value;
      } else if (onboardingCurrentStep === 7) {
        const diet = document.querySelector('input[name="obDiet"]:checked');
        if (diet) AppState.diet = diet.value;

        // Calculate initial targets based on BMR / TDEE
        calculateInitialTargets();
        AppState.onboardingDone = true;
        saveAppState();
        switchScreen('screenHome');
        showVyraToast('🎉 Welcome to VYRA! Your custom fitness dashboard is ready.');
        return;
      }

      onboardingCurrentStep++;
      renderStep(onboardingCurrentStep);
      playMicroBeep(520, 0.03);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (onboardingCurrentStep > 1) {
        onboardingCurrentStep--;
        renderStep(onboardingCurrentStep);
      }
    });
  }
}

function calculateInitialTargets() {
  // Mifflin-St Jeor formula
  const bmr = AppState.gender === 'male'
    ? (10 * AppState.weight) + (6.25 * AppState.height) - (5 * AppState.age) + 5
    : (10 * AppState.weight) + (6.25 * AppState.height) - (5 * AppState.age) - 161;

  const activityMultiplier = AppState.trainingDays >= 5 ? 1.55 : 1.375;
  const tdee = Math.round(bmr * activityMultiplier);

  if (AppState.goal === 'fat_loss') {
    AppState.caloriesTarget = Math.round(tdee - 450);
  } else if (AppState.goal === 'muscle_gain') {
    AppState.caloriesTarget = Math.round(tdee + 250);
  } else {
    AppState.caloriesTarget = tdee;
  }

  AppState.proteinTarget = Math.round(AppState.weight * 1.8);
  AppState.waterTarget = 3.0;
}

/* ==========================================================================
   5. DASHBOARD UI RENDERING & QUICK ACTIONS
   ========================================================================== */
function renderDashboardUI() {
  // Home Greeting
  const greetingName = document.getElementById('homeUserName');
  const greetingSub = document.getElementById('homeGreetingSub');
  const streakCount = document.getElementById('homeStreakCount');
  const liveDate = document.getElementById('homeLiveDate');

  if (greetingName) greetingName.textContent = AppState.name;
  if (greetingSub) {
    const hour = new Date().getHours();
    greetingSub.textContent = hour < 12 ? 'Good Morning 👋' : hour < 17 ? 'Good Afternoon ☀️' : 'Good Evening 🌙';
  }
  if (streakCount) streakCount.textContent = AppState.streak;
  if (liveDate) {
    liveDate.textContent = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }

  // Calories Metric
  const calVal = document.getElementById('metricCaloriesVal');
  const calTarget = document.getElementById('metricCaloriesTarget');
  const calBar = document.getElementById('barCaloriesFill');
  if (calVal) calVal.textContent = AppState.caloriesConsumed.toLocaleString();
  if (calTarget) calTarget.textContent = `/ ${AppState.caloriesTarget.toLocaleString()} kcal`;
  if (calBar) {
    const pct = Math.min(100, Math.round((AppState.caloriesConsumed / AppState.caloriesTarget) * 100));
    calBar.style.width = `${pct}%`;
  }

  // Protein Metric
  const protVal = document.getElementById('metricProteinVal');
  const protTarget = document.getElementById('metricProteinTarget');
  const protBar = document.getElementById('barProteinFill');
  if (protVal) protVal.textContent = `${AppState.proteinConsumed}`;
  if (protTarget) protTarget.textContent = `/ ${AppState.proteinTarget} g`;
  if (protBar) {
    const pct = Math.min(100, Math.round((AppState.proteinConsumed / AppState.proteinTarget) * 100));
    protBar.style.width = `${pct}%`;
  }

  // Water Metric
  const waterVal = document.getElementById('metricWaterVal');
  const waterTarget = document.getElementById('metricWaterTarget');
  const waterBar = document.getElementById('barWaterFill');
  if (waterVal) waterVal.textContent = AppState.waterConsumed.toFixed(1);
  if (waterTarget) waterTarget.textContent = `/ ${AppState.waterTarget.toFixed(1)} L`;
  if (waterBar) {
    const pct = Math.min(100, Math.round((AppState.waterConsumed / AppState.waterTarget) * 100));
    waterBar.style.width = `${pct}%`;
  }

  // Profile display
  const profName = document.getElementById('profileDisplayName');
  const profHeight = document.getElementById('profileHeightText');
  const profWeight = document.getElementById('profileWeightText');
  const profDays = document.getElementById('profileDaysText');
  const profBadge = document.getElementById('profileGoalBadge');

  if (profName) profName.textContent = AppState.name;
  if (profHeight) profHeight.textContent = `${AppState.height} cm`;
  if (profWeight) profWeight.textContent = `${AppState.weight} kg`;
  if (profDays) profDays.textContent = `${AppState.trainingDays} Days/Wk`;
  if (profBadge) {
    const gText = AppState.goal === 'fat_loss' ? 'Fat Loss' : AppState.goal === 'muscle_gain' ? 'Muscle Gain' : 'Strength';
    profBadge.textContent = `${gText} • ${AppState.experience}`;
  }
}

function initDashboardQuickActions() {
  // Quick Water (+250ml)
  const chipWater = document.getElementById('chipQuickWater');
  if (chipWater) {
    chipWater.addEventListener('click', () => {
      AppState.waterConsumed = parseFloat((AppState.waterConsumed + 0.25).toFixed(2));
      saveAppState();
      playMicroBeep(650, 0.05);
      showVyraToast('💧 +250ml Water Added!');
    });
  }

  // Quick Meal (+ Modal)
  const chipMeal = document.getElementById('chipQuickMeal');
  const modalMeal = document.getElementById('modalAddMeal');
  const btnCloseMeal = document.getElementById('btnCloseMealModal');
  const btnConfirmMeal = document.getElementById('btnConfirmAddMeal');

  if (chipMeal && modalMeal) chipMeal.addEventListener('click', () => modalMeal.classList.add('open'));
  if (btnCloseMeal && modalMeal) btnCloseMeal.addEventListener('click', () => modalMeal.classList.remove('open'));

  if (btnConfirmMeal && modalMeal) {
    btnConfirmMeal.addEventListener('click', () => {
      const calInput = document.getElementById('inputFoodCalories');
      const protInput = document.getElementById('inputFoodProtein');
      const searchInput = document.getElementById('inputFoodSearch');

      const cals = parseInt(calInput.value, 10) || 250;
      const prot = parseInt(protInput.value, 10) || 15;

      AppState.caloriesConsumed += cals;
      AppState.proteinConsumed += prot;
      saveAppState();

      modalMeal.classList.remove('open');
      if (calInput) calInput.value = '';
      if (protInput) protInput.value = '';
      if (searchInput) searchInput.value = '';

      playMicroBeep(580, 0.04);
      showVyraToast(`🍱 Added meal (+${cals} kcal, +${prot}g Protein)!`);
    });
  }

  // Quick Workout & Start Recommended
  const chipWorkout = document.getElementById('chipQuickWorkout');
  const btnStartRec = document.getElementById('btnStartRecommendedWorkout');
  if (chipWorkout) chipWorkout.addEventListener('click', () => startActiveWorkoutSession('Chest & Triceps Hypertrophy'));
  if (btnStartRec) btnStartRec.addEventListener('click', () => startActiveWorkoutSession('Chest & Triceps Hypertrophy'));
}

/* ==========================================================================
   6. EXERCISE LIBRARY & ACTIVE LIVE WORKOUT SESSION
   ========================================================================== */
const EXERCISE_DATABASE = [
  { id: 'bench_press', name: 'Barbell Flat Bench Press', category: 'chest', muscles: 'Pectoralis Major, Anterior Delts', equipment: 'Barbell, Flat Bench', sets: 4, reps: '8-10', icon: 'fa-dumbbell' },
  { id: 'incline_db_press', name: 'Incline Dumbbell Press', category: 'chest', muscles: 'Clavicular Pecs, Triceps', equipment: 'Dumbbells, Incline Bench', sets: 3, reps: '10-12', icon: 'fa-dumbbell' },
  { id: 'lat_pulldown', name: 'Lat Pulldown Wide Grip', category: 'back', muscles: 'Latissimus Dorsi, Teres Major', equipment: 'Cable Machine', sets: 4, reps: '10-12', icon: 'fa-angles-down' },
  { id: 'barbell_row', name: 'Bent-Over Barbell Row', category: 'back', muscles: 'Rhomboids, Lats, Lower Back', equipment: 'Barbell', sets: 4, reps: '8-10', icon: 'fa-dumbbell' },
  { id: 'overhead_press', name: 'Standing Overhead Press', category: 'shoulders', muscles: 'Anterior & Lateral Delts', equipment: 'Barbell', sets: 4, reps: '8-10', icon: 'fa-arrow-up' },
  { id: 'cable_lateral_raise', name: 'Cable Lateral Raise', category: 'shoulders', muscles: 'Lateral Deltoids', equipment: 'Cable', sets: 4, reps: '15', icon: 'fa-arrows-left-right' },
  { id: 'barbell_curl', name: 'Barbell Bicep Curl', category: 'arms', muscles: 'Biceps Brachii', equipment: 'Barbell / EZ Bar', sets: 3, reps: '12', icon: 'fa-dumbbell' },
  { id: 'tricep_rope_pushdown', name: 'Tricep Rope Pushdown', category: 'arms', muscles: 'Triceps Lateral & Medial Head', equipment: 'Cable', sets: 4, reps: '12-15', icon: 'fa-arrow-down' },
  { id: 'barbell_squat', name: 'Barbell Back Squat', category: 'legs', muscles: 'Quadriceps, Glutes, Hamstrings', equipment: 'Barbell, Squat Rack', sets: 4, reps: '6-8', icon: 'fa-person-walking' },
  { id: 'pushups_home', name: 'Strict Floor Push-Ups', category: 'home', muscles: 'Chest, Triceps, Core', equipment: 'Bodyweight', sets: 4, reps: '15-20', icon: 'fa-hand-back-fist' }
];

function initWorkoutLibraryAndLiveSession() {
  const container = document.getElementById('exerciseLibraryList');
  const filterBtns = document.querySelectorAll('.category-filter-btn');

  function renderList(cat = 'all') {
    if (!container) return;
    const filtered = cat === 'all' ? EXERCISE_DATABASE : EXERCISE_DATABASE.filter(e => e.category === cat);
    container.innerHTML = filtered.map(ex => `
      <div class="exercise-item-card" data-id="${ex.id}">
        <div class="exercise-left-info">
          <div class="exercise-icon-badge"><i class="fas ${ex.icon}"></i></div>
          <div>
            <div class="exercise-name-title">${ex.name}</div>
            <div class="exercise-meta-text">${ex.muscles} • ${ex.sets} Sets × ${ex.reps}</div>
          </div>
        </div>
        <button type="button" class="btn btn-sm btn-outline-warning rounded-pill px-3 py-1 fw-bold" style="font-size: 0.75rem;">
          Start
        </button>
      </div>
    `).join('');

    container.querySelectorAll('.exercise-item-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const ex = EXERCISE_DATABASE.find(e => e.id === id);
        if (ex) startActiveWorkoutSession(ex.name);
      });
    });
  }

  renderList('all');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderList(filter);
    });
  });

  // Routine Launchers
  document.querySelectorAll('[data-action="launch-routine"]').forEach(b => {
    b.addEventListener('click', () => {
      const routine = b.getAttribute('data-routine');
      const title = routine === 'ppl' ? 'Push Day (Chest, Shoulders, Triceps)' : 'Upper Body Hypertrophy';
      startActiveWorkoutSession(title);
    });
  });
}

// Live Session Engine
let liveTimerDuration = 60;
let liveTimerRemaining = 60;
let liveTimerInterval = null;
let currentSetNumber = 1;
const maxSetsForExercise = 4;

function startActiveWorkoutSession(workoutTitle) {
  const drawer = document.getElementById('activeWorkoutDrawer');
  const titleEl = document.getElementById('activeExerciseTitle');
  const badgeEl = document.getElementById('activeSetBadge');

  if (titleEl) titleEl.textContent = workoutTitle;
  currentSetNumber = 1;
  if (badgeEl) badgeEl.textContent = `Set ${currentSetNumber} of ${maxSetsForExercise}`;

  if (drawer) drawer.classList.add('open');
  playMicroBeep(600, 0.05);
}

// Live Session Controls
document.addEventListener('DOMContentLoaded', () => {
  const drawer = document.getElementById('activeWorkoutDrawer');
  const closeBtn = document.getElementById('btnCloseActiveWorkout');
  const startRestBtn = document.getElementById('btnStartRestInterval');
  const resetRestBtn = document.getElementById('btnResetRestInterval');
  const completeSetBtn = document.getElementById('btnCompleteActiveSet');
  const finishBtn = document.getElementById('btnFinishActiveWorkout');
  const skipBtn = document.getElementById('btnSkipActiveExercise');
  const timerDisplay = document.getElementById('liveWorkoutTimerDisplay');
  const badgeEl = document.getElementById('activeSetBadge');

  if (closeBtn && drawer) closeBtn.addEventListener('click', () => drawer.classList.remove('open'));

  function renderLiveTimer() {
    const m = Math.floor(liveTimerRemaining / 60);
    const s = liveTimerRemaining % 60;
    if (timerDisplay) timerDisplay.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function startRest() {
    clearInterval(liveTimerInterval);
    liveTimerRemaining = liveTimerDuration;
    renderLiveTimer();
    liveTimerInterval = setInterval(() => {
      liveTimerRemaining--;
      renderLiveTimer();
      if (liveTimerRemaining <= 0) {
        clearInterval(liveTimerInterval);
        playChimeSound();
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
        showVyraToast('🔔 Rest Interval Over! Start next set!');
      }
    }, 1000);
  }

  if (startRestBtn) startRestBtn.addEventListener('click', startRest);
  if (resetRestBtn) resetRestBtn.addEventListener('click', () => {
    clearInterval(liveTimerInterval);
    liveTimerRemaining = liveTimerDuration;
    renderLiveTimer();
  });

  if (completeSetBtn) {
    completeSetBtn.addEventListener('click', () => {
      if (currentSetNumber < maxSetsForExercise) {
        currentSetNumber++;
        if (badgeEl) badgeEl.textContent = `Set ${currentSetNumber} of ${maxSetsForExercise}`;
        startRest();
        showVyraToast(`✅ Set logged! Rest timer started.`);
      } else {
        showVyraToast(`🎉 All ${maxSetsForExercise} sets completed!`);
      }
    });
  }

  if (finishBtn && drawer) {
    finishBtn.addEventListener('click', () => {
      clearInterval(liveTimerInterval);
      drawer.classList.remove('open');
      AppState.streak += 1;
      AppState.workoutHistory.unshift({
        date: new Date().toISOString().slice(0, 10),
        title: document.getElementById('activeExerciseTitle').textContent || 'Workout Routine',
        duration: '45 mins',
        exercises: 4
      });
      saveAppState();
      playChimeSound();
      showVyraToast('🏆 Workout Completed! Streak & logs updated.');
    });
  }

  if (skipBtn && drawer) {
    skipBtn.addEventListener('click', () => {
      currentSetNumber = 1;
      if (badgeEl) badgeEl.textContent = `Set 1 of 4`;
      showVyraToast('⏭️ Skipped to next exercise.');
    });
  }
});

/* ==========================================================================
   7. 6 SCIENCE CALCULATORS ENGINE
   ========================================================================== */
function initNutritionAndCalculators() {
  const container = document.getElementById('calculatorFormContainer');
  const pills = document.querySelectorAll('.calc-pill-btn');

  function renderCalculator(type) {
    if (!container) return;
    if (type === 'calorie') {
      container.innerHTML = `
        <div class="calc-input-group">
          <label>Target Goal</label>
          <select id="calcGoalSelect">
            <option value="fat_loss">Fat Loss (-450 kcal deficit)</option>
            <option value="muscle_gain" selected>Lean Muscle Gain (+250 kcal surplus)</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div class="calc-input-group">
          <label>Body Weight (kg)</label>
          <input type="number" id="calcWeightInput" value="${AppState.weight}">
        </div>
        <button type="button" class="btn-vyra-primary py-2 mt-2" id="btnCalculateTarget">Calculate Calorie Budget</button>
        <div class="mt-3 p-3 rounded-3 bg-surface border text-center" id="calcResultBox" style="display: none;"></div>
      `;
      document.getElementById('btnCalculateTarget')?.addEventListener('click', () => {
        const w = parseFloat(document.getElementById('calcWeightInput').value) || 70;
        const g = document.getElementById('calcGoalSelect').value;
        const base = w * 32;
        const target = g === 'fat_loss' ? Math.round(base - 450) : g === 'muscle_gain' ? Math.round(base + 250) : Math.round(base);
        const res = document.getElementById('calcResultBox');
        res.style.display = 'block';
        res.innerHTML = `
          <div class="fw-bold" style="font-size: 1.25rem; color: var(--gold-600);">${target} kcal / day</div>
          <p class="text-muted small mb-0">Recommended Protein: ${Math.round(w * 1.8)}g • Carbs: ${Math.round((target * 0.45)/4)}g • Fats: ${Math.round((target * 0.2)/9)}g</p>
        `;
      });
    } else if (type === 'bmr') {
      container.innerHTML = `
        <div class="row g-2 mb-2" style="display: flex; gap: 8px;">
          <div style="flex: 1;"><label class="small fw-bold">Height (cm)</label><input type="number" id="bmrHeight" value="${AppState.height}" style="width: 100%; padding: 8px; border: 1px solid #e2e8f0; border-radius: 8px;"></div>
          <div style="flex: 1;"><label class="small fw-bold">Weight (kg)</label><input type="number" id="bmrWeight" value="${AppState.weight}" style="width: 100%; padding: 8px; border: 1px solid #e2e8f0; border-radius: 8px;"></div>
        </div>
        <button type="button" class="btn-vyra-primary py-2 mt-2" id="btnCalculateBMR">Calculate BMR & TDEE</button>
        <div class="mt-3 p-3 rounded-3 bg-surface border text-center" id="bmrResultBox" style="display: none;"></div>
      `;
      document.getElementById('btnCalculateBMR')?.addEventListener('click', () => {
        const h = parseFloat(document.getElementById('bmrHeight').value) || 175;
        const w = parseFloat(document.getElementById('bmrWeight').value) || 70;
        const bmr = Math.round((10 * w) + (6.25 * h) - (5 * 24) + 5);
        const tdee = Math.round(bmr * 1.55);
        const res = document.getElementById('bmrResultBox');
        res.style.display = 'block';
        res.innerHTML = `
          <div class="fw-bold fs-5 text-dark">BMR: ${bmr} kcal • TDEE: ${tdee} kcal</div>
          <span class="text-muted small">Mifflin-St Jeor Energy Expenditure Model</span>
        `;
      });
    } else if (type === 'bmi') {
      container.innerHTML = `
        <div class="calc-input-group"><label>Height in meters (e.g. 1.78)</label><input type="number" step="0.01" id="bmiH" value="${(AppState.height/100).toFixed(2)}"></div>
        <div class="calc-input-group"><label>Weight in kg</label><input type="number" id="bmiW" value="${AppState.weight}"></div>
        <button type="button" class="btn-vyra-primary py-2 mt-2" id="btnCalcBMI">Calculate BMI</button>
        <div class="mt-3 p-3 rounded-3 bg-surface border text-center" id="bmiResultBox" style="display: none;"></div>
      `;
      document.getElementById('btnCalcBMI')?.addEventListener('click', () => {
        const h = parseFloat(document.getElementById('bmiH').value) || 1.75;
        const w = parseFloat(document.getElementById('bmiW').value) || 70;
        const bmi = (w / (h * h)).toFixed(1);
        const cat = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Healthy Normal Weight' : 'Overweight';
        const res = document.getElementById('bmiResultBox');
        res.style.display = 'block';
        res.innerHTML = `
          <div class="fw-bold fs-5" style="color: var(--gold-600);">BMI: ${bmi} (${cat})</div>
        `;
      });
    } else if (type === 'onerep') {
      container.innerHTML = `
        <div class="calc-input-group"><label>Lifted Weight (kg)</label><input type="number" id="ormWeight" value="80"></div>
        <div class="calc-input-group"><label>Repetitions Completed (1 - 10)</label><input type="number" id="ormReps" value="6"></div>
        <button type="button" class="btn-vyra-primary py-2 mt-2" id="btnCalc1RM">Calculate 1-Rep Max</button>
        <div class="mt-3 p-3 rounded-3 bg-surface border text-center" id="ormResultBox" style="display: none;"></div>
      `;
      document.getElementById('btnCalc1RM')?.addEventListener('click', () => {
        const w = parseFloat(document.getElementById('ormWeight').value) || 80;
        const r = parseFloat(document.getElementById('ormReps').value) || 6;
        // Brzycki formula
        const orm = Math.round(w * (36 / (37 - r)));
        const res = document.getElementById('ormResultBox');
        res.style.display = 'block';
        res.innerHTML = `
          <div class="fw-bold fs-4" style="color: var(--gold-600);">Estimated 1RM: ${orm} kg</div>
          <span class="text-muted small">80% Working Weight: ${Math.round(orm * 0.8)} kg</span>
        `;
      });
    } else {
      container.innerHTML = `<p class="text-muted small">Select a calculator above to compute physiological targets.</p>`;
    }
  }

  renderCalculator('calorie');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderCalculator(pill.getAttribute('data-calc'));
    });
  });
}

/* ==========================================================================
   8. PROGRESS BEFORE / AFTER SLIDER
   ========================================================================== */
function initProgressSlider() {
  const slider = document.getElementById('transformationSliderRange');
  const imgAfter = document.getElementById('compareAfterImg');
  if (slider && imgAfter) {
    slider.addEventListener('input', (e) => {
      imgAfter.style.width = `${e.target.value}%`;
    });
  }
}

/* ==========================================================================
   9. VYRA CONVERSATIONAL AI FITNESS COACH
   ========================================================================== */
function initAICoach() {
  const drawer = document.getElementById('aiCoachDrawer');
  const openBtn = document.getElementById('btnFloatingAICoach');
  const homeBtn = document.getElementById('btnQuickAICoachHome');
  const closeBtn = document.getElementById('btnCloseAICoach');
  const input = document.getElementById('inputAICoachQuery');
  const sendBtn = document.getElementById('btnSendAICoachQuery');
  const messagesContainer = document.getElementById('aiChatMessages');
  const chipBtns = document.querySelectorAll('.ai-chip-btn');

  const openDrawer = () => drawer?.classList.add('open');
  const closeDrawer = () => drawer?.classList.remove('open');

  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (homeBtn) homeBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  function appendMessage(text, isUser = false) {
    if (!messagesContainer) return;
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${isUser ? 'chat-bubble-user' : 'chat-bubble-bot'}`;
    bubble.textContent = text;
    messagesContainer.appendChild(bubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function handleQuery(query) {
    if (!query.trim()) return;
    appendMessage(query, true);

    const q = query.toLowerCase();
    setTimeout(() => {
      let reply = `Based on your ${AppState.goal === 'muscle_gain' ? 'Muscle Gain' : 'Fat Loss'} target (${AppState.caloriesTarget} kcal) and current weight of ${AppState.weight}kg:\n\n`;

      if (q.includes('train') || q.includes('workout') || q.includes('chest')) {
        reply += `Today's optimal routine is Chest & Triceps. Perform: Barbell Flat Bench (4 sets × 8 reps), Incline Dumbbell Press (3 sets × 10 reps), and Cable Lateral Raises (4 sets × 15 reps). Keep rest at 60-90 seconds.`;
      } else if (q.includes('eat') || q.includes('food') || q.includes('protein') || q.includes('diet')) {
        reply += `To hit your ${AppState.proteinTarget}g protein target today, have 150g Paneer/Chicken with Dal & Roti for lunch, and 3 whole eggs with dahi or a whey protein shake post-workout.`;
      } else if (q.includes('plateau') || q.includes('progress')) {
        reply += `Progress plateaus usually happen due to either under-recovery or lack of progressive overload. Ensure you get 7-8 hours of sleep and track your working weights in the VYRA workout logger!`;
      } else {
        reply += `Consistency with progressive overload and reaching your ${AppState.proteinTarget}g protein goal will drive maximum results. Stay hydrated (3.0L goal) and keep your workout streak active!`;
      }

      appendMessage(reply, false);
      playMicroBeep(520, 0.04);
    }, 600);
  }

  if (sendBtn && input) {
    sendBtn.addEventListener('click', () => {
      handleQuery(input.value);
      input.value = '';
    });
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleQuery(input.value);
        input.value = '';
      }
    });
  }

  chipBtns.forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-query');
      if (q) handleQuery(q);
    });
  });
}

/* ==========================================================================
   10. PROFILE & DATA SETTINGS
   ========================================================================== */
function initProfileSettings() {
  const exportBtn = document.getElementById('btnExportUserData');
  const resetBtn = document.getElementById('btnResetUserData');

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AppState, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `vyra_fitness_backup_${new Date().toISOString().slice(0,10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showVyraToast('📁 Data exported successfully as JSON!');
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all workout and nutrition data?')) {
        localStorage.removeItem('vyra_app_state');
        AppState = { ...DEFAULT_USER_STATE, onboardingDone: false };
        saveAppState();
        location.reload();
      }
    });
  }
}

/* ==========================================================================
   11. AUDIO FEEDBACK & TOAST NOTIFICATIONS
   ========================================================================== */
function playMicroBeep(freq = 500, dur = 0.03) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur);
  } catch (e) {}
}

function playChimeSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(freq, now + i * 0.1);
      gain.gain.setValueAtTime(0.1, now + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.3);
    });
  } catch (e) {}
}

function showVyraToast(msg) {
  let toast = document.getElementById('vyraToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'vyraToast';
    toast.style.position = 'fixed';
    toast.style.top = '48px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = '#0f172a';
    toast.style.color = '#ffffff';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '9999px';
    toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    toast.style.zIndex = '99999';
    toast.style.fontSize = '0.85rem';
    toast.style.fontWeight = '700';
    toast.style.transition = 'opacity 0.3s ease';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.display = 'block';
  toast.style.opacity = '1';
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => { toast.style.display = 'none'; }, 300);
  }, 2600);
}

/* ==========================================================================
   12. PWA SERVICE WORKER
   ========================================================================== */
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => {
      console.warn('SW registration skipped:', err);
    });
  }
}
