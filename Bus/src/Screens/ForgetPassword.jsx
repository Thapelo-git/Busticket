import React,{useEffect, useState,} from 'react'
import { StyleSheet, Text, View ,StatusBar,Alert,
    TextInput,TouchableOpacity,Image,Modal,Dimensions, SafeAreaView} from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"

import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import * as yup from 'yup'
import {auth,db} from '../Screens/Firebase'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorageLib from '@react-native-async-storage/async-storage'

const deviceHeight=Dimensions.get("window").height
const deviceWidth=Dimensions.get("window").width
const ForgetPassword = ({navigation}) => {
    const ReviewSchem =yup.object({
        email:yup.string().required().min(6),
        password:yup.string().required().min(6),
    })
    const signIn = async(data)=>{
        const { email,} = data;
        try {
           
                    const user = await auth.sendPasswordResetEmail(email.trim().toLowerCase())
  
        } catch (error) {
            Alert.alert(error.name, error.message);
        }
    }
  return (
    <SafeAreaView style={{backgroundColor:'#fff',width:'100%',height:'100%'}}>
    <View style={{width:'100%',display:'flex',justifyContent:'flex-start',marginVertical:30}}>
    <Image style={styles.image} source={require('../Images/tutor4.jpg')}/>
    </View>
    <View style={{width:'100%',padding:20,}}>
    
      <ScrollView>
          <Formik
          initialValues={{email:'',password:''}}
         validationSchema={ReviewSchem}
         onSubmit={(values,action)=>{
             action.resetForm()
             signIn(values)
         }}
         >
             {(props)=>(
                 <>

<View style={{height:15}}></View>
     


    <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
            <Feather name="mail" size={22}

            style={{marginRight:10}}/>
            
            <TextInput placeholder="Email"
             onChangeText={props.handleChange('email')}
             value={props.values.email}
             onBlur={props.handleBlur('email')}
            selectionColor='gainsboro'
            style={styles.inputText}
            />
        </View>
    </View>
    {props.errors.email? <Text style={{color:"red"}}>{props.errors.email}</Text>:null}
    <View style={{height:15}}></View>
    <View >
    
</View>
  
   
    
    <Text></Text>
  

    <TouchableOpacity style={styles.signinButton}
      onPress={props.handleSubmit}>
        <Text style={styles.signinButtonText}
        
        >CONTINUE</Text>
    </TouchableOpacity>
    </>
    )}
    </Formik>
    <View style={{width:'100%',justifyContent:'center',flexDirection:'row',marginVertical:30}}>
    <Text>Have Account</Text>
    <TouchableOpacity onPress={()=>navigation.navigate('SignIn')}>
        <Text style={{color:'blue',marginHorizontal:20}}>Sign Up</Text>
    </TouchableOpacity>
    </View>
    </ScrollView>
    </View>
    


</SafeAreaView>
  )
}

export default ForgetPassword

const styles = StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor:'#fff'
        
    },
    image:{
        height:80,
        width:100,
        
      },
    headerContainer:{
       flexDirection:'row' ,
       alignItems:'center',
       justifyContent:'center',
       paddingVertical:10,
       paddingHorizontal:20
    },
    headerTitle:{
      fontSize:20,
      lineHeight:20 * 1.4,
      width:80,
      textAlign:'center'  

    },
    title:{
fontSize:20,
lineHeight:20 * 1.4,
marginTop:20,
marginBottom:50,
marginHorizontal:20
    },
    content:{
        fontSize:20,
        marginTop:10,
        marginBottom:20,
        marginHorizontal:20,
    },
    inputContainer:{
        backgroundColor:'#fff',
        
       marginVertical:10,
        borderWidth:1,
        borderColor:'#000',
        justifyContent:'center',
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
        color:"#000",
        flex:1

    },
    forgotPasswordContainer:{
        marginHorizontal:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'

    },
    rememberMeText:{
        marginLeft:10,
        fontSize:12,
        lineHeight:12 * 1.4,
        color:'grey'
    },
    forgotPasswordText:{
        fontSize:12,
        lineHeight:12 * 1.4,
        color:'blue',
        fontWeight:'bold'
    },
    signinButton:{
        backgroundColor:'#000',
      
        marginHorizontal:20,
        height:60,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
    },
    signinButtonText:{
        fontSize:18,
        lineHeight:18 * 1.4,
        color:'#fff',
        
    },
    signupContainer:{
        marginHorizontal:20,
        justifyContent:'center',
        paddingVertical:20,
        flexDirection:'row',
        alignItems:'center'
    },
    accountText:{
        fontSize:13,
        lineHeight:13 * 1.4,
        color:'#000'
    },
    signupText:{
        fontSize:13,
        lineHeight:13 * 1.4,
        color:'#EC8F05',
        marginLeft:5,

    },
    orText:{
        fontSize:15,
        lineHeight:15 * 1.4,
        color:'#000',
        marginLeft:5,
        alignSelf:'center'
    },
 
})