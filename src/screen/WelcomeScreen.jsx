import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import Video from 'react-native-video';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 375;
const isTablet = width >= 768;

const WelcomeScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const iconAnim1 = useRef(new Animated.Value(0)).current;
  const iconAnim2 = useRef(new Animated.Value(0)).current;
  const iconAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Staggered animations
    Animated.sequence([
      // Logo animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 60,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),

      // Feature icons staggered animations
      Animated.stagger(200, [
        Animated.spring(iconAnim1, {
          toValue: 1,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(iconAnim2, {
          toValue: 1,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(iconAnim3, {
          toValue: 1,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  // SVG Icons
  const WashIcon = () => (
    <Svg
      width={isTablet ? 40 : isSmallDevice ? 24 : 32}
      height={isTablet ? 40 : isSmallDevice ? 24 : 32}
      viewBox="0 0 32 32"
    >
      <Path
        d="M26 6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z"
        fill="none"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={16} cy={16} r={4} fill="#000" />
      <Path
        d="M10 6v6M22 6v6"
        fill="none"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );

  const TrackIcon = () => (
    <Svg
      width={isTablet ? 40 : isSmallDevice ? 24 : 32}
      height={isTablet ? 40 : isSmallDevice ? 24 : 32}
      viewBox="0 0 32 32"
    >
      <Path
        d="M16 6a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S6 21.52 6 16 10.48 6 16 6z"
        fill="none"
        stroke="#000"
        strokeWidth={2}
      />
      <Path
        d="M16 10v6l4 2"
        fill="none"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={16} cy={16} r={1} fill="#000" />
    </Svg>
  );

  const DeliveryIcon = () => (
    <Svg
      width={isTablet ? 40 : isSmallDevice ? 24 : 32}
      height={isTablet ? 40 : isSmallDevice ? 24 : 32}
      viewBox="0 0 32 32"
    >
      <Path
        d="M24 12h4l-4 8h-4"
        fill="none"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={10} cy={20} r={2} fill="#000" />
      <Circle cx={22} cy={20} r={2} fill="#000" />
      <Path
        d="M4 16h12M4 8h12"
        fill="none"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Rect
        x={2}
        y={4}
        width={16}
        height={4}
        rx={1}
        fill="#000"
        opacity={0.3}
      />
    </Svg>
  );

  const LogoIcon = () => (
    <Svg
      width={isTablet ? 120 : isSmallDevice ? 70 : 100}
      height={isTablet ? 120 : isSmallDevice ? 70 : 100}
      viewBox="0 0 100 100"
    >
      <Circle cx={50} cy={50} r={48} fill="#000" />
      <Rect x={30} y={30} width={40} height={40} rx={8} fill="#fff" />
      <Path
        d="M40 45l5-5 5 5 5-5 5 5M40 55l5-5 5 5 5-5 5 5M40 65l5-5 5 5 5-5 5 5"
        stroke="#000"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Circle cx={65} cy={35} r={3} fill="#fff" />
    </Svg>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Video
        source={require('../assets/welcome.mp4')}
        style={styles.backgroundVideo}
        resizeMode="cover"
        paused={!isFocused}
        repeat={true}
        muted
        volume={0}
      />
      <View style={styles.overlay} />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: logoScale }],
            },
          ]}
        >
          <LogoIcon />
          <Text style={styles.brandName}>WashKhata</Text>
          <Text style={styles.tagline}>Smart Laundry Management</Text>
        </Animated.View>

        {/* Spacer to push content to bottom */}
        <View style={styles.spacer} />

        {/* Bottom Section */}
        <Animated.View
          style={[
            styles.bottomSection,
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.appName}>WashKhata</Text>
          <Text style={styles.description}>
            Track your laundry from pickup to delivery.{'\n'}
            Schedule washes, get real-time updates,{'\n'}
            and manage all in one app.
          </Text>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <Animated.View
              style={[
                styles.featureItem,
                {
                  transform: [
                    {
                      scale: iconAnim1.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      }),
                    },
                  ],
                  opacity: iconAnim1,
                },
              ]}
            >
              <View style={styles.featureIconWrapper}>
                <WashIcon />
              </View>
              <Text style={styles.featureTitle}>Professional</Text>
              <Text style={styles.featureSubtitle}>Wash & Fold</Text>
            </Animated.View>

            <Animated.View
              style={[
                styles.featureItem,
                {
                  transform: [
                    {
                      scale: iconAnim2.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      }),
                    },
                  ],
                  opacity: iconAnim2,
                },
              ]}
            >
              <View style={styles.featureIconWrapper}>
                <TrackIcon />
              </View>
              <Text style={styles.featureTitle}>Real-time</Text>
              <Text style={styles.featureSubtitle}>Tracking</Text>
            </Animated.View>

            <Animated.View
              style={[
                styles.featureItem,
                {
                  transform: [
                    {
                      scale: iconAnim3.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      }),
                    },
                  ],
                  opacity: iconAnim3,
                },
              ]}
            >
              <View style={styles.featureIconWrapper}>
                <DeliveryIcon />
              </View>
              <Text style={styles.featureTitle}>Fast</Text>
              <Text style={styles.featureSubtitle}>Delivery</Text>
            </Animated.View>
          </View>

          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={handleGetStarted}
            activeOpacity={0.9}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
            <View style={styles.arrowIcon}>
              <Svg width={20} height={20} viewBox="0 0 24 24">
                <Path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="#fff"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </Svg>
            </View>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By continuing, you agree to our{'\n'}
              <Text style={styles.link}>Terms of Service</Text> and{' '}
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: isTablet ? 40 : isSmallDevice ? 20 : 30,
    paddingHorizontal: 20,
  },
  brandName: {
    fontSize: isTablet ? 44 : isSmallDevice ? 28 : 36,
    fontWeight: '800',
    color: '#000',
    marginTop: isTablet ? 20 : isSmallDevice ? 10 : 16,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: isTablet ? 18 : isSmallDevice ? 12 : 14,
    color: '#666',
    marginTop: 4,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: isTablet ? 60 : isSmallDevice ? 20 : 30,
    marginTop: isTablet ? 30 : isSmallDevice ? 15 : 20,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 400,
    marginBottom: isTablet ? 20 : isSmallDevice ? 12 : 16,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: isSmallDevice ? 4 : 8,
  },
  featureIconWrapper: {
    width: isTablet ? 80 : isSmallDevice ? 50 : 64,
    height: isTablet ? 80 : isSmallDevice ? 50 : 64,
    borderRadius: isTablet ? 40 : isSmallDevice ? 25 : 32,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: isTablet ? 16 : isSmallDevice ? 8 : 12,
    borderWidth: 1,
    borderColor: '#000000ff',
  },
  featureTitle: {
    fontSize: isTablet ? 18 : isSmallDevice ? 12 : 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 2,
  },
  featureSubtitle: {
    fontSize: isTablet ? 14 : isSmallDevice ? 10 : 12,
    color: '#666',
    fontWeight: '500',
  },
  spacer: {
    flex: 1,
    minHeight: isTablet ? 40 : isSmallDevice ? 20 : 30,
  },
  bottomSection: {
    paddingHorizontal: isTablet ? 60 : isSmallDevice ? 20 : 30,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: isTablet ? 24 : isSmallDevice ? 16 : 20,
    color: '#666',
    fontWeight: '300',
    marginBottom: 4,
  },
  appName: {
    fontSize: isTablet ? 48 : isSmallDevice ? 32 : 40,
    fontWeight: '800',
    color: '#000',
    marginBottom: isTablet ? 30 : isSmallDevice ? 12 : 20,
  },
  description: {
    fontSize: isTablet ? 20 : isSmallDevice ? 13 : 16,
    color: '#444',
    textAlign: 'center',
    lineHeight: isTablet ? 30 : isSmallDevice ? 19 : 24,
    marginBottom: isTablet ? 30 : isSmallDevice ? 15 : 20,
    fontWeight: '400',
  },
  getStartedButton: {
    width: '100%',
    maxWidth: 400,
    height: isTablet ? 68 : isSmallDevice ? 52 : 60,
    backgroundColor: '#000',
    borderRadius: isTablet ? 20 : isSmallDevice ? 14 : 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: isTablet ? 20 : isSmallDevice ? 12 : 16,
  },
  getStartedText: {
    color: '#fff',
    fontSize: isTablet ? 22 : isSmallDevice ? 16 : 18,
    fontWeight: '700',
    marginRight: 12,
  },
  arrowIcon: {
    width: isTablet ? 32 : isSmallDevice ? 24 : 28,
    height: isTablet ? 32 : isSmallDevice ? 24 : 28,
    borderRadius: isTablet ? 16 : isSmallDevice ? 12 : 14,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: isTablet ? 20 : isSmallDevice ? 12 : 16,
  },
  footerText: {
    fontSize: isTablet ? 14 : isSmallDevice ? 10 : 12,
    color: '#888',
    textAlign: 'center',
    lineHeight: isTablet ? 20 : isSmallDevice ? 14 : 16,
  },
  link: {
    color: '#000',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: width,
    height: height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.83)', 
  },
});

export default WelcomeScreen;