import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SchedulePickupScreen() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(0); // 0 = current month, 1 = next month

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
    { id: 1, time: '08:00 AM', available: true },
    { id: 2, time: '09:00 AM', available: true },
    { id: 3, time: '10:00 AM', available: true },
    { id: 4, time: '11:00 AM', available: false },
    { id: 5, time: '12:00 PM', available: true },
    { id: 6, time: '01:00 PM', available: true },
    { id: 7, time: '02:00 PM', available: true },
    { id: 8, time: '03:00 PM', available: false },
    { id: 9, time: '04:00 PM', available: true },
    { id: 10, time: '05:00 PM', available: true },
    { id: 11, time: '06:00 PM', available: true },
    { id: 12, time: '07:00 PM', available: true },
  ];

  const dates = generateDates();
  const filteredDates = dates.filter(d => d.monthIndex === currentMonth);
  const currentMonthName = filteredDates[0]?.monthFull || '';
  const currentYear = filteredDates[0]?.year || '';

  const handleSchedule = () => {
    if (selectedDate && selectedTime) {
      alert(`Scheduled for ${selectedDate.dayName}, ${selectedDate.month} ${selectedDate.date} at ${selectedTime.time}`);
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
        <Text style={styles.headerTitle}>Schedule Pickup</Text>
        <View style={styles.placeholder} />
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
          <Text style={styles.sectionTitle}>Select Date</Text>
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

        {/* Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={styles.timeGrid}>
            {timeSlots.map((slot) => (
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
            ))}
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Icon name="information-circle" size={20} color="#000000" />
          </View>
          <Text style={styles.infoText}>
            Our pickup service is available from 8 AM to 7 PM. Please ensure someone is available at the scheduled time.
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
              : 'Not selected'
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
          <Text style={styles.scheduleBtnText}>Confirm Schedule</Text>
          <Icon name="checkmark-circle" size={20} color="#FFFFFF" />
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
    letterSpacing: -0.3,
  },
  placeholder: {
    width: 44,
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
    paddingBottom: 16,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  section: {
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  dateScrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  dateCard: {
    width: 70,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    position: 'relative',
  },
  dateCardActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  dateCardToday: {
    borderColor: '#666666',
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
  },
  timeCardActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  timeCardDisabled: {
    backgroundColor: '#FAFAFA',
    borderColor: '#F0F0F0',
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
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 100,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#333333',
    lineHeight: 20,
    fontWeight: '500',
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
    paddingBottom: 100,
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
    letterSpacing: 0.5,
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