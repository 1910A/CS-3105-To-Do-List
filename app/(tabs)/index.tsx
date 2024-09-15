import { Image, Text, TextInput, Button, StyleSheet, View } from 'react-native';
import React, { useState } from "react";
import Checkbox from 'expo-checkbox';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface IToDo {
  text: string;
  completed: boolean;
}

export default function HomeScreen() {
  const [value, setValue] = useState<string>("");
  const [toDoList, setToDos] = useState<IToDo[]>([]);
  const [error, showError] = useState<Boolean>(false);

  const handleSubmit = (): void => {
    if (value.trim())
      setToDos([...toDoList, { text: value, completed: false }]);
    else showError(true);
    setValue("");
  };

  const removeItem = (index: number): void => {
    const newToDoList = [...toDoList];
    newToDoList.splice(index, 1);
    setToDos(newToDoList);
  };

  const toggleComplete = (index: number): void => {
    const newToDoList = [...toDoList];
    newToDoList[index].completed = !newToDoList[index].completed;
    setToDos(newToDoList);
  };

  return (
    <View style={styles.pageBackground}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#FFD1DC', dark: '#FFC1CC' }}
        headerImage={
          <Image
            source={require('@/assets/images/homeicon.png')}
            style={styles.homeIcon}
          />
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Let's Be Productive Today!</ThemedText>
          <HelloWave />
        </ThemedView>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Enter your todo task..."
            value={value}
            onChangeText={e => {
              setValue(e);
              showError(false);
            }}
            style={styles.inputBox}
          />
          <Button
            title="Add Task"
            onPress={handleSubmit}
            color="#800020"
          />
        </View>

        {error && (
          <Text style={styles.error}>Error: Input field is empty...</Text>
        )}
        <Text style={styles.subtitle}>Your Tasks :</Text>
        {toDoList.length === 0 && <Text>No to do task available</Text>}
        {toDoList.map((toDo: IToDo, index: number) => (
          <View style={styles.listItem} key={`${index}_${toDo.text}`}>
            <Checkbox
              style={styles.checkbox}
              value={toDo.completed}
              onValueChange={() => toggleComplete(index)}
            />
            <Text
              style={[
                styles.task,
                { textDecorationLine: toDo.completed ? "line-through" : "none" }
              ]}
            >
              {toDo.text}
            </Text>
            <Button
              title="Delete"
              onPress={() => removeItem(index)}
              color="crimson"
            />
          </View>
        ))}
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageBackground: {
    flex: 1,
    backgroundColor: "pink",
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  homeIcon: {
    height: 200,
    width: 200,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  inputBox: {
    width: 200,
    borderColor: "purple",
    borderRadius: 8,
    borderWidth: 2,
    paddingLeft: 8
  },
  title: {
    fontSize: 40,
    marginBottom: 40,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: "purple"
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10
  },
  checkbox: {
    margin: 8,
  },
  task: {
    width: 200,
    marginLeft: 10,
  },
  error: {
    color: "red"
  },
});
