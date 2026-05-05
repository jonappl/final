// ===== State =====
let allergies = [];
let cuisines = [];
let vibe = '';

// ===== Step labels =====
const stepLabels = ['Allergies', 'Cuisine', 'Occasion', 'Your meal'];

// ===== Chip toggle =====
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

// ===== Skip allergies =====
function skipAllergies() {
  allergies = [];
  goTo(2);
}

// ===== Navigate between steps =====
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

  const label = stepLabels[n - 1] || '';
  document.getElementById('prog-text').textContent = label;
}

// ===== Get AI recommendation =====
async function getRecommendation() {
  goTo(4);

  const actionRow = document.getElementById('action-row');
  actionRow.style.display = 'none';

  const area = document.getElementById('result-area');
  area.innerHTML = '<p class="loading-text">Finding your meal...</p>';

  // Animate loading bar
  const lb = document.getElementById('lbar');
  lb.style.width = '0';
  setTimeout(() => { lb.style.width = '65%'; }, 80);

  const prompt = `You are a fun, knowledgeable food recommendation assistant. Suggest ONE specific dish based on:
- Cuisines: ${cuisines.length ? cuisines.join(', ') : 'any cuisine'}
- Allergies to avoid: ${allergies.length ? allergies.join(', ') : 'none'}
- Occasion: ${vibe || 'any'}

Respond ONLY with a valid JSON object. No markdown fences, no preamble, no extra text — pure JSON only:
{
  "name": "Dish name",
  "cuisine": "Cuisine type",
  "tags": ["tag1", "tag2", "tag3"],
  "why": "One engaging sentence about why this fits their vibe",
  "fun_fact": "One interesting fact about this dish",
  "nutrition": "Brief nutrition info: calories, protein, and key macros in 2-3 sentences",
  "recipe": "Step-by-step instructions to make it at home, 4-6 clear steps"
}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      throw new Error('API request failed: ' + response.status);
    }

    const data = await response.json();
    lb.style.width = '100%';

    const rawText = data.content.map(item => item.text || '').join('');
    const cleaned = rawText.replace(/```json|```/g, '').trim();
    const food = JSON.parse(cleaned);

    setTimeout(() => {
      area.innerHTML = `
        <div class="result-card">
          <div class="food-name">${escapeHtml(food.name)}</div>
          <div class="food-tags">
            <span class="tag">${escapeHtml(food.cuisine)}</span>
            ${(food.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
          </div>
          <p class="food-why">${escapeHtml(food.why)}</p>
          <p class="food-fact">💡 ${escapeHtml(food.fun_fact)}</p>
        </div>
        <div class="details-section">
          <div class="details-label">Nutrition</div>
          <div class="details-content">${escapeHtml(food.nutrition)}</div>
        </div>
        <div class="details-section">
          <div class="details-label">How to make it</div>
          <div class="details-content">${formatRecipe(food.recipe)}</div>
        </div>
      `;
      actionRow.style.display = 'flex';
    }, 300);

  } catch (err) {
    console.error('Error:', err);
    lb.style.width = '100%';
    area.innerHTML = `
      <p class="error-text">Something went wrong — please try again.</p>
      <p style="font-size:13px;color:#999;margin-top:8px;font-family:system-ui,sans-serif">
        Note: This app requires an Anthropic API key to be configured on the server.
      </p>
    `;
    actionRow.style.display = 'flex';
  }
}

// ===== Helpers =====
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatRecipe(text) {
  if (!text) return '';
  // If it looks like a numbered list, render each step on its own line
  const lines = String(text).split(/\n|(?=\d+\.)/).filter(l => l.trim());
  if (lines.length > 1) {
    return lines.map(l => `<span style="display:block;margin-bottom:6px">${escapeHtml(l.trim())}</span>`).join('');
  }
  return escapeHtml(text);
}