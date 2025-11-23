import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PYTHON_SCRIPT = join(__dirname, 'calculator.py')

/**
 * Execute Python skyfield calculator
 */
async function executePython<T = any>(command: string, args: string[] = []): Promise<T> {
  return new Promise((resolve, reject) => {
    const python = spawn('python3', [PYTHON_SCRIPT, command, ...args])

    let stdout = ''
    let stderr = ''

    python.stdout.on('data', (data) => {
      stdout += data.toString()
    })

    python.stderr.on('data', (data) => {
      stderr += data.toString()
    })

    python.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Python process exited with code ${code}: ${stderr}`))
        return
      }

      try {
        const result = JSON.parse(stdout)
        if (result.error) {
          reject(new Error(result.error))
        } else {
          resolve(result)
        }
      } catch (error) {
        reject(new Error(`Failed to parse Python output: ${stdout}`))
      }
    })

    python.on('error', (error) => {
      reject(error)
    })
  })
}

/**
 * Planetary position data
 */
export interface PlanetaryPosition {
  longitude: number
  latitude: number
  distance: number
  zodiacSign: string
  degrees: number
}

export interface PlanetaryPositions {
  timestamp: string
  positions: Record<string, PlanetaryPosition>
}

/**
 * Calculate planetary positions for a given date
 */
export async function calculatePlanetaryPositions(date?: string): Promise<PlanetaryPositions> {
  const args = date ? [date] : []
  return executePython<PlanetaryPositions>('planetary-positions', args)
}

/**
 * Moon phase data
 */
export interface MoonPhase {
  timestamp: string
  phase: number
  phaseName: string
  illumination: number
  elongation: number
  zodiacSign: string
  distance: number
}

/**
 * Calculate current moon phase
 */
export async function calculateMoonPhase(date?: string): Promise<MoonPhase> {
  const args = date ? [date] : []
  return executePython<MoonPhase>('moon-phase', args)
}

/**
 * Moon phase event
 */
export interface MoonPhaseEvent {
  timestamp: string
  type: 'New Moon' | 'First Quarter' | 'Full Moon' | 'Last Quarter'
  phaseIndex: number
}

/**
 * Find moon phase events in a date range
 */
export async function findMoonPhases(startDate: string, endDate: string): Promise<MoonPhaseEvent[]> {
  return executePython<MoonPhaseEvent[]>('moon-phases', [startDate, endDate])
}

/**
 * Birth chart data
 */
export interface BirthChart {
  birthDateTime: string
  location: {
    latitude: number
    longitude: number
  }
  planetaryPositions: Record<string, PlanetaryPosition>
  sunSign: string
  moonSign: string
  risingSign: string | null
}

/**
 * Calculate birth chart
 */
export async function calculateBirthChart(
  birthDateTime: string,
  latitude: number,
  longitude: number
): Promise<BirthChart> {
  return executePython<BirthChart>('birth-chart', [
    birthDateTime,
    latitude.toString(),
    longitude.toString(),
  ])
}

/**
 * Get zodiac sign from birth date
 */
export async function getZodiacSignFromDate(birthDate: Date): Promise<string> {
  const positions = await calculatePlanetaryPositions(birthDate.toISOString())
  return positions.positions.Sun.zodiacSign
}
