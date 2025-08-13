import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

const AnnuityProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Annuity Profile</Text>
        <Text style={styles.subtitle}>Your annuity portfolio details</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Policy Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Company:</Text>
          <Text style={styles.value}>MetLife</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Policy Number:</Text>
          <Text style={styles.value}>ML-2024-001</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>Active</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Financial Details</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Monthly Payment:</Text>
          <Text style={styles.value}>$4,166.67</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Total Value:</Text>
          <Text style={styles.value}>$500,000</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Current Value:</Text>
          <Text style={styles.value}>$500,000</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Surrender Value:</Text>
          <Text style={styles.value}>$450,000</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Timeline</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Start Date:</Text>
          <Text style={styles.value}>Jan 15, 2024</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>End Date:</Text>
          <Text style={styles.value}>Jan 15, 2034</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Beneficiary</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>Sarah Doe (Spouse)</Text>
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
  },
  value: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '600',
  },
});

export default AnnuityProfileScreen;

