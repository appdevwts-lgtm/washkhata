import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Linking,
  Switch,
  Modal,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const TermsAndConditionsScreen = ({ navigation }) => {
  const [acceptedAll, setAcceptedAll] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [activeSection, setActiveSection] = useState('terms');

  const sections = [
    {
      id: 'terms',
      title: 'Terms of Service',
      icon: 'document-text',
      content: `Last Updated: ${new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })}

**1. Acceptance of Terms**
By accessing or using WashKhata services, you agree to be bound by these Terms and Conditions. If you disagree with any part, you may not use our services.

**2. Service Description**
WashKhata provides laundry and dry cleaning services through our mobile application. We offer:
• Pickup and delivery of laundry items
• Various cleaning services (wash & fold, dry cleaning, ironing)
• Premium care for special garments
• Express delivery options

**3. User Account**
To use our services, you must:
• Create an account with accurate information
• Maintain confidentiality of your login credentials
• Be at least 18 years old or have parental consent
• Not create multiple accounts without authorization

**4. Ordering Process**
• Orders are confirmed only after payment verification
• You must provide accurate item descriptions
• Special care instructions must be clearly communicated
• Pickup/delivery windows are subject to availability

**5. Pricing and Payment**
• Prices are displayed before order confirmation
• Additional charges may apply for special requests
• Payment must be completed before service commencement
• Refunds are processed as per our refund policy

**6. Cancellation Policy**
• Orders can be cancelled within 1 hour of booking
• After pickup, cancellations may incur charges
• Refunds for cancellations are processed within 5-7 business days

**7. Liability and Damages**
• We take utmost care of your garments
• Liability is limited to 5 times the service charge per item
• For premium items, additional insurance may be required
• We are not liable for pre-existing damages

**8. User Responsibilities**
You agree to:
• Provide clean and legal items for service
• Not submit hazardous materials
• Be available during scheduled pickup/delivery
• Pay all applicable charges

**9. Prohibited Activities**
You may not:
• Use our service for illegal purposes
• Submit items that violate safety regulations
• Attempt to bypass our payment systems
• Misuse promotional offers

**10. Modifications**
We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance.`,
    },
    {
      id: 'refund',
      title: 'Refund Policy',
      icon: 'cash',
      content: `**Refund Eligibility**

**Full Refunds:**
• Order cancellation within 1 hour
• Service not provided as booked
• Significant delay without communication
• Items lost or severely damaged

**Partial Refunds:**
• Minor service issues
• Partial order fulfillment
• Quality concerns

**No Refunds:**
• After service completion
• For minor delays
• User unavailability during delivery
• Change of mind after pickup

**Refund Process:**
1. Submit refund request through app
2. Investigation within 48 hours
3. Approval/denial notification
4. Processing within 5-7 business days
5. Credit to original payment method

**Damaged Items:**
• Report within 24 hours of delivery
• Provide photographic evidence
• Maximum liability: 5x service charge
• Professional assessment required`,
    },
    {
      id: 'delivery',
      title: 'Delivery Terms',
      icon: 'bicycle',
      content: `**Delivery Services**

**Standard Delivery:**
• 48-hour turnaround time
• Free delivery on orders above ₹500
• Contactless delivery available
• Safe drop options

**Express Delivery:**
• 24-hour service
• Additional charges apply
• Subject to availability
• Limited area coverage

**Pickup Services:**
• Scheduled time windows
• 15-minute grace period
• Multiple attempts if unavailable
• Rescheduling options

**Delivery Charges:**
• Calculated based on distance
• Minimum order value may apply
• Free delivery promotions available
• Transparent pricing display

**Unsuccessful Delivery:**
• Three delivery attempts
• Items returned to facility
• Storage charges may apply
• Rescheduling available`,
    },
    {
      id: 'prohibited',
      title: 'Prohibited Items',
      icon: 'warning',
      content: `**Items We Cannot Accept**

**Hazardous Materials:**
• Flammable substances
• Chemicals or toxins
• Biological waste
• Radioactive materials

**Illegal Items:**
• Stolen property
• Counterfeit goods
• Illegal substances
• Prohibited textiles

**High-Risk Items:**
• Irreplaceable heirlooms
• Extremely fragile items
• Museum artifacts
• Items with sentimental value only

**Special Requirements:**
• Live plants or animals
• Perishable goods
• Wet/mouldy items
• Items requiring special permits

**Accepted with Conditions:**
• Leather (premium care required)
• Silk (special handling)
• Wedding dresses (insurance recommended)
• Antique items (additional assessment)

**Consequences:**
• Items may be refused at pickup
• Additional charges for special handling
• Liability limitations apply
• Legal action for prohibited submissions`,
    },
  ];

  const handleAcceptAll = () => {
    if (!acceptedAll) {
      setAcceptedTerms(true);
      setAcceptedAll(true);
      setShowConsentModal(true);
    }
  };

  const handleIndividualToggle = type => {
    switch (type) {
      case 'terms':
        const newValue = !acceptedTerms;
        setAcceptedTerms(newValue);
        setAcceptedAll(newValue);
        break;
    }
  };

  const handleContinue = () => {
    if (acceptedTerms) {
      // Save acceptance to AsyncStorage or backend
      Alert.alert(
        'Terms Accepted',
        'Thank you for accepting our Terms and Conditions.',
        [
          {
            text: 'Continue',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } else {
      Alert.alert(
        'Accept Terms',
        'Please accept the terms and conditions to continue.',
      );
    }
  };

  const openWebsite = () => {
    Linking.openURL('https://www.washkhata.com/terms');
  };

  const downloadPDF = () => {
    Alert.alert(
      'Download PDF',
      'Terms and Conditions PDF will be downloaded.',
      [{ text: 'OK' }],
    );
  };

  const activeContent = sections.find(section => section.id === activeSection);

  // Function to render formatted text with bold support
  const renderFormattedText = text => {
    const lines = text.split('\n');
    return lines.map((line, lineIndex) => {
      // Check if line starts with **
      const boldMatch = line.match(/^\*\*(.+?)\*\*(.*)$/);

      if (boldMatch) {
        // This is a heading/bold line
        return (
          <View key={lineIndex} style={styles.textLineContainer}>
            <Text style={styles.boldText}>{boldMatch[1]}</Text>
            {boldMatch[2] && (
              <Text style={styles.contentText}>{boldMatch[2]}</Text>
            )}
          </View>
        );
      }

      // Check for inline bold text
      const parts = [];
      let remainingText = line;
      let partIndex = 0;

      const inlineBoldRegex = /\*\*(.+?)\*\*/g;
      let match;
      let lastIndex = 0;

      while ((match = inlineBoldRegex.exec(line)) !== null) {
        // Add text before the bold part
        if (match.index > lastIndex) {
          parts.push(
            <Text
              key={`text-${lineIndex}-${partIndex++}`}
              style={styles.contentText}
            >
              {line.substring(lastIndex, match.index)}
            </Text>,
          );
        }

        // Add the bold part
        parts.push(
          <Text
            key={`bold-${lineIndex}-${partIndex++}`}
            style={styles.boldText}
          >
            {match[1]}
          </Text>,
        );

        lastIndex = match.index + match[0].length;
      }

      // Add remaining text
      if (lastIndex < line.length) {
        parts.push(
          <Text
            key={`text-${lineIndex}-${partIndex++}`}
            style={styles.contentText}
          >
            {line.substring(lastIndex)}
          </Text>,
        );
      }

      // If no bold formatting found, return plain text
      if (parts.length === 0) {
        return (
          <Text key={lineIndex} style={styles.contentText}>
            {line}
            {'\n'}
          </Text>
        );
      }

      // Return formatted line
      return (
        <Text key={lineIndex} style={styles.textLineContainer}>
          {parts}
          {'\n'}
        </Text>
      );
    });
  };

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
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
        <TouchableOpacity style={styles.headerButton} onPress={downloadPDF}>
          <Icon name="download" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* App Header */}
        <View style={styles.appHeader}>
          <View style={styles.logoContainer}>
            <Icon name="shirt" size={40} color="#000000" />
          </View>
          <Text style={styles.appTitle}>WashKhata</Text>
          <Text style={styles.appSubtitle}>Terms of Service Agreement</Text>
        </View>

        {/* Last Updated */}
        <View style={styles.updateBanner}>
          <Icon name="time" size={16} color="#666666" />
          <Text style={styles.updateText}>
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>
        </View>

        {/* Navigation Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsScroll}
        >
          {sections.map(section => (
            <TouchableOpacity
              key={section.id}
              style={[
                styles.tabButton,
                activeSection === section.id && styles.tabButtonActive,
              ]}
              onPress={() => setActiveSection(section.id)}
            >
              <Icon
                name={section.icon}
                size={18}
                color={activeSection === section.id ? '#eaeaeaff' : '#666666'}
              />
              <Text
                style={[
                  styles.tabText,
                  activeSection === section.id && styles.tabTextActive,
                ]}
              >
                {section.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Content Section */}
        <View style={styles.contentSection}>
          <Text style={styles.contentTitle}>{activeContent?.title}</Text>
          <ScrollView style={styles.contentScroll}>
            {renderFormattedText(activeContent?.content || '')}
          </ScrollView>
        </View>

        {/* Quick Links */}
        <View style={styles.linksSection}>
          <Text style={styles.linksTitle}>Quick Links</Text>
          <View style={styles.linksGrid}>
            <TouchableOpacity
              style={styles.linkCard}
              onPress={() => navigation.navigate('HelpCenter')}
            >
              <Icon name="help-circle" size={24} color="#000000" />
              <Text style={styles.linkText}>FAQs</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkCard}
              onPress={() => Linking.openURL('mailto:legal@washkhata.com')}
            >
              <Icon name="mail" size={24} color="#000000" />
              <Text style={styles.linkText}>Legal Contact</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkCard}
              onPress={() => navigation.navigate('PrivacyPolicy')}
            >
              <Icon name="shield-checkmark" size={24} color="#000000" />
              <Text style={styles.linkText}>Privacy Policy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkCard} onPress={openWebsite}>
              <Icon name="globe" size={24} color="#000000" />
              <Text style={styles.linkText}>Website</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>WashKhata Legal</Text>
          <Text style={styles.footerText}>
            WashKhata Technologies Pvt. Ltd.{'\n'}
            123 Business Street, Mumbai, Maharashtra 400001{'\n'}
            CIN: U74999MH2024PTC123456
          </Text>
          <Text style={styles.footerNote}>
            © {new Date().getFullYear()} WashKhata. All rights reserved.
          </Text>
        </View>
      </ScrollView>

      {/* Consent Modal */}
      <Modal
        visible={showConsentModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowConsentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Icon name="checkmark-circle" size={60} color="#4CAF50" />
            <Text style={styles.modalTitle}>Terms Accepted</Text>
            <Text style={styles.modalText}>
              You have successfully accepted the Terms and Conditions. You can
              review these at any time in Settings.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowConsentModal(false)}
            >
              <Text style={styles.modalButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    justifyContent: 'space-between',
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  appHeader: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 4,
  },
  appSubtitle: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  updateBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
  },
  updateText: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '500',
  },
  tabsScroll: {
    paddingHorizontal: 20,
    // paddingVertical: 160,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 12,
    marginBottom:10
  },
  tabButtonActive: {
    backgroundColor: '#000000',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  contentSection: {
    padding: 20,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    // marginBottom: 160,
  },
  contentScroll: {
    // maxHeight: 350,
  },
  contentText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  boldText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 22,
    marginTop: 4,
    // marginBottom: 4,
  },
  textLineContainer: {
    // marginBottom: 4,
  },
  linksSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FAFAFA',
  },
  linksTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 10,
  },
  linksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  linkCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  linkText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
    marginTop: 8,
  },

  toggleSection: {
    gap: 16,
    marginBottom: 24,
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  toggleInfo: {
    flex: 1,
    marginRight: 16,
  },
  toggleTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  toggleDescription: {
    fontSize: 13,
    color: '#666666',
  },
  actionButtons: {
    gap: 12,
  },
  continueButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#E5E5E5',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  footer: {
    padding: 20,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  footerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 12,
  },
  footerNote: {
    fontSize: 11,
    color: '#999999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginVertical: 16,
  },
  modalText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  modalButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  modalButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default TermsAndConditionsScreen;
