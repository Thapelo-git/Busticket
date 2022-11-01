
import React, { useState, useEffect, useRef } from 'react'
import {
    SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity,
    FlatList, Dimensions, StatusBar,  
} from 'react-native' 
import { Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather'
import { auth,db } from './Firebase'

const Profile = ({navigation}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [Uid,setUid]=useState('')
   const user = auth.currentUser.uid;
    useEffect(() => {
        db.ref('/TutorUsers/' + user).on('value', snap => {

            setName(snap.val() && snap.val().fullname);
            setPhonenumber(snap.val().phonenumber)
            setEmail(snap.val().email)
            setUid(snap.val().uid)
        })

    }, [])
    const onSignout =()=>{
        // auth
        // .signOut()
        navigation.navigate('SignIn')
    }
  return (
    <View style={styles.container}>
        
        <View style={{justifyContent:'center',alignItems:'center',marginVertical:60,width:'100%'}}>
    <TouchableOpacity style={{borderWidth:2,
        backgroundColor:'#fff',marginVertical:30, borderColor:'#000',width:200,height:70,
        justifyContent:'center',alignItems:'center',flexDirection:'row'}} 
        onPress={()=>navigation.navigate('StudentProfile',{
            email:email,name:name,phonenumber:phonenumber,uid:Uid
      })}>
    <Text style={{color:'#000'}}>Student </Text>
    <Feather name="arrow-right" size={24} />
    </TouchableOpacity >

    <TouchableOpacity onPress={()=>navigation.navigate('TutorProfile',{
                   email:email,name:name,phonenumber:phonenumber,uid:Uid
             })}
    style={{borderWidth:2,
        backgroundColor:'#fff',marginVertical:30, borderColor:'#000',width:200,height:70,
        justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
    <Text style={{color:'#000'}}>Tutor</Text> 
    <Feather name="arrow-right" size={24} />  
    </TouchableOpacity>
    <TouchableOpacity  onPress={()=>navigation.navigate('SignIn')} style={{backgroundColor:'red', width:140, marginTop: 50, borderRadius:5, padding:5}}>

<View style={{flexDirection: 'row', justifyContent:'center'}}>
<Icon
    name='ios-log-out'
    type='Ionicon'
    color='#fff'
    size={25}/>
    <Text style={{padding: 5, paddingTop: -15, fontSize: 18, color: '#fff'}}>
        Log-out
    </Text>
</View>
</TouchableOpacity>
     </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    borderbutton:{
        borderWidth:2,
        backgroundColor:'#fff',marginHorizontal:10,
        borderColor:'#000',width:150,height:70,
        justifyContent:'center',alignItems:'center'
      },
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%'
      },
})