import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from '../theme';

// Abstract fitness runner illustration using geometric shapes
const RunnerIllustration = ({ size = 200 }) => {
  const scale = size / 200;
  const s = (v) => v * scale;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Background circle */}
      <View
        style={[
          styles.bgCircle,
          {
            width: s(180),
            height: s(180),
            borderRadius: s(90),
            top: s(10),
            left: s(10),
          },
        ]}
      />

      {/* Secondary circle accent */}
      <View
        style={[
          styles.accentCircle,
          {
            width: s(100),
            height: s(100),
            borderRadius: s(50),
            top: s(20),
            right: s(10),
          },
        ]}
      />

      {/* Runner emoji / fitness icon */}
      <Text style={[styles.emoji, { fontSize: s(80) }]}>🏃</Text>

      {/* Decorative dots */}
      <View style={[styles.dot, { width: s(12), height: s(12), borderRadius: s(6), bottom: s(30), right: s(20) }]} />
      <View style={[styles.dot, { width: s(8), height: s(8), borderRadius: s(4), top: s(30), left: s(15) }]} />
    </View>
  );
};

const CheckmarkIllustration = ({ size = 100 }) => (
  <View style={[styles.checkContainer, { width: size, height: size, borderRadius: size / 2 }]}>
    <Text style={{ fontSize: size * 0.45, textAlign: 'center' }}>✓</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bgCircle: {
    position: 'absolute',
    backgroundColor: Colors.primaryLight,
    opacity: 0.25,
  },
  accentCircle: {
    position: 'absolute',
    backgroundColor: Colors.accent,
    opacity: 0.15,
  },
  dot: {
    position: 'absolute',
    backgroundColor: Colors.accent,
    opacity: 0.7,
  },
  emoji: {
    textAlign: 'center',
  },
  checkContainer: {
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { RunnerIllustration, CheckmarkIllustration };
