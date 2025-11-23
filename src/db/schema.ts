import { pgTable, text, timestamp, uuid, date, integer, jsonb, boolean } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Zodiac Signs table
export const zodiacSigns = pgTable('zodiac_signs', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(), // Aries, Taurus, etc.
  symbol: text('symbol').notNull(), // ♈, ♉, etc.
  element: text('element').notNull(), // Fire, Earth, Air, Water
  quality: text('quality').notNull(), // Cardinal, Fixed, Mutable
  rulingPlanet: text('ruling_planet').notNull(),
  startDate: text('start_date').notNull(), // MM-DD format (e.g., "03-21")
  endDate: text('end_date').notNull(), // MM-DD format (e.g., "04-19")
  description: text('description'),
  traits: jsonb('traits'), // Array of personality traits
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Users table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').unique(),
  name: text('name'),
  birthDate: date('birth_date'),
  birthTime: text('birth_time'), // HH:MM format
  birthPlace: text('birth_place'),
  birthLatitude: text('birth_latitude'),
  birthLongitude: text('birth_longitude'),
  zodiacSignId: uuid('zodiac_sign_id').references(() => zodiacSigns.id),
  preferences: jsonb('preferences'), // User preferences
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Horoscopes table
export const horoscopes = pgTable('horoscopes', {
  id: uuid('id').defaultRandom().primaryKey(),
  zodiacSignId: uuid('zodiac_sign_id').notNull().references(() => zodiacSigns.id),
  date: date('date').notNull(),
  type: text('type').notNull(), // daily, weekly, monthly, yearly
  content: text('content').notNull(),
  loveScore: integer('love_score'), // 1-10
  careerScore: integer('career_score'), // 1-10
  healthScore: integer('health_score'), // 1-10
  luckyNumber: integer('lucky_number'),
  luckyColor: text('lucky_color'),
  metadata: jsonb('metadata'), // Additional horoscope data
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Birth Charts table - stores calculated astrological data
export const birthCharts = pgTable('birth_charts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  sunSign: text('sun_sign').notNull(),
  moonSign: text('moon_sign'),
  risingSign: text('rising_sign'),
  planetaryPositions: jsonb('planetary_positions'), // Calculated by skyfield
  houses: jsonb('houses'), // 12 astrological houses
  aspects: jsonb('aspects'), // Planetary aspects
  calculatedAt: timestamp('calculated_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Celestial Events table - astronomical events calculated by skyfield
export const celestialEvents = pgTable('celestial_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  eventType: text('event_type').notNull(), // new_moon, full_moon, eclipse, retrograde, etc.
  eventDate: timestamp('event_date').notNull(),
  celestialBody: text('celestial_body'), // moon, mercury, venus, etc.
  description: text('description'),
  zodiacSign: text('zodiac_sign'),
  metadata: jsonb('metadata'), // Additional astronomical data
  isVisible: boolean('is_visible').default(false),
  visibility: jsonb('visibility'), // Visibility data for different locations
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Relations
export const zodiacSignsRelations = relations(zodiacSigns, ({ many }) => ({
  users: many(users),
  horoscopes: many(horoscopes),
}))

export const usersRelations = relations(users, ({ one, many }) => ({
  zodiacSign: one(zodiacSigns, {
    fields: [users.zodiacSignId],
    references: [zodiacSigns.id],
  }),
  birthCharts: many(birthCharts),
}))

export const horoscopesRelations = relations(horoscopes, ({ one }) => ({
  zodiacSign: one(zodiacSigns, {
    fields: [horoscopes.zodiacSignId],
    references: [zodiacSigns.id],
  }),
}))

export const birthChartsRelations = relations(birthCharts, ({ one }) => ({
  user: one(users, {
    fields: [birthCharts.userId],
    references: [users.id],
  }),
}))

// Type exports
export type ZodiacSign = typeof zodiacSigns.$inferSelect
export type NewZodiacSign = typeof zodiacSigns.$inferInsert

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type Horoscope = typeof horoscopes.$inferSelect
export type NewHoroscope = typeof horoscopes.$inferInsert

export type BirthChart = typeof birthCharts.$inferSelect
export type NewBirthChart = typeof birthCharts.$inferInsert

export type CelestialEvent = typeof celestialEvents.$inferSelect
export type NewCelestialEvent = typeof celestialEvents.$inferInsert
