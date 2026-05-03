import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import InputField from '../components/InputField';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import { Colors, Typography, Spacing, Radius } from '../theme';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 9, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleSend = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Enter a valid email');
      return;
    }
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    navigation.navigate('OTPVerification', { email });
  };

  return (
    <ScreenContainer contentStyle={styles.container}>
      <Animated.View
        style={[styles.inner, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
      >
        <BackButton onPress={() => navigation.goBack()} />

        {/* Icon */}
        <View style={styles.iconSection}>
          <View style={styles.iconBg}>
            <Text style={styles.iconEmoji}>🔐</Text>
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            Please enter the email address linked with your account. We'll send you an OTP to verify.
          </Text>
        </View>

        {/* Input */}
        <InputField
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          error={error}
          leftIcon={<Text style={{ fontSize: 16 }}>✉️</Text>}
        />

        <Button
          title="Send Code"
          onPress={handleSend}
          loading={loading}
          style={styles.btn}
        />

        {/* Info pill */}
        <View style={styles.infoPill}>
          <Text style={styles.infoText}>📩  Check your inbox after sending</Text>
        </View>
      </Animated.View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  inner: {
    flex: 1,
  },
  iconSection: {
    alignItems: 'center',
    marginVertical: Spacing.xxl,
  },
  iconBg: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(78,203,161,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(78,203,161,0.25)',
  },
  iconEmoji: {
    fontSize: 44,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.size.xxl,
    fontWeight: Typography.weight.extrabold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    lineHeight: 23,
  },
  btn: {
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
  },
  infoPill: {
    backgroundColor: 'rgba(78,203,161,0.1)',
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(78,203,161,0.2)',
  },
  infoText: {
    fontSize: Typography.size.sm,
    color: Colors.accentLight,
    fontWeight: Typography.weight.medium,
  },
});

export default ForgotPasswordScreen;
