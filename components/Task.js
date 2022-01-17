import  React, {useState} from 'react';
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { MaterialIcons  } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function Task({task, deleteTask}) {

const [completePressed, setCompletePressed] = useState(false)

 return  <View style={completePressed ? styles.containerComplete :styles.container} >
 <Pressable
 onPress={() => 
 setCompletePressed(!completePressed)
 }
 >
    <AntDesign style={completePressed && styles.marker} name="checkcircle" size={24} color="grey" />
    </Pressable>
    <Text style={ completePressed  ? styles.taskComplete : styles.task} >{task}</Text>
    <Pressable
    onPress={deleteTask}
    >
    <MaterialIcons style={completePressed && styles.bin}  name="delete" size={24} color="grey" />
     </Pressable>
    </View>

}

const styles = StyleSheet.create({
  container: {
    padding: 6,
    marginTop: 5,
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: 'center',
    backgroundColor: 'white',
    marginRight: 6,
       borderRadius: 7
  },
  containerComplete: {
  backgroundColor: '#EEEADE',
  padding: 6,
    marginTop: 5,
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: 'center',
    marginRight: 6,
       borderRadius: 7
  },  
  marker: {
  color: "green"
  },
  
  bin : {
  color: 'red'
  },
  task: {
  width: '65%',
  margin: 'auto',
  textAlign: 'center',
  fontSize: 14
  },
  
  taskComplete: {
    textDecorationLine: 'line-through',
   width: '65%',
  margin: 'auto',
  color: "#2F2F2F",
  textAlign: 'center'
  }

});
