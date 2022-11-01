import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { Rating, AirbnbRating } from 'react-native-ratings';
//AdminView
const ViewRating = ({navigation,route}) => {
    const [Comment,setComment]=useState(route.params.Comment)
    const [Ratingnumber,setRatingnumber]=useState(route.params.Ratingnumber)
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
        <AirbnbRating
  count={5}
  reviews={["Terrible", "Bad", "Okay",  "Good", "Great", ]}
  defaultRating={Ratingnumber}
//   rating={0}
//   onFinishRating={(rating)=>ratingCompleted(rating)}
  size={50}
/>
      <Text>Comments</Text>
      <Text>{Comment}</Text>
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