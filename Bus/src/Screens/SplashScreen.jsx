import { StyleSheet, Text, View ,Image,Pressable,Button} from 'react-native'
import React,{useEffect} from 'react'
import { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from 'moment'
import DateTimePickerModal from "react-native-modal-datetime-picker";
const SplashScreen = ({navigation,route}) => {
  const [Toplace,setToplace]=useState(route.params.Toplace)
  const [Fromplace,setFromplace]=useState(route.params.Fromplace)
  const [Price,setPrice]=useState(route.params.Price)
  const [BusType,setBusType]=useState(route.params.BusType)
  const [Passenger,setPassenger]=useState(0)
  const [checkin,setCheckin]=useState('')
  const [checkout,setCheckout]=useState('')
  var datetoday= new Date()
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };
  return (
    <View style={styles.container}>
                    <View style={{
              flexDirection:'row',alignItems:'center',justifyContent:'space-around'}} >
            <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
                    {/* <RNDateTimePicker
        style={{width: 140}}
        date={checkin}
        display='calendar'
        mode='date'
        
        dateFormat='YYYY/MM/DD'
        positiveButtonLabel='OK'
        minimumDate={datetoday}
       value={new Date()}
       
        // confirmBtnText="Confirm"
        // cancelBtnText="Cancel"
        // customStyles={{
        //   dateIcon: {
        //     position: 'absolute',
        //     left: 0,
        //     top: 4,
        //     marginLeft: 0
        //   },
        //   dateInput: {
        //     marginLeft: 36
        //   }
        //   // ... You can check the source to find the other keys.
        // }}
        onChange={(date) => {setCheckin(date)}}
        
      /> */}
                        {/* <RNDateTimePicker
        style={{width: 140}}
        date={checkout}
        mode="date"
        display='calendar'
        // placeholder="CHECK OUT"
        dateFormat='YYYY/MM/DD'
        positiveButtonLabel='OK'
        minimumDate={datetoday}
        value={new Date()}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        // style={{flex: 1}}
        // customStyles={{
        //   dateIcon: {
        //     position: 'absolute',
        //     left: 0,
        //     top: 4,
        //     marginLeft: 0
        //   },
        //   dateInput: {
        //     marginLeft: 36
        //   }
        //   // ... You can check the source to find the other keys.
        // }}
        onChange={(date) => {setCheckout(date)}}
        
      /> */}

              
           </View>
        <View style={{width:80}}>
               
               <View style={{flexDirection:'row',justifyContent:'space-between',
             borderRadius:10,padding:10,alignItems:'center',backgroundColor:'#EDEDED',
             elevation:2,}}>
                         <Pressable style={[
                           styles.buttonAdding,{backgroundColor: '#fff',flexDirection:"row"}
                         ] }
                       onPress={()=>setPassenger(Math.max(1,Passenger+1))}>
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
                         <View style={{paddingVertical:18,paddingHorizontal:18}}>
                <Text style={{fontSize:21,fontWeight:'bold'}}>PRICE   R</Text>
                <View style={{justifyContent:'space-between',
    borderRadius:10,padding:10,alignItems:'center',backgroundColor:'#EDEDED',
    elevation:2,}}>
      <Text style={{fontSize:25}}>{Price * Passenger}</Text>
    </View>
    </View>
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