import React, {useState} from 'react';
import {Button, Modal, StyleSheet, View} from 'react-native';
import {ColorPicker, fromHsv} from 'react-native-color-picker';
import {HsvColor} from 'react-native-color-picker/dist/typeHelpers';

interface Props {
  showModal: boolean;
  colorHex: string;
  setShowModal: (showModal: boolean) => void;
  onSelectColor: (color: string) => void;
}
const ColorPickerModal = (props: Props) => {
  const {setShowModal, onSelectColor, showModal, colorHex} = props;

  const [color, setColor] = useState<string>(colorHex);

  const handleColorSelected = (hsv: HsvColor) => {
    const hexColorVal = fromHsv(hsv);
    setColor(hexColorVal);
  };

  return (
    <View style={styles.container}>
      <Modal visible={showModal} animationType="slide">
        <ColorPicker
          onColorChange={handleColorSelected}
          style={styles.colorPicker}
          hideSliders
        />
        <Button
          title="Ok"
          onPress={() => {
            onSelectColor(color);
            setShowModal(false);
          }}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  colorPicker: {
    width: 300,
    height: 500,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
export default ColorPickerModal;
