import React,{useEffect,useState} from 'react'
import {
    SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity,
    FlatList, Dimensions, ImageBackground, StatusBar,  ActivityIndicator
} from 'react-native'
import { auth,db } from './Firebase'
import { Divider } from 'react-native-elements'
const Ticket = () => {
    const [Tutor, setTutor] = useState([]);
    const [Student, setStudent] = useState([])
    const CurrentID = auth.currentUser.uid;
    useEffect(() => {
        db.ref('/BusPayment').on('value', snap => {

            const Student = []
            snap.forEach(action => {
                const key = action.key
                const data = action.val()
                Student.push({
                    key:key,BusType:data.BusType,checkout:data.checkout,
                    Status:data.Status,user:data.user,Email:data.Email,PhoneNum:data.PhoneNum,

                })
                
                const text=CurrentID
                if(text){
                 const newData = Student.filter(function(item){
                     const itemData = item.user ? item.user
                     :'';
                     const textData = text;
                     return itemData.indexOf( textData)>-1;
     
                 })
                 setStudent(newData)
                
               }


            })
        })
    }, [])
    const updateAccept = (key,status) => {
        db.ref('RequestTutor').child(key).update({Status:status})
          .then(()=>db.ref('RequestTutor').once('value'))
          .then(snapshot=>snapshot.val())
          .catch(error => ({
            errorCode: error.code,
            errorMessage: error.message
          }));
     
  
    }
    const Card = ({ element, index }) => {
        return (
           
                <>
                <View style={{ margin: 20,backgroundColor: '#fff',elevation: 3 }}>
           <View style={{width:'100%'}}>
                      <View style={{ backgroundColor: 'gray', justifyContent: 'flex-start', flexDirection: 'row', padding: 8, alignItems:'center', borderBottomRightRadius:10}}>
                       
                        <Text style={{color: '#fff'}}>
                          Valid until 
                        </Text>
                        <Text style={{color: '#fff'}}>
                          {" "}{element.checkout}
                        </Text>
                      </View>
                    </View>

                    <Divider style={{width: 90, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>

                    {/* event type */}
                    <View style={{flexDirection:'row',}}>
                    <View style={{ backgroundColor: '#fff', justifyContent: 'flex-end', flexDirection: 'row', padding: 8, alignItems:'center'}}>
                      {/* <Ionicons name="documents" color='#333' size={20} /> */}
                      <Text style={{paddingHorizontal: 5,color:'#333'}}>
                       
                      </Text>
                    </View>
                    <View style={{ backgroundColor: '#fff', justifyContent:'flex-start', flexDirection: 'row', padding: 8, alignItems:'center'}}>
                    
                      <Text style={{paddingHorizontal: 5,color:'#333'}}>
                       {element.Avalability}  Tutor
                      </Text>
                    </View>
                    </View>
                    <Divider style={{width: 120, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>

                    {/* date */}
                    <View style={{ backgroundColor: '#fff', justifyContent: 'flex-end', flexDirection: 'row', padding: 8, alignItems:'center' }}>
                      {/* <Feather
                        name="calendar" size={20}
                        style={{ paddingHorizontal: 5 }}
                        color='blue'
                      /> */}
                      <Text>R:</Text>
                      <Text style={{color:'blue', fontSize:12}}>
                        {element.Price} per {element.StartDate}
                      </Text>
                    </View>

                    <Divider style={{width: 170, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>

                  {/* location */}
                  <View style={{flexDirection:'row'}}>
                  <View style={{ backgroundColor: '#fff', justifyContent: 'flex-end', flexDirection: 'row', padding: 8 , alignItems:'center'}}>
                    <View>
                    <Text>Name: </Text>
                    <Text style={{color:'#333'}}>
                      {element.fullname}
                    </Text>
                    </View>
                    <View>
                    <Text>Gender: </Text>
                    <Text style={{color:'#333'}}>
                      {element.Gender}
                    </Text>
                    </View>
                  </View>
                  <View style={{ backgroundColor: '#fff', justifyContent:'flex-start', flexDirection: 'row', padding: 8 , alignItems:'center'}}>
                    <View>
                    <Text>Specialist of: </Text>
                    <Text style={{color:'#333'}}>
                      {element.Subject}
                    </Text>
                    </View>
                    
                  </View>
                  </View>
                  <Divider style={{width: 200, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>

                  {/* description */}
                  
                  <Image source={require('../Images/barcode_icon.png')} style={{width:150,height:150}}/>
           
                  </View>
                </>
           
        )
          
    }
  return (
    <View>
             <FlatList
                    keyExtractor={(_, key) => key.toString()}
                   horizontal
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: 20 }}
                    data={Student}
                    renderItem={({ item, index }) => <Card element={item} index={index} />}
                />
    </View>
  )
}

export default Ticket

const styles = StyleSheet.create({})