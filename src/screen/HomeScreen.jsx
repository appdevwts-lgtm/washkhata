import React, { useRef, useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


const App = () => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const isLargeTablet = width >= 1024;

  // Responsive calculations
  const HORIZONTAL_PADDING = isTablet ? 32 : 20;
  const ITEM_SPACING = isTablet ? 24 : 16;
  const ITEM_WIDTH = isLargeTablet 
    ? width * 0.65 - HORIZONTAL_PADDING
    : isTablet 
    ? width * 0.75 - HORIZONTAL_PADDING
    : width - (HORIZONTAL_PADDING * 2) - ITEM_SPACING;
  const numColumns = isLargeTablet ? 4 : isTablet ? 3 : 2;

  const [activeSlide, setActiveSlide] = useState(0);
  const flatListRef = useRef(null);
  const autoPlayTimer = useRef(null);
  const scrolling = useRef(false);
  const navigation = useNavigation();

  const carouselData = [
    {
      id: '1',
      title: 'Mount Laundry',
      subtitle: 'Your clothes will reach you in 2 days!',
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400',
      gradient: ['rgba(99, 102, 241, 0.9)', 'rgba(168, 85, 247, 0.9)'],
    },
    {
      id: '2',
      title: 'Quick Service',
      subtitle: 'Fast and reliable laundry service',
      image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=400',
      gradient: ['rgba(236, 72, 153, 0.9)', 'rgba(239, 68, 68, 0.9)'],
    },
    {
      id: '3',
      title: 'Premium Care',
      subtitle: 'Your garments deserve the best',
      image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400',
      gradient: ['rgba(34, 197, 94, 0.9)', 'rgba(20, 184, 166, 0.9)'],
    },
  ];

  const topRatedData = [
    {
      id: '1',
      name: 'Washing',
      location: 'Resort Road',
      rating: '4.9',
      price: '₹99',
      icon: 'washing-machine',
      color: '#3B82F6',
      image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=300',
    },
    {
      id: '2',
      name: 'Drying',
      location: 'Gombly',
      rating: '4.8',
      price: '₹79',
      icon: 'tumble-dryer',
      color: '#EC4899',
      image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=300',
    },
    {
      id: '3',
      name: 'Ironing',
      location: 'Downtown',
      rating: '4.7',
      price: '₹89',
      icon: 'iron',
      color: '#F59E0B',
      image: 'https://cdn.pixabay.com/photo/2021/02/02/12/41/iron-5973861_1280.jpg',
    },
    {
      id: '4',
      name: 'Starching',
      location: 'Uptown',
      rating: '4.9',
      price: '₹69',
      icon: 'spray',
      color: '#8B5CF6',
      image: 'https://img.freepik.com/free-photo/front-view-young-male-holding-iron-with-confused-expression-pink_140725-154252.jpg',
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    startAutoPlay();
    return () => {
      stopAutoPlay();
    };
  }, []);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayTimer.current = setInterval(() => {
      if (!scrolling.current) {
        goToNextSlide();
      }
    }, 3000);
  };

  const stopAutoPlay = () => {
    if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
      autoPlayTimer.current = null;
    }
  };

  const goToNextSlide = () => {
    setActiveSlide(prevSlide => {
      const nextSlide = (prevSlide + 1) % carouselData.length;
      
      flatListRef.current?.scrollToIndex({
        index: nextSlide,
        animated: true,
        viewPosition: 0.5, // Center the item
      });

      return nextSlide;
    });
  };

  const onScrollBeginDrag = () => {
    scrolling.current = true;
    stopAutoPlay();
  };

  const onScrollEndDrag = () => {
    scrolling.current = false;
  };

  const onMomentumScrollBegin = () => {
    scrolling.current = true;
  };

  const onMomentumScrollEnd = event => {
    scrolling.current = false;
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const viewportWidth = event.nativeEvent.layoutMeasurement.width;
    
    // Calculate which item is closest to center
    const centerX = contentOffsetX + (viewportWidth / 2);
    const index = Math.round((centerX - HORIZONTAL_PADDING) / (ITEM_WIDTH + ITEM_SPACING));
    
    const clampedIndex = Math.max(0, Math.min(index, carouselData.length - 1));
    
    setActiveSlide(clampedIndex);
    startAutoPlay();
  };

  const getItemLayout = (data, index) => ({
    length: ITEM_WIDTH + ITEM_SPACING,
    offset: (ITEM_WIDTH + ITEM_SPACING) * index,
    index,
  });

  const renderCarouselItem = ({ item }) => (
    <View style={[
      styles.carouselItemWrapper,
      { width: ITEM_WIDTH + ITEM_SPACING, paddingRight: ITEM_SPACING }
    ]}>
      <View style={[
        styles.carouselItem,
        isTablet && styles.carouselItemTablet,
      ]}>
        <Image source={{ uri: item.image }} style={styles.carouselImage} />
        <View style={[styles.gradientOverlay, { backgroundColor: item.gradient[0] }]} />
        <View style={[styles.carouselTextContainer, isTablet && styles.carouselTextContainerTablet]}>
          <View style={[styles.offerBadge, isTablet && styles.offerBadgeTablet]}>
            <Icon name="tag" size={isTablet ? 16 : 14} color="#fff" style={{ marginRight: 4 }} />
            <Text style={[styles.offerText, isTablet && styles.offerTextTablet]}>50% OFF</Text>
          </View>
          <Text style={[styles.carouselTitle, isTablet && styles.carouselTitleTablet]}>
            {item.title}
          </Text>
          <Text style={[styles.carouselSubtitle, isTablet && styles.carouselSubtitleTablet]}>
            {item.subtitle}
          </Text>
          <TouchableOpacity style={[styles.bookButton, isTablet && styles.bookButtonTablet]}>
            <Text style={[styles.bookButtonText, isTablet && styles.bookButtonTextTablet]}>
              Book Now
            </Text>
            <Feather
              name="arrow-right"
              size={isTablet ? 18 : 16}
              color="#111827"
              style={{ marginLeft: 6 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderTopRatedItem = ({ item }) => {
    const cardWidth = isLargeTablet 
      ? (width - 80) / 4 - 16
      : isTablet 
      ? (width - 64) / 3 - 16 
      : (width / 2) - 18;

    return (
      <TouchableOpacity 
        style={[
          styles.topRatedCard,
          { width: cardWidth },
          isTablet && styles.topRatedCardTablet,
        ]} 
        activeOpacity={0.7}
      >
        <View style={styles.cardImageContainer}>
          <Image 
            source={{ uri: item.image }} 
            style={[
              styles.topRatedImage,
              isTablet && styles.topRatedImageTablet,
            ]} 
          />
          <View style={[
            styles.iconBadge, 
            { backgroundColor: item.color },
            isTablet && styles.iconBadgeTablet,
          ]}>
            <Icon name={item.icon} size={isTablet ? 26 : 22} color="#fff" />
          </View>
        </View>
        <View style={[styles.topRatedInfo, isTablet && styles.topRatedInfoTablet]}>
          <Text style={[styles.topRatedName, isTablet && styles.topRatedNameTablet]}>
            {item.name}
          </Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={isTablet ? 16 : 14} color="#6B7280" />
            <Text style={[styles.topRatedLocation, isTablet && styles.topRatedLocationTablet]}>
              {item.location}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Header */}
      <View style={[styles.header, isTablet && styles.headerTablet]}>
      <View style={[{flex:1,flexDirection:"row", justifyContent:"space-between"},isTablet && styles.headerContent]}>
          <View>
            <TouchableOpacity style={[styles.locationBadge, isTablet && styles.locationBadgeTablet]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}><Ionicons
                name="location"
                size={isTablet ? 18 : 16}
                color="#111827"
                style={{ marginRight: 4 }}
              />
              <Text style={[styles.locationText, isTablet && styles.locationTextTablet]}>
                Ghaziabad, UP
              </Text>
              </View>
              <Ionicons
                name="chevron-down"
                size={isTablet ? 16 : 14}
                color="#6B7280"
                style={{ marginLeft: 4 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={[styles.notificationButton, isTablet && styles.notificationButtonTablet]} onPress={()=>navigation.navigate('Notifications')}>
              <Ionicons name="notifications-outline" size={isTablet ? 26 : 22} color="#374151" />
              <View style={[styles.notificationDot, isTablet && styles.notificationDotTablet]} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Carousel */}
        <View style={[styles.carouselContainer, isTablet && styles.carouselContainerTablet]}>
          <FlatList
            ref={flatListRef}
            data={carouselData}
            renderItem={renderCarouselItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_WIDTH + ITEM_SPACING}
            snapToAlignment="center"
            decelerationRate="fast"
            contentContainerStyle={[
              styles.carouselListContent,
              { paddingHorizontal: HORIZONTAL_PADDING }
            ]}
            onScrollBeginDrag={onScrollBeginDrag}
            onScrollEndDrag={onScrollEndDrag}
            onMomentumScrollBegin={onMomentumScrollBegin}
            onMomentumScrollEnd={onMomentumScrollEnd}
            getItemLayout={getItemLayout}
            removeClippedSubviews={false}
            scrollEventThrottle={16}
            initialScrollIndex={0}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50
            }}
          />
          <View style={[styles.pagination, isTablet && styles.paginationTablet]}>
            {carouselData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  isTablet && styles.paginationDotTablet,
                  activeSlide === index && styles.paginationDotActive,
                  activeSlide === index && isTablet && styles.paginationDotActiveTablet,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Top Rated Services */}
        <View style={[styles.section, isTablet && styles.sectionTablet]}>
          <View style={[styles.sectionHeader, isTablet && styles.sectionHeaderTablet]}>
            <View>
              <Text style={[styles.sectionTitle, isTablet && styles.sectionTitleTablet]}>
                Our Services
              </Text>
              <Text style={[styles.sectionSubtitle, isTablet && styles.sectionSubtitleTablet]}>
                Choose what you need
              </Text>
            </View>
            {/* <TouchableOpacity style={[styles.seeAllButton, isTablet && styles.seeAllButtonTablet]} onPress={() => navigation.navigate('Services')}>
             <MaterialIcons name="schedule" size={24} color="black" />
              {/* <Text style={[styles.seeAllButtonText, isTablet && styles.seeAllButtonTextTablet]}>See All</Text> */}
            {/* </TouchableOpacity> */} 
          </View>
          <FlatList
            data={topRatedData}
            renderItem={renderTopRatedItem}
            keyExtractor={item => item.id}
            key={numColumns} // Force re-render when columns change
            numColumns={numColumns}
            scrollEnabled={false}
            columnWrapperStyle={[
              styles.topRatedColumnWrapper,
              isTablet && styles.topRatedColumnWrapperTablet,
            ]}
            contentContainerStyle={[
              styles.topRatedListContent,
              isTablet && styles.topRatedListContentTablet,
            ]}
          />
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: isTablet ? 40 : 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomColor: '#d1d1d1ff',
    borderBottomWidth: 1,
  },
  headerTablet: {
    paddingHorizontal: 32,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    maxWidth: 1400,
    marginHorizontal: 'auto',
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    
  },
  locationBadgeTablet: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
  },
  locationText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
  locationTextTablet: {
    fontSize: 16,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationButtonTablet: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: '#fff',
  },
  notificationDotTablet: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  content: {
    flex: 1,
  },
  carouselContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  carouselContainerTablet: {
    marginTop: 20,
    marginBottom: 32,
  },
  carouselListContent: {
    alignItems: 'center',
  },
  carouselItemWrapper: {
    justifyContent: 'center',
  },
  carouselItem: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
  },
  carouselItemTablet: {
    height: 280,
    borderRadius: 24,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradientOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  carouselTextContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  carouselTextContainerTablet: {
    padding: 28,
  },
  offerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FBBF24',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  offerBadgeTablet: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
  },
  offerText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  offerTextTablet: {
    fontSize: 14,
  },
  carouselTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 4,
  },
  carouselTitleTablet: {
    fontSize: 36,
    marginBottom: 6,
  },
  carouselSubtitle: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 12,
    opacity: 0.95,
  },
  carouselSubtitleTablet: {
    fontSize: 18,
    marginBottom: 16,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  bookButtonTablet: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 30,
  },
  bookButtonText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '700',
  },
  bookButtonTextTablet: {
    fontSize: 16,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  paginationTablet: {
    marginTop: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  paginationDotTablet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  paginationDotActive: {
    backgroundColor: '#6366F1',
    width: 24,
  },
  paginationDotActiveTablet: {
    width: 32,
  },
  section: {
    marginTop: 10,
    paddingBottom: 20,
  },
  sectionTablet: {
    marginTop: 0,
    paddingBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionHeaderTablet: {
    paddingHorizontal: 32,
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#111827',
    fontSize: 22,
    fontWeight: '800',
  },
  sectionTitleTablet: {
    fontSize: 28,
  },
  sectionSubtitle: {
    color: '#6B7280',
    fontSize: 13,
    marginTop: 2,
  },
  sectionSubtitleTablet: {
    fontSize: 15,
    marginTop: 4,
  },
  topRatedCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  topRatedCardTablet: {
    borderRadius: 16,
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  cardImageContainer: {
    position: 'relative',
  },
  topRatedImage: {
    width: '100%',
    height: 140,
  },
  topRatedImageTablet: {
    height: 180,
  },
  iconBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  iconBadgeTablet: {
    top: 16,
    left: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  topRatedInfo: {
    padding: 14,
  },
  topRatedInfoTablet: {
    padding: 18,
  },
  topRatedName: {
    color: '#111827',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  topRatedNameTablet: {
    fontSize: 20,
    marginBottom: 6,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  topRatedLocation: {
    color: '#6B7280',
    fontSize: 12,
    marginLeft: 2,
  },
  topRatedLocationTablet: {
    fontSize: 14,
    marginLeft: 4,
  },
  topRatedListContent: {
    paddingHorizontal: 12,
  },
  topRatedListContentTablet: {
    paddingHorizontal: 24,
  },
  topRatedColumnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  topRatedColumnWrapperTablet: {
    marginBottom: 20,
  },
});

export default App;