import React,{useEffect,useState} from 'react'
import {
    SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity,
    FlatList, Dimensions, ImageBackground, StatusBar,  ActivityIndicator,Alert,
} from 'react-native'
//History
import { auth,db } from './Firebase'
import { Divider } from 'react-native-elements'
const Ticket = () => {
    const [Bus, setBus] = useState([]);
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
                    Passenger:data.Passenger,Buskey:data.Buskey
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
        db.ref('/BusPrice').on('value', snap => {

          const Bus = []
          snap.forEach(action => {
              const key = action.key
              const data = action.val()
              Bus.push({
                  key:key,Seats:data.Seats
              })
              setBus(Bus)
            
          })
      })
    }, [])
    const updateBooking = (key, status,buskey ,Passenger) => {
        // Alert.alert('Confirm',' Cancellation of payment must be done at least a day before depature ,there will be no refund',[
        //   {text:'Yes',
        //  onPress:()=>db.ref('BusPayment').child(key).update({Status:status,})
        //  .then(()=>db.ref('BusPayment').once('value'))
        //  .then(snapshot=>snapshot.val())
        //  .catch(error => ({
        //    errorCode: error.code,
        //    errorMessage: error.message
        //  })),
        // },
        // {text:'No'},
        // ]);
        db.ref('BusPayment').child(key).update({Status:status,})
         .then(()=>db.ref('BusPayment').once('value'))
         .then(snapshot=>snapshot.val())
         .catch(error => ({
           errorCode: error.code,
           errorMessage: error.message
         })),
      
        Bus.map(item=>(
       
        buskey == item.key?(
        db.ref('BusPrice').child(buskey).update({Seats:item.Seats+Passenger,})
         .then(()=>db.ref('BusPrice').once('value'))
         .then(snapshot=>snapshot.val())
         .catch(error => ({
           errorCode: error.code,
           errorMessage: error.message
         }))):(<></>)
        
        ))
        
      };
    const Card = ({ element, index }) => {
        return (
            <>
            {
                element.Status == 'Paid'?(
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
          {/* <Text
            style={{fontWeight:'bold',}}
            >  
              Information
          </Text>
          <Text  > 1. Cancellation of
             payment must
             be done at least 2 hours before 
            arrival ,there will be no refund
          </Text> */}
         
          <View style={{alignItems:'center',justifyContent:'center',width:'100%'}}>
          <TouchableOpacity style={{height:30,width:70,justifyContent:'center',borderColor:'red',
          alignItems:'center',borderWidth:0.5}}  onPress={()=>updateBooking(element.key,'Cancelled',element.Buskey,
          element.Passenger)}>
          <Text style={{color:'red'}}>Cancel</Text>
          </TouchableOpacity>
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

export default Ticket

const styles = StyleSheet.create({})