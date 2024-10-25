import {Card, Text} from '@rneui/base';
import {makeStyles} from '@rneui/themed';
import React from 'react';
import {TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import Modal from 'react-native-modal';
import StyledButton from './StyledButton';
import Error from './Error';

interface Props {
  firstButtonPress: () => void;
  secondButtonPress?: () => void;
  cancelButtonPress?: () => void;
  header?: string;
  description: string;
  firstButtonText: string;
  secondButtonText?: string;
  cancelButtonText?: string;
  isVisible: boolean;
  buttonsLoading?: boolean;
  errorMessage?: string;
}

export default function PopupModal(props: Props) {
  const {
    firstButtonPress,
    secondButtonPress,
    cancelButtonPress,
    header,
    description,
    firstButtonText,
    secondButtonText,
    cancelButtonText,
    isVisible,
    buttonsLoading,
    errorMessage,
  } = props;
  const styles = useStyles();
  return (
    <Modal isVisible={isVisible} style={styles.modal}>
      <TouchableOpacity onPress={cancelButtonPress}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <Card containerStyle={styles.card}>
              {header ? (
                <Text h3 style={styles.header}>
                  {header}
                </Text>
              ) : (
                <></>
              )}
              <Text style={styles.description}>{description}</Text>
              <View style={styles.buttonContainer}>
                {cancelButtonPress ? (
                  <StyledButton
                    buttonStyle={styles.button}
                    titleStyle={styles.button}
                    onPress={cancelButtonPress}
                    loading={buttonsLoading}>
                    {cancelButtonText}
                  </StyledButton>
                ) : null}
                <StyledButton
                  loading={buttonsLoading}
                  buttonStyle={styles.button}
                  titleStyle={styles.button}
                  loadingProps={{color: 'white'}}
                  onPress={firstButtonPress}>
                  {firstButtonText}
                </StyledButton>
                {secondButtonPress ? (
                  <StyledButton
                    buttonStyle={styles.button}
                    titleStyle={styles.button}
                    onPress={secondButtonPress}
                    loading={buttonsLoading}>
                    {secondButtonText}
                  </StyledButton>
                ) : null}
              </View>
              {errorMessage && (
                <Error align="center" topPadding={16} error={errorMessage} />
              )}
            </Card>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const useStyles = makeStyles(theme => ({
  modal: {},
  container: {width: '100%', height: '100%', marginTop: '40%'},
  card: {borderRadius: 20},
  header: {
    textAlign: 'center',
    width: '100%',
  },
  description: {padding: 10},
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
    gap: 5,
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
  },
}));
