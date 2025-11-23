import { Hono } from 'hono'
import { db } from '../../db'
import { zodiacSigns } from '../../db/schema'
import { eq } from 'drizzle-orm'

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
    const signs = await db.select().from(zodiacSigns)

    // Find matching zodiac sign based on date
    const sign = signs.find((s) => {
      const [month, day] = dateStr.split('-').map(Number)
      const [startMonth, startDay] = s.startDate.split('-').map(Number)
      const [endMonth, endDay] = s.endDate.split('-').map(Number)

      // Handle year-wrap (Capricorn)
      if (startMonth > endMonth) {
        return (
          (month === startMonth && day >= startDay) ||
          (month > startMonth) ||
          (month < endMonth) ||
          (month === endMonth && day <= endDay)
        )
      }

      return (
        (month === startMonth && day >= startDay) ||
        (month > startMonth && month < endMonth) ||
        (month === endMonth && day <= endDay)
      )
    })

    if (!sign) {
      return c.json({ error: 'Zodiac sign not found for date' }, 404)
    }

    return c.json(sign)
  } catch (error) {
    console.error('Error determining zodiac sign:', error)
    return c.json({ error: 'Failed to determine zodiac sign' }, 500)
  }
})
