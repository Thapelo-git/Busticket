import { StyleSheet, Text, View ,TouchableOpacity,} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { db,auth } from './Firebase';
import Feather from 'react-native-vector-icons/Feather'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { ScrollView } from 'react-native-gesture-handler';
//AdminView
const AdminView = ({navigation,route}) => {
    const [Key,setKey]=useState(route.params.Key)
    const [Description,setDescription]=useState(route.params.Description)
    const [Tutor, setTutor] = useState([]);
    const user = auth.currentUser.uid;
    useEffect(() => {
        db.ref('/RequestTutor').on('value', snap => {

            const Student = []
            snap.forEach(action => {
                const key = action.key
                const data = action.val()
                Student.push({
                    key:key,TutorKey:data.TutorKey,
                    Status:data.Status,fullname:data.fullname,Email:data.Email,PhoneNum:data.PhoneNum,
                    Avalability:data.Avalability,Gender:data.Gender,Price:data.Price,
                    StartDate:data.StartDate,Subject:data.Subject,Profile:data.Profile,
                    name:data.name,location:data.location,email:data.email,user:data.user,CurrentName:data.CurrentName,
                    Comment:data.Comment,Ratingnumber:data.Ratingnumber,
                })
                const text=Key
                if(text){
                 const newData = Student.filter(function(item){
                     const itemData = item.TutorKey ? item.TutorKey
                     :'';
                     const textData = text;
                     return itemData.indexOf( textData)>-1;
     
                 })
                 setTutor(newData)
                 
               }
    
            })
        })
    



    }, [])
    const updateComment = () => {
        db.ref('TutorUsers').child(Key).update({Description:'Unavailable'})
          .then(()=>db.ref('TutorUsers').once('value'))
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
        <View style={{alignItems:'center',padding:15}}>
    <Text>Remove From Tutor List</Text>
  <TouchableOpacity style={styles.signinButton}
                                 onPress={()=>updateComment()}
                          
                             >
                              <Text style={styles.signinButtonText}>Remove</Text>
                          </TouchableOpacity>
                          </View>
                          <View>
        {
            Tutor.map((element)=>{return(
            <View><ScrollView style={{padding:20}}>
            <View style={{alignItems:'center'}}>
            <Text style={{fontWeight:'bold',color:'blue'}}>Ratings from {element.CurrentName}</Text>
            </View>
                  <AirbnbRating
  count={5}
  reviews={["Terrible", "Bad", "Okay",  "Good", "Great", ]}
  defaultRating={element.Ratingnumber}
//   rating={0}
//   onFinishRating={(rating)=>ratingCompleted(rating)}
  size={50}
/>
                <Text>Comments</Text>
                <Text>{element.Comment}</Text>
                </ScrollView></View>
            )})
        }
        </View>
  
    </View>
  )
}

export default AdminView

const styles = StyleSheet.create({
    headerContainer: {
        top: 10,
        flexDirection: 'row', justifyContent: 'space-between',
        alignContent: 'center'
  
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