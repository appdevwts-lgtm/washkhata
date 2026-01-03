import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StatusBar,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const {width} = Dimensions.get('window');

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [verificationType, setVerificationType] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isVerified, setIsVerified] = useState({email: false, phone: false});

  const otpRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleVerify = type => {
    if (type === 'email' && email) {
      setVerificationType('email');
      setShowOtpModal(true);
    } else if (type === 'phone' && phone) {
      setVerificationType('phone');
      setShowOtpModal(true);
    }
  };

  const handleOtpChange = (value, index) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        otpRefs[index + 1].current?.focus();
      }
    }
  };

  const handleOtpKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleOtpSubmit = () => {
    const otpCode = otp.join('');
    console.log('OTP submitted:', otpCode, 'for', verificationType);

    // Simulate successful verification
    setIsVerified(prev => ({
      ...prev,
      [verificationType]: true,
    }));

    setShowOtpModal(false);
    setOtp(['', '', '', '']);
  };

  const handleSignUp = () => {
    if (!isVerified.email && !isVerified.phone) {
      alert('Please verify either email or phone number');
      return;
    }
    console.log('Register pressed');
    // Add your registration logic here
  };

  const canSignUp = (isVerified.email || isVerified.phone) && name && password;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Decorative elements */}
      <View style={styles.decorCircle1} />
      <View style={styles.decorCircle2} />
      <View style={styles.decorLine1} />
      <View style={styles.decorLine2} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            {/* Title */}
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>

            {/* Input Fields */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>FULL NAME</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>EMAIL ADDRESS</Text>
              <View style={styles.inputWithButton}>
                <TextInput
                  style={[styles.input, styles.inputWithVerify]}
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#666"
                  editable={!isVerified.email}
                />
                <TouchableOpacity
                  style={[
                    styles.verifyButton,
                    isVerified.email && styles.verifiedButton,
                    !email && styles.disabledButton,
                  ]}
                  onPress={() => handleVerify('email')}
                  disabled={!email || isVerified.email}>
                  <Text
                    style={[
                      styles.verifyButtonText,
                      isVerified.email && styles.verifiedButtonText,
                    ]}>
                    {isVerified.email ? '✓ Verified' : 'Verify'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.orContainer}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.orLine} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>PHONE NUMBER</Text>
              <View style={styles.inputWithButton}>
                <TextInput
                  style={[styles.input, styles.inputWithVerify]}
                  placeholder="Enter your phone"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  placeholderTextColor="#666"
                  editable={!isVerified.phone}
                />
                <TouchableOpacity
                  style={[
                    styles.verifyButton,
                    isVerified.phone && styles.verifiedButton,
                    !phone && styles.disabledButton,
                  ]}
                  onPress={() => handleVerify('phone')}
                  disabled={!phone || isVerified.phone}>
                  <Text
                    style={[
                      styles.verifyButtonText,
                      isVerified.phone && styles.verifiedButtonText,
                    ]}>
                    {isVerified.phone ? '✓ Verified' : 'Verify'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>PASSWORD</Text>
              <TextInput
                style={styles.input}
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#666"
              />
            </View>

            <Text style={styles.requirementText}>
              * Verify either email or phone number to continue
            </Text>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={[
                styles.signUpButton,
                !canSignUp && styles.disabledSignUpButton,
              ]}
              onPress={handleSignUp}
              disabled={!canSignUp}>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* OTP Modal */}
      <Modal
        visible={showOtpModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowOtpModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Verification Code</Text>
            <Text style={styles.modalSubtitle}>
              We've sent a 4-digit code to your {verificationType}
            </Text>

            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={otpRefs[index]}
                  style={styles.otpInput}
                  value={digit}
                  onChangeText={value => handleOtpChange(value, index)}
                  onKeyPress={e => handleOtpKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                />
              ))}
            </View>

            <TouchableOpacity
              style={styles.verifyOtpButton}
              onPress={handleOtpSubmit}>
              <Text style={styles.verifyOtpButtonText}>Verify Code</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resendButton}>
              <Text style={styles.resendButtonText}>Resend Code</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setShowOtpModal(false);
                setOtp(['', '', '', '']);
              }}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    transform: [{rotate: '45deg'}],
  },
  decorLine2: {
    position: 'absolute',
    width: 80,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    bottom: 150,
    right: 40,
    transform: [{rotate: '-45deg'}],
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 32,
    elevation: 20,
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 32,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
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
  inputWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputWithVerify: {
    flex: 1,
  },
  verifyButton: {
    height: 52,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedButton: {
    backgroundColor: '#1a1a1a',
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  verifiedButtonText: {
    color: '#4ade80',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  orText: {
    marginHorizontal: 16,
    color: '#999',
    fontSize: 13,
    fontWeight: '600',
  },
  requirementText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 24,
    fontStyle: 'italic',
  },
  signUpButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#000',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  disabledSignUpButton: {
    backgroundColor: '#e0e0e0',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 32,
  },
  otpInput: {
    width: 60,
    height: 70,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: '#000',
    borderWidth: 2,
    borderColor: '#f5f5f5',
  },
  verifyOtpButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#000',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  verifyOtpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  resendButton: {
    paddingVertical: 12,
    marginBottom: 8,
  },
  resendButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  closeButton: {
    paddingVertical: 12,
  },
  closeButtonText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default RegisterScreen;