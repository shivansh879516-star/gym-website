/**
 * SHIVANSH FITNESS | PRODUCTION JAVASCRIPT ENGINE
 * Strict Form Validation, Secure Payment Architecture, Transparent Coaching Syllabus,
 * 1-Rep Max Calculator, Desi Meal Planner, BMI & TDEE Estimator,
 * Workout Split Routines & Rest Interval Timer with Audio Chime,
 * Automated FAQ Assistant (English & Hinglish) & Verified Contact Channels
 */

document.addEventListener('DOMContentLoaded', () => {
  initCookieConsent();
  initClearButtons();
  initBMICalculator();
  initMembershipPricingToggle();
  initConsultationAndContactForms();
  initBackToTop();
  
  // Visual & Interactive Systems
  initTransformationSlider();
  initStatCounters();
  init3DCardTilt();
  initPaymentGateway();
  initCurrencySwitcher();
  initScrollPopAnimations();
  initAIFitnessChatAssistant();
  
  // Fitness Tools & Reviews
  initProgramFilterAndModal();
  initOneRepMaxCalculator();
  initIndianMealPlanner();
  initWorkoutSplitAndTimer();
  initReviewFilters();
  initWebAudioClickSound();
  
  // Progressive Web App (PWA) Engine
  initPWAInstallation();
});

/* ==========================================================================
   1. SCROLL REVEAL (100% VISIBLE & ACCESSIBLE)
   ========================================================================== */
function initScrollPopAnimations() {
  const popElements = document.querySelectorAll('.scroll-pop, .scroll-pop-image, .scroll-stagger');
  if (!popElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  popElements.forEach(el => {
    el.classList.add('revealed');
    observer.observe(el);
  });
}

/* ==========================================================================
   2. PROGRAMS FILTER & INTERACTIVE SYLLABUS MODAL
   ========================================================================== */
const PROGRAM_DATABASE = {
  'recomp': {
    title: '1-on-1 Bespoke Body Recomposition',
    badge: '1-on-1 Coaching',
    coach: 'Coach Shivansh',
    duration: '16 Weeks',
    frequency: '4-5 Days / Week',
    inr: 8700,
    usd: 105,
    overview: 'Personalized physical coaching designed to encourage lean muscle retention and gradual fat reduction. Integrated with Indian meal preferences (roti, paneer, soya, dal).',
    phases: [
      { name: 'Phase 1 (Weeks 1-4): Baseline & Technique Audit', details: 'Determine baseline caloric maintenance, evaluate lifting biomechanics on squat, bench, and deadlift, establish daily 8,000-step routine.' },
      { name: 'Phase 2 (Weeks 5-8): Progressive Loading & Moderate Deficit', details: 'Introduce a sustainable ~350 kcal deficit with high protein targets (2.0g/kg). 4-day Upper/Lower resistance split.' },
      { name: 'Phase 3 (Weeks 9-12): Hypertrophy Density & Volume', details: 'Focus on compound movements, Romanian deadlifts for posterior chain, and targeted shoulder and core stability.' },
      { name: 'Phase 4 (Weeks 13-16): Consolidation & Sustainable Routine', details: 'Transition into long-term maintenance calories and sustainable workout split habits.' }
    ],
    sampleWorkout: [
      'Barbell Squat (Warmup to 3 working sets x 6-8 reps)',
      'Incline Dumbbell Press (3 sets x 8-10 reps)',
      'Chest-Supported Row (3 sets x 10-12 reps)',
      'Romanian Deadlift (3 sets x 8-10 reps)',
      'Lateral Cable Raises (4 sets x 12-15 reps)'
    ],
    dietCues: 'Low-fat paneer, boiled eggs / tofu, dal, dahi, and 2-3 multigrain rotis with green vegetables per meal.'
  },
  'shred': {
    title: 'Sustainable Fat Loss & Conditioning Protocol',
    badge: 'Fat Loss & Conditioning',
    coach: 'Coach Shivansh',
    duration: '12 Weeks',
    frequency: '4 Days / Week',
    inr: 5700,
    usd: 69,
    overview: 'Structured resistance training combined with daily step goals to support fat reduction while retaining functional muscle mass.',
    phases: [
      { name: 'Phase 1: Activity Audit & Caloric Awareness', details: 'Establish 8,000 to 10,000 daily steps. Audit hidden cooking oils and liquid sugars.' },
      { name: 'Phase 2: Full-Body Resistance & Interval Conditioning', details: 'Compound barbell movements paired with low-impact sled pushes or incline treadmill walks.' },
      { name: 'Phase 3: Habit Maintenance', details: 'Solidify sustainable meal preparation habits and regular resistance exercise.' }
    ],
    sampleWorkout: [
      'Trap Bar Deadlift (4 sets x 6 reps)',
      'Overhead Dumbbell Press (3 sets x 8 reps)',
      'Incline Treadmill Walk (15-20 minutes Zone 2)',
      'Hanging Knee Raises & Plank (3 sets to fatigue)'
    ],
    dietCues: 'Soya chunks pulao, egg white scramble, roasted makhana, high fiber salads, and adequate hydration.'
  },
  'power': {
    title: 'Strength & Powerlifting Fundamentals',
    badge: 'Strength & Power',
    coach: 'Coach Shivansh',
    duration: '12-24 Weeks',
    frequency: '4 Days / Week',
    inr: 5700,
    usd: 69,
    overview: 'Periodized strength system focused on barbell technique, rate of perceived exertion (RPE), and progressive overload on the Big 3 lifts.',
    phases: [
      { name: 'Phase 1: Technique & Work Capacity', details: 'Higher volume (8-10 reps) on lift variations (pause squats, spoto press, deficit deadlifts).' },
      { name: 'Phase 2: Strength Accumulation', details: 'Transition into working sets (3-5 reps @ 80-85% 1RM) focusing on central nervous system adaptation.' },
      { name: 'Phase 3: Peaking & PR Testing', details: 'Volume taper and heavy singles testing under proper safety spotters.' }
    ],
    sampleWorkout: [
      'Competition Back Squat (4 sets x 3-5 reps)',
      'Pause Bench Press (4 sets x 4 reps)',
      'Conventional Deadlift (3 sets x 5 reps)',
      'Weighted Dips & Pull-ups (3 sets x 8 reps)'
    ],
    dietCues: 'Complex carbohydrates (brown rice, oats, rotis, potatoes) to support heavy resistance training recovery.'
  },
  'mobility': {
    title: 'Desk Worker Posture & Mobility Protocol',
    badge: 'Posture & Mobility',
    coach: 'Coach Shivansh',
    duration: 'Ongoing',
    frequency: '3 Days / Week',
    inr: 2900,
    usd: 35,
    overview: 'Designed for desk workers and software engineers to support hip flexor flexibility, spinal decompression, and shoulder mobility.',
    phases: [
      { name: 'Phase 1: Spinal Decompression & Glute Activation', details: 'Dead hangs, cat-cow stretches, and band-resisted glute bridges.' },
      { name: 'Phase 2: Thoracic Extension & Rotator Health', details: 'Face pulls, prone Y-T-W raises, and diaphragmatic breathing.' },
      { name: 'Phase 3: Functional Strength', details: 'Goblet squats, suitcase carries, and single-leg Romanian deadlifts.' }
    ],
    sampleWorkout: [
      'Dead Hang on Pull-up Bar (3 sets x 45-60s)',
      'Couch Stretch for Hip Flexors (2 min/side)',
      'Kettlebell Goblet Squat (3 sets x 12 reps with 3s pause)',
      'Dumbbell Suitcase Carry (4 laps x 30 yards)'
    ],
    dietCues: 'Balanced anti-inflammatory whole foods, golden turmeric milk, chia seeds, and ample water.'
  }
};

function initProgramFilterAndModal() {
  const filterBtns = document.querySelectorAll('.program-filter-btn');
  const programCards = document.querySelectorAll('.program-col-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      programCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  const viewBtns = document.querySelectorAll('.btn-view-program');
  const modalEl = document.getElementById('programDetailsModal');

  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const progKey = btn.getAttribute('data-program-key') || 'recomp';
      const data = PROGRAM_DATABASE[progKey] || PROGRAM_DATABASE['recomp'];

      const titleEl = document.getElementById('modalProgTitle');
      const badgeEl = document.getElementById('modalProgBadge');
      const durEl = document.getElementById('modalProgDuration');
      const freqEl = document.getElementById('modalProgFrequency');
      const coachEl = document.getElementById('modalProgCoach');
      const overEl = document.getElementById('modalProgOverview');
      const dietEl = document.getElementById('modalProgDiet');

      if (titleEl) titleEl.textContent = data.title;
      if (badgeEl) badgeEl.textContent = data.badge;
      if (durEl) durEl.textContent = data.duration;
      if (freqEl) freqEl.textContent = data.frequency;
      if (coachEl) coachEl.textContent = data.coach;
      if (overEl) overEl.textContent = data.overview;
      if (dietEl) dietEl.textContent = data.dietCues;

      const phasesContainer = document.getElementById('modalProgPhases');
      if (phasesContainer) {
        phasesContainer.innerHTML = data.phases.map(p => `
          <div class="mb-3 p-3 bg-darkest rounded border border-secondary">
            <strong class="text-white d-block mb-1"><i class="fas fa-check-circle text-danger me-2"></i>${escapeHtml(p.name)}</strong>
            <p class="small text-white-50 mb-0">${escapeHtml(p.details)}</p>
          </div>
        `).join('');
      }

      const workoutContainer = document.getElementById('modalProgWorkout');
      if (workoutContainer) {
        workoutContainer.innerHTML = data.sampleWorkout.map(w => `
          <li class="py-1 text-white small"><i class="fas fa-dumbbell text-danger me-2"></i>${escapeHtml(w)}</li>
        `).join('');
      }

      const enrollBtn = document.getElementById('modalProgEnrollBtn');
      if (enrollBtn) {
        enrollBtn.setAttribute('data-plan', data.title);
        enrollBtn.setAttribute('data-inr', data.inr);
        enrollBtn.setAttribute('data-usd', data.usd);
      }

      if (modalEl) {
        const bModal = bootstrap.Modal.getOrCreateInstance(modalEl);
        bModal.show();
      }
    });
  });
}

/* ==========================================================================
   3. 1-REP MAX (1RM) STRENGTH CALCULATOR
   ========================================================================== */
function initOneRepMaxCalculator() {
  const form = document.getElementById('ormCalcForm');
  if (!form) return;

  const liftSelect = document.getElementById('ormLiftSelect');
  const weightInput = document.getElementById('ormWeightInput');
  const repsInput = document.getElementById('ormRepsInput');

  const result1RM = document.getElementById('ormResult1RM');
  const result95 = document.getElementById('ormResult95');
  const result85 = document.getElementById('ormResult85');
  const result75 = document.getElementById('ormResult75');
  const result65 = document.getElementById('ormResult65');
  const coachCue = document.getElementById('ormCoachCue');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const w = parseFloat(weightInput.value);
    const r = parseInt(repsInput.value, 10);
    const lift = liftSelect.value;

    if (!w || !r || w <= 10 || r < 1 || r > 15) {
      alert('Please enter valid weight (kg) and reps (1-12).');
      return;
    }

    // Mathematical average of Brzycki and Epley equations
    const brzycki = w * (36 / (37 - r));
    const epley = w * (1 + (r / 30));
    const oneRepMax = Math.round((brzycki + epley) / 2);

    if (result1RM) result1RM.textContent = `${oneRepMax} kg`;
    if (result95) result95.textContent = `${Math.round(oneRepMax * 0.95)} kg`;
    if (result85) result85.textContent = `${Math.round(oneRepMax * 0.85)} kg`;
    if (result75) result75.textContent = `${Math.round(oneRepMax * 0.75)} kg`;
    if (result65) result65.textContent = `${Math.round(oneRepMax * 0.65)} kg`;

    let cue = '';
    if (lift === 'squat') {
      cue = `For Barbell Squat: Maintain intra-abdominal pressure, spread the floor with your feet, and train at ${Math.round(oneRepMax * 0.80)} kg for sets of 5 reps to build leg strength safely.`;
    } else if (lift === 'bench') {
      cue = `For Bench Press: Retract your shoulder blades, maintain leg drive, and use ${Math.round(oneRepMax * 0.75)} kg for 8-rep hypertrophy sets.`;
    } else if (lift === 'deadlift') {
      cue = `For Deadlift: Engage your lats by bending the bar around your shins, push through the floor, and avoid hitching at lockout. 85% load (${Math.round(oneRepMax * 0.85)} kg) is optimal for back strength.`;
    } else {
      cue = `For Overhead Press: Squeeze your glutes and core tight to form a solid base, press straight overhead.`;
    }

    if (coachCue) {
      coachCue.innerHTML = `<strong class="text-warning"><i class="fas fa-lightbulb me-1"></i> Technique Cue:</strong> ${cue}`;
    }
  });
}

/* ==========================================================================
   4. INDIAN MACRO & DESI MEAL PLANNER
   ========================================================================== */
function initIndianMealPlanner() {
  const form = document.getElementById('indianMealPlannerForm');
  const output = document.getElementById('mealPlanOutput');
  if (!form || !output) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const dietType = document.getElementById('mealDietType').value;
    const calorieTarget = parseInt(document.getElementById('mealCalorieTarget').value, 10);

    let meals = [];
    let protein = 0;
    let carbs = 0;
    let fats = 0;

    if (dietType === 'veg') {
      protein = Math.round(calorieTarget * 0.28 / 4);
      carbs = Math.round(calorieTarget * 0.47 / 4);
      fats = Math.round(calorieTarget * 0.25 / 9);

      meals = [
        { time: '08:00 AM (Breakfast)', item: '150g Paneer Bhurji + 2 Multigrain Rotis + Green Tea', macro: '30g Protein • 38g Carbs' },
        { time: '11:30 AM (Mid-Morning)', item: '1 Cup Low-fat Curd (Dahi) + 30g Roasted Makhana', macro: '12g Protein • 24g Carbs' },
        { time: '01:30 PM (Lunch)', item: '60g Soya Chunks Curry + 1 Cup Dal Tadka + 1 Bowl Brown Rice + Salad', macro: '38g Protein • 65g Carbs' },
        { time: '05:00 PM (Pre-Workout)', item: '1 Banana + Black Coffee / Green Tea + 5 Almonds', macro: '2g Protein • 28g Carbs' },
        { time: '07:30 PM (Post-Workout)', item: '1 Scoop Whey Protein Isolate in cold water', macro: '25g Protein • 2g Carbs' },
        { time: '09:00 PM (Dinner)', item: 'Tofu/Paneer Stir-fry with Mixed Veggies + 1 Phulka Roti', macro: '26g Protein • 25g Carbs' }
      ];
    } else if (dietType === 'eggetarian') {
      protein = Math.round(calorieTarget * 0.32 / 4);
      carbs = Math.round(calorieTarget * 0.43 / 4);
      fats = Math.round(calorieTarget * 0.25 / 9);

      meals = [
        { time: '08:00 AM (Breakfast)', item: '4 Whole Boiled Eggs (or 2 whole + 4 whites scramble) + 2 Toast', macro: '32g Protein • 30g Carbs' },
        { time: '11:30 AM (Mid-Morning)', item: '1 Bowl Dahi + Papaya/Apple slices', macro: '10g Protein • 26g Carbs' },
        { time: '01:30 PM (Lunch)', item: 'Paneer Curry (150g) + Yellow Moong Dal + 2 Rotis + Cucumber', macro: '35g Protein • 55g Carbs' },
        { time: '05:00 PM (Pre-Workout)', item: '1 Banana + 1 Spoon Peanut Butter + Coffee', macro: '6g Protein • 32g Carbs' },
        { time: '07:30 PM (Post-Workout)', item: '1 Scoop Whey Isolate + 2 Egg Whites', macro: '32g Protein • 1g Carbs' },
        { time: '09:00 PM (Dinner)', item: 'Egg Curry (3 eggs) + 1 Phulka Roti + Mixed Sabzi', macro: '22g Protein • 22g Carbs' }
      ];
    } else {
      protein = Math.round(calorieTarget * 0.35 / 4);
      carbs = Math.round(calorieTarget * 0.40 / 4);
      fats = Math.round(calorieTarget * 0.25 / 9);

      meals = [
        { time: '08:00 AM (Breakfast)', item: '4 Egg Whites + 2 Whole Eggs Scramble + 2 Toast / 1 Light Paratha', macro: '34g Protein • 32g Carbs' },
        { time: '11:30 AM (Mid-Morning)', item: '1 Glass Buttermilk (Chhaas) + 30g Roasted Chana', macro: '12g Protein • 20g Carbs' },
        { time: '01:30 PM (Lunch)', item: '180g Chicken Breast / Fish Curry + 1 Bowl Rice + Dal + Salad', macro: '46g Protein • 50g Carbs' },
        { time: '05:00 PM (Pre-Workout)', item: '1 Banana + Black Coffee', macro: '2g Protein • 27g Carbs' },
        { time: '07:30 PM (Post-Workout)', item: '1 Scoop Whey Protein Isolate in water', macro: '25g Protein • 2g Carbs' },
        { time: '09:00 PM (Dinner)', item: '150g Chicken Keema / Fish Tikka + Green Salad + 1 Roti', macro: '36g Protein • 18g Carbs' }
      ];
    }

    const waText = encodeURIComponent(`Hi Shivansh! I generated my ${calorieTarget} kcal (${dietType.toUpperCase()}) meal plan: Protein: ${protein}g, Carbs: ${carbs}g, Fats: ${fats}g. Can we customize this for my schedule?`);

    output.innerHTML = `
      <div class="p-3 bg-darkest rounded border border-danger">
        <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-secondary">
          <h5 class="text-white mb-0"><i class="fas fa-utensils text-danger me-2"></i>Daily Target: ${calorieTarget} kcal</h5>
          <span class="badge bg-danger">${dietType.toUpperCase()} DIET</span>
        </div>

        <div class="row g-2 mb-3 text-center">
          <div class="col-4">
            <div class="p-2 bg-card rounded border border-secondary">
              <span class="d-block small text-white-50">Protein</span>
              <strong class="text-danger fs-5">${protein}g</strong>
            </div>
          </div>
          <div class="col-4">
            <div class="p-2 bg-card rounded border border-secondary">
              <span class="d-block small text-white-50">Carbs</span>
              <strong class="text-warning fs-5">${carbs}g</strong>
            </div>
          </div>
          <div class="col-4">
            <div class="p-2 bg-card rounded border border-secondary">
              <span class="d-block small text-white-50">Fats</span>
              <strong class="text-info fs-5">${fats}g</strong>
            </div>
          </div>
        </div>

        <h6 class="text-white small fw-bold mb-2">Meal-By-Meal Routine:</h6>
        <div class="d-flex flex-column gap-2 mb-3">
          ${meals.map(m => `
            <div class="p-2 bg-card rounded border border-secondary text-start">
              <div class="d-flex justify-content-between">
                <strong class="text-white small">${escapeHtml(m.time)}</strong>
                <span class="text-danger small fw-bold">${escapeHtml(m.macro)}</span>
              </div>
              <div class="text-white-50 small">${escapeHtml(m.item)}</div>
            </div>
          `).join('')}
        </div>

        <a href="https://wa.me/919555514847?text=${waText}" target="_blank" class="btn btn-sm btn-outline-success text-white border-success w-100">
          <i class="fab fa-whatsapp text-success me-1"></i> Send Meal Plan to Coach Shivansh on WhatsApp
        </a>
      </div>
    `;
  });
}

/* ==========================================================================
   5. BMI & CALORIC TDEE ESTIMATOR
   ========================================================================== */
function initBMICalculator() {
  const form = document.getElementById('bmiCalcForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const h = parseFloat(document.getElementById('calcHeight')?.value);
    const w = parseFloat(document.getElementById('calcWeight')?.value);
    const age = parseInt(document.getElementById('calcAge')?.value || '25', 10);
    const gender = document.getElementById('calcGender')?.value || 'male';
    const activity = parseFloat(document.getElementById('calcActivity')?.value || '1.55');

    if (!h || !w || h <= 50 || w <= 20) {
      alert('Please enter valid height (cm) and weight (kg).');
      return;
    }

    const heightInMeters = h / 100;
    const bmi = (w / (heightInMeters * heightInMeters)).toFixed(1);
    let bmr = (10 * w) + (6.25 * h) - (5 * age) + (gender === 'male' ? 5 : -161);
    const tdee = Math.round(bmr * activity);

    const scoreDisplay = document.getElementById('bmiScoreDisplay');
    const catDisplay = document.getElementById('bmiCategoryDisplay');
    const calDisplay = document.getElementById('calorieEstimateDisplay');
    const roadmapDisplay = document.getElementById('bmiCoachRoadmap');

    if (scoreDisplay) scoreDisplay.textContent = bmi;
    if (calDisplay) calDisplay.textContent = `${tdee.toLocaleString()} kcal`;

    let cat = 'Normal Range';
    let col = 'bg-success';
    let roadmapText = '';

    if (bmi < 18.5) {
      cat = 'Underweight';
      col = 'bg-info text-dark';
      roadmapText = `For lean mass gain, aim for a surplus of <strong>~${tdee + 300} kcal/day</strong> with <strong>${Math.round(w * 2.0)}g protein</strong> and progressive resistance training.`;
    } else if (bmi >= 18.5 && bmi < 25) {
      cat = 'Optimal Health Range';
      col = 'bg-success';
      roadmapText = `You are in a healthy weight zone! For body recomposition, maintain <strong>~${tdee - 200} kcal/day</strong> with <strong>${Math.round(w * 2.0)}g protein</strong>.`;
    } else if (bmi >= 25 && bmi < 30) {
      cat = 'Overweight Range';
      col = 'bg-warning text-dark';
      roadmapText = `Target a moderate caloric deficit of <strong>~${tdee - 400} kcal/day</strong> with <strong>${Math.round(w * 2.2)}g protein</strong>, 8,000-10,000 steps, and 4 resistance sessions.`;
    } else {
      cat = 'High Adiposity Range';
      col = 'bg-danger';
      roadmapText = `Focus on structured fat loss with a <strong>~${tdee - 500} kcal/day</strong> deficit under coaching supervision. Prioritize low-impact activity and joint-friendly training.`;
    }

    if (catDisplay) {
      catDisplay.textContent = cat;
      catDisplay.className = `badge ${col} px-3 py-1`;
    }
    if (roadmapDisplay) {
      roadmapDisplay.innerHTML = roadmapText;
    }
  });
}

/* ==========================================================================
   6. WORKOUT ROUTINES & REST TIMER WITH AUDIO CHIME
   ========================================================================== */
const WORKOUT_ROUTINES_DATA = {
  'push': {
    title: 'Push Day: Chest, Shoulders & Triceps',
    focus: 'Hypertrophy & Lockout Power',
    exercises: [
      { name: 'Barbell Flat Bench Press', sets: '4 sets x 6-8 reps', rest: '90s', cue: 'Retract scapulae, maintain 45-degree elbow tuck.' },
      { name: 'Incline Dumbbell Press (30° Angle)', sets: '3 sets x 8-10 reps', rest: '60s', cue: 'Deep stretch at the bottom, squeeze upper chest at top.' },
      { name: 'Standing Dumbbell Overhead Press', sets: '3 sets x 8-10 reps', rest: '60s', cue: 'Lock glutes and core, avoid excessive lumbar arch.' },
      { name: 'Cable Lateral Raises', sets: '4 sets x 12-15 reps', rest: '45s', cue: 'Lead with elbows, pause for 1 second at shoulder height.' },
      { name: 'Rope Tricep Pushdowns', sets: '3 sets x 12 reps', rest: '45s', cue: 'Flare rope outward at full elbow extension.' }
    ]
  },
  'pull': {
    title: 'Pull Day: Back, Lats & Biceps',
    focus: 'Upper Back & Posterior Chain Strength',
    exercises: [
      { name: 'Conventional / Sumo Deadlift', sets: '4 sets x 5 reps', rest: '120s', cue: 'Pull slack out of barbell, drive through heels.' },
      { name: 'Lat Pulldown / Pull-ups', sets: '4 sets x 8 reps', rest: '75s', cue: 'Drive elbows down into back pockets.' },
      { name: 'Chest-Supported T-Bar Row', sets: '3 sets x 10 reps', rest: '60s', cue: 'Hold peak contraction for 1 second to build upper back.' },
      { name: 'Face Pulls with External Rotation', sets: '4 sets x 15 reps', rest: '45s', cue: 'Pull towards forehead, rotate thumbs backward.' },
      { name: 'Incline Dumbbell Bicep Curls', sets: '3 sets x 10-12 reps', rest: '45s', cue: 'Full biceps stretch on 45° incline bench.' }
    ]
  },
  'legs': {
    title: 'Legs & Core: Quads, Hamstrings & Abdominals',
    focus: 'Lower Body Strength & Knee Integrity',
    exercises: [
      { name: 'Barbell Back Squat', sets: '4 sets x 6 reps', rest: '120s', cue: 'Screw feet into ground, hit parallel depth with braced core.' },
      { name: 'Romanian Deadlift', sets: '3 sets x 8-10 reps', rest: '90s', cue: 'Hinge back with hips until hamstrings are loaded.' },
      { name: 'Bulgarian Split Squats', sets: '3 sets x 10 reps/leg', rest: '60s', cue: 'Torso slightly forward to bias glutes and quads.' },
      { name: 'Hamstring Curls', sets: '3 sets x 12 reps', rest: '45s', cue: 'Slow 3-second eccentric lower on every rep.' },
      { name: 'Hanging Leg Raises', sets: '4 sets x 12-15 reps', rest: '45s', cue: 'Curl pelvis upward without swinging momentum.' }
    ]
  },
  'mobility': {
    title: 'Desk Worker Posture & Mobility Flow',
    focus: 'Spinal Decompression & Hip Mobility',
    exercises: [
      { name: 'Dead Hang on Pull-up Bar', sets: '3 sets x 45-60s', rest: '45s', cue: 'Relax lats and breathe deeply into lower abdomen.' },
      { name: 'Couch Stretch for Hip Flexors', sets: '2 sets x 90s/side', rest: '30s', cue: 'Squeeze glute on back leg to release tight hips.' },
      { name: 'Thoracic Extension on Foam Roller', sets: '3 sets x 10 reps', rest: '30s', cue: 'Keep ribs tucked, extend upper thoracic spine.' },
      { name: 'Band-Resisted Glute Bridges', sets: '3 sets x 15 reps', rest: '30s', cue: 'Hold 2-second lockout to activate desk glutes.' }
    ]
  }
};

function initWorkoutSplitAndTimer() {
  const container = document.getElementById('workoutRoutineContainer');
  const tabBtns = document.querySelectorAll('.workout-tab-btn');

  function renderRoutine(key) {
    const data = WORKOUT_ROUTINES_DATA[key] || WORKOUT_ROUTINES_DATA['push'];
    if (!container) return;

    container.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 class="text-white mb-0">${escapeHtml(data.title)}</h4>
          <span class="text-danger small fw-bold">${escapeHtml(data.focus)}</span>
        </div>
        <span class="badge bg-danger px-3 py-1">Coach Protocol</span>
      </div>

      <div class="d-flex flex-column gap-2 mb-3">
        ${data.exercises.map(ex => `
          <div class="exercise-item-card">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <strong class="text-white">${escapeHtml(ex.name)}</strong>
              <span class="badge bg-dark border border-secondary text-warning small">${escapeHtml(ex.sets)}</span>
            </div>
            <div class="d-flex justify-content-between text-white-50 small">
              <span><i class="fas fa-bullseye text-danger me-1"></i>${escapeHtml(ex.cue)}</span>
              <span class="text-white"><i class="fas fa-clock text-info me-1"></i>Rest: ${escapeHtml(ex.rest)}</span>
            </div>
          </div>
        `).join('')}
      </div>

      <a href="https://wa.me/919555514847?text=${encodeURIComponent('Hi Shivansh! I would like form check feedback for the ' + data.title + ' routine.')}" target="_blank" class="btn btn-sm btn-outline-success text-white border-success w-100">
        <i class="fab fa-whatsapp text-success me-1"></i> Get Form Feedback on WhatsApp (+91 9555514847)
      </a>
    `;
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderRoutine(btn.getAttribute('data-day'));
    });
  });

  renderRoutine('push');

  // Rest Timer
  let timerInterval = null;
  let totalTime = 60;
  let timeLeft = 60;
  let isRunning = false;

  const timerDisplay = document.getElementById('timerDisplay');
  const timerCircleProgress = document.getElementById('timerCircleProgress');
  const startBtn = document.getElementById('btnStartTimer');
  const resetBtn = document.getElementById('btnResetTimer');
  const presetBtns = document.querySelectorAll('.timer-preset-btn');

  function updateTimerCircle() {
    if (timerDisplay) timerDisplay.textContent = `${timeLeft}s`;
    if (timerCircleProgress) {
      const maxDash = 440;
      const offset = maxDash - (timeLeft / totalTime) * maxDash;
      timerCircleProgress.style.strokeDashoffset = offset;
    }
  }

  function playChime() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {}
  }

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.innerHTML = '<i class="fas fa-play me-1"></i> Resume Rest';
      } else {
        isRunning = true;
        startBtn.innerHTML = '<i class="fas fa-pause me-1"></i> Pause Rest';

        timerInterval = setInterval(() => {
          if (timeLeft > 0) {
            timeLeft--;
            updateTimerCircle();
          } else {
            clearInterval(timerInterval);
            isRunning = false;
            playChime();
            showToastNotification('Rest interval complete! Time for your next set.');
            startBtn.innerHTML = '<i class="fas fa-play me-1"></i> Start Rest';
            timeLeft = totalTime;
            updateTimerCircle();
          }
        }, 1000);
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      clearInterval(timerInterval);
      isRunning = false;
      timeLeft = totalTime;
      updateTimerCircle();
      if (startBtn) startBtn.innerHTML = '<i class="fas fa-play me-1"></i> Start Rest';
    });
  }

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      clearInterval(timerInterval);
      isRunning = false;
      totalTime = parseInt(btn.getAttribute('data-seconds'), 10) || 60;
      timeLeft = totalTime;
      updateTimerCircle();
      if (startBtn) startBtn.innerHTML = '<i class="fas fa-play me-1"></i> Start Rest';
    });
  });

  updateTimerCircle();
}

/* ==========================================================================
   7. REVIEW FILTER SYSTEM (ALL / HINGLISH / ENGLISH)
   ========================================================================== */
function initReviewFilters() {
  const filterBtns = document.querySelectorAll('.review-filter-btn');
  const reviewCards = document.querySelectorAll('.review-card-col');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      reviewCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-lang') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   8. TACTILE WEB AUDIO API CLICK SOUND
   ========================================================================== */
let audioCtx = null;
let soundEnabled = true;

function initWebAudioClickSound() {
  const soundToggleBtn = document.getElementById('soundToggleBtn');

  function playClickSound() {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {}
  }

  document.querySelectorAll('.btn-primary-custom, .btn-secondary-custom, .trigger-checkout-btn, .quick-chip, .ai-assistant-toggle-btn').forEach(btn => {
    btn.addEventListener('click', playClickSound);
  });

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggleBtn.innerHTML = soundEnabled ? '<i class="fas fa-volume-up"></i> Sound: ON' : '<i class="fas fa-volume-mute"></i> Sound: OFF';
      showToastNotification(soundEnabled ? 'Sound effects enabled.' : 'Sound effects muted.');
    });
  }
}

/* ==========================================================================
   9. AI FITNESS FAQ ASSISTANT (ENGLISH & HINGLISH)
   ========================================================================== */
function initAIFitnessChatAssistant() {
  const toggleBtn = document.getElementById('aiAssistantToggleBtn');
  const chatDrawer = document.getElementById('aiChatDrawer');
  const closeBtn = document.getElementById('closeAiChatBtn');
  const chatBody = document.getElementById('aiChatBody');
  const chatInput = document.getElementById('aiChatInput');
  const sendBtn = document.getElementById('aiChatSendBtn');
  const quickChips = document.querySelectorAll('.quick-chip');

  if (!toggleBtn || !chatDrawer) return;

  toggleBtn.addEventListener('click', () => {
    const isVisible = chatDrawer.style.display === 'flex';
    chatDrawer.style.display = isVisible ? 'none' : 'flex';
    if (!isVisible && chatInput) chatInput.focus();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      chatDrawer.style.display = 'none';
    });
  }

  function handleSendMessage(text) {
    const msg = (text || chatInput?.value || '').trim();
    if (!msg) return;

    appendChatBubble(msg, 'user');
    if (chatInput) chatInput.value = '';

    const typingId = showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator(typingId);
      const botResponse = generateAIResponse(msg);
      appendChatBubble(botResponse, 'bot');
    }, 550);
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', () => handleSendMessage());
  }

  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSendMessage();
      }
    });
  }

  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt') || chip.textContent;
      handleSendMessage(prompt);
    });
  });

  function appendChatBubble(text, sender) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble chat-bubble-${sender}`;
    bubble.innerHTML = escapeHtml(text).replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    chatBody.appendChild(bubble);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function showTypingIndicator() {
    const id = 'typing_' + Date.now();
    const indicator = document.createElement('div');
    indicator.id = id;
    indicator.className = 'chat-bubble chat-bubble-bot text-white-50';
    indicator.innerHTML = '<i class="fas fa-circle-notch fa-spin me-1"></i> Bot is typing...';
    chatBody.appendChild(indicator);
    chatBody.scrollTop = chatBody.scrollHeight;
    return id;
  }

  function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }
}

function generateAIResponse(input) {
  const lower = input.toLowerCase();

  if (lower.includes('diet') || lower.includes('khana') || lower.includes('protein') || lower.includes('paneer') || lower.includes('eggs')) {
    return "Desi Indian diet me protein manage karna simple hai! \n\n" +
           "**Main Sources:**\n" +
           "• 200g Low-fat Paneer / Tofu (35g protein)\n" +
           "• 50g Soya Chunks (26g protein)\n" +
           "• 4-5 Boiled Eggs (agar eggetarian hain)\n" +
           "• 1 Scoop Whey Protein in water (24g protein)\n" +
           "• Dal, Dahi, aur 2-3 Roti normal ghar ka khana!\n\n" +
           "Aap hamara 'Desi Meal Planner' tool try karein!";
  }

  if (lower.includes('fat') || lower.includes('pet') || lower.includes('weight loss') || lower.includes('motapa') || lower.includes('lose')) {
    return "Fat loss ke liye spot reduction possible nahi hoti. Core principles:\n\n" +
           "1. **Moderate Caloric Deficit:** Maintenance se 350-400 calories kam khayein.\n" +
           "2. **Daily Steps:** 8,000 to 10,000 steps daily.\n" +
           "3. **Progressive Strength Training:** 4 din gym me lifting karein muscle retain karne ke liye.\n\n" +
           "Aap 'Programs' section me 'Fat Loss Protocol' dekh sakte hain!";
  }

  if (lower.includes('fee') || lower.includes('price') || lower.includes('paisa') || lower.includes('kitna') || lower.includes('upi') || lower.includes('cost')) {
    return "Hamare 3 standard coaching tiers hain with 14-day Money-back guarantee:\n\n" +
           "• **Standard Iron:** ₹2,900 / month ($35)\n" +
           "• **All-Access Pro:** ₹5,700 / month ($69)\n" +
           "• **Shivansh Elite 1-on-1:** ₹8,700 / month ($105)\n\n" +
           "Official UPI ID: **9555514847@ptyes**! Payment section me QR code scan kar sakte hain.";
  }

  if (lower.includes('free') || lower.includes('session') || lower.includes('consult') || lower.includes('book') || lower.includes('slot')) {
    return "Aap 1-on-1 Free Consultation book kar sakte hain. Page par **'Book Free Consultation'** button dabayein aur apna name & WhatsApp number fill karein!";
  }

  if (lower.includes('program') || lower.includes('routine') || lower.includes('syllabus')) {
    return "Hamare 4 comprehensive coaching programs hain:\n" +
           "1. 1-on-1 Bespoke Body Recomposition (16 Weeks)\n" +
           "2. Sustainable Fat Loss & Conditioning (12 Weeks)\n" +
           "3. Strength & Powerlifting Fundamentals\n" +
           "4. Desk Worker Posture & Mobility Protocol\n\n" +
           "'Programs' section me 'View Routine & Syllabus' par click karke poora syllabus inspect kar sakte hain!";
  }

  if (lower.includes('shivansh') || lower.includes('coach') || lower.includes('contact') || lower.includes('phone') || lower.includes('whatsapp')) {
    return "Coach Shivansh contact channels:\n\n" +
           "📞 **Direct Phone:** +91 9555514847\n" +
           "💬 **WhatsApp:** Click the WhatsApp button or message on +91 9555514847\n" +
           "📧 **Email:** shivansh983965@gmail.com";
  }

  return "Namaste! Main Shivansh Fitness ka automated FAQ assistant hoon. Aap mujhse training programs, Indian diet outlines, pricing, ya free consultation booking ke baare me pooch sakte hain!";
}

/* ==========================================================================
   10. SECURE FORM HANDLING & CONSULTATION SUBMISSIONS
   ========================================================================== */
function initConsultationAndContactForms() {
  const consultForm = document.getElementById('freeConsultationForm');
  const contactForm = document.getElementById('contactForm');

  function validateIndianMobile(raw) {
    let val = raw.trim().replace(/[\s\-\(\)]/g, '');
    if (val.startsWith('+91')) val = val.substring(3);
    else if (val.startsWith('91') && val.length === 12) val = val.substring(2);
    else if (val.startsWith('0') && val.length === 11) val = val.substring(1);
    return /^[6789]\d{9}$/.test(val) ? '+91 ' + val : false;
  }

  function validateEmailFormat(raw) {
    const val = raw.trim().toLowerCase();
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const dummyDomains = ['test.com', 'example.com', 'fake.com', 'asdf.com'];
    const domain = val.split('@')[1] || '';
    return regex.test(val) && !dummyDomains.includes(domain) && val.length >= 6;
  }

  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('consultName')?.value.trim();
      const email = document.getElementById('consultEmail')?.value.trim();
      const rawPhone = document.getElementById('consultPhone')?.value.trim();
      const goal = document.getElementById('consultGoal')?.value || 'Fitness';
      const consent = document.getElementById('consultConsent')?.checked;

      const nameErr = document.getElementById('consultNameError');
      const emailErr = document.getElementById('consultEmailError');
      const phoneErr = document.getElementById('consultPhoneError');
      const submitBtn = document.getElementById('btnSubmitConsultation');

      let isValid = true;

      if (!name || name.length < 2) {
        if (nameErr) nameErr.style.display = 'block';
        isValid = false;
      } else if (nameErr) nameErr.style.display = 'none';

      if (!validateEmailFormat(email)) {
        if (emailErr) emailErr.style.display = 'block';
        isValid = false;
      } else if (emailErr) emailErr.style.display = 'none';

      const validPhone = validateIndianMobile(rawPhone);
      if (!validPhone) {
        if (phoneErr) phoneErr.style.display = 'block';
        isValid = false;
      } else if (phoneErr) phoneErr.style.display = 'none';

      if (!consent) {
        alert('Please accept the Physical Readiness & Privacy Policy consent.');
        return;
      }

      if (!isValid) return;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i> Submitting...';
      }

      setTimeout(() => {
        const modal = bootstrap.Modal.getInstance(document.getElementById('consultationModal'));
        if (modal) modal.hide();

        const waText = encodeURIComponent(`Hi Shivansh! I would like to book a Free Fitness Consultation.\n\nName: ${name}\nEmail: ${email}\nPhone: ${validPhone}\nGoal: ${goal}`);
        
        showToastNotification(`Thank you, ${name}! Your consultation request is prepared.`);

        // Direct WhatsApp redirection for immediate consultation confirmation
        window.open(`https://wa.me/919555514847?text=${waText}`, '_blank');

        consultForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Submit Consultation Request';
        }
      }, 700);
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactFullName')?.value.trim();
      const email = document.getElementById('contactEmail')?.value.trim();
      const rawPhone = document.getElementById('contactPhone')?.value.trim();
      const topic = document.getElementById('contactTopic')?.value || 'Coaching';
      const message = document.getElementById('contactMessage')?.value.trim();
      const consent = document.getElementById('contactConsent')?.checked;
      const submitBtn = document.getElementById('btnSubmitContact');

      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }

      if (!validateEmailFormat(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      const validPhone = validateIndianMobile(rawPhone) || rawPhone;

      if (!consent) {
        alert('Please agree to the privacy consent.');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i> Sending...';
      }

      setTimeout(() => {
        const waText = encodeURIComponent(`Hi Shivansh! Inquiry from website:\n\nName: ${name}\nEmail: ${email}\nPhone: ${validPhone}\nTopic: ${topic}\nMessage: ${message}`);
        
        showToastNotification(`Inquiry sent! Opening WhatsApp to connect directly.`);
        window.open(`https://wa.me/919555514847?text=${waText}`, '_blank');

        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane me-1"></i> Send Inquiry';
        }
      }, 700);
    });
  }
}

/* ==========================================================================
   11. REAL TRANSFORMATION SLIDER
   ========================================================================== */
function initTransformationSlider() {
  const container = document.getElementById('transformationSlider');
  const handle = document.getElementById('sliderHandle');
  const afterWrapper = document.getElementById('sliderAfterWrapper');
  const afterImg = document.getElementById('sliderAfterImg');

  if (!container || !handle || !afterWrapper) return;

  let isDragging = false;

  function updateSliderPosition(clientX) {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const percentage = (x / rect.width) * 100;
    handle.style.left = `${percentage}%`;
    afterWrapper.style.width = `${percentage}%`;

    if (afterImg) {
      afterImg.style.width = `${rect.width}px`;
    }
  }

  handle.addEventListener('mousedown', () => { isDragging = true; });
  window.addEventListener('mouseup', () => { isDragging = false; });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  });

  handle.addEventListener('touchstart', () => { isDragging = true; }, { passive: true });
  window.addEventListener('touchend', () => { isDragging = false; });
  window.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches[0]) return;
    updateSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (afterImg && container) {
      afterImg.style.width = `${container.getBoundingClientRect().width}px`;
    }
  });

  setTimeout(() => {
    if (afterImg && container) {
      afterImg.style.width = `${container.getBoundingClientRect().width}px`;
    }
  }, 200);
}

/* ==========================================================================
   12. ANIMATED NUMERICAL COUNTERS
   ========================================================================== */
function initStatCounters() {
  const counterElements = document.querySelectorAll('.animate-counter');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseInt(el.getAttribute('data-target'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1800;
        const startTime = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.floor(easeOut * targetVal);

          el.textContent = currentVal + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = targetVal + suffix;
          }
        }

        requestAnimationFrame(updateCount);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counterElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   13. 3D CARD TILT ON MOUSE MOVE
   ========================================================================== */
function init3DCardTilt() {
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const tiltCards = document.querySelectorAll('.tilt-card-luxury');

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s ease';
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
      });
    });
  }
}

/* ==========================================================================
   14. PAYMENT GATEWAY (UPI: 9555514847@ptyes & SECURE ARCHITECTURE)
   ========================================================================== */
let activePlanData = {
  name: 'All-Access Pro Tier',
  usdPrice: 69,
  inrPrice: 5700,
  period: 'Monthly'
};

function initPaymentGateway() {
  const modalEl = document.getElementById('paymentCheckoutModal');
  if (!modalEl) return;

  const triggerButtons = document.querySelectorAll('.trigger-checkout-btn');

  triggerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const planName = btn.getAttribute('data-plan') || 'All-Access Pro Tier';
      const usd = parseInt(btn.getAttribute('data-usd') || '69', 10);
      const inr = parseInt(btn.getAttribute('data-inr') || '5700', 10);

      activePlanData.name = planName;
      activePlanData.usdPrice = usd;
      activePlanData.inrPrice = inr;

      updateCheckoutPriceDisplay();

      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
    });
  });

  const copyUpiBtn = document.getElementById('btnCopyUpiId');
  if (copyUpiBtn) {
    copyUpiBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('9555514847@ptyes').then(() => {
        showToastNotification('UPI ID (9555514847@ptyes) copied to clipboard!');
      });
    });
  }
}

function updateCheckoutPriceDisplay() {
  const planNameDisplay = document.getElementById('checkoutPlanName');
  const planAmountDisplay = document.getElementById('checkoutPlanAmount');
  const qrAmountDisplay = document.getElementById('upiQRAmount');
  const upiLinkDisplay = document.getElementById('directUpiPayLink');
  const waEnrollLink = document.getElementById('btnWhatsAppEnrollment');

  const isINR = window.currentCurrency === 'INR';
  const priceString = isINR ? `₹${activePlanData.inrPrice.toLocaleString()}` : `$${activePlanData.usdPrice}`;

  if (planNameDisplay) planNameDisplay.textContent = activePlanData.name;
  if (planAmountDisplay) planAmountDisplay.textContent = priceString;
  if (qrAmountDisplay) qrAmountDisplay.textContent = `₹${activePlanData.inrPrice.toLocaleString()}`;

  if (upiLinkDisplay) {
    upiLinkDisplay.href = `upi://pay?pa=9555514847@ptyes&pn=Shivansh%20Fitness&am=${activePlanData.inrPrice}&cu=INR&tn=${encodeURIComponent(activePlanData.name)}`;
  }

  if (waEnrollLink) {
    waEnrollLink.href = `https://wa.me/919555514847?text=${encodeURIComponent('Hi Shivansh! I am enrolling in the ' + activePlanData.name + ' (' + priceString + ') coaching program via UPI (9555514847@ptyes).')}`;
  }
}

/* ==========================================================================
   15. CURRENCY SWITCHER (USD / INR)
   ========================================================================== */
window.currentCurrency = 'INR';

function initCurrencySwitcher() {
  const usdBtn = document.getElementById('currUSD');
  const inrBtn = document.getElementById('currINR');
  if (!usdBtn || !inrBtn) return;

  function setCurrency(curr) {
    window.currentCurrency = curr;
    usdBtn.classList.toggle('active', curr === 'USD');
    inrBtn.classList.toggle('active', curr === 'INR');

    const basicEl = document.getElementById('priceBasic');
    const proEl = document.getElementById('pricePro');
    const eliteEl = document.getElementById('priceElite');

    if (curr === 'INR') {
      if (basicEl) basicEl.textContent = '₹2,900';
      if (proEl) proEl.textContent = '₹5,700';
      if (eliteEl) eliteEl.textContent = '₹8,700';
    } else {
      if (basicEl) basicEl.textContent = '$35';
      if (proEl) proEl.textContent = '$69';
      if (eliteEl) eliteEl.textContent = '$105';
    }

    updateCheckoutPriceDisplay();
  }

  usdBtn.addEventListener('click', () => setCurrency('USD'));
  inrBtn.addEventListener('click', () => setCurrency('INR'));

  setCurrency('INR');
}

/* ==========================================================================
   16. MEMBERSHIP PRICING TOGGLE
   ========================================================================== */
function initMembershipPricingToggle() {
  const toggle = document.getElementById('pricingBillingToggle');
  if (!toggle) return;

  toggle.addEventListener('change', () => {
    const isAnnual = toggle.checked;
    const isINR = window.currentCurrency === 'INR';
    const basicPrice = document.getElementById('priceBasic');
    const proPrice = document.getElementById('pricePro');
    const elitePrice = document.getElementById('priceElite');
    const labels = document.querySelectorAll('.billing-period-text');

    if (isAnnual) {
      if (basicPrice) basicPrice.textContent = isINR ? '₹2,450' : '$29';
      if (proPrice) proPrice.textContent = isINR ? '₹4,850' : '$59';
      if (elitePrice) elitePrice.textContent = isINR ? '₹7,400' : '$89';
      labels.forEach(el => el.textContent = '/ mo (billed annually - save 15%)');
    } else {
      if (basicPrice) basicPrice.textContent = isINR ? '₹2,900' : '$35';
      if (proPrice) proPrice.textContent = isINR ? '₹5,700' : '$69';
      if (elitePrice) elitePrice.textContent = isINR ? '₹8,700' : '$105';
      labels.forEach(el => el.textContent = '/ mo (billed monthly)');
    }
  });
}

/* ==========================================================================
   17. COOKIE CONSENT & CLEAR BUTTONS & UTILS
   ========================================================================== */
function initCookieConsent() {
  const banner = document.getElementById('cookieConsentBanner');
  const acceptAllBtn = document.getElementById('acceptAllCookies');
  const rejectOptionalBtn = document.getElementById('rejectOptionalCookies');
  const openPrefBtns = document.querySelectorAll('.open-cookie-preferences');

  const STORAGE_KEY = 'shivansh_fitness_cookie_consent_v3';
  const savedConsent = localStorage.getItem(STORAGE_KEY);

  if (!savedConsent && banner) {
    setTimeout(() => { banner.style.display = 'block'; }, 800);
  }

  function setConsent(settings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...settings, timestamp: new Date().toISOString() }));
    if (banner) banner.style.display = 'none';
    showToastNotification('Preferences saved successfully!');
  }

  if (acceptAllBtn) {
    acceptAllBtn.addEventListener('click', () => {
      setConsent({ necessary: true, functional: true, analytics: true });
    });
  }

  if (rejectOptionalBtn) {
    rejectOptionalBtn.addEventListener('click', () => {
      setConsent({ necessary: true, functional: false, analytics: false });
    });
  }

  openPrefBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (banner) banner.style.display = 'block';
    });
  });
}

function initClearButtons() {
  const clearableGroups = document.querySelectorAll('.input-group-clearable');

  clearableGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const clearBtn = group.querySelector('.input-clear-btn');

    if (!input || !clearBtn) return;

    function toggleClearVisibility() {
      if (input.value && input.value.trim().length > 0) {
        clearBtn.style.display = 'flex';
      } else {
        clearBtn.style.display = 'none';
      }
    }

    input.addEventListener('input', toggleClearVisibility);
    input.addEventListener('focus', toggleClearVisibility);

    clearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      input.value = '';
      clearBtn.style.display = 'none';
      input.focus();
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });

    toggleClearVisibility();
  });
}

function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 400 ? 'flex' : 'none';
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function showToastNotification(message) {
  let toast = document.getElementById('accessibleLiveToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'accessibleLiveToast';
    toast.setAttribute('role', 'alert');
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.right = '30px';
    toast.style.backgroundColor = '#10141e';
    toast.style.color = '#ffffff';
    toast.style.border = '2px solid #e61e2a';
    toast.style.padding = '14px 24px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.85)';
    toast.style.zIndex = '999999';
    toast.style.fontFamily = 'sans-serif';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fas fa-check-circle text-danger me-2"></i> ${escapeHtml(message)}`;
  toast.style.display = 'block';
  setTimeout(() => { toast.style.display = 'none'; }, 4500);
}

function escapeHtml(str) {
  return (str || '').replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* ==========================================================================
   PROGRESSIVE WEB APP (PWA) & SERVICE WORKER LIFECYCLE
   ========================================================================== */
let deferredPrompt = null;

function initPWAInstallation() {
  // 1. Register Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          console.log('[PWA] Service Worker registered successfully, scope:', reg.scope);
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker registration failed:', err);
        });
    });
  }

  const topBtn = document.getElementById('pwaInstallTopBtn');
  const navBtn = document.getElementById('pwaInstallNavBtn');
  const modalActionBtn = document.getElementById('btnPwaModalAction');
  const modalActionText = document.getElementById('btnPwaModalText');
  const floatingBanner = document.getElementById('pwaFloatingBanner');
  const bannerInstallBtn = document.getElementById('btnPwaBannerInstall');
  const bannerDismissBtn = document.getElementById('btnPwaBannerDismiss');

  // 2. Intercept BeforeInstallPrompt Event (Android, Chrome, Edge)
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('[PWA] beforeinstallprompt captured');

    // Show floating banner if user hasn't dismissed it in current session
    if (!sessionStorage.getItem('pwa_banner_dismissed') && floatingBanner) {
      setTimeout(() => {
        floatingBanner.style.display = 'block';
      }, 3000);
    }
  });

  // Handler function for install trigger
  const triggerInstallFlow = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('[PWA] User accepted the install prompt');
          showToastNotification('🎉 Thank you for installing Shivansh Fitness App!');
          if (floatingBanner) floatingBanner.style.display = 'none';
        } else {
          console.log('[PWA] User dismissed the install prompt');
        }
        deferredPrompt = null;
      });
    } else {
      // Fallback: Open the modal instructions (for iOS Safari or manual installation)
      const pwaModalEl = document.getElementById('pwaInstallModal');
      if (pwaModalEl && window.bootstrap && window.bootstrap.Modal) {
        const modal = bootstrap.Modal.getInstance(pwaModalEl) || new bootstrap.Modal(pwaModalEl);
        modal.show();
      }
    }
  };

  // Wire Top & Navbar Buttons
  if (topBtn) topBtn.addEventListener('click', triggerInstallFlow);
  if (navBtn) navBtn.addEventListener('click', triggerInstallFlow);
  if (modalActionBtn) modalActionBtn.addEventListener('click', triggerInstallFlow);
  if (bannerInstallBtn) bannerInstallBtn.addEventListener('click', triggerInstallFlow);

  // Wire Banner Dismiss
  if (bannerDismissBtn && floatingBanner) {
    bannerDismissBtn.addEventListener('click', () => {
      floatingBanner.style.display = 'none';
      sessionStorage.setItem('pwa_banner_dismissed', 'true');
    });
  }

  // 3. Track App Installed Event
  window.addEventListener('appinstalled', () => {
    console.log('[PWA] Shivansh Fitness App was installed');
    deferredPrompt = null;
    if (floatingBanner) floatingBanner.style.display = 'none';
    if (modalActionText) modalActionText.textContent = 'App Already Installed ✓';
    showToastNotification('🚀 Shivansh Fitness App installed to your device!');
  });
}

