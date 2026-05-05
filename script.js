// ================= STATE =================
let allergies = [];
let cuisines = [];
let vibe = '';

// ================= STEP LABELS =================
const stepLabels = ['Allergies', 'Cuisine', 'Occasion', 'Your meal'];

// ================= LOCAL FALLBACK DATA =================
const meals = [
  {
    name: "Spaghetti Aglio e Olio",
    cuisine: "Italian",
    tags: ["quick", "vegetarian"],
    vibe: ["quick weeknight dinner", "comfort food"],
    avoids: ["dairy"],
    why: "Simple, fast, and comforting with pantry ingredients.",
    fun_fact: "A classic Neapolitan pasta dish.",
    nutrition: "400–500 calories, mostly carbs and healthy fats.",
    recipe: "1. Boil pasta\n2. Heat garlic in olive oil\n3. Toss together\n4. Add chili flakes"
  },
  {
    name: "Chicken Burrito Bowl",
    cuisine: "Mexican",
    tags: ["high protein", "meal prep"],
    vibe: ["meal prep for the week", "healthy and light"],
    avoids: [],
    why: "Balanced and perfect for prepping ahead.",
    fun_fact: "Inspired by burrito deconstructed meals.",
    nutrition: "500–700 calories, high protein.",
    recipe: "1. Cook rice\n2. Grill chicken\n3. Add beans & veggies\n4. Assemble bowl"
  }
];

// ================= CHIP TOGGLE =================
function toggleChip(el, type, single = false) {
  if (single) {
    const parent = el.closest('.chip-grid');
    parent.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    vibe = el.dataset.val;
    return;
  }

  el.classList.toggle('selected');
  const val = el.dataset.val;

  if (type === 'allergy') {
    allergies = allergies.includes(val)
      ? allergies.filter(v => v !== val)
      : [...allergies, val];
  } else if (type === 'cuisine') {
    cuisines = cuisines.includes(val)
      ? cuisines.filter(v => v !== val)
      : [...cuisines, val];
  }
}

// ================= SKIP =================
function skipAllergies() {
  allergies = [];
  goTo(2);
}

// ================= NAVIGATION =================
function goTo(n) {
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  document.getElementById('step' + n).classList.add('active');

  const dots = ['pd1', 'pd2', 'pd3'];
  dots.forEach((id, i) => {
    const dot = document.getElementById(id);
    dot.classList.remove('active', 'done');
    if (i + 1 < n) dot.classList.add('done');
    else if (i + 1 === n) dot.classList.add('active');
  });

  document.getElementById('prog-text').textContent = stepLabels[n - 1] || '';
}

// ================= MAIN ENGINE =================
async function getRecommendation() {
  goTo(4);

  const area = document.getElementById('result-area');
  const actionRow = document.getElementById('action-row');
  actionRow.style.display = 'none';

  area.innerHTML = '<p class="loading-text">Finding your meal...</p>';

  const lb = document.getElementById('lbar');
  lb.style.width = '0';
  setTimeout(() => lb.style.width = '80%', 150);

  try {
    // LIVE INTERNET DATA (no API key needed)
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await res.json();
    const m = data.meals?.[0];

    lb.style.width = '100%';

    if (!m) throw new Error("No meal found");

    area.innerHTML = `
      <div class="result-card">
        <div class="food-name">${m.strMeal}</div>
        <div class="food-tags">
          <span class="tag">${m.strArea}</span>
          <span class="tag">${m.strCategory}</span>
        </div>
        <p class="food-why">A fresh, randomly discovered dish based on real global recipes.</p>
        <p class="food-fact">💡 Tip: Try searching this dish online for variations.</p>
      </div>

      <div class="details-section">
        <div class="details-label">Instructions</div>
        <div class="details-content">${m.strInstructions}</div>
      </div>
    `;

    actionRow.style.display = 'flex';

  } catch (err) {
    console.log("Falling back:", err);

    // OFFLINE FALLBACK
    const food = meals[Math.floor(Math.random() * meals.length)];

    area.innerHTML = `
      <div class="result-card">
        <div class="food-name">${food.name}</div>
        <p class="food-why">${food.why}</p>
        <p class="food-fact">💡 ${food.fun_fact}</p>
      </div>

      <div class="details-section">
        <div class="details-label">Nutrition</div>
        <div class="details-content">${food.nutrition}</div>
      </div>

      <div class="details-section">
        <div class="details-label">How to make it</div>
        <div class="details-content">${food.recipe}</div>
      </div>
    `;

    actionRow.style.display = 'flex';
  }
}