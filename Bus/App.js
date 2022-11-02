import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,TextInput,Button} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons"

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/Screens/SplashScreen';
import WelcomeScreen from './src/Screens/WelcomeScreen';
import SignIn from './src/Screens/SignIn';
import SignUp from './src/Screens/SignUp';
import ForgetPassword from './src/Screens/ForgetPassword';
import HomeScreen from './src/Screens/HomeScreen';
import TabScreen from './src/Screens/TabScreen';
import Profile from './src/Screens/Profile';
import TutorProfile from './src/Screens/TutorProfile';
import RatingScreen from './src/Screens/RatingScreen';
import ViewRating from './src/Screens/ViewRating';
import StudentProfile from './src/Screens/StudentProfile';
import Adminlogin from './src/Screens/Adminlogin';
import AdminHome from './src/Screens/AdminHome';
import AdminView from './src/Screens/AdminView';


const Stack = createNativeStackNavigator()
export default function App() {
//   const [signedIn,setSignedIn]=useState(false)

//   auth.onAuthStateChanged((user)=>{
//     if(user){
//         setSignedIn(true);
//        console.log(user.uid,"user------------")
     
//     }else{
     
//         setSignedIn(false);
//     }
// });
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
    
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="HomeScreen" component={TabScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="TutorProfile" component={TutorProfile} />
      <Stack.Screen name="StudentProfile" component={StudentProfile} />
      <Stack.Screen name="RatingScreen" component={RatingScreen} />
      <Stack.Screen name="ViewRating" component={ViewRating} />
      <Stack.Screen name="Adminlogin" component={Adminlogin} />
      <Stack.Screen name="AdminHome" component={AdminHome} />
      <Stack.Screen name="AdminView" component={AdminView} />
        <Stack.Screen name="Splash" component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
