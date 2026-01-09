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
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const PrivacyPolicyScreen = ({ navigation }) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      content: `At WashKhata, we value your trust and are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our laundry services.`,
    },
    {
      id: 'information-collected',
      title: 'Information We Collect',
      content: `We collect information to provide you with a better experience. This includes:

• Personal Identification Information: When you sign up or make a booking, we collect your name, phone number, email address, and delivery address.

• Payment Information: For processing payments, we collect your payment details (e.g., credit card information), which are securely handled by third-party payment processors.

• Service Details: We collect information about the services you request, including the type of clothes, special cleaning instructions, and delivery preferences.

• Usage Data: We collect information about how you use our app, including device information, IP address, and browsing patterns.`,
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      content: `We use your personal information for the following purposes:

• To provide our services: Your data allows us to process and fulfill laundry orders, including scheduling pick-ups and deliveries.

• To improve our services: We analyze usage patterns and feedback to enhance our service quality and customer experience.

• To communicate with you: We use your contact information to send order updates, promotions, or respond to customer service inquiries.

• To comply with legal obligations: We may use your information as required by law or regulation.

• For marketing purposes: With your consent, we may send you promotional offers and updates about our services.`,
    },
    {
      id: 'information-protection',
      title: 'How We Protect Your Information',
      content: `We prioritize your privacy and take appropriate technical and organizational measures to protect your data:

• Encryption: We use encryption protocols to secure personal and payment information during transmission.

• Access Control: Only authorized employees and service providers have access to your data, and we enforce strict internal security policies.

• Data Retention: We retain your personal information only for as long as necessary to provide our services, or as required by law.

• Regular Audits: We conduct regular security audits to ensure our systems are secure.`,
    },
    {
      id: 'information-sharing',
      title: 'Sharing Your Information',
      content: `We do not sell or rent your personal information to third parties. However, we may share your data with:

• Service Providers: Third-party vendors or partners who assist us with payment processing, delivery, and other aspects of our service.

• Legal Compliance: If required by law or in response to legal requests, we may disclose your information to authorities.

• Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity.`,
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      content: `You have the right to:

• Access Your Data: You can request a copy of the personal information we hold about you.

• Correction: You can update or correct any inaccurate information.

• Deletion: You may request the deletion of your personal data, subject to any legal obligations.

• Opt-out of Marketing: You can unsubscribe from promotional emails at any time.

• Data Portability: You can request your data in a structured, commonly used format.

To exercise these rights, please contact us at support@washkhata.com.`,
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking Technologies',
      content: `We may use cookies and other tracking technologies to enhance your experience on our app. These tools help us analyze trends, administer the app, track users' movements, and gather demographic information.

• Essential Cookies: Required for the app to function properly.
• Analytics Cookies: Help us understand how users interact with our app.
• Marketing Cookies: Used to deliver relevant advertisements.

You can manage your cookie preferences through your device settings or browser.`,
    },
    {
      id: 'third-party',
      title: 'Third-Party Links',
      content: `Our app may contain links to external sites. Please note that we are not responsible for the content or privacy practices of third-party sites. We encourage you to review the privacy policies of any site you visit.`,
    },
    {
      id: 'children',
      title: "Children's Privacy",
      content: `Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.`,
    },
    {
      id: 'changes',
      title: 'Changes to This Privacy Policy',
      content: `We reserve the right to update this Privacy Policy. Any changes will be posted on this page with the updated date. We recommend reviewing this policy periodically to stay informed about how we protect your information.

Last Updated: ${new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })}`,
    },
  ];

  const handleContactUs = () => {
    Linking.openURL('mailto:support@washkhata.com');
  };

  const handleOpenWebsite = () => {
    Linking.openURL('https://www.washkhata.com/privacy');
  };

  const handleAcceptTerms = () => {
    if (acceptedTerms) {
      // Navigate back or show confirmation
      navigation.goBack();
    } else {
      Alert.alert(
        'Accept Policy',
        'Please accept the Privacy Policy to continue',
      );
    }
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
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* App Logo/Title */}
        <View style={styles.appHeader}>
          <View style={styles.logoContainer}>
            <Icon name="shirt" size={40} color="#000000" />
          </View>
          <Text style={styles.appTitle}>WashKhata</Text>
          <Text style={styles.appSubtitle}>Smart Laundry Solutions</Text>
        </View>

        {/* Introduction */}
        <View style={styles.introSection}>
          <Text style={styles.introText}>
            Welcome to WashKhata! We're committed to protecting your privacy and
            ensuring your personal information is handled with care. This policy
            explains how we collect, use, and protect your data.
          </Text>
        </View>

        {/* Policy Sections */}
        {sections.map(section => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}

        {/* Contact Information */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.contactContent}>
            If you have any questions about this Privacy Policy, please contact
            us:
          </Text>

          <TouchableOpacity
            style={styles.contactItem}
            onPress={handleContactUs}
          >
            <Icon name="mail-outline" size={20} color="#666666" />
            <Text style={styles.contactText}>support@washkhata.com</Text>
          </TouchableOpacity>

          <View style={styles.contactItem}>
            <Icon name="call-outline" size={20} color="#666666" />
            <Text style={styles.contactText}>+91-1800-123-4567</Text>
          </View>

          <TouchableOpacity
            style={styles.contactItem}
            onPress={handleOpenWebsite}
          >
            <Icon name="globe-outline" size={20} color="#666666" />
            <Text style={styles.contactText}>www.washkhata.com</Text>
          </TouchableOpacity>

          <View style={styles.contactItem}>
            <Icon name="location-outline" size={20} color="#666666" />
            <Text style={styles.contactText}>
              WashKhata Headquarters{'\n'}
              123 Business Street{'\n'}
              Mumbai, Maharashtra 400001
            </Text>
          </View>
        </View>

        {/* Settings Section */}
        {/* <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Privacy Settings</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Accept Privacy Policy</Text>
              <Text style={styles.settingDescription}>
                I have read and agree to the Privacy Policy
              </Text>
            </View>
            <Switch
              value={acceptedTerms}
              onValueChange={setAcceptedTerms}
              trackColor={{ false: '#E5E5E5', true: '#000000' }}
              thumbColor={acceptedTerms ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Marketing Communications</Text>
              <Text style={styles.settingDescription}>
                Receive promotional offers and updates
              </Text>
            </View>
            <Switch
              value={marketingOptIn}
              onValueChange={setMarketingOptIn}
              trackColor={{ false: '#E5E5E5', true: '#000000' }}
              thumbColor={marketingOptIn ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </View> */}

        {/* Action Buttons */}
        {/* <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.saveButton]}
            onPress={handleAcceptTerms}
          >
            <Text style={styles.saveButtonText}>
              {acceptedTerms ? 'Save Preferences' : 'Accept & Continue'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.downloadButton]}
            onPress={() => {
            }}
          >
            <Icon name="download-outline" size={20} color="#000000" />
            <Text style={styles.downloadButtonText}>Download Policy</Text>
          </TouchableOpacity>
        </View> */}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} WashKhata. All rights reserved.
          </Text>
          <Text style={styles.footerNote}>
            This policy applies to WashKhata User App v2.0
          </Text>
        </View>
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
  headerPlaceholder: {
    width: 44,
  },
  scrollView: {
    flex: 1,
  },
  appHeader: {
    alignItems: 'center',
    paddingVertical: 24,
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
  introSection: {
    padding: 20,
    backgroundColor: '#FAFAFA',
    marginBottom: 8,
  },
  introText: {
    fontSize: 15,
    color: '#000000',
    lineHeight: 24,
    textAlign: 'center',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 22,
  },
  contactSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  contactContent: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 22,
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  contactText: {
    flex: 1,
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  settingsSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
  },
  actionButtons: {
    padding: 20,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  saveButton: {
    backgroundColor: '#000000',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  downloadButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    gap: 8,
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  footerText: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 4,
  },
  footerNote: {
    fontSize: 12,
    color: '#999999',
  },
});

export default PrivacyPolicyScreen;
