/**
 * STYLING EXAMPLES
 * 
 * This file demonstrates various styling patterns used in the project
 */

// ============================================
// Example 1: Simple Component with LESS
// ============================================

// components/common/Avatar.tsx
/*
import React from 'react';
import { View, Image } from 'react-native';
import styles from './Avatar.less';

interface AvatarProps {
  source: { uri: string };
  size?: 'sm' | 'md' | 'lg';
  border?: boolean;
}

export default function Avatar({ source, size = 'md', border = false }: AvatarProps) {
  return (
    <View style={[styles.avatar, styles[`avatar-${size}`], border && styles['avatar-border']]}>
      <Image source={source} style={styles.image} />
    </View>
  );
}
*/

// components/common/Avatar.less
/*
@import '../../styles/variables/variables.less';

.avatar {
  background-color: @gray-200;
  .flex-center();
  
  .image {
    width: 100%;
    height: 100%;
  }
  
  &.avatar-sm {
    .square(32px);
    border-radius: @radius-md;
  }
  
  &.avatar-md {
    .square(48px);
    border-radius: @radius-lg;
  }
  
  &.avatar-lg {
    .square(64px);
    border-radius: @radius-xl;
  }
  
  &.avatar-border {
    border: 2px solid @primary-color;
  }
}
*/

// ============================================
// Example 2: Complex Component with State
// ============================================

// components/common/Tabs.tsx
/*
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './Tabs.less';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTabId?: string;
}

export default function Tabs({ tabs, defaultTabId }: TabsProps) {
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id);
  const activeTab = tabs.find(t => t.id === activeTabId);

  return (
    <View style={styles.tabs}>
      <View style={styles['tabs-list']}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles['tabs-trigger'],
              activeTabId === tab.id && styles['tabs-trigger-active'],
            ]}
            onPress={() => setActiveTabId(tab.id)}
          >
            <Text style={styles['tabs-label']}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles['tabs-content']}>
        {activeTab && activeTab.content}
      </View>
    </View>
  );
}
*/

// components/common/Tabs.less
/*
@import '../../styles/variables/variables.less';
@import '../../styles/mixins/mixins.less';

.tabs {
  width: 100%;
  
  &-list {
    display: flex;
    border-bottom: 1px solid @gray-200;
  }
  
  &-trigger {
    flex: 1;
    padding: @space-md;
    text-align: center;
    .transition(all);
    border-bottom: 2px solid transparent;
    
    &.tabs-trigger-active {
      border-bottom-color: @primary-color;
    }
    
    &-label {
      font-weight: @font-weight-semibold;
      color: @gray-600;
    }
    
    &.tabs-trigger-active .tabs-label {
      color: @primary-color;
    }
  }
  
  &-content {
    padding: @space-lg;
  }
}
*/

// ============================================
// Example 3: Responsive Grid Layout
// ============================================

// components/sections/ProductGrid.tsx
/*
import React from 'react';
import { View } from 'react-native';
import ProductCard from '../common/ProductCard';
import styles from './ProductGrid.less';

export default function ProductGrid({ products }) {
  return (
    <View style={styles.grid}>
      {products.map((product) => (
        <View key={product.id} style={styles['grid-item']}>
          <ProductCard product={product} />
        </View>
      ))}
    </View>
  );
}
*/

// components/sections/ProductGrid.less
/*
@import '../../styles/variables/variables.less';

.grid {
  display: grid;
  gap: @space-md;
  
  // Mobile: 1 column
  grid-template-columns: 1fr;
  
  &-item {
    width: 100%;
  }
  
  // Tablet: 2 columns
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  // Desktop: 3 columns
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
*/

// ============================================
// Example 4: Using Mixins and Variables
// ============================================

// components/common/Modal.tsx
/*
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Modal.less';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
}

export default function Modal({ title, children, visible, onClose }: ModalProps) {
  if (!visible) return null;
  
  return (
    <View style={styles['modal-overlay']}>
      <View style={styles['modal-content']}>
        <Text style={styles['modal-title']}>{title}</Text>
        <View style={styles['modal-body']}>{children}</View>
        <TouchableOpacity
          style={styles['modal-close']}
          onPress={onClose}
        >
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
*/

// components/common/Modal.less
/*
@import '../../styles/variables/variables.less';
@import '../../styles/mixins/mixins.less';

.modal {
  &-overlay {
    .absolute-full();
    background-color: rgba(0, 0, 0, 0.5);
    .flex-center();
    z-index: @z-modal;
  }
  
  &-content {
    background-color: @white;
    border-radius: @radius-lg;
    .shadow(xl);
    width: 90%;
    max-width: 500px;
    overflow: hidden;
  }
  
  &-title {
    font-size: @font-size-xl;
    font-weight: @font-weight-bold;
    padding: @space-lg;
    border-bottom: 1px solid @gray-200;
    background-color: @light-bg;
  }
  
  &-body {
    padding: @space-lg;
  }
  
  &-close {
    padding: @space-md;
    border-top: 1px solid @gray-200;
    background-color: @light-bg;
    .flex-center();
    .transition(background-color);
    
    &:active {
      background-color: @gray-200;
    }
  }
}
*/

// ============================================
// Example 5: Theme Support (Light/Dark)
// ============================================

// components/common/ThemedCard.tsx
/*
import React, { useContext } from 'react';
import { View } from 'react-native';
import { ThemeContext } from '@context/ThemeContext';
import styles from './ThemedCard.less';

export default function ThemedCard({ children }) {
  const { isDark } = useContext(ThemeContext);
  
  return (
    <View style={[styles.card, isDark && styles['card-dark']]}>
      {children}
    </View>
  );
}
*/

// components/common/ThemedCard.less
/*
@import '../../styles/variables/variables.less';

// Light mode (default)
.card {
  background-color: @white;
  color: @gray-900;
}

// Dark mode
.card.card-dark {
  background-color: @dark-bg;
  color: @gray-100;
  border-color: @gray-800;
}
*/

// ============================================
// Best Practices Summary
// ============================================

/*
DO:
✅ Import variables and mixins at the top of every .less file
✅ Use @variables for all colors, spacing, and typography
✅ Use .mixins() to avoid duplicating common patterns
✅ Keep each component's styles in a separate .less file
✅ Use semantic class names (e.g., .btn-primary, not .blue-button)
✅ Organize with BEM naming for nested elements

DON'T:
❌ Hardcode colors or spacing values
❌ Write inline styles in components
❌ Create styles in random folders
❌ Mix styling approaches
❌ Use deep nesting (more than 3 levels)
❌ Create duplicate utility classes

IMPORTS:
Always import these at the top of component .less files:
@import '../../styles/variables/variables.less';
@import '../../styles/mixins/mixins.less';
*/
