import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FormScreen from './src/screens/FormScreen';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Dynamic Form"
                    component={FormScreen}
                    options={{
                        title: 'Dynamic Form',
                        headerStyle: styles.headerStyle,
                        headerTitleStyle: styles.headerTitleStyle,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: 'lightblue',
    },
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default App;