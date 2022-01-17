import React, { useState, useEffect, useRef } from 'react';
import Constants from 'expo-constants';

import { Text, View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { Card } from 'react-native-paper';

import Task from './components/Task';
import Form from './components/Form';

export default function App() {
  const [userTasks, setUserTasks] = useState([
    'Hello',
    'With this app you can add short text reminders',
    'In form of tasks and mark complete or delete',
    'Pretty straight forward',
  ]);

  const firstUpdate = useRef(true);

  const storeData = async () => {
    AsyncStorage.setItem('@tasks', JSON.stringify(userTasks))
      .then((e) => console.log(userTasks))
      .catch((e) => console.log(`Could not update data ${e.message}`));
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    AsyncStorage.getItem('@tasks')
      .then((val) => {
        if (val != null) {

          return setUserTasks(JSON.parse(val));
        }
      })
      .catch((err) => console.log(`Could not get data ${err.message}`));
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    storeData();
  }, [userTasks]);

  const addTask = async (newTask) => {
    setUserTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (indx) => {
    setUserTasks((prev) => prev.filter((task, index) => index != indx));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TASK IT</Text>
      <ScrollView style={styles.tasksContainer}>
        <View>
          {userTasks.map((task, indx) => (
            <Task task={task} key={indx} deleteTask={() => deleteTask(indx)} />
          ))}
        </View>
      </ScrollView>
      <View>
        <Card style={styles.card}>
          <Form addTask={(e) => addTask(e)} />
        </Card>
      </View>
      <StatusBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebedf5',
    paddingLeft: 8,
    paddingRight: 6,
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 24,
  },

  tasksContainer: {
    padding: 6,
    height: '80%',
    paddingBottom: 10
  },

  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    borderBottomWidth: 2,
  },
  card: {
    marginTop: 10,
    width: '100%',
    paddingBottom: 10,
  },
});
