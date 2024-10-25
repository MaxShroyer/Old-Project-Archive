import React, {useEffect, useState} from 'react';
import useStyles from './styles';
import DropDownPicker, {
  ItemType,
  ValueType,
} from 'react-native-dropdown-picker';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

interface Props<T extends ValueType> {
  options: ItemType<T>[];
  onChangeValue: (value: T) => void;
  placeholder?: string;
  initialValue?: T;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  dropdownContainerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  listItemLabelStyle?: StyleProp<TextStyle>;
  tickIconStyle?: StyleProp<TextStyle>;
  iconContainerStyle?: StyleProp<TextStyle>;
  zIndex?: number;
  zIndexInverse?: number;
  disableArrow?: boolean;
}

export default function Dropdown<T extends ValueType>({
  options,
  onChangeValue,
  placeholder,
  initialValue,
  style,
  containerStyle,
  dropdownContainerStyle,
  labelStyle,
  placeholderStyle,
  listItemLabelStyle,
  tickIconStyle,
  iconContainerStyle,
  zIndex,
  zIndexInverse,
  disableArrow = false,
}: Props<T>) {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(options);
  const [value, setValue] = useState<T | null>(initialValue ?? null);

  useEffect(() => {
    setItems(options);
  }, [options]);

  return (
    <DropDownPicker
      listMode="SCROLLVIEW" // Fixes VirtualizedList error
      multiple={false}
      open={open}
      setOpen={setOpen}
      items={items}
      setItems={setItems}
      value={value}
      setValue={setValue}
      //   multipleText={value || ''}
      dropDownContainerStyle={
        (styles.dropdownContainer, dropdownContainerStyle)
      }
      // Props
      style={[styles.dropdown, style]}
      containerStyle={[styles.container, containerStyle]}
      labelStyle={[styles.labelStyle, labelStyle]}
      onChangeValue={i => i !== null && onChangeValue(i)}
      placeholder={placeholder}
      zIndex={zIndex} // I think default is something wacky like 5000; beware of that
      zIndexInverse={zIndexInverse}
      showArrowIcon={!disableArrow}
      placeholderStyle={placeholderStyle}
      listItemLabelStyle={listItemLabelStyle}
      tickIconStyle={tickIconStyle}
      iconContainerStyle={iconContainerStyle}
    />
  );
}
