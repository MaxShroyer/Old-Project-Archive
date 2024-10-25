import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OnboardingState {
  hasSeenOnboarding: boolean | null;
  markOnboardingAsSeen: () => Promise<void>;
}

const ONBOARDING_KEY = 'hasSeenOnboarding';

export const useOnboarding = (): OnboardingState => {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const value = await AsyncStorage.getItem(ONBOARDING_KEY);
        setHasSeenOnboarding(value !== null);
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      }
    };

    checkOnboardingStatus();
  }, []);

  const markOnboardingAsSeen = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      setHasSeenOnboarding(true);
    } catch (error) {
      console.error('Error marking onboarding as seen:', error);
    }
  };

  return {hasSeenOnboarding, markOnboardingAsSeen};
};
