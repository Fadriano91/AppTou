import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { withTheme, Caption, TextInput, HelperText, FAB, Checkbox, Snackbar } from 'react-native-paper'
import Header from '../components/Header'
import { BACKEND } from '../constants'

function AdicionaPosicao({ navigation, route, theme }) {
    const { colors } = theme
    //obtendo os dados da alteração via a rote
    const { data } = route.params
    const [nome, setNome] = useState(data.nome)
    const [status, setStatus] = useState(data.status)
    const [erros, setErros] = useState({})
    const [salvandoPosicao, setSalvandoPosicao] =useState(false)
    const [aviso, setAviso] = useState('') 

    async function salvaPosicao() {
        const novosErros = validaErrosPosicao()
        if (Object.keys(novosErros).length > 0) {
            setErros(novosErros)
        } else {
            //se o _id for nulo, faremos o POST, senão faremos o PUT
            const metodo = data._id === null ? 'POST' : 'PUT'
            let statusPosicao = ( status === true || status === 'ativo') ? 'ativo' : 'inativo'
            let posicao = { nome : nome, status: statusPosicao, _id: data._id}
            setSalvandoPosicao(true)
            let url = `${BACKEND}/posicoes`
            await fetch(url, {
                method: metodo,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(posicao)

            })
            .then(response => response.json())
            .then(data => {
                (data._id || data.message) ? setAviso('Registro salvo com sucesso!') : setAviso('')
                setNome('')
            })
            .catch(function(error){
                setAviso(`Não foi possível salvar a Posição: ${error.message}`)
                console.error('Houve um problema ao salvar a posição: ' + error.message);
            })
            setSalvandoPosicao(false)
        }
    }

    const validaErrosPosicao = () => {
        const novosErros = {}
        //Validação do Nome
        if (!nome || nome === '') novosErros.nome = 'O nome não pode ser vazio!'
        else if (nome.length > 30) novosErros.nome = 'O nome informado é muito longo'
        else if (nome.length < 3) novosErros.nome = 'O nome informado é muito curto'
        return novosErros
    }

    return (
        <>
            <Header titulo="Cadastro de Posição" back={true} navigation={navigation} />
            <View style={{
                flex: 1, backgroundColor: colors.background,
                paddingHorizontal: 24, paddingVertical: 8
            }}>
                <Caption style={{colors: colors.text, fontSize: 20, marginBottom: 32}}>
                    Informações da Posição</Caption>
                <TextInput
                    label= 'Nome da Posição'
                    name="nome"
                    value={nome}
                    mode='outlined'
                    onChangeText={setNome}
                    error={!!erros.nome}
                />
                <HelperText type="error" visible={!!erros.nome}>
                    {erros.nome}
                </HelperText>
                <View style={styles.checkbox}>
                    <Checkbox
                        status={status ? 'checked' : 'unchecked'}
                        onPress={() => { 
                            setStatus(!status);
                         }}
                    />
                    <Text style={{ color: colors.text, marginTop: 10 }}>Ativa?</Text>
                </View>
            
            <FAB
                style={styles.fab}
                icon='content-save'
                label='Salvar'
                loading={salvandoPosicao}
                onPress={() => salvaPosicao()}
            />
            <Snackbar
              visible={aviso.length > 0}
              onDismiss={() => setAviso('')}
              action={{
                  label: 'Voltar',
                  onPress: () => navigation.goBack()
            }}>
            <Text>{aviso}</Text>
            </Snackbar>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    text: {
        height: 300,
        fontSize: 16
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0
    },
    checkbox: {
        flexDirection: 'row',
        marginBottom: 32
    }
})

export default withTheme(AdicionaPosicao)