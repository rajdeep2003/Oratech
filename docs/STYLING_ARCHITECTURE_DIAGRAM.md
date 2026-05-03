# 📐 Styling Architecture Diagram

## Complete Style System Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    App Component                                 │
│                   (HomeScreen.tsx)                               │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
         ┌──────────▼─────────┐   ┌──▼─────────────┐
         │ Component Style    │   │ Tailwind CSS   │
         │ (HomeScreen.less)  │   │  (Utilities)   │
         └──────────┬─────────┘   └────────────────┘
                    │
        ┌───────────┴────────────┐
        │                        │
   ┌────▼──────────┐    ┌────────▼──────┐
   │ LESS Variables │    │ LESS Mixins   │
   │ (60+ tokens)   │    │ (40+ helpers) │
   └────────┬───────┘    └────────┬──────┘
            │                     │
     ┌──────┴─────────────────────┴──────┐
     │                                   │
┌────▼─────────┐ ┌─────────┐ ┌─────────┐│
│ variables    │ │ mixins  │ │ global  ││
│ .less        │ │ .less   │ │ .less   ││
└──────────────┘ └─────────┘ └─────────┘│
                                        │
                 ┌──────────────────────┘
                 │
         ┌───────▼────────┐
         │  styles/       │
         │  index.less    │
         │ (Main Entry)   │
         └────────────────┘
              ▲
              │ Imported by
              │
    ┌─────────┴─────────┐
    │                   │
┌───▼──────────┐  ┌────▼────────┐
│ Components   │  │ Screens     │
│ *.tsx files  │  │ *.tsx files │
└──────────────┘  └─────────────┘
```

## Component-to-Styles Mapping

```
📁 components/common/
│
├── Button.tsx ──────────────┐
├── Button.less             │
│                           │
├── Input.tsx ──────────────┼─ Follows same pattern
├── Input.less              │
│                           │
├── Card.tsx ───────────────┤
├── Card.less               │
│                           │
└── index.ts ───────────────┴─ Exports all components

Each component:
  1. Component file (.tsx)
     - Logic & JSDoc
     - Imports styles
     
  2. Styles file (.less)
     - Imports variables & mixins
     - Uses semantic class names
     - No hardcoded values
```

## Import Chain

```
                     Component.tsx
                           │
                           ├─ import styles from './Component.less'
                           │
                           └─ use in JSX: style={styles.className}
                                   │
                                   ▼
                           Component.less
                                   │
                 ┌─────────────────┼─────────────────┐
                 │                 │                 │
                 ▼                 ▼                 ▼
    @import      │ variables.less  │ mixins.less │
                 │                 │                 │
              ┌──▼──┐           ┌──▼──┐          ┌──▼──┐
              │ 60+ │           │ 40+ │          │ fn  │
              │ var │           │ mix │          │ lib │
              └─────┘           └─────┘          └─────┘
```

## Data Flow Example

```
HomeScreen Component
    │
    ├─ Imports Button component
    │       │
    │       └─ Button.tsx loads Button.less
    │               │
    │               ├─ @import variables.less
    │               │   └─ @primary-color: #007AFF
    │               │
    │               └─ Uses: background-color: @primary-color
    │
    └─ Renders <Button style={styles.btn} />
            │
            └─ CSS Applied: background-color: #007AFF
```

## File Organization Map

```
apps/mobile/src/
│
├── styles/                          ← All style files
│   ├── index.less                  ← Main entry (imports all)
│   ├── variables/
│   │   └── variables.less          ← 60+ design tokens
│   ├── mixins/
│   │   └── mixins.less             ← 40+ reusable mixins
│   ├── global/
│   │   └── index.less              ← Base/reset styles
│   ├── components/
│   │   └── components.less         ← Pre-built styles
│   ├── utilities/
│   │   └── utilities.less          ← Utility classes
│   └── themes/
│       └── colors.ts               ← Color config
│
├── components/
│   ├── common/
│   │   ├── Button.tsx              ← Component
│   │   ├── Button.less             ← Styles
│   │   ├── Input.tsx               ← Component
│   │   ├── Input.less              ← Styles
│   │   ├── Card.tsx                ← Component
│   │   ├── Card.less               ← Styles
│   │   └── index.ts                ← Exports
│   │
│   └── screens/
│       ├── HomeScreen.tsx          ← Screen component
│       └── HomeScreen.less         ← Screen styles
│
└── ... other files
```

## Styling Hierarchy

```
Global Styles (Base)
    ↓
    ├─ Typography: h1, h2, p, a, etc.
    ├─ Forms: input, textarea, select
    ├─ Links: a with hover states
    └─ Utilities: hidden, clearfix, etc.
            ↓
Component Styles (Specific)
    ├─ Button.less
    ├─ Input.less
    ├─ Card.less
    ├─ Badge.less
    └─ Alert.less
            ↓
Screen Styles (Page)
    ├─ HomeScreen.less
    ├─ ProfileScreen.less
    └─ SettingsScreen.less
            ↓
Tailwind Utilities (Override/Enhance)
    └─ className="text-lg font-bold"
```

## Variable Usage Pattern

```
src/styles/variables/variables.less
    │
    ├─ @primary-color: #007AFF
    ├─ @space-md: 16px
    ├─ @font-size-lg: 18px
    └─ 50+ more variables
            │
            ├─ Imported in component.less
            │
            └─ Used: padding: @space-md;
                     color: @primary-color;
                     font-size: @font-size-lg;
```

## Mixin Usage Pattern

```
src/styles/mixins/mixins.less
    │
    ├─ .flex-center() → display flex + center
    ├─ .button-base() → common button styles
    ├─ .shadow(sm|base|md|lg|xl) → box-shadow
    ├─ .text-truncate() → ellipsis
    └─ 35+ more mixins
            │
            ├─ Imported in component.less
            │
            └─ Used: .flex-center();
                     .button-base();
                     .shadow(md);
```

## Class Naming Convention (BEM)

```
Component Class Name
    │
    ├─ .btn                    ← Block (main element)
    │   ├─ .btn-primary        ← Modifier (variant)
    │   ├─ .btn-secondary      ← Modifier
    │   ├─ .btn-sm             ← Modifier (size)
    │   ├─ .btn-lg             ← Modifier
    │   └─ &:active            ← State
    │
    ├─ .btn-text               ← Element
    │   └─ &:active            ← Element state
    │
    └─ &:disabled              ← Block state
```

## Responsive Design Flow

```
Mobile First (Default)
    width: 100%;
        │
        ▼
    .xs() { ... }     ← < 480px
        │
        ▼
    .sm() { ... }     ← ≥ 481px
        │
        ▼
    .md() { ... }     ← ≥ 768px (tablet)
        │
        ▼
    .lg() { ... }     ← ≥ 1024px (desktop)
        │
        ▼
    .xl() { ... }     ← ≥ 1280px (wide)
```

## Development Workflow

```
1. Create Component
   └─ MyComponent.tsx
           │
2. Create Styles
   └─ MyComponent.less
           │
           ├─ Import: variables.less
           ├─ Import: mixins.less
           └─ Use: @variables and .mixins()
           │
3. Export Component
   └─ Update index.ts
           │
4. Test & Verify
   └─ npm run dev
           │
5. Format Code
   └─ npm run format
           │
6. Ready to Use!
   └─ import { MyComponent } from '@components/common'
```

## Performance & Optimization

```
Source Files
    │
    ├─ 60+ LESS variables        ← Centralized
    │
    ├─ 40+ LESS mixins           ← Reusable
    │
    └─ Component .less files     ← Scoped
            │
            ▼
    LESS Compilation
            │
            ├─ Replace @variables with values
            │
            ├─ Expand .mixins()
            │
            └─ Merge styles
            │
            ▼
    Optimized CSS Output
            │
            └─ Ready for deployment
```

---

**Key Takeaway:** 
All styling flows through the **variables** and **mixins** layer, ensuring consistency, maintainability, and scalability across your entire mobile app.

