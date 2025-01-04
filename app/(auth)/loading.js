import { View,StyleSheet, Image,Text } from 'react-native';

function Loading (){
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://quiz.saylaniwelfare.com/images/smit.png' }}
          style={styles.loaderImage}
        />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'linear-gradient(135deg, #1E90FF, #FF4500)',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 15,
  },
  loaderImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#1E90FF',
    fontWeight: 'bold',
  },
});

export default Loading;
