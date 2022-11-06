import React,{useState,} from 'react'
import { StyleSheet, Text, View ,StatusBar,TextInput,
TouchableOpacity,Image,Dimensions,Alert} from 'react-native'

import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"
import { Formik } from 'formik'
import * as yup from 'yup' 
import { auth,db } from './Firebase'
import { ScrollView } from 'react-native-gesture-handler'
//StudentProfile
const deviceHeight=Dimensions.get("window").height
const deviceWidth=Dimensions.get("window").width
const SignUp = ({navigation}) => {
    const [isPasswordShow,setPasswordShow]=useState(false)
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const ReviewSchem=yup.object({
        fullname:yup.string().required().min(3),
        phonenumber:yup.string().required().matches(phoneRegExp,'Phone number is not valid'),
        email:yup.string().required().min(6),
        password:yup.string().required().min(6),
        confirmpassword:yup.string().required().min(6).oneOf([yup.ref('password'),null],'password does not match')
    })
    const addUser= async (data)=>{
        try{
          const {uid,email,password,fullname,phonenumber} =data
  await auth.createUserWithEmailAndPassword(
      email.trim().toLowerCase(),password
    ).then(res =>{
       
          db.ref(`/BusUsers`).child(res.user.uid).set({
            fullname:fullname,
            email:email.trim().toLowerCase(),
            phonenumber:phonenumber,
            uid:res.user.uid
          })
          navigation.navigate('HomeScreen')
        //   res.user.sendEmailVerification()
          })
        }
        catch(error){
          if(error.code === 'auth/email-already-in-use'){
            Alert.alert(
              'That email address is already inuse'
            )
          }
          if(error.code === 'auth/invalid-email'){
            Alert.alert(
              'That email address is invalid'
            )
          }
          else{
            Alert.alert(error.code)
          }
          
        }
        
      }
  return (
    <View style={{backgroundColor:'#fff',width:'100%',height:'100%'}}>
        <View style={{width:'100%',display:'flex',justifyContent:'flex-start',marginVertical:20}}>
            <Image style={styles.image} source={require('../Images/bus_icon.jpg')}/>
            </View>
       <View style={{width:'100%',padding:20,}}>
       <Formik
        initialValues={{fullname:'',phonenumber:'',email:'',password:'',confirmpassword:''}}
        validationSchema={ReviewSchem}
        onSubmit={(values,action)=>{
            action.resetForm()
            addUser(values)
        }}
        >
            {(props)=>(
                <>
          <ScrollView>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    <Feather name="user" size={22}
                    color='#000'
                    style={{marginRight:10}}/>
                    
                    <TextInput placeholder="FullName"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    onChangeText={props.handleChange('fullname')}
                    value={props.values.fullname}
                    onBlur={props.handleBlur('fullname')}
                    />
                </View>
            </View>
            <Text style={{color:'red',marginTop:-10}}>{props.touched.fullname && props.errors.fullname}</Text>
          
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    <Feather name="mail" size={22}
                    color='#000'
                    style={{marginRight:10}}/>
                    
                    <TextInput placeholder="email@gmail.com"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    keyboardType='email-address'
             onChangeText={props.handleChange('email')}
             value={props.values.email}
             onBlur={props.handleBlur('email')}
                    />
                </View>
            </View>
            <Text style={{color:'red',marginTop:-15}}>{props.touched.email && props.errors.email}</Text>
          
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    <Feather name="phone" size={22}
                    color='#000'
                    style={{marginRight:10}}/>
                    
                    <TextInput placeholder="Phone number"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    keyboardType='numeric'
             onChangeText={props.handleChange('phonenumber')}
             value={props.values.phonenumber}
             onBlur={props.handleBlur('phonenumber')}
                    />
                </View>
            </View>
            <Text style={{color:'red',marginTop:-15}}>{props.touched.phonenumber && props.errors.phonenumber}</Text>
            
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                <Feather name="lock" size={22}
                    color='#000'
                    style={{marginRight:10}}/>
                 <TextInput
                 secureTextEntry={isPasswordShow? false :true}
                 placeholder="Password"
                 selectionColor='gainsboro'
                 style={styles.inputText}
                 onChangeText={props.handleChange('password')}
             value={props.values.password}
             onBlur={props.handleBlur('password')}/>
                 <Feather
                 name="eye" size={22}
                 color='#000'
                 style={{marginRight:10}}
                 onPress={()=>setPasswordShow(!isPasswordShow)}
                 />
                </View>
            </View>
            <Text style={{color:'red',marginTop:-15}}>{props.touched.password && props.errors.password}</Text>
            
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                <Feather name="lock" size={22}
                    color='#000'
                    style={{marginRight:10}}/>
                 <TextInput
                 secureTextEntry={isPasswordShow? false :true}
                 placeholder=" confirm Password"
                 selectionColor='gainsboro'
                 style={styles.inputText}
                 onChangeText={props.handleChange('confirmpassword')}
                 value={props.values.confirmpassword}
                 onBlur={props.handleBlur('confirmpassword')}/>
                 <Feather
                 name="eye" size={22}
                 color='#000'
                 style={{marginRight:10}}
                 onPress={()=>setPasswordShow(!isPasswordShow)}
                 />
                </View>
            </View>
            <Text style={{color:'red',marginTop:-15}}>{props.touched.confirmpassword && props.errors.confirmpassword}</Text>
            <TouchableOpacity style={styles.signinButton}
            // onPress={()=>navigation.navigate('RegisterPhone')}
            onPress={props.handleSubmit}
            >
                <Text style={styles.signinButtonText}>Create Account</Text>
            </TouchableOpacity>
            </ScrollView>
            </>
                )}
            </Formik>
            <View style={{width:'100%',justifyContent:'center',flexDirection:'row',marginVertical:10}}>
            <Text>Already have account</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('SignIn')}>
                <Text style={{color:'blue',marginHorizontal:20}}>Sign In</Text>
            </TouchableOpacity>
            </View>
       </View>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#EC8F05'
    } ,
    headerContainer:{
        flexDirection:'row' ,
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:40,
        paddingHorizontal:20
     },
     headerTitle:{
       fontSize:20,
       lineHeight:20 * 1.4,
    
       textAlign:'center'  
 
     },
     image:{
        height:80,
        width:80,
        
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
                color:'#000',
                flex:1
        
            },
            signinButton:{
                backgroundColor:'#000',
                borderRadius:8,
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
            title:{
                fontSize:20,
                lineHeight:20 * 1.4,
                marginTop:20,
                marginBottom:30,
                marginHorizontal:20
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
})