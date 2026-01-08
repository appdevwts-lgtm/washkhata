import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const NotificationsListingScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'Order Confirmed',
      message: 'Your laundry order #LA12345 has been confirmed for pickup at 10:00 AM.',
      time: '10 min ago',
      read: false,
      icon: 'checkmark-circle',
      color: '#4CAF50',
    },
    {
      id: 2,
      type: 'delivery',
      title: 'Out for Delivery',
      message: 'Your cleaned clothes are on the way! Delivery between 2:00 PM - 3:00 PM.',
      time: '1 hour ago',
      read: false,
      icon: 'bicycle',
      color: '#2196F3',
    },
    {
      id: 3,
      type: 'promotion',
      title: 'Weekend Special!',
      message: 'Get 25% OFF on all weekend laundry orders. Use code: WEEKEND25',
      time: '5 hours ago',
      read: true,
      icon: 'pricetag',
      color: '#FF9800',
    },
    {
      id: 4,
      type: 'payment',
      title: 'Payment Successful',
      message: 'Payment of ₹450.00 for order #LA12344 has been processed.',
      time: 'Yesterday',
      read: true,
      icon: 'card',
      color: '#8BC34A',
    },
    {
      id: 5,
      type: 'reminder',
      title: 'Pickup Reminder',
      message: 'Keep your laundry ready for tomorrow\'s pickup at 11:00 AM.',
      time: '1 day ago',
      read: true,
      icon: 'alarm',
      color: '#FF6B6B',
    },
    {
      id: 6,
      type: 'system',
      title: 'App Update Available',
      message: 'Update to version 2.1.0 for new features and improved performance.',
      time: '2 days ago',
      read: true,
      icon: 'download',
      color: '#9C27B0',
    },
    {
      id: 7,
      type: 'review',
      title: 'Rate Your Experience',
      message: 'How was your recent laundry service? Share your feedback.',
      time: '3 days ago',
      read: true,
      icon: 'star',
      color: '#FFD700',
    },
    {
      id: 8,
      type: 'order',
      title: 'Service Completed',
      message: 'Your dry cleaning order #LA12343 has been completed.',
      time: '1 week ago',
      read: true,
      icon: 'checkmark-done',
      color: '#00BCD4',
    },
  ]);

  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All', icon: 'notifications' },
    { id: 'unread', label: 'Unread', icon: 'ellipse' },
    { id: 'order', label: 'Orders', icon: 'cube' },
    { id: 'promotion', label: 'Promotions', icon: 'pricetag' },
  ];

  const getFilteredNotifications = () => {
    if (activeFilter === 'all') return notifications;
    if (activeFilter === 'unread') return notifications.filter(n => !n.read);
    return notifications.filter(n => n.type === activeFilter);
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = getFilteredNotifications();

  const renderNotificationItem = (notification) => (
    <TouchableOpacity
      key={notification.id}
      style={[
        styles.notificationItem,
        !notification.read && styles.notificationItemUnread,
      ]}
      onPress={() => markAsRead(notification.id)}
      activeOpacity={0.7}
    >
      {/* Unread Indicator */}
      {!notification.read && <View style={styles.unreadDot} />}

      {/* Notification Icon */}
      <View style={[styles.iconContainer, { backgroundColor: `${notification.color}15` }]}>
        <Icon name={notification.icon} size={20} color={notification.color} />
      </View>

      {/* Notification Content */}
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.notificationTitle} numberOfLines={1}>
            {notification.title}
          </Text>
          <Text style={styles.timeText}>{notification.time}</Text>
        </View>
        
        <Text style={styles.messageText} numberOfLines={2}>
          {notification.message}
        </Text>
      </View>

      {/* Delete Button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={(e) => {
          e.stopPropagation();
          deleteNotification(notification.id);
        }}
      >
        <Icon name="close" size={18} color="#999999" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
        
        {/* <TouchableOpacity 
          style={styles.markAllButton}
          onPress={markAllAsRead}
          disabled={unreadCount === 0}
        >
          <Text style={[
            styles.markAllText,
            unreadCount === 0 && styles.markAllTextDisabled
          ]}>
            Mark all read
          </Text>
        </TouchableOpacity> */}
      </View>

      {/* Filter Tabs */}
      {/* <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              activeFilter === filter.id && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter(filter.id)}
          >
            <Icon 
              name={filter.icon} 
              size={16} 
              color={activeFilter === filter.id ? '#000000' : '#666666'} 
            />
            <Text style={[
              styles.filterText,
              activeFilter === filter.id && styles.filterTextActive,
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView> */}

      {/* Notifications List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#000000']}
            tintColor="#000000"
          />
        }
      >
        {filteredNotifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon 
              name="notifications-off-outline" 
              size={64} 
              color="#E5E5E5" 
            />
            <Text style={styles.emptyTitle}>
              No notifications
            </Text>
            <Text style={styles.emptyText}>
              {activeFilter === 'unread' 
                ? 'All caught up! No unread notifications.'
                : 'You don\'t have any notifications yet.'}
            </Text>
          </View>
        ) : (
          <View style={styles.notificationsList}>
            {filteredNotifications.map(renderNotificationItem)}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  unreadBadge: {
    backgroundColor: '#FF6B6B',
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  markAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  markAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  markAllTextDisabled: {
    color: '#CCCCCC',
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 12,
  },
  filterButtonActive: {
    backgroundColor: '#000000',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
  notificationsList: {
    padding: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    position: 'relative',
  },
  notificationItemUnread: {
    backgroundColor: '#FAFAFA',
    borderColor: '#E5E5E5',
  },
  unreadDot: {
    position: 'absolute',
    left: 8,
    top: '50%',
    marginTop: -3,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2196F3',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000000',
    flex: 1,
    marginRight: 8,
  },
  timeText: {
    fontSize: 12,
    color: '#666666',
  },
  messageText: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
});

export default NotificationsListingScreen;