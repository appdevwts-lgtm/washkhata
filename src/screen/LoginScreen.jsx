import React, { useState, useRef, useEffect } from 'react';
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
  Animated,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNOtpVerify from 'react-native-otp-verify';

const { width, height } = Dimensions.get('window');

const PhoneOTPLoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const [focusedInput, setFocusedInput] = useState(-1);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const googleButtonScale = useRef(new Animated.Value(1)).current;
  const googleButtonBg = useRef(new Animated.Value(0)).current;
  const otpInputsRef = useRef([]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Get app hash for SMS verification
  useEffect(() => {
    if (Platform.OS === 'android') {
      RNOtpVerify.getHash()
        .then((hash) => {
          console.log('App Hash:', hash);
        })
        .catch((error) => {
          console.log('Error getting hash:', error);
        });
    }
  }, []);

  // Listen for OTP SMS
  useEffect(() => {
    if (Platform.OS === 'android' && isOtpSent) {
      RNOtpVerify.getOtp()
        .then(() => {
          RNOtpVerify.addListener((message) => {
            try {
              // Extract 4-digit OTP from message
              const otpMatch = message.match(/\d{4}/);
              if (otpMatch) {
                const extractedOtp = otpMatch[0];
                const otpArray = extractedOtp.split('');
                setOtp(otpArray);
                
                // Auto-verify after a short delay
                setTimeout(() => {
                  handleVerifyOTP(extractedOtp);
                }, 500);
                
                // Remove listener after OTP is received
                RNOtpVerify.removeListener();
              }
            } catch (error) {
              console.log('Error extracting OTP:', error);
            }
          });
        })
        .catch((error) => {
          console.log('Error starting OTP listener:', error);
        });

      // Cleanup listener on unmount or when OTP screen is closed
      return () => {
        RNOtpVerify.removeListener();
      };
    }
  }, [isOtpSent]);

  const handleGooglePressIn = () => {
    Animated.parallel([
      Animated.spring(googleButtonScale, {
        toValue: 0.96,
        useNativeDriver: true,
      }),
      Animated.timing(googleButtonBg, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleGooglePressOut = () => {
    Animated.parallel([
      Animated.spring(googleButtonScale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(googleButtonBg, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const formatPhoneNumber = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 10) {
      return cleaned;
    }
    return cleaned.slice(0, 10);
  };

  const handlePhoneChange = (text) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
    setError('');
  };

  const requestSMSPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
          PermissionsAndroid.PERMISSIONS.READ_SMS,
        ]);
        
        if (
          granted['android.permission.RECEIVE_SMS'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.READ_SMS'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('SMS permissions granted');
          return true;
        } else {
          console.log('SMS permissions denied');
          return false;
        }
      } catch (err) {
        console.warn('Permission error:', err);
        return false;
      }
    }
    return true;
  };

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Enter valid phone number');
      return;
    }

    setError('');
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsOtpSent(true);
      setCountdown(60);
      
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      console.log('OTP sent to:', phoneNumber);
      
      setTimeout(() => {
        otpInputsRef.current[0]?.focus();
      }, 300);
    }, 2000);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 3) {
      otpInputsRef.current[index + 1]?.focus();
    }

    if (index === 3 && value && newOtp.every(digit => digit !== '')) {
      setTimeout(() => handleVerifyOTP(newOtp.join('')), 300);
    }
  };

  const handleOtpKeyPress = (index, key) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = (otpCode = otp.join('')) => {
    if (otpCode.length !== 4) {
      setError('Enter complete code');
      return;
    }

    setError('');
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      console.log('OTP verified successfully');
      // navigation.navigate('Home');
    }, 2000);
  };

  const handleResendOTP = () => {
    if (countdown > 0) return;

    setError('');
    setIsLoading(true);
    setOtp(['', '', '', '']);
    
    setTimeout(() => {
      setIsLoading(false);
      setCountdown(60);
      
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      console.log('OTP resent to:', phoneNumber);
      otpInputsRef.current[0]?.focus();
    }, 1500);
  };

  const handleGoogleAuth = () => {
    console.log('Google authentication initiated');
  };

  const handleChangeNumber = () => {
    setIsOtpSent(false);
    setOtp(['', '', '', '']);
    setCountdown(0);
    setError('');
  };

  const displayPhoneNumber = () => {
    if (phoneNumber.length === 10) {
      return `+91 ${phoneNumber.slice(0, 5)} ${phoneNumber.slice(5)}`;
    }
    return phoneNumber;
  };



  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Minimal background */}
      <View style={styles.backgroundPattern}>
        <View style={styles.patternCircle1} />
        <View style={styles.patternCircle2} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          
          <Animated.View 
            style={[
              styles.contentWrapper,
              {
                opacity: fadeAnim,
                transform: [
                  { translateY: slideAnim },
                  { scale: scaleAnim },
                ],
              },
            ]}>
            
            {/* Logo Section */}
            <View style={styles.logoSection}>
              <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                  <MaterialIcon name="washing-machine" size={40} color="#000" />
                </View>
              </View>
              <Text style={styles.brandName}>WashKhata</Text>
            </View>

            {/* Main Card */}
            <View style={styles.card}>
              
              {/* Header Section */}
              <View style={styles.header}>
                <Text style={styles.title}>
                  {isOtpSent ? 'Verify Code' : 'Welcome'}
                </Text>
                
                {isOtpSent && (
                  <View style={styles.phoneDisplayContainer}>
                    <Icon name="call" size={16} color="#666" />
                    <Text style={styles.phoneDisplay}>{displayPhoneNumber()}</Text>
                    <TouchableOpacity 
                      onPress={handleChangeNumber}
                      style={styles.editButton}
                      activeOpacity={0.7}>
                      <Icon name="pencil" size={14} color="#000" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* Phone Number Input Section */}
              {!isOtpSent && (
                <View style={styles.inputSection}>
                  <View style={[
                    styles.phoneInputWrapper,
                    focusedInput === 0 && styles.inputFocused,
                    error && !isOtpSent && styles.inputError,
                  ]}>
                    <View style={styles.countryCodeContainer}>
                      <Icon name="flag" size={20} color="#000" />
                      <Text style={styles.countryCode}>+91</Text>
                    </View>
                    <View style={styles.inputDivider} />
                    <TextInput
                      style={styles.phoneInput}
                      placeholder="Mobile number"
                      value={phoneNumber}
                      onChangeText={handlePhoneChange}
                      keyboardType="phone-pad"
                      placeholderTextColor="#999"
                      editable={!isLoading}
                      maxLength={10}
                      autoFocus={!isOtpSent}
                      onFocus={() => setFocusedInput(0)}
                      onBlur={() => setFocusedInput(-1)}
                    />
                    {phoneNumber.length === 10 && (
                      <Icon name="checkmark-circle" size={22} color="#000" style={styles.inputCheck} />
                    )}
                  </View>
                  
                  {error && !isOtpSent && (
                    <View style={styles.errorContainer}>
                      <Icon name="alert-circle" size={16} color="#000" />
                      <Text style={styles.errorText}>{error}</Text>
                    </View>
                  )}

                  <TouchableOpacity
                    style={[
                      styles.primaryButton,
                      (phoneNumber.length < 10 || isLoading) && styles.buttonDisabled
                    ]}
                    onPress={handleSendOTP}
                    disabled={phoneNumber.length < 10 || isLoading}
                    activeOpacity={0.9}>
                    {isLoading ? (
                      <ActivityIndicator color="#fff" size="small" />
                    ) : (
                      <>
                        <Text style={styles.buttonText}>Continue</Text>
                        <Icon name="arrow-forward" size={20} color="#fff" />
                      </>
                    )}
                  </TouchableOpacity>

                  {/* Divider */}
                  <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>or</Text>
                    <View style={styles.dividerLine} />
                  </View>

                  {/* Animated Google Button */}
                  <Animated.View
                    style={[
                      styles.socialButton,
                      {
                        transform: [{ scale: googleButtonScale }],
                        backgroundColor: googleButtonBg.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['#ffffff', '#000000'],
                        }),
                      },
                    ]}>
                    <TouchableOpacity
                      style={styles.socialButtonInner}
                      onPress={handleGoogleAuth}
                      onPressIn={handleGooglePressIn}
                      onPressOut={handleGooglePressOut}
                      activeOpacity={1}>
                      <Animated.Text style={[styles.googleIconText]}>
                        <MaterialIcon 
                          name="google" 
                          size={22} 
                          color="#000"
                        />
                      </Animated.Text>
                      <Text style={styles.socialButtonText}>Google</Text>
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              )}

              {/* OTP Input Section */}
              {isOtpSent && (
                <View style={styles.inputSection}>
                  <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                      <View key={index} style={styles.otpInputWrapper}>
                        <TextInput
                          ref={(ref) => (otpInputsRef.current[index] = ref)}
                          style={[
                            styles.otpInput,
                            digit && styles.otpInputFilled,
                            focusedInput === index + 1 && styles.otpInputFocused,
                            error && styles.otpInputError,
                          ]}
                          value={digit}
                          onChangeText={(value) => handleOtpChange(index, value)}
                          onKeyPress={({ nativeEvent: { key } }) => 
                            handleOtpKeyPress(index, key)
                          }
                          onFocus={() => setFocusedInput(index + 1)}
                          onBlur={() => setFocusedInput(-1)}
                          keyboardType="number-pad"
                          maxLength={1}
                          selectTextOnFocus
                        />
                      </View>
                    ))}
                  </View>

                  {error && isOtpSent && (
                    <View style={styles.errorContainer}>
                      <Icon name="alert-circle" size={16} color="#000" />
                      <Text style={styles.errorText}>{error}</Text>
                    </View>
                  )}

                  <TouchableOpacity
                    style={[
                      styles.primaryButton,
                      (otp.join('').length < 4 || isLoading) && styles.buttonDisabled
                    ]}
                    onPress={() => handleVerifyOTP()}
                    disabled={otp.join('').length < 4 || isLoading}
                    activeOpacity={0.9}>
                    {isLoading ? (
                      <ActivityIndicator color="#fff" size="small" />
                    ) : (
                      <>
                        <Text style={styles.buttonText}>Verify</Text>
                        <Icon name="arrow-forward" size={20} color="#fff" />
                      </>
                    )}
                  </TouchableOpacity>

                  {/* Resend Section */}
                  <View style={styles.resendSection}>
                    <TouchableOpacity
                      onPress={handleResendOTP}
                      disabled={countdown > 0 || isLoading}
                      activeOpacity={0.7}
                      style={styles.resendButtonContainer}>
                      {countdown > 0 ? (
                        <View style={styles.countdownContainer}>
                          <Icon name="time-outline" size={18} color="#999" />
                          <Text style={styles.resendDisabled}>
                            Resend in {countdown}s
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.resendActive}>
                          <Icon name="refresh" size={18} color="#000" />
                          <Text style={styles.resendButton}>Resend Code</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* Trust Indicators */}
              <View style={styles.trustSection}>
                <View style={styles.trustBadge}>
                  <Icon name="shield-checkmark" size={16} color="#000" />
                  <Text style={styles.trustText}>Secure</Text>
                </View>
                <View style={styles.trustDivider} />
                <View style={styles.trustBadge}>
                  <Icon name="lock-closed" size={16} color="#000" />
                  <Text style={styles.trustText}>Encrypted</Text>
                </View>
              </View>
            </View>
          </Animated.View>
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
  backgroundPattern: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  patternCircle1: {
    position: 'absolute',
    width: 500,
    height: 500,
    borderRadius: 250,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    top: -200,
    right: -150,
  },
  patternCircle2: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    bottom: -150,
    left: -100,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 460,
    alignSelf: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  brandName: {
    fontSize: 34,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -1.5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 32,
    padding: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  phoneDisplayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  phoneDisplay: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 0.5,
  },
  editButton: {
    padding: 4,
  },
  inputSection: {
    width: '100%',
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    height: 60,
    marginBottom: 12,
  },
  inputFocused: {
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#000',
    backgroundColor: '#f5f5f5',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 12,
    gap: 8,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  inputDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#ccc',
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    paddingHorizontal: 16,
  },
  inputCheck: {
    marginRight: 16,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 10,
  },
  otpInputWrapper: {
    flex: 1,
  },
  otpInput: {
    height: 60,
    backgroundColor: '#f5f5f5',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  otpInputFilled: {
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  otpInputFocused: {
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  otpInputError: {
    borderColor: '#666',
    backgroundColor: '#f5f5f5',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  errorText: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  primaryButton: {
    height: 60,
    backgroundColor: '#000',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    color: '#999',
    fontSize: 13,
    fontWeight: '600',
    marginHorizontal: 16,
  },
  socialButton: {
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#000',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  socialButtonInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  googleIconText: {
    color: '#000',
  },
  resendSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  resendButtonContainer: {
    alignItems: 'center',
  },
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resendActive: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resendButton: {
    fontSize: 15,
    color: '#000',
    fontWeight: '700',
  },
  resendDisabled: {
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
  },
  trustSection: {
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trustText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  trustDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#e0e0e0',
  },
});

export default PhoneOTPLoginScreen;