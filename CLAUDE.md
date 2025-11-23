# CLAUDE.md - AI Assistant Development Guide

## Project Overview

**Project Name:** mojhoroskop (My Horoscope)

**Status:** New Project - Initial Setup Phase

**Description:** This appears to be a horoscope application project. The repository is currently in its initial setup phase.

## Repository Structure

```
mojhoroskop/
├── .git/                 # Git repository
└── CLAUDE.md            # This file - AI assistant guide
```

### Expected Structure (To Be Developed)

As this project grows, we anticipate the following structure:

```
mojhoroskop/
├── src/                 # Source code
│   ├── components/      # Reusable components
│   ├── services/        # Business logic and API services
│   ├── utils/          # Utility functions
│   └── types/          # TypeScript type definitions
├── tests/              # Test files
├── docs/               # Documentation
├── public/             # Static assets
├── package.json        # Node.js dependencies (if Node-based)
├── README.md           # Project documentation
└── CLAUDE.md          # This file
```

## Development Workflow

### Branch Strategy

- **Main Branch:** `main` or `master` (to be established)
- **Feature Branches:** Use pattern `feature/description` or `claude/session-id`
- **For AI Assistants:** Always develop on the designated branch provided in task context

### Commit Conventions

Follow these commit message guidelines:

- **Format:** `type: description`
- **Types:**
  - `feat:` New features
  - `fix:` Bug fixes
  - `docs:` Documentation changes
  - `style:` Code style/formatting (no functional changes)
  - `refactor:` Code refactoring
  - `test:` Adding or updating tests
  - `chore:` Maintenance tasks

**Examples:**
```
feat: add zodiac sign calculation
fix: correct date parsing for horoscope
docs: update README with setup instructions
```

### Git Operations

**Push Protocol:**
```bash
git push -u origin <branch-name>
```
- Branch names should follow the pattern specified in task context
- Retry on network failures: up to 4 times with exponential backoff (2s, 4s, 8s, 16s)

**Pull/Fetch Protocol:**
```bash
git fetch origin <branch-name>
git pull origin <branch-name>
```
- Use exponential backoff retry strategy for network failures

## Code Conventions

### General Principles

1. **Keep It Simple:** Avoid over-engineering; implement only what's needed
2. **No Premature Optimization:** Don't add features or abstractions for hypothetical future needs
3. **Clear Naming:** Use descriptive, self-documenting names for variables, functions, and files
4. **Consistent Style:** Follow the project's established code style (to be defined)

### Code Quality Standards

- **Security:** Avoid OWASP Top 10 vulnerabilities (XSS, SQL injection, command injection, etc.)
- **Error Handling:** Add validation only at system boundaries (user input, external APIs)
- **Comments:** Add comments only where logic isn't self-evident
- **Type Safety:** Use TypeScript or appropriate type systems when available

### What NOT to Do

- Don't add features beyond what's requested
- Don't refactor code unnecessarily while fixing bugs
- Don't add docstrings/comments to unchanged code
- Don't create helpers/utilities for one-time operations
- Don't use backwards-compatibility hacks for unused code
- Don't add feature flags without clear requirements

## Technology Stack

**Status:** To Be Determined

Common stacks for horoscope applications:
- **Frontend:** React, Vue.js, or vanilla JavaScript
- **Backend:** Node.js, Python (Flask/Django), or PHP
- **Database:** PostgreSQL, MySQL, or MongoDB
- **APIs:** RESTful or GraphQL

*This section will be updated once the tech stack is established.*

## Development Setup

### Prerequisites

*To be documented once project dependencies are defined*

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mojhoroskop

# Install dependencies (example - adjust based on actual stack)
npm install
# or
pip install -r requirements.txt
```

### Running the Application

*To be documented once the application is developed*

```bash
# Development mode (example)
npm run dev
# or
python manage.py runserver
```

### Running Tests

*To be documented once tests are implemented*

```bash
# Example commands
npm test
# or
pytest
```

## Key Features (Planned)

Based on the project name "mojhoroskop" (My Horoscope), expected features may include:

1. **Zodiac Sign Determination:** Calculate user's zodiac sign from birth date
2. **Daily Horoscopes:** Display daily horoscope readings
3. **Compatibility Checking:** Check compatibility between zodiac signs
4. **Personalization:** Save user preferences and birth information
5. **Multilingual Support:** Support for multiple languages (Czech/Slovak/English)

*Update this section as features are implemented*

## API Integration

If using external horoscope APIs, document them here:

- **API Name:** TBD
- **Authentication:** TBD
- **Rate Limits:** TBD
- **Endpoints:** TBD

## Database Schema

*To be documented once database structure is established*

Example tables might include:
- `users` - User profiles and birth information
- `horoscopes` - Daily horoscope content
- `zodiac_signs` - Zodiac sign information
- `compatibility` - Compatibility matrices

## Testing Strategy

### Test Types

1. **Unit Tests:** Test individual functions and components
2. **Integration Tests:** Test API endpoints and service interactions
3. **E2E Tests:** Test complete user workflows

### Coverage Goals

- Aim for 80%+ code coverage
- 100% coverage for critical business logic
- All security-sensitive code must be tested

## Deployment

*To be documented once deployment strategy is established*

Possible platforms:
- **Frontend:** Vercel, Netlify, GitHub Pages
- **Backend:** Heroku, AWS, DigitalOcean
- **Database:** Managed database services

## AI Assistant Guidelines

### When Working on This Project

1. **Always Read First:** Never propose changes to code you haven't read
2. **Use Task Tracking:** Use TodoWrite tool for complex multi-step tasks
3. **Explore Systematically:** Use the Explore agent for understanding codebase structure
4. **Security First:** Always check for common vulnerabilities
5. **Test Your Changes:** Run tests before committing
6. **Commit Frequently:** Make atomic commits with clear messages

### Before Making Changes

- [ ] Read the relevant files
- [ ] Understand the existing patterns
- [ ] Check for similar implementations
- [ ] Consider security implications
- [ ] Plan the changes (use TodoWrite for complex tasks)

### After Making Changes

- [ ] Test the changes
- [ ] Check for unintended side effects
- [ ] Update documentation if needed
- [ ] Commit with a clear message
- [ ] Push to the designated branch

### Common Tasks

**Adding a New Feature:**
1. Read related existing code
2. Plan implementation (use TodoWrite)
3. Implement with tests
4. Update documentation
5. Commit and push

**Fixing a Bug:**
1. Reproduce the issue
2. Locate the problematic code
3. Fix with minimal changes
4. Add regression test
5. Commit and push

**Refactoring:**
1. Only refactor when explicitly requested
2. Ensure tests pass before and after
3. Make incremental changes
4. Keep commits atomic

## Resources

### Documentation

*Links to be added as documentation is created*

- Project README: `README.md` (to be created)
- API Documentation: TBD
- Architecture Decisions: TBD

### External Resources

- Zodiac sign information and calculations
- Horoscope content sources
- Astrological compatibility algorithms

## Project Status & Roadmap

**Current Phase:** Initial Setup

### Immediate Next Steps

1. Define technology stack
2. Set up basic project structure
3. Create README.md with project description
4. Set up development environment
5. Implement core features

### Future Milestones

- [ ] MVP with basic horoscope display
- [ ] User authentication and profiles
- [ ] Personalized horoscopes
- [ ] Mobile responsiveness
- [ ] Multi-language support

## Changelog

### 2025-11-23
- Initial CLAUDE.md created
- Repository structure documented
- Development guidelines established
- AI assistant workflows defined

---

**Last Updated:** 2025-11-23
**Maintained By:** AI Assistants working on this project
**Review Frequency:** Update this file whenever significant project changes occur
