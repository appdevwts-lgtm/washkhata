import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const OrderCard = ({ order, isTablet, isLargeTablet, navigation }) => {
  const statusConfig = {
    processing: {
      color: '#6366F1',
      bg: '#EEF2FF',
      text: 'In Progress',
      icon: 'time-outline',
    },
    completed: {
      color: '#10B981',
      bg: '#ECFDF5',
      text: 'Completed',
      icon: 'checkmark-circle-outline',
    },
    pending: {
      color: '#F59E0B',
      bg: '#FEF3C7',
      text: 'Pending',
      icon: 'hourglass-outline',
    },
  };

  const config = statusConfig[order.status];

  return (
    <TouchableOpacity
      style={[styles.card, isTablet && styles.cardTablet]}
      activeOpacity={0.6}
      onPress={() => navigation.navigate('OrderDetails', { order })}
    >
      <View style={styles.cardHeader}>
        <View style={styles.orderInfo}>
          <Text
            style={[styles.orderNumber, isTablet && styles.orderNumberTablet]}
          >
            Order #{order.id}
          </Text>
          <View style={styles.dateRow}>
            <Icon
              name="calendar-outline"
              size={isTablet ? 15 : 13}
              color="#94A3B8"
            />
            <Text style={[styles.dateText, isTablet && styles.dateTextTablet]}>
              {order.date}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: config.bg },
            isTablet && styles.statusBadgeTablet,
          ]}
        >
          <Icon
            name={config.icon}
            size={isTablet ? 16 : 14}
            color={config.color}
          />
          <Text
            style={[
              styles.statusText,
              { color: config.color },
              isTablet && styles.statusTextTablet,
            ]}
          >
            {config.text}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.cardBody}>
        <View style={[styles.metaRow, isLargeTablet && styles.metaRowLarge]}>
          <View style={styles.metaItem}>
            <View
              style={[
                styles.metaIcon,
                { backgroundColor: '#F0F9FF' },
                isTablet && styles.metaIconTablet,
              ]}
            >
              <Icon
                name="shirt-outline"
                size={isTablet ? 20 : 16}
                color="#0EA5E9"
              />
            </View>
            <View>
              <Text
                style={[styles.metaLabel, isTablet && styles.metaLabelTablet]}
              >
                Items
              </Text>
              <Text
                style={[styles.metaValue, isTablet && styles.metaValueTablet]}
              >
                {order.items}
              </Text>
            </View>
          </View>

          <View style={styles.metaItem}>
            <View
              style={[
                styles.metaIcon,
                { backgroundColor: '#FEF3C7' },
                isTablet && styles.metaIconTablet,
              ]}
            >
              <Icon
                name="calendar-outline"
                size={isTablet ? 20 : 16}
                color="#F59E0B"
              />
            </View>
            <View>
              <Text
                style={[styles.metaLabel, isTablet && styles.metaLabelTablet]}
              >
                Pickup
              </Text>
              <Text
                style={[styles.metaValue, isTablet && styles.metaValueTablet]}
              >
                {order.pickup}
              </Text>
            </View>
          </View>

          <View style={styles.metaItem}>
            <View
              style={[
                styles.metaIcon,
                { backgroundColor: '#F0FDF4' },
                isTablet && styles.metaIconTablet,
              ]}
            >
              <Icon
                name="car-outline"
                size={isTablet ? 20 : 16}
                color="#10B981"
              />
            </View>
            <View>
              <Text
                style={[styles.metaLabel, isTablet && styles.metaLabelTablet]}
              >
                Delivery
              </Text>
              <Text
                style={[styles.metaValue, isTablet && styles.metaValueTablet]}
              >
                {order.delivery}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.cardFooter, isTablet && styles.cardFooterTablet]}>
        <View style={styles.priceSection}>
          <Text
            style={[styles.priceLabel, isTablet && styles.priceLabelTablet]}
          >
            Total
          </Text>
          <Text style={[styles.price, isTablet && styles.priceTablet]}>
            ${order.amount}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.actionButton, isTablet && styles.actionButtonTablet]}
          activeOpacity={0.7}
        >
          <Text
            style={[styles.actionText, isTablet && styles.actionTextTablet]}
          >
            View Details
          </Text>
          <Icon
            name="chevron-forward"
            size={isTablet ? 20 : 18}
            color="#6366F1"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default function LaundryApp() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const isLargeTablet = width >= 1024;

  const numColumns = isTablet ? 2 : 1;

  const [activeTab, setActiveTab] = useState('all');
  const navigation = useNavigation();

  const orders = [
    {
      id: '2847',
      date: 'Today, 10:30 AM',
      status: 'processing',
      items: 12,
      pickup: 'Today',
      delivery: 'Jan 8',
      amount: '45.00',
    },
    {
      id: '2846',
      date: 'Yesterday',
      status: 'completed',
      items: 8,
      pickup: 'Jan 4',
      delivery: 'Jan 5',
      amount: '32.50',
    },
    {
      id: '2845',
      date: 'Jan 3, 2026',
      status: 'pending',
      items: 15,
      pickup: 'Jan 7',
      delivery: 'Jan 10',
      amount: '58.00',
    },
    {
      id: '2844',
      date: 'Jan 2, 2026',
      status: 'completed',
      items: 10,
      pickup: 'Jan 2',
      delivery: 'Jan 4',
      amount: '38.75',
    },
    {
      id: '2843',
      date: 'Jan 1, 2026',
      status: 'completed',
      items: 6,
      pickup: 'Jan 1',
      delivery: 'Jan 3',
      amount: '28.00',
    },
    {
      id: '2842',
      date: 'Dec 30, 2025',
      status: 'completed',
      items: 14,
      pickup: 'Dec 30',
      delivery: 'Jan 2',
      amount: '52.50',
    },
  ];

  const tabs = [
    { id: 'all', label: 'All', icon: 'grid-outline' },
    { id: 'processing', label: 'Active', icon: 'time-outline' },
    { id: 'completed', label: 'Done', icon: 'checkmark-circle-outline' },
    { id: 'pending', label: 'Pending', icon: 'hourglass-outline' },
  ];

  const filteredOrders =
    activeTab === 'all' ? orders : orders.filter(o => o.status === activeTab);

  const renderOrderCard = ({ item }) => (
    <View
      style={[
        styles.orderCardWrapper,
        isTablet && styles.orderCardWrapperTablet,
      ]}
    >
      <OrderCard
        navigation={navigation}
        order={item}
        isTablet={isTablet}
        isLargeTablet={isLargeTablet}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={[styles.header, isTablet && styles.headerTablet]}>
        <View style={isTablet && styles.headerInner}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabContainer}
            contentContainerStyle={[
              styles.tabContent,
              isTablet && styles.tabContentTablet,
            ]}
          >
            {tabs.map(tab => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                style={[
                  styles.tab,
                  isTablet && styles.tabTablet,
                  activeTab === tab.id && styles.tabActive,
                ]}
                activeOpacity={0.7}
              >
                <Icon
                  name={tab.icon}
                  size={isTablet ? 20 : 18}
                  color={activeTab === tab.id ? '#6366F1' : '#64748B'}
                />
                <Text
                  style={[
                    styles.tabText,
                    isTablet && styles.tabTextTablet,
                    activeTab === tab.id && styles.tabTextActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {isTablet ? (
        // Grid layout for tablets
        <FlatList
          data={filteredOrders}
          renderItem={renderOrderCard}
          keyExtractor={item => item.id}
          key={numColumns}
          numColumns={numColumns}
          contentContainerStyle={[
            styles.contentContainer,
            styles.contentContainerTablet,
          ]}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Text style={[styles.sectionTitle, styles.sectionTitleTablet]}>
              Recent Orders
            </Text>
          }
        />
      ) : (
        // Single column for mobile
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          {filteredOrders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              navigation={navigation}
              isTablet={isTablet}
              isLargeTablet={isLargeTablet}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTablet: {
    paddingHorizontal: 32,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerInner: {
    maxWidth: 1400,
    marginHorizontal: 'auto',
    width: '100%',
  },
  tabContainer: {
    flexGrow: 0,
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  tabContent: {
    gap: 8,
  },
  tabContentTablet: {
    gap: 12,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tabTablet: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    gap: 10,
  },
  tabActive: {
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextTablet: {
    fontSize: 16,
  },
  tabTextActive: {
    color: '#6366F1',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 60,
  },
  contentContainerTablet: {
    paddingHorizontal: 32,
    paddingTop: 20,
    paddingBottom: 32,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    gap: 20,
  },
  orderCardWrapper: {
    marginBottom: 0,
  },
  orderCardWrapperTablet: {
    flex: 1,
    maxWidth: '48.5%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  sectionTitleTablet: {
    fontSize: 24,
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTablet: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  orderNumberTablet: {
    fontSize: 22,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '500',
  },
  dateTextTablet: {
    fontSize: 15,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  statusBadgeTablet: {
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  statusTextTablet: {
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginBottom: 16,
  },
  cardBody: {
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaRowLarge: {
    gap: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  metaIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaIconTablet: {
    width: 44,
    height: 44,
    borderRadius: 12,
  },
  metaLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metaLabelTablet: {
    fontSize: 12,
    marginBottom: 3,
  },
  metaValue: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '600',
  },
  metaValueTablet: {
    fontSize: 17,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  cardFooterTablet: {
    paddingTop: 20,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  priceLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  priceLabelTablet: {
    fontSize: 15,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  priceTablet: {
    fontSize: 28,
    letterSpacing: -0.8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
  },
  actionButtonTablet: {
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
  },
  actionTextTablet: {
    fontSize: 16,
  },
});
