import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

const { width } = Dimensions.get('window');

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // In a real app, you would make an API call here:
      // console.log('Reset password request for:', email);
    }, 1500);
  };

  const handleBackToLogin = () => {
    navigation.goBack();
  };

  const handleResend = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Reset link sent again!');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Decorative elements - matching login screen */}
      <View style={styles.decorCircle1} />
      <View style={styles.decorCircle2} />
      <View style={styles.decorLine1} />
      <View style={styles.decorLine2} />
      <View style={styles.decorDot1} />
      <View style={styles.decorDot2} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            {/* Back button */}
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBackToLogin}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>
              {isSubmitted 
                ? 'Check your email for reset instructions' 
                : 'Enter your email to reset your password'
              }
            </Text>

            {!isSubmitted ? (
              <>
                {/* Input Field */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>EMAIL ADDRESS</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#666"
                    editable={!isLoading}
                  />
                </View>

                {/* Reset Password Button */}
                <TouchableOpacity
                  style={[
                    styles.resetButton, 
                    (!email || isLoading) && styles.disabledButton
                  ]}
                  onPress={handleResetPassword}
                  disabled={!email || isLoading}>
                  <Text style={styles.resetButtonText}>
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </Text>
                </TouchableOpacity>

                {/* Back to login link */}
                <TouchableOpacity 
                  style={styles.backToLoginContainer}
                  onPress={handleBackToLogin}
                >
                  <Text style={styles.backToLoginText}>← Back to Login</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                {/* Success state */}
                <View style={styles.successContainer}>
                  <View style={styles.successIconContainer}>
                    <Text style={styles.successIcon}>✓</Text>
                  </View>
                  <Text style={styles.successTitle}>Email Sent!</Text>
                  <Text style={styles.successMessage}>
                    We've sent password reset instructions to:
                  </Text>
                  <Text style={styles.successEmail}>{email}</Text>
                  
                  <View style={styles.noteContainer}>
                    <Text style={styles.noteTitle}>Note:</Text>
                    <Text style={styles.noteText}>
                      • Check your spam folder if you don't see the email{'\n'}
                      • The link expires in 24 hours{'\n'}
                      • Contact support if you need help
                    </Text>
                  </View>

                  {/* Action buttons */}
                  <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity
                      style={styles.resendButton}
                      onPress={handleResend}
                      disabled={isLoading}>
                      <Text style={styles.resendButtonText}>
                        {isLoading ? 'Sending...' : 'Resend Email'}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.checkEmailButton}
                      onPress={() => {
                        // In a real app, this might open the email app
                        Alert.alert('Open Email', 'Opening your email app...');
                      }}>
                      <Text style={styles.checkEmailButtonText}>
                        Open Email App
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Back to login */}
                  <TouchableOpacity 
                    style={styles.backToLoginSuccess}
                    onPress={handleBackToLogin}
                  >
                    <Text style={styles.backToLoginSuccessText}>
                      Return to Login
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  decorCircle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    top: -100,
    right: -100,
  },
  decorCircle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    bottom: -50,
    left: -50,
  },
  decorLine1: {
    position: 'absolute',
    width: 100,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    top: 100,
    left: 20,
    transform: [{ rotate: '45deg' }],
  },
  decorLine2: {
    position: 'absolute',
    width: 80,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    bottom: 150,
    right: 40,
    transform: [{ rotate: '-45deg' }],
  },
  decorDot1: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    top: 200,
    left: 60,
  },
  decorDot2: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    bottom: 250,
    right: 80,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 32,
    elevation: 20,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 32,
    left: 32,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
    fontWeight: '700',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
    letterSpacing: -0.5,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  label: {
    fontSize: 11,
    color: '#000',
    marginBottom: 8,
    fontWeight: '600',
    letterSpacing: 1,
  },
  input: {
    width: '100%',
    height: 52,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#000',
    borderWidth: 2,
    borderColor: '#f5f5f5',
  },
  resetButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#000',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  backToLoginContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  backToLoginText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  // Success state styles
  successContainer: {
    alignItems: 'center',
    width: '100%',
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successIcon: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  successEmail: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 32,
    textAlign: 'center',
  },
  noteContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 32,
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  noteText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  actionButtonsContainer: {
    width: '100%',
    marginBottom: 24,
  },
  resendButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#000',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  resendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  checkEmailButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkEmailButtonText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '600',
  },
  backToLoginSuccess: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  backToLoginSuccessText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ForgotPasswordScreen;