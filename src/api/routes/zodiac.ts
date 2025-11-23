import { Hono } from 'hono'
import { db } from '../../db'
import { zodiacSigns } from '../../db/schema'
import { eq } from 'drizzle-orm'
import { getZodiacSign, ZodiacError } from '../../utils/zodiac'

export const zodiacRouter = new Hono()

// Get all zodiac signs
zodiacRouter.get('/', async (c) => {
  try {
    const signs = await db.select().from(zodiacSigns)
    return c.json(signs)
  } catch (error) {
    console.error('Error fetching zodiac signs:', error)
    return c.json({ error: 'Failed to fetch zodiac signs' }, 500)
  }
})

// Get zodiac sign by ID
zodiacRouter.get('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const [sign] = await db.select().from(zodiacSigns).where(eq(zodiacSigns.id, id))

    if (!sign) {
      return c.json({ error: 'Zodiac sign not found' }, 404)
    }

    return c.json(sign)
  } catch (error) {
    console.error('Error fetching zodiac sign:', error)
    return c.json({ error: 'Failed to fetch zodiac sign' }, 500)
  }
})

// Get zodiac sign by name
zodiacRouter.get('/name/:name', async (c) => {
  try {
    const name = c.req.param('name')
    const [sign] = await db.select().from(zodiacSigns).where(eq(zodiacSigns.name, name))

    if (!sign) {
      return c.json({ error: 'Zodiac sign not found' }, 404)
    }

    return c.json(sign)
  } catch (error) {
    console.error('Error fetching zodiac sign:', error)
    return c.json({ error: 'Failed to fetch zodiac sign' }, 500)
  }
})

// Get zodiac sign by birth date
zodiacRouter.get('/date/:date', async (c) => {
  try {
    const dateStr = c.req.param('date') // Expected format: MM-DD

    // Validate and calculate zodiac sign using utility function
    let zodiacSignName: string
    try {
      zodiacSignName = getZodiacSign(dateStr)
    } catch (error) {
      if (error instanceof ZodiacError) {
        return c.json({ error: error.message }, 400)
      }
      throw error
    }

    // Fetch zodiac sign details from database
    const [sign] = await db
      .select()
      .from(zodiacSigns)
      .where(eq(zodiacSigns.name, zodiacSignName))

    if (!sign) {
      return c.json(
        {
          error: `Zodiac sign '${zodiacSignName}' not found in database. Please ensure seed data is loaded.`
        },
        404
      )
    }

    return c.json(sign)
  } catch (error) {
    console.error('Error determining zodiac sign:', error)
    return c.json({ error: 'Failed to determine zodiac sign' }, 500)
  }
})
