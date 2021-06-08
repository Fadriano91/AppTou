import React, { useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { BACKEND, SIZES } from '../constants'

import { List, withTheme, Avatar } from 'react-native-paper'

function ListaJogador({ data, navigation, theme }) {
    const { colors } = theme
    const [excluindo, setExcluindo] = useState(false)
   
    function botaoLadoDireito() {
        return (
            <View>
                <TouchableOpacity style={styles.botaoApagar}
                    onPress={confirmaExclusaoRegistro}>
                    {excluindo
                        ? <ActivityIndicator size="small" color={colors.primary} />
                        : <Avatar.Icon size={24} icon="delete" style={{ backgroundColor: colors.background }} />
                    }
                    <Text style={{ color: colors.text }}>Excluir</Text>
                </TouchableOpacity>
            </View>
        )
    }

    async function confirmaExclusaoRegistro() {
        setExcluindo(true)
        try {
            Alert.alert('Atenção!', 'Deseja mesmo excluir esta categoria?', [
                { text: 'Não', style: 'cancel' },
                { 
                    text: 'Sim', 
                    onPress: async() => {
                        await excluirJogador(data)
                    },
                 }
            ])
        } catch (response) {
            Alert.alert(response.data.error)
        }
        setExcluindo(false)
    }

    async function excluirJogador(data) {
        let url = `${BACKEND}/jogadores/${data._id}`
        await fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                Alert.alert('Aviso', data.message)
                navigation.goBack()
            })
            .catch(function (error) {
                console.error('Houve um problema ao excluir o jogador:' + error.message);
            })
    }

    const alteraJogador = async (data) => {
        navigation.navigate('AdicionaJogador', {
            data: data
        })
    }

    return (
        <>
            <Swipeable renderRightActions={botaoLadoDireito}>
                <TouchableOpacity styles={styles.container}
                    onPress={() => alteraJogador(data)}
                >
                    <View style={{
                        flex: 1, justifyContent: 'center', backgroundColor: colors.background,
                        borderRadius: 20, margin: 8
                    }}>
                        <List.Item
                            title={data.nome}
                            description={`estrela: ${data.estrela}`}
                        />
                        
                    </View>
                </TouchableOpacity>
            </Swipeable>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        height: 100,
        borderRadius: 8,
        marginBottom: 2,
        marginHorizontal: 8
    },
    botaoApagar: {
        backgroundColor: '#d9534f',
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
        borderTopEndRadius: SIZES.borderRadius,
        borderBottomEndRadius: SIZES.borderRadius
    }
})

export default withTheme(ListaJogador)