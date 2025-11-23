import type { ZodiacSign } from '../db/schema'

interface ZodiacSignCardProps {
  sign: ZodiacSign
}

export default function ZodiacSignCard({ sign }: ZodiacSignCardProps) {
  // Format date range for display (convert MM-DD to Month Day)
  const formatDateRange = (startDate: string, endDate: string) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]

    const [startMonth, startDay] = startDate.split('-').map(Number)
    const [endMonth, endDay] = endDate.split('-').map(Number)

    const startMonthName = monthNames[startMonth - 1]
    const endMonthName = monthNames[endMonth - 1]

    return `${startMonthName} ${startDay} - ${endMonthName} ${endDay}`
  }

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/30 rounded-2xl p-8 shadow-2xl shadow-cyan-500/20 max-w-2xl w-full">
      {/* Header with symbol and name */}
      <div className="text-center mb-6">
        <div className="text-8xl mb-4 text-cyan-400" aria-label={`${sign.name} symbol`}>
          {sign.symbol}
        </div>
        <h2 className="text-4xl font-bold text-white mb-2">
          {sign.name}
        </h2>
        <p className="text-xl text-cyan-300 font-medium">
          {formatDateRange(sign.startDate, sign.endDate)}
        </p>
      </div>

      {/* Description */}
      <div className="mb-6">
        <p className="text-gray-300 text-lg leading-relaxed text-center">
          {sign.description || 'No description available.'}
        </p>
      </div>

      {/* Attributes grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <h3 className="text-cyan-400 font-semibold mb-2 text-sm uppercase tracking-wide">
            Element
          </h3>
          <p className="text-white text-lg font-medium">
            {sign.element}
          </p>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <h3 className="text-cyan-400 font-semibold mb-2 text-sm uppercase tracking-wide">
            Ruling Planet
          </h3>
          <p className="text-white text-lg font-medium">
            {sign.rulingPlanet}
          </p>
        </div>

        {sign.quality && (
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 md:col-span-2">
            <h3 className="text-cyan-400 font-semibold mb-2 text-sm uppercase tracking-wide">
              Quality
            </h3>
            <p className="text-white text-lg font-medium">
              {sign.quality}
            </p>
          </div>
        )}
      </div>

      {/* Traits (if available) */}
      {sign.traits && Array.isArray(sign.traits) && sign.traits.length > 0 && (
        <div className="mt-6 bg-slate-700/30 rounded-lg p-4 border border-slate-600">
          <h3 className="text-cyan-400 font-semibold mb-3 text-sm uppercase tracking-wide">
            Key Traits
          </h3>
          <div className="flex flex-wrap gap-2">
            {sign.traits.map((trait, index) => (
              <span
                key={index}
                className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium border border-cyan-500/30"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
