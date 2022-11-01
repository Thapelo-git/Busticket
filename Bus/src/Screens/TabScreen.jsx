import { View, Text } from 'react-native'
import React, {Component} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HomeScreen from './HomeScreen';
import Profile from './Profile';
import ResultsScreen from './ResultsScreen';
const Tab = createMaterialBottomTabNavigator()
const TabScreen = () => {
    return (
      <Tab.Navigator
      initialRouteName="Home"
      activeColor="#EC8F05"
      barStyle={{
        backgroundColor:'#fff',
          borderRadius: 15, elevation: 6, alignItems:'center', justifyContent: 'center', position:'absolute', marginVertical:20,marginHorizontal:25, height:65,paddingBottom:10, paddingLeft:10, paddingRight:10,bottom:20, paddingTop:10
      }}
      
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
          <FontAwesome name="search" color={color} size={24} />
          ),
        }}
      />
     
      <Tab.Screen
        name="Results"
        component={ResultsScreen}
        options={{
          tabBarLabel: 'Results',
          tabBarIcon: ({ color }) => (
            <Ionicons name="documents" color={color} size={24} />
          
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'profile',
          tabBarIcon: ({ color }) => (
          <FontAwesome name="user" color={color} size={24} />
          ),
        }}
      /> 
      </Tab.Navigator>
    )
  }
  
  export default TabScreen