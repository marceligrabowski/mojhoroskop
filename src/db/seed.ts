import { db, closeDatabase } from './index'
import { zodiacSigns } from './schema'

const zodiacSignsData = [
  {
    name: 'Aries',
    symbol: '♈',
    element: 'Fire',
    quality: 'Cardinal',
    rulingPlanet: 'Mars',
    startDate: '03-21',
    endDate: '04-19',
    description: 'Bold, ambitious, and energetic. Aries are natural leaders who love challenges.',
    traits: ['courageous', 'determined', 'confident', 'enthusiastic', 'optimistic', 'honest', 'passionate'],
  },
  {
    name: 'Taurus',
    symbol: '♉',
    element: 'Earth',
    quality: 'Fixed',
    rulingPlanet: 'Venus',
    startDate: '04-20',
    endDate: '05-20',
    description: 'Reliable, patient, and devoted. Taurus values stability and comfort.',
    traits: ['reliable', 'patient', 'practical', 'devoted', 'responsible', 'stable'],
  },
  {
    name: 'Gemini',
    symbol: '♊',
    element: 'Air',
    quality: 'Mutable',
    rulingPlanet: 'Mercury',
    startDate: '05-21',
    endDate: '06-20',
    description: 'Curious, adaptable, and communicative. Geminis love learning and socializing.',
    traits: ['gentle', 'affectionate', 'curious', 'adaptable', 'quick-learner', 'witty'],
  },
  {
    name: 'Cancer',
    symbol: '♋',
    element: 'Water',
    quality: 'Cardinal',
    rulingPlanet: 'Moon',
    startDate: '06-21',
    endDate: '07-22',
    description: 'Intuitive, emotional, and nurturing. Cancers are deeply connected to family and home.',
    traits: ['tenacious', 'loyal', 'emotional', 'sympathetic', 'persuasive', 'imaginative'],
  },
  {
    name: 'Leo',
    symbol: '♌',
    element: 'Fire',
    quality: 'Fixed',
    rulingPlanet: 'Sun',
    startDate: '07-23',
    endDate: '08-22',
    description: 'Creative, passionate, and generous. Leos love to be in the spotlight.',
    traits: ['creative', 'passionate', 'generous', 'warm-hearted', 'cheerful', 'humorous'],
  },
  {
    name: 'Virgo',
    symbol: '♍',
    element: 'Earth',
    quality: 'Mutable',
    rulingPlanet: 'Mercury',
    startDate: '08-23',
    endDate: '09-22',
    description: 'Analytical, practical, and hardworking. Virgos pay attention to detail.',
    traits: ['loyal', 'analytical', 'kind', 'hardworking', 'practical', 'systematic'],
  },
  {
    name: 'Libra',
    symbol: '♎',
    element: 'Air',
    quality: 'Cardinal',
    rulingPlanet: 'Venus',
    startDate: '09-23',
    endDate: '10-22',
    description: 'Diplomatic, fair-minded, and social. Libras seek balance and harmony.',
    traits: ['cooperative', 'diplomatic', 'gracious', 'fair-minded', 'social'],
  },
  {
    name: 'Scorpio',
    symbol: '♏',
    element: 'Water',
    quality: 'Fixed',
    rulingPlanet: 'Pluto',
    startDate: '10-23',
    endDate: '11-21',
    description: 'Passionate, resourceful, and determined. Scorpios are intense and mysterious.',
    traits: ['resourceful', 'brave', 'passionate', 'stubborn', 'loyal', 'ambitious'],
  },
  {
    name: 'Sagittarius',
    symbol: '♐',
    element: 'Fire',
    quality: 'Mutable',
    rulingPlanet: 'Jupiter',
    startDate: '11-22',
    endDate: '12-21',
    description: 'Optimistic, freedom-loving, and adventurous. Sagittarians love to explore.',
    traits: ['generous', 'idealistic', 'great-sense-of-humor', 'adventurous', 'philosophical'],
  },
  {
    name: 'Capricorn',
    symbol: '♑',
    element: 'Earth',
    quality: 'Cardinal',
    rulingPlanet: 'Saturn',
    startDate: '12-22',
    endDate: '01-19',
    description: 'Disciplined, ambitious, and responsible. Capricorns are goal-oriented achievers.',
    traits: ['responsible', 'disciplined', 'self-control', 'good-managers', 'ambitious'],
  },
  {
    name: 'Aquarius',
    symbol: '♒',
    element: 'Air',
    quality: 'Fixed',
    rulingPlanet: 'Uranus',
    startDate: '01-20',
    endDate: '02-18',
    description: 'Progressive, original, and independent. Aquarians are humanitarian thinkers.',
    traits: ['progressive', 'original', 'independent', 'humanitarian', 'innovative'],
  },
  {
    name: 'Pisces',
    symbol: '♓',
    element: 'Water',
    quality: 'Mutable',
    rulingPlanet: 'Neptune',
    startDate: '02-19',
    endDate: '03-20',
    description: 'Compassionate, artistic, and intuitive. Pisces are deeply empathetic.',
    traits: ['compassionate', 'artistic', 'intuitive', 'gentle', 'wise', 'musical'],
  },
]

async function seed() {
  console.log('🌱 Seeding database...')

  try {
    // Insert zodiac signs
    console.log('📋 Inserting zodiac signs...')
    await db.insert(zodiacSigns).values(zodiacSignsData).onConflictDoNothing()

    console.log('✅ Database seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  } finally {
    await closeDatabase()
  }
}

// Run seed if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seed()
}

export { seed }
