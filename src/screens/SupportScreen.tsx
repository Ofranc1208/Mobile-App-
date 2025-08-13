import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const SupportScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Support</Text>
        <Text style={styles.subtitle}>Get help when you need it</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contact Information</Text>
        <View style={styles.contactItem}>
          <Text style={styles.contactIcon}>📞</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Phone Support</Text>
            <Text style={styles.contactValue}>+1 (866) 972-9688</Text>
          </View>
        </View>
        <View style={styles.contactItem}>
          <Text style={styles.contactIcon}>📧</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Email Support</Text>
            <Text style={styles.contactValue}>support@smarterpayouts.com</Text>
          </View>
        </View>
        <View style={styles.contactItem}>
          <Text style={styles.contactIcon}>🕒</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Business Hours</Text>
            <Text style={styles.contactValue}>Monday - Friday, 9AM - 6PM EST</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Help</Text>
        <TouchableOpacity style={styles.helpItem}>
          <Text style={styles.helpIcon}>❓</Text>
          <Text style={styles.helpText}>How to upload documents</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.helpItem}>
          <Text style={styles.helpIcon}>❓</Text>
          <Text style={styles.helpText}>Understanding your payout schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.helpItem}>
          <Text style={styles.helpIcon}>❓</Text>
          <Text style={styles.helpText}>Frequently asked questions</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Emergency Contact</Text>
        <Text style={styles.emergencyText}>
          For urgent matters outside business hours, please call our emergency line:
        </Text>
        <Text style={styles.emergencyPhone}>+1 (866) 972-9689</Text>
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
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  helpIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  helpText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  emergencyText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  emergencyPhone: {
    fontSize: 18,
    color: '#FF3B30',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SupportScreen;

