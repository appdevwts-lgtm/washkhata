import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const ZomatoCartUI = ({ navigation }) => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Party wear',
      price: 50,
      quantity: 3,
    },
    {
      id: 2,
      name: 'Silk saree',
      price: 150,
      quantity: 1,
    },
  ]);

  const [services, setServices] = useState([
    { id: 1, name: 'Wash & Fold', selected: true },
    { id: 2, name: 'Softener', selected: false },
    { id: 3, name: 'Express Delivery', selected: false },
  ]);

  const handleQuantityChange = (itemId, change) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item,
      ),
    );
  };

  const toggleService = serviceId => {
    setServices(prevServices =>
      prevServices.map(service =>
        service.id === serviceId
          ? { ...service, selected: !service.selected }
          : service,
      ),
    );
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const serviceCharge = services.filter(s => s.selected).length * 10;
  const deliveryFee = 20;
  const total = subtotal + serviceCharge + deliveryFee;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Black Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack()}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Icon name="shopping-cart" size={20} color="#FFF" />
          <Text style={styles.headerTitle}>Cart</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <IconCommunity
              name="shopping"
              size={14}
              color="#FFF"
              style={{ opacity: 0.9 }}
            />
            <Text style={styles.headerItems}>{items.length} items</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Delivery Address Card - Zomato Style */}
        <View style={styles.card}>
          <View style={styles.deliveryHeader}>
            <View style={styles.deliveryIconContainer}>
              <Icon name="location-on" size={16} color="#000000" />
            </View>
            <View style={styles.deliveryContent}>
              <Text style={styles.deliveryLabel}>Delivering to</Text>
              <Text style={styles.deliveryAddress}>
                Priyo Sharma, 45 GreenPark Avenue
              </Text>
              <Text style={styles.deliveryTime}>25-30 mins</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.changeText}>CHANGE</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Items Card */}
        <View style={styles.card}>
          <FlatList
            data={items}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <View>
                <View style={styles.itemRow}>
                  <View style={styles.itemIndicator}>
                    <View style={styles.vegIcon} />
                  </View>

                  <View style={styles.itemContent}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>₹{item.price}</Text>
                  </View>

                  <View style={styles.quantityControl}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleQuantityChange(item.id, -1)}
                      activeOpacity={0.7}
                    >
                      <Icon name="remove" size={14} color="#000000" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleQuantityChange(item.id, 1)}
                      activeOpacity={0.7}
                    >
                      <Icon name="add" size={14} color="#000000" />
                    </TouchableOpacity>
                  </View>
                </View>
                {index < items.length - 1 && (
                  <View style={styles.itemDivider} />
                )}
              </View>
            )}
          />

          {/* Add More Items */}
          <TouchableOpacity style={styles.addMoreButton} activeOpacity={0.7}>
            <Icon name="add-circle-outline" size={20} color="#000000" />
            <Text style={styles.addMoreText}>Add more items</Text>
          </TouchableOpacity>
        </View>

        {/* Bill Details - Zomato Style */}
        <View style={styles.card}>
          <Text style={styles.billHeader}>Bill Details</Text>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Item Total</Text>
            <Text style={styles.billValue}>₹{subtotal}</Text>
          </View>
          <View style={styles.billRow}>
            <View style={styles.billLabelRow}>
              <Text style={styles.billLabel}>Delivery Fee</Text>
              <Icon name="info-outline" size={14} color="#9C9C9C" />
            </View>
            <Text style={styles.billValue}>₹{deliveryFee}</Text>
          </View>
          <View style={styles.billDivider} />
          <View style={styles.billRow}>
            <Text style={styles.billTotalLabel}>To Pay</Text>
            <Text style={styles.billTotalValue}>₹{total}</Text>
          </View>
        </View>

        {/* Offers Card */}
        <TouchableOpacity style={styles.offerCard} activeOpacity={0.7}>
          <Icon name="local-offer" size={20} color="#000000" />
          <Text style={styles.offerText}>Apply Coupon</Text>
          <Icon
            name="chevron-right"
            size={20}
            color="#9C9C9C"
            style={styles.offerArrow}
          />
        </TouchableOpacity>

        {/* Services */}
        <View style={styles.card}>
          <Text style={styles.servicesHeader}>Additional Services</Text>
          {services.map(service => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceRow}
              onPress={() => toggleService(service.id)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.checkbox,
                  service.selected && styles.checkboxSelected,
                ]}
              >
                {service.selected && (
                  <Icon name="check" size={14} color="#FFF" />
                )}
              </View>
              <Text style={styles.serviceText}>{service.name}</Text>
              <Text style={styles.servicePrice}>+₹10</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Safety Message */}
        <View style={styles.safetyCard}>
          <IconCommunity name="shield-check" size={16} color="#000000" />
          <Text style={styles.safetyText}>
            Your order is sanitized before delivery
          </Text>
        </View>

        {/* <View style={{ height: 100 }} /> */}

        {/* Zomato Bottom CTA */}
        <View style={styles.bottomContainer}>
          <View style={styles.bottomContent}>
            <View>
              <Text style={styles.bottomPrice}>₹{total}</Text>
              <Text style={styles.bottomSubtext}>TOTAL</Text>
            </View>
            <TouchableOpacity
              style={styles.proceedButton}
              activeOpacity={0.8}
              onPress={() => console.log('Proceed to payment')}
            >
              <Text style={styles.proceedText}>PROCEED TO PAY</Text>
              <Icon name="arrow-forward" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#000000',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  headerRight: {
    width: 60,
    alignItems: 'flex-end',
  },
  headerItems: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFF',
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 12,
  },
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 0,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  deliveryHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  deliveryIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  deliveryContent: {
    flex: 1,
  },
  deliveryLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2D2D2D',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  deliveryAddress: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: 4,
    lineHeight: 20,
  },
  deliveryTime: {
    fontSize: 12,
    color: '#7E808C',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.5,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemIndicator: {
    marginRight: 12,
  },
  vegIcon: {
    width: 14,
    height: 14,
    borderWidth: 1.5,
    borderColor: '#000000',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2D2D2D',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 13,
    color: '#7E808C',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    paddingHorizontal: 2,
  },
  quantityButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    minWidth: 32,
    textAlign: 'center',
  },
  itemDivider: {
    height: 1,
    backgroundColor: '#F5F5F5',
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  addMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 8,
  },
  billHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D2D2D',
    marginBottom: 16,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  billLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  billLabel: {
    fontSize: 14,
    color: '#7E808C',
  },
  billValue: {
    fontSize: 14,
    color: '#2D2D2D',
    fontWeight: '500',
  },
  billDivider: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginVertical: 12,
  },
  billTotalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D2D2D',
  },
  billTotalValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D2D2D',
  },
  offerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 8,
  },
  offerText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#2D2D2D',
    marginLeft: 12,
  },
  offerArrow: {
    marginLeft: 'auto',
  },
  servicesHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D2D2D',
    marginBottom: 16,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxSelected: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  serviceText: {
    flex: 1,
    fontSize: 14,
    color: '#2D2D2D',
  },
  servicePrice: {
    fontSize: 13,
    color: '#7E808C',
  },
  safetyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  safetyText: {
    fontSize: 12,
    color: '#2D2D2D',
    marginLeft: 8,
  },
  bottomContainer: {
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    paddingBottom: 100,
  },
  bottomContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D2D2D',
  },
  bottomSubtext: {
    fontSize: 11,
    fontWeight: '600',
    color: '#7E808C',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  proceedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  proceedText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: 0.8,
  },
});

export default ZomatoCartUI;
