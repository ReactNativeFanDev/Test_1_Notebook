import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageExpenses from "./screens/ManageNotes";
import RecentExpenses from "./screens/FavoritesNotes";
import MainPage from "./screens/MainPage";
import { GlobalStyles } from "./constants/styles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import IconButton from "./components/UI/IconButton";
import LangContextProvider from "./store/sqlite-context";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();




function ExpensesOverview() {

  return (
    <BottomTab.Navigator 
      screenOptions={({navigation}) => ({
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: 'white',
        tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarInactiveTintColor: GlobalStyles.colors.primary200,
        headerRight: () => (
          <IconButton icon="plus" size={28} color={"#33ff00"} onPress={() => navigation.navigate('MenageExpenses')} />
        ),
      })}
    >
      <BottomTab.Screen 
        name="MainPage" 
        component={MainPage}
        options={{
          title: "All",
          tabBarIcon: ({color, size}) => <AntDesign name="home" color={color} size={size+4} />
        }}
      />
      <BottomTab.Screen 
        name="RecentExpenses" 
        component={RecentExpenses}
        options={{
          title: "Favorite notes",
          tabBarLabel: "Favorite",
          tabBarIcon: ({color, size}) => <AntDesign name='star' color={color} size={size+4} />
        }}
      />
    </BottomTab.Navigator>
  )
}

export default function App() {
  return(
    <>
      <StatusBar barStyle={'light-content'}/>
      <LangContextProvider>
        <NavigationContainer>
          <Stack.Navigator 
            screenOptions={{
              headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
              headerTintColor: 'white'
            }}
          >
            <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} options={{headerShown: false}}/>
            <Stack.Screen name="MenageExpenses" component={ManageExpenses} options={{presentation: 'formSheet'}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </LangContextProvider>
    </>
  )
}
