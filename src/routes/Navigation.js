import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppContext } from '../themes/ThemeProvider'

import Configuracoes from '../screens/Configuracoes'
import Sobre from '../screens/Sobre'
import Tabs from './Tabs'

const Stack = createStackNavigator()

export default function navigation(){
    const { tema } = React.useContext(AppContext)
    return(
        <NavigationContainer theme={tema}>
            <Stack.Navigator initialRouteName="Tabs">
                <Stack.Screen name="Home" component={Tabs}
                    options={{headerShown: false}} />
                <Stack.Screen name="Sobre" component={Sobre}
                    options={{headerShown: false}} />
                <Stack.Screen name="Configuracoes" component={Configuracoes} 
                    options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}