import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
  Keyboard,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

// CORRECT WAY: Use require() for Lottie files
// Option 1: If your file is .json
// const laundryAnimation = require('../assets/laundry.json');

// Option 2: If your file is .lottie (see metro.config.js below)
const laundryAnimation = require('../assets/laundry.lottie');

const { width, height } = Dimensions.get('window');

const OTPLoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const navigate = useNavigation();

  const otpRefs = useRef([]);
  const timerRef = useRef(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setTimer(30);
    timerRef.current = setInterval(() => {
      setTimer(prevTime => {
        if (prevTime <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  }, []);

  const validatePhoneNumber = phone => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSendOTP = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert(
        'Invalid Phone Number',
        'Please enter a valid 10-digit phone number starting with 6-9.',
      );
      return;
    }

    setIsSendingOtp(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsOtpSent(true);
      startTimer();

      // Focus first OTP input after a short delay
      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 500);

      // Alert.alert('OTP Sent', `Verification code sent to +91 ${phoneNumber}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
      console.error('OTP Send Error:', error);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleOtpChange = (value, index) => {
    // Only allow numeric input
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits are entered
    if (value && index === 5 && newOtp.every(digit => digit !== '')) {
      Keyboard.dismiss();
      handleVerifyOTP(newOtp.join(''));
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Move to previous input and clear it
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        otpRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerifyOTP = async (otpValue = otp.join('')) => {
    if (otpValue.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter complete 6-digit OTP.');
      return;
    }

    setIsVerifying(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('OTP Verified:', otpValue);
      navigate.navigate('Tab');
    } catch (error) {
      Alert.alert('Verification Failed', 'Invalid OTP. Please try again.');
      console.error('OTP Verification Error:', error);
      // Clear OTP on failure
      setOtp(['', '', '', '', '', '']);
      otpRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      startTimer();
      setOtp(['', '', '', '', '', '']);
      otpRefs.current[0]?.focus();

      console.log('OTP Resent to:', phoneNumber);
    } catch (error) {
      Alert.alert('Error', 'Failed to resend OTP. Please try again.');
      console.error('OTP Resend Error:', error);
    }
  };

  const isPhoneValid = validatePhoneNumber(phoneNumber);
  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <View
        style={[
          {
            backgroundColor: '#000000ff',
            height: '40%',
            paddingTop: -20,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
      >
        <LottieView
          source={laundryAnimation}
          autoPlay
          loop
          style={{
            width: width - 20,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          resizeMode="contain"
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={styles.contentCard}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cardInner}>
            {!isOtpSent ? (
              <>
                {!isKeyboardVisible && (
                  <View style={styles.headerCard}>
                    <View style={styles.imgLogo}></View>
                    <Text style={styles.logo}>WashKhata</Text>
                  </View>
                )}

                <View style={styles.formContainer}>
                  <Text style={styles.label}>Phone Number</Text>
                  <View style={styles.phoneInputWrapper}>
                    <Text style={styles.countryCode}>+91</Text>
                    <TextInput
                      style={styles.phoneInput}
                      placeholder="Enter your phone number"
                      placeholderTextColor="#999"
                      keyboardType="phone-pad"
                      value={phoneNumber}
                      onChangeText={text =>
                        setPhoneNumber(text.replace(/[^0-9]/g, ''))
                      }
                      maxLength={10}
                      editable={!isSendingOtp}
                      returnKeyType="done"
                      onSubmitEditing={isPhoneValid ? handleSendOTP : undefined}
                    />
                  </View>

                {!isKeyboardVisible &&   <TouchableOpacity
                    style={[
                      styles.button,
                      (!isPhoneValid || isSendingOtp) && styles.buttonDisabled,
                    ]}
                    onPress={handleSendOTP}
                    disabled={!isPhoneValid || isSendingOtp}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.buttonText}>
                      {isSendingOtp ? 'Sending...' : 'Send OTP'}
                    </Text>
                  </TouchableOpacity>}

                 {!isKeyboardVisible && <Text style={styles.termsText}>
                    By continuing, you agree to our Terms of Service and Privacy
                    Policy
                  </Text>}
                </View>
              </>
            ) : (
              <>
                <View style={styles.topContent}>
                  <Text style={styles.title}>Verify OTP</Text>
                  <Text style={styles.subtitle}>
                    Enter the 6-digit verification code sent to{'\n'}
                    <Text style={styles.phoneHighlight}>+91 {phoneNumber}</Text>
                  </Text>
                </View>

                <View style={styles.formContainer}>
                  <Text style={styles.label}>Verification Code</Text>
                  <View style={styles.otpBoxesContainer}>
                    {otp.map((digit, index) => (
                      <TextInput
                        key={index}
                        ref={ref => (otpRefs.current[index] = ref)}
                        style={[styles.otpBox, digit && styles.otpBoxFilled]}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={digit}
                        onChangeText={value => handleOtpChange(value, index)}
                        onKeyPress={e => handleKeyPress(e, index)}
                        selectTextOnFocus
                        editable={!isVerifying}
                      />
                    ))}
                  </View>

                  <View style={styles.resendContainer}>
                    {timer > 0 ? (
                      <Text style={styles.timerText}>
                        Resend code in{' '}
                        <Text style={styles.timerBold}>{timer}s</Text>
                      </Text>
                    ) : (
                      <TouchableOpacity
                        onPress={handleResendOTP}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.resendText}>Resend OTP</Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.button,
                      (!isOtpComplete || isVerifying) && styles.buttonDisabled,
                    ]}
                    onPress={() => handleVerifyOTP()}
                    disabled={!isOtpComplete || isVerifying}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.buttonText}>
                      {isVerifying ? 'Verifying...' : 'Verify & Continue'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    backgroundColor: '#ffffffff',
    paddingBottom: 30,
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCard: {
    backgroundColor: '#ffffffff',
    paddingBottom: 60,
    top: 30,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  },
  imgLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#000000ff',
    marginBottom: 20,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000000ff',
    textAlign: 'center',
    letterSpacing: 1,
  },
  keyboardView: {
    flex: 1,
  },
  contentCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  scrollContent: {
    flexGrow: 1,
  },
  cardInner: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    minHeight: '100%',
    justifyContent: 'flex-end',
  },
  topContent: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    textAlign: 'center',
  },
  phoneHighlight: {
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
  },
  formContainer: {
    marginTop: 0,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  countryCode: {
    fontSize: 16,
    color: '#000',
    marginRight: 12,
    fontWeight: '600',
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#000',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  buttonDisabled: {
    backgroundColor: '#CCC',
    ...Platform.select({
      ios: {
        shadowOpacity: 0,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  termsText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 20,
  },
  otpBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
    gap: 8,
  },
  otpBox: {
    flex: 1,
    height: 56,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  otpBoxFilled: {
    backgroundColor: '#F0F0F0',
    borderColor: '#000',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 24,
    minHeight: 20,
  },
  timerText: {
    fontSize: 14,
    color: '#999',
  },
  timerBold: {
    fontWeight: '700',
    color: '#666',
  },
  resendText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default OTPLoginScreen;
