import { StyleSheet, Text, View ,Image} from 'react-native'
import React,{useEffect} from 'react'

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(()=>{
      navigation.navigate('Welcome')
    },2000)
  },[])
  return (
    <View style={styles.container}>
     <Image style={styles.image} source={require('../Images/tutor3.png')}/>
     <Text>Tutor</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      image:{
        height:150,
        width:210,
        
      },
})