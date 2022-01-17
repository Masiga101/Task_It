import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Keyboard
} from 'react-native';

export default function Form({ addTask }) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (inputValue.trim() == '') return setError(true);
    Keyboard.dismiss()
    addTask(inputValue);
    setInputValue('');
  };
  return (
    <View>
      <TextInput
        value={inputValue}
        placeholder="Insert Your next task"
        style={error ? styles.inputError : styles.input}
        onFocus={() => setError(false)}
        onChangeText={(text) => setInputValue(text)}
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <View>
          <Text style={styles.buttonText}>Submit</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  inputError: {
    height: 40,
    margin: 12,
    borderWidth: 3,
    padding: 10,
    borderColor: 'red',
    borderStyle: 'solid',
    borderRadius: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
