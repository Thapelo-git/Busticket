import { SafeAreaView, StyleSheet, Text, View,Dimensions,TextInput,Image,
  Button, TouchableOpacity,Alert, ScrollView ,FlatList} from 'react-native'
import React from 'react'
import { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import { Formik } from 'formik'
    import * as yup from 'yup'
    import { db,auth } from './Firebase'
//AdminView
const ViewRating = ({navigation,route}) => {
  const [Toplace,setToplace]=useState(route.params.Toplace)
  const [Fromplace,setFromplace]=useState(route.params.Fromplace)
  const [Price,setPrice]=useState(route.params.Price)
  const [BusType,setBusType]=useState(route.params.BusType)
  const [Passenger,setPassenger]=useState(route.params.Passenger)
  const [checkin,setCheckin]=useState(route.params.checkin)
  const [Status,setStatus]=useState('Paid')
  const [checkout,setCheckout]=useState(route.params.checkout)
  const Duration= route.params.Duration
  const NewPrice=route.params.NewPrice
  const user = auth.currentUser.uid;
    const ReviewSchem=yup.object({
        cardNumber:yup.string().required().min(16).max(16),
        cardName:yup.string().required().min(2),
        CVV:yup.string().required().min(3).max(3),
        Expiry:yup.string().required().min(5).max(5),
   
    })
    const addCard=(data)=>{
        const {cardName,cardNumber,CVV,Expiry} = data
        const userid= auth.currentUser.uid
        db.ref(`/UserCards`).push({
            cardName:cardName,cardNumber:cardNumber,CVV:CVV,Expiry:Expiry,
            userId:userid,
          })
    }
    const [ selectedBtnIndex,setSelectedBtnIndex] = useState(0);
const markcategory=(key,vehicleType)=>{
    setSelectedBtnIndex(key)
   }
   const Vehicle =[
    {id:'1',image_:require('../Images/paypal.jpg')},
    {id:'2',image_:require('../Images/mastercard.jpg')},
    {id:'3',image_:require('../Images/wallet.png')}
  ]
   const Aminities =({category,index})=>{
    return(
        <TouchableOpacity key={index} activeOpacity={0.8}
        onPress={()=> markcategory(index,category.vehicleType,)} 
        
        >
            <View style={{backgroundColor:'white',marginRight:25,width:110,
height:70,justifyContent:'center',alignItems:'center',
borderRadius:10,borderWidth:2,borderColor:selectedBtnIndex == index?('blue'):('#fff')}}>
    <Image source={category.image_} style={styles.classimage}/>
   
</View>

        </TouchableOpacity>
    )
}
const addBooking=()=>{
  db.ref('BusPayment').push({
    Toplace,Fromplace,Price,BusType,Passenger,
    checkin,Status,checkout, Duration,NewPrice,user 
 
  })
  navigation.navigate('RatingScreen')

}
  return (
    <View>
         <View style={styles.headerContainer}
        >
          <View style={{
            backgroundColor: 'white',
            opacity: 0.7, width: 30,
            height: 30, justifyContent: 'center', alignItems: 'center',
            borderRadius: 10,
          }}>
            <Feather name="arrow-left" size={30} color='black'
              onPress={() => navigation.goBack()} />
          </View>
          <Text style={styles.headerTitle}></Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',
    width:'100%',height:60,}}>
      <Text>{Fromplace}</Text>
      <View style={{flexDirection:'row'}}>
      <Feather name="minus" size={20} color='black'/>
          <MaterialCommunityIcons name='bus-side' size={30}/>
          <Feather name="minus" size={20} color='black'/>
      </View>
      <Text>{Toplace}</Text>
    </View>
    <Formik
        initialValues={{cardNumber:'',cardName:'',CVV:'',Expiry:''}}
        validationSchema={ReviewSchem}
        onSubmit={(values,action)=>{
            action.resetForm()
            addCard(values)
        }}
        >
            {(props)=>(
                <ScrollView>
           <View style={{padding:10}}>
               <Text>Card Number</Text>
               <TextInput
               placeholder='number'
               style={styles.inputs}
                
               keyboardType='numeric'
               onChangeText={props.handleChange('cardNumber')}
             value={props.values.cardNumber}
             onBlur={props.handleBlur('cardNumber')}
               />
                <Text style={{color:'red',marginTop:-15,paddingVertical:10}}>{props.touched.cardNumber && props.errors.cardNumber}</Text>
                <Text>Cardholder Name</Text>
               <TextInput
               placeholder='Name'
               onChangeText={props.handleChange('cardName')}
               value={props.values.cardName}
               onBlur={props.handleBlur('cardName')}
               style={styles.inputs}
               />
                <Text style={{color:'red',marginTop:-15,paddingVertical:10}}>{props.touched.cardName && props.errors.cardName}</Text>
               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
               <Text>Expiry Date</Text>  
               <Text>CVV</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
             <View>
               <TextInput
               placeholder='Expiry'
               keyboardType='numeric'
               onChangeText={props.handleChange('Expiry')}
               value={props.values.Expiry}
               onBlur={props.handleBlur('Expiry')}
               style={styles.inputs}
               />
                 <Text style={{color:'red',marginTop:-15,paddingVertical:10}}>{props.touched.Expiry && props.errors.Expiry}</Text>
                 </View>
                 <View>
               <TextInput
               placeholder='CVV'
               keyboardType='numeric'
               style={styles.inputs}
               onChangeText={props.handleChange('CVV')}
               value={props.values.CVV}
               onBlur={props.handleBlur('CVV')}
               />
               <Text style={{color:'red',marginTop:-15,paddingVertical:10}}>{props.touched.CVV && props.errors.CVV}</Text>
               </View>
                   </View>
        
                   <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingLeft:50}}>
                       <Button 
                       title='Add Card'
                       onPress={props.handleSubmit}/>
                           

                       {/* <TouchableOpacity onPress={addBooking()}>
                       <Text>Add Card</Text>
                       </TouchableOpacity> */}
                   </View>
                   <Text>Save card details for future payment</Text>
                   <Text>Other Payments Method</Text>
        <View style={{flexDirection:'row',top:10}}>

<FlatList
  keyExtractor={(_,key)=>key.toString()}
  horizontal
   showsHorizontalScrollIndicator={false}
   contentContainerStyle={{ paddingLeft:20}}
  data={Vehicle}
  renderItem={({item,index})=><Aminities category={item} index={index}/>}
  />

{/* {
    Booking.map((element)=>(
        <Text>{newPrice=newPrice + element.Price}</Text>
    ))
} */}
</View>

           </View>
           </ScrollView> )}</Formik>
           <View style={{width:'100%',justifyContent:'center',alignItems:'center',padding:10}}>
<TouchableOpacity style={styles.signinButton}
                onPress={()=>addBooking()} >
                  <Text style={styles.signinButtonText}
                  >Pay</Text>
              </TouchableOpacity>
            </View>
    </View>
  )
}

export default ViewRating

const styles = StyleSheet.create({
    headerContainer: {
        top: 10,
        flexDirection: 'row', justifyContent: 'space-between',
        alignContent: 'center'
    
    
      },
      card:{
        borderWidth:1,
        borderColor:'black',
        width:"100%",
        height:180,
        borderRadius:10,
    }
    ,header: {
        width:'100%',
        height:50,
        paddingVertical: 10,
        // borderRadius:10,
        alignItems:'center',
        backgroundColor: '#0225A1',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginBottom:12,
        justifyContent:'center',
       
        },
        input: {
            height: 40,
            width: '100%',
            margin: 12,
            borderWidth: 1,
            paddingHorizontal: 10
          },
          inputs:{
            borderBottomColor:'black',
            height:40,
             flex:0.8,
            paddingLeft:10,
            backgroundColor:'#eee'
        },
        classimage:{
            height:60,
            width:100
        },
        signinButton:{
          backgroundColor:'#fff',
          borderWidth:1,
          marginHorizontal:20,
          height:40,
          justifyContent:'center',
          alignItems:'center',
          marginTop:20,
          width:300,
      },
      signinButtonText:{
          fontSize:18,
          lineHeight:18 * 1.4,
          color:'#000',
          
      },
})