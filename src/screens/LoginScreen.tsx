import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights, Shadows } from '../constants/theme';

// Logo component similar to the prototype
const LogoComponent = () => (
  <View style={styles.logoContainer}>
    <View style={styles.logoSquare}>
      <Text style={styles.logoCheckmark}>✓</Text>
    </View>
  </View>
);

const LoginScreen = () => {
  const [clientId, setClientId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!clientId.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both Client ID and password');
      return;
    }

    try {
      setIsLoading(true);
      await login(clientId.trim(), password);
    } catch (error) {
      Alert.alert('Login Failed', error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <View style={styles.header}>
            <LogoComponent />
            <Text style={styles.title}>Sign In</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Client ID</Text>
              <TextInput
                style={styles.input}
                value={clientId}
                onChangeText={setClientId}
                placeholder="Enter your Client ID"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                secureTextEntry
                editable={!isLoading}
              />
            </View>

            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            <View style={styles.helpSection}>
              <Text style={styles.helpText}>Need Help?</Text>
              <Text style={styles.helpPhone}>+1 (866) 972-9688</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundMain,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.massive,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.massive,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  logoSquare: {
    width: 80,
    height: 80,
    backgroundColor: Colors.brandGreen,
    borderRadius: BorderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.lg,
  },
  logoCheckmark: {
    fontSize: FontSizes.huge,
    color: Colors.white,
    fontWeight: FontWeights.bold,
  },
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  form: {
    backgroundColor: Colors.white,
    paddingVertical: Spacing.huge,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.lg,
    ...Shadows.md,
    borderWidth: 1,
    borderColor: Colors.gray200,
  },
  inputContainer: {
    marginBottom: Spacing.xl,
  },
  label: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    color: Colors.gray700,
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
  },
  loginButton: {
    backgroundColor: Colors.success,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  loginButtonDisabled: {
    backgroundColor: Colors.gray400,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
  helpSection: {
    alignItems: 'center',
    marginTop: Spacing.xxl,
  },
  helpText: {
    fontSize: FontSizes.sm,
    color: Colors.gray600,
    textAlign: 'center',
  },
  helpPhone: {
    fontSize: FontSizes.md,
    color: Colors.brandGreen,
    fontWeight: FontWeights.medium,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
});

export default LoginScreen;

