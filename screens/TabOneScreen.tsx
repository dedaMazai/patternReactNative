import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [text1, onChangeText1] = useState("");
  const [text2, onChangeText2] = useState("");
  const [text3, onChangeText3] = useState("");
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
      <TextInput
        style={styles.input}
        onChangeText={onChangeText3}
        value={text3}
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
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
