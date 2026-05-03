import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import { Colors, Typography, Spacing, Radius, Shadow } from '../theme';

const OTP_LENGTH = 4;

const OTPBox = ({ value, focused, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={[
      styles.otpBox,
      value ? styles.otpBoxFilled : null,
      focused ? styles.otpBoxFocused : null,
      Shadow.sm,
    ]}
  >
    <Text style={styles.otpChar}>{value || ''}</Text>
    {focused && !value && <View style={styles.cursor} />}
  </TouchableOpacity>
);

const OTPVerificationScreen = ({ navigation, route }) => {
  const email = route?.params?.email || 'your email';
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const activeBox = otp.length < OTP_LENGTH ? otp.length : OTP_LENGTH - 1;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 9, useNativeDriver: true }),
    ]).start();
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleVerify = async () => {
    if (otp.length < OTP_LENGTH) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    navigation.navigate('ResetPassword');
  };

  const handleResend = () => {
    setOtp('');
    setCountdown(30);
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
            <Text style={styles.iconEmoji}>📱</Text>
          </View>
        </View>

        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit verification code sent to your email{'\n'}
          <Text style={styles.emailHighlight}>{email}</Text>
        </Text>

        {/* Hidden real input */}
        <TextInput
          ref={inputRef}
          style={styles.hiddenInput}
          value={otp}
          onChangeText={(v) => {
            if (/^\d*$/.test(v) && v.length <= OTP_LENGTH) setOtp(v);
          }}
          keyboardType="number-pad"
          maxLength={OTP_LENGTH}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* OTP boxes */}
        <TouchableOpacity
          style={styles.otpRow}
          activeOpacity={1}
          onPress={() => inputRef.current?.focus()}
        >
          {Array.from({ length: OTP_LENGTH }).map((_, i) => (
            <OTPBox
              key={i}
              value={otp[i] || ''}
              focused={isFocused && activeBox === i}
              onPress={() => inputRef.current?.focus()}
            />
          ))}
        </TouchableOpacity>

        <Button
          title="Verify"
          onPress={handleVerify}
          loading={loading}
          disabled={otp.length < OTP_LENGTH}
          style={styles.btn}
        />

        {/* Resend */}
        <View style={styles.resendRow}>
          <Text style={styles.resendText}>Didn't receive code? </Text>
          {countdown > 0 ? (
            <Text style={styles.timerText}>Resend in {countdown}s</Text>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendLink}>Resend</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Spacing.lg,
  },
  inner: {
    flex: 1,
  },
  iconSection: {
    alignItems: 'center',
    marginVertical: Spacing.xl,
  },
  iconBg: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(78,203,161,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(78,203,161,0.25)',
  },
  iconEmoji: {
    fontSize: 42,
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
    marginBottom: Spacing.xl,
  },
  emailHighlight: {
    color: Colors.accent,
    fontWeight: Typography.weight.semibold,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 0,
    height: 0,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  otpBox: {
    width: 62,
    height: 68,
    borderRadius: Radius.md,
    backgroundColor: Colors.inputBg,
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBoxFilled: {
    backgroundColor: 'rgba(78,203,161,0.12)',
    borderColor: Colors.accent,
  },
  otpBoxFocused: {
    borderColor: Colors.accent,
    borderWidth: 2,
  },
  otpChar: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.extrabold,
    color: Colors.textPrimary,
  },
  cursor: {
    width: 2,
    height: 24,
    backgroundColor: Colors.accent,
    borderRadius: 1,
  },
  btn: {
    marginBottom: Spacing.xl,
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  timerText: {
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
    fontWeight: Typography.weight.medium,
  },
  resendLink: {
    fontSize: Typography.size.sm,
    color: Colors.accent,
    fontWeight: Typography.weight.bold,
  },
});

export default OTPVerificationScreen;
