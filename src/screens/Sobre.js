import React from 'react'
import {View, Text} from 'react-native'
import {withTheme} from 'react-native-paper'

function Sobre({route, theme}){
    const { colors } = theme
    return(
        <View style={{backgroundColor: colors.surface}}>
            <Text style={{color: colors.text}}>Sobre este app...</Text>
        </View>
    )
}

export default withTheme(Sobre)