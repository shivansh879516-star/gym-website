/**
 * SHIVANSH FITNESS | LUXURY BESPOKE JAVASCRIPT ENGINE
 * Indian Context, Strict Form Validation, AI Chat Assistant (English & Hinglish),
 * Interactive Programs Syllabus Modal, 1-Rep Max Calculator, Desi Meal Planner,
 * BMI & TDEE Engine, Daily Workout Routines & Rest Interval Timer with Audio Chime,
 * UPI 9555514847@ptyes QR Code & Interactive Transformation Slider
 */

document.addEventListener('DOMContentLoaded', () => {
  initCookieConsent();
  initClearButtons();
  initBMICalculator();
  initMembershipPricingToggle();
  initSearchFilter();
  initStrictIndianFormValidation();
  initBackToTop();
  
  // Luxury Features & Interactive Systems
  initTransformationSlider();
  initStatCounters();
  init3DCardTilt();
  initPaymentGateway();
  initCurrencySwitcher();
  initScrollPopAnimations();
  initAIFitnessChatAssistant();
  
  // Advanced Cool Features
  initProgramFilterAndModal();
  initOneRepMaxCalculator();
  initIndianMealPlanner();
  initWorkoutSplitAndTimer();
  initReviewFilters();
  initWebAudioClickSound();
});

/* ==========================================================================
   1. SCROLL REVEAL "POP" ANIMATIONS (Guaranteed 100% visible)
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
    el.classList.add('revealed'); // Fallback ensure visible
    observer.observe(el);
  });
}

/* ==========================================================================
   2. PROGRAMS FILTER & INTERACTIVE SYLLABUS MODAL
   ========================================================================== */
const PROGRAM_DATABASE = {
  'recomp': {
    title: '1-on-1 Bespoke Body Recomposition & Hypertrophy',
    badge: '1-on-1 Coaching',
    coach: 'Coach Shivansh (CSCS)',
    duration: '16 Weeks',
    frequency: '4-5 Days / Week',
    inr: 8700,
    usd: 105,
    overview: 'Complete physiological overhaul designed to burn stubborn visceral belly fat while packing on dense contractile muscle tissue. Zero starvation, 100% sustainable Indian lifestyle integration.',
    phases: [
      { name: 'Phase 1 (Weeks 1-4): Metabolic Baseline & Form Fix', details: 'Establish baseline caloric maintenance, decompress thoracic/lumbar spine, master intra-abdominal bracing on squats and deadlifts.' },
      { name: 'Phase 2 (Weeks 5-8): Progressive Overload & Deficit', details: 'Introduce 350 kcal deficit with high protein (2.2g/kg). Wave periodization with 4-day Upper/Lower split.' },
      { name: 'Phase 3 (Weeks 9-12): Hypertrophy Density & Peak', details: 'Incorporate mechanical tension dropsets, Romanian deadlifts for posterior chain, and targeted delt/arm cap volume.' },
      { name: 'Phase 4 (Weeks 13-16): Metabolic Finish & Photoshoot Conditioning', details: 'Taper deficit, peak glycogen stores, achieve sub-12% body fat with visible ab vascularity.' }
    ],
    sampleWorkout: [
      'Barbell Squat (Warmup to 3 sets x 6-8 reps @ RPE 8)',
      'Incline Dumbbell Bench Press (3 sets x 8-10 reps)',
      'Chest-Supported T-Bar Row (3 sets x 10-12 reps)',
      'Romanian Deadlift (3 sets x 8-10 reps)',
      'Cable Lateral Raises (4 sets x 15 reps + 1 dropset)'
    ],
    dietCues: '200g Low-fat Paneer / Tofu, 4 Boiled Eggs, 1 Scoop Whey, 2 Phulka Rotis with Dal & Green veggies per meal.'
  },
  'shred': {
    title: 'Desi Shred & Fat Loss Protocol (Belly Fat Special)',
    badge: 'Fat Loss & Conditioning',
    coach: 'Coach Shivansh & Team',
    duration: '12 Weeks',
    frequency: '4 Days / Week',
    inr: 5700,
    usd: 69,
    overview: 'Engineered specifically for Indian body compositions that easily store stubborn abdominal fat. Alternates heavy compound lifting with non-taxing low-impact cardio.',
    phases: [
      { name: 'Phase 1: Calorie Audit & NEAT Boost', details: 'Fix daily non-exercise physical activity to 10,000 steps. Eliminate hidden cooking oil calories.' },
      { name: 'Phase 2: High Density Sled & Complex Intervals', details: 'Full body barbell complexes paired with 60-yard turf sled pushes to elevate VO2 max and EPOC.' },
      { name: 'Phase 3: Deep Fat Oxidation & Abdominal Definition', details: 'Strategic carb cycling around heavy leg days to deplete and refill glycogen without muscle breakdown.' }
    ],
    sampleWorkout: [
      'Trap Bar Deadlift (4 sets x 6 reps)',
      'Overhead Dumbbell Push Press (3 sets x 8 reps)',
      '60-Yard Rogue Sled Push (5 rounds x 45s rest)',
      'Hanging Leg Raises & Ab Wheel Rollouts (4 sets to fatigue)',
      'Zone 2 Incline Treadmill Walk (15 minutes)'
    ],
    dietCues: 'High Protein Soya Pulao, Egg White Bhurji, Dahi + Roasted Makhana for evening snacks. High fiber cucumber/tomato salads.'
  },
  'power': {
    title: 'Heavy Iron Powerlifting & Strength Mastery',
    badge: 'Strength & Power',
    coach: 'Coach Shivansh (CSCS)',
    duration: '12-24 Weeks',
    frequency: '4 Days / Week',
    inr: 5700,
    usd: 69,
    overview: 'Scientifically periodized strength system using RPE (Rate of Perceived Exertion) and percentage velocity. Build a 200+ kg deadlift and competition-standard squat.',
    phases: [
      { name: 'Phase 1: Hypertrophy & Work Capacity', details: 'Higher volume (8-10 reps) on competition lift variations (pause squats, spoto press, deficit pulls).' },
      { name: 'Phase 2: Strength Accumulation', details: 'Transition into heavy working sets (3-5 reps @ 80-88% 1RM). Heavy CNS adaptation.' },
      { name: 'Phase 3: Peaking & PR Test Day', details: 'Taper volume, heavy singles @ 92-98% 1RM, prepare for PR celebration night.' }
    ],
    sampleWorkout: [
      'Competition Back Squat (4 sets x 3 reps @ 85% 1RM)',
      'Pause Bench Press (2-second count) (4 sets x 4 reps)',
      'Deficit Deadlift (3 sets x 5 reps)',
      'Weighted Dips & Pull-ups (3 sets x 8 reps)'
    ],
    dietCues: 'High complex carbs (Brown rice, sweet potatoes, oats) to sustain heavy CNS recovery.'
  },
  'mobility': {
    title: 'Desk Worker Mobility, Posture & Lumbar Rehab',
    badge: 'Joint Health & Rehab',
    coach: 'Coach Shivansh & Physio Team',
    duration: 'Ongoing',
    frequency: '3 Days / Week',
    inr: 2900,
    usd: 35,
    overview: 'Designed for IT software professionals, founders, and office executives experiencing chronic lower back pain, forward head posture, and tight hip flexors.',
    phases: [
      { name: 'Phase 1: Spinal Decompression & Glute Activation', details: 'Decompress lumbar discs with dead hangs, cat-cow flow, and band-resisted glute bridges.' },
      { name: 'Phase 2: Thoracic Extension & Rotator Cuff Health', details: 'Face pulls, prone Y-T-W raises, and deep diaphragmatic intra-abdominal pressure training.' },
      { name: 'Phase 3: Functional Strength & Movement Literacy', details: 'Goblet squats, suitcase carries, and single-leg Romanian deadlifts.' }
    ],
    sampleWorkout: [
      'Dead Hang on Pull-up Bar (3 rounds x 45 seconds)',
      'Couch Stretch for Hip Flexors (2 minutes each side)',
      'Kettlebell Goblet Squat (3 sets x 12 reps with 3-sec pause)',
      'Heavy Dumbbell Suitcase Carry (4 laps x 30 yards)'
    ],
    dietCues: 'Anti-inflammatory focus: Turmeric golden milk, omega-3 seeds (flax/chia), lots of water hydration.'
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

  // Modal view buttons
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
   3. INTERACTIVE 1-REP MAX (1RM) STRENGTH CALCULATOR
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

    // Average of Brzycki and Epley formulas
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
      cue = `For Barbell Squat: Maintain intra-abdominal pressure, spread the floor with your feet, and train at ${Math.round(oneRepMax * 0.80)} kg for sets of 5 reps to build explosive legs.`;
    } else if (lift === 'bench') {
      cue = `For Bench Press: Tuck your shoulder blades back into the bench, maintain leg drive, and use ${Math.round(oneRepMax * 0.75)} kg for 8-rep hypertrophy sets.`;
    } else if (lift === 'deadlift') {
      cue = `For Deadlift: Engage your lats by bending the bar around your shins, push through the floor, and avoid hitching at lockout. 85% load (${Math.round(oneRepMax * 0.85)} kg) is optimal for back thickness.`;
    } else {
      cue = `For Overhead Press: Squeeze your glutes and quads tight to form a solid base, press straight over the ears.`;
    }

    if (coachCue) {
      coachCue.innerHTML = `<strong class="text-warning"><i class="fas fa-lightbulb me-1"></i> Coach Shivansh's Cue:</strong> ${cue}`;
    }
  });
}

/* ==========================================================================
   4. INTERACTIVE INDIAN MACRO & MEAL PLANNER
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
        { time: '09:00 PM (Dinner)', item: 'Tofu/Paneer Stir-fry with Broccoli & Capsicum + 1 Phulka Roti', macro: '26g Protein • 25g Carbs' }
      ];
    } else if (dietType === 'eggetarian') {
      protein = Math.round(calorieTarget * 0.32 / 4);
      carbs = Math.round(calorieTarget * 0.43 / 4);
      fats = Math.round(calorieTarget * 0.25 / 9);

      meals = [
        { time: '08:00 AM (Breakfast)', item: '4 Whole Boiled Eggs (or 2 whole + 4 whites bhurji) + 2 Brown Bread Slices', macro: '32g Protein • 30g Carbs' },
        { time: '11:30 AM (Mid-Morning)', item: '1 Bowl Dahi + 1 Apple or Papaya slices', macro: '10g Protein • 26g Carbs' },
        { time: '01:30 PM (Lunch)', item: 'Paneer Curry (150g) + Yellow Moong Dal + 2 Multigrain Rotis + Cucumber', macro: '35g Protein • 55g Carbs' },
        { time: '05:00 PM (Pre-Workout)', item: '1 Banana + 1 Spoon Peanut Butter + Black Coffee', macro: '6g Protein • 32g Carbs' },
        { time: '07:30 PM (Post-Workout)', item: '1 Scoop Whey Isolate + 2 Egg Whites', macro: '32g Protein • 1g Carbs' },
        { time: '09:00 PM (Dinner)', item: 'Egg Curry (3 eggs) + 1 Phulka Roti + Mixed Green Sabzi', macro: '22g Protein • 22g Carbs' }
      ];
    } else {
      // Non-Veg
      protein = Math.round(calorieTarget * 0.35 / 4);
      carbs = Math.round(calorieTarget * 0.40 / 4);
      fats = Math.round(calorieTarget * 0.25 / 9);

      meals = [
        { time: '08:00 AM (Breakfast)', item: '4 Egg Whites + 2 Whole Eggs Scramble + 2 Toast / 1 Paratha (light ghee)', macro: '34g Protein • 32g Carbs' },
        { time: '11:30 AM (Mid-Morning)', item: '1 Glass Chhaas (Buttermilk) + 30g Roasted Chana', macro: '12g Protein • 20g Carbs' },
        { time: '01:30 PM (Lunch)', item: '180g Grilled Chicken Breast / Fish Curry + 1 Bowl Rice + Dal + Salad', macro: '46g Protein • 50g Carbs' },
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
   5. INTERACTIVE BMI & TDEE CALORIC ENGINE
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
      roadmapText = `For lean bulking, aim for a surplus of <strong>~${tdee + 350} kcal/day</strong> with <strong>${Math.round(w * 2.2)}g protein</strong>. Focus on progressive overload on Squats and Deadlifts.`;
    } else if (bmi >= 18.5 && bmi < 25) {
      cat = 'Optimal Athletic Range';
      col = 'bg-success';
      roadmapText = `You are in the optimal health zone! To build dense muscle and drop visceral fat, maintain <strong>~${tdee - 200} kcal/day</strong> with <strong>${Math.round(w * 2.0)}g protein</strong>.`;
    } else if (bmi >= 25 && bmi < 30) {
      cat = 'Overweight / Central Fat';
      col = 'bg-warning text-dark';
      roadmapText = `Target a moderate caloric deficit of <strong>~${tdee - 450} kcal/day</strong> with <strong>${Math.round(w * 2.2)}g protein</strong>. Add 10,000 daily steps and 4 resistance sessions weekly.`;
    } else {
      cat = 'Obese Range';
      col = 'bg-danger';
      roadmapText = `Focus on structured fat loss with a <strong>~${tdee - 600} kcal/day</strong> deficit under Coach Shivansh's supervision. Low-impact cardio and joint-friendly lifting.`;
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
   6. DAILY WORKOUT ROUTINES & REST INTERVAL TIMER WITH AUDIO CHIME
   ========================================================================== */
const WORKOUT_ROUTINES_DATA = {
  'push': {
    title: 'Push Day: Chest, Anterior Delts & Triceps',
    focus: 'Hypertrophy & Lockout Power',
    exercises: [
      { name: 'Barbell Flat Bench Press', sets: '4 sets x 6-8 reps', rest: '90s', cue: 'Retract scapulae, maintain 45-degree elbow tuck.' },
      { name: 'Incline Dumbbell Press (30° Angle)', sets: '3 sets x 8-10 reps', rest: '60s', cue: 'Deep stretch at the bottom, squeeze upper chest at top.' },
      { name: 'Standing Dumbbell Overhead Press', sets: '3 sets x 8-10 reps', rest: '60s', cue: 'Lock glutes and core, avoid excessive lumbar arch.' },
      { name: 'Cable Lateral Raises', sets: '4 sets x 12-15 reps', rest: '45s', cue: 'Lead with elbows, pause for 1 second at shoulder height.' },
      { name: 'Rope Tricep Pushdowns', sets: '3 sets x 12 reps + 1 dropset', rest: '45s', cue: 'Flare rope outward at full elbow extension.' }
    ]
  },
  'pull': {
    title: 'Pull Day: Back Thickness, Lats & Biceps',
    focus: 'V-Taper & Posterior Chain Integrity',
    exercises: [
      { name: 'Conventional / Sumo Deadlift', sets: '4 sets x 5 reps', rest: '120s', cue: 'Pull slack out of barbell, drive through heels.' },
      { name: 'Weighted Pull-ups / Neutral Lat Pulldown', sets: '4 sets x 8 reps', rest: '75s', cue: 'Drive elbows down into back pockets.' },
      { name: 'Chest-Supported T-Bar Row', sets: '3 sets x 10 reps', rest: '60s', cue: 'Hold peak contraction for 1 second to build upper back.' },
      { name: 'Face Pulls with External Rotation', sets: '4 sets x 15 reps', rest: '45s', cue: 'Pull towards forehead, rotate thumbs backward.' },
      { name: 'Incline Dumbbell Bicep Curls', sets: '3 sets x 10-12 reps', rest: '45s', cue: 'Full biceps long-head stretch on 45° incline bench.' }
    ]
  },
  'legs': {
    title: 'Legs & Core: Quads, Hamstrings & Abdominals',
    focus: 'Lower Body Athletic Power & Knee Health',
    exercises: [
      { name: 'Barbell Back Squat', sets: '4 sets x 6 reps', rest: '120s', cue: 'Screw feet into ground, hit parallel depth with tight core.' },
      { name: 'Romanian Deadlift (Dumbbell or Barbell)', sets: '3 sets x 8-10 reps', rest: '90s', cue: 'Hinge back with hips until hamstrings are fully loaded.' },
      { name: 'Bulgarian Split Squats', sets: '3 sets x 10 reps/leg', rest: '60s', cue: 'Torso slightly forward to bias glutes and quads.' },
      { name: 'Seated / Lying Hamstring Curls', sets: '3 sets x 12 reps', rest: '45s', cue: 'Slow 3-second eccentric lower on every rep.' },
      { name: 'Hanging Leg Raises & Ab Wheel', sets: '4 sets x 12-15 reps', rest: '45s', cue: 'Curl pelvis upward, do not use swinging momentum.' }
    ]
  },
  'mobility': {
    title: 'Desk Worker Posture & Lumbar Flow',
    focus: 'Spinal Decompression & Rotator Cuff Health',
    exercises: [
      { name: 'Dead Hang on Pull-up Bar', sets: '3 sets x 45-60 seconds', rest: '45s', cue: 'Relax lats and breathe deeply into lower abdomen.' },
      { name: 'Couch Stretch for Tight Hip Flexors', sets: '2 sets x 90 sec/side', rest: '30s', cue: 'Squeeze glute on back leg to release hip flexor.' },
      { name: 'Thoracic Extension on Foam Roller', sets: '3 sets x 10 extensions', rest: '30s', cue: 'Keep ribs tucked, extend upper thoracic vertebrae.' },
      { name: 'Band-Resisted Glute Bridges', sets: '3 sets x 15 reps', rest: '30s', cue: 'Hold 2-sec lockout to wake up dormant desk glutes.' }
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
        <span class="badge bg-danger px-3 py-1">Coach Curated</span>
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

      <a href="https://wa.me/919555514847?text=${encodeURIComponent('Hi Shivansh! I want form check feedback for the ' + data.title + ' routine.')}" target="_blank" class="btn btn-sm btn-outline-success text-white border-success w-100">
        <i class="fab fa-whatsapp text-success me-1"></i> Get Form Check Review on WhatsApp (+91 9555514847)
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

  // Rest Timer Engine
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
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5

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
            showToastNotification('Rest complete! Time for your next working set!');
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
    } catch (e) {
      // Audio not permitted
    }
  }

  document.querySelectorAll('.btn-primary-custom, .btn-secondary-custom, .trigger-checkout-btn, .quick-chip, .ai-assistant-toggle-btn').forEach(btn => {
    btn.addEventListener('click', playClickSound);
  });

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggleBtn.innerHTML = soundEnabled ? '<i class="fas fa-volume-up"></i> Sound: ON' : '<i class="fas fa-volume-mute"></i> Sound: OFF';
      showToastNotification(soundEnabled ? 'Tactile sound effects enabled.' : 'Sound effects muted.');
    });
  }
}

/* ==========================================================================
   9. AI FITNESS CHAT ASSISTANT (ENGLISH & HINGLISH)
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
    indicator.innerHTML = '<i class="fas fa-circle-notch fa-spin me-1"></i> Shivansh AI is typing...';
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
    return "Bhai, desi Indian diet me protein aur clean calories balance karna easy hai! \n\n" +
           "**Best Sources:**\n" +
           "• 200g Low-fat Paneer / Tofu (35g protein)\n" +
           "• 50g Soya Chunks (26g protein)\n" +
           "• 4-5 Boiled Eggs (agar eggetarian hain)\n" +
           "• 1 Scoop Whey Protein in water (24g protein)\n" +
           "• Dal, Dahi, aur 2-3 Roti normal ghar ka khana!\n\n" +
           "Aap hamara 'Desi Meal Planner' tool try karein directly page par!";
  }

  if (lower.includes('fat') || lower.includes('pet') || lower.includes('weight loss') || lower.includes('motapa') || lower.includes('lose')) {
    return "Pet ka fat (belly fat) kam karne ke liye spot reduction possible nahi hoti. Simple aur proven rule:\n\n" +
           "1. **Caloric Deficit:** Maintenance se 350-400 calories kam khayein.\n" +
           "2. **Daily Steps:** 8,000 to 10,000 steps roz chaliye.\n" +
           "3. **Heavy Strength Training:** 4 din gym me lifting karein taaki muscle retain ho.\n\n" +
           "Aap 'Programs' section me 'Desi Shred' protocol dekhiye!";
  }

  if (lower.includes('fee') || lower.includes('price') || lower.includes('paisa') || lower.includes('kitna') || lower.includes('upi') || lower.includes('cost')) {
    return "Hamare 3 standard plans hain with 14-day Money-back guarantee:\n\n" +
           "• **Standard Iron:** ₹2,900 / month ($35)\n" +
           "• **All-Access Pro:** ₹5,700 / month ($69) [Most Popular]\n" +
           "• **Shivansh Elite 1-on-1:** ₹8,700 / month ($105)\n\n" +
           "Official UPI ID: **9555514847@ptyes**! Payment section me QR code scan kar sakte hain.";
  }

  if (lower.includes('free') || lower.includes('session') || lower.includes('trial') || lower.includes('book') || lower.includes('slot')) {
    return "Haan bilkul! Aap 1-Day VIP Trial Pass free me claim kar sakte hain. Page par **'Book a Free Session'** button dabayein, apna valid Indian mobile number aur Date of Birth bhariye. Pass seedha WhatsApp aur email par confirm ho jayega!";
  }

  if (lower.includes('program') || lower.includes('routine') || lower.includes('syllabus') || lower.includes('course')) {
    return "Hamare 4 comprehensive programs hain:\n" +
           "1. 1-on-1 Bespoke Body Recomposition (16 Weeks)\n" +
           "2. Desi Shred & Fat Loss Protocol (12 Weeks)\n" +
           "3. Heavy Iron Powerlifting (Squat, Bench, Deadlift)\n" +
           "4. Desk Worker Mobility & Posture Rehab\n\n" +
           "Page par 'Programs' tab me jakar 'View Routine & Syllabus' button dabayein!";
  }

  if (lower.includes('shivansh') || lower.includes('coach') || lower.includes('contact') || lower.includes('number') || lower.includes('phone') || lower.includes('whatsapp')) {
    return "Aap Coach Shivansh se directly WhatsApp ya phone par connect kar sakte hain:\n\n" +
           "📞 **Direct Phone:** +91 9555514847\n" +
           "💬 **WhatsApp:** Click the WhatsApp link or message on +91 9555514847\n" +
           "📧 **Email:** shivansh983965@gmail.com";
  }

  return "Namaste! Main Coach Shivansh ka AI Fitness Assistant hoon. Aap mujhse diet tips, workout schedule, membership fees, ya personal training ke baare me kuch bhi pooch sakte hain (in English or Hinglish)!";
}

/* ==========================================================================
   10. STRICT INDIAN FORM VALIDATION
   ========================================================================== */
function initStrictIndianFormValidation() {
  const trialForm = document.getElementById('freeTrialForm');
  if (!trialForm) return;

  const nameInput = document.getElementById('trialName');
  const emailInput = document.getElementById('trialEmail');
  const phoneInput = document.getElementById('trialPhone');
  const dobInput = document.getElementById('trialDOB');
  const visitDateInput = document.getElementById('trialDate');
  const termsCheckbox = document.getElementById('termsConsent');
  const healthCheckbox = document.getElementById('healthConsent');

  if (dobInput) {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate()).toISOString().split('T')[0];
    const minDate = new Date(today.getFullYear() - 75, today.getMonth(), today.getDate()).toISOString().split('T')[0];
    dobInput.setAttribute('max', maxDate);
    dobInput.setAttribute('min', minDate);
  }

  if (visitDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const maxVisit = new Date();
    maxVisit.setDate(maxVisit.getDate() + 30);
    visitDateInput.setAttribute('min', tomorrow.toISOString().split('T')[0]);
    visitDateInput.setAttribute('max', maxVisit.toISOString().split('T')[0]);
  }

  function validateName() {
    const val = nameInput.value.trim();
    const regex = /^[A-Za-z]{2,}(\s+[A-Za-z]{2,})+$/;
    const errEl = document.getElementById('nameError');
    if (!regex.test(val)) {
      nameInput.classList.add('is-invalid');
      nameInput.classList.remove('is-valid');
      if (errEl) errEl.textContent = 'Please enter your real full name (first & last name, letters only).';
      return false;
    } else {
      nameInput.classList.remove('is-invalid');
      nameInput.classList.add('is-valid');
      return true;
    }
  }

  function validateEmail() {
    const val = emailInput.value.trim().toLowerCase();
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const errEl = document.getElementById('emailError');
    const dummyDomains = ['test.com', 'example.com', 'fake.com', 'asdf.com', 'sample.com'];
    const domain = val.split('@')[1] || '';

    if (!regex.test(val) || dummyDomains.includes(domain) || val.length < 6) {
      emailInput.classList.add('is-invalid');
      emailInput.classList.remove('is-valid');
      if (errEl) errEl.textContent = 'Please enter a genuine email address (e.g. name@gmail.com).';
      return false;
    } else {
      emailInput.classList.remove('is-invalid');
      emailInput.classList.add('is-valid');
      return true;
    }
  }

  function validateIndianPhone() {
    let val = phoneInput.value.trim().replace(/[\s\-\(\)]/g, '');
    if (val.startsWith('+91')) val = val.substring(3);
    else if (val.startsWith('91') && val.length === 12) val = val.substring(2);
    else if (val.startsWith('0') && val.length === 11) val = val.substring(1);

    const regex = /^[6789]\d{9}$/;
    const errEl = document.getElementById('phoneError');

    if (!regex.test(val)) {
      phoneInput.classList.add('is-invalid');
      phoneInput.classList.remove('is-valid');
      if (errEl) errEl.textContent = 'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9 (e.g. 9555514847).';
      return false;
    } else {
      phoneInput.classList.remove('is-invalid');
      phoneInput.classList.add('is-valid');
      phoneInput.value = '+91 ' + val;
      return true;
    }
  }

  function validateDOB() {
    const val = dobInput.value;
    const errEl = document.getElementById('dobError');
    if (!val) {
      dobInput.classList.add('is-invalid');
      dobInput.classList.remove('is-valid');
      if (errEl) errEl.textContent = 'Date of birth is required for PAR-Q safety.';
      return false;
    }

    const birthDate = new Date(val);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 16) {
      dobInput.classList.add('is-invalid');
      dobInput.classList.remove('is-valid');
      if (errEl) errEl.textContent = 'Athletes must be at least 16 years of age to enroll in resistance training.';
      return false;
    } else if (age > 75) {
      dobInput.classList.add('is-invalid');
      dobInput.classList.remove('is-valid');
      if (errEl) errEl.textContent = 'Please enter a valid date of birth (maximum 75 years).';
      return false;
    } else {
      dobInput.classList.remove('is-invalid');
      dobInput.classList.add('is-valid');
      return true;
    }
  }

  function validateVisitDate() {
    const val = visitDateInput.value;
    const errEl = document.getElementById('visitDateError');
    if (!val) {
      visitDateInput.classList.add('is-invalid');
      visitDateInput.classList.remove('is-valid');
      if (errEl) errEl.textContent = 'Please select a visit date.';
      return false;
    }

    const selected = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selected <= today) {
      visitDateInput.classList.add('is-invalid');
      visitDateInput.classList.remove('is-valid');
      if (errEl) errEl.textContent = 'Visit date must be from tomorrow onward.';
      return false;
    } else {
      visitDateInput.classList.remove('is-invalid');
      visitDateInput.classList.add('is-valid');
      return true;
    }
  }

  if (nameInput) nameInput.addEventListener('blur', validateName);
  if (emailInput) emailInput.addEventListener('blur', validateEmail);
  if (phoneInput) phoneInput.addEventListener('blur', validateIndianPhone);
  if (dobInput) dobInput.addEventListener('change', validateDOB);
  if (visitDateInput) visitDateInput.addEventListener('change', validateVisitDate);

  trialForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validateIndianPhone();
    const isDobValid = validateDOB();
    const isDateValid = validateVisitDate();

    if (!termsCheckbox.checked || !healthCheckbox.checked) {
      alert('Please check both the PAR-Q Health Clearance and Terms & Conditions checkboxes to proceed.');
      return;
    }

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isDobValid || !isDateValid) {
      showToastNotification('Please correct the highlighted fields with genuine Indian details before submitting.');
      return;
    }

    const name = nameInput.value.trim();
    const passCode = 'SHIV-PASS-' + Math.floor(100000 + Math.random() * 900000);

    const modal = bootstrap.Modal.getInstance(document.getElementById('trialPassModal'));
    if (modal) modal.hide();

    showToastNotification(`Namaste ${name}! VIP Pass (${passCode}) issued. Confirmation sent to your WhatsApp (+91 9555514847).`);

    trialForm.reset();
    trialForm.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
    initClearButtons();
  });
}

/* ==========================================================================
   11. REAL BODY RECOMPOSITION SLIDER (INDIAN TRANSFORMATION)
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
   14. PAYMENT GATEWAY (UPI: 9555514847@ptyes & QR CODE)
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

  const tabs = document.querySelectorAll('.payment-tab-btn');
  const contents = document.querySelectorAll('.payment-tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.add('d-none'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.remove('d-none');
    });
  });

  const cardInput = document.getElementById('payCardNumber');
  const previewNumber = document.getElementById('previewCardNumber');
  if (cardInput && previewNumber) {
    cardInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').substring(0, 16);
      let formatted = v.match(/.{1,4}/g)?.join(' ') || '';
      e.target.value = formatted;
      previewNumber.textContent = formatted || '•••• •••• •••• ••••';
    });
  }

  const expInput = document.getElementById('payCardExpiry');
  const previewExpiry = document.getElementById('previewCardExpiry');
  if (expInput && previewExpiry) {
    expInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').substring(0, 4);
      if (v.length >= 2) v = v.substring(0, 2) + '/' + v.substring(2);
      e.target.value = v;
      previewExpiry.textContent = v || 'MM/YY';
    });
  }

  const nameInput = document.getElementById('payCardName');
  const previewName = document.getElementById('previewCardName');
  if (nameInput && previewName) {
    nameInput.addEventListener('input', (e) => {
      previewName.textContent = e.target.value.toUpperCase() || 'YOUR NAME';
    });
  }

  const cardForm = document.getElementById('simulatedCardPaymentForm');
  if (cardForm) {
    cardForm.addEventListener('submit', (e) => {
      e.preventDefault();
      processSimulatedTransaction('Card Payment (Stripe / Razorpay)');
    });
  }

  const upiVerifyBtn = document.getElementById('btnVerifyUpiPayment');
  if (upiVerifyBtn) {
    upiVerifyBtn.addEventListener('click', () => {
      const utr = document.getElementById('upiTransactionId')?.value;
      if (!utr || utr.trim().length < 6) {
        alert('Please enter your 12-digit UPI / UTR Reference number to verify payment.');
        return;
      }
      processSimulatedTransaction(`UPI Transfer (Ref: ${utr})`);
    });
  }

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

  const isINR = window.currentCurrency === 'INR';
  const priceString = isINR ? `₹${activePlanData.inrPrice.toLocaleString()}` : `$${activePlanData.usdPrice}`;

  if (planNameDisplay) planNameDisplay.textContent = activePlanData.name;
  if (planAmountDisplay) planAmountDisplay.textContent = priceString;
  if (qrAmountDisplay) qrAmountDisplay.textContent = `₹${activePlanData.inrPrice.toLocaleString()}`;

  if (upiLinkDisplay) {
    upiLinkDisplay.href = `upi://pay?pa=9555514847@ptyes&pn=Shivansh%20Fitness&am=${activePlanData.inrPrice}&cu=INR&tn=${encodeURIComponent(activePlanData.name)}`;
  }
}

function processSimulatedTransaction(method) {
  const modalEl = document.getElementById('paymentCheckoutModal');
  const bModal = bootstrap.Modal.getInstance(modalEl);
  if (bModal) bModal.hide();

  const receiptId = 'SHIV-TXN-' + Math.floor(100000 + Math.random() * 900000);
  const dateStr = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });

  document.getElementById('receiptTxnId').textContent = receiptId;
  document.getElementById('receiptPlanName').textContent = activePlanData.name;
  document.getElementById('receiptMethod').textContent = method;
  document.getElementById('receiptDate').textContent = dateStr;
  document.getElementById('receiptTotal').textContent = window.currentCurrency === 'INR' ? `₹${activePlanData.inrPrice.toLocaleString()}` : `$${activePlanData.usdPrice}`;

  const receiptModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('paymentReceiptModal'));
  receiptModal.show();

  showToastNotification('Payment confirmed! Digital pass and tax receipt generated.');
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
  const modal = document.getElementById('cookieModal');
  const acceptAllBtn = document.getElementById('acceptAllCookies');
  const rejectOptionalBtn = document.getElementById('rejectOptionalCookies');
  const savePreferencesBtn = document.getElementById('saveCookiePreferences');
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
      setConsent({ necessary: true, functional: true, analytics: true, marketing: true });
    });
  }

  if (rejectOptionalBtn) {
    rejectOptionalBtn.addEventListener('click', () => {
      setConsent({ necessary: true, functional: false, analytics: false, marketing: false });
    });
  }

  if (savePreferencesBtn) {
    savePreferencesBtn.addEventListener('click', () => {
      const functional = document.getElementById('cookieFunctional')?.checked || false;
      const analytics = document.getElementById('cookieAnalytics')?.checked || false;
      const marketing = document.getElementById('cookieMarketing')?.checked || false;
      setConsent({ necessary: true, functional, analytics, marketing });
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      if (bootstrapModal) bootstrapModal.hide();
    });
  }

  openPrefBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) {
        const bModal = bootstrap.Modal.getOrCreateInstance(modal);
        bModal.show();
      }
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

function initSearchFilter() {
  const searchInput = document.getElementById('globalSearchInput');
  const searchResults = document.getElementById('searchResultsContainer');
  if (!searchInput || !searchResults) return;

  const items = [
    { title: 'Training Programs & Routines', desc: 'Inspect full 12-16 week syllabus for Fat Loss, Hypertrophy, & Powerlifting.', link: '#programs' },
    { title: '1-Rep Max (1RM) Calculator', desc: 'Compute your Squat, Bench, and Deadlift training percentages.', link: '#one-rep-max' },
    { title: 'Desi Indian Meal Planner', desc: 'Personalized meal schedule with paneer, dal, eggs, and soya.', link: '#meal-planner' },
    { title: 'BMI & Caloric TDEE Engine', desc: 'Metabolic assessment tool with daily macronutrient breakdown.', link: '#bmi-calculator' },
    { title: 'Workout Routines & Rest Timer', desc: 'Push, Pull, Legs splits with interactive rest interval timer.', link: '#workout-split' },
    { title: 'Real Body Recomposition Results', desc: 'Before/after transformation records with authentic metric logs.', link: '#transformation' },
    { title: 'UPI Payment & QR Code', desc: 'Instant UPI ID: 9555514847@ptyes with scan & pay QR.', link: '#pricing' },
    { title: 'Hinglish & English AI Assistant', desc: 'Chat with our AI bot for quick diet & workout answers.', link: '#' }
  ];

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) {
      searchResults.innerHTML = '<p class="text-white-50 text-center py-4">Type a keyword to search.</p>';
      return;
    }
    const matches = items.filter(it => it.title.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q));
    if (matches.length === 0) {
      searchResults.innerHTML = `<div class="p-3 text-center text-white-50">No results found for "${escapeHtml(q)}".</div>`;
    } else {
      searchResults.innerHTML = matches.map(it => `
        <div class="p-3 mb-2 bg-dark rounded border border-secondary">
          <h6 class="text-white mb-1">${escapeHtml(it.title)}</h6>
          <p class="text-white-50 small mb-1">${escapeHtml(it.desc)}</p>
          <a href="${it.link}" class="btn btn-sm btn-outline-danger" data-bs-dismiss="modal">Open Section</a>
        </div>
      `).join('');
    }
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
    toast.style.backgroundColor = '#121620';
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
