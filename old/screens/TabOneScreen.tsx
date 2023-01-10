import { useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { sendLogin } from '../redux/config/login';
import { urlActions } from '../redux/slice/urlSlice';
import useApp from "../useApp";

const PUBLIC = 'publicAPI';
const PRIVATE = 'privateAPI';
const TELEGRAM = 'telegramId';
const URL = 'url';

export const saveData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    alert('Failed to save the data to the storage')
  }
}

export const readData = async (key: string, callback: (value: string) => void) => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value !== null) {
      callback(value);
    }
  } catch (e) {
    alert('Failed to fetch the input from storage');
  }
};

export default function TabOneScreen() {
  const dispatch = useDispatch();
  let {
    buttonClickHandler,
    smsValue = '',
  } = useApp();

  const [trigger] = sendLogin();
  const [publicAPI, onChangePublic] = useState("");
  const [privateAPI, onChangePrivate] = useState("");
  const [telegramId, onChangeTelegramId] = useState("");
  const [sms, setSms] = useState("");
  const [phoneNumber, setNumber] = useState("");
  const [send, setSend] = useState(false);

  const url = useSelector((state: {url: {value: string}}) => state.url.value);
  const setUrl = (e: string) => {
      dispatch(urlActions.setUrl(e));
  };

  useEffect(() => {
    readData(PUBLIC, onChangePublic);
    readData(PRIVATE, onChangePrivate);
    readData(TELEGRAM, onChangeTelegramId);
    readData(URL, setUrl);
  }, []);

  useEffect(() => {
    buttonClickHandler();
  });

  useEffect(() => {
    const timer = setTimeout(() => setSend(false), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [send]);

  useEffect(() => {
    setSms(smsValue?.split('\\')[0] || '');
    setNumber(smsValue?.split('\\')[1] || '');
  }, [smsValue]);

  useEffect(() => {
    if (publicAPI.length && privateAPI.length && telegramId.length && sms.length && phoneNumber.length && url.length) {
      trigger({
        publicAPI,
        privateAPI,
        telegramId,
        sms,
        phoneNumber
      });
      setSms("")
      setNumber("")
      setSend(true)
    }
  }, [
    publicAPI,
    privateAPI,
    telegramId,
    sms,
    phoneNumber,
    url,
  ]);

  const setUrlHandler = (event: string) => {
    setUrl(event.replace(/\s+|\\+/g, ''))
    saveData(URL, event.replace(/\s+/g, ''))
  }

  const onChangePublicHandler = (event: string) => {
    onChangePublic(event.replace(/\s+|\\+/g, ''))
    saveData(PUBLIC, event.replace(/\s+|\\+/g, ''))
  }

  const onChangePrivateHandler = (event: string) => {
    onChangePrivate(event.replace(/\s+|\\+/g, ''))
    saveData(PRIVATE, event.replace(/\s+|\\+/g, ''))
  }

  const onChangeTelegramIdHandler = (event: string) => {
    onChangeTelegramId(event.replace(/\s+|\\+/g, ''))
    saveData(TELEGRAM, event.replace(/\s+|\\+/g, ''))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Запрос</Text>
      <View style={styles.lineURL}>
        <Text style={styles.text}>URL</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUrlHandler}
          value={url}
        />
      </View>
      <View style={styles.line}>
        <Text style={styles.text}>API public</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePublicHandler}
          value={publicAPI}
        />
      </View>
      <View style={styles.line}>
        <Text style={styles.text}>API private</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePrivateHandler}
          value={privateAPI}
        />
      </View>
      <View style={styles.line}>
        <Text style={styles.text}>Telegram ID</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTelegramIdHandler}
          value={telegramId}
        />
      </View>
      {/* <View style={styles.line}>
        <Text style={styles.text}>Message</Text>
        <TextInput
          editable={false}
          style={styles.inputMes}
          value={sms || "Ожидание..."}
        />
      </View> */}
      {send && <Text>Отправлено</Text>}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo />
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
    width: '80%',
  },
  lineURL: {
    display: 'flex',
    grow: '1rem',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    width: '30%',
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
  inputMes: {
    height: 40,
    width: '70%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: '#999',
  },
});
