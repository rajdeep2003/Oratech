# LESS + Tailwind Integration Summary

## What Was Added

### 1. **Organized Styles Folder Structure**

```
src/styles/
├── index.less              # Main entry point (imports all styles)
├── variables/
│   └── variables.less      # All LESS variables
├── mixins/
│   └── mixins.less         # Reusable mixins
├── global/
│   └── index.less          # Global styles and resets
├── components/
│   └── components.less     # Pre-built component styles
└── utilities/
    └── utilities.less      # Utility classes
```

### 2. **Comprehensive LESS Setup**

- **60+ LESS Variables** for colors, spacing, typography, shadows, etc.
- **40+ LESS Mixins** for common patterns (flexbox, buttons, text, shadows, responsive)
- **Global Styles** with resets and base styles
- **Component Styles** with pre-built Button, Card, Badge, Alert, etc.
- **Utility Classes** for common styling needs

### 3. **Example Components**

Created three example components showing best practices:
- `Button.tsx` / `Button.less` - Simple component with variants
- `Input.tsx` / `Input.less` - Form input with error handling
- `Card.tsx` / `Card.less` - Container component with shadow options
- `HomeScreen.tsx` / `HomeScreen.less` - Screen showing component usage

### 4. **Documentation**

- `STYLING_GUIDE.md` - Comprehensive styling documentation
- `LESS_QUICK_REFERENCE.md` - Quick reference for common patterns
- `STYLING_EXAMPLES.md` - Real-world examples of 5 complex components
- Updated `DEVELOPMENT_GUIDELINES.md` - Styling section added

### 5. **Dependencies Added**

Updated `package.json` with:
- `less@^4.2.0` - LESS compiler
- `less-loader@^11.1.0` - Webpack loader for LESS

## Key Features

### ✨ LESS Variables System

```less
// Colors
@primary-color: #007AFF;
@danger-color: #FF3B30;
@gray-100 through @gray-900;

// Spacing
@space-xs to @space-2xl;

// Typography
@font-size-xs to @font-size-3xl;
@font-weight-normal to @font-weight-bold;

// Border Radius
@radius-sm to @radius-full;

// Shadows
@shadow-sm to @shadow-xl;
```

### 🎨 LESS Mixins

```less
// Layout
.flex-center()
.flex-between()
.flex-column-center()

// Text
.text-truncate()
.text-line-clamp(@lines)

// Buttons
.button-base()
.button-primary(@color)

// Shadows
.shadow(sm | base | md | lg | xl)

// Responsive
.xs() .sm() .md() .lg() .xl()

// And many more...
```

### 📱 Separate Styles Per Component

Each component has its own `.less` file:

```
components/common/
├── Button.tsx
├── Button.less         ← Component styles
├── Input.tsx
├── Input.less          ← Component styles
├── Card.tsx
└── Card.less           ← Component styles
```

### 🎯 No Inline Styles

All styling is in LESS files, components are clean:

```tsx
// ✅ Good
import styles from './Button.less';
<TouchableOpacity style={styles.btn} />

// ❌ Bad
<TouchableOpacity style={{ backgroundColor: '#007AFF', padding: 16 }} />
```

### 🔄 Hybrid Approach

Use LESS for custom styles AND Tailwind for utilities:

```tsx
// LESS for component styles
import styles from './Component.less';
<View style={styles.container} />

// Tailwind for rapid utilities
<Text className="text-lg font-bold text-primary">Title</Text>
```

## Usage Examples

### Creating a New Component

1. **Create component file:**
   ```tsx
   // src/components/common/Badge.tsx
   import React from 'react';
   import { View, Text } from 'react-native';
   import styles from './Badge.less';

   export default function Badge({ label, variant }) {
     return (
       <View style={[styles.badge, styles[`badge-${variant}`]]}>
         <Text style={styles.text}>{label}</Text>
       </View>
     );
   }
   ```

2. **Create styles file:**
   ```less
   // src/components/common/Badge.less
   @import '../../styles/variables/variables.less';
   @import '../../styles/mixins/mixins.less';

   .badge {
     .flex-center();
     padding: @space-xs @space-sm;
     border-radius: @radius-full;
     
     &.badge-primary {
       background-color: @primary-color;
       
       .text {
         color: @white;
       }
     }
   }
   ```

3. **Use in your app:**
   ```tsx
   import { Badge } from '@components/common';

   <Badge label="New" variant="primary" />
   ```

### Using LESS Variables

Always reference variables instead of hardcoding:

```less
.component {
  color: @primary-color;        // ✅ Good
  padding: @space-md;           // ✅ Good
  background: @light-bg;        // ✅ Good
  
  color: #007AFF;               // ❌ Bad
  padding: 16px;                // ❌ Bad
  background: #F2F2F7;          // ❌ Bad
}
```

### Using Mixins

Avoid duplicating common patterns:

```less
.button {
  .button-base();       // ✅ Good - uses mixin
  .flex-center();       // ✅ Good - uses mixin
  .transition();        // ✅ Good - uses mixin
  
  display: flex;        // ❌ Bad - duplicate code
  align-items: center;  // ❌ Bad - duplicate code
}
```

## Benefits

✅ **Consistency** - Single source of truth for design tokens
✅ **Maintainability** - Easy to update colors, spacing globally
✅ **Reusability** - Mixins prevent code duplication
✅ **Organization** - Separate styles per component
✅ **Scalability** - Easy to add new components
✅ **Performance** - Compiled LESS is efficient
✅ **Flexibility** - Supports both utility-first and component-based approaches

## Next Steps

1. Install dependencies:
   ```bash
   npm install
   ```

2. Review the styling guide:
   ```
   See: docs/STYLING_GUIDE.md
   ```

3. Check quick reference:
   ```
   See: docs/LESS_QUICK_REFERENCE.md
   ```

4. Review examples:
   ```
   See: docs/STYLING_EXAMPLES.md
   ```

5. Create your first component using the pattern shown in `Button`, `Input`, or `Card`

## Files Modified/Created

### New Files
- `src/styles/index.less`
- `src/styles/variables/variables.less`
- `src/styles/mixins/mixins.less`
- `src/styles/global/index.less`
- `src/styles/components/components.less`
- `src/styles/utilities/utilities.less`
- `src/components/common/Button.tsx`
- `src/components/common/Button.less`
- `src/components/common/Input.tsx`
- `src/components/common/Input.less`
- `src/components/common/Card.tsx`
- `src/components/common/Card.less`
- `src/components/common/index.ts`
- `src/components/screens/HomeScreen.less`
- `docs/STYLING_GUIDE.md`
- `docs/LESS_QUICK_REFERENCE.md`
- `docs/STYLING_EXAMPLES.md`

### Modified Files
- `src/components/screens/HomeScreen.tsx` - Updated with example components
- `apps/mobile/package.json` - Added LESS dependencies
- `README.md` - Updated structure documentation
- `docs/DEVELOPMENT_GUIDELINES.md` - Added styling section

## Command Reference

```bash
# Start development
npm run dev --workspaces

# Build everything
npm run build --workspaces

# Format code
npm run format

# Lint code
npm run lint --workspaces

# Install dependencies
npm install
```

---

**Total Styling Setup:**
- 6 style layer files
- 60+ variables
- 40+ mixins
- 3 example components
- 4 comprehensive guides
- Mobile-first responsive design support
