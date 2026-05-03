# Development Guidelines

## Styling

### LESS + Tailwind CSS Architecture

This project uses a hybrid styling approach:
- **LESS** for component-specific and custom styles
- **Tailwind CSS** for utility-first rapid development

**Key Principles:**
- Each component has its own `.less` file (e.g., `Button.tsx` → `Button.less`)
- Styles are NOT inline - always use separate LESS files
- Use LESS variables for colors, spacing, and typography
- Use LESS mixins to avoid repetition

**Example:**

```tsx
// src/components/common/Button.tsx
import styles from './Button.less';

export default function Button() {
  return <TouchableOpacity style={styles.btn} />;
}
```

```less
// src/components/common/Button.less
@import '../../styles/variables/variables.less';
@import '../../styles/mixins/mixins.less';

.btn {
  .button-base();
  padding: @space-sm @space-lg;
  background-color: @primary-color;
}
```

See `STYLING_GUIDE.md` for comprehensive styling documentation.

## Code Style

### TypeScript

#### Type Definitions
```typescript
// ✅ Good: Use interfaces for object structures
interface User {
  id: string;
  email: string;
  name: string;
}

// ✅ Good: Use types for unions and primitives
type UserRole = 'admin' | 'user' | 'guest';
type ApiStatus = 'success' | 'error' | 'loading';

// ❌ Avoid: Any type
const value: any = data; // Don't do this

// ✅ Good: Use unknown and type guards
const value: unknown = data;
if (typeof value === 'string') {
  // Now value is string
}
```

#### Function Types
```typescript
// ✅ Good: Explicit return types
export const getUserById = (id: string): Promise<User> => {
  // ...
};

// ✅ Good: Type function parameters
export const calculateTotal = (items: OrderItem[]): number => {
  // ...
};
```

### Error Handling

```typescript
// ✅ Good: Throw typed errors
export class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
  }
}

// ✅ Good: Handle errors explicitly
try {
  const result = await apiCall();
} catch (error) {
  if (error instanceof ValidationError) {
    // Handle validation error
  }
}

// ❌ Avoid: Silent failures
try {
  const result = await apiCall();
} catch (error) {
  // Don't ignore errors
}
```

## Naming Conventions

### Variables
```typescript
// ✅ Good: Clear, descriptive names
const isAuthenticated = true;
const userEmail = 'user@example.com';
const maxRetries = 3;

// ❌ Avoid: Unclear abbreviations
const auth = true;
const ue = 'user@example.com';
const mr = 3;
```

### Functions
```typescript
// ✅ Good: Action-based names
export const validateEmail = (email: string): boolean => {};
export const fetchUsers = (): Promise<User[]> => {};
export const formatDate = (date: Date): string => {};

// ❌ Avoid: Ambiguous names
export const email = (email: string): boolean => {};
export const users = (): Promise<User[]> => {};
export const date = (date: Date): string => {};
```

## Commenting

```typescript
// ✅ Good: Document purpose, not what (code shows what)
/**
 * Formats date to user-friendly format
 * @param date - Date to format
 * @returns Formatted date string (e.g., "January 1, 2024")
 */
export const formatDate = (date: Date): string => {
  // Implementation...
};

// ❌ Avoid: Stating the obvious
const x = 5; // Set x to 5

// ✅ Good: Comment on why, not what
// Cache user data for 5 minutes to reduce API calls
const CACHE_TTL = 5 * 60 * 1000;

// ❌ Avoid: Outdated comments
const value = 10; // TODO: Update this (never updated)
```

## Testing

### Mobile (React Testing Library)

```typescript
import { render, screen, fireEvent } from '@testing-library/react-native';
import UserProfile from './UserProfile';

describe('UserProfile', () => {
  it('should display user information', () => {
    const user = { id: '1', name: 'John', email: 'john@example.com' };
    render(<UserProfile user={user} />);
    
    expect(screen.getByText('John')).toBeTruthy();
    expect(screen.getByText('john@example.com')).toBeTruthy();
  });

  it('should handle user update', () => {
    const mockUpdate = jest.fn();
    render(<UserProfile user={user} onUpdate={mockUpdate} />);
    
    fireEvent.press(screen.getByText('Update'));
    expect(mockUpdate).toHaveBeenCalled();
  });
});
```

### Backend (Jest)

```typescript
import request from 'supertest';
import app from '@app';
import { User } from '@models';

describe('GET /api/users/:id', () => {
  it('should return user by id', async () => {
    const response = await request(app)
      .get('/api/users/123')
      .expect(200);

    expect(response.body).toHaveProperty('id', '123');
    expect(response.body).toHaveProperty('email');
  });

  it('should return 404 for non-existent user', async () => {
    await request(app)
      .get('/api/users/nonexistent')
      .expect(404);
  });
});
```

## Performance Tips

### Mobile
- Use React.memo for expensive components
- Lazy load screens with React.lazy
- Optimize list rendering with FlatList
- Debounce API calls

```typescript
// ✅ Good: Memoize expensive components
const UserCard = React.memo(({ user }: Props) => (
  <View>...</View>
));

// ✅ Good: Debounce search
const debouncedSearch = debounce(
  (query: string) => searchUsers(query),
  300
);
```

### Backend
- Use pagination for large datasets
- Cache frequently accessed data
- Use indexing in database queries
- Implement request timeouts

```typescript
// ✅ Good: Pagination
app.get('/api/users', (req, res) => {
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 20;
  // Fetch with limit and offset
});

// ✅ Good: Caching
const cache = new Map();
const getUser = async (id: string) => {
  if (cache.has(id)) return cache.get(id);
  const user = await User.findById(id);
  cache.set(id, user);
  return user;
};
```

## Debugging

### Mobile (React Native Debugger)
1. Install: `npm install -g react-native-debugger`
2. Open debugger
3. Add breakpoints in VSCode
4. Use console.log for quick debugging
5. Redux DevTools for state debugging

### Backend
1. Add breakpoints in VSCode
2. Run with debugger: `node --inspect-brk dist/index.js`
3. Use console.error for errors
4. Use structured logging in production

## Git Workflow

### Commit Messages
```
✅ Good:
- feat: Add user authentication
- fix: Fix date formatting bug
- docs: Update API documentation
- refactor: Reorganize utility functions
- test: Add tests for validateEmail

❌ Avoid:
- updated code
- fixed bug
- stuff
```

### Branch Naming
```
✅ Good:
- feature/user-authentication
- bugfix/date-formatting
- docs/api-documentation

❌ Avoid:
- my-branch
- fix
- test123
```

