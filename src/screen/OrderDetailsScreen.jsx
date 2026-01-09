import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function OrderDetailsScreen({ navigation }) {
  const [order] = useState({
    id: 'LA-2847-2026',
    status: 'processing',
    date: 'January 9, 2026',
    time: '10:30 AM',
    pickupDate: 'January 9, 2026',
    pickupTime: '02:15 PM',
    deliveryDate: 'January 12, 2026',
    deliveryTime: '11:00 AM - 1:00 PM',
    amount: '₹456.00',
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
  });

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const items = [
    {
      id: 1,
      name: 'Casual Shirts',
      quantity: 3,
      service: 'Wash & Iron',
      price: '90.00',
    },
    {
      id: 2,
      name: 'Denim Jeans',
      quantity: 2,
      service: 'Dry Clean',
      price: '160.00',
    },
    {
      id: 3,
      name: 'Cotton Bed Sheet',
      quantity: 1,
      service: 'Wash & Fold',
      price: '80.00',
    },
    {
      id: 4,
      name: 'Curtains',
      quantity: 2,
      service: 'Premium Dry Clean',
      price: '126.00',
    },
  ];

  const address = {
    name: 'Rahul Kumar',
    phone: '+91 98765 43210',
    address: 'House No. 123, Street 45, Sector 22',
    landmark: 'Near Metro Station',
    area: 'Ghaziabad, Uttar Pradesh - 201001',
  };

  const statusSteps = [
    {
      id: 1,
      title: 'Order Placed',
      description: 'Order confirmed and scheduled',
      time: 'Jan 9, 10:30 AM',
      completed: true,
      icon: 'checkmark-circle',
      color: '#10B981',
    },
    {
      id: 2,
      title: 'Picked Up',
      description: 'Items collected from your location',
      time: 'Jan 9, 02:15 PM',
      completed: true,
      icon: 'cube-outline',
      color: '#3B82F6',
    },
    {
      id: 3,
      title: 'Processing',
      description: 'Cleaning in progress at our facility',
      time: 'Expected: Jan 11',
      completed: false,
      current: true,
      icon: 'sync',
      color: '#F59E0B',
    },
    {
      id: 4,
      title: 'Quality Check',
      description: 'Final inspection and packaging',
      time: 'Pending',
      completed: false,
      icon: 'shield-checkmark',
      color: '#8B5CF6',
    },
    {
      id: 5,
      title: 'Out for Delivery',
      description: 'On the way to your location',
      time: 'Jan 12',
      completed: false,
      icon: 'car-sport',
      color: '#EC4899',
    },
  ];

  const getStatusConfig = () => {
    switch (order.status) {
      case 'processing':
        return {
          color: '#3B82F6',
          bg: 'rgba(59, 130, 246, 0.1)',
          icon: 'sync-outline',
          text: 'Processing',
        };
      case 'completed':
        return {
          color: '#10B981',
          bg: 'rgba(16, 185, 129, 0.1)',
          icon: 'checkmark-done-circle',
          text: 'Completed',
        };
      case 'pending':
        return {
          color: '#F59E0B',
          bg: 'rgba(245, 158, 11, 0.1)',
          icon: 'time-outline',
          text: 'Pending',
        };
      case 'cancelled':
        return {
          color: '#EF4444',
          bg: 'rgba(239, 68, 68, 0.1)',
          icon: 'close-circle',
          text: 'Cancelled',
        };
      default:
        return {
          color: '#6B7280',
          bg: 'rgba(107, 114, 128, 0.1)',
          icon: 'help-circle',
          text: 'Unknown',
        };
    }
  };

  const statusConfig = getStatusConfig();

  const handleBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Fixed Header on Scroll */}
      <Animated.View style={[styles.fixedHeader, { opacity: headerOpacity }]}>
        <View style={styles.fixedHeaderBg} />
        <View style={styles.fixedHeaderContent}>
          <TouchableOpacity style={styles.fixedBackBtn} onPress={handleBack}>
            <Icon name="arrow-back" size={22} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.fixedHeaderTitle}>
            Order #{order.id.split('-')[1]}
          </Text>
          <View style={styles.fixedHeaderRight}>
            <TouchableOpacity style={styles.fixedHeaderBtn}>
              <Icon name="share-outline" size={20} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.fixedHeaderBtn}>
              <Icon name="ellipsis-horizontal" size={20} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
      >
        {/* Hero Card */}
        <View style={styles.heroCardContainer}>
          <View style={styles.heroGradient} />
          <View style={styles.heroCard}>
            <View style={styles.heroContent}>
              <View>
                <Text style={styles.heroLabel}>ORDER ID</Text>
                <Text style={styles.heroId}>{order.id}</Text>
              </View>
              <View
                style={[
                  styles.heroStatus,
                  { backgroundColor: statusConfig.bg },
                ]}
              >
                <Icon
                  name={statusConfig.icon}
                  size={16}
                  color={statusConfig.color}
                />
                <Text
                  style={[styles.heroStatusText, { color: statusConfig.color }]}
                >
                  {statusConfig.text}
                </Text>
              </View>
            </View>

            <View style={styles.heroDivider} />

            <View style={styles.heroMeta}>
              <View style={styles.metaItem}>
                <Icon name="calendar" size={14} color="#9CA3AF" />
                <Text style={styles.metaText}>{order.date}</Text>
              </View>
              <View style={styles.metaItem}>
                <Icon name="time" size={14} color="#9CA3AF" />
                <Text style={styles.metaText}>{order.time}</Text>
              </View>
            </View>
            <View style={styles.heroMetaRow}>
              <Icon name="wallet" size={14} color="#9CA3AF" />
              <Text style={styles.metaText}>{order.amount}</Text>
            </View>
          </View>
        </View>

        {/* Order Status Timeline */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Order Journey</Text>
          </View>

          <View style={styles.timelineCard}>
            {statusSteps.map((step, index) => (
              <View key={step.id} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View
                    style={[
                      styles.statusDot,
                      step.completed && {
                        backgroundColor: step.color,
                        borderColor: step.color,
                      },
                      step.current && {
                        backgroundColor: '#FFFFFF',
                        borderColor: step.color,
                        borderWidth: 3,
                      },
                    ]}
                  >
                    {step.completed && (
                      <Icon name="checkmark" size={12} color="#FFFFFF" />
                    )}
                    {step.current && (
                      <View
                        style={[
                          styles.pulseDot,
                          { backgroundColor: step.color },
                        ]}
                      />
                    )}
                  </View>
                  {index < statusSteps.length - 1 && (
                    <View
                      style={[
                        styles.timelineLine,
                        step.completed && { backgroundColor: step.color },
                      ]}
                    />
                  )}
                </View>
                <View style={styles.timelineContent}>
                  <View style={styles.timelineHeader}>
                    <Text
                      style={[
                        styles.timelineTitle,
                        step.completed && styles.timelineTitleCompleted,
                        step.current && styles.timelineTitleCurrent,
                      ]}
                    >
                      {step.title}
                    </Text>
                    <Text style={styles.timelineTime}>{step.time}</Text>
                  </View>
                  <Text style={styles.timelineDesc}>{step.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Schedule Card */}
        <View style={styles.scheduleSection}>
          <View style={styles.scheduleGrid}>
            <View style={styles.scheduleCard}>
              <View
                style={[
                  styles.scheduleIcon,
                  { backgroundColor: 'rgba(59, 130, 246, 0.1)' },
                ]}
              >
                <Icon name="cube-outline" size={20} color="#3B82F6" />
              </View>
              <Text style={styles.scheduleLabel}>PICKUP</Text>
              <Text style={styles.scheduleDate}>{order.pickupDate}</Text>
              <Text style={styles.scheduleTime}>{order.pickupTime}</Text>
            </View>

            <View style={styles.scheduleArrow}>
              <Icon name="arrow-forward" size={20} color="#9CA3AF" />
            </View>

            <View style={styles.scheduleCard}>
              <View
                style={[
                  styles.scheduleIcon,
                  { backgroundColor: 'rgba(16, 185, 129, 0.1)' },
                ]}
              >
                <Icon name="car-sport-outline" size={20} color="#10B981" />
              </View>
              <Text style={styles.scheduleLabel}>DELIVERY</Text>
              <Text style={styles.scheduleDate}>{order.deliveryDate}</Text>
              <Text style={styles.scheduleTime}>{order.deliveryTime}</Text>
            </View>
          </View>
        </View>

        {/* Items Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Items ({items.length})</Text>
          </View>

          <View style={styles.itemsCard}>
            {items.map(item => (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemIconContainer}>
                    <Icon name="shirt-outline" size={18} color="#3B82F6" />
                  </View>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemService}>{item.service}</Text>
                  </View>
                  <View style={styles.itemQuantity}>
                    <Text style={styles.quantityText}>x{item.quantity}</Text>
                  </View>
                </View>
                <View style={styles.itemFooter}>
                  <Text style={styles.itemPriceLabel}>Total</Text>
                  <Text style={styles.itemPrice}>₹{item.price}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Address Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
          </View>

          <View style={styles.addressCard}>
            <View style={styles.addressHeader}>
              <View style={styles.addressIcon}>
                <Icon name="person-circle-outline" size={20} color="#000000" />
              </View>
              <View>
                <Text style={styles.addressName}>{address.name}</Text>
                <Text style={styles.addressPhone}>{address.phone}</Text>
              </View>
            </View>
            <View style={styles.addressBody}>
              <Icon
                name="location-outline"
                size={16}
                color="#6B7280"
                style={styles.addressPin}
              />
              <View style={styles.addressDetails}>
                <Text style={styles.addressLine}>{address.address}</Text>
                {address.landmark && (
                  <Text style={styles.addressLandmark}>
                    Landmark: {address.landmark}
                  </Text>
                )}
                <Text style={styles.addressArea}>{address.area}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Payment Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>

          <View style={styles.paymentCard}>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Subtotal</Text>
              <Text style={styles.paymentValue}>₹426.00</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Delivery Fee</Text>
              <Text style={styles.paymentValue}>₹30.00</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Service Charge</Text>
              <Text style={styles.paymentValue}>₹20.00</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Promotion Discount</Text>
              <Text style={styles.paymentDiscount}>-₹20.00</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.paymentTotal}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>{order.amount}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.paymentMethod}>
              <View style={styles.paymentMethodHeader}>
                <Icon name="card-outline" size={18} color="#6B7280" />
                <Text style={styles.paymentMethodText}>
                  {order.paymentMethod}
                </Text>
              </View>
              <View
                style={[
                  styles.paymentStatus,
                  order.paymentStatus === 'Pending' && {
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.paymentStatusText,
                    order.paymentStatus === 'Pending' && { color: '#F59E0B' },
                  ]}
                >
                  {order.paymentStatus}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* <View style={styles.bottomSpacer} /> */}
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.secondaryBtn}>
          <Icon name="close-circle-outline" size={20} color="#6B7280" />
          <Text style={styles.secondaryBtnText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryBtn}>
          <Icon name="navigate-outline" size={20} color="#FFFFFF" />
          <Text style={styles.primaryBtnText}>Track Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight || 0,
  },
  fixedHeaderBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
    opacity: 0.98,
  },
  fixedHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  fixedBackBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixedHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  fixedHeaderRight: {
    flexDirection: 'row',
    gap: 8,
  },
  fixedHeaderBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  heroCardContainer: {
    margin: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1F2937',
  },
  heroCard: {
    padding: 24,
  },
  heroContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  heroLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  heroId: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  heroStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  heroStatusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  heroDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 16,
  },
  heroMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  heroMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#D1D5DB',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.3,
  },
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  timelineItem: {
    flexDirection: 'row',
    minHeight: 72,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 16,
    width: 24,
  },
  statusDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    zIndex: 2,
  },
  pulseDot: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    opacity: 0.2,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 24,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  timelineTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
    flex: 1,
  },
  timelineTitleCompleted: {
    color: '#374151',
  },
  timelineTitleCurrent: {
    color: '#000000',
    fontWeight: '700',
  },
  timelineTime: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA3AF',
    marginLeft: 8,
  },
  timelineDesc: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 19,
  },
  scheduleSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  scheduleGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scheduleCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  scheduleIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  scheduleLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  scheduleDate: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
    textAlign: 'center',
  },
  scheduleTime: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
  },
  scheduleArrow: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemsCard: {
    gap: 12,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 3,
  },
  itemService: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  itemQuantity: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  quantityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  itemPriceLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  addressIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 3,
  },
  addressPhone: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },
  addressBody: {
    flexDirection: 'row',
  },
  addressPin: {
    marginTop: 2,
    marginRight: 10,
  },
  addressDetails: {
    flex: 1,
  },
  addressLine: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
    lineHeight: 20,
  },
  addressLandmark: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  addressArea: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },
  paymentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  paymentValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  paymentDiscount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 16,
  },
  paymentTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentMethodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  paymentMethodText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  paymentStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  paymentStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  quickAction: {
    alignItems: 'center',
    gap: 8,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  secondaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  secondaryBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  primaryBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#1F2937',
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bottomSpacer: {
    height: 100,
  },
});
