# ✅ Mobile Styling Setup Checklist

Use this checklist when creating new styled components in your React Native app.

## 📋 Component Creation Checklist

### Before You Start
- [ ] Read `STYLING_GUIDE.md` to understand the approach
- [ ] Review `LESS_QUICK_REFERENCE.md` for quick lookups
- [ ] Look at `Button.tsx` + `Button.less` as reference

### Step 1: Create Component File

- [ ] Create component in `src/components/common/` or appropriate folder
- [ ] Name: `YourComponent.tsx`
- [ ] Use clear, descriptive name (PascalCase)
- [ ] Import React and React Native components
- [ ] Import styles: `import styles from './YourComponent.less';`
- [ ] Define props interface with TypeScript
- [ ] Add JSDoc comment explaining component
- [ ] Keep component logic under 300 lines

**Template:**
```tsx
import React from 'react';
import { View, Text } from 'react-native';
import styles from './YourComponent.less';

interface YourComponentProps {
  // Define props
}

/**
 * YourComponent description
 * @example
 * <YourComponent prop="value" />
 */
export default function YourComponent(props: YourComponentProps) {
  return (
    <View style={styles.container}>
      {/* Component content */}
    </View>
  );
}
```

### Step 2: Create Styles File

- [ ] Create `YourComponent.less` in same folder as component
- [ ] Import variables: `@import '../../styles/variables/variables.less';`
- [ ] Import mixins: `@import '../../styles/mixins/mixins.less';`
- [ ] Use descriptive class names (BEM convention)
- [ ] Use `@variables` for all colors and spacing
- [ ] Use `.mixins()` to avoid duplication
- [ ] Add comments explaining complex styles
- [ ] Keep nesting to 3 levels max

**Template:**
```less
@import '../../styles/variables/variables.less';
@import '../../styles/mixins/mixins.less';

/**
 * YourComponent Styles
 */

.container {
  padding: @space-md;
  background-color: @white;
  border-radius: @radius-lg;
  .shadow(base);
  
  .title {
    font-size: @font-size-lg;
    font-weight: @font-weight-semibold;
    color: @primary-color;
  }
  
  .content {
    margin-top: @space-md;
  }
}
```

### Step 3: Export Component

- [ ] Add to `src/components/common/index.ts` (or appropriate index)
- [ ] Follow alphabetical order
- [ ] Use named export with `export { default as ... }`

**Template:**
```ts
export { default as YourComponent } from './YourComponent';
```

### Step 4: Documentation

- [ ] Add JSDoc to component
- [ ] Document all props
- [ ] Add usage example
- [ ] Add props interface with descriptions

**Template:**
```tsx
/**
 * Reusable Component Name
 * 
 * Brief description of what it does.
 * 
 * Usage:
 * - Use when you need X
 * - Works with Y
 * - Supports variants: variant1, variant2
 * 
 * @example
 * <YourComponent 
 *   title="Title"
 *   variant="primary"
 *   onPress={() => handlePress()}
 * />
 */
```

### Step 5: Testing

- [ ] Verify styles import correctly
- [ ] Check component renders without errors
- [ ] Test all variants (if applicable)
- [ ] Test different sizes (if applicable)
- [ ] Verify responsive behavior
- [ ] Check dark mode support (if applicable)

### Step 6: Code Review

- [ ] Styles use `@variables`, not hardcoded values
- [ ] No inline styles in component
- [ ] LESS file imports variables and mixins
- [ ] Class names follow BEM convention
- [ ] Component under 300 lines
- [ ] Styles file under 200 lines
- [ ] Comments explain complex logic
- [ ] No unnecessary nesting

## 🎨 Styling Checklist

### Variables Usage
- [ ] Using `@primary-color` instead of `#007AFF`
- [ ] Using `@space-md` instead of `16px`
- [ ] Using `@font-size-lg` instead of `18px`
- [ ] Using `@gray-100` through `@gray-900` for grays
- [ ] Using `@success-color`, `@danger-color`, etc. for semantic colors
- [ ] Using `@radius-base` through `@radius-lg` for borders

### Mixins Usage
- [ ] Using `.flex-center()` for centered layouts
- [ ] Using `.flex-between()` for space-between
- [ ] Using `.button-base()` for button components
- [ ] Using `.shadow(md)` for shadows
- [ ] Using `.text-truncate()` for text overflow
- [ ] Using `.transition-all()` for animations

### Component Styles
- [ ] Separate file created for component
- [ ] No inline styles in component
- [ ] Class names semantic and descriptive
- [ ] Variants organized with `&.variant-name`
- [ ] States organized with `&:active`, `&:disabled`
- [ ] Responsive styles included where needed

### File Organization
- [ ] Component and styles in same folder
- [ ] File names match (Button.tsx + Button.less)
- [ ] Exported from component folder index
- [ ] LESS imports at top of file
- [ ] Comments above complex sections
- [ ] Consistent formatting and indentation

## 🚫 Common Mistakes to Avoid

- [ ] ❌ NOT hardcoding color values (`#007AFF`)
- [ ] ❌ NOT hardcoding spacing (`16px`)
- [ ] ❌ NOT using inline styles
- [ ] ❌ NOT forgetting LESS variable/mixin imports
- [ ] ❌ NOT creating styles for every component
- [ ] ❌ NOT using semantic class names
- [ ] ❌ NOT documenting component props
- [ ] ❌ NOT organizing by responsibility
- [ ] ❌ NOT checking dark mode support
- [ ] ❌ NOT testing responsive behavior

## 📖 Quick Reference

### Import Statements (Copy-Paste)

**Component File:**
```tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './YourComponent.less';
```

**Styles File:**
```less
@import '../../styles/variables/variables.less';
@import '../../styles/mixins/mixins.less';
```

### Helpful Links

- Full Guide: `docs/STYLING_GUIDE.md`
- Quick Ref: `docs/LESS_QUICK_REFERENCE.md`
- Examples: `docs/STYLING_EXAMPLES.md`
- Implementation: `docs/STYLING_IMPLEMENTATION_SUMMARY.md`

### Most Used Variables

```less
Colors:
@primary-color        @success-color
@danger-color         @warning-color
@white                @gray-100 to @gray-900

Spacing:
@space-xs @space-sm @space-md @space-lg @space-xl

Typography:
@font-size-base       @font-weight-semibold
@font-size-lg         @line-height-normal
```

### Most Used Mixins

```less
.flex-center()
.button-base()
.shadow(base)
.rounded(@radius-md)
.text-truncate()
.transition-all()
```

## ✨ Example Command (Copy-Paste Ready)

```bash
# After creating component:
# 1. Update src/components/common/index.ts
# 2. Run format:
npm run format

# 3. Check for errors:
npm run lint --workspaces

# 4. Start dev:
npm run dev --workspaces
```

---

**Remember:** The goal is **consistency**, **maintainability**, and **scalability**. 

If you're unsure about styling, check existing components first!
