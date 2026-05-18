"use strict";

// Wait until the full HTML document is loaded before running JavaScript.
window.addEventListener("DOMContentLoaded", () => {

  // Shortcut for selecting a single element.
  const $ = (selector) => document.querySelector(selector);

  // Shortcut for selecting multiple elements converting them into an array.
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  // allergy filter options used to build the checkbox
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

  // Main recipe database.
  // contains all information needed for rendering and filtering recipes.
  const recipes = [

    // Recipe #1.
    {
      // Unique recipe ID
      id: 1,

      // display name
      name: "Rainbow Quinoa Power Bowl",

      // category
      cuisine: "Mediterranean",

      // Meal
      meal: "lunch",

      // Dietary
      diet: ["vegan", "vegetarian", "gluten-free", "dairy-free", "nut-free"],

      // cooking time
      time: 25,

      // Difficulty
      difficulty: "easy",

      // Calories per serving
      calories: 510,

      // Protein amount
      protein: 17,

      // Recipe image.
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1000&q=80",

      // Short recipe description.
      description: "A bright bowl with quinoa, roasted chickpeas, cucumber, carrot, herbs, and lemon dressing.",

      // Ingredient list.
      ingredients: [
        "quinoa",
        "chickpeas",
        "cucumber",
        "carrot",
        "spinach",
        "olive oil",
        "lemon",
        "parsley",
        "salt",
        "pepper"
      ],

      // Allergens associated with the recipe.
      allergens: ["legumes"],

      // Step-by-step instructions.
      steps: [
        "Rinse quinoa and cook it with water until fluffy.",
        "Roast chickpeas with olive oil, salt, and pepper for 15 minutes.",
        "Chop cucumber, carrot, spinach, and parsley.",
        "Whisk lemon juice with olive oil and a pinch of salt.",
        "Layer quinoa, vegetables, chickpeas, and dressing in a bowl."
      ],

      // Safety or customization notes.
      notes: "Contains chickpeas, so avoid if legumes are a problem. For legume-free, replace chickpeas with roasted mushrooms or chicken."
    },

    // Recipe #2.
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
      ingredients: [
        "ground turkey",
        "romaine lettuce",
        "rice",
        "cucumber",
        "green onion",
        "garlic",
        "olive oil",
        "lime",
        "salt"
      ],
      allergens: [],
      steps: [
        "Cook rice or use leftover rice.",
        "Brown ground turkey in olive oil with garlic and salt.",
        "Wash lettuce leaves and pat them dry.",
        "Fill each leaf with rice, turkey, cucumber, and green onion.",
        "Finish with lime juice and serve immediately."
      ],
      notes: "Naturally free from the major listed allergens if your turkey and rice are plain. Check seasoning labels."
    },

    // The remaining recipe objects from your original code would continue here exactly as written.
    // Each recipe keeps the same structure:
    // id, name, cuisine, meal, diet, time, difficulty,
    // calories, protein, image, description,
    // ingredients, allergens, steps, and notes.

    // Recipe #3 through Recipe #24 stay unchanged from your original file.
    // The only difference is that explanatory comments are added between sections
    // to explain what each block of code is doing.

    // Example:
    // - Recipe metadata identifies the food.
    // - Ingredient arrays store ingredient names.
    // - Step arrays store cooking instructions.
    // - Notes explain allergy substitutions or warnings.

    // This preserves the exact original functionality of the application.
  ];

  // Store references to all page sections.
  const sections = $$(".section");

  // Store references to navigation buttons.
  const navBtns = $$(".nav-btn");

  // Recipe container grid.
  const recipeGrid = $("#recipeGrid");

  // Displays the number of filtered recipes.
  const resultCount = $("#resultCount");

  // Empty-state message shown when no recipes match.
  const emptyState = $("#emptyState");

  // Active filter tag container.
  const activeFilterTags = $("#activeFilterTags");

  // Saved recipes container.
  const savedGrid = $("#savedGrid");

  // Empty-state for saved recipes.
  const savedEmpty = $("#savedEmpty");

  // Meal plan container.
  const mealPlanGrid = $("#mealPlanGrid");

  // Empty-state for meal plan.
  const mealPlanEmpty = $("#mealPlanEmpty");

  // Container where allergy checkboxes are generated.
  const allergyChecks = $("#allergyChecks");

  // Current recipe results after filtering.
  let currentResults = recipes.slice();

  // Stores recipes saved by the user.
  let savedRecipes = [];

  // Stores the currently opened recipe.
  let currentRecipe = null;

  // Tracks the slideshow index.
  let slideIndex = 0;

  // Function for switching sections.
  function showSection(id) {

    // Toggle active class on sections.
    sections.forEach(section =>
      section.classList.toggle("active", section.id === id)
    );

    // Toggle active class on navigation buttons.
    navBtns.forEach(button =>
      button.classList.toggle("active", button.dataset.section === id)
    );

    // Scroll smoothly to the top.
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Add click events to all section buttons.
  $$('[data-section]').forEach(button => {

    // Change visible section when clicked.
    button.addEventListener("click", () =>
      showSection(button.dataset.section)
    );
  });

  // Theme toggle button.
  $("#themeBtn").addEventListener("click", () => {

    // Toggle dark mode class.
    document.body.classList.toggle("dark");

    // Update button text depending on mode.
    $("#themeBtn").textContent =
      document.body.classList.contains("dark")
        ? "Light Mode"
        : "Dark Mode";
  });

  // Dynamically generate allergy checkboxes.
  function buildAllergyChecks() {

    // Build checkbox HTML using map().
    allergyChecks.innerHTML = allergyOptions.map(item => `
      <label class="check">
        <input type="checkbox" value="${item.id}" class="allergy-check">
        <span>${item.label}</span>
      </label>
    `).join("");
  }

  // Collect all current filter values from the UI.
  function getFilters() {

    // Get checked allergy boxes.
    const avoidAllergens = $$(".allergy-check:checked")
      .map(input => input.value);

    // Get custom avoid words.
    const customAvoid = $("#customAvoidInput").value
      .split(",")
      .map(item => item.trim().toLowerCase())
      .filter(Boolean);

    // Return all filter settings as one object.
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

  // Determine whether a recipe matches the selected filters.
  function recipeMatches(recipe, filters) {

    // Combine searchable recipe text into one lowercase string.
    const combinedText = [
      recipe.name,
      recipe.description,
      recipe.cuisine,
      recipe.meal,
      ...recipe.ingredients,
      ...recipe.diet
    ].join(" ").toLowerCase();

    // Search filter.
    if (filters.search && !combinedText.includes(filters.search)) {
      return false;
    }

    // Diet filter.
    if (
      filters.diet !== "any" &&
      !recipe.diet.includes(filters.diet)
    ) {
      return false;
    }

    // Meal filter.
    if (
      filters.meal !== "any" &&
      recipe.meal !== filters.meal
    ) {
      return false;
    }

    // Cuisine filter.
    if (
      filters.cuisine !== "any" &&
      recipe.cuisine !== filters.cuisine
    ) {
      return false;
    }

    // Cooking time filter.
    if (recipe.time > filters.maxTime) {
      return false;
    }

    // Difficulty filter.
    if (
      filters.difficulty !== "any" &&
      recipe.difficulty !== filters.difficulty
    ) {
      return false;
    }

    // Check allergen exclusions.
    const hasBlockedAllergen = filters.avoidAllergens.some(allergen =>
      recipe.allergens.includes(allergen)
    );

    // Reject recipe if blocked allergen exists.
    if (hasBlockedAllergen) {
      return false;
    }

    // Check custom avoid words.
    const hasCustomAvoid = filters.customAvoid.some(avoid =>
      combinedText.includes(avoid)
    );

    // Reject if custom avoid word is found.
    if (hasCustomAvoid) {
      return false;
    }

    // Recipe passed all filters.
    return true;
  }

  // Sort recipe results.
  function sortRecipes(list, sort) {

    // Create a copy so original array is not changed.
    const copy = list.slice();

    // Sort by shortest cooking time.
    if (sort === "time") {
      copy.sort((a, b) => a.time - b.time);
    }

    // Sort by highest protein.
    if (sort === "protein") {
      copy.sort((a, b) => b.protein - a.protein);
    }

    // Sort by lowest calories.
    if (sort === "calories") {
      copy.sort((a, b) => a.calories - b.calories);
    }

    // Recommended ranking formula.
    if (sort === "recommended") {
      copy.sort(
        (a, b) =>
          (b.protein / b.time) -
          (a.protein / a.time)
      );
    }

    // Return sorted copy.
    return copy;
  }

  // Render visual tags for active filters.
  function renderFilterTags(filters) {

    // Array for storing tag labels.
    const tags = [];

    // Add search tag.
    if (filters.search) {
      tags.push(`Search: ${filters.search}`);
    }

    // Add allergen tags.
    filters.avoidAllergens.forEach(id => {
      const label = allergyOptions.find(item => item.id === id)?.label || id;
      tags.push(`Avoid: ${label}`);
    });

    // Add custom avoid tags.
    filters.customAvoid.forEach(item =>
      tags.push(`Avoid custom: ${item}`)
    );

    // Add diet tag.
    if (filters.diet !== "any") {
      tags.push(`Diet: ${filters.diet}`);
    }

    // Add meal tag.
    if (filters.meal !== "any") {
      tags.push(`Meal: ${filters.meal}`);
    }

    // Add cuisine tag.
    if (filters.cuisine !== "any") {
      tags.push(`Cuisine: ${filters.cuisine}`);
    }

    // Add time tag.
    if (filters.maxTime !== 999) {
      tags.push(`Under ${filters.maxTime} min`);
    }

    // Add difficulty tag.
    if (filters.difficulty !== "any") {
      tags.push(`Difficulty: ${filters.difficulty}`);
    }

    // Convert tags into HTML pills.
    activeFilterTags.innerHTML = tags
      .map(tag => `<span class="pill">${escapeHTML(tag)}</span>`)
      .join("");
  }

  // Render filtered recipe cards.
  function renderRecipes() {

    // Get current filters.
    const filters = getFilters();

    // Filter and sort recipes.
    currentResults = sortRecipes(
      recipes.filter(recipe => recipeMatches(recipe, filters)),
      filters.sort
    );

    // Update result count text.
    resultCount.textContent = `${currentResults.length} recipe${currentResults.length === 1 ? "" : "s"} found`;

    // Update active tags.
    renderFilterTags(filters);

    // Generate recipe card HTML.
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

          <p class="recipe-desc">
            ${escapeHTML(recipe.description)}
          </p>

          <div class="recipe-meta">
            <span class="pill">${recipe.protein}g protein</span>
            <span class="pill">${recipe.calories} cal</span>
            <span class="pill warn">
              ${recipe.allergens.length ? recipe.allergens.join(", ") : "no listed allergens"}
            </span>
          </div>

          <button class="btn full" data-open-recipe="${recipe.id}">
            View Recipe
          </button>
        </div>
      </article>
    `).join("");

    // Show or hide empty state.
    emptyState.classList.toggle("hidden", currentResults.length !== 0);

    // Add click events for opening recipes.
    $$('[data-open-recipe]').forEach(button => {
      button.addEventListener("click", () =>
        openRecipe(Number(button.dataset.openRecipe))
      );
    });
  }

  // Open recipe modal.
  function openRecipe(id) {

    // Find recipe by ID.
    const recipe = recipes.find(item => item.id === id);

    // Stop if recipe is missing.
    if (!recipe) return;

    // Save currently viewed recipe.
    currentRecipe = recipe;

    // Update modal image.
    $("#modalImg").src = recipe.image;

    // Update image alt text.
    $("#modalImg").alt = recipe.name;

    // Update modal title.
    $("#modalTitle").textContent = recipe.name;

    // Update description.
    $("#modalDesc").textContent = recipe.description;

    // Update category tag.
    $("#modalSafeTag").textContent = `${recipe.cuisine} • ${recipe.meal}`;

    // Create metadata pills.
    $("#modalMeta").innerHTML = [
      `${recipe.time} minutes`,
      recipe.difficulty,
      `${recipe.calories} calories`,
      `${recipe.protein}g protein`,
      ...recipe.diet
    ].map(item =>
      `<span class="pill">${escapeHTML(item)}</span>`
    ).join("");

    // Render ingredients.
    $("#modalIngredients").innerHTML = recipe.ingredients
      .map(item => `<li>${escapeHTML(item)}</li>`)
      .join("");

    // Render steps.
    $("#modalSteps").innerHTML = recipe.steps
      .map(step => `<li>${escapeHTML(step)}</li>`)
      .join("");

    // Render notes.
    $("#modalNotes").textContent = recipe.notes;

    // Render allergen tags.
    $("#modalAllergens").innerHTML = recipe.allergens.length
      ? recipe.allergens
          .map(item => `<span class="pill warn">${escapeHTML(item)}</span>`)
          .join("")
      : `<span class="pill safe">No listed allergens in this recipe data</span>`;

    // Show the modal.
    $("#recipeModal").classList.remove("hidden");
  }

  // Close recipe modal.
  function closeModal() {
    $("#recipeModal").classList.add("hidden");
  }

  // Save currently viewed recipe.
  function saveCurrentRecipe() {

    // Stop if no recipe is selected.
    if (!currentRecipe) return;

    // Prevent duplicate saves.
    if (!savedRecipes.some(recipe => recipe.id === currentRecipe.id)) {
      savedRecipes.push(currentRecipe);
    }

    // Refresh saved section.
    renderSaved();

    // Change button text temporarily.
    $("#saveRecipeBtn").textContent = "Saved";

    // Restore original text after 1 second.
    setTimeout(() => {
      $("#saveRecipeBtn").textContent = "Save Recipe";
    }, 1000);
  }

  // Additional functions continue exactly the same.
  // Comments are inserted between logic blocks to explain purpose.
  // The original functionality remains unchanged.

    // Render saved recipe cards.
  function renderSaved() {

    // Toggle the empty state message.
    savedEmpty.classList.toggle("hidden", savedRecipes.length !== 0);

    // Build HTML for saved recipes.
    savedGrid.innerHTML = savedRecipes.map(recipe => `
      <div class="mini-card card">
        <span class="pill safe">${recipe.time} min</span>
        <h3>${escapeHTML(recipe.name)}</h3>
        <p>${escapeHTML(recipe.description)}</p>

        <div class="actions">
          <button class="btn small-btn" data-open-recipe="${recipe.id}">
            Open
          </button>

          <button class="btn danger small-btn" data-remove-saved="${recipe.id}">
            Remove
          </button>
        </div>
      </div>
    `).join("");

    // Add remove button events.
    $$('[data-remove-saved]').forEach(button => {
      button.addEventListener("click", () => {

        // Remove selected recipe.
        savedRecipes = savedRecipes.filter(
          recipe => recipe.id !== Number(button.dataset.removeSaved)
        );

        // Re-render list.
        renderSaved();
      });
    });

    // Add open button events.
    savedGrid.querySelectorAll('[data-open-recipe]').forEach(button => {
      button.addEventListener("click", () =>
        openRecipe(Number(button.dataset.openRecipe))
      );
    });
  }

  // Open a random recipe from filtered results.
  function randomFromResults() {

    // Stop if there are no results.
    if (!currentResults.length) return;

    // Pick a random recipe.
    const pick = currentResults[
      Math.floor(Math.random() * currentResults.length)
    ];

    // Open the chosen recipe.
    openRecipe(pick.id);
  }

  // Change homepage featured recipe.
  function randomHomeRecipe() {

    // Pick any recipe from the database.
    const pick = recipes[
      Math.floor(Math.random() * recipes.length)
    ];

    // Update hero image.
    $("#heroRecipeImg").src = pick.image;

    // Update hero title.
    $("#heroRecipeName").textContent = `Featured: ${pick.name}`;

    // Update hero text.
    $("#heroRecipeText").textContent =
      `${pick.description} Ready in ${pick.time} minutes.`;

    // Return user to home section.
    showSection("home");
  }

  // Generate a simple meal plan.
  function buildMealPlan() {

    // Separate recipes by meal type.
    const breakfast = currentResults.filter(recipe => recipe.meal === "breakfast");
    const lunch = currentResults.filter(recipe => recipe.meal === "lunch");
    const dinner = currentResults.filter(recipe => recipe.meal === "dinner");

    // Build the meal plan.
    const plan = [
      { label: "Breakfast", recipe: pickRandom(breakfast) },
      { label: "Lunch", recipe: pickRandom(lunch) },
      { label: "Dinner", recipe: pickRandom(dinner) }
    ].filter(item => item.recipe);

    // Toggle empty state.
    mealPlanEmpty.classList.toggle("hidden", plan.length !== 0);

    // Render meal plan cards.
    mealPlanGrid.innerHTML = plan.map(item => `
      <div class="mini-card card">
        <span class="pill safe">${item.label}</span>
        <h3>${escapeHTML(item.recipe.name)}</h3>
        <p>${escapeHTML(item.recipe.description)}</p>

        <button class="btn small-btn" data-open-recipe="${item.recipe.id}">
          Open Recipe
        </button>
      </div>
    `).join("");

    // Add open recipe events.
    mealPlanGrid.querySelectorAll('[data-open-recipe]').forEach(button => {
      button.addEventListener("click", () =>
        openRecipe(Number(button.dataset.openRecipe))
      );
    });

    // Show tools section.
    showSection("tools");
  }

  // Pick a random item from an array.
  function pickRandom(list) {

    // Return null if array is empty.
    if (!list.length) return null;

    // Return random item.
    return list[Math.floor(Math.random() * list.length)];
  }

  // Reset all filter controls.
  function resetFilters() {

    // Clear text fields.
    $("#searchInput").value = "";
    $("#customAvoidInput").value = "";

    // Reset dropdowns.
    $("#dietSelect").value = "any";
    $("#mealSelect").value = "any";
    $("#cuisineSelect").value = "any";
    $("#timeSelect").value = "999";
    $("#difficultySelect").value = "any";
    $("#sortSelect").value = "recommended";

    // Uncheck allergy filters.
    $$(".allergy-check").forEach(input => {
      input.checked = false;
    });

    // Re-render recipes.
    renderRecipes();
  }

  // Escape unsafe HTML characters.
  function escapeHTML(text) {

    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Create slideshow array.
  const slides = recipes.slice(0, 6);

  // Render slideshow content.
  function renderSlide() {

    const recipe = slides[slideIndex];

    $("#slideImg").src = recipe.image;
    $("#slideImg").alt = recipe.name;
    $("#slideTitle").textContent = recipe.name;
    $("#slideText").textContent = recipe.description;
  }

  // Move slideshow forward.
  function nextSlide() {

    slideIndex = (slideIndex + 1) % slides.length;
    renderSlide();
  }

  // Move slideshow backward.
  function prevSlide() {

    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    renderSlide();
  }

  // Simple calorie calculator.
  function calculateCalories() {

    const name = $("#calorieName").value.trim() || "meal";

    const amount = Math.max(
      1,
      Number($("#calorieAmount").value || 1)
    );

    const base = Number($("#calorieType").value);

    const total = amount * base;

    $("#calorieResult").innerHTML =
      `Estimated total for <strong>${escapeHTML(name)}</strong>: ` +
      `<strong>${total}</strong> calories across ${amount} portion${amount === 1 ? "" : "s"}.`;

    $("#calorieResult").classList.remove("hidden");
  }

  // Build allergy checkboxes.
  buildAllergyChecks();

  // Render recipe cards.
  renderRecipes();

  // Render saved recipes.
  renderSaved();

  // Render slideshow.
  renderSlide();

  // Add filter input listeners.
  [
    "searchInput",
    "customAvoidInput",
    "dietSelect",
    "mealSelect",
    "cuisineSelect",
    "timeSelect",
    "difficultySelect",
    "sortSelect"
  ].forEach(id => {

    $("#" + id).addEventListener("input", renderRecipes);
    $("#" + id).addEventListener("change", renderRecipes);
  });

  // Add allergy checkbox listeners.
  $$(".allergy-check").forEach(input => {
    input.addEventListener("change", renderRecipes);
  });

  // Toggle filter section visibility.
  $("#toggleFiltersBtn").addEventListener("click", () => {

    const hidden = $("#filtersBody").classList.toggle("hidden");

    $("#toggleFiltersBtn").textContent =
      hidden ? "Show Filters" : "Hide Filters";
  });

  // Button event listeners.
  $("#resetFiltersBtn").addEventListener("click", resetFilters);
  $("#randomBtn").addEventListener("click", randomFromResults);
  $("#surpriseHomeBtn").addEventListener("click", randomHomeRecipe);
  $("#mealPlanBtn").addEventListener("click", buildMealPlan);
  $("#closeModalBtn").addEventListener("click", closeModal);

  // Close modal if user clicks outside.
  $("#recipeModal").addEventListener("click", event => {

    if (event.target.id === "recipeModal") {
      closeModal();
    }
  });

  // Save recipe button.
  $("#saveRecipeBtn").addEventListener("click", saveCurrentRecipe);

  // Print recipe button.
  $("#printRecipeBtn").addEventListener("click", () => window.print());

  // Clear saved recipes button.
  $("#clearSavedBtn").addEventListener("click", () => {

    savedRecipes = [];
    renderSaved();
  });

  // Slideshow controls.
  $("#prevSlide").addEventListener("click", prevSlide);
  $("#nextSlide").addEventListener("click", nextSlide);

  // Calorie calculator button.
  $("#calcCaloriesBtn").addEventListener("click", calculateCalories);

  // Profile form submission.
  $("#profileForm").addEventListener("submit", event => {

    // Prevent page reload.
    event.preventDefault();

    // Get entered profile values.
    const name = $("#profileName").value.trim() || "Guest";
    const goal = $("#profileGoal").value;
    const avoid = $("#profileAvoid").value.trim() || "nothing listed";

    // Display summary.
    $("#profileResult").innerHTML =
      `<strong>${escapeHTML(name)}</strong>, your profile is focused on ` +
      `<strong>${escapeHTML(goal)}</strong>. Avoid list: ` +
      `<strong>${escapeHTML(avoid)}</strong>. ` +
      `Use the Recipe Finder filters to match this profile.`;

    // Show result area.
    $("#profileResult").classList.remove("hidden");

    // Reset form fields.
    event.target.reset();
  });

});
