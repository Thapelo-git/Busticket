import React,{useEffect,useState} from 'react'
import {
    SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity,
    FlatList, Dimensions, ImageBackground, StatusBar,  ActivityIndicator,Alert,
} from 'react-native'
//PastTickets
import { auth,db } from './Firebase'
import { Divider } from 'react-native-elements'
const PastTickets = () => {
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
                    Status:data.Status,user:data.user,NewPrice:data.NewPrice,Duration:data.Duration,
                    checkin:data.checkin,Fromplace:data.Fromplace,Toplace:data.Toplace,
                    Passenger:data.Passenger,
                })
                setStudent(Student)
               


            })
        })
    }, [])
    const updateBooking = (key, status) => {
        Alert.alert('Confirm',' Cancellation of payment must be done at least a day before depature ,there will be no refund',[
          {text:'Yes',
         onPress:()=>db.ref('BusPayment').child(key).update({Status:status,})
         .then(()=>db.ref('BusPayment').once('value'))
         .then(snapshot=>snapshot.val())
         .catch(error => ({
           errorCode: error.code,
           errorMessage: error.message
         })),
        },
        {text:'No'},
        ]);
        
     
        
      };
    const Card = ({ element, index }) => {
        return (
            <>
            {
                element.Status != 'Paid'?(
                <View style={{ margin: 20,}}>
                <View style={{ margin: 20,backgroundColor: '#fff',elevation: 3 }}>
           <View style={{width:'100%'}}>
                      <View style={{ backgroundColor: '#fff', justifyContent: 'flex-start', flexDirection: 'row', padding: 8, alignItems:'center', borderBottomRightRadius:10}}>
                       
                        <View style={{ justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}>
                          <Image  source={require('../Images/bus_icon.jpg')} style={{width:30,height:30}}/>
                        </View>
                        <Text style={{fontWeight:'bold'}}>
                          {" "}{element.BusType}
                        </Text>
                      </View>
                    </View>

                    <Divider style={{width: 90, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>

                    {/* event type */}
                    <View style={{flexDirection:'row',}}>
                    <View style={{ backgroundColor: '#fff', justifyContent: 'flex-end', flexDirection: 'row', padding: 8, alignItems:'center'}}>
                      {/* <Ionicons name="documents" color='#333' size={20} /> */}
                      <Text style={{paddingHorizontal: 5,color:'#333'}}>
                      {element.Fromplace}  {' to'}
                      </Text>
                    </View>
                    <View style={{ backgroundColor: '#fff', justifyContent:'flex-start', flexDirection: 'row', padding: 8, alignItems:'center'}}>
                    
                      <Text style={{paddingHorizontal: 5,color:'#333'}}>
                       {element.Toplace}  
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
                        {element.NewPrice}  
                      </Text>
                    </View>

                    <Divider style={{width: 170, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>

                  {/* location */}
                  <View style={{flexDirection:'row'}}>
                  <View style={{ backgroundColor: '#fff', justifyContent: 'flex-end', flexDirection: 'row', padding: 8 , alignItems:'center'}}>
                    <View>
                    <Text>Duration: </Text>
                    <Text style={{color:'#333'}}>
                      {element.Duration}
                    </Text>
                    </View>
                    <View>
                    <Text>Passenger: </Text>
                    <Text style={{color:'#333'}}>
                      {element.Passenger}
                    </Text>
                    </View>
                  </View>
                  <View style={{ backgroundColor: '#fff', justifyContent:'flex-start', flexDirection: 'row', padding: 8 , alignItems:'center'}}>
                    <View>
                    <Text>Valid until: </Text>
                    <Text style={{color:'#333'}}>
                      {element.checkout}
                    </Text>
                    </View>
                    
                  </View>
                  </View>
                  <Divider style={{width: 2, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>

                  {/* description */}
                  <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                  <Image source={require('../Images/barcode_icon.png')} style={{width:150,height:150}}/>
                  <Text>{element.key}</Text>
                  </View>
                  </View>
                  <View style={{alignItems:'center'}}>
         
         
          <View style={{alignItems:'center',justifyContent:'center',width:'100%'}}>
          {
        element.Status == 'Cancelled'?(
            <Text style={{color:'red',fontWeight:'bold'}}>Cancelled</Text>
        ):(<Text style={{color:'green'}}>{element.Status}</Text>)
      }
          
        
          </View>
          </View>
                </View>
         ):(<></>)}</>
        )
          
    }
  return (
    <View>
             <FlatList
                    keyExtractor={(_, key) => key.toString()}
                   horizontal
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: 10 }}
                    data={Student}
                    renderItem={({ item, index }) => <Card element={item} index={index} />}
                />
    </View>
  )
}

export default PastTickets

const styles = StyleSheet.create({})