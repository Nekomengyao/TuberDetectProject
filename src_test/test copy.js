// import React, { useState } from 'react';
// import { StyleSheet, View, ImageBackground, Text, Image, TouchableOpacity } from 'react-native';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-crop-picker'; 

// const OpenCamera = () => {
//     const [imgUrl, setImgUrl] = useState(null); 
//     const [showCapturedImage, setShowCapturedImage] = useState(false); 
//     const image = require('./image/1.png');

//     const openCamera = async () => {
//         try {
//             const result = await launchCamera({ saveToPhotos: true });
//             if (result?.assets && result.assets.length > 0) {
//                 setImgUrl(result.assets[0].uri);
//                 setShowCapturedImage(true);
//             }
//         } catch (error) {
//             console.error('Error launching camera:', error);
//         }
//     };

//     const cropImage = async (uri) => {
//         try {
//             const croppedImage = await ImagePicker.openCropper({
//                 path: uri,
//                 width: 300,
//                 height: 400,
//                 cropping: true,
//             });
//             setImgUrl(croppedImage.path);
//         } catch (error) {
//             console.error('Error cropping image:', error);
//         }
//     };

//     const openLib = async () => {
//         try {
//             const result = await launchImageLibrary();
//             if (result?.assets && result.assets.length > 0) {
//                 setImgUrl(result.assets[0].uri);
//             }
//         } catch (error) {
//             console.error('Error launching image library:', error);
//         }
//     };

//     if (showCapturedImage && imgUrl) {
//         return (
//             <View style={styles.container}>
//                 <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>
//                     <View style={styles.content}>
//                         <Text style={styles.text}>Preview</Text>
//                         <Image source={{ uri: imgUrl }} style={styles.capturedImage} />
//                         <TouchableOpacity
//                             style={styles.button}
//                             onPress={() => cropImage(imgUrl)}
//                         >
//                             <Text style={styles.buttonTitle}>Crop Image</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={styles.button}
//                             onPress={() => setShowCapturedImage(false)}
//                         >
//                             <Text style={styles.buttonTitle}>Back</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </ImageBackground>
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>
//                 <View style={styles.content}>
//                     <Text style={styles.text}>T - SCANNING</Text>
//                     <TouchableOpacity
//                         style={styles.button}
//                         onPress={openCamera}
//                     >
//                         <Text style={styles.buttonTitle}>Capture Image</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         style={styles.button}
//                         onPress={openLib}
//                     >
//                         <Text style={styles.buttonTitle}>Upload Image</Text>
//                     </TouchableOpacity>
//                 </View>
//             </ImageBackground>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     imageBackground: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     text: {
//         fontSize: 30,
//         color: 'white',
//         fontFamily: 'Cabin',
//     },
//     content: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '100%',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     button: {
//         backgroundColor: 'white',
//         borderWidth: 2,
//         borderColor: 'white',
//         borderRadius: 30,
//         height: 70,
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: 260,
//         marginVertical: 10,
//     },
//     buttonTitle: {
//         fontWeight: 'bold',
//         fontSize: 25,
//         color: 'black',
//     },
//     capturedImage: {
//         width: 300,
//         height: 400,
//         marginVertical: 10,
//     },
// });

// export default OpenCamera;

// 显示预览
// import React, { useState } from 'react';
// import { StyleSheet, View, ImageBackground, Text, Image, TouchableOpacity } from 'react-native';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-crop-picker'; 

// const OpenCamera = () => {
//     const [imgUrl, setImgUrl] = useState(null); 
//     const [showCapturedImage, setShowCapturedImage] = useState(false); 
//     const image = require('./image/1.png');

//     const openCamera = async () => {
//         try {
//             const result = await launchCamera({ saveToPhotos: true });
//             if (result?.assets && result.assets.length > 0) {
//                 setImgUrl(result.assets[0].uri);
//                 setShowCapturedImage(true);
//             }
//         } catch (error) {
//             console.error('Error launching camera:', error);
//         }
//     };

//     const cropImage = async (uri) => {
//         try {
//             const croppedImage = await ImagePicker.openCropper({
//                 path: uri,
//                 width: 300,
//                 height: 400,
//                 cropping: true,
//             });
//             setImgUrl(croppedImage.path);
//         } catch (error) {
//             console.error('Error cropping image:', error);
//         }
//     };

//     const openLib = async () => {
//         try {
//             const result = await launchImageLibrary();
//             if (result?.assets && result.assets.length > 0) {
//                 setImgUrl(result.assets[0].uri);
//                 setShowCapturedImage(true); // 设置为 true 显示预览图
//             }
//         } catch (error) {
//             console.error('Error launching image library:', error);
//         }
//     };

//     if (showCapturedImage && imgUrl) {
//         return (
//             <View style={styles.container}>
//                 <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>
//                     <View style={styles.content}>
//                         <Text style={styles.text}>Preview</Text>
//                         <Image source={{ uri: imgUrl }} style={styles.capturedImage} />
//                         <TouchableOpacity
//                             style={styles.button}
//                             onPress={() => cropImage(imgUrl)}
//                         >
//                             <Text style={styles.buttonTitle}>Crop Image</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={styles.button}
//                             onPress={() => setShowCapturedImage(false)}
//                         >
//                             <Text style={styles.buttonTitle}>Back</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </ImageBackground>
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>
//                 <View style={styles.content}>
//                     <Text style={styles.text}>T - SCANNING</Text>
//                     <TouchableOpacity
//                         style={styles.button}
//                         onPress={openCamera}
//                     >
//                         <Text style={styles.buttonTitle}>Capture Image</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         style={styles.button}
//                         onPress={openLib}
//                     >
//                         <Text style={styles.buttonTitle}>Upload Image</Text>
//                     </TouchableOpacity>
//                 </View>
//             </ImageBackground>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     imageBackground: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     text: {
//         fontSize: 30,
//         color: 'white',
//         fontFamily: 'Cabin',
//     },
//     content: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '100%',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     button: {
//         backgroundColor: 'white',
//         borderWidth: 2,
//         borderColor: 'white',
//         borderRadius: 30,
//         height: 70,
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: 260,
//         marginVertical: 10,
//     },
//     buttonTitle: {
//         fontWeight: 'bold',
//         fontSize: 25,
//         color: 'black',
//     },
//     capturedImage: {
//         width: 300,
//         height: 400,
//         marginVertical: 10,
//     },
// });


// export default OpenCamera;

//重新选择
import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground, Text, Image, TouchableOpacity } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker'; 

const OpenCamera = () => {
    const [imgUrl, setImgUrl] = useState(null); 
    const [showCapturedImage, setShowCapturedImage] = useState(false); 
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
                setShowCapturedImage(true); // 设置为 true 显示预览图
            }
        } catch (error) {
            console.error('Error launching image library:', error);
        }
    };

    if (showCapturedImage && imgUrl) {
        return (
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
                            style={styles.button}
                            onPress={openLib}
                        >
                            <Text style={styles.buttonTitle}>Choose Another Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setShowCapturedImage(false)}
                        >
                            <Text style={styles.buttonTitle}>Back</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
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
});

export default OpenCamera;
