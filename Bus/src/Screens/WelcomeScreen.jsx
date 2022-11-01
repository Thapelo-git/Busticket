
import React from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
     <Image style={styles.image} source={require('../Images/tutor4.jpg')}/>
     <View style={{display:'flex',justifyContent:'center',marginVertical:60,}}>
     <Text>Tutor</Text>
     </View>
     
     <View style={{justifyContent:'center',flexDirection:'row',marginVertical:60,}}>
    <TouchableOpacity style={styles.borderbutton} onPress={()=>navigation.navigate('SignIn')}>
    <Text style={{color:'#000'}}>Login</Text>
    </TouchableOpacity >
    <TouchableOpacity style={styles.blackbutton} onPress={()=>navigation.navigate('SignUp')}>
    <Text style={{color:'#fff'}}>Register</Text>   
    </TouchableOpacity>
     </View>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      image:{
        height:180,
        width:280,
        
      },
      borderbutton:{
        borderWidth:2,
        backgroundColor:'#fff',marginHorizontal:10,
        borderColor:'#000',width:150,height:70,
        justifyContent:'center',alignItems:'center'
      },
      blackbutton:{
        borderWidth:2,
        backgroundColor:'#000',marginHorizontal:10,
        borderColor:'#000',width:150,height:70,
        justifyContent:'center',alignItems:'center'
      }
})