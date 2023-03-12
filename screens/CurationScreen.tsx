import React from "react";
import {useState} from "react";
import { Stack, TextInput, IconButton, Button, Spacer, AppBar, HStack, Flex } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, View } from 'react-native';
{/* use "npm install" for checkboxes*/}
import Checkbox from 'expo-checkbox';
import { SafeAreaProvider } from "react-native-safe-area-context";
interface HomeScreenProps {
    navigation: any
}

const CurationScreen = (props: HomeScreenProps) => {
    const [isChecked1, setChecked1] = useState(false);
    const [isChecked2, setChecked2] = useState(false);
    const [isChecked3, setChecked3] = useState(false);
    const [isChecked4, setChecked4] = useState(false);
    const [isChecked5, setChecked5] = useState(false);
    const [isChecked6, setChecked6] = useState(false);
    return (
        <SafeAreaProvider>
        <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked1}
          onValueChange={setChecked1}
          color="indigo"
        />
        <Text style={styles.paragraph}>Interest 1</Text>
      </View>

      <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked2}
          onValueChange={setChecked2}
          color="indigo"
        />
        <Text style={styles.paragraph}>Interest 2</Text>
      </View>

      <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked3}
          onValueChange={setChecked3}
          color="indigo"
        />
        <Text style={styles.paragraph}>Interest 3</Text>
      </View>

      <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked4}
          onValueChange={setChecked4}
          color="indigo"
        />
        <Text style={styles.paragraph}>Interest 4</Text>
      </View>

      <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked5}
          onValueChange={setChecked5}
          color="indigo"
        />
        <Text style={styles.paragraph}>Interest 5</Text>
      </View>

      <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked6}
          onValueChange={setChecked6}
          color="indigo"
        />
        <Text style={styles.paragraph}>Interest 6</Text>
      </View>
      
      <Button title="Next" color="indigo" />
      </SafeAreaProvider>

      
  )

 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 16,
      marginVertical: 32,
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    paragraph: {
      fontSize: 15,
    },
    checkbox: {
      margin: 8,
    },
  });
export default CurationScreen