import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const History = () => {
  const [records, setRecords] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadRecords();
    checkOnlineStatus();
  }, []);

  const loadRecords = async () => {
    // In a real app, you would load the records from local storage or a database
    // For this example, we'll use dummy data
    const dummyRecords = [
      { id: '1', fileName: 'FIG-121-20240617', date: '5 Dec 2024' },
      { id: '2', fileName: 'FIG-122-20240617', date: '5 Dec 2024' },
      { id: '3', fileName: 'FIG-123-20240617', date: '5 Dec 2024' },
      { id: '4', fileName: 'FIG-124-20240617', date: '5 Dec 2024' },
      { id: '5', fileName: 'FIG-125-20240617', date: '5 Dec 2024' },
      { id: '6', fileName: 'FIG-126-20240617', date: '5 Dec 2024' },
      { id: '7', fileName: 'FIG-127-20240617', date: '5 Dec 2024' },
      { id: '8', fileName: 'FIG-128-20240617', date: '5 Dec 2024' },
      { id: '9', fileName: 'FIG-129-20240617', date: '5 Dec 2024' },
    ];
    setRecords(dummyRecords);
  };

  const checkOnlineStatus = async () => {
    const token = await AsyncStorage.getItem('access_token');
    setIsOnline(!!token);
  };

  const toggleRecordSelection = (id) => {
    setSelectedRecords(prev => 
      prev.includes(id) ? prev.filter(recordId => recordId !== id) : [...prev, id]
    );
  };

  const handleUpload = async () => {
    if (!isOnline) {
      navigation.navigate('Login');
      return;
    }

    if (selectedRecords.length === 0) {
      Alert.alert('Error', 'Please select at least one record to upload.');
      return;
    }

    // Here you would implement the actual upload logic
    console.log('Uploading records:', selectedRecords);
    Alert.alert('Success', 'Records uploaded successfully!');
    setSelectedRecords([]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.recordItem}>
      {isOnline && (
        <TouchableOpacity onPress={() => toggleRecordSelection(item.id)}>
          <Icon 
            name={selectedRecords.includes(item.id) ? 'checkbox' : 'square-outline'} 
            size={24} 
            color="green"
          />
        </TouchableOpacity>
      )}
      <View style={styles.recordInfo}>
        <Text style={styles.fileName}>{item.fileName}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <FlatList
        data={records}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Select</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  recordInfo: {
    marginLeft: 10,
  },
  fileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default History;