import { StyleSheet, Text, View,TextInput ,TouchableOpacity,Image} from 'react-native'
import React from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather'
import { db,auth } from './Firebase';
const RatingScreen = ({navigation,route}) => {
  
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Image source={require('../Images/markicon.png')} style={{width:150,height:150}}/>
          <View style={{width:'100%',justifyContent:'center',alignItems:'center',padding:10}}>
            <TouchableOpacity style={styles.signinButton} 
            onPress={()=>navigation.navigate('HomeScreen')}>
               <Text style={styles.signinButtonText}>Submit</Text>
                          </TouchableOpacity>
           </View>
    </View>
  )
}

export default RatingScreen

const styles = StyleSheet.create({
    headerContainer: {
        top: 10,
        flexDirection: 'row', justifyContent: 'space-between',
        alignContent: 'center'
    
    
      },
      inputContainer:{
        backgroundColor:'#fff',
   marginVertical:10,
   borderWidth:1,
   borderColor:'#000',
   justifyContent:'center',
   width:'100%'
       },
       inputSubContainer:{
           flexDirection:'row',
           alignItems:'center'
       },
       inputText:{
           fontSize:18,
           textAlignVertical:'center',
           padding:0,
           height:60,
           color:'#000',
          
   
       },
       signinButton:{
        backgroundColor:'#000',
        borderWidth:1,
        marginHorizontal:20,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        width:'100%'
    },
    signinButtonText:{
        fontSize:18,
        lineHeight:18 * 1.4,
        color:'#fff',
        
    },
})