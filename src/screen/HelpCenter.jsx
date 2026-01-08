import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Linking,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HelpCenterScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const supportCategories = [
    { id: 'all', label: 'All Topics', icon: 'grid' },
    { id: 'booking', label: 'Booking', icon: 'calendar' },
    { id: 'payment', label: 'Payment', icon: 'card' },
    { id: 'delivery', label: 'Delivery', icon: 'bicycle' },
    { id: 'account', label: 'Account', icon: 'person' },
    { id: 'technical', label: 'Technical', icon: 'settings' },
  ];

  const faqs = [
    {
      id: 1,
      category: 'booking',
      question: 'How do I schedule a pickup?',
      answer: 'To schedule a pickup:\n1. Open the WashKhata app\n2. Tap on "New Order"\n3. Select your items and special instructions\n4. Choose pickup date and time\n5. Confirm your order\nOur delivery partner will arrive at your specified time.',
    },
    {
      id: 2,
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept:\n• Credit/Debit Cards (Visa, MasterCard, RuPay)\n• UPI (Google Pay, PhonePe, Paytm)\n• Net Banking\n• Cash on Delivery (available in select areas)\n• Digital Wallets\nAll payments are secured with 256-bit SSL encryption.',
    },
    {
      id: 3,
      category: 'delivery',
      question: 'What is your delivery turnaround time?',
      answer: 'Standard service: 48 hours\nExpress service: 24 hours (extra charges apply)\nPremium care: 72 hours\nDelivery times may vary based on item type and quantity. You can track your order in real-time from the app.',
    },
    {
      id: 4,
      category: 'account',
      question: 'How do I update my delivery address?',
      answer: 'To update your address:\n1. Go to Profile → My Addresses\n2. Tap "Add New Address" or edit existing\n3. Save changes\nYou can have multiple addresses saved and choose one during checkout.',
    },
    {
      id: 5,
      category: 'technical',
      question: 'The app keeps crashing. What should I do?',
      answer: 'Try these troubleshooting steps:\n1. Update to the latest app version\n2. Clear app cache (Settings → Apps → WashKhata → Storage → Clear Cache)\n3. Restart your phone\n4. Reinstall the app\nIf issues persist, contact our technical support.',
    },
    {
      id: 6,
      category: 'booking',
      question: 'Can I cancel or modify my order?',
      answer: 'Yes, you can cancel or modify orders:\n• Within 1 hour of booking: Full cancellation/modification allowed\n• After pickup scheduled: Contact customer support\n• Once picked up: Cannot cancel, but you can modify delivery instructions\nCancellation refunds are processed within 5-7 business days.',
    },
    {
      id: 7,
      category: 'payment',
      question: 'Is there any security deposit?',
      answer: 'No security deposit is required for regular laundry services. However, for premium items (wedding dresses, silk sarees, leather), a refundable deposit may be required based on item value.',
    },
    {
      id: 8,
      category: 'delivery',
      question: 'What if I\'m not available during delivery?',
      answer: 'If you\'re unavailable:\n1. Specify safe drop location during booking\n2. Authorize someone else to receive\n3. Reschedule delivery from the app\n4. Contact delivery partner directly\nWe offer 3 delivery attempts before returning items to our facility.',
    },
  ];

  const popularArticles = [
    {
      id: 1,
      title: 'How to Track Your Order',
      icon: 'locate',
      views: '12.5k',
    },
    {
      id: 2,
      title: 'Understanding Service Charges',
      icon: 'cash',
      views: '8.7k',
    },
    {
      id: 3,
      title: 'Premium Care Instructions',
      icon: 'shield-checkmark',
      views: '6.3k',
    },
    {
      id: 4,
      title: 'Coupon & Discount Guide',
      icon: 'pricetag',
      views: '15.2k',
    },
  ];

  const contactOptions = [
    {
      id: 1,
      title: 'Call Support',
      subtitle: 'Speak directly with our team',
      icon: 'call',
      color: '#4CAF50',
      action: () => Linking.openURL('tel:+9118001234567'),
    },
    {
      id: 2,
      title: 'Live Chat',
      subtitle: '24/7 instant messaging',
      icon: 'chatbubble-ellipses',
      color: '#2196F3',
      action: () => Alert.alert('Coming Soon', 'Live chat feature will be available soon!'),
    },
    {
      id: 3,
      title: 'Email Us',
      subtitle: 'support@washkhata.com',
      icon: 'mail',
      color: '#FF9800',
      action: () => Linking.openURL('mailto:support@washkhata.com?subject=WashKhata Support'),
    },
    {
      id: 4,
      title: 'WhatsApp',
      subtitle: 'Quick query resolution',
      icon: 'logo-whatsapp',
      color: '#25D366',
      action: () => Linking.openURL('https://wa.me/919876543210?text=Hi%20WashKhata%20Support'),
    },
  ];

  const filteredFaqs = faqs.filter(faq => {
    if (selectedCategory !== 'all' && faq.category !== selectedCategory) return false;
    if (searchQuery.trim() === '') return true;
    const query = searchQuery.toLowerCase();
    return faq.question.toLowerCase().includes(query) || 
           faq.answer.toLowerCase().includes(query);
  });

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleSubmitQuery = () => {
    if (message.trim() === '') {
      Alert.alert('Empty Message', 'Please enter your question before submitting.');
      return;
    }
    
    Alert.alert(
      'Query Submitted',
      'Your question has been sent to our support team. We\'ll respond within 24 hours.',
      [
        { text: 'OK', onPress: () => setMessage('') }
      ]
    );
  };

  const renderFaqItem = (faq) => (
    <TouchableOpacity
      key={faq.id}
      style={styles.faqItem}
      onPress={() => toggleFaq(faq.id)}
      activeOpacity={0.7}
    >
      <View style={styles.faqHeader}>
        <View style={styles.faqQuestionContainer}>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(faq.category) }]}>
            <Icon name={getCategoryIcon(faq.category)} size={12} color="#FFFFFF" />
          </View>
          <Text style={styles.faqQuestion} numberOfLines={2}>{faq.question}</Text>
        </View>
        <Icon 
          name={expandedFaq === faq.id ? 'chevron-up' : 'chevron-down'} 
          size={20} 
          color="#666666" 
        />
      </View>
      
      {expandedFaq === faq.id && (
        <View style={styles.faqAnswer}>
          <Text style={styles.faqAnswerText}>{faq.answer}</Text>
          <TouchableOpacity 
            style={styles.helpfulButton}
            onPress={() => Alert.alert('Thank You', 'Your feedback helps us improve!')}
          >
            <Text style={styles.helpfulText}>Was this helpful?</Text>
            <View style={styles.helpfulIcons}>
              <Icon name="thumbs-up" size={16} color="#666666" />
              <Icon name="thumbs-down" size={16} color="#666666" />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  const getCategoryColor = (category) => {
    const colors = {
      booking: '#FF6B6B',
      payment: '#4ECDC4',
      delivery: '#FFD166',
      account: '#06D6A0',
      technical: '#118AB2',
    };
    return colors[category] || '#666666';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      booking: 'calendar',
      payment: 'card',
      delivery: 'bicycle',
      account: 'person',
      technical: 'settings',
    };
    return icons[category] || 'help';
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
        <Text style={styles.headerTitle}>Help Center</Text>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => navigation.navigate('ContactHistory')}
        >
          <Icon name="time" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Banner */}
        <View style={styles.welcomeBanner}>
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeTitle}>How can we help you?</Text>
            <Text style={styles.welcomeSubtitle}>
              Get answers to common questions or reach out to our support team
            </Text>
          </View>
          <View style={styles.welcomeIcon}>
            <Icon name="help-circle" size={60} color="#000000" />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Icon name="search" size={20} color="#666666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for help articles..."
              placeholderTextColor="#999999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Icon name="close-circle" size={20} color="#999999" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {supportCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  selectedCategory === category.id && styles.categoryItemActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <View style={[
                  styles.categoryIcon,
                  selectedCategory === category.id && styles.categoryIconActive
                ]}>
                  <Icon 
                    name={category.icon} 
                    size={20} 
                    color={selectedCategory === category.id ? '#000000' : '#666666'} 
                  />
                </View>
                <Text style={[
                  styles.categoryLabel,
                  selectedCategory === category.id && styles.categoryLabelActive
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Articles */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Articles</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.articlesGrid}>
            {popularArticles.map((article) => (
              <TouchableOpacity 
                key={article.id} 
                style={styles.articleCard}
                onPress={() => Alert.alert(article.title, 'Article content would appear here')}
              >
                <View style={styles.articleIcon}>
                  <Icon name={article.icon} size={24} color="#000000" />
                </View>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <View style={styles.articleStats}>
                  <Icon name="eye" size={14} color="#666666" />
                  <Text style={styles.articleViews}>{article.views} views</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Contact Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Contact</Text>
          <View style={styles.contactGrid}>
            {contactOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.contactCard}
                onPress={option.action}
                activeOpacity={0.7}
              >
                <View style={[styles.contactIcon, { backgroundColor: `${option.color}15` }]}>
                  <Icon name={option.icon} size={24} color={option.color} />
                </View>
                <Text style={styles.contactTitle}>{option.title}</Text>
                <Text style={styles.contactSubtitle}>{option.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            <Text style={styles.resultsCount}>
              {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'}
            </Text>
          </View>
          
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map(renderFaqItem)
          ) : (
            <View style={styles.emptyState}>
              <Icon name="search" size={48} color="#CCCCCC" />
              <Text style={styles.emptyTitle}>No results found</Text>
              <Text style={styles.emptyText}>
                Try different keywords or browse by category
              </Text>
            </View>
          )}
        </View>

        {/* Ask a Question */}
        <View style={styles.askSection}>
          <Text style={styles.sectionTitle}>Still have questions?</Text>
          <Text style={styles.askDescription}>
            Can't find what you're looking for? Ask our support team directly.
          </Text>
          
          <View style={styles.messageBox}>
            <TextInput
              style={styles.messageInput}
              placeholder="Type your question here..."
              placeholderTextColor="#999999"
              multiline
              numberOfLines={4}
              value={message}
              onChangeText={setMessage}
            />
            <View style={styles.messageFooter}>
              <Text style={styles.charCount}>{message.length}/500</Text>
              <TouchableOpacity 
                style={styles.submitButton}
                onPress={handleSubmitQuery}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
                <Icon name="send" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.responseInfo}>
            <Icon name="time" size={16} color="#666666" />
            <Text style={styles.responseText}>
              Average response time: 2 hours
            </Text>
          </View>
        </View>

        {/* Support Hours */}
        <View style={styles.supportHours}>
          <Icon name="time" size={20} color="#666666" />
          <View style={styles.hoursContent}>
            <Text style={styles.hoursTitle}>Support Hours</Text>
            <Text style={styles.hoursText}>
              Monday - Friday: 7:00 AM - 11:00 PM{"\n"}
              Saturday - Sunday: 8:00 AM - 10:00 PM
            </Text>
          </View>
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
  welcomeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FAFAFA',
    marginBottom: 16,
  },
  welcomeContent: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  welcomeIcon: {
    marginLeft: 16,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000000',
    fontWeight: '500',
    padding: 0,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
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
    color: '#000000',
  },
  seeAllText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '600',
  },
  resultsCount: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  categoriesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
  },
  categoryItemActive: {
    // Active state styles
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryIconActive: {
    backgroundColor: '#000000',
  },
  categoryLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    fontWeight: '500',
  },
  categoryLabelActive: {
    color: '#000000',
    fontWeight: '700',
  },
  articlesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  articleCard: {
    width: '48%',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  articleIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
    lineHeight: 18,
  },
  articleStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  articleViews: {
    fontSize: 11,
    color: '#666666',
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  contactCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    alignItems: 'center',
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
    textAlign: 'center',
  },
  contactSubtitle: {
    fontSize: 11,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 14,
  },
  faqItem: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryBadge: {
    width: 24,
    height: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faqQuestion: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
  },
  faqAnswer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 22,
    marginBottom: 16,
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  helpfulText: {
    fontSize: 13,
    color: '#666666',
  },
  helpfulIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  askSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FAFAFA',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  askDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
    lineHeight: 20,
  },
  messageBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    overflow: 'hidden',
  },
  messageInput: {
    minHeight: 100,
    padding: 16,
    fontSize: 14,
    color: '#000000',
    textAlignVertical: 'top',
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FAFAFA',
  },
  charCount: {
    fontSize: 12,
    color: '#666666',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  responseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    paddingLeft: 4,
  },
  responseText: {
    fontSize: 12,
    color: '#666666',
  },
  supportHours: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  hoursContent: {
    flex: 1,
  },
  hoursTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  hoursText: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 18,
  },
});

export default HelpCenterScreen;