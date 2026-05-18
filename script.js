"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  const allergyOptions = [
    { id: "milk", label: "Milk / dairy" },
    { id: "egg", label: "Egg" },
    { id: "fish", label: "Fish" },
    { id: "shellfish", label: "Shellfish" },
    { id: "tree-nuts", label: "Tree nuts" },
    { id: "peanut", label: "Peanut" },
    { id: "wheat", label: "Wheat" },
    { id: "soy", label: "Soy" },
    { id: "sesame", label: "Sesame" },
    { id: "gluten", label: "Gluten" },
    { id: "corn", label: "Corn" },
    { id: "legumes", label: "Legumes" },
    { id: "nightshade", label: "Nightshades" },
    { id: "sulfites", label: "Sulfites" },
    { id: "red-meat", label: "Red meat" },
    { id: "pork", label: "Pork" }
  ];

  const recipes = [
    {
      id: 1,
      name: "Rainbow Quinoa Power Bowl",
      cuisine: "Mediterranean",
      meal: "lunch",
      diet: ["vegan", "vegetarian", "gluten-free", "dairy-free", "nut-free"],
      time: 25,
      difficulty: "easy",
      calories: 510,
      protein: 17,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1000&q=80",
      description: "A bright bowl with quinoa, roasted chickpeas, cucumber, carrot, herbs, and lemon dressing.",
      ingredients: ["quinoa", "chickpeas", "cucumber", "carrot", "spinach", "olive oil", "lemon", "parsley", "salt", "pepper"],
      allergens: ["legumes"],
      steps: ["Rinse quinoa and cook it with water until fluffy.", "Roast chickpeas with olive oil, salt, and pepper for 15 minutes.", "Chop cucumber, carrot, spinach, and parsley.", "Whisk lemon juice with olive oil and a pinch of salt.", "Layer quinoa, vegetables, chickpeas, and dressing in a bowl."],
      notes: "Contains chickpeas, so avoid if legumes are a problem. For legume-free, replace chickpeas with roasted mushrooms or chicken."
    },
    {
      id: 2,
      name: "Turkey Lettuce Crunch Wraps",
      cuisine: "American",
      meal: "lunch",
      diet: ["high-protein", "low-carb", "gluten-free", "dairy-free", "nut-free"],
      time: 20,
      difficulty: "easy",
      calories: 390,
      protein: 32,
      image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=1000&q=80",
      description: "Crisp lettuce wraps filled with seasoned turkey, cucumber, rice, and herbs.",
      ingredients: ["ground turkey", "romaine lettuce", "rice", "cucumber", "green onion", "garlic", "olive oil", "lime", "salt"],
      allergens: [],
      steps: ["Cook rice or use leftover rice.", "Brown ground turkey in olive oil with garlic and salt.", "Wash lettuce leaves and pat them dry.", "Fill each leaf with rice, turkey, cucumber, and green onion.", "Finish with lime juice and serve immediately."],
      notes: "Naturally free from the major listed allergens if your turkey and rice are plain. Check seasoning labels."
    },
    {
      id: 3,
      name: "Coconut Chickpea Curry",
      cuisine: "Indian",
      meal: "dinner",
      diet: ["vegan", "vegetarian", "gluten-free", "dairy-free", "nut-free"],
      time: 35,
      difficulty: "medium",
      calories: 620,
      protein: 19,
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1000&q=80",
      description: "Warm curry with chickpeas, coconut milk, tomatoes, ginger, and spices.",
      ingredients: ["chickpeas", "coconut milk", "tomato", "onion", "garlic", "ginger", "rice", "turmeric", "cumin", "salt"],
      allergens: ["legumes", "tree-nuts", "nightshade"],
      steps: ["Cook onion, garlic, and ginger until fragrant.", "Add turmeric, cumin, tomato, and chickpeas.", "Pour in coconut milk and simmer for 20 minutes.", "Cook rice separately.", "Serve curry over rice with herbs if desired."],
      notes: "Coconut is listed as tree-nut here to support cautious filtering. Also contains chickpeas and tomato."
    },
    {
      id: 4,
      name: "Salmon Rice Plate",
      cuisine: "Japanese",
      meal: "dinner",
      diet: ["pescatarian", "high-protein", "gluten-free", "dairy-free", "nut-free"],
      time: 30,
      difficulty: "medium",
      calories: 560,
      protein: 38,
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1000&q=80",
      description: "Seared salmon with rice, cucumber, carrots, and a simple ginger-lime finish.",
      ingredients: ["salmon", "rice", "cucumber", "carrot", "ginger", "lime", "salt", "olive oil"],
      allergens: ["fish"],
      steps: ["Cook rice according to package directions.", "Season salmon with salt and a little oil.", "Sear salmon until cooked through and flaky.", "Slice cucumber and carrot.", "Serve salmon over rice with vegetables and lime."],
      notes: "Contains fish. Use plain coconut aminos only if soy is safe for you, or skip sauce completely."
    },
    {
      id: 5,
      name: "Black Bean Taco Bowl",
      cuisine: "Mexican",
      meal: "dinner",
      diet: ["vegan", "vegetarian", "gluten-free", "dairy-free", "nut-free"],
      time: 25,
      difficulty: "easy",
      calories: 540,
      protein: 18,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1000&q=80",
      description: "Rice, black beans, corn, lettuce, salsa, and avocado in a filling taco-style bowl.",
      ingredients: ["rice", "black beans", "corn", "lettuce", "salsa", "avocado", "lime", "cilantro", "salt"],
      allergens: ["legumes", "corn", "nightshade"],
      steps: ["Cook rice and warm black beans.", "Chop lettuce, avocado, and cilantro.", "Layer rice, beans, corn, lettuce, and salsa.", "Top with avocado and lime juice.", "Serve warm or cold."],
      notes: "Contains beans, corn, and salsa with tomato or pepper. Use roasted zucchini instead of beans or corn if needed."
    },
    {
      id: 6,
      name: "Sesame-Free Chicken Stir Bowl",
      cuisine: "Korean",
      meal: "dinner",
      diet: ["high-protein", "dairy-free", "nut-free"],
      time: 30,
      difficulty: "medium",
      calories: 590,
      protein: 42,
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1000&q=80",
      description: "Chicken, rice, cabbage, carrot, and a garlic-ginger sauce without sesame oil.",
      ingredients: ["chicken", "rice", "cabbage", "carrot", "garlic", "ginger", "soy sauce", "rice vinegar", "brown sugar"],
      allergens: ["soy", "wheat", "gluten"],
      steps: ["Cook rice and set it aside.", "Slice chicken and vegetables thinly.", "Cook chicken until browned.", "Add cabbage, carrot, garlic, and ginger.", "Add sauce and serve over rice."],
      notes: "This avoids sesame, but standard soy sauce contains soy and often wheat. Use certified gluten-free tamari if wheat/gluten is avoided, and only if soy is safe."
    },
    {
      id: 7,
      name: "Egg-Free Breakfast Hash",
      cuisine: "American",
      meal: "breakfast",
      diet: ["vegan", "vegetarian", "gluten-free", "dairy-free", "nut-free"],
      time: 28,
      difficulty: "easy",
      calories: 430,
      protein: 9,
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1000&q=80",
      description: "Crispy potatoes with peppers, onions, spinach, and herbs. No eggs needed.",
      ingredients: ["potato", "bell pepper", "onion", "spinach", "olive oil", "paprika", "salt", "pepper"],
      allergens: ["nightshade"],
      steps: ["Dice potatoes and parboil for 6 minutes.", "Cook potatoes in oil until crisp.", "Add onion and bell pepper.", "Fold in spinach until wilted.", "Season and serve hot."],
      notes: "Contains potato and bell pepper, which are nightshades. Use sweet potato and mushrooms for nightshade-free."
    },
    {
      id: 8,
      name: "Berry Oat Breakfast Jar",
      cuisine: "American",
      meal: "breakfast",
      diet: ["vegan", "vegetarian", "dairy-free", "nut-free"],
      time: 10,
      difficulty: "easy",
      calories: 360,
      protein: 10,
      image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=1000&q=80",
      description: "Overnight oats with berries, chia, and oat milk for an easy breakfast.",
      ingredients: ["oats", "oat milk", "chia seeds", "strawberries", "blueberries", "maple syrup", "cinnamon"],
      allergens: ["gluten"],
      steps: ["Add oats, oat milk, chia, maple syrup, and cinnamon to a jar.", "Stir until combined.", "Top with berries.", "Refrigerate overnight or at least 4 hours.", "Eat cold or warm gently."],
      notes: "Use certified gluten-free oats if gluten is avoided. Check oat milk labels for cross-contact."
    },
    {
      id: 9,
      name: "Shrimp Pineapple Rice",
      cuisine: "Thai",
      meal: "dinner",
      diet: ["pescatarian", "high-protein", "dairy-free", "nut-free"],
      time: 30,
      difficulty: "medium",
      calories: 570,
      protein: 34,
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1000&q=80",
      description: "Sweet-savory rice with shrimp, pineapple, peas, and lime.",
      ingredients: ["shrimp", "rice", "pineapple", "peas", "lime", "garlic", "ginger", "soy sauce", "green onion"],
      allergens: ["shellfish", "soy", "wheat", "gluten", "legumes"],
      steps: ["Cook rice and cool it slightly.", "Sauté shrimp with garlic and ginger.", "Add rice, pineapple, and peas.", "Season with soy sauce and lime.", "Top with green onion."],
      notes: "Contains shellfish, soy, wheat/gluten in regular soy sauce, and peas as legumes."
    },
    {
      id: 10,
      name: "Lentil Vegetable Soup",
      cuisine: "Mediterranean",
      meal: "dinner",
      diet: ["vegan", "vegetarian", "gluten-free", "dairy-free", "nut-free"],
      time: 45,
      difficulty: "easy",
      calories: 410,
      protein: 20,
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1000&q=80",
      description: "A filling soup with lentils, carrots, celery, spinach, and herbs.",
      ingredients: ["lentils", "carrot", "celery", "onion", "spinach", "vegetable broth", "olive oil", "thyme", "salt"],
      allergens: ["legumes"],
      steps: ["Sauté onion, carrot, and celery.", "Add lentils, broth, thyme, and salt.", "Simmer until lentils are tender.", "Stir in spinach at the end.", "Serve warm."],
      notes: "Contains lentils, so avoid for legume allergies."
    },
    {
      id: 11,
      name: "Pesto Pasta Primavera",
      cuisine: "Italian",
      meal: "dinner",
      diet: ["vegetarian"],
      time: 25,
      difficulty: "easy",
      calories: 690,
      protein: 21,
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1000&q=80",
      description: "Pasta with basil pesto, vegetables, and parmesan.",
      ingredients: ["pasta", "basil pesto", "parmesan", "zucchini", "peas", "olive oil", "lemon", "salt"],
      allergens: ["wheat", "gluten", "milk", "tree-nuts", "legumes"],
      steps: ["Boil pasta until tender.", "Sauté zucchini and peas.", "Toss pasta with pesto and vegetables.", "Add parmesan and lemon.", "Serve warm."],
      notes: "Traditional pesto usually contains tree nuts and parmesan. Use seed-free herb oil and gluten-free pasta if needed."
    },
    {
      id: 12,
      name: "Chicken Noodle Soup",
      cuisine: "American",
      meal: "dinner",
      diet: ["high-protein"],
      time: 50,
      difficulty: "medium",
      calories: 480,
      protein: 35,
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1000&q=80",
      description: "Classic chicken soup with noodles, carrots, celery, and herbs.",
      ingredients: ["chicken", "wheat noodles", "carrot", "celery", "onion", "chicken broth", "parsley", "salt"],
      allergens: ["wheat", "gluten"],
      steps: ["Cook onion, carrot, and celery until softened.", "Add broth and chicken.", "Simmer until chicken is cooked.", "Add noodles and cook until tender.", "Top with parsley."],
      notes: "Contains wheat noodles. Use rice noodles or gluten-free noodles if wheat/gluten is avoided."
    },
    {
      id: 13,
      name: "Sunflower Butter Apple Toast",
      cuisine: "American",
      meal: "snack",
      diet: ["vegetarian", "dairy-free", "nut-free"],
      time: 8,
      difficulty: "easy",
      calories: 310,
      protein: 8,
      image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1000&q=80",
      description: "Toast with sunflower butter, sliced apple, cinnamon, and honey.",
      ingredients: ["bread", "sunflower butter", "apple", "cinnamon", "honey"],
      allergens: ["wheat", "gluten"],
      steps: ["Toast bread until crisp.", "Spread sunflower butter on top.", "Add thin apple slices.", "Sprinkle cinnamon.", "Drizzle honey if desired."],
      notes: "Uses sunflower butter instead of peanut or tree nuts. Use gluten-free bread if needed."
    },
    {
      id: 14,
      name: "Tofu Veggie Scramble",
      cuisine: "American",
      meal: "breakfast",
      diet: ["vegan", "vegetarian", "dairy-free", "nut-free", "gluten-free"],
      time: 18,
      difficulty: "easy",
      calories: 360,
      protein: 24,
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1000&q=80",
      description: "A plant-based scramble with tofu, spinach, mushrooms, and turmeric.",
      ingredients: ["tofu", "spinach", "mushrooms", "turmeric", "olive oil", "salt", "pepper"],
      allergens: ["soy"],
      steps: ["Crumble tofu into small pieces.", "Cook mushrooms in olive oil.", "Add tofu, turmeric, salt, and pepper.", "Fold in spinach until wilted.", "Serve with fruit or toast."],
      notes: "Contains soy. For soy-free, use chickpea flour only if legumes are safe."
    },
    {
      id: 15,
      name: "Greek Yogurt Berry Parfait",
      cuisine: "Mediterranean",
      meal: "breakfast",
      diet: ["vegetarian", "high-protein", "gluten-free"],
      time: 7,
      difficulty: "easy",
      calories: 330,
      protein: 22,
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1000&q=80",
      description: "Creamy yogurt layered with berries, honey, and seed granola.",
      ingredients: ["greek yogurt", "strawberries", "blueberries", "honey", "pumpkin seeds", "granola"],
      allergens: ["milk", "gluten"],
      steps: ["Add yogurt to a bowl or glass.", "Layer berries over the yogurt.", "Add granola and pumpkin seeds.", "Drizzle honey.", "Serve cold."],
      notes: "Contains dairy. Granola may contain gluten or nuts, so check labels carefully."
    },
    {
      id: 16,
      name: "Roasted Vegetable Flatbread",
      cuisine: "Middle Eastern",
      meal: "lunch",
      diet: ["vegetarian"],
      time: 35,
      difficulty: "medium",
      calories: 520,
      protein: 15,
      image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=1000&q=80",
      description: "Flatbread with roasted vegetables, herbs, and lemon yogurt sauce.",
      ingredients: ["flatbread", "zucchini", "eggplant", "bell pepper", "yogurt", "lemon", "parsley", "olive oil"],
      allergens: ["wheat", "gluten", "milk", "nightshade"],
      steps: ["Roast chopped vegetables with olive oil.", "Warm flatbread.", "Mix yogurt with lemon and parsley.", "Top flatbread with vegetables.", "Drizzle sauce and serve."],
      notes: "Contains wheat, dairy, and nightshades. Use gluten-free flatbread and dairy-free sauce if safe."
    },
    {
      id: 17,
      name: "Beef and Broccoli Rice Bowl",
      cuisine: "Korean",
      meal: "dinner",
      diet: ["high-protein", "dairy-free", "nut-free"],
      time: 32,
      difficulty: "medium",
      calories: 650,
      protein: 45,
      image: "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?w=1000&q=80",
      description: "Tender beef strips with broccoli and rice in a savory sauce.",
      ingredients: ["beef", "broccoli", "rice", "soy sauce", "garlic", "ginger", "brown sugar", "oil"],
      allergens: ["soy", "wheat", "gluten", "red-meat"],
      steps: ["Cook rice.", "Slice beef thinly.", "Sear beef quickly in oil.", "Add broccoli, garlic, ginger, and sauce.", "Serve over rice."],
      notes: "Contains red meat and soy sauce. Use coconut aminos only if coconut is safe and soy is not safe."
    },
    {
      id: 18,
      name: "Cinnamon Pear Rice Pudding",
      cuisine: "American",
      meal: "dessert",
      diet: ["vegetarian", "gluten-free", "nut-free"],
      time: 35,
      difficulty: "easy",
      calories: 390,
      protein: 8,
      image: "https://images.unsplash.com/photo-1488477304112-4944851de03d?w=1000&q=80",
      description: "Warm rice pudding with pear, cinnamon, and milk.",
      ingredients: ["rice", "milk", "pear", "cinnamon", "vanilla", "sugar"],
      allergens: ["milk"],
      steps: ["Cook rice with milk over low heat.", "Stir often until creamy.", "Add diced pear, cinnamon, vanilla, and sugar.", "Simmer until pear softens.", "Serve warm or chilled."],
      notes: "Contains dairy. Use oat milk or rice milk if dairy is avoided, checking labels first."
    },
    {
      id: 19,
      name: "Avocado Egg Rice Bowl",
      cuisine: "Japanese",
      meal: "breakfast",
      diet: ["vegetarian", "gluten-free", "dairy-free", "nut-free"],
      time: 15,
      difficulty: "easy",
      calories: 470,
      protein: 17,
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1000&q=80",
      description: "Rice topped with soft egg, avocado, cucumber, and green onion.",
      ingredients: ["rice", "egg", "avocado", "cucumber", "green onion", "salt", "lime"],
      allergens: ["egg"],
      steps: ["Warm cooked rice.", "Cook egg to your preference.", "Slice avocado and cucumber.", "Place egg and vegetables over rice.", "Finish with lime and salt."],
      notes: "Contains egg. For egg-free, use seasoned beans or tofu only if those are safe."
    },
    {
      id: 20,
      name: "Pumpkin Seed Energy Bites",
      cuisine: "American",
      meal: "snack",
      diet: ["vegan", "vegetarian", "dairy-free", "nut-free"],
      time: 15,
      difficulty: "easy",
      calories: 220,
      protein: 7,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=1000&q=80",
      description: "No-bake snack bites made with oats, pumpkin seeds, dates, and cocoa.",
      ingredients: ["oats", "pumpkin seeds", "dates", "cocoa", "maple syrup", "salt"],
      allergens: ["gluten"],
      steps: ["Blend dates until sticky.", "Add oats, pumpkin seeds, cocoa, maple syrup, and salt.", "Pulse until mixture holds together.", "Roll into small balls.", "Chill before serving."],
      notes: "Use certified gluten-free oats if needed. Pumpkin seeds are not tree nuts, but check facility labeling."
    },
    {
      id: 21,
      name: "Mango Chicken Salad",
      cuisine: "Thai",
      meal: "lunch",
      diet: ["high-protein", "gluten-free", "dairy-free", "nut-free"],
      time: 22,
      difficulty: "easy",
      calories: 430,
      protein: 36,
      image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=1000&q=80",
      description: "Chicken, mango, cucumber, cabbage, herbs, and lime dressing.",
      ingredients: ["chicken", "mango", "cucumber", "cabbage", "mint", "lime", "olive oil", "salt"],
      allergens: [],
      steps: ["Cook or shred chicken.", "Slice mango, cucumber, and cabbage.", "Whisk lime juice with oil and salt.", "Toss chicken and vegetables together.", "Add mint and serve chilled."],
      notes: "Free from the listed major allergens when ingredients are plain. Check packaged chicken seasoning."
    },
    {
      id: 22,
      name: "Tomato Basil Mozzarella Pasta",
      cuisine: "Italian",
      meal: "dinner",
      diet: ["vegetarian"],
      time: 25,
      difficulty: "easy",
      calories: 640,
      protein: 24,
      image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1000&q=80",
      description: "Pasta with tomato, basil, mozzarella, and olive oil.",
      ingredients: ["pasta", "tomato", "mozzarella", "basil", "olive oil", "garlic", "salt"],
      allergens: ["wheat", "gluten", "milk", "nightshade"],
      steps: ["Boil pasta.", "Cook garlic and tomato briefly in olive oil.", "Toss pasta with tomato sauce.", "Add mozzarella and basil.", "Serve warm."],
      notes: "Contains wheat/gluten, dairy, and tomato. Use gluten-free pasta and dairy-free cheese if safe."
    },
    {
      id: 23,
      name: "Simple Rice Congee",
      cuisine: "Japanese",
      meal: "breakfast",
      diet: ["vegan", "vegetarian", "gluten-free", "dairy-free", "nut-free"],
      time: 45,
      difficulty: "easy",
      calories: 280,
      protein: 6,
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1000&q=80",
      description: "Soft rice porridge with ginger, green onion, and simple toppings.",
      ingredients: ["rice", "water", "ginger", "green onion", "salt", "mushrooms"],
      allergens: [],
      steps: ["Rinse rice.", "Simmer rice with water until very soft.", "Add ginger and salt.", "Cook mushrooms separately if using.", "Top with green onion and serve."],
      notes: "Very simple base recipe. Add proteins only if safe."
    },
    {
      id: 24,
      name: "Falafel Plate",
      cuisine: "Middle Eastern",
      meal: "dinner",
      diet: ["vegan", "vegetarian", "dairy-free", "nut-free"],
      time: 55,
      difficulty: "advanced",
      calories: 610,
      protein: 20,
      image: "https://images.unsplash.com/photo-1593001872095-7d5b3868fb1d?w=1000&q=80",
      description: "Crispy chickpea falafel with rice, cucumber, herbs, and lemon sauce.",
      ingredients: ["chickpeas", "rice", "cucumber", "parsley", "garlic", "lemon", "flour", "cumin", "oil"],
      allergens: ["legumes", "wheat", "gluten"],
      steps: ["Blend chickpeas, herbs, garlic, cumin, and flour.", "Shape into small patties.", "Pan-fry until crispy.", "Cook rice and chop cucumber.", "Serve with lemon sauce."],
      notes: "Contains chickpeas and flour. Use chickpea-safe only for legume-tolerant users and gluten-free flour if needed."
    }
  ];

  const sections = $$(".section");
  const navBtns = $$(".nav-btn");
  const recipeGrid = $("#recipeGrid");
  const resultCount = $("#resultCount");
  const emptyState = $("#emptyState");
  const activeFilterTags = $("#activeFilterTags");
  const savedGrid = $("#savedGrid");
  const savedEmpty = $("#savedEmpty");
  const mealPlanGrid = $("#mealPlanGrid");
  const mealPlanEmpty = $("#mealPlanEmpty");
  const allergyChecks = $("#allergyChecks");

  let currentResults = recipes.slice();
  let savedRecipes = [];
  let currentRecipe = null;
  let slideIndex = 0;

  function showSection(id) {
    sections.forEach(section => section.classList.toggle("active", section.id === id));
    navBtns.forEach(button => button.classList.toggle("active", button.dataset.section === id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  $$('[data-section]').forEach(button => {
    button.addEventListener("click", () => showSection(button.dataset.section));
  });

  $("#themeBtn").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    $("#themeBtn").textContent = document.body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
  });

  function buildAllergyChecks() {
    allergyChecks.innerHTML = allergyOptions.map(item => `
      <label class="check">
        <input type="checkbox" value="${item.id}" class="allergy-check">
        <span>${item.label}</span>
      </label>
    `).join("");
  }

  function getFilters() {
    const avoidAllergens = $$(".allergy-check:checked").map(input => input.value);
    const customAvoid = $("#customAvoidInput").value
      .split(",")
      .map(item => item.trim().toLowerCase())
      .filter(Boolean);

    return {
      search: $("#searchInput").value.trim().toLowerCase(),
      avoidAllergens,
      customAvoid,
      diet: $("#dietSelect").value,
      meal: $("#mealSelect").value,
      cuisine: $("#cuisineSelect").value,
      maxTime: Number($("#timeSelect").value),
      difficulty: $("#difficultySelect").value,
      sort: $("#sortSelect").value
    };
  }

  function recipeMatches(recipe, filters) {
    const combinedText = [recipe.name, recipe.description, recipe.cuisine, recipe.meal, ...recipe.ingredients, ...recipe.diet].join(" ").toLowerCase();

    if (filters.search && !combinedText.includes(filters.search)) return false;
    if (filters.diet !== "any" && !recipe.diet.includes(filters.diet)) return false;
    if (filters.meal !== "any" && recipe.meal !== filters.meal) return false;
    if (filters.cuisine !== "any" && recipe.cuisine !== filters.cuisine) return false;
    if (recipe.time > filters.maxTime) return false;
    if (filters.difficulty !== "any" && recipe.difficulty !== filters.difficulty) return false;

    const hasBlockedAllergen = filters.avoidAllergens.some(allergen => recipe.allergens.includes(allergen));
    if (hasBlockedAllergen) return false;

    const hasCustomAvoid = filters.customAvoid.some(avoid => combinedText.includes(avoid));
    if (hasCustomAvoid) return false;

    return true;
  }

  function sortRecipes(list, sort) {
    const copy = list.slice();
    if (sort === "time") copy.sort((a, b) => a.time - b.time);
    if (sort === "protein") copy.sort((a, b) => b.protein - a.protein);
    if (sort === "calories") copy.sort((a, b) => a.calories - b.calories);
    if (sort === "recommended") copy.sort((a, b) => (b.protein / b.time) - (a.protein / a.time));
    return copy;
  }

  function renderFilterTags(filters) {
    const tags = [];
    if (filters.search) tags.push(`Search: ${filters.search}`);
    filters.avoidAllergens.forEach(id => {
      const label = allergyOptions.find(item => item.id === id)?.label || id;
      tags.push(`Avoid: ${label}`);
    });
    filters.customAvoid.forEach(item => tags.push(`Avoid custom: ${item}`));
    if (filters.diet !== "any") tags.push(`Diet: ${filters.diet}`);
    if (filters.meal !== "any") tags.push(`Meal: ${filters.meal}`);
    if (filters.cuisine !== "any") tags.push(`Cuisine: ${filters.cuisine}`);
    if (filters.maxTime !== 999) tags.push(`Under ${filters.maxTime} min`);
    if (filters.difficulty !== "any") tags.push(`Difficulty: ${filters.difficulty}`);

    activeFilterTags.innerHTML = tags.map(tag => `<span class="pill">${escapeHTML(tag)}</span>`).join("");
  }

  function renderRecipes() {
    const filters = getFilters();
    currentResults = sortRecipes(recipes.filter(recipe => recipeMatches(recipe, filters)), filters.sort);

    resultCount.textContent = `${currentResults.length} recipe${currentResults.length === 1 ? "" : "s"} found`;
    renderFilterTags(filters);

    recipeGrid.innerHTML = currentResults.map(recipe => `
      <article class="card recipe-card">
        <img src="${recipe.image}" alt="${escapeHTML(recipe.name)}">
        <div class="recipe-body">
          <div class="recipe-meta">
            <span class="pill safe">${recipe.time} min</span>
            <span class="pill">${recipe.meal}</span>
            <span class="pill">${recipe.cuisine}</span>
          </div>
          <h3>${escapeHTML(recipe.name)}</h3>
          <p class="recipe-desc">${escapeHTML(recipe.description)}</p>
          <div class="recipe-meta">
            <span class="pill">${recipe.protein}g protein</span>
            <span class="pill">${recipe.calories} cal</span>
            <span class="pill warn">${recipe.allergens.length ? recipe.allergens.join(", ") : "no listed allergens"}</span>
          </div>
          <button class="btn full" data-open-recipe="${recipe.id}">View Recipe</button>
        </div>
      </article>
    `).join("");

    emptyState.classList.toggle("hidden", currentResults.length !== 0);

    $$('[data-open-recipe]').forEach(button => {
      button.addEventListener("click", () => openRecipe(Number(button.dataset.openRecipe)));
    });
  }

  function openRecipe(id) {
    const recipe = recipes.find(item => item.id === id);
    if (!recipe) return;
    currentRecipe = recipe;

    $("#modalImg").src = recipe.image;
    $("#modalImg").alt = recipe.name;
    $("#modalTitle").textContent = recipe.name;
    $("#modalDesc").textContent = recipe.description;
    $("#modalSafeTag").textContent = `${recipe.cuisine} • ${recipe.meal}`;

    $("#modalMeta").innerHTML = [
      `${recipe.time} minutes`,
      recipe.difficulty,
      `${recipe.calories} calories`,
      `${recipe.protein}g protein`,
      ...recipe.diet
    ].map(item => `<span class="pill">${escapeHTML(item)}</span>`).join("");

    $("#modalIngredients").innerHTML = recipe.ingredients.map(item => `<li>${escapeHTML(item)}</li>`).join("");
    $("#modalSteps").innerHTML = recipe.steps.map(step => `<li>${escapeHTML(step)}</li>`).join("");
    $("#modalNotes").textContent = recipe.notes;
    $("#modalAllergens").innerHTML = recipe.allergens.length
      ? recipe.allergens.map(item => `<span class="pill warn">${escapeHTML(item)}</span>`).join("")
      : `<span class="pill safe">No listed allergens in this recipe data</span>`;

    $("#recipeModal").classList.remove("hidden");
  }

  function closeModal() {
    $("#recipeModal").classList.add("hidden");
  }

  function saveCurrentRecipe() {
    if (!currentRecipe) return;
    if (!savedRecipes.some(recipe => recipe.id === currentRecipe.id)) {
      savedRecipes.push(currentRecipe);
    }
    renderSaved();
    $("#saveRecipeBtn").textContent = "Saved";
    setTimeout(() => $("#saveRecipeBtn").textContent = "Save Recipe", 1000);
  }

  function renderSaved() {
    savedEmpty.classList.toggle("hidden", savedRecipes.length !== 0);
    savedGrid.innerHTML = savedRecipes.map(recipe => `
      <div class="mini-card card">
        <span class="pill safe">${recipe.time} min</span>
        <h3>${escapeHTML(recipe.name)}</h3>
        <p>${escapeHTML(recipe.description)}</p>
        <div class="actions">
          <button class="btn small-btn" data-open-recipe="${recipe.id}">Open</button>
          <button class="btn danger small-btn" data-remove-saved="${recipe.id}">Remove</button>
        </div>
      </div>
    `).join("");

    $$('[data-remove-saved]').forEach(button => {
      button.addEventListener("click", () => {
        savedRecipes = savedRecipes.filter(recipe => recipe.id !== Number(button.dataset.removeSaved));
        renderSaved();
      });
    });

    savedGrid.querySelectorAll('[data-open-recipe]').forEach(button => {
      button.addEventListener("click", () => openRecipe(Number(button.dataset.openRecipe)));
    });
  }

  function randomFromResults() {
    if (!currentResults.length) return;
    const pick = currentResults[Math.floor(Math.random() * currentResults.length)];
    openRecipe(pick.id);
  }

  function randomHomeRecipe() {
    const pick = recipes[Math.floor(Math.random() * recipes.length)];
    $("#heroRecipeImg").src = pick.image;
    $("#heroRecipeName").textContent = `Featured: ${pick.name}`;
    $("#heroRecipeText").textContent = `${pick.description} Ready in ${pick.time} minutes.`;
    showSection("home");
  }

  function buildMealPlan() {
    const breakfast = currentResults.filter(recipe => recipe.meal === "breakfast");
    const lunch = currentResults.filter(recipe => recipe.meal === "lunch");
    const dinner = currentResults.filter(recipe => recipe.meal === "dinner");

    const plan = [
      { label: "Breakfast", recipe: pickRandom(breakfast) },
      { label: "Lunch", recipe: pickRandom(lunch) },
      { label: "Dinner", recipe: pickRandom(dinner) }
    ].filter(item => item.recipe);

    mealPlanEmpty.classList.toggle("hidden", plan.length !== 0);
    mealPlanGrid.innerHTML = plan.map(item => `
      <div class="mini-card card">
        <span class="pill safe">${item.label}</span>
        <h3>${escapeHTML(item.recipe.name)}</h3>
        <p>${escapeHTML(item.recipe.description)}</p>
        <button class="btn small-btn" data-open-recipe="${item.recipe.id}">Open Recipe</button>
      </div>
    `).join("");

    mealPlanGrid.querySelectorAll('[data-open-recipe]').forEach(button => {
      button.addEventListener("click", () => openRecipe(Number(button.dataset.openRecipe)));
    });

    showSection("tools");
  }

  function pickRandom(list) {
    if (!list.length) return null;
    return list[Math.floor(Math.random() * list.length)];
  }

  function resetFilters() {
    $("#searchInput").value = "";
    $("#customAvoidInput").value = "";
    $("#dietSelect").value = "any";
    $("#mealSelect").value = "any";
    $("#cuisineSelect").value = "any";
    $("#timeSelect").value = "999";
    $("#difficultySelect").value = "any";
    $("#sortSelect").value = "recommended";
    $$(".allergy-check").forEach(input => input.checked = false);
    renderRecipes();
  }

  function escapeHTML(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  const slides = recipes.slice(0, 6);

  function renderSlide() {
    const recipe = slides[slideIndex];
    $("#slideImg").src = recipe.image;
    $("#slideImg").alt = recipe.name;
    $("#slideTitle").textContent = recipe.name;
    $("#slideText").textContent = recipe.description;
  }

  function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    renderSlide();
  }

  function prevSlide() {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    renderSlide();
  }

  function calculateCalories() {
    const name = $("#calorieName").value.trim() || "meal";
    const amount = Math.max(1, Number($("#calorieAmount").value || 1));
    const base = Number($("#calorieType").value);
    const total = amount * base;
    $("#calorieResult").innerHTML = `Estimated total for <strong>${escapeHTML(name)}</strong>: <strong>${total}</strong> calories across ${amount} portion${amount === 1 ? "" : "s"}.`;
    $("#calorieResult").classList.remove("hidden");
  }

  buildAllergyChecks();
  renderRecipes();
  renderSaved();
  renderSlide();

  ["searchInput", "customAvoidInput", "dietSelect", "mealSelect", "cuisineSelect", "timeSelect", "difficultySelect", "sortSelect"].forEach(id => {
    $("#" + id).addEventListener("input", renderRecipes);
    $("#" + id).addEventListener("change", renderRecipes);
  });

  $$(".allergy-check").forEach(input => input.addEventListener("change", renderRecipes));

  $("#toggleFiltersBtn").addEventListener("click", () => {
    const hidden = $("#filtersBody").classList.toggle("hidden");
    $("#toggleFiltersBtn").textContent = hidden ? "Show Filters" : "Hide Filters";
  });

  $("#resetFiltersBtn").addEventListener("click", resetFilters);
  $("#randomBtn").addEventListener("click", randomFromResults);
  $("#surpriseHomeBtn").addEventListener("click", randomHomeRecipe);
  $("#mealPlanBtn").addEventListener("click", buildMealPlan);
  $("#closeModalBtn").addEventListener("click", closeModal);
  $("#recipeModal").addEventListener("click", event => {
    if (event.target.id === "recipeModal") closeModal();
  });
  $("#saveRecipeBtn").addEventListener("click", saveCurrentRecipe);
  $("#printRecipeBtn").addEventListener("click", () => window.print());
  $("#clearSavedBtn").addEventListener("click", () => { savedRecipes = []; renderSaved(); });
  $("#prevSlide").addEventListener("click", prevSlide);
  $("#nextSlide").addEventListener("click", nextSlide);
  $("#calcCaloriesBtn").addEventListener("click", calculateCalories);

  $("#profileForm").addEventListener("submit", event => {
    event.preventDefault();
    const name = $("#profileName").value.trim() || "Guest";
    const goal = $("#profileGoal").value;
    const avoid = $("#profileAvoid").value.trim() || "nothing listed";
    $("#profileResult").innerHTML = `<strong>${escapeHTML(name)}</strong>, your profile is focused on <strong>${escapeHTML(goal)}</strong>. Avoid list: <strong>${escapeHTML(avoid)}</strong>. Use the Recipe Finder filters to match this profile.`;
    $("#profileResult").classList.remove("hidden");
    event.target.reset();
  });
});
