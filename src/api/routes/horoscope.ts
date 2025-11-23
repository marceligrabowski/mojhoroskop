import { Hono } from 'hono'
import { db } from '../../db'
import { horoscopes, zodiacSigns } from '../../db/schema'
import { eq, and } from 'drizzle-orm'

export const horoscopeRouter = new Hono()

// Get today's horoscope for a zodiac sign
horoscopeRouter.get('/:signName/today', async (c) => {
  try {
    const signName = c.req.param('signName')
    const today = new Date().toISOString().split('T')[0]

    // Get zodiac sign
    const [sign] = await db.select().from(zodiacSigns).where(eq(zodiacSigns.name, signName))

    if (!sign) {
      return c.json({ error: 'Zodiac sign not found' }, 404)
    }

    // Get today's horoscope
    const [horoscope] = await db
      .select()
      .from(horoscopes)
      .where(
        and(
          eq(horoscopes.zodiacSignId, sign.id),
          eq(horoscopes.date, today),
          eq(horoscopes.type, 'daily')
        )
      )

    if (!horoscope) {
      return c.json({
        message: 'No horoscope available for today',
        sign: signName,
        date: today,
      }, 404)
    }

    return c.json({
      ...horoscope,
      zodiacSign: sign,
    })
  } catch (error) {
    console.error('Error fetching horoscope:', error)
    return c.json({ error: 'Failed to fetch horoscope' }, 500)
  }
})

// Get horoscope by type (daily, weekly, monthly, yearly)
horoscopeRouter.get('/:signName/:type', async (c) => {
  try {
    const signName = c.req.param('signName')
    const type = c.req.param('type')
    const date = c.req.query('date') || new Date().toISOString().split('T')[0]

    // Get zodiac sign
    const [sign] = await db.select().from(zodiacSigns).where(eq(zodiacSigns.name, signName))

    if (!sign) {
      return c.json({ error: 'Zodiac sign not found' }, 404)
    }

    // Get horoscope
    const [horoscope] = await db
      .select()
      .from(horoscopes)
      .where(
        and(
          eq(horoscopes.zodiacSignId, sign.id),
          eq(horoscopes.date, date),
          eq(horoscopes.type, type)
        )
      )

    if (!horoscope) {
      return c.json({
        message: `No ${type} horoscope available`,
        sign: signName,
        date,
      }, 404)
    }

    return c.json({
      ...horoscope,
      zodiacSign: sign,
    })
  } catch (error) {
    console.error('Error fetching horoscope:', error)
    return c.json({ error: 'Failed to fetch horoscope' }, 500)
  }
})

// Get all horoscopes for a specific date
horoscopeRouter.get('/date/:date', async (c) => {
  try {
    const date = c.req.param('date')
    const type = c.req.query('type') || 'daily'

    const results = await db
      .select({
        horoscope: horoscopes,
        zodiacSign: zodiacSigns,
      })
      .from(horoscopes)
      .innerJoin(zodiacSigns, eq(horoscopes.zodiacSignId, zodiacSigns.id))
      .where(
        and(
          eq(horoscopes.date, date),
          eq(horoscopes.type, type)
        )
      )

    return c.json(results)
  } catch (error) {
    console.error('Error fetching horoscopes:', error)
    return c.json({ error: 'Failed to fetch horoscopes' }, 500)
  }
})
