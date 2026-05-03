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

const StrengthBar = ({ password }) => {
  const getStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getStrength();
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['', Colors.error, '#FFA500', '#FFD700', Colors.accent];

  if (!password) return null;

  return (
    <View style={styles.strengthWrap}>
      <View style={styles.strengthBars}>
        {[1, 2, 3, 4].map((i) => (
          <View
            key={i}
            style={[
              styles.strengthBar,
              { backgroundColor: i <= strength ? colors[strength] : Colors.inputBorder },
            ]}
          />
        ))}
      </View>
      <Text style={[styles.strengthLabel, { color: colors[strength] }]}>
        {labels[strength]}
      </Text>
    </View>
  );
};

const ResetPasswordScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 9, useNativeDriver: true }),
    ]).start();
  }, []);

  const validate = () => {
    const errs = {};
    if (!newPassword) errs.newPassword = 'Password is required';
    else if (newPassword.length < 8) errs.newPassword = 'Minimum 8 characters';
    if (newPassword !== confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleReset = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    navigation.navigate('PasswordChanged');
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
            <Text style={styles.iconEmoji}>🛡️</Text>
          </View>
        </View>

        <Text style={styles.title}>Create new{'\n'}password</Text>
        <Text style={styles.subtitle}>
          Your new password must be unique from those previously used.
        </Text>

        <View style={styles.form}>
          <InputField
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            error={errors.newPassword}
            leftIcon={<Text style={{ fontSize: 16 }}>🔒</Text>}
          />
          <StrengthBar password={newPassword} />

          <InputField
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={errors.confirmPassword}
            leftIcon={<Text style={{ fontSize: 16 }}>🔒</Text>}
            style={{ marginTop: Spacing.sm }}
          />
        </View>

        {/* Requirements */}
        <View style={styles.requirements}>
          {[
            { label: 'At least 8 characters', met: newPassword.length >= 8 },
            { label: 'One uppercase letter', met: /[A-Z]/.test(newPassword) },
            { label: 'One number', met: /[0-9]/.test(newPassword) },
          ].map((req, i) => (
            <View key={i} style={styles.reqRow}>
              <Text style={[styles.reqIcon, req.met && styles.reqIconMet]}>
                {req.met ? '✓' : '○'}
              </Text>
              <Text style={[styles.reqText, req.met && styles.reqTextMet]}>
                {req.label}
              </Text>
            </View>
          ))}
        </View>

        <Button
          title="Reset Password"
          onPress={handleReset}
          loading={loading}
          style={styles.btn}
        />
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
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
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
    lineHeight: 36,
    marginBottom: Spacing.sm,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    lineHeight: 23,
    marginBottom: Spacing.xl,
  },
  form: {
    marginBottom: Spacing.sm,
  },
  strengthWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -Spacing.sm,
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.xs,
  },
  strengthBars: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
    marginRight: Spacing.sm,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  strengthLabel: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    width: 40,
    textAlign: 'right',
  },
  requirements: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    gap: Spacing.xs,
  },
  reqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  reqIcon: {
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
    width: 18,
  },
  reqIconMet: {
    color: Colors.accent,
  },
  reqText: {
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
  },
  reqTextMet: {
    color: Colors.textSecondary,
  },
  btn: {
    marginTop: Spacing.sm,
  },
});

export default ResetPasswordScreen;
