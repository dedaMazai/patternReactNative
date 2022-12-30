import { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { sendLogin } from '../redux/config/login';
// import { RootTabScreenProps } from '../types';
import useApp from "../useApp";
// import {
//   requestReadSMSPermission,
//   startReadSMS,
//   //@ts-ignore
// } from "@maniac-tech/react-native-expo-read-sms";

// export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
export default function TabOneScreen() {
  const [trigger] = sendLogin();
  const [publicAPI, onChangePublic] = useState("");
  const [privateAPI, onChangePrivate] = useState("");
  const [telegramId, onChangeTelegramId] = useState("");
  const [sms, setSms] = useState("Пусто");
  const [error, setError] = useState(false);

  const send = () => {
    if (publicAPI.length && privateAPI.length && telegramId.length) {
      setError(false)
      onChangePublic('')
      onChangePrivate('')
      onChangeTelegramId('')
      trigger({
        publicAPI,
        privateAPI,
        telegramId,
      });
    } else {
      setError(true)
    }
  };

  const {
    appState,
    buttonClickHandler,
    checkPermissions,
    hasReceiveSMSPermission,
    hasReadSMSPermission,
    requestReadSMSPermission,
    smsPermissionState,
    smsValue,
    smsError,
  } = useApp();

// const startReadSMS = async () => {
//   try {
//     const registered = await SmsRetriever.startSmsRetriever();
//     if (registered) {
//       SmsRetriever.addSmsListener(event => {
//         console.log(event.message);
//         if (event.message) {
//           setSms(event.message)
//         }
//       });
//     }
//   } catch (error) {
//     console.log(JSON.stringify(error));
//   }
// };

// useEffect(() => {
//   startReadSMS();

//   return () => SmsRetriever.removeSmsListener();
// }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Запрос</Text>
      <View style={styles.line}>
        <Text style={styles.text}>{`СМС: ${appState}`}</Text>
        <Text>{sms}</Text>
      </View>
      <Button
        title="СТАРТ"
        onPress={buttonClickHandler}
      />
      <Button
        title="ПЕРЕПРОВЕРИТЬ"
        onPress={checkPermissions}
      />
      <Text>{hasReadSMSPermission}</Text>
      <Text>{hasReceiveSMSPermission}</Text>
      <Button
        title="ПРОВЕРИТЬ ДОСТУПЫ"
        onPress={requestReadSMSPermission}
      />
      <View style={styles.line}>
        <Text>smsPermissionState</Text>
        <Text>{smsPermissionState}</Text>
      </View>
      <View style={styles.line}>
        <Text>smsValue</Text>
        <Text>{smsValue}</Text>
      </View>
      <View style={styles.line}>
        <Text>smsError</Text>
        <Text>{smsError}</Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.text}>API public</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePublic}
          value={publicAPI}
        />
      </View>
      <View style={styles.line}>
        <Text style={styles.text}>API private</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePrivate}
          value={privateAPI}
        />
      </View>
      <View style={styles.line}>
        <Text style={styles.text}>Telegram ID</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTelegramId}
          value={telegramId}
        />
      </View>
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
  line: {
    display: 'flex',
    grow: '1rem',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
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
