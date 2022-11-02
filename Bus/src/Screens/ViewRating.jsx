import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
//AdminView
const ViewRating = ({navigation,route}) => {
  const [Toplace,setToplace]=useState(route.params.Toplace)
  const [Fromplace,setFromplace]=useState(route.params.Fromplace)
  const [Price,setPrice]=useState(route.params.Price)
  const [BusType,setBusType]=useState(route.params.BusType)
  const [Passenger,setPassenger]=useState(route.params.Passenger)
  const [checkin,setCheckin]=useState(route.params.checkin)
  const [checkout,setCheckout]=useState(route.params.checkout)
  const Duration= route.params.Duration
  const NewPrice=route.params.NewPrice
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
})