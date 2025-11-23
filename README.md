# 🌟 mojhoroskop

> Modern horoscope application with local-first architecture, accurate astronomical calculations, and real-time sync

## Overview

**mojhoroskop** (My Horoscope) is a full-stack horoscope application built with cutting-edge technologies, combining astronomical precision with modern web development practices.

### Tech Stack

- **Frontend Framework**: [TanStack Start](https://tanstack.com/start) (React 19)
- **Routing**: [TanStack Router](https://tanstack.com/router) - Type-safe file-based routing
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: [PostgreSQL](https://postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team/)
- **Local-First Sync**: [ElectricSQL](https://electric-sql.com/) - Offline-first real-time sync
- **API Framework**: [Hono](https://hono.dev/) - Ultrafast web framework
- **Astronomical Calculations**: [Skyfield](https://rhodesmill.org/skyfield/) - High-precision astronomy library
- **Package Manager**: [Bun](https://bun.sh/) - Fast JavaScript runtime & package manager
- **Testing**: [Vitest](https://vitest.dev/)

## Features

### Wave 1 - Tech Stack (Current)

✅ TanStack Start with React 19
✅ PostgreSQL database with Drizzle ORM
✅ ElectricSQL for local-first sync
✅ Hono API server
✅ Skyfield astronomical calculations
✅ Complete project structure and configuration

### Planned Features

- 🌙 Daily, weekly, monthly, and yearly horoscopes
- ⭐ Birth chart calculations
- 🌍 Planetary position tracking
- 🌘 Moon phase calculations and tracking
- 🔮 Zodiac compatibility analysis
- 📊 Personalized astrological insights
- 📴 Offline-first functionality
- 🔄 Real-time data synchronization

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) >= 1.0
- [PostgreSQL](https://postgresql.org/) >= 16
- [Python](https://python.org/) >= 3.11 (for Skyfield calculations)
- [Docker](https://docker.com/) (optional, for local development)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd mojhoroskop
```

2. **Install dependencies**

```bash
bun install
```

3. **Install Python dependencies**

```bash
pip3 install skyfield
```

4. **Set up environment variables**

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=mojhoroskop

# PostgreSQL Connection URL
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mojhoroskop

# ElectricSQL Configuration
ELECTRIC_SERVICE=http://localhost:5133
ELECTRIC_SYNC_ENABLED=true

# Application
NODE_ENV=development
PORT=3000
API_PORT=3001
```

5. **Start the database (using Docker)**

```bash
docker-compose up -d
```

This will start:
- PostgreSQL on port 5432
- ElectricSQL on port 5133

6. **Run database migrations**

```bash
bun run db:push
```

7. **Seed the database**

```bash
bun run db:seed
```

### Development

Start the development server:

```bash
bun run dev
```

The app will be available at `http://localhost:3000`

Start the API server (in a separate terminal):

```bash
bun run api:dev
```

The API will be available at `http://localhost:3001`

### Database Management

```bash
# Generate migration files
bun run db:generate

# Push schema changes to database
bun run db:push

# Run migrations
bun run db:migrate

# Open Drizzle Studio (database GUI)
bun run db:studio

# Seed database with zodiac signs
bun run db:seed
```

## Project Structure

```
mojhoroskop/
├── src/
│   ├── routes/                 # TanStack Router file-based routes
│   │   ├── __root.tsx         # Root layout
│   │   └── index.tsx          # Home page
│   ├── components/            # React components
│   │   └── Header.tsx
│   ├── api/                   # Hono API server
│   │   ├── index.ts          # API entry point
│   │   └── routes/           # API route handlers
│   │       ├── zodiac.ts     # Zodiac sign endpoints
│   │       ├── horoscope.ts  # Horoscope endpoints
│   │       ├── celestial.ts  # Celestial events endpoints
│   │       └── user.ts       # User endpoints
│   ├── db/                    # Database layer
│   │   ├── index.ts          # Database connection
│   │   ├── schema.ts         # Drizzle schema definitions
│   │   └── seed.ts           # Database seeding
│   ├── lib/                   # Utilities and libraries
│   │   ├── electric.ts       # ElectricSQL configuration
│   │   └── skyfield/         # Astronomical calculations
│   │       ├── index.ts      # TypeScript wrapper
│   │       └── calculator.py # Python Skyfield calculations
│   └── styles.css            # Global styles
├── migrations/                # Database migrations
├── public/                    # Static assets
├── user-stories/              # Project requirements and user stories
├── docker-compose.yml         # Docker services configuration
├── drizzle.config.ts         # Drizzle ORM configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## API Endpoints

### Zodiac Signs

- `GET /api/zodiac` - Get all zodiac signs
- `GET /api/zodiac/:id` - Get zodiac sign by ID
- `GET /api/zodiac/name/:name` - Get zodiac sign by name
- `GET /api/zodiac/date/:date` - Get zodiac sign by birth date (MM-DD)

### Horoscopes

- `GET /api/horoscope/:signName/today` - Get today's horoscope for a sign
- `GET /api/horoscope/:signName/:type` - Get horoscope by type (daily/weekly/monthly/yearly)
- `GET /api/horoscope/date/:date` - Get all horoscopes for a specific date

### Celestial Events

- `GET /api/celestial/upcoming` - Get upcoming celestial events
- `GET /api/celestial/type/:type` - Get events by type
- `GET /api/celestial/range` - Get events in a date range
- `GET /api/celestial/moon/phase` - Get current moon phase
- `GET /api/celestial/planets/positions` - Get planetary positions

### Users

- `GET /api/user/:id` - Get user by ID
- `POST /api/user` - Create new user
- `PATCH /api/user/:id` - Update user
- `GET /api/user/:id/birth-chart` - Get user's birth chart

## Database Schema

### Main Tables

- **zodiac_signs** - 12 zodiac signs with attributes
- **users** - User profiles and birth information
- **horoscopes** - Daily/weekly/monthly/yearly horoscopes
- **birth_charts** - Calculated astrological birth charts
- **celestial_events** - Astronomical events (moon phases, eclipses, etc.)

See `src/db/schema.ts` for complete schema definitions.

## Astronomical Calculations

The app uses [Skyfield](https://rhodesmill.org/skyfield/) for accurate astronomical calculations:

- Planetary positions in zodiac signs
- Moon phases and lunar cycles
- Birth chart generation
- Celestial event predictions
- Ecliptic coordinates

Python calculations are exposed via a TypeScript wrapper in `src/lib/skyfield/index.ts`.

## Building for Production

```bash
bun run build
```

This creates an optimized production build in the `dist/` directory.

## Testing

```bash
# Run tests
bun run test

# Run tests in watch mode
bun test --watch

# Run tests with coverage
bun test --coverage
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style/formatting
- `refactor:` Code refactoring
- `test:` Testing
- `chore:` Maintenance

## Resources

### Documentation

- [TanStack Start Docs](https://tanstack.com/start)
- [TanStack Router Docs](https://tanstack.com/router)
- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [ElectricSQL Docs](https://electric-sql.com/docs)
- [Hono Docs](https://hono.dev/)
- [Skyfield Docs](https://rhodesmill.org/skyfield/)

### Related Projects

- [TanStack Start Examples](https://github.com/TanStack/router/tree/main/examples/react)
- [ElectricSQL Examples](https://github.com/electric-sql/electric/tree/main/examples)

## License

MIT

## Acknowledgments

- TanStack team for the amazing developer tools
- ElectricSQL for local-first sync
- Brandon Rhodes for Skyfield astronomical calculations
- The open-source community

---

**Made with ❤️ and ⭐ by the mojhoroskop team**
