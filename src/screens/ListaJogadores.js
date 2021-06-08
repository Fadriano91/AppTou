import React , { useState, useEffect } from 'react'
import { View, ActivityIndicator, Text, StyleSheet, FlatList, RefreshControl } from 'react-native'
import { withTheme, List, Avatar, FAB } from 'react-native-paper'
import { BACKEND } from '../constants'
import Header from '../components/Header'
import ListaJogador from './ListaJogador'

function ListaJogadores({navigation, theme}){
    const { colors } = theme
    const [ jogadores, setJogadores] = useState([])
    const [carregandoJogadores, setCarregandoJogadores] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(()=> {
        obterJogadores()
    },[])

    async function obterJogadores(){
        setCarregandoJogadores(true)
        let url = `${BACKEND}/jogadores`
        await fetch(url)
        .then(response => response.json())
        .then(data => {
            setJogadores(data)
            //console.log('Jogadores obtidas com sucesso!')
        })
        .catch(function (error) {
            console.error(`Houve um problema ao obter os jogadores: ${error.message}`)
        })
        setCarregandoJogadores(false)
    }

    const onRefresh = React.useCallback(async ()=> {
        setRefreshing(true)
        try{
            await obterJogadores()
        } catch (error){
            console.error(error)
        }
        setRefreshing(false)
    },[refreshing])

    return (
        <>
        <Header titulo="Jogadores" back={true} navigation={navigation} />
        <View style={{backgroundColor: colors.surface, paddingHorizontal: 8,
        paddingVertical: 8, flex:1}}>
            <List.Subheader>
                <Avatar.Icon size={24} icon="refresh"/> Para atualizar os dados
            </List.Subheader>

            {carregandoJogadores && <ActivityIndicator size="large" color={colors.primary} />}
            {jogadores.length === 0 && !carregandoJogadores ? 
            (
                <View style={styles.tituloAviso}>
                    <Text style={styles.titulo}>Ainda não há nenhuma jogador cadastrada.</Text>
                </View>
            ) : (
                <FlatList
                    data={jogadores}
                    renderItem={({item}) => (
                        <ListaJogador data={item} navigation={navigation} /> 
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
              icon='account-plus'
              label=''
              onPress={()=> navigation.navigate('AdicionaJogador', {
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

export default withTheme(ListaJogadores)