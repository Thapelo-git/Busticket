import React,{useState} from 'react'
import { StyleSheet, Text, View ,StatusBar,SafeAreaView,TextInput,Image,
    TouchableOpacity} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Picker} from '@react-native-picker/picker';
import { Formik } from 'formik'
import * as yup from 'yup'
import DatePicker from "react-native-datepicker";
import moment from 'moment'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { auth,db } from './Firebase'
const TutorProfile = ({navigation,route}) => {
    const [name,setName]=useState(route.params.name)
    const [email,setEmail]=useState(route.params.email)
    const [phonenumber,setphonenumber]=useState(route.params.phonenumber)
    const [Gender,setGender]=useState('Male')
    const [Subject,setSubject]=useState('')
    const [Avalability,setAvalability]=useState('Public')
    const [StartDate,setStartDate]=useState('Weekends')
    const [location,setLocation]=useState('')
    const [Price,setPrice]=useState('')
    // var a =moment(checkout)
    // var b =moment(checkin)
    var datetoday= new Date()
    const [uid,setUid]=useState(route.params.uid)
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const ReviewSchem=yup.object({
        name:yup.string().required().min(2),
        phonenumber:yup.string().matches(phoneRegExp,'Phone number is not valid'),
        email:yup.string().min(6),
        location:yup.string().required().min(6),
    //     Gender:yup.string(),
    //     Subject:yup.string(),
        Price:yup.string().required(),
    //    Avalability:yup.string(),StartDate:yup.string()
    })
    const editprofile=(data)=>{
        // const {location,Price,} =data
    db.ref('TutorUsers').child(uid).update({name,email,phonenumber,Description:'Available',
        Gender,location,Subject,Price,Avalability,StartDate})
        .then(()=>db.ref('TutorUsers').once('value'))
        .then(snapshot=>snapshot.val())
        .catch(error => ({
          errorCode: error.code,
          errorMessage: error.message
        }));
        // navigation.navigate('Profile')
      }
  return (
    // <Formik
    // initialValues={{name:'',phonenumber:'',email:'',
    // location:'',Price:'',}}
    // validationSchema={ReviewSchem}
    // onSubmit={(values,action)=>{
    //     action.resetForm()
    //     // editprofile(values)
    // }}
    // >
    //     {(props)=>(
    //         <>
   
        <View style={{flex: 1,  backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',width:'100%'}}>
    <ProgressSteps >
        <ProgressStep label="About">
            <View style={{ alignItems: 'center' }}>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    <Feather name="user" size={22}
                    color='#000'
                    style={{marginRight:10}}/>
                    
                    <TextInput placeholder="FullName"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    onChangeText={(text)=>setName(text)}
                    
                    value={name}
                    // onBlur={props.handleBlur('fullname')}
                    />
                </View>
            </View>
            {/* <Text style={{color:'red',marginTop:-10}}>{props.touched.fullname && props.errors.fullname}</Text> */}
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    <Feather name="mail" size={22}
                    color='#000'
                    style={{marginRight:10}}/>
                    
                    <TextInput placeholder="email@gmail.com"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    keyboardType='email-address'
                    onChangeText={(text)=>setEmail(text)}
             value={email}
            
                    />
                </View>
            </View>
            {/* <Text style={{color:'red',marginTop:-15}}>{props.touched.email && props.errors.email}</Text> */}
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    <Feather name="phone" size={22}
                    color='#000'
                    style={{marginRight:10}}/>
                    
                    <TextInput placeholder="Phone number"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    keyboardType='numeric'
                    onChangeText={(text)=>setphonenumber(text)}
             value={phonenumber}
         
                    />
                </View>
            </View>
            {/* <Text style={{color:'red',marginTop:-15}}>{props.touched.phonenumber && props.errors.phonenumber}</Text> */}
            <Text style={{marginVertical:10}}>Gender</Text>

<Picker
    selectedValue={Gender}
    style={{ width: 300, height: 50, backgroundColor: '#eee' }}
    onValueChange={(text)=>setGender(text)}   
             
>
    <Picker.Item label="Male" value="Male" />
    <Picker.Item label="Female" value="Female" />
</Picker>
<Text style={{marginVertical:10}}>Enter your city</Text>
<View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    <Ionicons name="location" size={22}
                    color='#000'
                    style={{marginRight:10}}/>
                    
                    <TextInput placeholder="City"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    onChangeText={(text)=>setLocation(text)}
                    value={location}
            //         onChangeText={props.handleChange('location')}
            //  value={props.values.location}
            //  onBlur={props.handleBlur('location')}
                    />
                </View>
            </View>
            {/* <Text style={{color:'red',marginTop:-15}}>{props.touched.location && props.errors.location}</Text> */}
            </View>
        </ProgressStep>
        <ProgressStep label="Tutoring Details">
            <View style={{ alignItems: 'center' }}>
            <Text style={styles.titles}>Choose by Subject</Text>

<Picker
     selectedValue={Subject}
     style={{ width: 300, height: 50, backgroundColor: '#eee' }}
     onValueChange={(text)=>setSubject(text)}   
  
>
    <Picker.Item label="select" value="" />
    <Picker.Item label="Mathematics" value="Mathematics" />
    <Picker.Item label="Physical Sciences" value="PS" />
    <Picker.Item label="Life Sciences" value="LS" />
    <Picker.Item label="Natural Sciences" value="NS" />
    <Picker.Item label="History" value="History" />
    <Picker.Item label="Other" value="Other" />
</Picker>

<Text style={{marginVertical:10}}>If Other specify</Text>
<View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    {/* <Ionicons name="location" size={22}
                    color='#000'
                    style={{marginRight:10}}/> */}
                    
                    <TextInput placeholder="Enter Subject"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    onChangeText={(text)=>setSubject(text)}
                    
                    value={Subject}
            //  onBlur={props.handleBlur('Subject')}
                    />
                </View>
            </View>
            {/* <Text style={{color:'red',marginTop:-15}}>{props.touched.Subject && props.errors.Subject}</Text> */}
            <Text style={{marginVertical:10}}>Price per session</Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    {/* <Feather name="phone" size={22}
                    color='#000'
                    style={{marginRight:10}}/> */}
                    
                    <TextInput placeholder="Price"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    keyboardType='numeric'
                    onChangeText={(text)=>setPrice(text)}
             value={Price}
                    />
                </View>
            </View>
            {/* <Text style={{color:'red',marginTop:-15}}>{props.touched.Price && props.errors.Price}</Text> */}
            </View>
        </ProgressStep>
        <ProgressStep label="Comfirm" onSubmit={()=>editprofile()}>
            <View style={{ alignItems: 'center' }}>
            <Text style={{marginVertical:10}}>Are u available for Public or Private</Text>

<Picker
    selectedValue={Avalability}
    style={{ width: 300, height: 50, backgroundColor: '#eee' }}
    onValueChange={(text)=>setAvalability(text)}   
             
>
    <Picker.Item label="Public" value="Public" />
    <Picker.Item label="Private" value="Private" />
</Picker>
<Text style={{marginVertical:10}}>Specify Your Availability</Text>

<Picker
    selectedValue={StartDate}
    style={{ width: 300, height: 50, backgroundColor: '#eee' }}
    onValueChange={(text)=>setStartDate(text)}   
            
>
    <Picker.Item label="Weekends Only" value="Weekends" />
    <Picker.Item label="Whole Week" value="Week" />
    <Picker.Item label="Full Month" value="month" />
    <Picker.Item label="Whole Year" value="Year" />
</Picker>
            </View>
        </ProgressStep>
    </ProgressSteps>
</View>
    
    // </>
    //         )}
    //     </Formik>
  )
}

export default TutorProfile

const styles = StyleSheet.create({
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
})