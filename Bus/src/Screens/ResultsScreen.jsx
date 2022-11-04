
import React,{useEffect,useState} from 'react'
import {
    SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity,
    FlatList, Dimensions, ImageBackground, StatusBar,  ActivityIndicator
} from 'react-native'


import { ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { auth,db } from './Firebase'
import { Divider } from 'react-native-elements'
import Ticket from './Ticket'
import History from './History'
const ResultsScreen = ({navigation}) => {
  const [page,setPage]=useState(0)
    const [filteredDataSource, setFilteredDataSource] = useState();
    const [Tutor, setTutor] = useState([]);
    const [Student, setStudent] = useState([])
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
                
                const text=user
                if(text){
                 const newData = Student.filter(function(item){
                     const itemData = item.user ? item.user
                     :'';
                     const textData = text;
                     return itemData.indexOf( textData)>-1;
     
                 })
                 setStudent(newData)
                
               }
               const CurrentUser=user
               if(CurrentUser){
                const newInfor = Student.filter(function(item){
                    const itemData = item.TutorKey ? item.TutorKey
                    :'';
                    const textData = CurrentUser;
                    return itemData.indexOf( textData)>-1;
    
                })
                setTutor(newInfor)
               
              }

            })
        })
    }, [])
    const Card = ({ element, index }) => {
        return (
           
                <>
                <View style={{ margin: 20,backgroundColor: '#fff',elevation: 3 }}>
           <View style={{width:'100%'}}>
                      <View style={{ backgroundColor: 'gray', justifyContent: 'flex-start', flexDirection: 'row', padding: 8, alignItems:'center', borderBottomRightRadius:10}}>
                       
                        <Text style={{color: '#fff'}}>
                          Location
                        </Text>
                        <Text style={{color: '#fff'}}>
                          {" "}{element.location}
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
                  <Text>Your Status</Text>
                  {
                    element.Status =='Pending'?(
                        <Text style={{color:'blue'}}>{element.Status}</Text>
                    ):(
                        
                            element.Status =='Accepted'?(
                                <View style={{ justifyContent: 'center',  padding: 8,marginHorizontal:10 }}>
                                    <Text style={{color:'green'}}>{element.Status}</Text>
                                    <Text>Please Rate Tutor after sessions</Text>
                                <TouchableOpacity style={styles.signinButton}
                                onPress={()=>navigation.navigate('RatingScreen',{key:element.key})}
                          
                             >
                              <Text style={styles.signinButtonText}
                              
                              >Rate</Text>
                          </TouchableOpacity>
                                </View>
                            ):(<>
                              <Text style={{color:'red'}}>{element.Status}</Text>
                              </>)
                        
                    )
                  }
           
                  </View>
                </>
           
        )
          
    }
    const updateAccept = (key,status) => {
      db.ref('RequestTutor').child(key).update({Status:status})
        .then(()=>db.ref('RequestTutor').once('value'))
        .then(snapshot=>snapshot.val())
        .catch(error => ({
          errorCode: error.code,
          errorMessage: error.message
        }));
   

  }
    const NewCard = ({ element, index }) => {
        return (
           
                <>
                <View style={{ margin: 20,backgroundColor: '#fff',elevation: 3 }}>
           <View style={{width:'100%'}}>
                      <View style={{ backgroundColor: 'gray', justifyContent: 'flex-start', flexDirection: 'row', padding: 8, alignItems:'center', borderBottomRightRadius:10}}>
                       
                        <Text style={{color: '#fff'}}>
                          Location
                        </Text>
                        <Text style={{color: '#fff'}}>
                          {" "}{element.location}
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
                     name of student:  {element.CurrentName}
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
                      <Text>Student Email: </Text>
                      <Text style={{color:'blue', fontSize:12}}>
                        {element.Email} 
                      </Text>
                    </View>

                    <Divider style={{width: 170, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>

                  {/* location */}
 
                  {/* description */}
                 
                  {
                    element.Status =='Pending'?(
                        <View style={{justifyContent:'center',flexDirection:'row',marginVertical:10,}}>
                        <TouchableOpacity style={{borderWidth:2,
                            backgroundColor:'#fff',marginHorizontal:10,
                            borderColor:'green',width:70,height:40,
                            justifyContent:'center',alignItems:'center'
                          }} 
                          onPress={()=>updateAccept(element.key,'Accepted')}
                        >
                        <Text style={{color:'green'}}>Accept</Text>
                        </TouchableOpacity >
                        <TouchableOpacity style={ { borderWidth:2,
                            backgroundColor:'#fff',marginHorizontal:10,
                            borderColor:'red',width:70,height:40,
                            justifyContent:'center',alignItems:'center'
                          }}  
                          onPress={()=>updateAccept(element.key,'Rejected')}
                        >
                        <Text style={{color:'red'}}>Reject</Text>   
                        </TouchableOpacity>
                         </View>
                    ):(
                        
                            element.Status =='Accepted'?(
                                <View style={{ justifyContent: 'center',  padding: 8,marginHorizontal:10 }}>
                                    <Text style={{color:'green'}}>{element.Status}</Text>
                                    <Text>View Your Student Rating</Text>
                                <TouchableOpacity style={styles.signinButton}
                              onPress={()=>navigation.navigate('ViewRating',{Comment:element.Comment,
                              Ratingnumber:element.Ratingnumber})}
                             >
                              <Text style={styles.signinButtonText}
                              
                              >View</Text>
                          </TouchableOpacity>
                                </View>
                            ):(<>
                              <Text style={{color:'red'}}>{element.Status}</Text>
                              </>)
                        
                    )
                  }
           
                  </View>
                </>
           
        )
          
    }
  return (
    <View>
              <View style={styles.headerContainer}
            >
     <Text style={styles.headerTitle}>Feedback</Text>
            </View>
            <View style={{justifyContent:'center',alignItems:'center'}}>
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',
    width:250,height:60,}}>
          <TouchableOpacity style={{width:130,height:45,borderColor:page === 0?'#3EA055':'gainsboro',justifyContent:'center',
        alignItems:'center',borderWidth:1}} 
        onPress={()=>setPage(0)}>
              <Text style={{color:page===0?'#3EA055':'gainsboro',fontWeight:'bold'}}>Paid Tickets</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width:130,height:45,borderColor:page === 1?'#3EA055':'gainsboro',justifyContent:'center',
        alignItems:'center',borderWidth:1}} 
        onPress={()=>setPage(1)}>
              <Text style={{color:page===1?'#3EA055':'gainsboro',fontWeight:'bold'}}>History</Text>
          </TouchableOpacity>
 
      </View>
      <View style={{
    width:'100%',}}>
          {
            page === 0?(<Ticket navigation={navigation}/>):(null)
        }
      {
            page === 1?(<History/>):(null)
        }
    
        
        
        </View>
      
        </View>
       

    </View>
  )
}

export default ResultsScreen

const styles = StyleSheet.create({
    signinButton:{
        backgroundColor:'#4bb543',
        borderRadius:8,
        marginHorizontal:20,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
    },
    signinButtonText:{
        fontSize:18,
        lineHeight:18 * 1.4,
        color:'#fff',
        
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
})