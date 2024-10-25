/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import React, {useEffect, useRef} from 'react';

export function LoadingPage() {
  const animationRef = useRef<LottieView | null>();

  useEffect(() => {
    animationRef.current?.play();
  }, []);
  return (
    <View style={{justifyContent: 'center', height: '80%'}}>
      <LottieView
        ref={animation => {
          animationRef.current = animation;
        }}
        source={require('../Assets/Animations/LoadingAnimation.json')}
        autoPlay
        loop
        style={{width: '90%', height: 300}}
      />
    </View>
  );
}

export default LoadingPage;
