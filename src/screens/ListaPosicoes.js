import React , { useState, useEffect } from 'react'
import { View, ActivityIndicator, Text, StyleSheet, FlatList, RefreshControl } from 'react-native'
import { withTheme, List, Avatar, FAB } from 'react-native-paper'
import { BACKEND } from '../constants'
import Header from '../components/Header'
import ListaPosicao from './ListaPosicao'

function ListaPosições({navigation, theme}){
    const { colors } = theme
    const [ posicoes, setPosicoes] = useState([])
    const [carregandoPosicoes, setCarregandoPosicoes] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(()=> {
        obterPosicoes()
    },[])

    async function obterPosicoes(){
        setCarregandoPosicoes(true)
        let url = `${BACKEND}/posicoes`
        await fetch(url)
        .then(response => response.json())
        .then(data => {
            setPosicoes(data)
            //console.log('Posições obtidas com sucesso!')
        })
        .catch(function (error) {
            console.error(`Houve um problema ao obter as posições: ${error.message}`)
        })
        setCarregandoPosicoes(false)
    }

    const onRefresh = React.useCallback(async ()=> {
        setRefreshing(true)
        try{
            await obterPosicoes()
        } catch (error){
            console.error(error)
        }
        setRefreshing(false)
    },[refreshing])

    return (
        <>
        <Header titulo="Posições dos Jogadores" back={true} navigation={navigation} />
        <View style={{backgroundColor: colors.surface, paddingHorizontal: 8,
        paddingVertical: 8, flex:1}}>
            <List.Subheader>
                <Avatar.Icon size={24} icon="refresh"/> Para atualizar os dados
            </List.Subheader>

            {carregandoPosicoes && <ActivityIndicator size="large" color={colors.primary} />}
            {posicoes.length === 0 && !carregandoPosicoes ? 
            (
                <View style={styles.tituloAviso}>
                    <Text style={styles.titulo}>Ainda não há nenhuma posição cadastrada.</Text>
                </View>
            ) : (
                <FlatList
                    data={posicoes}
                    renderItem={({item}) => (
                        <ListaPosicao data={item} navigation={navigation} />
                    )}
                    keyExtractor={item => item._id.toString()}
                    refreshControl={<RefreshControl 
                                        refreshing={refreshing}
                                        onRefresh={onRefresh} />
                }
                />
            )
            }
            <FAB
              style={styles.fab}
              icon='flag-plus'
              label=''
              onPress={()=> navigation.navigate('AdicionaPosicao', {
                  data: {
                      _id: null,
                      nome: '',
                      status: true
                  }
              })}
              />
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    },
    
    tituloAviso:{
        alignItems:'center',
        justifyContent: 'center',
        flex: 1
    },
    titulo: {
        fontSize: 20
    }
})

export default withTheme(ListaPosições)