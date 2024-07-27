import React, { useState, useEffect } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import { useTensorflowModel } from 'react-native-fast-tflite';
import { convertToRGB } from 'react-native-image-to-rgb';

export const Functionality = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const [showCapturedImage, setShowCapturedImage] = useState(false);
  const [showUploadedImage, setShowUploadedImage] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  const [finalArray, setFinalArray] = useState(null);
  const [channelSize, setChannelSize] = useState(0);
  const [tensorArray, setTensorArray] = useState(null);
  const [grayScaleArray, setGrayScaleArray] = useState(null);
  const [objectDetectionOutput, setObjectDetectionOutput] = useState({ output_0: null, output_1: null });//这里使用了两个output
  const [classificationOutput, setClassificationOutput] = useState(null);
  const objectDetectionModel = useTensorflowModel(require('./models/best_model.tflite'));
  // const classificationModel = useTensorflowModel(require('./models/cnn.tflite'));

  // useEffect(() => {
  //   if (objectDetectionModel.state === 'loaded' && classificationModel.state === 'loaded') {
  //     console.log('Models are loaded and ready for inference');
  //   }
  // }, [objectDetectionModel.state, classificationModel.state]);

  useEffect(() => {
    if (objectDetectionModel.state === 'loaded') {
      console.log('Models are loaded and ready for inference');
    }
  }, [objectDetectionModel.state]); 

  const openCamera = async () => {
    try {
      const result = await launchCamera({ saveToPhotos: true });
      if (result?.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setImgUrl(uri);
        setShowCapturedImage(true);
        ImageResizer.createResizedImage(uri, 800, 600, 'JPEG', 100).then(resizedImage => {
          setImageDimensions({
            width: resizedImage.width,
            height: resizedImage.height
          });
        });
      }
    } catch (error) {
      console.error('Error launching camera:', error);
    }
  };

  const openLib = async () => {
    try {
      const result = await launchImageLibrary();
      if (result?.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setImgUrl(uri);
        setShowUploadedImage(true);
        ImageResizer.createResizedImage(uri, 800, 600, 'JPEG', 100).then(resizedImage => {
          setImageDimensions({
            width: resizedImage.width,
            height: resizedImage.height
          });
        });
      }
    } catch (error) {
      console.error('Error launching image library:', error);
    }
  };

  const cropImage = async (uri) => {
    try {
      const croppedImage = await ImagePicker.openCropper({
        path: uri,
        width: imageDimensions.width, // 设置裁剪框的宽度
        height: imageDimensions.height, // 设置裁剪框的高度
        cropping: true,
      });
      setImgUrl(croppedImage.path);
      setImageDimensions({
        width: croppedImage.width,
        height: croppedImage.height
      });
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

  const predictImage = async () => {
    if (imgUrl) {
      try {
        const resizedImage = await ImageResizer.createResizedImage(imgUrl, 224, 224, 'PNG', 100, 0, undefined, true, { mode: 'stretch' });
        const convertedArray = await convertToRGB(resizedImage.uri);
        setFinalArray(new Float32Array(convertedArray));

        let red = [], green = [], blue = [];
        for (let i = 0; i < convertedArray.length; i += 3) {
          green.push(convertedArray[i]/255);
          blue.push(convertedArray[i + 1]/255);
          red.push(convertedArray[i + 2]/255);
        }
        setChannelSize(red.length);

        let tensorArray = [];
        for (let y = 0; y < 224; y++) {
          let row = [];
          for (let x = 0; x < 224; x++) {
            let idx = y * 224 + x;
            row.push([red[idx], green[idx], blue[idx]]);
          }
          tensorArray.push(row);
        }
        const tensorFloat32Array = new Float32Array(tensorArray.flat(2));
        setTensorArray(tensorFloat32Array);


        //计算灰度可以忽略
        // 计算灰度值并将其转换为正确形状的 Float32Array
        let grayScale = [];
        for (let i = 0; i < convertedArray.length; i += 3) {
          let gray = 0.299 * convertedArray[i] + 0.587 * convertedArray[i + 1] + 0.114 * convertedArray[i + 2];
          grayScale.push(gray / 255); // 归一化灰度值
        }
        const grayScaleMatrix = []; // 创建一个二维数组
        for (let y = 0; y < 224; y++) {
          let row = [];
          for (let x = 0; x < 224; x++) {
            row.push(grayScale[y * 224 + x]);
          }
          grayScaleMatrix.push(row);
        }

        // 将二维灰度值数组转换为4D张量形状
        const grayScaleTensor = new Float32Array([].concat(...grayScaleMatrix));
        setGrayScaleArray(new Float32Array(grayScaleTensor));
        const reshapedInput = new Float32Array(224 * 224 * 1); // 根据需要调整大小
        reshapedInput.set(grayScaleTensor);

        if (objectDetectionModel.state === 'loaded') {
          const objectResult = objectDetectionModel.model.runSync([tensorFloat32Array]);
          const objectDetectionOutput = {
            output_0: objectResult[0][0],
            output_1: objectResult[1][0],
          };

          setObjectDetectionOutput(objectDetectionOutput);
          console.log('Object Detection Output:', objectDetectionOutput);
          const inputsInfo = objectDetectionModel.model.inputs;
          console.log(inputsInfo);
          console.log('/');
          console.log('/');
        }
        //第二个模型
        // if (classificationModel.state === 'loaded') {
        //   const classificationResult = classificationModel.model.runSync([reshapedInput]);
        //   setClassificationOutput(JSON.stringify(classificationResult));
        // }
      } catch (error) {
        console.error('Error in predicting image:', error);
      }
    } else {
      console.error('No image URL found for prediction');
    }
  };

  return { 
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
    finalArray,
    tensorArray,
    grayScaleArray,
    objectDetectionOutput,
    classificationOutput,
  };
};