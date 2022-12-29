import { useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { sendLogin } from '../redux/config/login';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [trigger] = sendLogin();
  const [text1, onChangeText1] = useState("");
  const [text2, onChangeText2] = useState("");
  const [error, setError] = useState(false);

  const send = () => {
    if (text1.length && text2.length) {
      setError(false)
      trigger({text1, text2});
    } else {
      setError(true)
    }
};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText1}
        value={text1}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText2}
        value={text2}
      />
      {error && <Text>Заполните все поля</Text>}
      <Button
        title="Отправить"
        onPress={send}
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    height: 40,
    width: '70%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
