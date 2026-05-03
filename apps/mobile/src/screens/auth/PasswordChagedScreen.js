import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import { Colors, Typography, Spacing, Radius, Shadow } from '../theme';

const PasswordChangedScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const rippleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Check icon pop-in
    Animated.sequence([
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 6,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Text/button slide-up
    Animated.sequence([
      Animated.delay(400),
      Animated.spring(slideAnim, { toValue: 0, tension: 55, friction: 8, useNativeDriver: true }),
    ]).start();

    // Ripple animation loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(rippleAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(rippleAnim, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const rippleScale = rippleAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 2.2] });
  const rippleOpacity = rippleAnim.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0] });

  return (
    <ScreenContainer keyboardAvoiding={false} contentStyle={styles.container}>
      <View style={styles.inner}>
        {/* Checkmark with ripple */}
        <View style={styles.checkSection}>
          {/* Ripple rings */}
          <Animated.View
            style={[
              styles.ripple,
              styles.rippleLarge,
              { transform: [{ scale: rippleScale }], opacity: rippleOpacity },
            ]}
          />
          <Animated.View
            style={[
              styles.ripple,
              { transform: [{ scale: rippleScale }], opacity: rippleOpacity },
            ]}
          />

          {/* Main check circle */}
          <Animated.View
            style={[
              styles.checkCircle,
              Shadow.lg,
              { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
            ]}
          >
            <Text style={styles.checkIcon}>✓</Text>
          </Animated.View>
        </View>

        {/* Text block */}
        <Animated.View
          style={[
            styles.textBlock,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text style={styles.title}>Password{'\n'}Changed!</Text>
          <Text style={styles.subtitle}>
            Your password has been changed successfully. You can now log in with your new password.
          </Text>

          {/* Decorative success badge */}
          <View style={styles.successBadge}>
            <Text style={styles.badgeIcon}>🎉</Text>
            <Text style={styles.badgeText}>Account secured</Text>
          </View>
        </Animated.View>

        {/* Button */}
        <Animated.View
          style={[styles.btnSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
          <Button
            title="Back to Login"
            onPress={() => navigation.navigate('Login')}
            style={styles.btn}
          />
        </Animated.View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.xl,
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xxl,
    width: 160,
    height: 160,
  },
  ripple: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  rippleLarge: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  checkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  checkIcon: {
    fontSize: 48,
    color: Colors.primaryDeep,
    fontWeight: Typography.weight.extrabold,
    lineHeight: 56,
  },

  textBlock: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  title: {
    fontSize: Typography.size.xxxl,
    fontWeight: Typography.weight.extrabold,
    color: Colors.textPrimary,
    textAlign: 'center',
    letterSpacing: -0.5,
    lineHeight: 46,
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 23,
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.sm,
  },
  successBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(78,203,161,0.12)',
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(78,203,161,0.25)',
  },
  badgeIcon: {
    fontSize: 16,
  },
  badgeText: {
    fontSize: Typography.size.sm,
    color: Colors.accentLight,
    fontWeight: Typography.weight.semibold,
  },

  btnSection: {
    width: '100%',
  },
  btn: {
    width: '100%',
  },
});

export default PasswordChangedScreen;
