import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

export default function SimpleBottomSheet() {
  const snapPoints = useMemo(() => ['75%'], []);

  return (
    <BottomSheet
      snapPoints={snapPoints}
      enablePanDownToClose
      index={0}     // 👈 sheet is already open
    >
      <BottomSheetScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Comments</Text>

        {Array.from({ length: 30 }).map((_, i) => (
          <Text key={i} style={styles.item}>Comment {i + 1}</Text>
        ))}
      </BottomSheetScrollView>
    </BottomSheet>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  sheetBg: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  paymentItem: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
});
