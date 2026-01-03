import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const WelcomeScreen = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Decorative elements */}
      <View style={styles.decorCircle1} />
      <View style={styles.decorCircle2} />
      <View style={styles.decorCircle3} />
      <View style={styles.decorLine1} />
      <View style={styles.decorLine2} />
      <View style={styles.decorLine3} />
      <View style={styles.decorDot1} />
      <View style={styles.decorDot2} />
      <View style={styles.decorDot3} />
      <View style={styles.decorSquare1} />
      <View style={styles.decorSquare2} />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{translateY: slideAnim}, {scale: scaleAnim}],
          },
        ]}>
        {/* Logo/Brand Area */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <View style={styles.logoInnerCircle} />
          </View>
          <Text style={styles.brandName}>YourApp</Text>
        </View>

        {/* Main Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.titleBold}>Modern Experience</Text>
          <Text style={styles.subtitle}>
            Discover a new way to connect, create, and collaborate with our
            beautifully designed platform.
          </Text>
        </View>

        {/* Feature Highlights */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <View style={styles.featureIconInner} />
            </View>
            <Text style={styles.featureText}>Secure & Private</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <View style={styles.featureIconInner} />
            </View>
            <Text style={styles.featureText}>Fast & Reliable</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <View style={styles.featureIconInner} />
            </View>
            <Text style={styles.featureText}>Easy to Use</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.getStartedButtonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginButtonText}>I already have an account</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Bottom Decoration */}
      <View style={styles.bottomWave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  decorCircle1: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    top: -150,
    right: -150,
  },
  decorCircle2: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    bottom: -100,
    left: -100,
  },
  decorCircle3: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    top: height * 0.3,
    right: 30,
  },
  decorLine1: {
    position: 'absolute',
    width: 120,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    top: 150,
    left: 30,
    transform: [{rotate: '45deg'}],
  },
  decorLine2: {
    position: 'absolute',
    width: 100,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    bottom: 200,
    right: 50,
    transform: [{rotate: '-45deg'}],
  },
  decorLine3: {
    position: 'absolute',
    width: 80,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    top: height * 0.5,
    left: 50,
    transform: [{rotate: '90deg'}],
  },
  decorDot1: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    top: 120,
    right: 60,
  },
  decorDot2: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    bottom: 180,
    left: 70,
  },
  decorDot3: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    top: height * 0.4,
    left: 40,
  },
  decorSquare1: {
    position: 'absolute',
    width: 15,
    height: 15,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    top: height * 0.25,
    left: width * 0.15,
    transform: [{rotate: '45deg'}],
  },
  decorSquare2: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    bottom: height * 0.35,
    right: width * 0.2,
    transform: [{rotate: '45deg'}],
  },
  bottomWave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    maxWidth: 500,
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 10,
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  logoInnerCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000',
  },
  brandName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 2,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '300',
    color: '#fff',
    letterSpacing: 1,
  },
  titleBold: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 50,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIconInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  featureText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontWeight: '600',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  getStartedButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 5,
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  getStartedButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  loginButton: {
    width: '100%',
    height: 56,
    backgroundColor: 'transparent',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default WelcomeScreen;