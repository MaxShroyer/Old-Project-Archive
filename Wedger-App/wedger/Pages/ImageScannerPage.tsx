import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {LinearGradient} from 'react-native-linear-gradient';
import StyledButton from '../Components/StyledButton';
import {useNavigation} from '@react-navigation/native';
import {ImageUpload} from '../Components/imageUpload.tsx';
import {useAuth} from '../Context/userAuthContext';
import {ImageParsing} from '../Components/imageUpload.tsx';

export function ImageScannerPage() {
  const [image, setImageData] = useState<any>(undefined);
  const navigation = useNavigation();
  const {isLoggedIn} = useAuth();
  console.log(isLoggedIn); // debug auth

  const handleConfirm = async () => {
    if (image) {
      if (isLoggedIn) {
        try {
          const imageURL = await ImageUpload(image.data);
          const parsedData = await ImageParsing(imageURL);

          navigation.navigate('NextSteps');
        } catch (error) {
          console.error('Error uploading image or adding document:', error);
        }
      } else {
        console.log('User auth check failed.');
      }
    } else {
      console.log('Image not found');
    }
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true,
      compressImageQuality: 0.1,
      includeBase64: true,
      useFrontCamera: false,
    })
      .then(image => {
        if (!image) {
          return;
        }
        setImageData(image);
        console.log(image);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      cropping: true,
      compressImageQuality: 0.1,
      includeBase64: true,
      useNativeDriver: false,
      cancelButtonTitle: 'Cancel',
    })
      .then(image => {
        if (!image) {
          return;
        }
        setImageData(image);
        console.log(image);
      })
      .catch(error => {
        console.log('Cancelled camera operation', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#EBF8FE', '#8eb2c0']}
        style={styles.linearGradient}>
        <View style={styles.headerContainer}>
          <Text style={styles.header1}>Receipt Scanner</Text>
        </View>
        <View style={styles.content}>
          {image && (
            <Image
              source={{uri: `data:${image.mime};base64,${image.data}`}}
              style={styles.image}
            />
          )}
        </View>
        {image && (
          <TouchableOpacity style={styles.button} onPress={handleConfirm}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        )}
        <View style={styles.buttonContainer}>
          <StyledButton
            style={styles.cameraButton}
            onPress={() => {
              openCamera();
            }}>
            Open Camera
          </StyledButton>
          <StyledButton
            style={styles.galleryButton}
            onPress={() => {
              openGallery();
            }}>
            Open Gallery
          </StyledButton>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginTop: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  header1: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  galleryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  cameraButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#0080ff',
    padding: 12,
    borderRadius: 8,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 380,
    height: 400,
    resizeMode: 'contain',
  },
});

export default ImageScannerPage;
