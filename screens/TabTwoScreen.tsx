import { Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { counterActions } from '../redux/slice/counterSlice';

export default function TabTwoScreen() {
  const dispatch = useDispatch();
  const counterValue = useSelector((state: {counter: {value: number}}) => state.counter.value);

  const increment = () => {
      dispatch(counterActions.increment());
  };
  const decrement = () => {
      dispatch(counterActions.decrement());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{counterValue}</Text>
      <Button
        title="Отнять"
        onPress={increment}
      />
      <Button
        title="Добавить"
        onPress={decrement}
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
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
});
