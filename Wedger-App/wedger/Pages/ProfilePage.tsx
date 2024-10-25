import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../Context/userAuthContext';
import StyledButton from '../Components/StyledButton';
import {
  AntIcon,
  EntypoIcon,
  FeatherIcon,
} from '../Components/ProfileIconButton.tsx';

const ProfilePage = () => {
  const { logout, userData } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);
  const [isSettingModalVisible, setIsSettingModalVisible] = useState(false);
  const [isAppearenceModalVisible, setIsAppearenceModalVisible] = useState(false);
  const [isDevicesModalVisible, setIsDevicesModalVisible] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState('light'); // Theme state

  useEffect(() => {
    if (userData) {
      setNewUserName(userData.name);
      setNewUserEmail(userData.email);
    }
    setLoading(false);
  }, [userData]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: 20,
      backgroundColor: theme === 'light' ? '#AAC9CE' : '#161618',
    },
    welcomeText: {
      marginTop: 15,
      marginBottom: 10,
      textAlign: 'center',
      fontSize: 42,
      fontWeight: 'bold',
      color: theme === 'light' ? '#000000' : '#FFFFFF',
    },
    theFeatures: {
      marginTop: 15,
      marginBottom: 20,
      fontSize: 30,
      fontWeight: 'bold',
      color: theme === 'light' ? '#000000' : '#FFFFFF',
    },
    thePrivacy: {
      marginTop: 15,
      marginBottom: 20,
      fontSize: 30,
      fontWeight: 'bold',
      color: theme === 'light' ? '#000000' : '#FFFFFF',
    },
  });

  const handleEditInfo = () => {
    setIsEditModalVisible(true);
  };

  const handleSaveChanges = () => {
    console.log('New Username:', newUserName);
    console.log('New Email:', newUserEmail);
    setIsEditModalVisible(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
  };

  const handleOpenNotificationModal = () => {
    setIsNotificationModalVisible(true);
  };

  const handleCloseNotificationModal = () => {
    setIsNotificationModalVisible(false);
  };

  const handleSettings = () => {
    setIsSettingModalVisible(true);
  };

  const handleCloseSettingsModal = () => {
    setIsSettingModalVisible(false);
  };

  const handleOpenAppearenceModal = () => {
    setIsAppearenceModalVisible(true);
  };

  const handleCloseAppearenceModal = () => {
    setIsAppearenceModalVisible(false);
  };

  const handleOpenDevicesModal = () => {
    setIsDevicesModalVisible(true);
  };

  const handleCloseDevicesModal = () => {
    setIsDevicesModalVisible(false);
  };

  const enableNotifications = () => {
    setNotificationsEnabled(true);
    handleCloseNotificationModal();
  };

  const disableNotifications = () => {
    setNotificationsEnabled(false);
    handleCloseNotificationModal();
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={dynamicStyles.container}>

      <View style={styles.header}>
        <Text style={dynamicStyles.welcomeText}>Welcome, {newUserName} </Text>
        <Text style={dynamicStyles.theFeatures}>Features</Text>

        {/* Edit Info Button */}
        <AntIcon
          onPress={handleEditInfo}
          iconName="user"
          text="Edit info"
          iconSize={24}
          iconColor="#000"
        />

        {/* Notifications Button */}
        <AntIcon
          onPress={handleOpenNotificationModal}
          iconName="notification"
          text="Notifications"
          iconSize={24}
          iconColor="#000"
        />

        {/* Settings, Appearance, Privacy, Devices Icons */}
        <AntIcon
          onPress={handleSettings}
          iconName="setting"
          text="Settings"
          iconSize={24}
          iconColor="#000"
        />
        <EntypoIcon
          onPress={handleOpenAppearenceModal}
          iconName="light-up"
          text="Appearance"
          iconSize={24}
          iconColor="#000"
        />

        <Text style={dynamicStyles.thePrivacy}>Privacy</Text>
        <FeatherIcon
          onPress={handleOpenDevicesModal}
          iconName="smartphone"
          text="Devices"
          iconSize={24}
          iconColor="#000"
        />
      </View>

      {/* Logout Button */}
      <View style={styles.buttonContainer}>
        <StyledButton onPress={() => logout()}>Logout</StyledButton>
      </View>

      {/* Edit Info Modal */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseEditModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.buttonTitle}>Edit Info</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={newUserName}
              onChangeText={setNewUserName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={newUserEmail}
              onChangeText={setNewUserEmail}
              keyboardType="email-address"
            />
            <View style={styles.modalButtons}>
              <StyledButton onPress={handleSaveChanges}>Save</StyledButton>
              <StyledButton onPress={handleCloseEditModal}>Cancel</StyledButton>
            </View>
          </View>
        </View>
      </Modal>

      {/* Notification Toggle Modal */}
      <Modal
        visible={isNotificationModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseNotificationModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.buttonTitle}>Notification Settings</Text>
            <Text>Do you want to enable or disable notifications?</Text>
            <View style={styles.modalButtons}>
              <StyledButton onPress={enableNotifications}>Enable</StyledButton>
              <StyledButton onPress={disableNotifications}>Disable</StyledButton>
              <StyledButton onPress={handleCloseNotificationModal}>Cancel</StyledButton>
            </View>
          </View>
        </View>
      </Modal>

      {/* Settings Modal */}
      <Modal
        visible={isSettingModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseSettingsModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.buttonTitle}>Settings</Text>
            <Text>Setting options go here</Text>
            <View style={styles.modalButtons}>
              <StyledButton onPress={handleCloseSettingsModal}>Close</StyledButton>
            </View>
          </View>
        </View>
      </Modal>

      {/* Appearance Modal */}
      <Modal
        visible={isAppearenceModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseAppearenceModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.buttonTitle}>Appearance Settings</Text>
            {/* Light-Mode and Dark-Mode Buttons */}
            <View style={styles.modalButtons}>
              <StyledButton onPress={() => { setTheme('light'); handleCloseAppearenceModal(); }}>Light-Mode</StyledButton>
              <StyledButton onPress={() => { setTheme('dark'); handleCloseAppearenceModal(); }}>Dark-Mode</StyledButton>
              <StyledButton onPress={handleCloseAppearenceModal}>Close</StyledButton>
            </View>
          </View>
        </View>
      </Modal>

      {/* Devices Modal */}
      <Modal
        visible={isDevicesModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseDevicesModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.buttonTitle}>Devices Settings</Text>
            <Text>Devices functions go here</Text>
            <View style={styles.modalButtons}>
              <StyledButton onPress={handleCloseDevicesModal}>Close</StyledButton>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: '#AAC9CE',
  },
  header: {
    width: '100%',
  },
  buttonTitle: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 30,
  },
  buttonContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 60,
    borderRadius: 30,
    width: '95%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  themeSwitcherButton: {
    alignSelf: 'flex-end',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: '#007BFF',
  },
  themeSwitcherButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ProfilePage;