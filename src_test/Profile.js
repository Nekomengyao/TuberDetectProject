import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ProfileItem = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Icon name={icon} size={24} color="black" style={styles.icon} />
    <Text style={styles.itemText}>{title}</Text>
    <Icon name="chevron-forward" size={24} color="gray" />
  </TouchableOpacity>
);

const Profile = () => {
  const navigation = useNavigation();
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.accountSection}>
        <Text style={styles.sectionTitle}>Account</Text>
        <ProfileItem title="Profile" icon="person-outline" />
        <ProfileItem title="Feedback" icon="chatbox-ellipses-outline" onPress={() => navigation.navigate('Feedback')} />
      </View>
      <View style={styles.moreSection}>
        <Text style={styles.sectionTitle}>More</Text>
        <ProfileItem title="Rate & Review" icon="star-outline" />
        <ProfileItem title="Help" icon="help-circle-outline" />
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={() => {
        // 实现登出逻辑
        navigation.navigate('Auth');
      }}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
  },
  accountSection: {
    backgroundColor: 'white',
    marginBottom: 20,
  },
  moreSection: {
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  icon: {
    marginRight: 15,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#4CAF50',
    margin: 20,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;