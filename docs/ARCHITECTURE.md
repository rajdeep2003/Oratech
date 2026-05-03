# Architecture Overview

## Project Structure Philosophy

This project follows a **monorepo** architecture with clear separation between frontend (mobile), backend, and shared code.

### Core Principles

1. **Separation of Concerns**: Each layer handles specific responsibilities
2. **DRY (Don't Repeat Yourself)**: Shared code in `packages/shared`
3. **Type Safety**: Full TypeScript implementation
4. **Scalability**: Easy to add new features without affecting existing code
5. **Testability**: Clear boundaries make testing easier

## Folder Structure Rationale

### Mobile App (`apps/mobile/`)

```
src/
├── components/
│   ├── common/     → Reusable UI components (Button, Card, Input, etc.)
│   └── screens/    → Full-screen components for navigation
├── navigation/     → Navigation configuration (stacks, tabs, etc.)
├── services/       → External integrations (API, Auth)
├── store/          → Redux/Context for state management
├── hooks/          → Custom React hooks
├── utils/
│   ├── helpers/    → Helper functions (formatting, parsing)
│   ├── validators/ → Input validation logic
│   └── constants/  → App-wide constants
├── styles/         → Theme configuration and styles
├── assets/         → Images, fonts, etc.
├── config/         → Environment-specific configuration
├── context/        → React Context providers
└── types/          → TypeScript definitions
```

**Key Decisions:**
- Components are organized by responsibility (common vs screens)
- All utilities are in separate files for easy location and reuse
- Styles are NOT mixed with components (separate themes folder)
- Services handle all external communication

### Backend API (`apps/backend/`)

```
src/
├── routes/         → API endpoint definitions
├── controllers/    → Request handlers (entry point for API)
├── services/       → Business logic (reusable)
├── models/         → Database schemas
├── middleware/     → Request interceptors (auth, validation, etc.)
├── utils/
│   ├── helpers/    → Utility functions
│   ├── validators/ → Request validation rules
│   └── constants/  → Error messages, status codes, etc.
├── config/         → Configuration management
├── types/          → TypeScript interfaces
├── database/       → DB setup and migrations
└── app.ts          → Express app configuration
```

**Key Decisions:**
- MVC pattern for clear responsibility
- Controllers → Services → Models flow
- Middleware for cross-cutting concerns
- Utils organized by functionality, not type

### Shared Package (`packages/shared/`)

```
├── types/          → Shared interfaces (User, Product, Order)
├── utils/          → Shared functions (validation, formatting)
└── constants/      → App-wide constants
```

**Key Decisions:**
- Used as an npm package by both mobile and backend
- Ensures single source of truth for types
- Reduces duplication and improves maintainability

## Import Strategy

### Good Practices ✅
```typescript
// Organized imports
import { validateEmail } from '@utils/validators/inputValidators';
import { formatDate } from '@utils/helpers/formatters';
import { API_ENDPOINTS } from '@utils/constants/apiEndpoints';

// From shared
import type { User, ApiResponse } from '@shared/types';
import { capitalize, isValidEmail } from '@shared/utils';
```

### Bad Practices ❌
```typescript
// Barrel exports encourage mixing concerns
import { validateEmail, formatDate, API_ENDPOINTS } from '@utils';

// Long relative paths are hard to maintain
import { validateEmail } from '../../../utils/validators';

// Mixing concerns in one file
import { UI, validation, API, formatting } from '@utils';
```

## Code Organization Guidelines

### File Size
- **Components**: Keep under 300 lines
- **Services**: Keep under 200 lines
- **Utilities**: Keep under 150 lines
- **Models**: Keep under 150 lines

### File Naming
- **React Components**: `PascalCase.tsx`
- **Utilities/Functions**: `camelCase.ts`
- **Constants**: `UPPER_SNAKE_CASE.ts`
- **Types/Interfaces**: `PascalCase.ts`

### One Responsibility Per File
- One main export per file
- Related utilities can be grouped (e.g., `formatters.ts` with similar functions)
- Clear purpose from filename

## Dependency Flow

### Mobile App
```
Screens/Components
    ↓
Hooks (useApi, useAuth, etc.)
    ↓
Services (API, Auth)
    ↓
API Client
    ↓
Backend
```

### Backend API
```
Routes
    ↓
Controllers
    ↓
Services
    ↓
Database Models
    ↓
Database
```

### Both Apps
```
Components/Controllers
    ↓
Types & Utilities (from @shared)
    ↓
Shared Package
```

## Configuration Management

### Environment-specific
- Development: `.env.development`
- Production: `.env.production`

### Configuration Files
- Mobile: `app.json` (Expo config), `tailwind.config.js`
- Backend: Config loaded from environment variables
- Root: `tsconfig.json` for TypeScript paths

## Testing Strategy

### Backend
- Unit tests in `tests/unit/`
- Integration tests in `tests/integration/`
- Run with Jest

### Mobile
- Component tests in `__tests__/`
- Run with Jest and React Testing Library

## State Management

### Mobile
- Redux for global state
- Context for providers
- Local component state for temporary UI state

### Backend
- Database for persistence
- In-memory cache where needed
- No client-side state

