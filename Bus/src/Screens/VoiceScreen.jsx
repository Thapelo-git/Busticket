import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Speech from 'expo-speech'
const VoiceScreen = () => {
    const [name,setName]=useState('Thapelo Chaba')

    const listAllVoiceOptions=async()=>{
      let voices= await Speech.getAvailableVoicesAsync()
      console.log(voices)
    }
    React.useEffect(listAllVoiceOptions);
    const speakGreeting=()=>{
      const greeting =`Hi ${name}`
      options ={}
      Speech.speak(greeting,options)
    }
  return (
    <View>
        <Ionicons name="chevron-back-outline" size={30}
            />
            <TextInput onChangeText={setName} value={name}/>
            <Button title='Speech' onPress={speakGreeting}/>
      <StatusBar style="auto" />
      <Text>VoiceScreen</Text>
    </View>
  )
}

export default VoiceScreen

const styles = StyleSheet.create({})