# LESS Quick Reference

## Common Patterns

### Flexbox Center
```less
.container {
  .flex-center();  // Centered flex container
}
```

### Component Layout
```less
.card {
  background-color: @white;
  border-radius: @radius-lg;
  .shadow(md);
  padding: @space-lg;
}
```

### Button States
```less
.btn {
  .button-primary();  // Primary button
  
  &:active {
    opacity: 0.8;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

### Text Truncation
```less
.title {
  .text-truncate();  // Single line with ellipsis
}

.description {
  .text-line-clamp(3);  // Max 3 lines with ellipsis
}
```

### Spacing
```less
.component {
  margin: @space-md;
  padding: @space-lg;
  gap: @space-sm;
}
```

### Responsive
```less
.grid {
  .xs({
    grid-template-columns: 1fr;
  });
  
  .md({
    grid-template-columns: 1fr 1fr;
  });
}
```

### Transitions
```less
.btn {
  .transition-all();  // Default duration
  
  &:hover {
    color: @primary-color;
  }
}
```

### Shadows
```less
.card {
  .shadow(base);  // sm, base, md, lg, xl
}
```

### Rounded Corners
```less
.btn {
  .rounded(@radius-md);      // All corners
  .rounded-t(@radius-md);    // Top
  .rounded-b(@radius-md);    // Bottom
}
```

## Variable Reference

### Colors
```less
@primary-color        // Main brand color
@success-color        // Success/positive
@danger-color         // Danger/negative
@warning-color        // Warning state
@gray-100 to @gray-900  // Grayscale
```

### Spacing
```less
@space-xs   // 4px
@space-sm   // 8px
@space-md   // 16px
@space-lg   // 24px
@space-xl   // 32px
```

### Font
```less
@font-size-xs to @font-size-3xl   // Font sizes
@font-weight-normal to @font-weight-bold  // Font weights
@line-height-tight/normal/relaxed  // Line heights
```

### Border Radius
```less
@radius-sm      // 4px
@radius-base    // 8px
@radius-md      // 12px
@radius-lg      // 16px
@radius-full    // 9999px (rounded)
```

