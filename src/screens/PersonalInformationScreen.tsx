import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const PersonalInformationScreen = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Personal Information</Text>
        <Text style={styles.subtitle}>Your profile and account details</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Basic Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.value}>{user.firstName} {user.lastName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Client ID:</Text>
          <Text style={styles.value}>{user.clientId}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{user.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.value}>{new Date(user.dateOfBirth).toLocaleDateString()}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Address</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Street:</Text>
          <Text style={styles.value}>{user.address.street}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>City:</Text>
          <Text style={styles.value}>{user.address.city}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>State:</Text>
          <Text style={styles.value}>{user.address.state}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>ZIP Code:</Text>
          <Text style={styles.value}>{user.address.zipCode}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Account Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Member Since:</Text>
          <Text style={styles.value}>{new Date(user.createdAt).toLocaleDateString()}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Last Updated:</Text>
          <Text style={styles.value}>{new Date(user.updatedAt).toLocaleDateString()}</Text>
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
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
});

export default PersonalInformationScreen;

