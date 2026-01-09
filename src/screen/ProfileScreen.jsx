import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const MenuItem = ({ icon, title, subtitle, onPress, showBadge, badgeText, isTablet }) => (
  <TouchableOpacity 
    style={[
      styles.menuItem, 
      isTablet && styles.menuItemTablet,
      isTablet && styles.menuItemCard
    ]} 
    onPress={onPress} 
    activeOpacity={0.7}
  >
    <View style={styles.menuLeft}>
      <View style={[
        styles.menuIcon,
        isTablet && styles.menuIconTablet
      ]}>
        <Icon name={icon} size={isTablet ? 24 : 22} color="#000000" />
      </View>
      <View style={isTablet && styles.menuContentTablet}>
        <Text style={[
          styles.menuTitle,
          isTablet && styles.menuTitleTablet
        ]}>{title}</Text>
        {subtitle && (
          <Text style={[
            styles.menuSubtitle,
            isTablet && styles.menuSubtitleTablet
          ]}>
            {subtitle}
          </Text>
        )}
      </View>
    </View>
    <View style={styles.menuRight}>
      {showBadge && (
        <View style={[
          styles.badge,
          isTablet && styles.badgeTablet
        ]}>
          <Text style={[
            styles.badgeText,
            isTablet && styles.badgeTextTablet
          ]}>
            {badgeText}
          </Text>
        </View>
      )}
      <Icon name="chevron-forward" size={isTablet ? 22 : 20} color="#94A3B8" />
    </View>
  </TouchableOpacity>
);

const StatCard = ({ icon, value, label, color, bgColor, isTablet }) => (
  <View style={[
    styles.statCard,
    isTablet && styles.statCardTablet
  ]}>
    <View style={[
      styles.statIconContainer, 
      { backgroundColor: bgColor },
      isTablet && styles.statIconContainerTablet
    ]}>
      <Icon name={icon} size={isTablet ? 26 : 22} color={color} />
    </View>
    <Text style={[
      styles.statValue,
      isTablet && styles.statValueTablet
    ]}>
      {value}
    </Text>
    <Text style={[
      styles.statLabel,
      isTablet && styles.statLabelTablet
    ]}>
      {label}
    </Text>
  </View>
);

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const isLargeTablet = width >= 1024;

  const renderLeftColumn = () => (
    <View style={[styles.leftColumn , isTablet && {marginHorizontal: 24}]}>
      {/* Profile Card */}
      <View style={[
        styles.profileCard,
        isTablet && styles.profileCardTablet
      ]}>
        <View style={[
          styles.profileHeader,
          isTablet && styles.profileHeaderTablet
        ]}>
          <View style={[
            styles.avatarContainer,
            isTablet && styles.avatarContainerTablet
          ]}>
            <View style={[
              styles.avatar,
              isTablet && styles.avatarTablet
            ]}>
              <Icon name="person" size={isTablet ? 48 : 40} color="#000000ff" />
            </View>
            <TouchableOpacity 
              style={[
                styles.editAvatarBtn,
                isTablet && styles.editAvatarBtnTablet
              ]} 
              activeOpacity={0.7}
            >
              <Icon name="camera" size={isTablet ? 16 : 14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={[
            styles.profileInfo,
            isTablet && styles.profileInfoTablet
          ]}>
            <Text style={[
              styles.userName,
              isTablet && styles.userNameTablet
            ]}>
              Chandan Kanaujia
            </Text>
            <Text style={[
              styles.userEmail,
              isTablet && styles.userEmailTablet
            ]}>
              chandanegc@gmail.com
            </Text>
            <View style={[
              styles.locationRow,
              isTablet && styles.locationRowTablet
            ]}>
              <Icon name="location-outline" size={isTablet ? 16 : 14} color="#64748B" />
              <Text style={[
                styles.locationText,
                isTablet && styles.locationTextTablet
              ]}>
                Lucknow, UP
              </Text>
            </View>
          </View>
        </View>

        {/* Stats Row */}
        <View style={[
          styles.statsRow,
          isTablet && styles.statsRowTablet
        ]}>
          <StatCard 
            icon="receipt-outline" 
            value="24" 
            label="Total Orders"
            color="#4F46E5"
            bgColor="#EEF2FF"
            isTablet={isTablet}
          />
          <StatCard 
            icon="star" 
            value="4.8" 
            label="Rating"
            color="#F59E0B"
            bgColor="#FEF3C7"
            isTablet={isTablet}
          />
          <StatCard 
            icon="wallet-outline" 
            value="₹450" 
            label="Wallet"
            color="#10B981"
            bgColor="#D1FAE5"
            isTablet={isTablet}
          />
        </View>
      </View>

      {/* Account Section */}
      <View style={[
        styles.section,
        isTablet && styles.sectionTablet
      ]}>
        <Text style={[
          styles.sectionTitle,
          isTablet && styles.sectionTitleTablet
        ]}>
          Account
        </Text>
        {isTablet ? (
          // Grid layout for tablets
          <View style={styles.menuGrid}>
            <View style={styles.menuGridColumn}>
              <MenuItem 
                icon="person-outline"
                title="Edit Profile"
                subtitle="Update your personal details"
                onPress={() => navigation.navigate('EditProfile')}
                isTablet={isTablet}
              />
              <MenuItem 
                icon="location-outline"
                title="My Addresses"
                subtitle="Manage delivery addresses"
                showBadge
                badgeText="2"
                onPress={() => navigation.navigate('MyAddress')}
                isTablet={isTablet}
              />
            </View>
            <View style={styles.menuGridColumn}>
              {/* <MenuItem 
                icon="card-outline"
                title="Payment Methods"
                subtitle="Cards, UPI & more"
                onPress={() => navigation.navigate('Payment')}
                isTablet={isTablet}
              /> */}
              <MenuItem 
                icon="pricetag-outline"
                title="My Coupons"
                subtitle="View available offers"
                showBadge
                badgeText="3"
                onPress={() => navigation.navigate('Coupon')}
                isTablet={isTablet}
              />
            </View>
          </View>
        ) : (
          // List layout for mobile
          <View style={styles.menuGroup}>
            <MenuItem 
              icon="person-outline"
              title="Edit Profile"
              subtitle="Update your personal details"
              onPress={() => navigation.navigate('EditProfile')}
              isTablet={isTablet}
            />
            <MenuItem 
              icon="location-outline"
              title="My Addresses"
              subtitle="Manage delivery addresses"
              showBadge
              badgeText="2"
              onPress={() => navigation.navigate('MyAddress')}
              isTablet={isTablet}
            />
            <MenuItem 
              icon="card-outline"
              title="Payment Methods"
              subtitle="Cards, UPI & more"
              onPress={() => navigation.navigate('PaymentMethod')}
              isTablet={isTablet}
            />
            <MenuItem 
              icon="pricetag-outline"
              title="My Coupons"
              subtitle="View available offers"
              showBadge
              badgeText="3"
              onPress={() => navigation.navigate('Coupon')}
              isTablet={isTablet}
            />
          </View>
        )}
      </View>

      {/* Support Section */}
      <View style={[
        styles.section,
        isTablet && styles.sectionTablet
      ]}>
        <Text style={[
          styles.sectionTitle,
          isTablet && styles.sectionTitleTablet
        ]}>
          Support
        </Text>
        {isTablet ? (
          // Grid layout for tablets
          <View style={styles.menuGrid}>
            <View style={styles.menuGridColumn}>
              <MenuItem 
                icon="help-circle-outline"
                title="Help Center"
                subtitle="FAQs and support"
                onPress={() => navigation.navigate('HelpCenter')}
                isTablet={isTablet}
              />
              <MenuItem 
                icon="chatbubble-outline"
                title="Contact Us"
                subtitle="Get in touch with us"
                onPress={() => navigation.navigate('ContactUs')}
                isTablet={isTablet}
              />
            </View>
            <View style={styles.menuGridColumn}>
              <MenuItem 
                icon="shield-checkmark-outline"
                title="Privacy Policy"
                onPress={() => navigation.navigate('PrivacyPolicy')}
                isTablet={isTablet}
              />
              <MenuItem 
                icon="document-text-outline"
                title="Terms & Conditions"
                onPress={() => navigation.navigate('TermsConditions')}
                isTablet={isTablet}
              />
            </View>
          </View>
        ) : (
          // List layout for mobile
          <View style={styles.menuGroup}>
            <MenuItem 
              icon="help-circle-outline"
              title="Help Center"
              subtitle="FAQs and support"
              onPress={() => navigation.navigate('HelpCenter')}
              isTablet={isTablet}
            />
            {/* <MenuItem 
              icon="chatbubble-outline"
              title="Contact Us"
              subtitle="Get in touch with us"
              onPress={() => navigation.navigate('ContactUs')}
              isTablet={isTablet}
            /> */}
            <MenuItem 
              icon="shield-checkmark-outline"
              title="Privacy Policy"
              onPress={() => navigation.navigate('PrivacyPolicy')}
              isTablet={isTablet}
            />
            <MenuItem 
              icon="document-text-outline"
              title="Terms & Conditions"
              onPress={() => navigation.navigate('TermsCondtions')}
              isTablet={isTablet}
            />
          </View>
        )}
      </View>
    </View>
  );

  const renderRightColumn = () => (
    <View style={[styles.rightColumn]}>
      {/* Preferences Section */}
      <View style={[
        styles.section,
        isTablet && styles.sectionTablet
      ]}>
        <Text style={[
          styles.sectionTitle,
          isTablet && styles.sectionTitleTablet
        ]}>
          Preferences
        </Text>
        {isTablet ? (
          // Grid layout for tablets
          <View style={styles.menuGrid}>
            <View style={styles.menuGridColumn}>
              <MenuItem 
                icon="notifications-outline"
                title="Notifications"
                subtitle="Manage notification settings"
                onPress={() => navigation.navigate('Notification')}
                isTablet={isTablet}
              />
              <MenuItem 
                icon="language-outline"
                title="Language"
                subtitle="English"
                onPress={() => navigation.navigate('Language')}
                isTablet={isTablet}
              />
              <MenuItem 
                icon="moon-outline"
                title="Dark Mode"
                subtitle="Toggle dark theme"
                onPress={() => navigation.navigate('DarkMode')}
                isTablet={isTablet}
              />
            </View>
          </View>
        ) : (
          // List layout for mobile
          <View style={styles.menuGroup}>
            <MenuItem 
              icon="notifications-outline"
              title="Notifications"
              subtitle="Manage notification settings"
              onPress={() => navigation.navigate('Notification')}
              isTablet={isTablet}
            />
            <MenuItem 
              icon="language-outline"
              title="Language"
              subtitle="English"
              onPress={() => navigation.navigate('Language')}
              isTablet={isTablet}
            />
            <MenuItem 
              icon="moon-outline"
              title="Dark Mode"
              subtitle="Toggle dark theme"
              onPress={() => navigation.navigate('DarkMode')}
              isTablet={isTablet}
            />
          </View>
        )}
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        style={[
          styles.logoutBtn,
          isTablet && styles.logoutBtnTablet
        ]} 
        activeOpacity={0.7}
      >
        <Icon name="log-out-outline" size={isTablet ? 22 : 20} color="#EF4444" />
        <Text style={[
          styles.logoutText,
          isTablet && styles.logoutTextTablet
        ]}>
          Logout
        </Text>
      </TouchableOpacity>

      {/* Version */}
      <Text style={[
        styles.version,
        isTablet && styles.versionTablet
      ]}>
        Version 2.4.1
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={[
        styles.header,
        isTablet && styles.headerTablet
      ]}>
        <Text style={[
          styles.headerTitle,
          isTablet && styles.headerTitleTablet
        ]}>
          Profile
        </Text>
        {isTablet && (
          <TouchableOpacity style={styles.settingsBtn} activeOpacity={0.7}>
            <Icon name="settings-outline" size={28} color="#0F172A" />
          </TouchableOpacity>
        )}
      </View>

      {isLargeTablet ? (
        // Two-column layout for large tablets
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            styles.scrollContentTablet
          ]}
        >
          <View style={styles.tabletContainer}>
            {renderLeftColumn()}
            <View style={styles.verticalDivider} />
            {renderRightColumn()}
          </View>
        </ScrollView>
      ) : (
        // Single column for mobile and small tablets
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            isTablet && styles.scrollContentTablet
          ]}
        >
          {renderLeftColumn()}
          
          {/* Preferences Section for mobile/small tablet */}
          {/* {!isLargeTablet && (
            <View style={[
              styles.section,
              isTablet && styles.sectionTablet,
              isTablet && {marginHorizontal: 24},
            ]}>
              <Text style={[
                styles.sectionTitle,
                isTablet && styles.sectionTitleTablet
              ]}>
                Preferences
              </Text>
              <View style={styles.menuGroup}>
                <MenuItem 
                  icon="notifications-outline"
                  title="Notifications"
                  subtitle="Manage notification settings"
                  onPress={() => navigation.navigate('Notification')}
                  isTablet={isTablet}
                />
                <MenuItem 
                  icon="language-outline"
                  title="Language"
                  subtitle="English"
                  onPress={() => navigation.navigate('Language')}
                  isTablet={isTablet}
                />
                <MenuItem 
                  icon="moon-outline"
                  title="Dark Mode"
                  subtitle="Toggle dark theme"
                  onPress={() => navigation.navigate('DarkMode')}
                  isTablet={isTablet}
                />
              </View>
            </View>
          )} */}
          
          {/* Logout Button & Version for mobile/small tablet */}
          {!isLargeTablet && (
            <>
              <TouchableOpacity 
                style={[
                  styles.logoutBtn,
                  isTablet && styles.logoutBtnTablet
                ]} 
                activeOpacity={0.7}
              >
                <Icon name="log-out-outline" size={isTablet ? 22 : 20} color="#EF4444" />
                <Text style={[
                  styles.logoutText,
                  isTablet && styles.logoutTextTablet
                ]}>
                  Logout
                </Text>
              </TouchableOpacity>
              <Text style={[
                styles.version,
                isTablet && styles.versionTablet
              ]}>
                Version 2.4.1
              </Text>
            </>
          )}
        </ScrollView>
      )}

      {/* Bottom Navigation - Only for mobile */}
      {/* {!isTablet && (
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
            <Icon name="home-outline" size={24} color="#64748B" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
            <Icon name="cart-outline" size={24} color="#64748B" />
            <Text style={styles.navText}>Cart</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
            <Icon name="receipt-outline" size={24} color="#64748B" />
            <Text style={styles.navText}>Orders</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
            <Icon name="person" size={24} color="#FFFFFF" />
            <Text style={[styles.navText, styles.navTextActive]}>Profile</Text>
          </TouchableOpacity>
        </View>
      )} */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTablet: {
    paddingHorizontal: 32,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  headerTitleTablet: {
    fontSize: 28,
  },
  settingsBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  scrollContentTablet: {
    paddingBottom: 40,
  },
  
  // Tablet Layout
  tabletContainer: {
    flexDirection: 'row',
    paddingHorizontal: 32,
    paddingTop: 24,
    maxWidth: 1400,
    marginHorizontal: 'auto',
    width: '100%',
  },
  leftColumn: {
    flex: 1,
    // marginRight: 24,
  },
  rightColumn: {
    flex: 1,
    // marginLeft: 24,
  },
  verticalDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 24,
  },
  
  // Profile Card
  profileCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingBottom: 0,
  },
  profileCardTablet: {
    marginHorizontal: 0,
    marginTop: 0,
    marginBottom: 24,
    borderRadius: 24,
    padding: 24,
    paddingBottom: 8,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileHeaderTablet: {
    marginBottom: 28,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatarContainerTablet: {
    marginRight: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#e3e3e3ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  avatarTablet: {
    width: 100,
    height: 100,
    borderRadius: 25,
    borderWidth: 4,
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  editAvatarBtnTablet: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 3,
  },
  profileInfo: {
    flex: 1,
  },
  profileInfoTablet: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  userNameTablet: {
    fontSize: 28,
    marginBottom: 6,
  },
  userEmail: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  userEmailTablet: {
    fontSize: 16,
    marginBottom: 10,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationRowTablet: {
    gap: 6,
  },
  locationText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  locationTextTablet: {
    fontSize: 15,
  },
  
  // Stats Row
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  statsRowTablet: {
    gap: 16,
    paddingTop: 24,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statCardTablet: {
    padding: 8,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statIconContainerTablet: {
    width: 52,
    height: 52,
    borderRadius: 14,
    marginBottom: 12,
  },
  statValue: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0F172A',
    marginBottom: 2,
  },
  statValueTablet: {
    fontSize: 24,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  statLabelTablet: {
    fontSize: 14,
  },
  
  // Sections
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTablet: {
    paddingHorizontal: 0,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  sectionTitleTablet: {
    fontSize: 20,
    marginBottom: 16,
  },
  
  // Menu Groups
  menuGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  menuGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  menuGridColumn: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuItemTablet: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 0,
  },
  menuItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuIconTablet: {
    width: 52,
    height: 52,
    borderRadius: 14,
    marginRight: 16,
  },
  menuContentTablet: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 2,
  },
  menuTitleTablet: {
    fontSize: 17,
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#64748B',
  },
  menuSubtitleTablet: {
    fontSize: 14,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    minWidth: 24,
    alignItems: 'center',
  },
  badgeTablet: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    minWidth: 28,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EF4444',
  },
  badgeTextTablet: {
    fontSize: 14,
  },
  
  // Logout Button
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  logoutBtnTablet: {
    paddingVertical: 18,
    borderRadius: 14,
    marginTop: 32,
     marginHorizontal: 24,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#EF4444',
  },
  logoutTextTablet: {
    fontSize: 17,
  },
  
  // Version
  version: {
    textAlign: 'center',
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 24,
  },
  versionTablet: {
    fontSize: 15,
    marginTop: 32,
  },
  
  // Bottom Navigation (Mobile only)
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '500',
  },
  navTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});