import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Container } from '@/components/Container';

/**
 * A CameraScreen screen
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: 'white',
  },
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flex: 0.15,
    width: '100%',
    position: 'relative',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    opacity: 1,
  },
  button: {
    color: 'white',
    marginHorizontal: 15,
  },
});

export function CameraScreen() {
  const navigation = useNavigation();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const toggleCameraType = () => {
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  };

  const dismiss = () => {
    navigation.goBack();
  };

  return (
    <Screen testID="CameraScreen" flex={1} alignItems="center" justifyContent="center">
      <Camera style={styles.camera} type={type}>
        <Container margin={25} flex={-1} alignItems="flex-start">
          <Icon name="arrow-back" size={36} color="white" onPress={dismiss} />
        </Container>
        <Container style={styles.buttonContainer}>
          <Icon
            type="ionicon"
            name="flash-outline"
            size={36}
            onPress={toggleCameraType}
            {...styles.button}
          />
          <Icon name="photo-camera" reverse size={48} onPress={toggleCameraType} />
          <Icon
            type="ionicon"
            name="ios-camera-reverse-outline"
            size={36}
            onPress={toggleCameraType}
            {...styles.button}
          />
        </Container>
      </Camera>
    </Screen>
  );
}
