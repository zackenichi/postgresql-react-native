import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

import TaskItem from "./TaskItem";

const Data = (props) => {
  // data check if items are present
  const hasItems = props.taskItems.length;

  return (
    <View>
      {hasItems === 0 ? (
        <Text style={styles.prompt}>No Tasks Available</Text>
      ) : (
        <FlatList
          keyExtractor={(item, index) => {
            return item.id.toString();
          }}
          //insert database results here
          data={props.taskItems}
          renderItem={(itemData) => {
            return (
              <TaskItem
                title={itemData.item.title}
                id={itemData.item.id}
                onDelete={props.deleteTask}
              />
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  prompt: {
    marginVertical: 10,
    fontSize: 20,
    textAlign: "center",
  },
});

export default Data;
