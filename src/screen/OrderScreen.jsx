import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const OrderCard = ({ order }) => {
  const statusConfig = {
    processing: { color: '#3B82F6', bg: '#EFF6FF', text: 'In Progress' },
    completed: { color: '#10B981', bg: '#ECFDF5', text: 'Completed' },
    pending: { color: '#F59E0B', bg: '#FFFBEB', text: 'Pending' }
  };

  const config = statusConfig[order.status];

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.cardTop}>
        <View style={styles.cardLeft}>
          <View style={styles.iconCircle}>
            <Icon name="shirt-outline" size={24} color="#0F172A" />
          </View>
          <View>
            <Text style={styles.orderNumber}>Order #{order.id}</Text>
            <Text style={styles.dateText}>{order.date}</Text>
          </View>
        </View>
        <View style={[styles.statusPill, { backgroundColor: config.bg }]}>
          <View style={[styles.statusDot, { backgroundColor: config.color }]} />
          <Text style={[styles.statusText, { color: config.color }]}>{config.text}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Icon name="shirt-outline" size={16} color="#64748B" />
            <Text style={styles.infoLabel}>{order.items} Items</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="time-outline" size={16} color="#64748B" />
            <Text style={styles.infoLabel}>Pickup {order.pickup}</Text>
          </View>
        </View>
        
        <View style={styles.deliveryBar}>
          <View style={styles.deliveryInfo}>
            <Icon name="car-outline" size={18} color="#0F172A" />
            <Text style={styles.deliveryText}>Delivery: {order.delivery}</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.amountLabel}>TOTAL AMOUNT</Text>
          <Text style={styles.amount}>${order.amount}</Text>
        </View>
        <TouchableOpacity style={styles.detailsBtn} activeOpacity={0.8}>
          <Text style={styles.btnText}>View Details</Text>
          <Icon name="arrow-forward" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default function LaundryApp() {
  const [activeTab, setActiveTab] = useState('all');

  const orders = [
    {
      id: '2847',
      date: 'Today, 10:30 AM',
      status: 'processing',
      items: 12,
      pickup: 'Today',
      delivery: 'Jan 8, 2026',
      amount: '45.00'
    },
    {
      id: '2846',
      date: 'Yesterday',
      status: 'completed',
      items: 8,
      pickup: 'Jan 4',
      delivery: 'Jan 5, 2026',
      amount: '32.50'
    },
    {
      id: '2845',
      date: 'Jan 3, 2026',
      status: 'pending',
      items: 15,
      pickup: 'Jan 7',
      delivery: 'Jan 10, 2026',
      amount: '58.00'
    },
    {
      id: '2844',
      date: 'Jan 2, 2026',
      status: 'completed',
      items: 10,
      pickup: 'Jan 2',
      delivery: 'Jan 4, 2026',
      amount: '38.75'
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Orders', count: 4 },
    { id: 'processing', label: 'Active', count: 1 },
    { id: 'completed', label: 'Completed', count: 2 },
    { id: 'pending', label: 'Pending', count: 1 }
  ];

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(o => o.status === activeTab);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          0<View>
            {/* <Text style={styles.title}>My Orders</Text>
            <Text style={styles.subtitle}>Track your laundry orders</Text> */}
          </View>
          {/* <TouchableOpacity style={styles.menuBtn} activeOpacity={0.7}>
            <Icon name="ellipsis-horizontal" size={24} color="#0F172A" />
          </TouchableOpacity> */}
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.tabContainer}
          contentContainerStyle={styles.tabContentContainer}
        >
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              style={[
                styles.tab,
                activeTab === tab.id && styles.tabActive
              ]}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab.id && styles.tabTextActive
              ]}>
                {tab.label}
              </Text>
              <View style={[
                styles.badge,
                activeTab === tab.id && styles.badgeActive
              ]}>
                <Text style={[
                  styles.badgeText,
                  activeTab === tab.id && styles.badgeTextActive
                ]}>
                  {tab.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredOrders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </ScrollView>
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
    paddingTop: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
  },
  menuBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    flexGrow: 0,
  },
  tabContentContainer: {
    paddingBottom: 4,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'transparent',
    marginRight: 8,
  },
  tabActive: {
    backgroundColor: '#0F172A',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginRight: 8,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  badge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    minWidth: 24,
    alignItems: 'center',
  },
  badgeActive: {
    backgroundColor: '#334155',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  badgeTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 12,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 13,
    color: '#94A3B8',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  cardContent: {
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
    marginLeft: 8,
  },
  deliveryBar: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryText: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '600',
    marginLeft: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  amountLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 4,
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  amount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
  },
  detailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#0F172A',
  },
  btnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
});