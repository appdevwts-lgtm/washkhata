import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SchedulePickupScreen() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTimeSlots, setFilteredTimeSlots] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  // Get system fonts that look clean like Zomato
  const getFontFamily = (weight = 'normal') => {
    if (Platform.OS === 'ios') {
      switch(weight) {
        case 'light': return 'Helvetica Neue';
        case 'normal': return 'Helvetica Neue';
        case 'medium': return 'HelveticaNeue-Medium';
        case 'semibold': return 'HelveticaNeue-Medium';
        case 'bold': return 'HelveticaNeue-Bold';
        default: return 'Helvetica Neue';
      }
    } else {
      switch(weight) {
        case 'light': return 'sans-serif-light';
        case 'normal': return 'sans-serif';
        case 'medium': return 'sans-serif-medium';
        case 'semibold': return 'sans-serif-medium';
        case 'bold': return 'sans-serif-bold';
        default: return 'sans-serif';
      }
    }
  };

  // Generate dates for next 2 months
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let monthOffset = 0; monthOffset < 2; monthOffset++) {
      const year = today.getFullYear();
      const month = today.getMonth() + monthOffset;
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const startDay = monthOffset === 0 ? today.getDate() : 1;

      for (let day = startDay; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        dates.push({
          id: `${year}-${month}-${day}`,
          date: day,
          month: date.toLocaleDateString('en-US', { month: 'short' }),
          monthFull: date.toLocaleDateString('en-US', { month: 'long' }),
          year: year,
          dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
          fullDate: date,
          monthIndex: monthOffset,
          isToday: day === today.getDate() && month === today.getMonth(),
        });
      }
    }
    
    return dates;
  };

  const timeSlots = [
    { id: 1, time: '08:00 AM', available: true, period: 'morning' },
    { id: 2, time: '09:00 AM', available: true, period: 'morning' },
    { id: 3, time: '10:00 AM', available: true, period: 'morning' },
    { id: 4, time: '11:00 AM', available: false, period: 'morning' },
    { id: 5, time: '12:00 PM', available: true, period: 'afternoon' },
    { id: 6, time: '01:00 PM', available: true, period: 'afternoon' },
    { id: 7, time: '02:00 PM', available: true, period: 'afternoon' },
    { id: 8, time: '03:00 PM', available: false, period: 'afternoon' },
    { id: 9, time: '04:00 PM', available: true, period: 'evening' },
    { id: 10, time: '05:00 PM', available: true, period: 'evening' },
    { id: 11, time: '06:00 PM', available: true, period: 'evening' },
    { id: 12, time: '07:00 PM', available: true, period: 'evening' },
  ];

  // Initialize with all time slots
  useEffect(() => {
    setFilteredTimeSlots(timeSlots);
  }, []);

  // Filter time slots based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTimeSlots(timeSlots);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = timeSlots.filter(slot => 
        slot.time.toLowerCase().includes(query) ||
        slot.period.toLowerCase().includes(query) ||
        (query.includes('available') && slot.available) ||
        (query.includes('booked') && !slot.available) ||
        (query.includes('am') && slot.time.includes('AM')) ||
        (query.includes('pm') && slot.time.includes('PM'))
      );
      setFilteredTimeSlots(filtered);
    }
  }, [searchQuery]);

  const dates = generateDates();
  const filteredDates = dates.filter(d => d.monthIndex === currentMonth);
  const currentMonthName = filteredDates[0]?.monthFull || '';
  const currentYear = filteredDates[0]?.year || '';

  const handleSchedule = () => {
    if (selectedDate && selectedTime) {
      alert(`Pickup scheduled for ${selectedDate.dayName}, ${selectedDate.month} ${selectedDate.date} at ${selectedTime.time}`);
    }
  };

  const handleSearchClear = () => {
    setSearchQuery('');
    setShowSearch(false);
  };

  const getTimePeriodColor = (period) => {
    switch(period) {
      case 'morning': return '#FFD166';
      case 'afternoon': return '#06D6A0';
      case 'evening': return '#118AB2';
      default: return '#666666';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} activeOpacity={0.7}>
          <Icon name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        
        {showSearch ? (
          <View style={styles.searchContainer}>
            <View style={styles.searchBox}>
              <Icon name="search-outline" size={20} color="#666666" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search time slots..."
                placeholderTextColor="#999999"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus={true}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={handleSearchClear}>
                  <Icon name="close-circle" size={20} color="#999999" />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity onPress={() => setShowSearch(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.headerTitle}>Schedule Pickup</Text>
            <TouchableOpacity 
              style={styles.searchBtn}
              onPress={() => setShowSearch(true)}
              activeOpacity={0.7}
            >
              <Icon name="search" size={22} color="#000000" />
            </TouchableOpacity>
          </>
        )}
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Month Selector */}
        <View style={styles.monthSelector}>
          <TouchableOpacity 
            style={[styles.monthBtn, currentMonth === 0 && styles.monthBtnActive]}
            onPress={() => setCurrentMonth(0)}
            activeOpacity={0.7}
          >
            <Text style={[styles.monthBtnText, currentMonth === 0 && styles.monthBtnTextActive]}>
              This Month
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.monthBtn, currentMonth === 1 && styles.monthBtnActive]}
            onPress={() => setCurrentMonth(1)}
            activeOpacity={0.7}
          >
            <Text style={[styles.monthBtnText, currentMonth === 1 && styles.monthBtnTextActive]}>
              Next Month
            </Text>
          </TouchableOpacity>
        </View>

        {/* Current Month & Year */}
        <View style={styles.monthHeader}>
          <Icon name="calendar-outline" size={20} color="#000000" />
          <Text style={styles.monthTitle}>{currentMonthName} {currentYear}</Text>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {paddingLeft:20, paddingBottom:5 }]}>Select Date</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateScrollContent}
          >
            {filteredDates.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.dateCard,
                  selectedDate?.id === item.id && styles.dateCardActive,
                  item.isToday && styles.dateCardToday,
                ]}
                onPress={() => setSelectedDate(item)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.dayName,
                  selectedDate?.id === item.id && styles.dayNameActive,
                ]}>
                  {item.dayName}
                </Text>
                <Text style={[
                  styles.dateNumber,
                  selectedDate?.id === item.id && styles.dateNumberActive,
                ]}>
                  {item.date}
                </Text>
                <Text style={[
                  styles.monthName,
                  selectedDate?.id === item.id && styles.monthNameActive,
                ]}>
                  {item.month}
                </Text>
                {item.isToday && (
                  <View style={styles.todayDot} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Selected Date Info */}
        {selectedDate && (
          <View style={styles.selectedInfo}>
            <Icon name="checkmark-circle" size={20} color="#000000" />
            <Text style={styles.selectedText}>
              {selectedDate.dayName}, {selectedDate.month} {selectedDate.date}, {selectedDate.year}
            </Text>
          </View>
        )}

        {/* Search Results Info */}
        {searchQuery.length > 0 && (
          <View style={styles.searchResultsInfo}>
            <Text style={styles.searchResultsText}>
              {filteredTimeSlots.length} {filteredTimeSlots.length === 1 ? 'slot' : 'slots'} found
            </Text>
            <TouchableOpacity onPress={handleSearchClear}>
              <Text style={styles.clearSearchText}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Time Period Filter */}
        {!showSearch && searchQuery.length === 0 && (
          <View style={styles.periodFilter}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity 
                style={styles.periodBtn}
                onPress={() => setFilteredTimeSlots(timeSlots.filter(s => s.available))}
              >
                <Icon name="checkmark-circle" size={16} color="#000000" />
                <Text style={styles.periodText}>Available</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.periodBtn}
                onPress={() => setFilteredTimeSlots(timeSlots.filter(s => s.period === 'morning'))}
              >
                <Icon name="sunny" size={16} color="#FFD166" />
                <Text style={styles.periodText}>Morning</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.periodBtn}
                onPress={() => setFilteredTimeSlots(timeSlots.filter(s => s.period === 'afternoon'))}
              >
                <Icon name="partly-sunny" size={16} color="#06D6A0" />
                <Text style={styles.periodText}>Afternoon</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.periodBtn}
                onPress={() => setFilteredTimeSlots(timeSlots.filter(s => s.period === 'evening'))}
              >
                <Icon name="moon" size={16} color="#118AB2" />
                <Text style={styles.periodText}>Evening</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}

        {/* Time Selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Select Time</Text>
            {!showSearch && searchQuery.length === 0 && (
              <TouchableOpacity 
                style={styles.resetBtn}
                onPress={() => setFilteredTimeSlots(timeSlots)}
              >
                <Text style={styles.resetText}>Show All</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Time Grid */}
          <View style={styles.timeGrid}>
            {filteredTimeSlots.length > 0 ? (
              filteredTimeSlots.map((slot) => (
                <TouchableOpacity
                  key={slot.id}
                  style={[
                    styles.timeCard,
                    !slot.available && styles.timeCardDisabled,
                    selectedTime?.id === slot.id && styles.timeCardActive,
                  ]}
                  onPress={() => slot.available && setSelectedTime(slot)}
                  activeOpacity={0.7}
                  disabled={!slot.available}
                >
                  {/* Time Period Indicator */}
                  <View style={[styles.timeIndicator, { 
                    backgroundColor: getTimePeriodColor(slot.period) 
                  }]} />
                  
                  <Icon 
                    name={slot.available ? "time-outline" : "close-circle"} 
                    size={18} 
                    color={
                      selectedTime?.id === slot.id 
                        ? "#FFFFFF" 
                        : slot.available 
                          ? "#000000" 
                          : "#CCCCCC"
                    } 
                  />
                  
                  <Text style={[
                    styles.timeText,
                    !slot.available && styles.timeTextDisabled,
                    selectedTime?.id === slot.id && styles.timeTextActive,
                  ]}>
                    {slot.time}
                  </Text>
                  
                  {!slot.available && (
                    <Text style={styles.unavailableText}>Booked</Text>
                  )}
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.noResults}>
                <Icon name="search" size={40} color="#CCCCCC" />
                <Text style={styles.noResultsText}>No time slots found</Text>
                <Text style={styles.noResultsSubtext}>Try different search terms</Text>
                <TouchableOpacity 
                  style={styles.showAllBtn}
                  onPress={() => {
                    setSearchQuery('');
                    setFilteredTimeSlots(timeSlots);
                  }}
                >
                  <Text style={styles.showAllText}>Show All Slots</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Icon name="information-circle" size={20} color="#000000" />
            <Text style={styles.infoTitle}>Pickup Information</Text>
          </View>
          <Text style={styles.infoText}>
            • Service hours: 8 AM to 7 PM{"\n"}
            • Ensure someone is available at scheduled time{"\n"}
            • Free rescheduling up to 2 hours before pickup
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryLabel}>Pickup Schedule</Text>
          <Text style={styles.summaryValue}>
            {selectedDate && selectedTime 
              ? `${selectedDate.month} ${selectedDate.date} at ${selectedTime.time}`
              : 'Select date & time'
            }
          </Text>
        </View>
        <TouchableOpacity 
          style={[
            styles.scheduleBtn,
            (!selectedDate || !selectedTime) && styles.scheduleBtnDisabled
          ]}
          onPress={handleSchedule}
          activeOpacity={0.7}
          disabled={!selectedDate || !selectedTime}
        >
          <Text style={styles.scheduleBtnText}>
            {!selectedDate || !selectedTime ? 'Select Time First' : 'Confirm Schedule'}
          </Text>
          {(selectedDate && selectedTime) && (
            <Icon name="checkmark-circle" size={20} color="#FFFFFF" />
          )}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backBtn: {
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
  searchBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 44,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000000',
    fontWeight: '500',
    padding: 0,
  },
  cancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    paddingHorizontal: 8,
  },
  content: {
    flex: 1,
  },
  monthSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    gap: 12,
  },
  monthBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    alignItems: 'center',
  },
  monthBtnActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  monthBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  monthBtnTextActive: {
    color: '#FFFFFF',
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  section: {
    paddingTop: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  resetBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  resetText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
  },
  dateScrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  dateCard: {
    width: 70,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    position: 'relative',
  },
  dateCardActive: {
    backgroundColor: '#000000ff',
    borderColor: '#000000ff',
  },
  dateCardToday: {
    borderColor: '#666666bb',
  },
  dayName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  dayNameActive: {
    color: '#FFFFFF',
  },
  dateNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  dateNumberActive: {
    color: '#FFFFFF',
  },
  monthName: {
    fontSize: 11,
    fontWeight: '500',
    color: '#999999',
  },
  monthNameActive: {
    color: '#CCCCCC',
  },
  todayDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000000',
  },
  selectedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 20,
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },
  selectedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  searchResultsInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  searchResultsText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  clearSearchText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  periodFilter: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  periodBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 12,
  },
  periodText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000000',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  timeCard: {
    width: '30%',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    gap: 6,
    position: 'relative',
    overflow: 'hidden',
    borderTopWidth: 0,
  },
  timeCardActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  timeCardDisabled: {
    backgroundColor: '#FAFAFA',
    borderColor: '#F0F0F0',
  },
  timeIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
  },
  timeTextActive: {
    color: '#FFFFFF',
  },
  timeTextDisabled: {
    color: '#CCCCCC',
  },
  unavailableText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#999999',
    textTransform: 'uppercase',
  },
  noResults: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 16,
  },
  showAllBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#000000',
    borderRadius: 8,
  },
  showAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  infoCard: {
    backgroundColor: '#F5F5F5',
    marginHorizontal: 20,
    marginTop: 24,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 205,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
  infoText: {
    fontSize: 13,
    color: '#333333',
    lineHeight: 20,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
    paddingBottom: 90,
  },
  summaryContainer: {
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  scheduleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#000000',
  },
  scheduleBtnDisabled: {
    backgroundColor: '#E5E5E5',
  },
  scheduleBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});