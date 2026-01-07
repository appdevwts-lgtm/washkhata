import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Dimensions,
  Alert,
  useWindowDimensions,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddAddressScreen() {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  const isLargeTablet = width >= 1024;

  const [region, setRegion] = useState({
    latitude: 28.6692,
    longitude: 77.4538,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 28.6692,
    longitude: 77.4538,
    address: 'Ghaziabad, Uttar Pradesh, India',
  });

  const [fullName, setFullName] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [addressType, setAddressType] = useState('home');
  const [focusedField, setFocusedField] = useState(null);

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const mockAddress = `${latitude.toFixed(4)}, ${longitude.toFixed(4)} - Ghaziabad, UP`;
    
    setSelectedLocation({
      latitude,
      longitude,
      address: mockAddress,
    });

    setRegion({
      ...region,
      latitude,
      longitude,
    });
  };

  const getCurrentLocation = () => {
    Alert.alert(
      'Current Location',
      'Getting your current location...',
      [
        {
          text: 'OK',
          onPress: () => {
            const currentLat = 28.6692 + (Math.random() - 0.5) * 0.01;
            const currentLng = 77.4538 + (Math.random() - 0.5) * 0.01;
            
            setSelectedLocation({
              latitude: currentLat,
              longitude: currentLng,
              address: 'Your Current Location - Ghaziabad, UP',
            });
            
            setRegion({
              ...region,
              latitude: currentLat,
              longitude: currentLng,
            });
          },
        },
      ]
    );
  };

  const handleSaveAddress = () => {
    if (!fullName || !houseNo || !address || !phone) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
    Alert.alert('Success', 'Address saved successfully!');
  };

  const renderForm = () => (
    <View style={[
      styles.formSection,
      isTablet && styles.formSectionTablet,
      isLargeTablet && styles.formSectionLarge
    ]}>
      <Text style={[styles.sectionTitle, isTablet && styles.sectionTitleTablet]}>
        Address Details
      </Text>

      {/* Full Name */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, isTablet && styles.labelTablet]}>Full Name *</Text>
        <View style={[
          styles.inputContainer,
          isTablet && styles.inputContainerTablet,
          focusedField === 'fullName' && styles.inputContainerFocused
        ]}>
          <Icon name="person-outline" size={isTablet ? 22 : 20} color="#666666" />
          <TextInput
            style={[styles.input, isTablet && styles.inputTablet]}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter full name"
            placeholderTextColor="#999999"
            onFocus={() => setFocusedField('fullName')}
            onBlur={() => setFocusedField(null)}
          />
        </View>
      </View>

      {/* House No / Flat No */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, isTablet && styles.labelTablet]}>House / Flat No. *</Text>
        <View style={[
          styles.inputContainer,
          isTablet && styles.inputContainerTablet,
          focusedField === 'houseNo' && styles.inputContainerFocused
        ]}>
          <Icon name="home-outline" size={isTablet ? 22 : 20} color="#666666" />
          <TextInput
            style={[styles.input, isTablet && styles.inputTablet]}
            value={houseNo}
            onChangeText={setHouseNo}
            placeholder="Enter house/flat number"
            placeholderTextColor="#999999"
            onFocus={() => setFocusedField('houseNo')}
            onBlur={() => setFocusedField(null)}
          />
        </View>
      </View>

      {/* Address */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, isTablet && styles.labelTablet]}>Address *</Text>
        <View style={[
          styles.inputContainer,
          styles.textAreaContainer,
          isTablet && styles.textAreaContainerTablet,
          focusedField === 'address' && styles.inputContainerFocused
        ]}>
          <Icon 
            name="business-outline" 
            size={isTablet ? 22 : 20} 
            color="#666666" 
            style={styles.textAreaIcon} 
          />
          <TextInput
            style={[
              styles.input, 
              styles.textArea,
              isTablet && styles.inputTablet,
              isTablet && styles.textAreaTablet
            ]}
            value={address}
            onChangeText={setAddress}
            placeholder="Street, Landmark, Area"
            placeholderTextColor="#999999"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            onFocus={() => setFocusedField('address')}
            onBlur={() => setFocusedField(null)}
          />
        </View>
      </View>

      {/* Phone Number */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, isTablet && styles.labelTablet]}>Phone Number *</Text>
        <View style={[
          styles.inputContainer,
          isTablet && styles.inputContainerTablet,
          focusedField === 'phone' && styles.inputContainerFocused
        ]}>
          <Icon name="call-outline" size={isTablet ? 22 : 20} color="#666666" />
          <TextInput
            style={[styles.input, isTablet && styles.inputTablet]}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter phone number"
            placeholderTextColor="#999999"
            keyboardType="phone-pad"
            onFocus={() => setFocusedField('phone')}
            onBlur={() => setFocusedField(null)}
          />
        </View>
      </View>

      {/* Address Type */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, isTablet && styles.labelTablet]}>Save As</Text>
        <View style={styles.addressTypeRow}>
          <TouchableOpacity 
            style={[
              styles.typeBtn,
              isTablet && styles.typeBtnTablet,
              addressType === 'home' && styles.typeBtnActive
            ]}
            onPress={() => setAddressType('home')}
            activeOpacity={0.7}
          >
            <Icon 
              name={addressType === 'home' ? 'home' : 'home-outline'} 
              size={isTablet ? 20 : 18} 
              color={addressType === 'home' ? '#FFFFFF' : '#666666'} 
            />
            <Text style={[
              styles.typeBtnText,
              isTablet && styles.typeBtnTextTablet,
              addressType === 'home' && styles.typeBtnTextActive
            ]}>Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.typeBtn,
              styles.typeBtnOutline,
              isTablet && styles.typeBtnTablet,
              addressType === 'work' && styles.typeBtnActive
            ]}
            onPress={() => setAddressType('work')}
            activeOpacity={0.7}
          >
            <Icon 
              name={addressType === 'work' ? 'briefcase' : 'briefcase-outline'} 
              size={isTablet ? 20 : 18} 
              color={addressType === 'work' ? '#FFFFFF' : '#666666'} 
            />
            <Text style={[
              styles.typeBtnText,
              isTablet && styles.typeBtnTextTablet,
              addressType === 'work' ? styles.typeBtnTextActive : styles.typeBtnTextOutline
            ]}>Work</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.typeBtn,
              styles.typeBtnOutline,
              isTablet && styles.typeBtnTablet,
              addressType === 'other' && styles.typeBtnActive
            ]}
            onPress={() => setAddressType('other')}
            activeOpacity={0.7}
          >
            <Icon 
              name={addressType === 'other' ? 'location' : 'location-outline'} 
              size={isTablet ? 20 : 18} 
              color={addressType === 'other' ? '#FFFFFF' : '#666666'} 
            />
            <Text style={[
              styles.typeBtnText,
              isTablet && styles.typeBtnTextTablet,
              addressType === 'other' ? styles.typeBtnTextActive : styles.typeBtnTextOutline
            ]}>Other</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderMap = () => (
    <View style={[
      styles.mapContainer,
      isTablet && styles.mapContainerTablet,
      isLargeTablet && styles.mapContainerLarge
    ]}>
      <MapView
        style={styles.map}
        region={region}
        onPress={handleMapPress}
      >
        <Marker
          coordinate={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          }}
          title="Selected Location"
        >
          <View style={styles.customMarker}>
            <Icon name="location" size={isTablet ? 48 : 40} color="#000000" />
          </View>
        </Marker>
      </MapView>

      {/* Current Location Button */}
      <TouchableOpacity 
        style={[styles.currentLocationBtn, isTablet && styles.currentLocationBtnTablet]}
        onPress={getCurrentLocation}
        activeOpacity={0.7}
      >
        <Icon name="navigate" size={isTablet ? 24 : 20} color="#000000" />
      </TouchableOpacity>

      {/* Location Info Card */}
      <View style={[styles.locationCard, isTablet && styles.locationCardTablet]}>
        <Icon name="location-outline" size={isTablet ? 24 : 20} color="#000000" />
        <Text style={[styles.locationText, isTablet && styles.locationTextTablet]} numberOfLines={2}>
          {selectedLocation.address}
        </Text>
      </View>
    </View>
  );

  if (isLargeTablet) {
    // Two-column layout for large tablets
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {/* Header */}
        <View style={[styles.header, styles.headerTablet]}>
          <TouchableOpacity style={[styles.backBtn, styles.backBtnTablet]} activeOpacity={0.7}>
            <Icon name="arrow-back" size={26} color="#000000" />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, styles.headerTitleTablet]}>Add New Address</Text>
          <View style={[styles.placeholder, styles.backBtnTablet]} />
        </View>

        <View style={styles.tabletContainer}>
          <View style={styles.tabletRow}>
            {/* Left Column - Map */}
            <View style={styles.leftColumn}>
              {renderMap()}
            </View>

            {/* Right Column - Form */}
            <ScrollView 
              style={styles.rightColumn}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.rightColumnContent}
            >
              {renderForm()}
            </ScrollView>
          </View>

          {/* Save Button */}
          <View style={[styles.bottomContainer, styles.bottomContainerTablet]}>
            <TouchableOpacity 
              style={[styles.saveBtn, styles.saveBtnTablet]} 
              onPress={handleSaveAddress}
              activeOpacity={0.7}
            >
              <Text style={[styles.saveText, styles.saveTextTablet]}>Save Address</Text>
              <Icon name="checkmark-circle" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Single column layout for mobile and small tablets
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={[styles.header, isTablet && styles.headerTablet]}>
        <TouchableOpacity 
          style={[styles.backBtn, isTablet && styles.backBtnTablet]} 
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={isTablet ? 26 : 24} color="#000000" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isTablet && styles.headerTitleTablet]}>
          Add New Address
        </Text>
        <View style={[styles.placeholder, isTablet && styles.backBtnTablet]} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {renderMap()}
        {renderForm()}
      </ScrollView>

      {/* Save Button */}
      <View style={[styles.bottomContainer, isTablet && styles.bottomContainerTablet]}>
        <TouchableOpacity 
          style={[styles.saveBtn, isTablet && styles.saveBtnTablet]} 
          onPress={handleSaveAddress}
          activeOpacity={0.7}
        >
          <Text style={[styles.saveText, isTablet && styles.saveTextTablet]}>Save Address</Text>
          <Icon name="checkmark-circle" size={isTablet ? 24 : 20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTablet: {
    paddingHorizontal: 32,
    paddingVertical: 20,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnTablet: {
    width: 52,
    height: 52,
    borderRadius: 14,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -0.3,
  },
  headerTitleTablet: {
    fontSize: 22,
    letterSpacing: -0.5,
  },
  placeholder: {
    width: 44,
  },
  content: {
    flex: 1,
  },
  
  // Tablet Layout
  tabletContainer: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 24,
  },
  tabletRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 32,
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
  },
  rightColumnContent: {
    paddingBottom: 100,
  },
  
  // Map
  mapContainer: {
    height: 300,
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  mapContainerTablet: {
    height: 400,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderBottomWidth: 1,
  },
  mapContainerLarge: {
    height: '100%',
    minHeight: 500,
    borderRadius: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  customMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentLocationBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  currentLocationBtnTablet: {
    width: 56,
    height: 56,
    borderRadius: 28,
    top: 20,
    right: 20,
  },
  locationCard: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    gap: 12,
  },
  locationCardTablet: {
    bottom: 20,
    left: 20,
    right: 20,
    padding: 20,
    borderRadius: 16,
    gap: 16,
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 20,
  },
  locationTextTablet: {
    fontSize: 16,
    lineHeight: 24,
  },
  
  // Form
  formSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 100,
  },
  formSectionTablet: {
    paddingHorizontal: 24,
    paddingTop: 0,
  },
  formSectionLarge: {
    paddingHorizontal: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 20,
    letterSpacing: -0.2,
  },
  sectionTitleTablet: {
    fontSize: 20,
    marginBottom: 24,
    letterSpacing: -0.4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
    letterSpacing: -0.1,
  },
  labelTablet: {
    fontSize: 16,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    paddingHorizontal: 16,
    height: 56,
    gap: 12,
  },
  inputContainerTablet: {
    height: 64,
    borderRadius: 14,
    paddingHorizontal: 20,
    gap: 14,
  },
  inputContainerFocused: {
    borderColor: '#000000',
    backgroundColor: '#FAFAFA',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#000000',
    fontWeight: '500',
    padding: 0,
  },
  inputTablet: {
    fontSize: 17,
  },
  textAreaContainer: {
    height: 100,
    alignItems: 'flex-start',
    paddingVertical: 16,
  },
  textAreaContainerTablet: {
    height: 120,
    paddingVertical: 20,
  },
  textAreaIcon: {
    marginTop: 2,
  },
  textArea: {
    height: 70,
    textAlignVertical: 'top',
  },
  textAreaTablet: {
    height: 80,
  },
  
  // Address Type
  addressTypeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  typeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  typeBtnTablet: {
    paddingVertical: 16,
    borderRadius: 14,
    gap: 10,
  },
  typeBtnActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  typeBtnOutline: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  typeBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  typeBtnTextTablet: {
    fontSize: 16,
  },
  typeBtnTextActive: {
    color: '#FFFFFF',
  },
  typeBtnTextOutline: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  
  // Bottom Button
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomContainerTablet: {
    paddingHorizontal: 32,
    paddingVertical: 20,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#000000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveBtnTablet: {
    paddingVertical: 18,
    borderRadius: 14,
    gap: 10,
  },
  saveText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  saveTextTablet: {
    fontSize: 17,
  },
});