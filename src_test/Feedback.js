import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Modal } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const Feedback = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = () => {
    let options = {
      mediaType: 'photo',
      includeBase64: false,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage(response.assets[0].uri);
      }
    });
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  const handleSubmit = async () => {
    if (!username || !email || !comment) {
      Alert.alert('错误/error', '请填写所有必填字段/content missing');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('comment', comment);
    
    if (image) {
      let fileType = 'image/jpeg'; // 默认类型
      if (image.endsWith('.png')) {
        fileType = 'image/png';
      } else if (image.endsWith('.jpg') || image.endsWith('.jpeg')) {
        fileType = 'image/jpeg';
      }
    
      formData.append('file', {
        uri: image,
        type: fileType,
        name: 'feedback_image.jpg',
      });
    }

    // test time out caused error?
    const timeout = 10000; // 10 seconds
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      console.log('Sending request to backend...');
      console.log('Request URL:', 'http://192.168.96.1:5555/feedback');
      console.log('FormData content:', formData);
      
      const response = await fetch('http://192.168.96.1:5555/feedback', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const responseText = await response.text();
      console.log('Response status:', response.status);
      console.log('Response text:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Parsed response:', data);
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        Alert.alert('错误/error', '服务器响应格式错误/Invalid server response format');
        return;
      }

      if (data.success) {
        Alert.alert('成功/successful', '反馈已提交/feedback submitted');
        navigation.navigate('Login');
      } else {
        Alert.alert('错误/error', data.message || '提交反馈时出错/feedback submission failed');
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request timed out');
        Alert.alert('错误/error', '请求超时/Request timed out');
      } else {
      console.error('Fetch error:', error);
      Alert.alert('错误/error', '网络错误或服务器响应格式错误/Network error or invalid server response');
    }
  } finally {
    clearTimeout(id); // 清除超时定时器
  }
};

  //     // 检查响应状态码
  //     console.log('Response status:', response.status);
  //     const data = await response.json();
  //     // 打印从后端收到的信息
  //     console.log('Response from backend:', data);

  //     if (data.success) {
  //       Alert.alert('成功/succssuful', '反馈已提交/feedback submitted');
  //       navigation.navigate('Login');
  //     } else {
  //       Alert.alert('错误/error', '提交反馈时出错/feedback submission failed');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     Alert.alert('错误/error', '网络错误/looks network run away~');
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>提交反馈</Text>
      <TextInput
        style={styles.input}
        placeholder="用户名"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="电子邮件"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.commentInput}
        placeholder="评论"
        value={comment}
        onChangeText={setComment}
        multiline
      />
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.buttonText}>选择图片</Text>
      </TouchableOpacity>
      {image && (
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image source={{ uri: image }} style={styles.thumbnail} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteImage}>
            <Text style={styles.deleteButtonText}>X</Text>
          </TouchableOpacity>
          <Modal visible={modalVisible} transparent={true}>
            <View style={styles.modalBackground}>
              <Image source={{ uri: image }} style={styles.fullImage} />
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>关闭</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      )}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>提交反馈</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  commentInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
  imageButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  fullImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
  },
});

export default Feedback;
