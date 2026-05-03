# Styling Guide - LESS + Tailwind CSS

## Overview

This project uses a hybrid approach combining **Tailwind CSS** and **LESS** for styling React Native components.

- **Tailwind CSS**: For utility-first rapid prototyping and predefined utilities
- **LESS**: For custom, component-specific, and advanced styling

## Directory Structure

```
src/styles/
├── index.less              # Main entry point (imports all styles)
├── variables/
│   └── variables.less      # All LESS variables (colors, spacing, typography, etc.)
├── mixins/
│   └── mixins.less         # Reusable LESS mixins
├── global/
│   └── index.less          # Global styles and resets
├── components/
│   └── components.less     # Pre-built component styles
└── utilities/
    └── utilities.less      # Utility classes
```

## LESS Variables

All design tokens are defined in `styles/variables/variables.less`:

### Colors

```less
// Primary
@primary-color: #007AFF;
@primary-light: #0A84FF;
@primary-dark: #0051D5;

// Semantic
@success-color: #34C759;
@danger-color: #FF3B30;
@warning-color: #FF9500;

// Neutral
@gray-100: #F5F5F5;
@gray-500: #9E9E9E;
@gray-900: #212121;
```

### Spacing

```less
@space-xs: 4px;     // Extra small
@space-sm: 8px;     // Small
@space-md: 16px;    // Medium
@space-lg: 24px;    // Large
@space-xl: 32px;    // Extra large
@space-2xl: 48px;   // 2x Extra large
```

### Typography

```less
@font-size-xs: 12px;
@font-size-sm: 14px;
@font-size-base: 16px;
@font-size-lg: 18px;
@font-size-xl: 20px;

@font-weight-normal: 400;
@font-weight-medium: 500;
@font-weight-semibold: 600;
@font-weight-bold: 700;
```

### Border Radius

```less
@radius-sm: 4px;
@radius-base: 8px;
@radius-md: 12px;
@radius-lg: 16px;
@radius-full: 9999px;
```

### Shadows

```less
@shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
@shadow-base: 0 1px 3px rgba(0, 0, 0, 0.1);
@shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
@shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
```

## Using LESS in Components

### 1. Create Component Styles (`.less` file)

```less
// src/components/common/Button.less
@import '../../styles/variables/variables.less';
@import '../../styles/mixins/mixins.less';

.btn {
  .button-base();  // Use mixin
  padding: @space-sm @space-lg;  // Use variables
  
  &.btn-primary {
    background-color: @primary-color;
    
    &:active {
      opacity: 0.8;
    }
  }
}
```

### 2. Import in Component (`.tsx` file)

```typescript
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './Button.less';

export default function Button({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
```

## LESS Mixins

Pre-built mixins for common patterns:

### Flexbox Mixins

```less
.flex-center()        // Center flex container
.flex-between()       // Space between flex items
.flex-column-center() // Column with center alignment
```

### Text Mixins

```less
.text-truncate()      // Truncate with ellipsis
.text-line-clamp(2)   // Clamp to N lines
.text-bold()          // Bold text
.text-semibold()      // Semibold text
```

### Button Mixins

```less
.button-base()              // Base button styles
.button-primary(@color)     // Primary button
.button-secondary()         // Secondary button
```

### Shadow Mixins

```less
.shadow(sm)    // Small shadow
.shadow(base)  // Base shadow
.shadow(md)    // Medium shadow
.shadow(lg)    // Large shadow
```

### Border Radius Mixins

```less
.rounded(@radius)           // All corners
.rounded-t(@radius)         // Top corners
.rounded-b(@radius)         // Bottom corners
.rounded-l(@radius)         // Left corners
.rounded-r(@radius)         // Right corners
```

### Responsive Mixins

```less
.xs(@rules)  // Extra small (< 480px)
.sm(@rules)  // Small (≥ 481px)
.md(@rules)  // Medium (≥ 768px)
.lg(@rules)  // Large (≥ 1024px)
.xl(@rules)  // Extra large (≥ 1280px)
```

**Usage:**

```less
.component {
  width: 100%;
  
  .md(@rules: {
    width: 50%;
  });
}
```

### Transition Mixins

```less
.transition(@property; @duration)  // Custom transition
.transition-all(@duration)         // Transition all properties
```

## Using Tailwind CSS

Tailwind utilities work alongside LESS for quick styling:

```tsx
import { View, Text } from 'react-native';

export default function Component() {
  return (
    <View className="flex justify-center items-center p-4 bg-white rounded-lg shadow">
      <Text className="text-lg font-bold text-primary">Hello</Text>
    </View>
  );
}
```

## Best Practices

### ✅ Do's

1. **Use variables** for all colors, spacing, and typography
   ```less
   color: @primary-color;  // ✅ Good
   padding: @space-md;     // ✅ Good
   ```

2. **Use mixins** to avoid repetition
   ```less
   .component {
     .flex-center();       // ✅ Good
   }
   ```

3. **Keep component styles in separate files**
   ```
   components/
   ├── Button.tsx
   └── Button.less        // ✅ Good
   ```

4. **Organize by purpose, not type**
   ```
   ✅ Good:
   components/common/Button.tsx
   components/common/Button.less
   
   ❌ Bad:
   components/Button.tsx
   styles/buttons.less
   ```

5. **Import variables and mixins** in every LESS file
   ```less
   @import '../../styles/variables/variables.less';
   @import '../../styles/mixins/mixins.less';
   ```

### ❌ Don'ts

1. **Don't hardcode colors**
   ```less
   color: #007AFF;          // ❌ Bad
   color: @primary-color;   // ✅ Good
   ```

2. **Don't hardcode spacing**
   ```less
   padding: 16px;           // ❌ Bad
   padding: @space-md;      // ✅ Good
   ```

3. **Don't create nested selectors too deep**
   ```less
   .btn .text .content {}   // ❌ Bad (3 levels)
   .btn-content {}          // ✅ Good (1 level)
   ```

4. **Don't mix LESS and inline styles**
   ```tsx
   // ❌ Bad
   <View style={[styles.component, { padding: 16 }]} />
   
   // ✅ Good
   <View style={styles.component} />
   ```

5. **Don't create redundant utility classes** (use LESS variables instead)
   ```less
   // ❌ Bad
   .p-4 { padding: 16px; }
   .p-8 { padding: 32px; }
   
   // ✅ Good - use variables directly
   padding: @space-md;
   padding: @space-lg;
   ```

## Creating New Components

### Step 1: Create Component File

```tsx
// src/components/common/Badge.tsx
import React from 'react';
import { View, Text } from 'react-native';
import styles from './Badge.less';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
}

export default function Badge({ label, variant = 'primary' }: BadgeProps) {
  return (
    <View style={[styles.badge, styles[`badge-${variant}`]]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}
```

### Step 2: Create Styles File

```less
// src/components/common/Badge.less
@import '../../styles/variables/variables.less';
@import '../../styles/mixins/mixins.less';

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: @space-xs @space-sm;
  border-radius: @radius-full;
  
  .text {
    font-size: @font-size-xs;
    font-weight: @font-weight-semibold;
  }
  
  &.badge-primary {
    background-color: @primary-color;
    
    .text {
      color: @white;
    }
  }
  
  &.badge-secondary {
    background-color: @gray-200;
    
    .text {
      color: @gray-900;
    }
  }
}
```

### Step 3: Export from Index

```tsx
// src/components/common/index.ts
export { default as Button } from './Button';
export { default as Badge } from './Badge';
```

## Color Theming

Support for light and dark modes:

### Define Theme Variables

```less
// Light theme (default)
@bg-primary: @white;
@text-primary: @gray-900;

// Dark theme (alternative)
@bg-primary-dark: @dark-bg;
@text-primary-dark: @gray-100;
```

### Use in Components

```less
.component {
  background-color: @bg-primary;
  color: @text-primary;
}

.component.dark {
  background-color: @bg-primary-dark;
  color: @text-primary-dark;
}
```

## Responsive Design

Use responsive mixins for mobile-first development:

```less
.component {
  // Mobile first (default)
  width: 100%;
  
  // Tablet and up
  .md(@rules: {
    width: 50%;
  });
  
  // Desktop and up
  .lg(@rules: {
    width: 33.333%;
  });
}
```

## Performance Tips

1. **Use LESS mixins** instead of duplicating styles
2. **Leverage variables** for consistent design tokens
3. **Keep component styles scoped** to component files
4. **Avoid deep nesting** in LESS (max 3 levels)
5. **Use utilities for common patterns** (flex, spacing, etc.)

## Troubleshooting

### LESS Variables Not Working

✅ Solution: Import variables file in your LESS file

```less
@import '../../styles/variables/variables.less';
```

### Styles Not Applied

✅ Solution: Verify the import path is correct and styles are exported as default

```tsx
import styles from './Component.less';  // Must use .less extension
```

### Conflicting Styles

✅ Solution: Use BEM naming convention to scope styles

```less
.button {}
.button-primary {}
.button-primary:active {}
```

