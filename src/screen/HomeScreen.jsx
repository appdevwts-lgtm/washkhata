import React, { useRef, useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  FlatList,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width - 40;
const ITEM_SPACING = 15;

const App = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const flatListRef = useRef(null);
  const autoPlayTimer = useRef(null);
  const scrolling = useRef(false);

  const carouselData = [
    {
      id: '1',
      title: 'Mount Laundry',
      subtitle: 'Your clothes will reach you in 2 days!',
      image:
        'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400',
      gradient: ['rgba(99, 102, 241, 0.9)', 'rgba(168, 85, 247, 0.9)'],
    },
    {
      id: '2',
      title: 'Quick Service',
      subtitle: 'Fast and reliable laundry service',
      image:
        'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=400',
      gradient: ['rgba(236, 72, 153, 0.9)', 'rgba(239, 68, 68, 0.9)'],
    },
    {
      id: '3',
      title: 'Premium Care',
      subtitle: 'Your garments deserve the best',
      image:
        'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400',
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
      image:
        'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=300',
    },
    {
      id: '2',
      name: 'Drying',
      location: 'Gombly',
      rating: '4.8',
      price: '₹79',
      icon: 'tumble-dryer',
      color: '#EC4899',
      image:
        'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=300',
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
      image:
        'https://images.unsplash.com/photo-1521656693072-a8333fd5d533?w=300',
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

      const offset = nextSlide * (ITEM_WIDTH + ITEM_SPACING);

      flatListRef.current?.scrollToOffset({
        offset: offset,
        animated: true,
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
    const index = Math.round(contentOffsetX / (ITEM_WIDTH + ITEM_SPACING));

    setActiveSlide(index);
    startAutoPlay();
  };

  const getItemLayout = (data, index) => ({
    length: ITEM_WIDTH + ITEM_SPACING,
    offset: (ITEM_WIDTH + ITEM_SPACING) * index,
    index,
  });

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item.image }} style={styles.carouselImage} />
      <View
        style={[styles.gradientOverlay, { backgroundColor: item.gradient[0] }]}
      />
      <View style={styles.carouselTextContainer}>
        <View style={styles.offerBadge}>
          <Icon name="tag" size={14} color="#fff" style={{ marginRight: 4 }} />
          <Text style={styles.offerText}>50% OFF</Text>
        </View>
        <Text style={styles.carouselTitle}>{item.title}</Text>
        <Text style={styles.carouselSubtitle}>{item.subtitle}</Text>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
          <Feather
            name="arrow-right"
            size={16}
            color="#111827"
            style={{ marginLeft: 6 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTopRatedItem = ({ item }) => (
    <TouchableOpacity style={styles.topRatedCard} activeOpacity={0.7}>
      <View style={styles.cardImageContainer}>
        <Image source={{ uri: item.image }} style={styles.topRatedImage} />
        <View style={[styles.iconBadge, { backgroundColor: item.color }]}>
          <Icon name={item.icon} size={22} color="#fff" />
        </View>
        {/* <View style={styles.ratingBadge}>
          <Ionicons
            name="star"
            size={12}
            color="#FBBF24"
            style={{ marginRight: 2 }}
          />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View> */}
      </View>
      <View style={styles.topRatedInfo}>
        <Text style={styles.topRatedName}>{item.name}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={14} color="#6B7280" />
          <Text style={styles.topRatedLocation}>{item.location}</Text>
        </View>
        {/* <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{item.price}</Text>
          <Text style={styles.perItemText}>/item</Text>
        </View> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#fff' barStyle='dark-content'/>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <TouchableOpacity style={styles.locationBadge}>
            <Ionicons
              name="location"
              size={16}
              color="#111827"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.locationText}>Ghaziabad, UP</Text>
            <Ionicons
              name="chevron-down"
              size={14}
              color="#6B7280"
              style={{ marginLeft: 4 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={22} color="#374151" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person" size={20} color="#fff" />
          </TouchableOpacity> */}
        </View>
      </View>

      {/* Search Bar */}
      {/* <View style={styles.searchContainer}>
        <Feather
          name="search"
          size={20}
          color="#9CA3AF"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.searchPlaceholder}>Search for services...</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View> */}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Carousel */}
        <View style={styles.carouselContainer}>
          <FlatList
            ref={flatListRef}
            data={carouselData}
            renderItem={renderCarouselItem}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_WIDTH + ITEM_SPACING}
            snapToAlignment="start"
            decelerationRate="fast"
            contentContainerStyle={styles.carouselListContent}
            onScrollBeginDrag={onScrollBeginDrag}
            onScrollEndDrag={onScrollEndDrag}
            onMomentumScrollBegin={onMomentumScrollBegin}
            onMomentumScrollEnd={onMomentumScrollEnd}
            getItemLayout={getItemLayout}
            removeClippedSubviews={false}
            scrollEventThrottle={16}
          />
          <View style={styles.pagination}>
            {carouselData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  activeSlide === index && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Top Rated */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Our Services</Text>
              <Text style={styles.sectionSubtitle}>Choose what you need</Text>
            </View>
            {/* <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>View All</Text>
              <Feather
                name="arrow-right"
                size={14}
                color="#6366F1"
                style={{ marginLeft: 4 }}
              />
            </TouchableOpacity> */}
          </View>
          <FlatList
            data={topRatedData}
            renderItem={renderTopRatedItem}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.topRatedColumnWrapper}
            contentContainerStyle={styles.topRatedListContent}
          />
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomColor:'#d1d1d1ff',
    borderBottomWidth:1,
  
  },
  greetingText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  locationText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
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
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 15,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchPlaceholder: {
    flex: 1,
    color: '#9CA3AF',
    fontSize: 15,
  },
  filterButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  carouselContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  carouselListContent: {
    paddingHorizontal: 20,
  },
  carouselItem: {
    width: ITEM_WIDTH,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: ITEM_SPACING,
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
  offerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FBBF24',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  offerText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  carouselTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 4,
  },
  carouselSubtitle: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 12,
    opacity: 0.95,
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
  bookButtonText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '700',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#6366F1',
    width: 24,
  },
  section: {
    marginTop: 10,
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#111827',
    fontSize: 22,
    fontWeight: '800',
  },
  sectionSubtitle: {
    color: '#6B7280',
    fontSize: 13,
    marginTop: 2,
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewMoreText: {
    color: '#6366F1',
    fontSize: 13,
    fontWeight: '600',
  },
  topRatedCard: {
    width: (width / 2)-18,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardImageContainer: {
    position: 'relative',
  },
  topRatedImage: {
    width: '100%',
    height: 140,
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
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    backdropFilter: 'blur(10px)',
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  topRatedInfo: {
    padding: 14,
  },
  topRatedName: {
    color: '#111827',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
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
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceText: {
    color: '#6366F1',
    fontSize: 18,
    fontWeight: '800',
  },
  perItemText: {
    color: '#9CA3AF',
    fontSize: 12,
    marginLeft: 2,
  },
  topRatedListContent: {
    paddingHorizontal: 12,
  },
  topRatedColumnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default App;
