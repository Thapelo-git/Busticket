import React, { useState, useEffect, useRef } from 'react'
import {
    SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity,
    FlatList, Dimensions, StatusBar,  
} from 'react-native' 
import {Picker} from '@react-native-picker/picker';
import { ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { Divider } from 'react-native-paper';
import { auth,db } from './Firebase';
import ModelSearch from './ModelSearch';
const { width } = Dimensions.get("screen")
const cardWidth = width / 1.8
const HomeScreen = ({navigation}) => {
    const [CurrentName, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [PhoneNum, setPhonenumber] = useState('')
    const [filteredDataSource, setFilteredDataSource] = useState();
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [Student, setStudent] = useState([])

    const user = auth.currentUser.uid;
    useEffect(() => {
        db.ref('/TutorUsers').on('value', snap => {

            const Student = []
            snap.forEach(action => {
                const key = action.key
                const data = action.val()
                Student.push({
                    key: key,
                    Avalability: data.Avalability,
                    fullname:data.fullname,location:data.location,
                    Description:data.Description, Gender:data.Gender,
                    email:data.email,StartDate:data.StartDate,
                    Subject:data.Subject,Price:data.Price
                })
                const text='Available'
                if(text){
                 const newData = Student.filter(function(item){
                     const itemData = item.Description ? item.Description
                     :'';
                     const textData = text;
                     return itemData.indexOf( textData)>-1;
     
                 })
                 setStudent(newData)
                 setFilteredDataSource(newData);
                 setMasterDataSource(newData);
               }
                 
               
               

            })
        })
        db.ref('/TutorUsers/' + user).on('value', snap => {

            setName(snap.val() && snap.val().fullname);
            setPhonenumber(snap.val().phonenumber)
            setEmail(snap.val().email)
            
        })



    }, [])
    const [StudentsList, setStudentsList] = useState([]);
    const [StudentContainer, setStudentContainer] = useState('')
    const FilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.filter(function (item) {
                const itemData = item.Subject ? item.Subject.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;

            })
            setStudentsList(newData)
            setStudentContainer(text)
        }
    }
    const updateAccept = (key,Avalability,Gender,Price,StartDate,Subject,fullname,location,email) => {
     
        db.ref('RequestTutor').push({
            Status:'Pending',fullname,Email,PhoneNum,user,
            TutorKey:key,Avalability,Gender,Price,StartDate,Subject,
            CurrentName,location,Profile:'Student'
          })
  
    }
    const bottomopen = useRef()
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
                  {
                    element.key === user?(<><Text></Text></>):(<>  <View style={{ justifyContent: 'center',  padding: 8,marginHorizontal:10 }}>
                    <TouchableOpacity style={styles.signinButton}
                onPress={()=>updateAccept(element.key,element.Avalability,
                element.Gender,element.Price,element.StartDate,element.Subject,element.fullname,
                element.location,)} >
                  <Text style={styles.signinButtonText}
                  
                  >Request</Text>
              </TouchableOpacity>
                    </View></>)
                  }
                
                  </View>
           </>)
    }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 10 }}>
    <StatusBar
        backgroundColor="#EC8F05"
        barStyle="light-content"
    />
    {/* <View style={styles.headerContainer}
    >

        <Text style={styles.headerTitle}>{ComName} company</Text>
    </View> */}
    <View style={styles.header}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
            //  onPress={() => navigation.navigate('EditProfile', {
            //     email: email, name: ComName, phonenumber: phonenumber
            // })}
            >
                <Image source={{ uri: 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-use-600w-193292033.jpg' }}
                    style={{ height: 50, width: 50, borderRadius: 25 }} />
            </TouchableOpacity>
            <Text style={{
                fontSize: 18, fontWeight: 'bold', marginLeft: 10,
                marginTop: 18
            }}>Welcome </Text>
            <Text style={{
                fontSize: 18, marginLeft: 10,
                marginTop: 18
            }}>{CurrentName}</Text>
        </View>
        {/* <TouchableOpacity onPress={navigation.navigate('Notification')}>
  <Ionicons name="notifications" size={24}/>
  </TouchableOpacity> */}
    </View>

    <View style={{
        marginTop: 20,
        flexDirection: 'row',
        paddingHorizontal: 20,
    }}>
        <TouchableOpacity style={styles.inputContainer}
            onPress={() => bottomopen.current.show()}>

            <Ionicons name="search" size={24} />

            <View
                style={{ fontSize: 18, flex: 1, marginLeft: 10 }}
            ><Text>Search by City</Text></View>


        </TouchableOpacity>
    </View>
 
    <View style={{ paddingVertical: 20 }}>

        <Text style={styles.titles}>Choose by Subject</Text>

        <Picker
            selectedValue={StudentContainer}
            style={{ width: 300, height: 50, backgroundColor: '#eee' }}
            onValueChange={(value, id) => { FilterFunction(value) }}>
            <Picker.Item label="select" value="" />
            <Picker.Item label="Mathematics" value="Mathematics" />
            <Picker.Item label="Physical_Sciences" value="PS" />
            <Picker.Item label="Life_Sciences" value="LS" />
            <Picker.Item label="Natural_Sciences" value="NS" />
            <Picker.Item label="History" value="History" />
            <Picker.Item label="Other" value="Other" />
        </Picker>
        <FlatList
            keyExtractor={(_, key) => key.toString()}
           horizontal
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20 }}
            data={StudentsList}
            renderItem={({ item, index }) => <Card element={item} index={index} />}
        />

<View style={{
        marginTop: 20,
        flexDirection: 'row',
        paddingHorizontal: 20,
    }}>
        <TouchableOpacity style={styles.buttonContainer}
            onPress={() => navigation.navigate('Profile')}>
            
            <View
                style={{ fontSize: 18, flex: 1, marginLeft: 10 }} >
                    <Text>Tell us more about your self</Text></View>
                    <Feather name="arrow-right" size={24} />
        </TouchableOpacity>
    </View>
    </View>
    <ModelSearch bottomopen={bottomopen} navigation={navigation} />

</SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    header: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    inputContainer: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#eee',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    buttonContainer: {
        flex: 1,
        height: 50,
        borderWidth:0.5,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    btnListContainer: {
        marginLeft: -10,

        paddingHorizontal: 10,
        paddingVertical: 30,
        // alignItems:'center'
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
    categoryBtn: {
        height: 45,
        width: 80,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
        flexDirection: 'row',

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
    card: {
        height: 220,
    },
    cardContainer: {
        height: 100,
        width: cardWidth * 1.5,
        marginRight: 20,
        // marginBottom:20,
        marginVertical: 10,
        // marginTop:5,
        borderRadius: 15,
        elevation: 15,
        backgroundColor: '#fff',
        flexDirection: 'row', alignItems: 'center'

    },
    discountcard: {
        flexDirection: 'row', justifyContent: 'center',
        width: '100%',
        height: 110,
        
        alignItems: 'center',
    },

    cardImage: {
        height: 100,
        width: width / 3,
        marginRight: 20,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 10,
    }
})