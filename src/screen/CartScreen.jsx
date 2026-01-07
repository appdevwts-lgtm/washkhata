import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

const ZomatoCartUI = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  const isLargeTablet = width >= 1024;
  const isSmallPhone = height <= 667;

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
    {
      id: 3,
      name: 'Cotton Shirt',
      price: 75,
      quantity: 2,
    },
    {
      id: 4,
      name: 'Jeans',
      price: 100,
      quantity: 1,
    },
    {
      id: 5,
      name: 'Woolen Sweater',
      price: 200,
      quantity: 1,
    },
    {
      id: 6,
      name: 'Formal Trousers',
      price: 120,
      quantity: 2,
    },
  ]);

  const [services, setServices] = useState([
    { id: 1, name: 'Wash & Fold', description: 'Basic cleaning service', selected: true },
    { id: 2, name: 'Softener', description: 'Fabric softener treatment', selected: false },
    { id: 3, name: 'Express Delivery', description: 'Delivery within 4 hours', selected: false },
    { id: 4, name: 'Dry Clean', description: 'Professional dry cleaning', selected: false },
    { id: 5, name: 'Ironing', description: 'Premium ironing service', selected: false },
    { id: 6, name: 'Stain Removal', description: 'Special stain treatment', selected: false },
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

  const renderItemCard = ({ item }) => (
    <View style={[
      styles.itemCard,
      isTablet && styles.itemCardTablet,
      isSmallPhone && styles.itemCardSmallPhone
    ]}>
      <View style={styles.itemCardHeader}>
        <Text style={[
          styles.itemName, 
          isTablet && styles.itemNameTablet,
          isSmallPhone && styles.itemNameSmallPhone
        ]} numberOfLines={2}>
          {item.name}
        </Text>
      </View>
      <View style={styles.itemCardBody}>
        <Text style={[
          styles.itemPrice, 
          isTablet && styles.itemPriceTablet,
          isSmallPhone && styles.itemPriceSmallPhone
        ]}>
          ₹{item.price}
        </Text>
        <View style={[
          styles.quantityControl, 
          isTablet && styles.quantityControlTablet,
          isSmallPhone && styles.quantityControlSmallPhone
        ]}>
          <TouchableOpacity
            style={[
              styles.quantityButton, 
              isTablet && styles.quantityButtonTablet,
              isSmallPhone && styles.quantityButtonSmallPhone
            ]}
            onPress={() => handleQuantityChange(item.id, -1)}
            activeOpacity={0.7}
          >
            <Icon name="remove" size={isTablet ? 18 : isSmallPhone ? 12 : 14} color="#000000" />
          </TouchableOpacity>
          <Text style={[
            styles.quantityText, 
            isTablet && styles.quantityTextTablet,
            isSmallPhone && styles.quantityTextSmallPhone
          ]}>
            {item.quantity}
          </Text>
          <TouchableOpacity
            style={[
              styles.quantityButton, 
              isTablet && styles.quantityButtonTablet,
              isSmallPhone && styles.quantityButtonSmallPhone
            ]}
            onPress={() => handleQuantityChange(item.id, 1)}
            activeOpacity={0.7}
          >
            <Icon name="add" size={isTablet ? 18 : isSmallPhone ? 12 : 14} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderServiceCard = ({ item: service }) => (
    <TouchableOpacity
      style={[
        styles.serviceCardContainer,
        isTablet && styles.serviceCardContainerTablet,
        isSmallPhone && styles.serviceCardContainerSmallPhone,
        service.selected && styles.serviceCardSelected
      ]}
      onPress={() => toggleService(service.id)}
      activeOpacity={0.7}
    >
      <View style={styles.serviceCardHeader}>
        <View
          style={[
            styles.checkbox,
            isTablet && styles.checkboxTablet,
            isSmallPhone && styles.checkboxSmallPhone,
            service.selected && styles.checkboxSelected,
          ]}
        >
          {service.selected && (
            <Icon name="check" size={isTablet ? 18 : isSmallPhone ? 12 : 14} color="#000000ff" />
          )}
        </View>
        <Icon 
          name={service.id === 1 ? 'local-laundry-service' : 
                service.id === 2 ? 'bubble-chart' : 
                service.id === 3 ? 'bolt' : 
                service.id === 4 ? 'dry-cleaning' : 
                service.id === 5 ? 'iron' : 'spa'}
          size={isTablet ? 28 : isSmallPhone ? 18 : 20}
          color={service.selected ? "#FFF" : "#000"}
          style={styles.serviceIcon}
        />
      </View>
      
      <View style={styles.serviceCardContent}>
        <Text style={[
          styles.serviceName, 
          isTablet && styles.serviceNameTablet,
          isSmallPhone && styles.serviceNameSmallPhone,
          service.selected && styles.serviceNameSelected
        ]}>
          {service.name}
        </Text>
        <Text style={[
          styles.serviceDescription,
          isTablet && styles.serviceDescriptionTablet,
          isSmallPhone && styles.serviceDescriptionSmallPhone
        ]}>
          {service.description}
        </Text>
        <View style={[
          styles.servicePriceContainer,
          service.selected && styles.servicePriceContainerSelected
        ]}>
          <Text style={[
            styles.servicePrice,
            isTablet && styles.servicePriceTablet,
            isSmallPhone && styles.servicePriceSmallPhone,
            service.selected && styles.servicePriceSelected
          ]}>
            +₹10
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderLeftContent = () => (
    <>
      {/* Delivery Address Card */}
      <View style={[
        styles.card, 
        isTablet && styles.cardTablet,
        isSmallPhone && styles.cardSmallPhone
      ]}>
        <View style={styles.deliveryHeader}>
          <View style={[
            styles.deliveryIconContainer, 
            isTablet && styles.deliveryIconContainerTablet,
            isSmallPhone && styles.deliveryIconContainerSmallPhone
          ]}>
            <Icon name="location-on" size={isTablet ? 20 : isSmallPhone ? 14 : 16} color="#000000" />
          </View>
          <View style={styles.deliveryContent}>
            <Text style={[
              styles.deliveryLabel, 
              isTablet && styles.deliveryLabelTablet,
              isSmallPhone && styles.deliveryLabelSmallPhone
            ]}>
              Delivering to
            </Text>
            <Text style={[
              styles.deliveryAddress, 
              isTablet && styles.deliveryAddressTablet,
              isSmallPhone && styles.deliveryAddressSmallPhone
            ]} numberOfLines={2}>
              Priyo Sharma, 45 GreenPark Avenue
            </Text>
            <Text style={[
              styles.deliveryTime, 
              isTablet && styles.deliveryTimeTablet,
              isSmallPhone && styles.deliveryTimeSmallPhone
            ]}>
              25-30 mins
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={[
              styles.changeText, 
              isTablet && styles.changeTextTablet,
              isSmallPhone && styles.changeTextSmallPhone
            ]}>
              CHANGE
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Items Card */}
      <View style={[
        styles.card, 
        isTablet && styles.cardTablet,
        isSmallPhone && styles.cardSmallPhone
      ]}>
        <View style={styles.itemsHeaderRow}>
          <Text style={[
            styles.itemsHeader, 
            isTablet && styles.itemsHeaderTablet,
            isSmallPhone && styles.itemsHeaderSmallPhone
          ]}>
            Items ({items.length})
          </Text>
          <TouchableOpacity style={[
            styles.addMoreButton, 
            isTablet && styles.addMoreButtonTablet,
            isSmallPhone && styles.addMoreButtonSmallPhone
          ]} activeOpacity={0.7}>
            <Icon name="add-circle-outline" size={isTablet ? 24 : isSmallPhone ? 18 : 20} color="#000000" />
            <Text style={[
              styles.addMoreText, 
              isTablet && styles.addMoreTextTablet,
              isSmallPhone && styles.addMoreTextSmallPhone
            ]}>
              Add more
            </Text>
          </TouchableOpacity>
        </View>
        
        {isTablet ? (
          // Grid layout for tablets
          <View style={styles.itemsGrid}>
            {items.map((item) => (
              <View key={item.id} style={styles.itemGridWrapper}>
                {renderItemCard({ item })}
              </View>
            ))}
          </View>
        ) : (
          // List layout for mobile
          <FlatList
            data={items}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <View>
                <View style={[
                  styles.itemRow,
                  isSmallPhone && styles.itemRowSmallPhone
                ]}>
                  <View style={styles.itemContent}>
                    <Text style={[
                      styles.itemName,
                      isSmallPhone && styles.itemNameSmallPhone
                    ]}>
                      {item.name}
                    </Text>
                    <Text style={[
                      styles.itemPrice,
                      isSmallPhone && styles.itemPriceSmallPhone
                    ]}>
                      ₹{item.price}
                    </Text>
                  </View>

                  <View style={[
                    styles.quantityControl,
                    isSmallPhone && styles.quantityControlSmallPhone
                  ]}>
                    <TouchableOpacity
                      style={[
                        styles.quantityButton,
                        isSmallPhone && styles.quantityButtonSmallPhone
                      ]}
                      onPress={() => handleQuantityChange(item.id, -1)}
                      activeOpacity={0.7}
                    >
                      <Icon name="remove" size={isSmallPhone ? 12 : 14} color="#000000" />
                    </TouchableOpacity>
                    <Text style={[
                      styles.quantityText,
                      isSmallPhone && styles.quantityTextSmallPhone
                    ]}>
                      {item.quantity}
                    </Text>
                    <TouchableOpacity
                      style={[
                        styles.quantityButton,
                        isSmallPhone && styles.quantityButtonSmallPhone
                      ]}
                      onPress={() => handleQuantityChange(item.id, 1)}
                      activeOpacity={0.7}
                    >
                      <Icon name="add" size={isSmallPhone ? 12 : 14} color="#000000" />
                    </TouchableOpacity>
                  </View>
                </View>
                {index < items.length - 1 && (
                  <View style={[
                    styles.itemDivider,
                    isSmallPhone && styles.itemDividerSmallPhone
                  ]} />
                )}
              </View>
            )}
          />
        )}
      </View>

      {/* Offers Card */}
      <TouchableOpacity style={[
        styles.offerCard, 
        isTablet && styles.offerCardTablet,
        isSmallPhone && styles.offerCardSmallPhone
      ]} activeOpacity={0.7}>
        <View style={[
          styles.offerIconContainer, 
          isTablet && styles.offerIconContainerTablet,
          isSmallPhone && styles.offerIconContainerSmallPhone
        ]}>
          <Icon name="local-offer" size={isTablet ? 20 : isSmallPhone ? 16 : 18} color="#000000" />
        </View>
        <View style={styles.offerContent}>
          <Text style={[
            styles.offerText, 
            isTablet && styles.offerTextTablet,
            isSmallPhone && styles.offerTextSmallPhone
          ]}>
            Apply Coupon
          </Text>
          <Text style={[
            styles.offerSubtext, 
            isTablet && styles.offerSubtextTablet,
            isSmallPhone && styles.offerSubtextSmallPhone
          ]}>
            Save more on this order
          </Text>
        </View>
        <Icon
          name="chevron-right"
          size={isTablet ? 24 : isSmallPhone ? 18 : 20}
          color="#9C9C9C"
        />
      </TouchableOpacity>
    </>
  );

  const renderRightContent = () => (
    <>
      {/* Services Card */}
      <View style={[
        styles.card, 
        isTablet && styles.cardTablet,
        isSmallPhone && styles.cardSmallPhone
      ]}>
        <View style={styles.servicesHeaderRow}>
          <Text style={[
            styles.servicesHeader, 
            isTablet && styles.servicesHeaderTablet,
            isSmallPhone && styles.servicesHeaderSmallPhone
          ]}>
            Additional Services
          </Text>
          {isTablet && (
            <View style={styles.selectedServicesCount}>
              <Text style={styles.selectedServicesText}>
                {services.filter(s => s.selected).length} selected
              </Text>
            </View>
          )}
        </View>
        
        {isTablet ? (
          // Grid layout for tablets
          <View style={styles.servicesGrid}>
            {services.map(service => (
              <View key={service.id} style={styles.serviceGridWrapper}>
                {renderServiceCard({ item: service })}
              </View>
            ))}
          </View>
        ) : (
          // List layout for mobile
          <View>
            {services.map((service, index) => (
              <TouchableOpacity
                key={service.id}
                style={[
                  styles.serviceRow,
                  isSmallPhone && styles.serviceRowSmallPhone
                ]}
                onPress={() => toggleService(service.id)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.checkbox,
                    isSmallPhone && styles.checkboxSmallPhone,
                    service.selected && styles.checkboxSelected,
                  ]}
                >
                  {service.selected && (
                    <Icon name="check" size={isSmallPhone ? 12 : 14} color="#000000ff" />
                  )}
                </View>
                <View style={[styles.serviceContent, isSmallPhone && styles.serviceContentSmallPhone]}>
                  <View>
                    <Text style={[
                      styles.serviceText,
                      isSmallPhone && styles.serviceTextSmallPhone
                    ]}>
                      {service.name}
                    </Text>
                    <Text style={[
                      styles.serviceDescription,
                      isSmallPhone && styles.serviceDescriptionMobile
                    ]}>
                      {service.description}
                    </Text>
                  </View>
                  <Text style={[
                    styles.servicePrice,
                    isSmallPhone && styles.servicePriceSmallPhone
                  ]}>
                    +₹10
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
        
        {isTablet ? (
          <View style={styles.servicesNote}>
            <Icon name="info-outline" size={isTablet ? 16 : 14} color="#7E808C" />
            <Text style={[
              styles.servicesNoteText, 
              isTablet && styles.servicesNoteTextTablet
            ]}>
              All services are charged per item
            </Text>
          </View>
        ) : (
          <View style={[
            styles.servicesNoteMobile,
            isSmallPhone && styles.servicesNoteMobileSmallPhone
          ]}>
            <Icon name="info-outline" size={isSmallPhone ? 12 : 14} color="#7E808C" />
            <Text style={[
              styles.servicesNoteText,
              isSmallPhone && styles.servicesNoteTextSmallPhone
            ]}>
              {services.filter(s => s.selected).length} service(s) selected • ₹{serviceCharge} added
            </Text>
          </View>
        )}
      </View>

      {/* Bill Details */}
      <View style={[
        styles.card, 
        isTablet && styles.cardTablet,
        isSmallPhone && styles.cardSmallPhone
      ]}>
        <Text style={[
          styles.billHeader, 
          isTablet && styles.billHeaderTablet,
          isSmallPhone && styles.billHeaderSmallPhone
        ]}>
          Bill Details
        </Text>
        <View style={[
          styles.billRow,
          isSmallPhone && styles.billRowSmallPhone
        ]}>
          <Text style={[
            styles.billLabel, 
            isTablet && styles.billLabelTablet,
            isSmallPhone && styles.billLabelSmallPhone
          ]}>
            Item Total ({items.length} items)
          </Text>
          <Text style={[
            styles.billValue, 
            isTablet && styles.billValueTablet,
            isSmallPhone && styles.billValueSmallPhone
          ]}>
            ₹{subtotal}
          </Text>
        </View>
        <View style={[
          styles.billRow,
          isSmallPhone && styles.billRowSmallPhone
        ]}>
          <View style={styles.billLabelRow}>
            <Text style={[
              styles.billLabel, 
              isTablet && styles.billLabelTablet,
              isSmallPhone && styles.billLabelSmallPhone
            ]}>
              Delivery Fee
            </Text>
            <Icon name="info-outline" size={isTablet ? 16 : isSmallPhone ? 12 : 14} color="#9C9C9C" />
          </View>
          <Text style={[
            styles.billValue, 
            isTablet && styles.billValueTablet,
            isSmallPhone && styles.billValueSmallPhone
          ]}>
            ₹{deliveryFee}
          </Text>
        </View>
        <View style={[
          styles.billRow,
          isSmallPhone && styles.billRowSmallPhone
        ]}>
          <Text style={[
            styles.billLabel, 
            isTablet && styles.billLabelTablet,
            isSmallPhone && styles.billLabelSmallPhone
          ]}>
            Service Charges
          </Text>
          <Text style={[
            styles.billValue, 
            isTablet && styles.billValueTablet,
            isSmallPhone && styles.billValueSmallPhone
          ]}>
            ₹{serviceCharge}
          </Text>
        </View>
        <View style={[
          styles.billDivider,
          isSmallPhone && styles.billDividerSmallPhone
        ]} />
        <View style={[
          styles.billRow,
          isSmallPhone && styles.billRowSmallPhone
        ]}>
          <Text style={[
            styles.billTotalLabel, 
            isTablet && styles.billTotalLabelTablet,
            isSmallPhone && styles.billTotalLabelSmallPhone
          ]}>
            To Pay
          </Text>
          <Text style={[
            styles.billTotalValue, 
            isTablet && styles.billTotalValueTablet,
            isSmallPhone && styles.billTotalValueSmallPhone
          ]}>
            ₹{total}
          </Text>
        </View>
      </View>

      {/* Safety Message */}
      <View style={[
        styles.safetyCard, 
        isTablet && styles.safetyCardTablet,
        isSmallPhone && styles.safetyCardSmallPhone
      ]}>
        <IconCommunity name="shield-check" size={isTablet ? 20 : isSmallPhone ? 14 : 16} color="#000000" />
        <Text style={[
          styles.safetyText, 
          isTablet && styles.safetyTextTablet,
          isSmallPhone && styles.safetyTextSmallPhone
        ]}>
          Your order is sanitized before delivery
        </Text>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header - Fixed */}
      <View style={[
        styles.header, 
        isTablet && styles.headerTablet,
        isSmallPhone && styles.headerSmallPhone
      ]}>
        <TouchableOpacity
          style={[
            styles.backButton, 
            isTablet && styles.backButtonTablet,
            isSmallPhone && styles.backButtonSmallPhone
          ]}
          onPress={() => navigation?.goBack()}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={isTablet ? 28 : isSmallPhone ? 22 : 24} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Icon name="shopping-cart" size={isTablet ? 24 : isSmallPhone ? 18 : 20} color="#FFF" />
          <Text style={[
            styles.headerTitle, 
            isTablet && styles.headerTitleTablet,
            isSmallPhone && styles.headerTitleSmallPhone
          ]}>
            Cart
          </Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.headerItemsContainer}>
            <IconCommunity
              name="shopping"
              size={isTablet ? 16 : isSmallPhone ? 12 : 14}
              color="#FFF"
              style={{ opacity: 0.9 }}
            />
            <Text style={[
              styles.headerItems, 
              isTablet && styles.headerItemsTablet,
              isSmallPhone && styles.headerItemsSmallPhone
            ]}>
              {items.length}
            </Text>
          </View>
        </View>
      </View>

      {isLargeTablet ? (
        // Two-column layout for large tablets
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, styles.scrollContentTablet]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.tabletContainer}>
            <View style={styles.leftColumn}>
              {renderLeftContent()}
            </View>
            <View style={styles.rightColumn}>
              {renderRightContent()}
            </View>
          </View>
        </ScrollView>
      ) : (
        // Single column for mobile and small tablets
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            isTablet && styles.scrollContentTablet,
            isSmallPhone && styles.scrollContentSmallPhone
          ]}
          showsVerticalScrollIndicator={false}
        >
          {renderLeftContent()}
          {renderRightContent()}
        </ScrollView>
      )}

      {/* Bottom CTA */}
      <View style={[
        styles.bottomContainer, 
        isTablet && styles.bottomContainerTablet,
        isSmallPhone && styles.bottomContainerSmallPhone
      ]}>
        <View style={[
          styles.bottomContent, 
          isTablet && styles.bottomContentTablet,
          isSmallPhone && styles.bottomContentSmallPhone
        ]}>
          <View style={styles.bottomPriceContainer}>
            <Text style={[
              styles.bottomPrice, 
              isTablet && styles.bottomPriceTablet,
              isSmallPhone && styles.bottomPriceSmallPhone
            ]}>
              ₹{total}
            </Text>
            <Text style={[
              styles.bottomSubtext, 
              isTablet && styles.bottomSubtextTablet,
              isSmallPhone && styles.bottomSubtextSmallPhone
            ]}>
              TOTAL • {items.length} items
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.proceedButton, 
              isTablet && styles.proceedButtonTablet,
              isSmallPhone && styles.proceedButtonSmallPhone
            ]}
            activeOpacity={0.8}
            onPress={() => console.log('Proceed to payment')}
          >
            <Text style={[
              styles.proceedText, 
              isTablet && styles.proceedTextTablet,
              isSmallPhone && styles.proceedTextSmallPhone
            ]}>
              PROCEED TO PAY
            </Text>
            <Icon name="arrow-forward" size={isTablet ? 22 : isSmallPhone ? 16 : 18} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#000000',
    minHeight: 56,
  },
  headerTablet: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    minHeight: 64,
  },
  headerSmallPhone: {
    paddingVertical: 10,
    minHeight: 52,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonTablet: {
    width: 48,
    height: 48,
  },
  backButtonSmallPhone: {
    width: 36,
    height: 36,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  headerTitleTablet: {
    fontSize: 22,
    letterSpacing: 0.8,
  },
  headerTitleSmallPhone: {
    fontSize: 16,
    letterSpacing: 0.3,
  },
  headerRight: {
    width: 40,
    alignItems: 'flex-end',
  },
  headerItemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  headerItems: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF',
  },
  headerItemsTablet: {
    fontSize: 14,
  },
  headerItemsSmallPhone: {
    fontSize: 11,
  },
  
  // Scroll View
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 12,
    paddingBottom: 100,
  },
  scrollContentTablet: {
    paddingTop: 24,
    paddingBottom: 120,
  },
  scrollContentSmallPhone: {
    paddingTop: 8,
    paddingBottom: 90,
  },
  
  // Tablet Layout
  tabletContainer: {
    flexDirection: 'row',
    gap: 24,
    paddingHorizontal: 32,
    maxWidth: 1400,
    marginHorizontal: 'auto',
    width: '100%',
  },
  leftColumn: {
    flex: 1.2,
  },
  rightColumn: {
    flex: 1,
  },
  
  // Card Base
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTablet: {
    marginHorizontal: 0,
    marginBottom: 20,
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderRadius: 16,
    shadowRadius: 3,
    elevation: 3,
  },
  cardSmallPhone: {
    marginHorizontal: 12,
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 10,
  },
  
  // Delivery Address
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
  deliveryIconContainerTablet: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 16,
  },
  deliveryIconContainerSmallPhone: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 10,
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
  deliveryLabelTablet: {
    fontSize: 12,
    marginBottom: 6,
  },
  deliveryLabelSmallPhone: {
    fontSize: 10,
    marginBottom: 2,
  },
  deliveryAddress: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: 4,
    lineHeight: 20,
  },
  deliveryAddressTablet: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 6,
  },
  deliveryAddressSmallPhone: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 2,
  },
  deliveryTime: {
    fontSize: 12,
    color: '#7E808C',
  },
  deliveryTimeTablet: {
    fontSize: 14,
  },
  deliveryTimeSmallPhone: {
    fontSize: 11,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.5,
  },
  changeTextTablet: {
    fontSize: 14,
    letterSpacing: 0.8,
  },
  changeTextSmallPhone: {
    fontSize: 10,
    letterSpacing: 0.3,
  },
  
  // Items Section
  itemsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  itemsHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D2D2D',
  },
  itemsHeaderTablet: {
    fontSize: 22,
  },
  itemsHeaderSmallPhone: {
    fontSize: 15,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  itemGridWrapper: {
    width: '50%',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  itemCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  itemCardTablet: {
    padding: 20,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  itemCardSmallPhone: {
    padding: 12,
    borderRadius: 10,
  },
  itemCardHeader: {
    marginBottom: 8,
  },
  itemCardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemRowSmallPhone: {
    paddingVertical: 10,
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
  itemNameTablet: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  itemNameSmallPhone: {
    fontSize: 13,
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 13,
    color: '#7E808C',
  },
  itemPriceTablet: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  itemPriceSmallPhone: {
    fontSize: 12,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    paddingHorizontal: 2,
  },
  quantityControlTablet: {
    borderRadius: 8,
    paddingHorizontal: 4,
    borderWidth: 1.5,
  },
  quantityControlSmallPhone: {
    borderRadius: 3,
    paddingHorizontal: 1,
    borderWidth: 1,
  },
  quantityButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonTablet: {
    width: 36,
    height: 36,
  },
  quantityButtonSmallPhone: {
    width: 24,
    height: 24,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    minWidth: 32,
    textAlign: 'center',
  },
  quantityTextTablet: {
    fontSize: 17,
    minWidth: 40,
  },
  quantityTextSmallPhone: {
    fontSize: 12,
    minWidth: 24,
  },
  itemDivider: {
    height: 1,
    backgroundColor: '#F5F5F5',
  },
  itemDividerSmallPhone: {
    height: 0.5,
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
  },
  addMoreButtonTablet: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  addMoreButtonSmallPhone: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addMoreText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 6,
  },
  addMoreTextTablet: {
    fontSize: 14,
    marginLeft: 8,
  },
  addMoreTextSmallPhone: {
    fontSize: 10,
    marginLeft: 4,
  },
  
  // Services Section
  servicesHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  servicesHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D2D2D',
  },
  servicesHeaderTablet: {
    fontSize: 22,
  },
  servicesHeaderSmallPhone: {
    fontSize: 15,
  },
  selectedServicesCount: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  selectedServicesText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginBottom: 16,
  },
  serviceGridWrapper: {
    width: '50%',
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  serviceCardContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    alignItems: 'center',
  },
  serviceCardContainerTablet: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  serviceCardContainerSmallPhone: {
    padding: 12,
    borderRadius: 10,
  },
  serviceCardSelected: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  serviceCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxTablet: {
    width: 24,
    height: 24,
    borderRadius: 6,
  },
  checkboxSmallPhone: {
    width: 18,
    height: 18,
    borderRadius: 3,
  },
  checkboxSelected: {
    backgroundColor: '#FFF',
    borderColor: '#000000ff',
  },
  serviceIcon: {
    marginRight: 8,
  },
  serviceCardContent: {
    alignItems: 'center',
    width: '100%',
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: 4,
    textAlign: 'center',
  },
  serviceNameTablet: {
    fontSize: 17,
    marginBottom: 6,
  },
  serviceNameSmallPhone: {
    fontSize: 12,
    marginBottom: 2,
  },
  serviceNameSelected: {
    color: '#FFF',
  },
  serviceDescription: {
    fontSize: 12,
    color: '#7E808C',
    textAlign: 'center',
    marginBottom: 12,
  },
  serviceDescriptionTablet: {
    fontSize: 14,
    marginBottom: 16,
  },
  serviceDescriptionSmallPhone: {
    fontSize: 10,
    marginBottom: 8,
  },
  serviceDescriptionMobile: {
    fontSize: 11,
    color: '#7E808C',
  },
  servicePriceContainer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'center',
  },
  servicePriceContainerSelected: {
    backgroundColor: '#FFF',
  },
  servicePrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
  },
  servicePriceTablet: {
    fontSize: 15,
  },
  servicePriceSmallPhone: {
    fontSize: 11,
  },
  servicePriceSelected: {
    color: '#000000',
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  serviceRowSmallPhone: {
    paddingVertical: 10,
  },
  serviceContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 12,
  },
  serviceContentSmallPhone: {
    marginLeft: 10,
  },
  serviceText: {
    fontSize: 14,
    color: '#2D2D2D',
    fontWeight: '500',
    marginBottom: 2,
  },
  serviceTextSmallPhone: {
    fontSize: 13,
  },
  servicesNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  servicesNoteMobile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 8,
    justifyContent: 'center',
  },
  servicesNoteMobileSmallPhone: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  servicesNoteText: {
    fontSize: 12,
    color: '#7E808C',
    marginLeft: 8,
  },
  servicesNoteTextTablet: {
    fontSize: 14,
  },
  servicesNoteTextSmallPhone: {
    fontSize: 10,
    marginLeft: 6,
  },
  
  // Bill Section
  billHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D2D2D',
    marginBottom: 16,
  },
  billHeaderTablet: {
    fontSize: 22,
  },
  billHeaderSmallPhone: {
    fontSize: 15,
    marginBottom: 12,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  billRowSmallPhone: {
    marginBottom: 10,
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
  billLabelTablet: {
    fontSize: 16,
  },
  billLabelSmallPhone: {
    fontSize: 12,
  },
  billValue: {
    fontSize: 14,
    color: '#2D2D2D',
    fontWeight: '500',
  },
  billValueTablet: {
    fontSize: 17,
  },
  billValueSmallPhone: {
    fontSize: 12,
  },
  billDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 12,
  },
  billDividerSmallPhone: {
    marginVertical: 10,
  },
  billTotalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D2D2D',
  },
  billTotalLabelTablet: {
    fontSize: 20,
  },
  billTotalLabelSmallPhone: {
    fontSize: 14,
  },
  billTotalValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000000',
  },
  billTotalValueTablet: {
    fontSize: 20,
  },
  billTotalValueSmallPhone: {
    fontSize: 14,
  },
  
  // Offers Card
  offerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  offerCardTablet: {
    marginHorizontal: 0,
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginBottom: 20,
    borderRadius: 16,
    shadowRadius: 3,
    elevation: 3,
  },
  offerCardSmallPhone: {
    marginHorizontal: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 10,
    borderRadius: 10,
  },
  offerIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF8E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  offerIconContainerTablet: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 16,
  },
  offerIconContainerSmallPhone: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  offerContent: {
    flex: 1,
  },
  offerText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: 2,
  },
  offerTextTablet: {
    fontSize: 18,
    marginBottom: 4,
  },
  offerTextSmallPhone: {
    fontSize: 13,
    marginBottom: 1,
  },
  offerSubtext: {
    fontSize: 13,
    color: '#7E808C',
  },
  offerSubtextTablet: {
    fontSize: 15,
  },
  offerSubtextSmallPhone: {
    fontSize: 11,
  },
  
  // Safety Card
  safetyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  safetyCardTablet: {
    marginHorizontal: 0,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
  },
  safetyCardSmallPhone: {
    marginHorizontal: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  safetyText: {
    fontSize: 13,
    color: '#2D2D2D',
    marginLeft: 8,
    fontWeight: '500',
  },
  safetyTextTablet: {
    fontSize: 15,
    marginLeft: 12,
  },
  safetyTextSmallPhone: {
    fontSize: 11,
    marginLeft: 6,
  },
  
  // Bottom Container
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
      paddingBottom: 95,
  },
  bottomContainerTablet: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  bottomContainerSmallPhone: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  bottomContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomContentTablet: {
    maxWidth: 1400,
    marginHorizontal: 'auto',
    width: '100%',
  },
  bottomContentSmallPhone: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomPriceContainer: {
    alignItems: 'flex-start',
  },
  bottomPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D2D2D',
  },
  bottomPriceTablet: {
    fontSize: 28,
  },
  bottomPriceSmallPhone: {
    fontSize: 18,
  },
  bottomSubtext: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7E808C',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  bottomSubtextTablet: {
    fontSize: 14,
    marginTop: 4,
  },
  bottomSubtextSmallPhone: {
    fontSize: 10,
    marginTop: 1,
    letterSpacing: 0.3,
  },
  proceedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    gap: 8,
  
  },
  proceedButtonTablet: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 16,
    gap: 10,
  },
  proceedButtonSmallPhone: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  proceedText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: 0.8,
  },
  proceedTextTablet: {
    fontSize: 18,
    letterSpacing: 1,
  },
  proceedTextSmallPhone: {
    fontSize: 12,
    letterSpacing: 0.5,
  },
});

export default ZomatoCartUI;