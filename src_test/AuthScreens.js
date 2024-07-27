import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground, PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// 邮箱验证函数 / Email validation function
const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

// 密码强度检查函数 / Password strength check function
const validatePassword = (password) => {
  return password.length >= 8;
};

// 权限请求函数 / Permission request function
const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);

      if (
        grants['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log("所有权限都被授予");
        return true;
      } else {
        console.log("有权限被拒绝");
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true; 
};

// 模式选择页面 / Mode selection page
const ModeSelection = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>选择模式 / Select Mode</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MainTabs', { screen: 'OpCame' })}
      >
        <Text style={styles.buttonText}>离线模式 / Offline Mode</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>在线模式 / Online Mode</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Feedback')}
      >
        <Text style={styles.buttonText}>反馈 / Feedback</Text>
      </TouchableOpacity> */}
    </View>
  );
};

// 登录组件 / Login component
const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // 处理登录逻辑 / Handle login logic
  const handleLogin = async () => {
    // 重置错误 / Reset errors
    setErrors({});

    // 验证邮箱 / Validate email
    if (!validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: '无效的邮箱地址 / Invalid email address' }));
      return;
    }

    // 验证密码 / Validate password
    if (!validatePassword(password)) {
      setErrors(prev => ({ ...prev, password: '密码至少需要8个字符 / Password must be at least 8 characters' }));
      return;
    }

    // 插入后端交互代码
    try {
      console.log('Sending request to backend...');
      const response = await fetch('http://192.168.96.1:5555/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      // 检查响应状态码
      console.log('Response status:', response.status);

      const data = await response.json();

      // 打印从后端收到的信息
      console.log('Response from backend:', data);

      if (data.success) {
        // 使用AsyncStorage存储token
        await AsyncStorage.setItem('access_token', data.access_token);
        await AsyncStorage.setItem('refresh_token', data.refresh_token);
        Alert.alert('成功 / Success', '登录成功 / Login successful');
        navigation.navigate('MainTabs');
      } else {
        Alert.alert('错误 / Error', data.message || '登录失败 / Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('错误 / Error', 'Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>欢迎回来 / Welcome Back</Text>
      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="邮箱 / Email"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="密码 / Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>登录 / Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.switchText}>没有账号？注册 / No account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

// 注册组件 / Register component
const Register = () => {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  // 处理注册逻辑 / Handle register logic
  const handleRegister = async () => {
    // 重置错误 / Reset errors
    setErrors({});

    // 验证全名 / Validate full name
    if (fullName.trim().length === 0) {
      setErrors(prev => ({ ...prev, fullName: '请输入全名 / Please enter your full name' }));
      return;
    }

    // 验证邮箱 / Validate email
    if (!validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: '无效的邮箱地址 / Invalid email address' }));
      return;
    }

    // 验证密码 / Validate password
    if (!validatePassword(password)) {
      setErrors(prev => ({ ...prev, password: '密码至少需要8个字符 / Password must be at least 8 characters' }));
      return;
    }

    // 验证确认密码 / Validate confirm password
    if (password !== confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: '密码不匹配 / Passwords do not match' }));
      return;
    }

    // 插入后端交互代码
    try {
      console.log('Sending request to backend...');
      const response = await fetch('http://192.168.96.1:5555/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: fullName,
          email: email,
          password: password,
        }),
      });

      // 检查响应状态码
      console.log('Response status:', response.status);

      const data = await response.json();

      // 打印从后端收到的信息
      console.log('Response from backend:', data);

      if (data.success) {
        // 使用AsyncStorage存储token
        await AsyncStorage.setItem('access_token', data.access_token);
        await AsyncStorage.setItem('refresh_token', data.refresh_token);

        Alert.alert('成功 / Success', '注册成功 / Registration successful');
        navigation.navigate('Login');
      } else {
        Alert.alert('错误 / Error', data.message || '注册失败 / Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('错误 / Error', '网络错误，请稍后重试 / Network error, please try again later');
    }
  };
  //   // 如果验证通过,模拟注册过程 / If validation passes, simulate registration process
  //   setTimeout(() => {
  //     Alert.alert('成功 / Success', '注册成功 / Registration successful');
  //     navigation.navigate('Login');
  //   }, 1000);
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>创建账号 / Create Account</Text>
      <TextInput
        style={[styles.input, errors.fullName && styles.inputError]}
        placeholder="全名 / Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="邮箱 / Email"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="密码 / Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      <TextInput
        style={[styles.input, errors.confirmPassword && styles.inputError]}
        placeholder="确认密码 / Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>注册 / Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.switchText}>已有账号？登录 / Have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

// 主应用组件 / Main app component.
const AuthScreens = () => {
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const checkPermissions = async () => {
      const granted = await requestPermissions();
      setPermissionsGranted(granted);
      setIsChecking(false);
    };
    checkPermissions();
  }, []);

  if (isChecking) {
    return (
      <View style={styles.container}>
        <Text>正在检查权限... / Checking permissions...</Text>
      </View>
    );
  }

  if (!permissionsGranted) {
    return (
      <View style={styles.container}>
        <Text>需要相机和存储权限才能使用此应用。请在设置中启用这些权限。</Text>
        <Text>Camera and storage permissions are required to use this app. Please enable them in settings.</Text>
      </View>
    );
  }

  // 如果权限已授予，渲染模式选择页面
  return <ModeSelection />;
};

// 样式 / Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  switchText: {
    marginTop: 10,
    color: 'blue',
  },
});

export { AuthScreens, Login, Register, ModeSelection };