import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavBar from './components/NavBar';


export default function App() {
  return (
    <View style={styles.container}>
      <NavBar />
      <View style={styles.header}>
        <Text style={styles.boldText}> This should be Test update bold</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: 'gray',
    padding: 20
  },
  boldText: {
    fontWeight: 'bold'
  }
});
