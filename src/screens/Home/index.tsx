import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { Input } from '../../components/Input';
import { Task, TaskProps } from '../../components/Task';

export function Home() {

  const [newTaskName, setNewTaskName] = useState('');
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  function handleAddTask() {
    const newTask = {
        name: newTaskName,
        isComplete: false,
        id: String(new Date().getTime()),
    };

    setTasks([...tasks, newTask]);

    setNewTaskName('');
  }

  function handleToggleTaskCompletion(id: string) {
    const updatedTasks = tasks.map(task => {
        if (task.id === id) {
            return {
                ...task,
                isComplete: !task.isComplete,
            }
        }

        return task;
    });

    setTasks(updatedTasks);
  }

  return (
    <SafeAreaView style={styles.container}>
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
        renderItem={({ item }) => (
          <Task 
            name={item.name}
            isComplete={item.isComplete}
            onPress={() => handleToggleTaskCompletion(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
