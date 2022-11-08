import { StyleSheet, Text, View ,Image,Pressable,Button,TouchableOpacity} from 'react-native'
import React,{useEffect} from 'react'
import { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from 'moment'
import { Divider } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
const SplashScreen = ({navigation,route}) => {
  const [Toplace,setToplace]=useState(route.params.Toplace)
  const [Fromplace,setFromplace]=useState(route.params.Fromplace)
  const [Price,setPrice]=useState(route.params.Price)
  const [BusType,setBusType]=useState(route.params.BusType)
  const [Passenger,setPassenger]=useState(1)
  const [Seats,setSeats]=useState(route.params.Seats)
  const [Buskey,setBuskey]=useState(route.params.buskey)
  const [checkin,setCheckin]=useState(route.params.checkin)
  const [checkout,setCheckout]=useState(moment(new Date()).add(1,'days').format('YYYY/MM/DD'))
  var datetoday= new Date()
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setCheckout(moment(date).format('YYYY/MM/DD') )
    // console.warn("A date has been picked: ", date);//8152486760 pin:2022
    hideDatePicker();
  };
  const [Duration,setDuration]=useState('Daily')
  const Btn =[
    {id:'1',name:'Daily',backgroundColor:"#1adb24"},
    {id:'2',name:'Weekly',backgroundColor:"#1adb24"},
    {id:'3',name:'monthly',backgroundColor:"#1adb24"},
    
  ]
  const [ selectedBtnIndex,setSelectedBtnIndex] = useState(0);
  const  [categoryname,setCategoryname]=useState('')
  const  [categorycolor,setCategorycolor]=useState('')
  const markcategory=(key,categoryname,categorycolor)=>{
    setSelectedBtnIndex(key)
    setDuration(categoryname)
    setCategorycolor(categorycolor)
   }
   const  [NewPrice,setNewPrice]=useState(0)
   var a =moment(checkout)
      var b =moment(checkin)
      
     var diff=0
  return (
    <View style={styles.container}>
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
        <View style={{width:'100%',height:60,borderWidth:0.5,borderRadius:20,borderColor:'#0225A1',
        flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          {Btn.map((category,index)=>(<>
                <TouchableOpacity key={index} activeOpacity={0.8}
                onPress={()=> markcategory(index,category.name,category.backgroundColor)} 
                
                >
                <View style={{
                    backgroundColor:selectedBtnIndex == index
                    ?(category.backgroundColor)
                    :('gainsboro'),
                    ...styles.categoryBtn,
                }}>
               <Text style={{
                        fontSize:15,fontWeight:'bold',
                        color:selectedBtnIndex == index?'#fff' :'grey'
                    }}>{category.name}</Text>
                   
                </View>
                </TouchableOpacity>
                        
                      
                   </>
            ))}
          </View>
          <Divider style={{alignItems:'flex-start',alignSelf:'flex-start',marginVertical:10,
                        justifyContent:'flex-start',width:100}}/>
                        {
                          Duration !== 'Daily'?(
                            <>
                        <Text style={{fontSize:21,fontWeight:'bold'}}>5% OFF</Text>
                         <Divider style={{alignItems:'flex-start',alignSelf:'flex-start',marginVertical:10,
                        justifyContent:'flex-start',width:100}}/>
                        <Text>Select finish  Date</Text>
                                      <View style={{
                                flexDirection:'row',alignItems:'center',justifyContent:'space-around'}} >
                              {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}
                              <TouchableOpacity style={styles.datebutton} 
                          onPress={()=>showDatePicker()} >
                          
                       
                          <FontAwesome name='calendar' size={20}/>
                          </TouchableOpacity>
                          <Text>{checkout}</Text>
                        <DateTimePickerModal
                          isVisible={isDatePickerVisible}
                          mode="date"
                          minimumDate={new Date()}
                          onConfirm={handleConfirm}
                          onCancel={hideDatePicker}
                        />
                   </View>
                            </>
                          ):(<></>)
                        }
           <Text>Number of Passenges</Text>
        <View style={{width:80}}>
               
               <View style={{flexDirection:'row',justifyContent:'space-between',
             borderRadius:10,padding:10,alignItems:'center',backgroundColor:'#EDEDED',
             elevation:2,}}>
                         <Pressable style={[
                           styles.buttonAdding,{backgroundColor: '#fff',flexDirection:"row"}
                         ] }
                       onPress={()=>setPassenger(Math.min(Seats,Passenger+1))}>
                         <Feather
                                name="plus" size={22}
                                color='black'
                                />
                     
                         </Pressable>
                         <Text style={{fontSize:21}}> {Passenger} </Text>
                         <Pressable style={[
                           styles.buttonAdding,{backgroundColor: '#fff',flexDirection:"row"}
                         ] }
                       onPress={()=>setPassenger(Math.max(1,Passenger-1))}>
                         <Feather
                                name="minus" size={22}
                                color='black'
                                />
                     
                         </Pressable>
         
                         </View>
                         </View>
                        
                         <Text>{diff=(a.diff(b,'days'))} days</Text>
                         <View style={{paddingVertical:18,paddingHorizontal:18}}>
                <Text style={{fontSize:21,fontWeight:'bold'}}>Total Fee  R</Text>
                <View style={{justifyContent:'space-between',
    borderRadius:10,padding:10,alignItems:'center',backgroundColor:'#EDEDED',
    elevation:2,}}>
      <Text style={{fontSize:25}}>{(Price * Passenger)*diff}</Text>
    </View>
    </View>
    <TouchableOpacity style={styles.signinButton}
                onPress={()=>navigation.navigate('ViewRating',{Price:Price,Fromplace:Fromplace,
                Toplace:Toplace,BusType:BusType,checkin:checkin,Passenger:Passenger
                ,checkout:checkout,Duration:Duration,NewPrice:(Price * Passenger)*diff,
                Seats:Seats,Buskey:Buskey})} >
                  <Text style={styles.signinButtonText}
                  >Proceed</Text>
              </TouchableOpacity>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
      padding:20,
        // flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
      },
      image:{
        height:150,
        width:210,
        
      },
      signinButton:{
        backgroundColor:'#fff',
        borderWidth:1,
        marginHorizontal:20,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
    },
    signinButtonText:{
        fontSize:18,
        lineHeight:18 * 1.4,
        color:'#000',
        
    },
      headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    headerTitle: {
        fontSize: 20,
        lineHeight: 20 * 1.4,  
        textAlign: 'center'
    
    },
      datebutton:{
        height:60,
        width:100,
        borderRadius:10,
        borderWidth:1,
        borderColor: "rgba(0,0,0,.2)",
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    
      },
      categoryBtn:{
        height:45,
        width:105,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:5,
        flexDirection:'row',
      
      },
})