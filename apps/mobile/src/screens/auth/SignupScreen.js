import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import InputField from '../components/InputField';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import { Colors, Typography, Spacing } from '../theme';

const SignUpScreen = ({ navigation }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
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

  const update = (field) => (val) => setForm((f) => ({ ...f, [field]: val }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Min 6 characters';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    Alert.alert('Welcome!', 'Account created successfully!');
  };

  return (
    <ScreenContainer scrollable contentStyle={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <BackButton onPress={() => navigation.goBack()} />

        <View style={styles.header}>
          <Text style={styles.title}>Create{'\n'}Account</Text>
          <Text style={styles.subtitle}>Join thousands tracking their fitness goals</Text>
        </View>

        <View style={styles.form}>
          <InputField
            placeholder="Full Name"
            value={form.name}
            onChangeText={update('name')}
            autoCapitalize="words"
            error={errors.name}
            leftIcon={<Text style={styles.fieldIcon}>👤</Text>}
          />
          <InputField
            placeholder="Email address"
            value={form.email}
            onChangeText={update('email')}
            keyboardType="email-address"
            error={errors.email}
            leftIcon={<Text style={styles.fieldIcon}>✉️</Text>}
          />
          <InputField
            placeholder="Create password"
            value={form.password}
            onChangeText={update('password')}
            secureTextEntry
            error={errors.password}
            leftIcon={<Text style={styles.fieldIcon}>🔒</Text>}
          />
          <InputField
            placeholder="Confirm password"
            value={form.confirm}
            onChangeText={update('confirm')}
            secureTextEntry
            error={errors.confirm}
            leftIcon={<Text style={styles.fieldIcon}>🔒</Text>}
          />

          <Text style={styles.terms}>
            By registering, you agree to our{' '}
            <Text style={styles.link}>Terms of Service</Text> and{' '}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>

          <Button
            title="Create Account"
            onPress={handleSignUp}
            loading={loading}
            style={styles.submitBtn}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Login Now!</Text>
          </TouchableOpacity>
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
  header: {
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.size.xxxl,
    fontWeight: Typography.weight.extrabold,
    color: Colors.textPrimary,
    lineHeight: 46,
    letterSpacing: -0.5,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  form: {
    marginBottom: Spacing.lg,
  },
  fieldIcon: {
    fontSize: 16,
  },
  terms: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
    lineHeight: 18,
    marginBottom: Spacing.xl,
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
  },
  link: {
    color: Colors.accent,
    fontWeight: Typography.weight.semibold,
  },
  submitBtn: {
    marginBottom: Spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  footerLink: {
    fontSize: Typography.size.sm,
    color: Colors.accent,
    fontWeight: Typography.weight.bold,
  },
});

export default SignUpScreen;
