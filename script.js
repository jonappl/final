let allergies = [];
let cuisines = [];

const foods = [
  {
    name: "Pizza",
    cuisine: "Italian",
    allergens: ["dairy", "gluten"],
    fact: "Pizza originated in Naples, Italy.",
    nutrition: "Calories: 285 per slice",
    recipe: "Dough + sauce + cheese → bake"
  },
  {
    name: "Tacos",
    cuisine: "Mexican",
    allergens: [],
    fact: "Tacos date back to Mexican silver miners.",
    nutrition: "Calories: ~150 each",
    recipe: "Fill tortilla with meat + toppings"
  },
  {
    name: "Sushi",
    cuisine: "Japanese",
    allergens: ["gluten"],
    fact: "Sushi began as a preservation method.",
    nutrition: "Calories: ~200 per roll",
    recipe: "Rice + fish rolled in seaweed"
  }
];

function goToStep2() {
  allergies = [...document.querySelectorAll('#step1 input:checked')].map(i => i.value);
  document.getElementById('step1').classList.add('hidden');
  document.getElementById('step2').classList.remove('hidden');
}

function goToStep3() {
  cuisines = [...document.querySelectorAll('#step2 input:checked')].map(i => i.value);
  document.getElementById('step2').classList.add('hidden');
  document.getElementById('step3').classList.remove('hidden');
}

function pickFood() {
  const filtered = foods.filter(food =>
    cuisines.includes(food.cuisine) &&
    !food.allergens.some(a => allergies.includes(a))
  );

  if (filtered.length === 0) {
    document.getElementById('foodName').innerText = "No safe options 😬";
    return;
  }

  const choice = filtered[Math.floor(Math.random() * filtered.length)];

  document.getElementById('foodName').innerText = choice.name;
  document.getElementById('fact').innerText = choice.fact;
  document.getElementById('nutrition').innerText = choice.nutrition;
  document.getElementById('recipe').innerText = choice.recipe;
}

function toggleNutrition() {
  document.getElementById('nutrition').classList.toggle('hidden');
}

function toggleRecipe() {
  document.getElementById('recipe').classList.toggle('hidden');
}
