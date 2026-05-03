import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import { RunnerIllustration } from '../components/Illustrations';
import { Colors, Typography, Spacing, Radius, Shadow } from '../theme';

const { height, width } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 60,
        friction: 9,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 60,
        friction: 9,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ScreenContainer keyboardAvoiding={false} contentStyle={styles.container}>
      {/* Top decorative blob */}
      <View style={styles.topBlob} />
      <View style={styles.topBlobAccent} />

      {/* Illustration area */}
      <Animated.View
        style={[
          styles.illustrationSection,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <RunnerIllustration size={220} />
      </Animated.View>

      {/* Text section */}
      <Animated.View
        style={[
          styles.textSection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.headline}>Start your Fitness{'\n'}Journey</Text>
        <View style={styles.divider} />
      </Animated.View>

      {/* Bottom CTA */}
      <Animated.View
        style={[
          styles.bottomSection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.circleBtn, Shadow.lg]}
          onPress={() => navigation.navigate('Welcome')}
          activeOpacity={0.8}
        >
          <Text style={styles.circleBtnIcon}>→</Text>
        </TouchableOpacity>

        <Text style={styles.tagline}>Track your Active Lifestyle</Text>
      </Animated.View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xxl,
  },

  topBlob: {
    position: 'absolute',
    width: width * 1.1,
    height: height * 0.52,
    top: 0,
    borderBottomLeftRadius: width * 0.6,
    borderBottomRightRadius: width * 0.6,
    backgroundColor: Colors.primaryLight,
    opacity: 0.18,
  },
  topBlobAccent: {
    position: 'absolute',
    width: width * 0.75,
    height: height * 0.42,
    top: 0,
    alignSelf: 'center',
    borderBottomLeftRadius: width * 0.5,
    borderBottomRightRadius: width * 0.5,
    backgroundColor: Colors.primaryLight,
    opacity: 0.12,
  },

  illustrationSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xxl,
  },

  textSection: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xxl,
  },
  headline: {
    fontSize: Typography.size.xxxl,
    fontWeight: Typography.weight.extrabold,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 46,
    letterSpacing: -0.5,
  },
  divider: {
    width: 40,
    height: 3,
    backgroundColor: Colors.accent,
    borderRadius: Radius.full,
    marginTop: Spacing.lg,
  },

  bottomSection: {
    alignItems: 'center',
    gap: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  circleBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  circleBtnIcon: {
    fontSize: 24,
    color: Colors.primaryDeep,
    fontWeight: Typography.weight.bold,
  },
  tagline: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.weight.medium,
    letterSpacing: 0.5,
  },
});

export default SplashScreen;
