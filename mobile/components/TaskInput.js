import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Modal } from "react-native";

const TaskInput = (props) => {
  const [enteredTask, setEnteredTask] = useState("");

  const taskInputHandler = (enteredText) => {
    setEnteredTask(enteredText);
  };

  const addTask = () => {
    props.onNewTask(enteredTask);
    setEnteredTask("");
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Task Here"
          onChangeText={taskInputHandler}
          value={enteredTask}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="CANCEL" color="red" onPress={props.cancelAddTask} />
          </View>
          <View style={styles.button}>
            <Button title="ADD" onPress={addTask} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
  button: {
    width: "40%",
  },
});

export default TaskInput;
