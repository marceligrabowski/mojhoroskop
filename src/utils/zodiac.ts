/**
 * Zodiac sign calculation utilities
 * Handles zodiac sign determination based on birth dates
 */

export interface ZodiacDateRange {
  name: string
  symbol: string
  startMonth: number
  startDay: number
  endMonth: number
  endDay: number
}

/**
 * Zodiac sign date ranges
 * Based on tropical zodiac system (Western astrology)
 */
const ZODIAC_RANGES: ZodiacDateRange[] = [
  { name: 'Capricorn', symbol: '♑', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
  { name: 'Aquarius', symbol: '♒', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
  { name: 'Pisces', symbol: '♓', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
  { name: 'Aries', symbol: '♈', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  { name: 'Taurus', symbol: '♉', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  { name: 'Gemini', symbol: '♊', startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
  { name: 'Cancer', symbol: '♋', startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
  { name: 'Leo', symbol: '♌', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { name: 'Virgo', symbol: '♍', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { name: 'Libra', symbol: '♎', startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
  { name: 'Scorpio', symbol: '♏', startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
  { name: 'Sagittarius', symbol: '♐', startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
]

export class ZodiacError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ZodiacError'
  }
}

/**
 * Validates if a date string is in the correct MM-DD format
 * @param dateStr - Date string in MM-DD format
 * @returns true if valid, false otherwise
 */
export function isValidDateFormat(dateStr: string): boolean {
  if (!dateStr || typeof dateStr !== 'string') {
    return false
  }

  // Check format MM-DD
  const regex = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
  return regex.test(dateStr)
}

/**
 * Validates if a month-day combination is valid
 * Handles different month lengths and February edge cases
 * @param month - Month (1-12)
 * @param day - Day (1-31)
 * @returns true if valid, false otherwise
 */
export function isValidMonthDay(month: number, day: number): boolean {
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return false
  }

  const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  return day <= daysInMonth[month - 1]
}

/**
 * Parses a date string in MM-DD format
 * @param dateStr - Date string in MM-DD format
 * @returns Object with month and day as numbers
 * @throws ZodiacError if format is invalid
 */
export function parseDateString(dateStr: string): { month: number; day: number } {
  if (!isValidDateFormat(dateStr)) {
    throw new ZodiacError(
      'Invalid date format. Expected MM-DD format (e.g., "03-21" for March 21)'
    )
  }

  const [monthStr, dayStr] = dateStr.split('-')
  const month = parseInt(monthStr, 10)
  const day = parseInt(dayStr, 10)

  if (!isValidMonthDay(month, day)) {
    throw new ZodiacError(
      `Invalid date: ${dateStr}. Month ${month} does not have ${day} days.`
    )
  }

  return { month, day }
}

/**
 * Checks if a date falls within a zodiac sign's date range
 * Handles year-wrap cases (e.g., Capricorn: Dec 22 - Jan 19)
 * @param month - Month (1-12)
 * @param day - Day (1-31)
 * @param range - Zodiac date range
 * @returns true if date is within range
 */
function isDateInRange(month: number, day: number, range: ZodiacDateRange): boolean {
  const { startMonth, startDay, endMonth, endDay } = range

  // Handle year-wrap (e.g., Capricorn: Dec 22 - Jan 19)
  if (startMonth > endMonth) {
    return (
      (month === startMonth && day >= startDay) ||
      (month > startMonth) ||
      (month < endMonth) ||
      (month === endMonth && day <= endDay)
    )
  }

  // Normal case (same year)
  return (
    (month === startMonth && day >= startDay) ||
    (month > startMonth && month < endMonth) ||
    (month === endMonth && day <= endDay)
  )
}

/**
 * Calculates the zodiac sign for a given birth date
 * @param dateStr - Date string in MM-DD format (e.g., "03-21")
 * @returns Zodiac sign name
 * @throws ZodiacError if date format is invalid or zodiac sign cannot be determined
 *
 * @example
 * ```typescript
 * getZodiacSign("03-21") // returns "Aries"
 * getZodiacSign("12-25") // returns "Capricorn"
 * getZodiacSign("02-29") // returns "Pisces" (leap year date is valid)
 * ```
 */
export function getZodiacSign(dateStr: string): string {
  const { month, day } = parseDateString(dateStr)

  for (const range of ZODIAC_RANGES) {
    if (isDateInRange(month, day, range)) {
      return range.name
    }
  }

  // This should never happen if date ranges are correct
  throw new ZodiacError(`Unable to determine zodiac sign for date: ${dateStr}`)
}

/**
 * Calculates the zodiac sign with additional details
 * @param dateStr - Date string in MM-DD format
 * @returns Object with zodiac sign details
 * @throws ZodiacError if date format is invalid or zodiac sign cannot be determined
 */
export function getZodiacSignDetails(dateStr: string): ZodiacDateRange {
  const { month, day } = parseDateString(dateStr)

  for (const range of ZODIAC_RANGES) {
    if (isDateInRange(month, day, range)) {
      return range
    }
  }

  throw new ZodiacError(`Unable to determine zodiac sign for date: ${dateStr}`)
}

/**
 * Converts a full date (YYYY-MM-DD) to MM-DD format
 * @param fullDate - Date string in YYYY-MM-DD format or Date object
 * @returns Date string in MM-DD format
 * @throws ZodiacError if date is invalid
 */
export function toMMDD(fullDate: string | Date): string {
  try {
    const date = typeof fullDate === 'string' ? new Date(fullDate) : fullDate

    if (isNaN(date.getTime())) {
      throw new ZodiacError('Invalid date provided')
    }

    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${month}-${day}`
  } catch (error) {
    if (error instanceof ZodiacError) {
      throw error
    }
    throw new ZodiacError('Failed to convert date to MM-DD format')
  }
}

/**
 * Gets zodiac sign from a full date (YYYY-MM-DD) or Date object
 * @param fullDate - Date string in YYYY-MM-DD format or Date object
 * @returns Zodiac sign name
 * @throws ZodiacError if date is invalid
 */
export function getZodiacSignFromFullDate(fullDate: string | Date): string {
  const mmdd = toMMDD(fullDate)
  return getZodiacSign(mmdd)
}
