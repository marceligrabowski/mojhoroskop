#!/usr/bin/env python3
"""
Astronomical calculations using Skyfield library.
This module provides functions for calculating planetary positions, moon phases,
and other celestial events for horoscope generation.
"""

import sys
import json
from datetime import datetime, timezone
from skyfield.api import load, wgs84
from skyfield import almanac

# Load ephemeris data
planets = load('de421.bsp')  # JPL ephemeris
ts = load.timescale()

# Celestial bodies
sun = planets['sun']
moon = planets['moon']
earth = planets['earth']
mercury = planets['mercury']
venus = planets['venus']
mars = planets['mars']
jupiter = planets['jupiter barycenter']
saturn = planets['saturn barycenter']
uranus = planets['uranus barycenter']
neptune = planets['neptune barycenter']
pluto = planets['pluto barycenter']

ZODIAC_SIGNS = [
    ('Aries', 0, 30),
    ('Taurus', 30, 60),
    ('Gemini', 60, 90),
    ('Cancer', 90, 120),
    ('Leo', 120, 150),
    ('Virgo', 150, 180),
    ('Libra', 180, 210),
    ('Scorpio', 210, 240),
    ('Sagittarius', 240, 270),
    ('Capricorn', 270, 300),
    ('Aquarius', 300, 330),
    ('Pisces', 330, 360),
]

def get_zodiac_sign(longitude):
    """Get zodiac sign from ecliptic longitude."""
    # Normalize to 0-360 range
    longitude = longitude % 360

    for sign, start, end in ZODIAC_SIGNS:
        if start <= longitude < end:
            return sign
    return 'Pisces'  # Fallback

def calculate_planetary_positions(date_str=None):
    """Calculate positions of all planets for a given date."""
    if date_str:
        dt = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
    else:
        dt = datetime.now(timezone.utc)

    t = ts.from_datetime(dt)

    planets_data = {
        'Sun': sun,
        'Moon': moon,
        'Mercury': mercury,
        'Venus': venus,
        'Mars': mars,
        'Jupiter': jupiter,
        'Saturn': saturn,
        'Uranus': uranus,
        'Neptune': neptune,
        'Pluto': pluto,
    }

    positions = {}

    for name, planet in planets_data.items():
        # Calculate position relative to Earth
        astrometric = earth.at(t).observe(planet)
        apparent = astrometric.apparent()

        # Get ecliptic coordinates
        lat, lon, distance = apparent.ecliptic_latlon()

        # Get zodiac sign
        zodiac = get_zodiac_sign(lon.degrees)

        positions[name] = {
            'longitude': lon.degrees,
            'latitude': lat.degrees,
            'distance': distance.au,
            'zodiacSign': zodiac,
            'degrees': lon.degrees % 30,  # Degrees within the sign
        }

    return {
        'timestamp': dt.isoformat(),
        'positions': positions,
    }

def calculate_moon_phase(date_str=None):
    """Calculate the current moon phase."""
    if date_str:
        dt = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
    else:
        dt = datetime.now(timezone.utc)

    t = ts.from_datetime(dt)

    # Calculate sun and moon positions
    e = earth.at(t)
    s = e.observe(sun).apparent()
    m = e.observe(moon).apparent()

    # Calculate elongation (angle between sun and moon)
    elongation = s.separation_from(m).degrees

    # Calculate phase (0 = new moon, 0.5 = full moon, 1 = new moon)
    phase = (1 - ((elongation / 180))) / 2

    # Determine phase name
    if phase < 0.0625:
        phase_name = 'New Moon'
    elif phase < 0.1875:
        phase_name = 'Waxing Crescent'
    elif phase < 0.3125:
        phase_name = 'First Quarter'
    elif phase < 0.4375:
        phase_name = 'Waxing Gibbous'
    elif phase < 0.5625:
        phase_name = 'Full Moon'
    elif phase < 0.6875:
        phase_name = 'Waning Gibbous'
    elif phase < 0.8125:
        phase_name = 'Last Quarter'
    else:
        phase_name = 'Waning Crescent'

    # Get moon's zodiac sign
    lat, lon, distance = m.ecliptic_latlon()
    zodiac = get_zodiac_sign(lon.degrees)

    return {
        'timestamp': dt.isoformat(),
        'phase': phase,
        'phaseName': phase_name,
        'illumination': abs(phase - 0.5) * 2,  # 0 to 1
        'elongation': elongation,
        'zodiacSign': zodiac,
        'distance': distance.au,
    }

def find_moon_phases(start_date, end_date):
    """Find all moon phase events (new and full moons) in a date range."""
    start_dt = datetime.fromisoformat(start_date.replace('Z', '+00:00'))
    end_dt = datetime.fromisoformat(end_date.replace('Z', '+00:00'))

    t0 = ts.from_datetime(start_dt)
    t1 = ts.from_datetime(end_dt)

    # Find moon phases
    times, phases = almanac.find_discrete(t0, t1, almanac.moon_phases(planets))

    events = []
    phase_names = ['New Moon', 'First Quarter', 'Full Moon', 'Last Quarter']

    for time, phase in zip(times, phases):
        events.append({
            'timestamp': time.utc_iso(),
            'type': phase_names[phase],
            'phaseIndex': int(phase),
        })

    return events

def calculate_birth_chart(birth_datetime, latitude, longitude):
    """Calculate a birth chart for given birth details."""
    dt = datetime.fromisoformat(birth_datetime.replace('Z', '+00:00'))
    t = ts.from_datetime(dt)

    # Create location object
    location = earth + wgs84.latlon(latitude, longitude)

    # Calculate planetary positions
    positions = calculate_planetary_positions(birth_datetime)

    # Calculate houses (simplified - using equal house system)
    # In a full implementation, you'd use a proper house calculation

    return {
        'birthDateTime': dt.isoformat(),
        'location': {
            'latitude': latitude,
            'longitude': longitude,
        },
        'planetaryPositions': positions['positions'],
        'sunSign': positions['positions']['Sun']['zodiacSign'],
        'moonSign': positions['positions']['Moon']['zodiacSign'],
        # Rising sign would require more complex calculations
        'risingSign': None,
    }

def main():
    """Main entry point for CLI usage."""
    if len(sys.argv) < 2:
        print(json.dumps({'error': 'No command provided'}))
        sys.exit(1)

    command = sys.argv[1]

    try:
        if command == 'planetary-positions':
            date_str = sys.argv[2] if len(sys.argv) > 2 else None
            result = calculate_planetary_positions(date_str)
        elif command == 'moon-phase':
            date_str = sys.argv[2] if len(sys.argv) > 2 else None
            result = calculate_moon_phase(date_str)
        elif command == 'moon-phases':
            start = sys.argv[2]
            end = sys.argv[3]
            result = find_moon_phases(start, end)
        elif command == 'birth-chart':
            birth_dt = sys.argv[2]
            lat = float(sys.argv[3])
            lon = float(sys.argv[4])
            result = calculate_birth_chart(birth_dt, lat, lon)
        else:
            result = {'error': f'Unknown command: {command}'}

        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({'error': str(e)}))
        sys.exit(1)

if __name__ == '__main__':
    main()
