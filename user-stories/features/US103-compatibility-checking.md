# US103: Compatibility Checking

## User Story

As a **user**, I want to **check zodiac sign compatibility** so that **I can learn about relationship dynamics between different signs**.

## Description

Implement a feature that allows users to check the compatibility between two zodiac signs, providing insights into potential relationship strengths and challenges.

## Acceptance Criteria

- [ ] User can select two zodiac signs to compare
- [ ] Compatibility percentage/rating is displayed
- [ ] Detailed compatibility analysis is provided
- [ ] Multiple compatibility aspects are covered:
  - [ ] Romantic compatibility
  - [ ] Friendship compatibility
  - [ ] Work/professional compatibility
- [ ] Compatibility strengths are highlighted
- [ ] Potential challenges are mentioned
- [ ] Advice/tips for the pairing are included
- [ ] UI is intuitive with clear sign selection
- [ ] Results are visually appealing (charts, icons, colors)
- [ ] Ability to share compatibility results (optional)

## Priority

**Medium** - Important feature but not critical for MVP

## Estimated Effort

**Large** - 12-16 hours

## Dependencies

- US101: Zodiac Sign Determination
- US002: Project Structure Setup
- US004: Development Environment Setup

## Technical Notes

Compatibility matrix needs to be defined:
- Create compatibility scores for all 144 sign combinations (12x12)
- Define compatibility criteria based on astrological principles
- Consider element compatibility (Fire, Earth, Air, Water)
- Consider modality compatibility (Cardinal, Fixed, Mutable)

Database schema:
```
compatibility table:
- id
- sign_1
- sign_2
- compatibility_score
- romantic_description
- friendship_description
- work_description
- strengths
- challenges
- advice
```

Element groups:
- Fire: Aries, Leo, Sagittarius
- Earth: Taurus, Virgo, Capricorn
- Air: Gemini, Libra, Aquarius
- Water: Cancer, Scorpio, Pisces

## Testing Requirements

- [ ] Unit tests for compatibility calculation logic
- [ ] Test all 144 sign combinations
- [ ] UI tests for sign selection
- [ ] Test symmetric compatibility (A+B = B+A)
- [ ] Validate compatibility score ranges

## Related Stories

- US101: Zodiac Sign Determination
- US104: User Personalization
- US105: Multilingual Support
