import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

// const Login = ({ onBack }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const image = require('./image/1.png');

//     return (
//         <View style={styles.container}>
//             <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>
//                 <View style={styles.content}>
//                     <Text style={styles.text}>Login</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Email"
//                         placeholderTextColor="#aaa"
//                         value={email}
//                         onChangeText={setEmail}
//                         keyboardType="email-address"
//                         autoCapitalize="none"
//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Password"
//                         placeholderTextColor="#aaa"
//                         value={password}
//                         onChangeText={setPassword}
//                         secureTextEntry
//                     />
//                     <TouchableOpacity
//                         style={styles.button}
//                         onPress={onBack}
//                     >
//                         <Text style={styles.buttonTitle}>Login</Text>
//                     </TouchableOpacity>
//                 </View>
//             </ImageBackground>
//         </View>
//     );
// };

const OpenCamera = () => {
    const [imgUrl, setImgUrl] = useState(null); 
    const [showCapturedImage, setShowCapturedImage] = useState(false);
    const [showUploadedImage, setShowUploadedImage] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const image = require('./image/1.png');

    const openCamera = async () => {
        try {
            const result = await launchCamera({ saveToPhotos: true });
            if (result?.assets && result.assets.length > 0) {
                setImgUrl(result.assets[0].uri);
                setShowCapturedImage(true);
            }
        } catch (error) {
            console.error('Error launching camera:', error);
        }
    };

    const cropImage = async (uri) => {
        try {
            const croppedImage = await ImagePicker.openCropper({
                path: uri,
                width: 300,
                height: 400,
                cropping: true,
            });
            setImgUrl(croppedImage.path);
        } catch (error) {
            console.error('Error cropping image:', error);
        }
    };

    const openLib = async () => {
        try {
            const result = await launchImageLibrary();
            if (result?.assets && result.assets.length > 0) {
                setImgUrl(result.assets[0].uri);
                setShowUploadedImage(true);
            }
        } catch (error) {
            console.error('Error launching image library:', error);
        }
    };

    const renderCapturedImagePreview = () => (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>
                <View style={styles.content}>
                    <Text style={styles.text}>Preview</Text>
                    <Image source={{ uri: imgUrl }} style={styles.capturedImage} />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => cropImage(imgUrl)}
                    >
                        <Text style={styles.buttonTitle}>Crop Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.overlayButtonLeft}
                        onPress={() => setShowCapturedImage(false)}
                    >
                        <Text style={styles.overlayButtonTitle}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.overlayButtonRight}
                        // onPress={openLib}
                    >
                        <Text style={styles.overlayButtonTitle}>Predict</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );

    const renderUploadedImagePreview = () => (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>
                <View style={styles.previewContainer}>
                    <Image source={{ uri: imgUrl }} style={styles.fullScreenImage} />
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={styles.overlayButtonLeft}
                            onPress={() => setShowUploadedImage(false)}
                        >
                            <Text style={styles.overlayButtonTitle}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.overlayButtonCenter}
                            onPress={openLib}
                        >
                            <Text style={styles.overlayButtonTitle}>Choose Another Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.overlayButtonRight}
                        >
                            <Text style={styles.overlayButtonTitle}>Predict</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );

    if (showCapturedImage && imgUrl) {
        return renderCapturedImagePreview();
    }

    if (showUploadedImage && imgUrl) {
        return renderUploadedImagePreview();
    }

    if (showLogin) {
        return <Login onBack={() => setShowLogin(false)} />;
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>
                <View style={styles.content}>
                    <Text style={styles.text}>T - SCANNING</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={openCamera}
                    >
                        <Text style={styles.buttonTitle}>Capture Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={openLib}
                    >
                        <Text style={styles.buttonTitle}>Upload Image</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        style={styles.button}
                        onPress={() => setShowLogin(true)}
                    >
                        <Text style={styles.buttonTitle}>Login & Register</Text>
                    </TouchableOpacity> */}
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        color: 'white',
        fontFamily: 'Cabin',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    button: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 30,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        width: 260,
        marginVertical: 10,
    },
    buttonTitle: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'black',
    },
    capturedImage: {
        width: 300,
        height: 400,
        marginVertical: 10,
    },
    fullScreenImage: {
        width: '100%',
        height: '100%',
    },
    overlayButtonRight: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 10,
        borderRadius: 5,
    },
    overlayButtonCenter: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    overlayButtonLeft: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 10,
        borderRadius: 5,
    },
    overlayButtonTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
    },
    previewContainer: {
        width: '100%',
        height: '100%',
    },
    buttonRow: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
        width: 260,
        paddingHorizontal: 10,
        color: 'white',
        fontSize: 18,
    },
});

export default OpenCamera;
