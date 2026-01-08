import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  TextInput,
  ScrollView,
  Dimensions,
  PanResponder,
  Animated,
  BackHandler,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('window');

// Detect if device is tablet (width >= 600px is typical tablet breakpoint)
const isTablet = width >= 600;
const isLargeTablet = width >= 900;
const isLandscape = width > height;

// Calculate responsive values
const calculateColumns = () => {
  if (isLargeTablet && isLandscape) return 4;
  if (isLargeTablet) return 3;
  if (isTablet) return 2;
  return 1; // Mobile
};

const calculateCardWidth = () => {
  const columns = calculateColumns();
  const horizontalMargin = 20 * 2; // Total padding horizontal
  const gap = (columns - 1) * 12; // Gap between cards
  return (width - horizontalMargin - gap) / columns;
};

const CouponCard = ({ coupon, onApply, cardWidth }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <View style={[styles.couponCard, { width: cardWidth }]}>
      {/* Coupon Header with Ribbon */}
      <View style={styles.couponHeader}>
        <View style={styles.couponBadge}>
          <Icon name="pricetag" size={14} color="#000000" />
          <Text style={styles.couponCode}>{coupon.code}</Text>
        </View>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{coupon.discount}</Text>
        </View>
      </View>

      {/* Discount Tag */}
      {/* <View style={styles.discountTag}>
        <Text style={styles.discountAmount}>{coupon.discount}</Text>
        <Text style={styles.discountLabel}>OFF</Text>
      </View> */}

      <View style={styles.couponContent}>
        <Text style={styles.couponTitle} numberOfLines={2}>
          {coupon.title}
        </Text>
        <Text style={styles.couponDescription} numberOfLines={3}>
          {coupon.description}
        </Text>

        <View style={styles.couponFooter}>
          <View style={styles.validityRow}>
            <Icon name="time-outline" size={12} color="#666666" />
            <Text style={styles.validityText}>Valid till {coupon.validity}</Text>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={styles.copyBtnSmall}
              onPress={handleCopy}
              activeOpacity={0.7}
            >
              <Icon 
                name={isCopied ? "checkmark" : "copy-outline"} 
                size={14} 
                color={isCopied ? "#4CAF50" : "#666666"} 
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.applyBtn}
              onPress={() => onApply(coupon)}
              activeOpacity={0.7}
            >
              <Text style={styles.applyText}>Apply</Text>
              <Icon name="arrow-forward" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      {/* Dashed Border Effect */}
      <View style={styles.dashedBorderLeft} />
      <View style={styles.dashedBorderRight} />
    </View>
  );
};

export default function CouponModal({ visible, onClose, isModal = false }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const navigation = useNavigation();
  
  const translateY = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(0);
  
  // Responsive calculations
  const columns = calculateColumns();
  const cardWidth = calculateCardWidth();
  const modalHeight = isTablet ? (isLandscape ? height * 0.85 : height * 0.8) : height * 0.75;

  // Handle Android back button - CORRECTED VERSION
  useEffect(() => {
    const handleBackPress = () => {
      if (visible) {
        console.log("Back button pressed - Modal visible");
        handleClose();
        return true;
      }
      return false;
    };

    let subscription = null;
    if (visible) {
      subscription = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [visible, onClose]);

  const coupons = [
    {
      id: 1,
      code: 'FIRST50',
      title: '50% OFF on First Order',
      description: 'Get 50% discount on your first laundry order. Maximum discount up to ₹200.',
      validity: 'Dec 31, 2026',
      discount: '50%',
      color: '#FF6B6B',
    },
    {
      id: 2,
      code: 'WASH20',
      title: 'Flat ₹20 OFF',
      description: 'Flat ₹20 discount on all wash and fold services. No minimum order value.',
      validity: 'Jan 31, 2026',
      discount: '₹20',
      color: '#4ECDC4',
    },
    {
      id: 3,
      code: 'PREMIUM100',
      title: '₹100 OFF on Premium Care',
      description: 'Save ₹100 on premium care services. Minimum order value ₹500.',
      validity: 'Feb 15, 2026',
      discount: '₹100',
      color: '#FFD166',
    },
    {
      id: 4,
      code: 'EXPRESS15',
      title: '15% OFF on Express Delivery',
      description: 'Get 15% discount when you choose express delivery option. Maximum discount ₹150.',
      validity: 'Jan 20, 2026',
      discount: '15%',
      color: '#06D6A0',
    },
    {
      id: 5,
      code: 'DRY30',
      title: '30% OFF Dry Cleaning',
      description: 'Enjoy 30% off on all dry cleaning services. Valid for all items.',
      validity: 'Mar 10, 2026',
      discount: '30%',
      color: '#118AB2',
    },
    {
      id: 6,
      code: 'IRON10',
      title: 'Flat ₹10 OFF Ironing',
      description: 'Get ₹10 discount on ironing services. Applicable on minimum 5 items.',
      validity: 'Feb 28, 2026',
      discount: '₹10',
      color: '#EF476F',
    },
    {
      id: 7,
      code: 'WEEKEND25',
      title: 'Weekend Special 25% OFF',
      description: 'Save 25% on weekend orders. Valid only on Saturday and Sunday.',
      validity: 'Jan 31, 2026',
      discount: '25%',
      color: '#7B68EE',
    },
    {
      id: 8,
      code: 'BULK200',
      title: '₹200 OFF Bulk Orders',
      description: 'Flat ₹200 discount on orders above ₹1000. Perfect for bulk laundry.',
      validity: 'Mar 31, 2026',
      discount: '₹200',
      color: '#FF9F1C',
    },
    {
      id: 9,
      code: 'SUMMER30',
      title: 'Summer Special 30% OFF',
      description: 'Summer special discount on all services. Limited time offer.',
      validity: 'Jun 30, 2026',
      discount: '30%',
      color: '#1DD3B0',
    },
    {
      id: 10,
      code: 'NEWUSER25',
      title: '25% OFF for New Users',
      description: 'Welcome offer for new users. Valid on first three orders.',
      validity: 'Apr 30, 2026',
      discount: '25%',
      color: '#A663CC',
    },
  ];

  const filteredCoupons = coupons.filter(coupon => {
    const query = searchQuery.toLowerCase();
    return (
      coupon.code.toLowerCase().includes(query) ||
      coupon.title.toLowerCase().includes(query) ||
      coupon.description.toLowerCase().includes(query)
    );
  });

  const handleApply = (coupon) => {
    setSelectedCoupon(coupon);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleClose = useCallback(() => {
    navigation.replace("Tab", {screen:"Profile"})
  }, [onClose]);

  // Organize coupons into rows for grid layout
  const renderCouponGrid = () => {
    const rows = [];
    for (let i = 0; i < filteredCoupons.length; i += columns) {
      const rowCoupons = filteredCoupons.slice(i, i + columns);
      rows.push(
        <View key={`row-${i}`} style={styles.couponRow}>
          {rowCoupons.map((coupon) => (
            <CouponCard 
              key={coupon.id} 
              coupon={coupon}
              onApply={handleApply}
              cardWidth={cardWidth}
            />
          ))}
          {/* Fill empty spaces in last row */}
          {rowCoupons.length < columns && 
            Array(columns - rowCoupons.length).fill().map((_, index) => (
              <View key={`empty-${index}`} style={{ width: cardWidth }} />
            ))
          }
        </View>
      );
    }
    return rows;
  };

  // Pan Responder for swipe down gesture
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => isModal,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return isModal && scrollY.current <= 0 && gestureState.dy > 0;
      },
      onPanResponderMove: (_, gestureState) => {
        if (isModal && gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (isModal) {
          if (gestureState.dy > 100 || gestureState.vy > 0.5) {
            Animated.timing(translateY, {
              toValue: height,
              duration: 300,
              useNativeDriver: true,
            }).start(() => {
              handleClose();
              translateY.setValue(0);
            });
          } else {
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        }
      },
    })
  ).current;

  const handleScroll = (event) => {
    scrollY.current = event.nativeEvent.contentOffset.y;
  };

  // Modal header with responsive font size
  const modalHeader = (
    <View style={styles.modalHeader}>
      <Text style={[styles.modalTitle, isTablet && styles.tabletTitle]}>
        Available Coupons
      </Text>
      <View style={styles.headerStats}>
        <View style={styles.statsBadge}>
          <Icon name="pricetag" size={14} color="#FFFFFF" />
          <Text style={styles.statsText}>
            {filteredCoupons.length} Available
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.closeBtn}
          onPress={handleClose}
          activeOpacity={0.7}
        >
          <Icon name="close" size={isTablet ? 28 : 24} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Search bar component
  const searchBar = (
    <View style={styles.searchContainer}>
      <View style={styles.searchBox}>
        <Icon name="search-outline" size={isTablet ? 22 : 20} color="#666666" />
        <TextInput
          style={[styles.searchInput, isTablet && styles.tabletSearchInput]}
          placeholder="Search coupon code or benefits..."
          placeholderTextColor="#999999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity 
            onPress={() => setSearchQuery('')}
            activeOpacity={0.7}
          >
            <Icon name="close-circle" size={isTablet ? 22 : 20} color="#999999" />
          </TouchableOpacity>
        )}
      </View>
      {isTablet && (
        <TouchableOpacity style={styles.filterBtn}>
          <Icon name="filter" size={20} color="#666666" />
        </TouchableOpacity>
      )}
    </View>
  );

  // Empty state component
  const emptyState = (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <Icon name="search-outline" size={isTablet ? 64 : 48} color="#CCCCCC" />
      </View>
      <Text style={[styles.emptyTitle, isTablet && styles.tabletEmptyTitle]}>
        No Coupons Found
      </Text>
      <Text style={[styles.emptyText, isTablet && styles.tabletEmptyText]}>
        Try searching with different keywords or check back later
      </Text>
    </View>
  );

  if (!isModal) {
    // Full Screen Mode
    return (
      <Modal
        visible={visible}
        animationType="slide"
        onRequestClose={handleClose}
        presentationStyle="fullScreen"
      >
        <SafeAreaView style={styles.fullScreenContainer}>
          <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
          
          {/* Header */}
          <View style={styles.fullScreenHeader}>
            <TouchableOpacity 
              style={[styles.backBtn, isTablet && styles.tabletBackBtn]}
              onPress={handleClose}
              activeOpacity={0.7}
            >
              <Icon name="arrow-back" size={isTablet ? 28 : 24} color="#000000" />
            </TouchableOpacity>
            <Text style={[styles.fullScreenTitle, isTablet && styles.tabletTitle]}>
              Available Coupons
            </Text>
            <View style={[styles.placeholder, isTablet && styles.tabletPlaceholder]} />
          </View>

          {/* Search Bar */}
          {searchBar}

          {/* Coupons Grid */}
          <ScrollView 
            style={styles.couponsList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.couponsContent,
              isTablet && styles.tabletCouponsContent
            ]}
          >
            {filteredCoupons.length > 0 ? (
              <>
                <View style={styles.resultsHeader}>
                  <Text style={[styles.resultsText, isTablet && styles.tabletResultsText]}>
                    {filteredCoupons.length} {filteredCoupons.length === 1 ? 'Coupon' : 'Coupons'} Available
                    {isTablet && ` • ${columns} columns`}
                  </Text>
                </View>
                {renderCouponGrid()}
              </>
            ) : (
              emptyState
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  }

  // Modal Mode (75% screen coverage)
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
      presentationStyle="overFullScreen"
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity 
          style={styles.overlayTouchable}
          activeOpacity={1}
          onPress={handleClose}
        />
        
        <Animated.View 
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY }],
              height: modalHeight,
            },
          ]}
          {...panResponder.panHandlers}
        >
          <SafeAreaView style={styles.modalSafeArea}>
            {/* Drag Handle */}
            <View style={styles.dragHandle} />
            
            {/* Header */}
            {modalHeader}

            {/* Search Bar */}
            {searchBar}

            {/* Coupons Grid */}
            <ScrollView 
              style={styles.couponsList}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={[
                styles.couponsContent,
                isTablet && styles.tabletCouponsContent
              ]}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {filteredCoupons.length > 0 ? (
                <>
                  <View style={styles.resultsHeader}>
                    <Text style={[styles.resultsText, isTablet && styles.tabletResultsText]}>
                      {filteredCoupons.length} {filteredCoupons.length === 1 ? 'Coupon' : 'Coupons'} Available
                      {isTablet && ` • ${columns} columns`}
                    </Text>
                  </View>
                  {renderCouponGrid()}
                </>
              ) : (
                emptyState
              )}
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
}

// Styles
const styles = StyleSheet.create({
  // Full Screen Styles
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  fullScreenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: isTablet ? 30 : 20,
    paddingVertical: isTablet ? 10 : 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabletBackBtn: {
    width: 54,
    height: 54,
    borderRadius: 15,
  },
  fullScreenTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -0.3,
  },
  tabletTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
  placeholder: {
    width: 44,
  },
  tabletPlaceholder: {
    width: 54,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  overlayTouchable: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: isTablet ? 30 : 24,
    borderTopRightRadius: isTablet ? 30 : 24,
    overflow: 'hidden',
  },
  modalSafeArea: {
    flex: 1,
  },
  dragHandle: {
    width: isTablet ? 60 : 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E5E5E5',
    alignSelf: 'center',
    marginVertical: isTablet ? 16 : 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: isTablet ? 30 : 20,
    paddingBottom: 16,
    paddingTop: isTablet ? 10 : 0,
  },
  headerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: isTablet ? 16 : 12,
  },
  statsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#000000',
    paddingHorizontal: isTablet ? 16 : 12,
    paddingVertical: isTablet ? 8 : 6,
    borderRadius: 20,
  },
  statsText: {
    fontSize: isTablet ? 14 : 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  closeBtn: {
    width: isTablet ? 48 : 40,
    height: isTablet ? 48 : 40,
    borderRadius: isTablet ? 24 : 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Search Styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: isTablet ? 30 : 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    gap: isTablet ? 16 : 12,
    paddingTop:10
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: isTablet ? 15 : 12,
    paddingHorizontal: isTablet ? 20 : 16,
    height: isTablet ? 60 : 50,
    gap: isTablet ? 16 : 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000000',
    fontWeight: '500',
    padding: 0,
  },
  tabletSearchInput: {
    fontSize: 16,
  },
  filterBtn: {
    width: isTablet ? 60 : 50,
    height: isTablet ? 60 : 50,
    borderRadius: isTablet ? 15 : 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Results Header
  resultsHeader: {
    paddingHorizontal: isTablet ? 30 : 20,
    paddingVertical: isTablet ? 16 : 12,
    backgroundColor: '#FAFAFA',
    marginBottom: isTablet ? 8 : 4,
  },
  resultsText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tabletResultsText: {
    fontSize: 14,
    letterSpacing: 1,
  },
  
  // Coupons Grid
  couponsList: {
    flex: 1,
  },
  couponsContent: {
    paddingBottom: isTablet ? 30 : 20,
  },
  tabletCouponsContent: {
    paddingHorizontal: isTablet ? 10 : 0,
  },
  couponRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 12,
    paddingHorizontal: isTablet ? 30 : 20,
    marginBottom: isTablet ? 20 : 16,
  },
  
  // Coupon Card
  couponCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderStyle: 'solid',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    minHeight: 200,
  },
  couponHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#F8F9FA',
  },
  couponBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  couponCode: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.5,
  },
  discountBadge: {
    backgroundColor: '#000000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  discountTag: {
    position: 'absolute',
    top: 12,
    right: -30,
    backgroundColor: '#FF6B6B',
    width: 80,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '45deg' }],
  },
  discountAmount: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  discountLabel: {
    fontSize: 8,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  couponContent: {
    padding: 16,
    paddingTop: 8,
  },
  couponTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
    letterSpacing: -0.2,
    lineHeight: 20,
  },
  couponDescription: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 18,
    marginBottom: 16,
    flex: 1,
  },
  couponFooter: {
    marginTop: 'auto',
  },
  validityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  validityText: {
    fontSize: 11,
    color: '#666666',
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  copyBtnSmall: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  applyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  dashedBorderLeft: {
    position: 'absolute',
    left: 0,
    top: '25%',
    bottom: '25%',
    width: 2,
    borderLeftWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#E5E5E5',
  },
  dashedBorderRight: {
    position: 'absolute',
    right: 0,
    top: '25%',
    bottom: '25%',
    width: 2,
    borderLeftWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#E5E5E5',
  },
  
  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isTablet ? 80 : 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: isTablet ? 100 : 80,
    height: isTablet ? 100 : 80,
    borderRadius: isTablet ? 50 : 40,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: isTablet ? 30 : 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  tabletEmptyTitle: {
    fontSize: 22,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
  tabletEmptyText: {
    fontSize: 16,
    lineHeight: 24,
  },
  
  // Example Component Styles (unchanged)
  exampleContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  exampleHeader: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  exampleTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
  },
  exampleContent: {
    padding: 20,
  },
  toggleContainer: {
    marginBottom: 20,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  toggleButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    alignItems: 'center',
  },
  toggleBtnActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  toggleBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  toggleBtnTextActive: {
    color: '#FFFFFF',
  },
  couponTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
  },
  triggerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  triggerIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  triggerText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
  },
});