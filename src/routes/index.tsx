import { createFileRoute } from '@tanstack/react-router'
import { useState, FormEvent } from 'react'
import { Sparkles, AlertCircle, Loader2 } from 'lucide-react'
import ZodiacSignCard from '../components/ZodiacSignCard'
import type { ZodiacSign } from '../db/schema'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [zodiacSign, setZodiacSign] = useState<ZodiacSign | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const validateDate = (d: string, m: string, y: string): boolean => {
    const dayNum = parseInt(d)
    const monthNum = parseInt(m)
    const yearNum = parseInt(y)

    // Check if inputs are valid numbers
    if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) {
      setError('Please enter valid numbers for day, month, and year')
      return false
    }

    // Check ranges
    if (monthNum < 1 || monthNum > 12) {
      setError('Month must be between 1 and 12')
      return false
    }

    if (dayNum < 1 || dayNum > 31) {
      setError('Day must be between 1 and 31')
      return false
    }

    if (yearNum < 1900 || yearNum > new Date().getFullYear()) {
      setError(`Year must be between 1900 and ${new Date().getFullYear()}`)
      return false
    }

    // Check if date is valid for the given month
    const daysInMonth = new Date(yearNum, monthNum, 0).getDate()
    if (dayNum > daysInMonth) {
      setError(`Invalid day for the selected month (max ${daysInMonth} days)`)
      return false
    }

    return true
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setZodiacSign(null)

    // Validate input
    if (!day || !month || !year) {
      setError('Please fill in all fields')
      return
    }

    if (!validateDate(day, month, year)) {
      return
    }

    // Format date as MM-DD for API
    const monthPadded = month.padStart(2, '0')
    const dayPadded = day.padStart(2, '0')
    const dateString = `${monthPadded}-${dayPadded}`

    setLoading(true)

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
      const response = await fetch(`${apiUrl}/api/zodiac/date/${dateString}`)

      if (!response.ok) {
        throw new Error('Failed to fetch zodiac sign')
      }

      const data = await response.json()
      setZodiacSign(data)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to determine zodiac sign. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <section className="relative py-12 md:py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
        <div className="relative max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-cyan-400" />
              <h1 className="text-4xl md:text-6xl font-black text-white">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  mojhoroskop
                </span>
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 mb-2 font-light">
              Discover Your Zodiac Sign
            </p>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
              Enter your birth date to find out your zodiac sign and learn about
              your astrological profile
            </p>
          </div>

          {/* Birth Date Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8 shadow-xl max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-semibold text-white mb-6 text-left">
              Enter Your Birth Date
            </h2>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* Month Input */}
              <div>
                <label
                  htmlFor="month"
                  className="block text-sm font-medium text-gray-300 mb-2 text-left"
                >
                  Month
                </label>
                <input
                  id="month"
                  type="number"
                  min="1"
                  max="12"
                  placeholder="MM"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Day Input */}
              <div>
                <label
                  htmlFor="day"
                  className="block text-sm font-medium text-gray-300 mb-2 text-left"
                >
                  Day
                </label>
                <input
                  id="day"
                  type="number"
                  min="1"
                  max="31"
                  placeholder="DD"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Year Input */}
              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-300 mb-2 text-left"
                >
                  Year
                </label>
                <input
                  id="year"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  placeholder="YYYY"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm text-left">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Finding Your Sign...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Find My Zodiac Sign</span>
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Zodiac Sign Result */}
      {zodiacSign && (
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto flex justify-center">
            <ZodiacSignCard sign={zodiacSign} />
          </div>
        </section>
      )}

      {/* Footer Info */}
      <section className="py-12 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-400 text-sm">
            Your zodiac sign is determined by the position of the sun at the time
            of your birth. Each sign has unique characteristics, strengths, and
            traits that influence personality and compatibility.
          </p>
        </div>
      </section>
    </div>
  )
}
