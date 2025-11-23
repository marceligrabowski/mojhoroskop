import { describe, it, expect } from 'vitest'
import {
  getZodiacSign,
  getZodiacSignDetails,
  getZodiacSignFromFullDate,
  isValidDateFormat,
  isValidMonthDay,
  parseDateString,
  toMMDD,
  ZodiacError,
} from './zodiac'

describe('Zodiac Sign Calculation', () => {
  describe('isValidDateFormat', () => {
    it('should validate correct MM-DD format', () => {
      expect(isValidDateFormat('01-01')).toBe(true)
      expect(isValidDateFormat('03-21')).toBe(true)
      expect(isValidDateFormat('12-31')).toBe(true)
    })

    it('should reject invalid formats', () => {
      expect(isValidDateFormat('1-1')).toBe(false) // Missing leading zeros
      expect(isValidDateFormat('13-01')).toBe(false) // Invalid month
      expect(isValidDateFormat('00-01')).toBe(false) // Invalid month
      expect(isValidDateFormat('01-32')).toBe(false) // Invalid day
      expect(isValidDateFormat('01-00')).toBe(false) // Invalid day
      expect(isValidDateFormat('2024-03-21')).toBe(false) // Wrong format
      expect(isValidDateFormat('03/21')).toBe(false) // Wrong separator
      expect(isValidDateFormat('')).toBe(false) // Empty string
      expect(isValidDateFormat('invalid')).toBe(false) // Invalid string
    })

    it('should handle non-string inputs', () => {
      expect(isValidDateFormat(null as any)).toBe(false)
      expect(isValidDateFormat(undefined as any)).toBe(false)
      expect(isValidDateFormat(123 as any)).toBe(false)
    })
  })

  describe('isValidMonthDay', () => {
    it('should validate valid month-day combinations', () => {
      expect(isValidMonthDay(1, 31)).toBe(true) // January has 31 days
      expect(isValidMonthDay(2, 29)).toBe(true) // February can have 29 days (leap year)
      expect(isValidMonthDay(4, 30)).toBe(true) // April has 30 days
      expect(isValidMonthDay(12, 31)).toBe(true) // December has 31 days
    })

    it('should reject invalid month-day combinations', () => {
      expect(isValidMonthDay(2, 30)).toBe(false) // February never has 30 days
      expect(isValidMonthDay(4, 31)).toBe(false) // April has only 30 days
      expect(isValidMonthDay(13, 15)).toBe(false) // Invalid month
      expect(isValidMonthDay(0, 15)).toBe(false) // Invalid month
      expect(isValidMonthDay(6, 0)).toBe(false) // Invalid day
      expect(isValidMonthDay(6, 32)).toBe(false) // Invalid day
    })
  })

  describe('parseDateString', () => {
    it('should parse valid date strings', () => {
      expect(parseDateString('03-21')).toEqual({ month: 3, day: 21 })
      expect(parseDateString('12-31')).toEqual({ month: 12, day: 31 })
      expect(parseDateString('01-01')).toEqual({ month: 1, day: 1 })
    })

    it('should throw ZodiacError for invalid formats', () => {
      expect(() => parseDateString('invalid')).toThrow(ZodiacError)
      expect(() => parseDateString('13-01')).toThrow(ZodiacError)
      expect(() => parseDateString('02-30')).toThrow(ZodiacError)
    })

    it('should provide clear error messages', () => {
      expect(() => parseDateString('invalid')).toThrow('Invalid date format')
      expect(() => parseDateString('02-30')).toThrow('Month 2 does not have 30 days')
    })
  })

  describe('getZodiacSign - All 12 Signs', () => {
    it('should return Aries for dates in Aries range', () => {
      expect(getZodiacSign('03-21')).toBe('Aries') // First day
      expect(getZodiacSign('03-25')).toBe('Aries') // Middle
      expect(getZodiacSign('04-10')).toBe('Aries') // Middle
      expect(getZodiacSign('04-19')).toBe('Aries') // Last day
    })

    it('should return Taurus for dates in Taurus range', () => {
      expect(getZodiacSign('04-20')).toBe('Taurus') // First day
      expect(getZodiacSign('05-01')).toBe('Taurus') // Middle
      expect(getZodiacSign('05-20')).toBe('Taurus') // Last day
    })

    it('should return Gemini for dates in Gemini range', () => {
      expect(getZodiacSign('05-21')).toBe('Gemini') // First day
      expect(getZodiacSign('06-01')).toBe('Gemini') // Middle
      expect(getZodiacSign('06-20')).toBe('Gemini') // Last day
    })

    it('should return Cancer for dates in Cancer range', () => {
      expect(getZodiacSign('06-21')).toBe('Cancer') // First day
      expect(getZodiacSign('07-01')).toBe('Cancer') // Middle
      expect(getZodiacSign('07-22')).toBe('Cancer') // Last day
    })

    it('should return Leo for dates in Leo range', () => {
      expect(getZodiacSign('07-23')).toBe('Leo') // First day
      expect(getZodiacSign('08-01')).toBe('Leo') // Middle
      expect(getZodiacSign('08-22')).toBe('Leo') // Last day
    })

    it('should return Virgo for dates in Virgo range', () => {
      expect(getZodiacSign('08-23')).toBe('Virgo') // First day
      expect(getZodiacSign('09-01')).toBe('Virgo') // Middle
      expect(getZodiacSign('09-22')).toBe('Virgo') // Last day
    })

    it('should return Libra for dates in Libra range', () => {
      expect(getZodiacSign('09-23')).toBe('Libra') // First day
      expect(getZodiacSign('10-01')).toBe('Libra') // Middle
      expect(getZodiacSign('10-22')).toBe('Libra') // Last day
    })

    it('should return Scorpio for dates in Scorpio range', () => {
      expect(getZodiacSign('10-23')).toBe('Scorpio') // First day
      expect(getZodiacSign('11-01')).toBe('Scorpio') // Middle
      expect(getZodiacSign('11-21')).toBe('Scorpio') // Last day
    })

    it('should return Sagittarius for dates in Sagittarius range', () => {
      expect(getZodiacSign('11-22')).toBe('Sagittarius') // First day
      expect(getZodiacSign('12-01')).toBe('Sagittarius') // Middle
      expect(getZodiacSign('12-21')).toBe('Sagittarius') // Last day
    })

    it('should return Capricorn for dates in Capricorn range', () => {
      expect(getZodiacSign('12-22')).toBe('Capricorn') // First day (Dec)
      expect(getZodiacSign('12-25')).toBe('Capricorn') // Christmas
      expect(getZodiacSign('12-31')).toBe('Capricorn') // New Year's Eve
      expect(getZodiacSign('01-01')).toBe('Capricorn') // New Year's Day
      expect(getZodiacSign('01-10')).toBe('Capricorn') // Middle
      expect(getZodiacSign('01-19')).toBe('Capricorn') // Last day
    })

    it('should return Aquarius for dates in Aquarius range', () => {
      expect(getZodiacSign('01-20')).toBe('Aquarius') // First day
      expect(getZodiacSign('02-01')).toBe('Aquarius') // Middle
      expect(getZodiacSign('02-18')).toBe('Aquarius') // Last day
    })

    it('should return Pisces for dates in Pisces range', () => {
      expect(getZodiacSign('02-19')).toBe('Pisces') // First day
      expect(getZodiacSign('03-01')).toBe('Pisces') // Middle
      expect(getZodiacSign('03-20')).toBe('Pisces') // Last day
    })
  })

  describe('getZodiacSign - Boundary Dates', () => {
    it('should correctly handle all zodiac sign boundaries', () => {
      // Test the boundary between each sign
      expect(getZodiacSign('03-20')).toBe('Pisces')
      expect(getZodiacSign('03-21')).toBe('Aries')

      expect(getZodiacSign('04-19')).toBe('Aries')
      expect(getZodiacSign('04-20')).toBe('Taurus')

      expect(getZodiacSign('05-20')).toBe('Taurus')
      expect(getZodiacSign('05-21')).toBe('Gemini')

      expect(getZodiacSign('06-20')).toBe('Gemini')
      expect(getZodiacSign('06-21')).toBe('Cancer')

      expect(getZodiacSign('07-22')).toBe('Cancer')
      expect(getZodiacSign('07-23')).toBe('Leo')

      expect(getZodiacSign('08-22')).toBe('Leo')
      expect(getZodiacSign('08-23')).toBe('Virgo')

      expect(getZodiacSign('09-22')).toBe('Virgo')
      expect(getZodiacSign('09-23')).toBe('Libra')

      expect(getZodiacSign('10-22')).toBe('Libra')
      expect(getZodiacSign('10-23')).toBe('Scorpio')

      expect(getZodiacSign('11-21')).toBe('Scorpio')
      expect(getZodiacSign('11-22')).toBe('Sagittarius')

      expect(getZodiacSign('12-21')).toBe('Sagittarius')
      expect(getZodiacSign('12-22')).toBe('Capricorn')

      expect(getZodiacSign('01-19')).toBe('Capricorn')
      expect(getZodiacSign('01-20')).toBe('Aquarius')

      expect(getZodiacSign('02-18')).toBe('Aquarius')
      expect(getZodiacSign('02-19')).toBe('Pisces')
    })
  })

  describe('getZodiacSign - Edge Cases', () => {
    it('should handle leap year date (February 29)', () => {
      expect(getZodiacSign('02-29')).toBe('Pisces')
    })

    it('should handle first day of year', () => {
      expect(getZodiacSign('01-01')).toBe('Capricorn')
    })

    it('should handle last day of year', () => {
      expect(getZodiacSign('12-31')).toBe('Capricorn')
    })

    it('should handle middle of each month', () => {
      expect(getZodiacSign('01-15')).toBe('Capricorn')
      expect(getZodiacSign('02-15')).toBe('Aquarius')
      expect(getZodiacSign('03-15')).toBe('Pisces')
      expect(getZodiacSign('04-15')).toBe('Aries')
      expect(getZodiacSign('05-15')).toBe('Taurus')
      expect(getZodiacSign('06-15')).toBe('Gemini')
      expect(getZodiacSign('07-15')).toBe('Cancer')
      expect(getZodiacSign('08-15')).toBe('Leo')
      expect(getZodiacSign('09-15')).toBe('Virgo')
      expect(getZodiacSign('10-15')).toBe('Libra')
      expect(getZodiacSign('11-15')).toBe('Scorpio')
      expect(getZodiacSign('12-15')).toBe('Sagittarius')
    })
  })

  describe('getZodiacSign - Invalid Inputs', () => {
    it('should throw ZodiacError for invalid date formats', () => {
      expect(() => getZodiacSign('invalid')).toThrow(ZodiacError)
      expect(() => getZodiacSign('2024-03-21')).toThrow(ZodiacError)
      expect(() => getZodiacSign('03/21')).toThrow(ZodiacError)
      expect(() => getZodiacSign('')).toThrow(ZodiacError)
    })

    it('should throw ZodiacError for invalid dates', () => {
      expect(() => getZodiacSign('13-01')).toThrow(ZodiacError)
      expect(() => getZodiacSign('00-01')).toThrow(ZodiacError)
      expect(() => getZodiacSign('02-30')).toThrow(ZodiacError)
      expect(() => getZodiacSign('04-31')).toThrow(ZodiacError)
    })
  })

  describe('getZodiacSignDetails', () => {
    it('should return zodiac sign details', () => {
      const aries = getZodiacSignDetails('03-21')
      expect(aries.name).toBe('Aries')
      expect(aries.symbol).toBe('♈')
      expect(aries.startMonth).toBe(3)
      expect(aries.startDay).toBe(21)
      expect(aries.endMonth).toBe(4)
      expect(aries.endDay).toBe(19)
    })

    it('should return correct details for Capricorn (year-wrap)', () => {
      const capricorn1 = getZodiacSignDetails('12-25')
      expect(capricorn1.name).toBe('Capricorn')
      expect(capricorn1.startMonth).toBe(12)
      expect(capricorn1.endMonth).toBe(1)

      const capricorn2 = getZodiacSignDetails('01-10')
      expect(capricorn2.name).toBe('Capricorn')
    })

    it('should throw ZodiacError for invalid dates', () => {
      expect(() => getZodiacSignDetails('invalid')).toThrow(ZodiacError)
      expect(() => getZodiacSignDetails('13-01')).toThrow(ZodiacError)
    })
  })

  describe('toMMDD', () => {
    it('should convert YYYY-MM-DD string to MM-DD format', () => {
      expect(toMMDD('2024-03-21')).toBe('03-21')
      expect(toMMDD('2024-12-31')).toBe('12-31')
      expect(toMMDD('2024-01-01')).toBe('01-01')
    })

    it('should convert Date object to MM-DD format', () => {
      const date1 = new Date('2024-03-21')
      expect(toMMDD(date1)).toBe('03-21')

      const date2 = new Date('2024-12-25')
      expect(toMMDD(date2)).toBe('12-25')
    })

    it('should handle single-digit months and days with padding', () => {
      expect(toMMDD('2024-01-05')).toBe('01-05')
      expect(toMMDD('2024-09-09')).toBe('09-09')
    })

    it('should throw ZodiacError for invalid dates', () => {
      expect(() => toMMDD('invalid')).toThrow(ZodiacError)
      expect(() => toMMDD('not-a-date')).toThrow(ZodiacError)
    })
  })

  describe('getZodiacSignFromFullDate', () => {
    it('should get zodiac sign from YYYY-MM-DD string', () => {
      expect(getZodiacSignFromFullDate('2024-03-21')).toBe('Aries')
      expect(getZodiacSignFromFullDate('1990-12-25')).toBe('Capricorn')
      expect(getZodiacSignFromFullDate('2000-02-29')).toBe('Pisces') // Leap year
    })

    it('should get zodiac sign from Date object', () => {
      const date1 = new Date('2024-03-21')
      expect(getZodiacSignFromFullDate(date1)).toBe('Aries')

      const date2 = new Date('1990-12-25')
      expect(getZodiacSignFromFullDate(date2)).toBe('Capricorn')
    })

    it('should work with different years', () => {
      expect(getZodiacSignFromFullDate('1985-07-23')).toBe('Leo')
      expect(getZodiacSignFromFullDate('2000-07-23')).toBe('Leo')
      expect(getZodiacSignFromFullDate('2024-07-23')).toBe('Leo')
    })

    it('should throw ZodiacError for invalid dates', () => {
      expect(() => getZodiacSignFromFullDate('invalid')).toThrow(ZodiacError)
      expect(() => getZodiacSignFromFullDate('not-a-date')).toThrow(ZodiacError)
    })
  })

  describe('ZodiacError', () => {
    it('should be instance of Error', () => {
      const error = new ZodiacError('Test error')
      expect(error).toBeInstanceOf(Error)
    })

    it('should have correct name', () => {
      const error = new ZodiacError('Test error')
      expect(error.name).toBe('ZodiacError')
    })

    it('should have correct message', () => {
      const error = new ZodiacError('Custom error message')
      expect(error.message).toBe('Custom error message')
    })
  })

  describe('Comprehensive Coverage - All Dates', () => {
    it('should correctly identify zodiac signs for every day of a non-leap year', () => {
      const testCases = [
        { date: '01-01', sign: 'Capricorn' },
        { date: '01-15', sign: 'Capricorn' },
        { date: '02-01', sign: 'Aquarius' },
        { date: '02-15', sign: 'Aquarius' },
        { date: '03-01', sign: 'Pisces' },
        { date: '03-15', sign: 'Pisces' },
        { date: '04-01', sign: 'Aries' },
        { date: '04-15', sign: 'Aries' },
        { date: '05-01', sign: 'Taurus' },
        { date: '05-15', sign: 'Taurus' },
        { date: '06-01', sign: 'Gemini' },
        { date: '06-15', sign: 'Gemini' },
        { date: '07-01', sign: 'Cancer' },
        { date: '07-15', sign: 'Cancer' },
        { date: '08-01', sign: 'Leo' },
        { date: '08-15', sign: 'Leo' },
        { date: '09-01', sign: 'Virgo' },
        { date: '09-15', sign: 'Virgo' },
        { date: '10-01', sign: 'Libra' },
        { date: '10-15', sign: 'Libra' },
        { date: '11-01', sign: 'Scorpio' },
        { date: '11-15', sign: 'Scorpio' },
        { date: '12-01', sign: 'Sagittarius' },
        { date: '12-15', sign: 'Sagittarius' },
      ]

      testCases.forEach(({ date, sign }) => {
        expect(getZodiacSign(date)).toBe(sign)
      })
    })
  })
})
