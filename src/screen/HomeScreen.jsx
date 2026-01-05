import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  FlatList,
} from 'react-native';

const { width } = Dimensions.get('window');

const App = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const flatListRef = useRef(null);

  const carouselData = [
    {
      id: '1',
      title: 'Mount Laundry',
      subtitle: 'Your clothes will reach you in 2 days!',
      image:
        'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400',
    },
    {
      id: '2',
      title: 'Quick Service',
      subtitle: 'Fast and reliable laundry service',
      image:
        'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=400',
    },
    {
      id: '3',
      title: 'Premium Care',
      subtitle: 'Your garments deserve the best',
      image:
        'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400',
    },
  ];

  const topRatedData = [
    {
      id: '1',
      name: 'Washing',
      location: 'Resort Road',
      rating: '4.9',
      image:
        'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=300',
    },
    {
      id: '2',
      name: 'Drying',
      location: 'Gombly',
      rating: '4.8',
      image:
        'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=300',
    },
    {
      id: '3',
      name: 'Ironing',
      location: 'Downtown',
      rating: '4.7',
      image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb8f?w=300',
    },
    {
      id: '4',
      name: 'Starching',
      location: 'Uptown',
      rating: '4.9',
      image:
        'https://images.unsplash.com/photo-1521656693072-a8333fd5d533?w=300',
    },
  ];

  const dealsData = [
    {
      id: '1',
      title: 'Welcome offer!',
      subtitle: 'Get 50% off on your first order',
    },
    {
      id: '2',
      title: 'Weekend Special',
      subtitle: 'Extra 20% off on weekends',
    },
  ];

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveSlide(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item.image }} style={styles.carouselImage} />
      <View style={styles.carouselTextContainer}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=100',
          }}
          style={styles.carouselIcon}
        />
        <Text style={styles.carouselTitle}>{item.title}</Text>
        <Text style={styles.carouselSubtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );

  const renderTopRatedItem = ({ item }) => (
    <View style={styles.topRatedCard}>
      <Image source={{ uri: item.image }} style={styles.topRatedImage} />
      <View style={styles.topRatedInfo}>
        <Text style={styles.topRatedName}>{item.name}</Text>
        <Text style={styles.topRatedLocation}>📍 {item.location}</Text>
      </View>
      {/* <View style={styles.ratingBadge}>
        <Text style={styles.ratingText}>⭐ {item.rating}</Text>
      </View> */}
    </View>
  );

  const renderDealItem = ({ item }) => (
    <View style={styles.dealCard}>
      <Text style={styles.dealTitle}>{item.title}</Text>
      <Text style={styles.dealSubtitle}>{item.subtitle}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.channelBadge}>
          <Text style={styles.channelText}> Location</Text>
        </View>
        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpText}>?</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <Text style={styles.searchPlaceholder}>Search</Text>
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
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            snapToInterval={width - 40}
            snapToAlignment="center"
            decelerationRate="fast"
            contentContainerStyle={styles.carouselListContent}
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
            <Text style={styles.sectionTitle}>Sevices</Text>
            {/* <TouchableOpacity>
              <Text style={styles.viewMore}>View more</Text>
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

        {/* Deals and Offers */}
        {/* <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Deals and offers</Text>
            <TouchableOpacity>
              <Text style={styles.viewMore}>View more</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={dealsData}
            renderItem={renderDealItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  channelBadge: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  channelText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  helpButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  helpText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchPlaceholder: {
    color: '#666',
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  carouselContainer: {
    marginVertical: 20,
  },
  carouselListContent: {
    paddingHorizontal: 20,
  },
  carouselItem: {
    width: width - 40,
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 15,
    backgroundColor: '#1a1a1a',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.3,
  },
  carouselTextContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  carouselIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
  },
  carouselTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  carouselSubtitle: {
    color: '#ccc',
    fontSize: 14,
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
    backgroundColor: '#333',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#fff',
    width: 20,
  },
  section: {
    marginTop: 20,
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewMore: {
    color: '#666',
    fontSize: 14,
  },
  horizontalList: {
    paddingHorizontal: 20,
  },
  topRatedCard: {
    width: (width - 55) / 2, // (width - 40 (padding) - 15 (gap)) / 2
    backgroundColor: '#1a1a1a',
    borderRadius: 15, // Increased border radius for better look
    overflow: 'hidden',
    // marginRight is removed as space-between handles it
  },
  topRatedImage: {
    width: '100%',
    height: 120,
  },
  topRatedInfo: {
    padding: 12,
  },
  topRatedName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  topRatedLocation: {
    color: '#666',
    fontSize: 12,
  },
  ratingBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dealCard: {
    width: 200,
    height: 100,
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    justifyContent: 'center',
  },
  dealTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dealSubtitle: {
    color: '#666',
    fontSize: 12,
  },
  topRatedListContent: {
    paddingHorizontal: 20,
  },
  topRatedColumnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});

export default App;
