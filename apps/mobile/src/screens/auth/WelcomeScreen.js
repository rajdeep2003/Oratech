import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import { Colors, Typography, Spacing, Radius } from '../theme';

const { height, width } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(60)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(slideUp, { toValue: 0, tension: 55, friction: 8, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <ScreenContainer keyboardAvoiding={false} contentStyle={styles.container}>

      {/* Hero image section */}
      <View style={styles.heroSection}>
        {/* Placeholder gradient image block */}
        <View style={styles.imagePlaceholder}>
          <View style={styles.imageOverlay} />
          <Text style={styles.heroEmoji}>🏋️‍♀️</Text>
          <View style={styles.imageGradient} />
        </View>

        {/* Floating badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>💪 Ready?</Text>
        </View>
      </View>

      {/* Bottom content card */}
      <Animated.View
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideUp }],
          },
        ]}
      >
        <Text style={styles.title}>Get Started</Text>
        <Text style={styles.subtitle}>
          Your fitness journey begins today. Track workouts, stay consistent, reach your goals.
        </Text>

        <View style={styles.btnStack}>
          <Button
            title="Login"
            onPress={() => navigation.navigate('Login')}
            variant="primary"
            style={styles.btn}
          />
          <Button
            title="Register"
            onPress={() => navigation.navigate('SignUp')}
            variant="secondary"
            style={styles.btn}
          />
        </View>

        {/* Indicator dots */}
        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </Animated.View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },

  heroSection: {
    height: height * 0.52,
    position: 'relative',
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  imageOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: Colors.primaryDark,
    opacity: 0.3,
  },
  heroEmoji: {
    fontSize: 120,
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: Colors.background,
    opacity: 0.8,
    // Gradient simulated with border radius
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  badge: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
  },
  badgeText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.primaryDeep,
  },

  card: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
    marginTop: -Spacing.xxl,
  },
  title: {
    fontSize: Typography.size.xxl,
    fontWeight: Typography.weight.extrabold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },
  btnStack: {
    gap: Spacing.md,
  },
  btn: {
    width: '100%',
  },
  dots: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.inputBorder,
  },
  dotActive: {
    backgroundColor: Colors.accent,
    width: 24,
  },
});

export default WelcomeScreen;
