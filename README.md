# ORA - Full Stack Application

A comprehensive monorepo project with React Native (Expo) mobile application and Express Node.js backend, built with modern best practices.

## 📋 Project Structure

### Overview
```
ora/
├── apps/
│   ├── mobile/          # React Native Expo mobile app
│   └── backend/         # Express Node.js backend server
├── packages/
│   └── shared/          # Shared utilities, types, and constants
├── docs/                # Documentation
├── scripts/             # Build and utility scripts
└── package.json         # Root workspace configuration
```

## 🚀 Tech Stack

**Mobile:**
- React Native with Expo
- Nativewind (Tailwind CSS for React Native)
- LESS for custom component styles
- Redux/Context API for state management
- TypeScript

**Backend:**
- Node.js with Express.js
- TypeScript
- Google Cloud / AWS EC2 deployment ready
- RESTful API architecture

**Deployment:**
- Mobile: Vercel (EAS Build integration)
- Backend: Google Cloud or AWS EC2

## 📁 Detailed Structure

### Mobile App (`apps/mobile/`)
```
src/
├── components/
│   ├── common/          # Reusable UI components
│   └── screens/         # Screen-level components
├── navigation/          # Navigation configuration and structure
├── services/
│   ├── api/            # API client and requests
│   └── auth/           # Authentication services
├── store/              # State management (Redux/Context)
│   ├── actions/
│   └── reducers/
├── hooks/              # Custom React hooks
├── utils/              # Utility functions (organized by purpose)
│   ├── helpers/        # Helper functions
│   ├── validators/     # Input validation
│   └── constants/      # App constants
├── styles/
│   ├── index.less               # Main LESS entry point
│   ├── variables/
│   │   └── variables.less       # Colors, spacing, typography vars
│   ├── mixins/
│   │   └── mixins.less          # Reusable LESS mixins
│   ├── global/
│   │   └── index.less           # Global styles and resets
│   ├── components/
│   │   └── components.less      # Pre-built component styles
│   ├── utilities/
│   │   └── utilities.less       # Utility classes
│   └── themes/
│       └── colors.ts            # Theme color definitions
├── assets/
│   ├── images/         # Image assets
│   └── fonts/          # Custom fonts
├── config/             # Configuration files
├── context/            # React Context providers
├── types/              # TypeScript type definitions
└── App.tsx             # Root component
```

### Backend API (`apps/backend/`)
```
src/
├── routes/             # API endpoint routes
├── controllers/        # Request handlers and business logic
├── services/           # Business logic and external service calls
├── models/             # Database models and schemas
├── middleware/         # Express middleware
├── utils/              # Utility functions (organized by purpose)
│   ├── helpers/        # Helper functions
│   ├── validators/     # Request validation
│   └── constants/      # App constants
├── config/             # Configuration management
├── types/              # TypeScript type definitions
├── database/           # Database setup and migrations
└── app.ts              # Express app setup

tests/
├── unit/               # Unit tests
└── integration/        # Integration tests
```

### Shared Package (`packages/shared/`)
```
├── types/              # Shared TypeScript types and interfaces
├── utils/              # Shared utility functions
└── constants/          # Shared constants across apps
```

## 🎯 Best Practices Implemented

### 1. **Separation of Concerns**
   - Business logic separated from UI components
   - Services handle external API calls
   - Utilities are organized by purpose
   - Strict file organization

### 2. **File Organization**
   - Feature-based structure for mobile
   - MVC pattern for backend
   - Each file has a single responsibility
   - Related files grouped together

### 3. **Utility Functions**
   - Helpers for common operations (formatting, parsing, etc.)
   - Validators for input validation
   - Constants for app-wide values
   - All utilities in separate files

### 4. **Styling Strategy**
   - Mobile: Nativewind + Tailwind CSS
   - Separate style files (not clubbed in components)
   - Theme configuration in one place
   - Reusable style utilities

### 5. **Module Management**
   - Shared types in `packages/shared/types`
   - Monorepo workspace setup for code reuse
   - Barrel exports (index.ts) for clean imports
   - Clear dependency management

### 6. **Type Safety**
   - Full TypeScript implementation
   - Centralized type definitions
   - Shared interfaces between mobile and backend

### 7. **Environment Configuration**
   - Environment-based config files
   - Separate dev, test, and production configs
   - No hardcoded values

## 🚦 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Expo CLI: `npm install -g expo-cli`

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Mobile Development:**
   ```bash
   cd apps/mobile
   npm run dev
   ```

3. **Backend Development:**
   ```bash
   cd apps/backend
   npm run dev
   ```

## 📝 File Naming Conventions

- **Components:** PascalCase (e.g., `UserProfile.tsx`)
- **Utilities/Functions:** camelCase (e.g., `formatDate.ts`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)
- **Types/Interfaces:** PascalCase (e.g., `User.ts`)
- **Styles:** kebab-case with component name (e.g., `user-profile.css`)

## 🔄 Import Structure

**Good:**
```typescript
// Import from organized utils
import { validateEmail } from '@utils/validators/emailValidator';
import { formatDate } from '@utils/helpers/dateHelper';
import { API_BASE_URL } from '@utils/constants/apiEndpoints';
```

**Avoid:**
```typescript
// Don't mix concerns or use long relative paths
import { validateEmail, formatDate, API_BASE_URL } from '@utils';
import x from '../../../../../utils/validators';
```

## 📦 Monorepo Commands

```bash
# Install in all workspaces
npm install

# Run dev in all workspaces
npm run dev --workspaces

# Build all apps
npm run build --workspaces

# Format all code
npm run format

# Run linting
npm run lint --workspaces
```

## 🌐 Deployment

- **Mobile:** Deploy with EAS Build to Vercel
- **Backend:** Deploy to Google Cloud Run or AWS EC2

## 📚 Documentation

See `/docs` folder for:
- API documentation
- Setup guides
- Architecture decisions
- Development guidelines

## 📄 License

MIT

