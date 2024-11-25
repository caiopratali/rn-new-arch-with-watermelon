import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { database } from '../../database';
import { Input } from '../../components/Input';
import { Task, TaskProps } from '../../components/Task';
import { TaskModel } from '../../database/model/TaskModel';

export function Home() {

  const [newTaskName, setNewTaskName] = useState('');
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  async function handleAddTask() {
    try {
      const taskCollection = database.get<TaskModel>('tasks');

      const task = await database.write(async () => {
        const newTask = await taskCollection.create(( newTask ) => {
          newTask.name = newTaskName,
          newTask.isComplete = false
        });

        return newTask
      });

      setTasks([...tasks, task]);

      setNewTaskName('');
    } catch (error) {
      console.log(error);
    }
  }

  async function handleToggleTaskCompletion(id: string) {
    try {
      const taskCollection = database.get<TaskModel>('tasks');

      const task = await taskCollection.find(id);

      await database.write(async () => {
        await task.update((selectedTask) => {
          selectedTask.isComplete = !selectedTask.isComplete
        })
      });

      const tasks = await taskCollection.query().fetch();

      setTasks(tasks);
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function loadTasks() {
      try {
        const taskCollection = database.get<TaskModel>('tasks');
  
        const tasks = await taskCollection.query().fetch();

        setTasks(tasks);
      } catch (error) {
        console.log(error);
      }
    }

    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Input 
        autoComplete='off'
        value={newTaskName}
        autoCorrect={false}
        placeholder='Nova tarefa' 
        onChangeText={setNewTaskName} 
        onSubmitEditing={handleAddTask}
      />

      <FlatList 
        data={tasks}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <Task 
            name={item.name}
            isComplete={item.isComplete}
            onPress={() => handleToggleTaskCompletion(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#FFF',
  }
});
