import React from 'react';
import { Divider, makeStyles } from '@rneui/themed';
import { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export default function DividerWithLabel({ containerStyle, children }: Props) {
  const styles = useStyles();

  return (
    <View style={[styles.container, containerStyle]}>
      <Divider style={styles.divider} width={1.5} />
      {children}
      <Divider style={styles.divider} width={1.5} />
    </View>
  );
}

const useStyles = makeStyles({
  divider: { flex: 1, borderRadius: 99 },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
