import React,{useState,useEffect} from 'react'

import { SafeAreaView, StyleSheet, Text, View,TextInput,FlatList 
    ,TouchableOpacity,Image,ScrollView,Animated,Dimensions} from 'react-native'

    import BottomSheet from 'react-native-gesture-bottom-sheet'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
const deviceHeight=Dimensions.get("window").height
const { width } = Dimensions.get("screen")
const cardWidth = width / 1.8
import { auth,db } from './Firebase.jsx'
import { Divider } from 'react-native-elements'
const ModelSearch = ({navigation,bottomopen}) => {
  const user = auth.currentUser.uid;
  const [fullame, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [PhoneNum, setPhonenumber] = useState('')
    const [searchtext,setSearchtext] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [Student, setStudent] = useState([])

  

    const searchFilterFunction = (text) => {
      if (text) {
          const newData = masterDataSource.filter(function (item) {
              const itemData = item.location? item.location.toUpperCase()
                  : ''.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;

          })
          setFilteredDataSource(newData);
          setSearchtext(text)
      } else {
          setFilteredDataSource(masterDataSource);
          setSearchtext(text)
      }
  }
  const updateAccept = (key,Avalability,Gender,Price,StartDate,Subject,name,location,email) => {
     
    // db.ref('RequestTutor').push({
    //     Status:'Pending',fullame,Email,PhoneNum,
    //     key,Avalability,Gender,Price,StartDate,Subject,
    //     name,location,email,
    //   })

}

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
            <View style={{ justifyContent: 'center',  padding: 8,marginHorizontal:10 }}>
            <TouchableOpacity style={styles.signinButton}
        >
          <Text style={styles.signinButtonText}
          
          >Request</Text>
      </TouchableOpacity>
            </View>
            </View>
     </>)
}
    return (
        <SafeAreaView >
          <Animated.View>
          <BottomSheet
          hasDraggableIcon
          ref={bottomopen}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent"
            },
            draggableIcon: {
              backgroundColor: "#000"
            }
          }}
          height={deviceHeight * 0.6}
          >
          <View style={{
                marginTop: 20,
                flexDirection: 'row',
                paddingHorizontal: 20,
            }}>
                <View style={styles.inputContainer}>

                    <Ionicons name="search" size={24} />

                    <TextInput
                        style={{ fontSize: 18, flex: 1, marginLeft: 10 }}
                        
                        placeholder="Search by City"
                        onChangeText={(text) => searchFilterFunction(text)} />
                  
                </View>
            </View>
        <FlatList
                keyExtractor={(_, key) => key.toString()}
                vertical
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 20 }}
                data={filteredDataSource}
                renderItem={({ item, index }) => <Card element={item} index={index} />}
            />
     
        
     </BottomSheet>
   </Animated.View>
    
        </SafeAreaView>
    )
}

export default ModelSearch

const styles = StyleSheet.create({
    inputContainer:{
      
        height:50,
        width:'100%',
        borderRadius:10,
        // borderWidth:1,
        flexDirection:'row',
        backgroundColor:'#eee',
        alignItems:'center',
        paddingHorizontal:20, 
        
        
    },
    header: {
        width:'100%',
        height:20,
        paddingVertical: 30,
        // borderRadius:10,
        alignItems:'center',
        backgroundColor: '#0225A1',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginBottom:12
        },
    container:{
        // padding:20,
        // height:'100%',
        // marginTop:20,
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
      // width:cardWidth*1.5,
      // marginRight:20,

      // marginHorizontal:10,

      // borderRadius:15,
      // elevation:15,
      // backgroundColor:COLORS.white,
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
