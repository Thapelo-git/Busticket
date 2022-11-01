import { StyleSheet, Text, View,TextInput ,TouchableOpacity} from 'react-native'
import React from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather'
import { db,auth } from './Firebase';
const RatingScreen = ({navigation,route}) => {
    const [Ratingnumber,setRating]=useState(0)
    const [Comment,setComment]=useState('')
    const [Key,setKey]=useState(route.params.key)
    ratingCompleted=(rating)=>{
        // console.log("Rating is: " + rating)
        setRating(rating)
      }
      const updateComment = () => {
        db.ref('RequestTutor').child(Key).update({Ratingnumber,Comment})
          .then(()=>db.ref('RequestTutor').once('value'))
          .then(snapshot=>snapshot.val())
          .catch(error => ({
            errorCode: error.code,
            errorMessage: error.message
          }));
     
  
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
     <AirbnbRating
  count={5}
  reviews={["Terrible", "Bad", "Okay",  "Good", "Great", ]}
  defaultRating={0}
  rating={0}
  onFinishRating={(rating)=>ratingCompleted(rating)}
  size={50}
/>
 {/* <Rating
          type='heart'
          ratingCount={3}
          imageSize={40}
          showRating
          defaultRating={1}
          rating={1}
          onFinishRating={(rating)=>ratingCompleted(rating)}
        /> */}
        <View style={{alignItems:'center',padding:15}}>
<Text>{Ratingnumber}/5 </Text>
<Text>Any Comment</Text>
<View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    {/* <Feather name="user" size={22}
                    color='#000'
                    style={{marginRight:10}}/> */}
                    
                    <TextInput placeholder="Comment"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    onChangeText={(text)=>setComment(text)}
                    
                    value={Comment}
                    
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.signinButton}
                                 onPress={()=>updateComment()}
                          
                             >
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