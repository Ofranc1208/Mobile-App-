import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

const CourtInfoScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Court Information</Text>
        <Text style={styles.subtitle}>Your legal case details</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Case Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Case Number:</Text>
          <Text style={styles.value}>CV-2024-001</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Court Name:</Text>
          <Text style={styles.value}>Superior Court of California</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Case Status:</Text>
          <Text style={styles.value}>Active</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Last Updated:</Text>
          <Text style={styles.value}>Aug 13, 2024</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Court Details</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>123 Court Street, Los Angeles, CA 90012</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>+1 (213) 555-0123</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Judge:</Text>
          <Text style={styles.value}>Hon. Patricia Johnson</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Next Hearing</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>Sep 15, 2024</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>10:00 AM</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.value}>Final Settlement Hearing</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Attorney Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>Robert Williams</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>+1 (555) 234-5678</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>r.williams@lawfirm.com</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E5E9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  label: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '600',
    flex: 2,
    textAlign: 'right',
  },
});

export default CourtInfoScreen;

