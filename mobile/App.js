import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";

import TaskInput from "./components/TaskInput";
import Data from "./components/Data";

export default function App() {
  const [taskItems, setTaskItems] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const newTaskHandler = (newTask) => {
    setTaskItems((currentTasks) => [
      ...currentTasks,
      {
        id: Math.random().toString(),
        value: newTask,
      },
    ]);
    createTask(newTask);
    getTasks();
    setIsAddMode(false);
  };

  const deleteTaskMemory = (taskId) => {
    setTaskItems((currentTasks) => {
      return currentTasks.filter((task) => task.id !== taskId);
    });
    deleteTask(taskId);
    getTasks();
  };

  const cancelAddTask = () => {
    setIsAddMode(false);
  };

  // get data from database

  const [dataResult, setDataResult] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  function getTasks() {
    fetch("http://192.168.1.5:3001")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let sampleArray = [];
        Object.values(data.dblisttask).forEach((value) => {
          sampleArray.push(value);
        });

        setTaskItems(sampleArray);

        setDataResult(sampleArray);
      });
  }

  function createTask(newTask) {
    let title = newTask;

    fetch("http://192.168.1.5:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then((response) => {
        return response.text();
      })
      .then(() => {
        getTasks();
      });
  }

  function deleteTask(taskId) {
    let id = taskId;

    fetch(`http://192.168.1.5:3001/tasks/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        getTasks();
      });
  }

  return (
    <View style={styles.screen}>
      <Button title="Add Task" onPress={() => setIsAddMode(true)} />
      <TaskInput
        visible={isAddMode}
        onNewTask={newTaskHandler}
        cancelAddTask={cancelAddTask}
      />
      <Data taskItems={taskItems} deleteTask={deleteTaskMemory} />
      {console.log("taskItems", taskItems)}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { padding: 50 },
});
