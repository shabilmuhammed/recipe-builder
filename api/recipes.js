import OpenAI from 'openai'

// One place to change the model. gpt-4o-mini is fast, cheap and supports
// Structured Outputs (guaranteed-valid JSON). Swap to 'gpt-4.1-mini' for richer results.
const MODEL = 'gpt-4o-mini'

const SYSTEM = `You are Pantry Pal, a warm, encouraging cooking assistant for a BEGINNER home cook based in Kerala, India. The user tells you which ingredients they have at home; you suggest EXACTLY 5 recipes they can realistically make.

Follow EVERY rule:
1. EASY: beginner-friendly, simple techniques, ideally 8 steps or fewer, common equipment.
2. CUISINE MIX: return an EVEN mix — roughly half Kerala/Indian dishes and half Western dishes (about 2-3 Indian and 2-3 Western across the 5). Set each recipe's "cuisine" to "Kerala", "Indian", or "Western".
3. HEALTHY: NO deep-frying and no greasy junk. Keep oil minimal. Favour air-frying, roasting, steaming, sautéing, grilling and light curries.
4. AIR FRYER PREFERRED: whenever a dish suits it, use the air fryer and give the exact temperature in °C and the time inside the steps. At least two of the five recipes should use the air fryer.
5. USE THEIR INGREDIENTS + ASSUME A STOCKED SPICE SHELF: build each recipe around the ingredients the user selected. ALWAYS assume these everyday staples are already in their kitchen even when NOT selected, and NEVER put them in "ingredientsNeeded": salt, sugar, jaggery, cooking oil and water; plus the common seasoning shelf — black pepper/pepper powder, red chilli powder, turmeric, coriander powder, cumin powder, garam masala, mustard seeds, cumin seeds and curry leaves. Put the user's selected ingredients that a recipe uses in "ingredientsHave". Only genuinely non-staple extras they did NOT select (a specific vegetable, protein, dairy, sauce, herb, etc.) go in "ingredientsNeeded" — keep it short (a few items max).
6. Be practical and honest about time and servings.

For each recipe also give:
- "whyItFits": one friendly sentence on why it suits this cook (easy / healthy / air-fryer / uses their stuff).
- "tags": 2-4 short labels, e.g. "High protein", "Vegetarian", "One-pan".
- "difficulty": "Easy" or "Medium".
- "cookingMethod": e.g. "Air fryer", "Stovetop", "Oven", "No-cook".
- "steps": clear numbered instructions a newbie can follow; include air-fryer temp (°C) and time where used.
- "healthNote": one short line on why it is a healthy choice.
Keep the language simple, warm and encouraging.`

const recipeSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    name: { type: 'string' },
    cuisine: { type: 'string', enum: ['Kerala', 'Indian', 'Western'] },
    description: { type: 'string' },
    whyItFits: { type: 'string' },
    tags: { type: 'array', items: { type: 'string' } },
    timeMinutes: { type: 'integer' },
    servings: { type: 'integer' },
    difficulty: { type: 'string', enum: ['Easy', 'Medium'] },
    cookingMethod: { type: 'string' },
    ingredientsHave: { type: 'array', items: { type: 'string' } },
    ingredientsNeeded: { type: 'array', items: { type: 'string' } },
    steps: { type: 'array', items: { type: 'string' } },
    healthNote: { type: 'string' },
  },
  required: [
    'name', 'cuisine', 'description', 'whyItFits', 'tags', 'timeMinutes', 'servings',
    'difficulty', 'cookingMethod', 'ingredientsHave', 'ingredientsNeeded', 'steps', 'healthNote',
  ],
}

const SCHEMA = {
  name: 'recipe_list',
  strict: true,
  schema: {
    type: 'object',
    additionalProperties: false,
    properties: { recipes: { type: 'array', items: recipeSchema } },
    required: ['recipes'],
  },
}

function send(res, status, obj) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(obj))
}

async function readJson(req) {
  if (req.body) return typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  return await new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (c) => (data += c))
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {})
      } catch (e) {
        reject(e)
      }
    })
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' })
  if (!process.env.OPENAI_API_KEY) {
    return send(res, 500, {
      error: 'Missing OPENAI_API_KEY. Add it to .env.local (local) or your Vercel env vars.',
    })
  }

  let body
  try {
    body = await readJson(req)
  } catch {
    return send(res, 400, { error: 'Invalid request body.' })
  }

  const ingredients = Array.isArray(body.ingredients) ? body.ingredients.filter(Boolean) : []
  if (ingredients.length === 0) return send(res, 400, { error: 'No ingredients provided.' })

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const completion = await client.chat.completions.create({
      model: MODEL,
      temperature: 0.7,
      messages: [
        { role: 'system', content: SYSTEM },
        {
          role: 'user',
          content: `Ingredients I have at home: ${ingredients.join(', ')}.\n\nGive me my top 5 recipes.`,
        },
      ],
      response_format: { type: 'json_schema', json_schema: SCHEMA },
    })

    const content = completion.choices?.[0]?.message?.content || '{}'
    const data = JSON.parse(content)
    const recipes = Array.isArray(data.recipes) ? data.recipes.slice(0, 5) : []
    return send(res, 200, { recipes })
  } catch (err) {
    console.error('recipes error:', err)
    return send(res, 500, { error: err?.message || 'Failed to generate recipes.' })
  }
}
