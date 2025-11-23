import { Hono } from 'hono'
import { db } from '../../db'
import { users, zodiacSigns, birthCharts } from '../../db/schema'
import { eq } from 'drizzle-orm'

export const userRouter = new Hono()

// Get user by ID
userRouter.get('/:id', async (c) => {
  try {
    const id = c.req.param('id')

    const [user] = await db
      .select({
        user: users,
        zodiacSign: zodiacSigns,
      })
      .from(users)
      .leftJoin(zodiacSigns, eq(users.zodiacSignId, zodiacSigns.id))
      .where(eq(users.id, id))

    if (!user) {
      return c.json({ error: 'User not found' }, 404)
    }

    return c.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return c.json({ error: 'Failed to fetch user' }, 500)
  }
})

// Create new user
userRouter.post('/', async (c) => {
  try {
    const body = await c.req.json()

    // Validate required fields
    if (!body.email) {
      return c.json({ error: 'Email is required' }, 400)
    }

    // If birth date is provided, determine zodiac sign
    let zodiacSignId = null
    if (body.birthDate) {
      const date = new Date(body.birthDate)
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')

      const signs = await db.select().from(zodiacSigns)
      const sign = signs.find((s) => {
        const [startMonth, startDay] = s.startDate.split('-').map(Number)
        const [endMonth, endDay] = s.endDate.split('-').map(Number)
        const [checkMonth, checkDay] = [Number(month), Number(day)]

        if (startMonth > endMonth) {
          return (
            (checkMonth === startMonth && checkDay >= startDay) ||
            (checkMonth > startMonth) ||
            (checkMonth < endMonth) ||
            (checkMonth === endMonth && checkDay <= endDay)
          )
        }

        return (
          (checkMonth === startMonth && checkDay >= startDay) ||
          (checkMonth > startMonth && checkMonth < endMonth) ||
          (checkMonth === endMonth && checkDay <= endDay)
        )
      })

      zodiacSignId = sign?.id || null
    }

    const [newUser] = await db
      .insert(users)
      .values({
        email: body.email,
        name: body.name,
        birthDate: body.birthDate,
        birthTime: body.birthTime,
        birthPlace: body.birthPlace,
        birthLatitude: body.birthLatitude,
        birthLongitude: body.birthLongitude,
        zodiacSignId,
        preferences: body.preferences || {},
      })
      .returning()

    return c.json(newUser, 201)
  } catch (error) {
    console.error('Error creating user:', error)
    return c.json({ error: 'Failed to create user' }, 500)
  }
})

// Update user
userRouter.patch('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()

    const [updatedUser] = await db
      .update(users)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning()

    if (!updatedUser) {
      return c.json({ error: 'User not found' }, 404)
    }

    return c.json(updatedUser)
  } catch (error) {
    console.error('Error updating user:', error)
    return c.json({ error: 'Failed to update user' }, 500)
  }
})

// Get user's birth chart
userRouter.get('/:id/birth-chart', async (c) => {
  try {
    const userId = c.req.param('id')

    const charts = await db
      .select()
      .from(birthCharts)
      .where(eq(birthCharts.userId, userId))
      .orderBy(birthCharts.calculatedAt)

    return c.json(charts)
  } catch (error) {
    console.error('Error fetching birth chart:', error)
    return c.json({ error: 'Failed to fetch birth chart' }, 500)
  }
})
