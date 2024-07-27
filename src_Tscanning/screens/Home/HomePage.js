import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Functionality } from './ImageCapture/Functionality';
import * as Progress from 'react-native-progress';

const HomePage = () => {
  const {
    openCamera,
    cropImage,
    openLib,
    predictImage,
    imgUrl,
    showCapturedImage,
    showUploadedImage,
    setShowCapturedImage,
    setShowUploadedImage,
    imageDimensions,
    objectDetectionOutput,
  } = Functionality();

  const [showResult, setShowResult] = useState(false);
  // const image = require('./ImageCapture/image/1.png');
  const image = require('./ImageCapture/image/image.png');

  const handlePredict = async () => {
    console.log('Starting prediction...');
    await predictImage(imgUrl); // 先进行预测
    setShowResult(true); // 设置显示结果页面
    console.log('Prediction done, navigating to result page...');
  };

  const renderCapturedImagePreview = () => (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: imgUrl }}
            style={{
              width: imageDimensions.width,
              height: imageDimensions.height,
              resizeMode: 'contain',
            }}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.overlayButtonLeft} onPress={() => cropImage(imgUrl)}>
              <Text style={styles.overlayButtonTitle}>Edit Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.overlayButtonCenter}
              onPress={() => setShowCapturedImage(false)}
            >
              <Text style={styles.overlayButtonTitle}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.overlayButtonRight} onPress={handlePredict}>
              <Text style={styles.overlayButtonTitle}>Predict</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );

  const renderUploadedImagePreview = () => (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: imgUrl }}
            style={{
              width: imageDimensions.width,
              height: imageDimensions.height,
              resizeMode: 'contain',
            }}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.overlayButtonLeft}
              onPress={() => setShowUploadedImage(false)}
            >
              <Text style={styles.overlayButtonTitle}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.overlayButtonCenter} onPress={openLib}>
              <Text style={styles.overlayButtonTitle}>Choose Another Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.overlayButtonRight} onPress={handlePredict}>
              <Text style={styles.overlayButtonTitle}>Predict</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );

  const renderResultPage = () => {
    const objectDetectionPercentages = objectDetectionOutput
      ? {
          output_0: (objectDetectionOutput.output_0 * 100).toFixed(2),
          output_1: (objectDetectionOutput.output_1 * 100).toFixed(2),
        }
      : { output_0: 0, output_1: 0 };

    return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>
          <View style={styles.previewContainer}>
            <Text style={styles.text}>Prediction Results</Text>
            <View style={styles.resultContainer}>
              {imgUrl && <Image source={{ uri: imgUrl }} style={{ width: 200, height: 200 }} />}
              <View style={styles.progressContainer}>
                <Text style={styles.text}>Object Detection Output 0:</Text>
                <View style={styles.progressBar}>
                  <Text style={styles.progressBarText}>{objectDetectionPercentages.output_0}%</Text>
                  <Progress.Bar
                    progress={parseFloat(objectDetectionPercentages.output_0) / 100}
                    width={200}
                    height={15}
                    color={'#76c7c0'}
                  />
                </View>
                <Text style={styles.text}>Object Detection Output 1:</Text>
                <View style={styles.progressBar}>
                  <Text style={styles.progressBarText}>{objectDetectionPercentages.output_1}%</Text>
                  <Progress.Bar
                    progress={parseFloat(objectDetectionPercentages.output_1) / 100}
                    width={200}
                    height={15}
                    color={'#76c7c0'}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => setShowResult(false)}>
              <Text style={styles.buttonTitle}>Back</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  };

  if (showResult) {
    return renderResultPage();
  }

  if (showCapturedImage && imgUrl) {
    return renderCapturedImagePreview();
  }

  if (showUploadedImage && imgUrl) {
    return renderUploadedImagePreview();
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>
        <View style={styles.content}>
          <Text style={styles.text}>T - SCANNING</Text>
          <TouchableOpacity style={styles.button} onPress={openCamera}>
            <Text style={styles.buttonTitle}>Capture Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={openLib}>
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
    color: 'black',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRow: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  progressContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressBarText: {
    marginRight: 10,
    fontSize: 18,
    color: 'black',
  },
});

export default HomePage;