import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { fontFamily, useTheme } from '../../../utils/globalStyle';
import styles from './style';

// import JurisLogo from '../../../components/JurisLogo';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen({ navigation }) {
const { styles: g, colors, isDark, toggleTheme } = useTheme();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(null); // 'id' | 'pw' | null
  const [errors, setErrors] = useState({}); // { id, pw, form }
  const [loading, setLoading] = useState(false);

  /* ---------- Actions ---------- */

  // Throw new Error('message') here to show it on the form.
  const onLogin = async (_identifier, _password) => {
    // TODO: call your login API / auth context here
    await new Promise((resolve) => setTimeout(resolve, 800));
  };

  const onForgotPassword = () => {
    // navigation.navigate('ForgotPassword'); // enable once the screen is registered
  };

  const onSignUp = () => {
    // navigation.navigate('SignUp'); // enable once the screen is registered
  };

  const onGoogle = () => {
    // TODO: Google sign-in
  };

  /* ---------- Validation & submit ---------- */

  const validate = () => {
    const next = {};
    const value = identifier.trim();
    if (!value) next.id = 'Enter your email or mobile number';
    else if (!EMAIL_RE.test(value) && !/^[6-9]\d{9}$/.test(value))
      next.id = 'Enter a valid email or 10-digit mobile number';
    if (!password) next.pw = 'Enter your password';
    else if (password.length < 6) next.pw = 'Password must be at least 6 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async () => {
    if (loading || !validate()) return;
    setLoading(true);
    try {
      await onLogin(identifier.trim(), password);
    } catch (e) {
      setErrors({ form: e?.message ?? 'Could not sign in. Check your details and try again.' });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (key, hasError) => [
    g.input,
    focused === key && g.inputFocused,
    !!hasError && g.inputError,
  ];

  return (
    <KeyboardAvoidingView
      style={g.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Theme switch (remove if you don't want it on login) */}
        <Pressable onPress={toggleTheme} style={styles.themeBtn} hitSlop={12}>
          <Text style={[g.caption, { color: colors.accentText }]}>
            {isDark ? 'Light mode' : 'Dark mode'}
          </Text>
        </Pressable>

        {/* Header */}
        <View style={styles.header}>
          {/* <JurisLogo size={72} color={colors.accent} /> */}
          <Text style={[g.h1, styles.title]}>Welcome back</Text>
          <Text style={[g.secondary, styles.subtitle]}>
            Sign in to search every law and section on JURIS.
          </Text>
        </View>

        {/* Form-level error */}
        {!!errors.form && (
          <View style={[g.alertError, styles.formError]}>
            <Text style={[g.secondary, { color: colors.error }]}>{errors.form}</Text>
          </View>
        )}

        {/* Email / mobile */}
        <Text style={[g.caption, styles.label]}>Email or mobile number</Text>
        <TextInput
          style={inputStyle('id', errors.id)}
          value={identifier}
          onChangeText={(t) => {
            setIdentifier(t);
            if (errors.id) setErrors((e) => ({ ...e, id: undefined }));
          }}
          onFocus={() => setFocused('id')}
          onBlur={() => setFocused(null)}
          placeholder="you@example.com"
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          textContentType="username"
          autoComplete="username"
          returnKeyType="next"
        />
        {!!errors.id && (
          <Text style={[g.caption, styles.fieldError, { color: colors.error }]}>{errors.id}</Text>
        )}

        {/* Password */}
        <Text style={[g.caption, styles.label, { marginTop: 16 }]}>Password</Text>
        <View>
          <TextInput
            style={[...inputStyle('pw', errors.pw), { paddingRight: 64 }]}
            value={password}
            onChangeText={(t) => {
              setPassword(t);
              if (errors.pw) setErrors((e) => ({ ...e, pw: undefined }));
            }}
            onFocus={() => setFocused('pw')}
            onBlur={() => setFocused(null)}
            placeholder="Enter your password"
            placeholderTextColor={colors.textSecondary}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            autoComplete="password"
            returnKeyType="done"
            onSubmitEditing={submit}
          />
          <Pressable
            style={styles.eye}
            onPress={() => setShowPassword((v) => !v)}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
          >
            <Text style={[g.caption, { color: colors.accentText }]}>
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </Pressable>
        </View>
        {!!errors.pw && (
          <Text style={[g.caption, styles.fieldError, { color: colors.error }]}>{errors.pw}</Text>
        )}

        <Pressable onPress={onForgotPassword} style={styles.forgot} hitSlop={8}>
          <Text style={[g.secondary, { color: colors.accentText, fontFamily: fontFamily.medium }]}>
            Forgot password?
          </Text>
        </Pressable>

        {/* Primary action */}
        <Pressable
          onPress={submit}
          disabled={loading}
          style={({ pressed }) => [g.buttonPrimary, (pressed || loading) && g.buttonDisabled]}
          accessibilityRole="button"
        >
          {loading ? (
            <ActivityIndicator color={colors.onPrimary} />
          ) : (
            <Text style={g.buttonPrimaryText}>Sign in</Text>
          )}
        </Pressable>

        {/* Divider */}
        <View style={styles.orRow}>
          <View style={g.divider} />
          <Text style={[g.caption, styles.orText]}>or</Text>
          <View style={g.divider} />
        </View>

        <Pressable
          onPress={onGoogle}
          style={({ pressed }) => [g.buttonSecondary, pressed && g.buttonDisabled]}
        >
          <Text style={g.buttonSecondaryText}>Continue with Google</Text>
        </Pressable>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={g.secondary}>New to JURIS? </Text>
          <Pressable onPress={onSignUp} hitSlop={8}>
            <Text
              style={[g.secondary, { color: colors.accentText, fontFamily: fontFamily.semibold }]}
            >
              Create account
            </Text>
          </Pressable>
        </View>

        <Text style={[g.caption, styles.disclaimer]}>
          JURIS is a research aid and does not provide legal advice.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}