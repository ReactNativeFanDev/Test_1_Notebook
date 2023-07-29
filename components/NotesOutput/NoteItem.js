import React, { useContext, useRef } from "react";
import { Pressable, StyleSheet, Text,  Animated, PanResponder, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { LangContext } from "../../store/sqlite-context";
import IconButton from "../UI/IconButton";

export default function ExpenseItem({ text, title, id, favorite }) {
  const langCtx = useContext(LangContext);
  const navigation = useNavigation();
  const pan = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const deleteExpenseHandler = () => {
    langCtx.deleteCategory(id);
  };

  const pressFavoriteHandler = () => {
    langCtx.updateText(text, title, id, !favorite); // Toggle the 'favorite' value
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x }], { useNativeDriver: false }),
      onPanResponderEnd: (_, gestureState) => {
        if (gestureState.dx < -100) {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start(deleteExpenseHandler);
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  const expensePressHandler = () => {
    navigation.navigate('MenageExpenses', {
      expenceId: id,
    });
  };

  return (
    <Animated.View
      style={[
        styles.expenseItem,
        { transform: [{ translateX: pan.x }], opacity },
        favorite ? { backgroundColor: GlobalStyles.colors.primary400 } : null
      ]}
      {...panResponder.panHandlers}
    >
      <Pressable onPress={expensePressHandler} style={({ pressed }) => [styles.noteContainer, pressed && styles.pressed]}>
        <Text style={[styles.textBase, styles.title]}>{title}</Text>
        <View style={styles.iconAndTextContainer}>
          <Text style={styles.textBase}>{text}</Text>
          <IconButton icon = {favorite ? "heart" : "hearto"} size={28} color={favorite ? "red" : "white"} onPress={pressFavoriteHandler} />
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 13,
    marginHorizontal: 24,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 1,
    flex: 1,
    borderLeftWidth: 3,
    borderLeftColor: "red",
  },
  iconAndTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
    fontSize: 18,
    maxWidth: '80%',
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  noteContainer: {
    flex: 1,
  },
  pressed: {
    opacity: 0.75
  },
});
