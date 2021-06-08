import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppContext } from '../themes/ThemeProvider'

import Configuracoes from '../screens/Configuracoes'
import Sobre from '../screens/Sobre'
import ListaPosições from '../screens/ListaPosicoes'
import AdicionaPosicao from '../screens/AdicionaPosicao'
import ListaJogadores from '../screens/ListaJogadores'
import AdicionaJogador from '../screens/AdicionaJogador'
import Tabs from './Tabs'

const Stack = createStackNavigator()

export default function navigation(){
    const { tema } = React.useContext(AppContext)
    return(
        <NavigationContainer theme={tema}>
            <Stack.Navigator initialRouteName="Tabs">
                <Stack.Screen name="Home" component={Tabs}
                    options={{headerShown: false}} 
                    />
        <Stack.Screen name="ListaPosições" component={ListaPosições} options={{headerShown: false}} /> 
        <Stack.Screen name="AdicionaPosicao" component={AdicionaPosicao} options={{headerShown: false}} />    
        <Stack.Screen name="ListaJogadores" component={ListaJogadores} options={{headerShown: false}} /> 
        <Stack.Screen name="AdicionaJogador" component={AdicionaJogador} options={{headerShown: false}} />    
        <Stack.Screen name="Sobre" component={Sobre} options={{headerShown: false}} />
        <Stack.Screen name="Configuracoes" component={Configuracoes} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}