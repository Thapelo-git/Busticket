import React, { useState, useEffect, useRef } from 'react'
import {
    SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity,
    FlatList, Dimensions, StatusBar,  Alert
} from 'react-native' 
import { db,auth } from './Firebase'
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Divider } from 'react-native-paper';
const { width } = Dimensions.get("screen")
const cardWidth = width / 1.8
const AdminHome = ({navigation}) => {
    const [CurrentName, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [PhoneNum, setPhonenumber] = useState('')
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [Student, setStudent] = useState([])

    const user = auth.currentUser.uid;
    useEffect(() => {
        db.ref('/BusPrice').on('value', snap => {

            const Student = []
            snap.forEach(action => {
                const key = action.key
                const data = action.val()
                Student.push({
                    key: key,Fromplace:data.Fromplace,
                    BusType: data.BusType,Toplace:data.Toplace,
                   Price:data.Price
                })
                setStudent(Student)
               
               

            })
        })

    }, [])
    const handleDelete=(key)=>{
      Alert.alert('Confirm','Are you sure you want to delete?',[
        {text:'Yes',
       onPress:()=>db.ref('BusPrice').child(key).remove(),
      },
      {text:'No'},
      ]);
      
  
      }
    const Card = ({ element, index }) => {
        return (
           <>
           <View style={{ margin: 20,backgroundColor: '#fff',elevation: 3 }}>
           <View style={{width:'100%'}}>
                      <View style={{ backgroundColor: '#fff', justifyContent: 'flex-start', flexDirection: 'row', padding: 8, alignItems:'center', borderBottomRightRadius:10}}>
                       
                        <Text >
                          From:
                        </Text>
                        <Text >
                          {" "}{element.Fromplace}
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
                       To:  {element.Toplace}  
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
                        {element.Price}
                      </Text>
                    </View>

                    <Divider style={{width: 170, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>

                  {/* location */}
  
                 
                  {/* description */}
                  <View style={{ justifyContent: 'center',  padding: 8,marginHorizontal:10 }}>
                  <TouchableOpacity onPress={()=>handleDelete(element.key)}>
        <MaterialIcons name='delete' size={25} color='red'/>
        </TouchableOpacity>
                  </View>
                  </View>
           </>)
    }
  const [Fromplace,setFromplace]=useState('')
  const [Toplace,setToplace]=useState('') 
  const [Price,setPrice]=useState('')
  const [BusType,setBusType]=useState('')
  const Seats= 65
  const addPrice = () => {
    
      db.ref('BusPrice').push({
        Seats,
        Fromplace,
        Toplace,
        Price,
        BusType,
      })
   
  
  };
  return (
    <View>
      <View style={{ backgroundColor: '#fff', justifyContent:'flex-start', flexDirection: 'row', padding: 8, alignItems:'center'}}>
      <View>
<Text style={styles.titles}>From:</Text>

<Picker
     selectedValue={Fromplace}
     style={{ width: 160, height: 50, backgroundColor: '#eee' }}
     onValueChange={(text)=>setFromplace(text)}   >
    <Picker.Item label="select" value="" />
    <Picker.Item label="Moletjie" value="Moletjie" />
    <Picker.Item label="Seshego" value="Seshego" />
    <Picker.Item label="Leboakgomo" value="Leboakgomo" />
    <Picker.Item label="Ladana" value="Ladana" />
    <Picker.Item label="Polokwane" value="Polokwane" />
    <Picker.Item label="Turf" value="Turf" />
</Picker>
</View>
<View>
<Text style={styles.titles}>To:</Text>

<Picker
     selectedValue={Toplace}
     style={{ width: 160, height: 50, backgroundColor: '#eee' }}
     onValueChange={(text)=>setToplace(text)}   >
    <Picker.Item label="select" value="" />
    <Picker.Item label="Moletjie" value="Moletjie" />
    <Picker.Item label="Seshego" value="Seshego" />
    <Picker.Item label="Leboakgomo" value="Leboakgomo" />
    <Picker.Item label="Ladana" value="Ladana" />
    <Picker.Item label="Polokwane" value="Polokwane" />
    <Picker.Item label="Turf" value="Turf" />
</Picker>
</View>
      </View>
      <Text style={{marginVertical:10}}>Price </Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    
                    
                    <TextInput placeholder="Price"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    keyboardType='numeric'
                    onChangeText={(text)=>setPrice(text)}
             value={Price}
                    />
                </View>
            </View>
            <View>
<Text style={styles.titles}>Bus Type:</Text>

<Picker
     selectedValue={BusType}
     style={{ width: 200, height: 50, backgroundColor: '#eee' }}
     onValueChange={(text)=>setBusType(text)}   >
    <Picker.Item label="select" value="" />
    <Picker.Item label="Great north" value="Great_north" />
    <Picker.Item label="Madodi" value="Madodi" />
    {/* <Picker.Item label="Leboakgomo" value="Leboakgomo" />
    <Picker.Item label="Ladana" value="Ladana" />
    <Picker.Item label="Polokwane" value="Polokwane" />
    <Picker.Item label="Turf" value="Turf" /> */}
</Picker>
</View>
<View style={{ justifyContent: 'center',  padding: 8,marginHorizontal:10 }}>
                  <TouchableOpacity style={styles.signinButton}
              onPress={()=>addPrice()} >
                <Text style={styles.signinButtonText}>Add </Text>
            </TouchableOpacity>
                  </View>
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

export default AdminHome

const styles = StyleSheet.create({
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
    // headerContainer: {
    //   top: 10,
    //   flexDirection: 'row', justifyContent: 'space-between',
    //   alignContent: 'center'
  
  
    // },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
      paddingHorizontal: 20
  },
  inputContainer:{
    backgroundColor:'#fff',
marginVertical:10,
borderWidth:1,
borderColor:'#000',
justifyContent:'center',
width:150
   },
   inputSubContainer:{
       flexDirection:'row',
       alignItems:'center'
   },
   
})