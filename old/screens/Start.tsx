import { useEffect } from 'react';
import { Button, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import useApp from '../useApp';

export default function Start({ navigation }: RootStackScreenProps<'Start'>) {
  const {
    requestReadSMSPermission,
    buttonClickHandler,
  } = useApp();

  const startHandler = async () => {
    await requestReadSMSPermission()
    buttonClickHandler()
    navigation.replace('Root')
  }

  // useEffect(() => {
  //   if (smsPermissionState === "Success Callback!") {
  //     navigation.replace('Root')
  //   }
  // }, [smsPermissionState]);

  return (
    <View style={styles.container}>
      <Button
        title="Start!"
        onPress={startHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
