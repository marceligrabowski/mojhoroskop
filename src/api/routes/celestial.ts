import { Hono } from 'hono'
import { db } from '../../db'
import { celestialEvents } from '../../db/schema'
import { eq, gte, lte, and } from 'drizzle-orm'

export const celestialRouter = new Hono()

// Get upcoming celestial events
celestialRouter.get('/upcoming', async (c) => {
  try {
    const limit = Number(c.req.query('limit')) || 10
    const now = new Date()

    const events = await db
      .select()
      .from(celestialEvents)
      .where(gte(celestialEvents.eventDate, now))
      .limit(limit)

    return c.json(events)
  } catch (error) {
    console.error('Error fetching celestial events:', error)
    return c.json({ error: 'Failed to fetch celestial events' }, 500)
  }
})

// Get events by type
celestialRouter.get('/type/:type', async (c) => {
  try {
    const type = c.req.param('type')
    const startDate = c.req.query('start') ? new Date(c.req.query('start')!) : new Date()
    const endDate = c.req.query('end') ? new Date(c.req.query('end')!) : null

    const conditions = [eq(celestialEvents.eventType, type)]

    if (endDate) {
      conditions.push(gte(celestialEvents.eventDate, startDate))
      conditions.push(lte(celestialEvents.eventDate, endDate))
    } else {
      conditions.push(gte(celestialEvents.eventDate, startDate))
    }

    const events = await db
      .select()
      .from(celestialEvents)
      .where(and(...conditions))

    return c.json(events)
  } catch (error) {
    console.error('Error fetching celestial events by type:', error)
    return c.json({ error: 'Failed to fetch celestial events' }, 500)
  }
})

// Get events for a date range
celestialRouter.get('/range', async (c) => {
  try {
    const startDateStr = c.req.query('start')
    const endDateStr = c.req.query('end')

    if (!startDateStr || !endDateStr) {
      return c.json({ error: 'Both start and end dates are required' }, 400)
    }

    const startDate = new Date(startDateStr)
    const endDate = new Date(endDateStr)

    const events = await db
      .select()
      .from(celestialEvents)
      .where(
        and(
          gte(celestialEvents.eventDate, startDate),
          lte(celestialEvents.eventDate, endDate)
        )
      )

    return c.json(events)
  } catch (error) {
    console.error('Error fetching celestial events:', error)
    return c.json({ error: 'Failed to fetch celestial events' }, 500)
  }
})

// Calculate current moon phase (will use skyfield)
celestialRouter.get('/moon/phase', async (c) => {
  try {
    // This will call the skyfield service to calculate current moon phase
    return c.json({
      message: 'Moon phase calculation endpoint - will integrate with skyfield',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error calculating moon phase:', error)
    return c.json({ error: 'Failed to calculate moon phase' }, 500)
  }
})

// Get planetary positions (will use skyfield)
celestialRouter.get('/planets/positions', async (c) => {
  try {
    const date = c.req.query('date') || new Date().toISOString()

    // This will call the skyfield service to calculate planetary positions
    return c.json({
      message: 'Planetary positions endpoint - will integrate with skyfield',
      date,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error calculating planetary positions:', error)
    return c.json({ error: 'Failed to calculate planetary positions' }, 500)
  }
})
