import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { withTheme, Caption, TextInput, HelperText, FAB, Checkbox, Snackbar, RadioButton } from 'react-native-paper'
import Header from '../components/Header'
import { BACKEND } from '../constants'

function AdicionaJogador({ navigation, route, theme }) {
    const { colors } = theme
    //obtendo os dados da alteração via a rote
    const { data } = route.params
    const [nome, setNome] = useState(data.nome)
    const [status, setStatus] = useState(data.status)
    const [erros, setErros] = useState({})
    const [salvandoJogador, setSalvandoJogador] =useState(false)
    const [aviso, setAviso] = useState('') 
    const [checkedPe, setCheckedPe] = useState('')
    const [checkedEstrela, setCheckedEstrela] = useState('')
    const [checkedCopa, setCheckedCopa] = useState('')
    const [posicao, setPosicao] = useState('')
    const [habilidade, setHabilidade] = useState('')

    async function salvaJogador() {
        const novosErros = validaErrosJogador()

        if (Object.keys(novosErros).length > 0) {
            setErros(novosErros)
        } else {
            //se o _id for nulo, faremos o POST, senão faremos o PUT
            const metodo = data._id === null ? 'POST' : 'PUT'
            let statusJogador = ( status === true || status === 'ativo') ? 'ativo' : 'inativo'
            let jogador = { nome : nome, status: statusJogador, posicao: posicao, peBom: checkedPe, 
                habilidade: habilidade,  estrela: checkedEstrela, copa: checkedCopa, _id: data._id}
            setSalvandoJogador(true)
            let url = `${BACKEND}/jogadores`
            await fetch(url, {
                method: metodo,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jogador)

            })
            .then(response => response.json())
            .then(data => {
                (data._id || data.message) ? setAviso('Registro salvo com sucesso!') : setAviso('')
                setNome('')
            })
            .catch(function(error){
                setAviso(`Não foi possível salvar o jogador: ${error.message}`)
                console.error('Houve um problema ao salvar o jogador: ' + error.message);
            })
            setSalvandoJogador(false)
        }
    }

    const validaErrosJogador = () => {
        const novosErros = {}
        //Validação do Nome
        if (!nome || nome === '') novosErros.nome = 'O nome não pode ser vazio!'
        else if (nome.length > 30) novosErros.nome = 'O nome informado é muito longo'
        else if (nome.length < 3) novosErros.nome = 'O nome informado é muito curto'
        return novosErros
    }

    return (
        <>
            <Header titulo="Cadastro de Jogador" back={true} navigation={navigation} />
            <View style={{
                flex: 1, backgroundColor: colors.background,
                paddingHorizontal: 24, paddingVertical: 8
            }}>
                <Caption style={{colors: colors.text, fontSize: 20, marginBottom: 32}}>
                    Informações do Jogador</Caption>
                <TextInput
                    label= 'Nome do Jogador'
                    name="nome"
                    value={nome}
                    mode='outlined'
                    onChangeText={setNome}
                    error={!!erros.nome}
                    />
                <HelperText type="error" visible={!!erros.nome}>
                    {erros.nome}
                </HelperText>

                <TextInput
                    label= 'Posição'
                    name="posicao"
                    value={posicao}
                    mode='outlined'
                    onChangeText={setPosicao}/>

                <TextInput
                    label= 'Habilidade'
                    name="habilidade"
                    value={habilidade}
                    mode='outlined'
                    onChangeText={setHabilidade}
                    />
               
                <Text style={{color: colors.text, marginTop: 8
                }}> Pé Bom: </Text>
                <View style={styles.radiobutton}>
                    <RadioButton
                        value="direito"
                        status={ checkedPe === 'direito' ? 'checked' : 'unchecked'}
                        onPress={() => setCheckedPe('direito')}
                    />
                    <Text style={{ color: colors.text, marginTop: 8 }}>Pé direito</Text>
                    <RadioButton
                        value="esquerdo"
                        status={ checkedPe === 'esquerdo' ? 'checked' : 'unchecked'}
                        onPress={() => setCheckedPe('esquerdo')}
                    />
                    <Text style={{ color: colors.text, marginTop: 8 }}>Pé esquerdo</Text>
                </View>

                <Text style={{color: colors.text, marginTop: 8
                }}> Estrela: </Text>
                <View style={styles.radiobutton}>
                    <RadioButton
                        value="0"
                        status={ checkedEstrela === '0' ? 'checked' : 'unchecked'}
                        onPress={() => setCheckedEstrela ('0')}
                    />
                    <Text style={{ color: colors.text, marginTop: 8 }}>0</Text>
                    <RadioButton
                        value="1"
                        status={ checkedEstrela === '1' ? 'checked' : 'unchecked'}
                        onPress={() => setCheckedEstrela ('1')}
                    />
                    <Text style={{ color: colors.text, marginTop: 8 }}>1</Text>
                    <RadioButton
                        value="2"
                        status={ checkedEstrela  === '2' ? 'checked' : 'unchecked'}
                        onPress={() => setCheckedEstrela ('2')}
                    />
                    <Text style={{ color: colors.text, marginTop: 8 }}>2</Text>
                    <RadioButton
                        value="3"
                        status={ checkedEstrela  === '3' ? 'checked' : 'unchecked'}
                        onPress={() => setCheckedEstrela ('3')}
                    />
                    <Text style={{ color: colors.text, marginTop: 8 }}>3</Text>
                    <RadioButton
                        value="4"
                        status={ checkedEstrela  === '4' ? 'checked' : 'unchecked'}
                        onPress={() => setCheckedEstrela ('4')}
                    />
                    <Text style={{ color: colors.text, marginTop: 8 }}>4</Text>
                    <RadioButton
                        value="5"
                        status={ checkedEstrela  === '5' ? 'checked' : 'unchecked'}
                        onPress={() => setCheckedEstrela ('5')}
                    />
                    <Text style={{ color: colors.text, marginTop: 8 }}>5</Text>
                </View>

                <Text style={{color: colors.text, marginTop: 8
                }}> Copa: </Text>
                <View style={styles.radiobutton}>
                    <RadioButton
                        value="0"
                        status={ checkedCopa === '0' ? 'checked' : 'unchecked'}
                        onPress={() => setCheckedCopa ('0')}
                    />
                    <Text style={{ color: colors.text, marginTop: 8 }}>0</Text>
                    <RadioButton
                        value="1"
                        status={ checkedCopa === '1' ? 'checked' : 'unchecked'}
                        onPress={() => setCheckedCopa ('1')}
                    />
                    <Text style={{ color: colors.text, marginTop: 8 }}>1</Text>
                    <RadioButton
                        value="2"
                        status={ checkedCopa  === '2' ? 'checked' : 'unchecked'}
                        onPress={() => setCheckedCopa ('2')}
                    />
                    <Text style={{ color: colors.text, marginTop: 8 }}>2</Text>
                    <RadioButton
                        value="3"
                        status={ checkedCopa  === '3' ? 'checked' : 'unchecked'}
                        onPress={() => setCheckedCopa ('3')}
                    />
                    <Text style={{ color: colors.text, marginTop: 8 }}>3</Text>
                    <RadioButton
                        value="4"
                        status={ checkedCopa  === '4' ? 'checked' : 'unchecked'}
                        onPress={() => setCheckedCopa ('4')}
                    />
                    <Text style={{ color: colors.text, marginTop: 8 }}>4</Text>
                    <RadioButton
                        value="5"
                        status={ checkedCopa  === '5' ? 'checked' : 'unchecked'}
                        onPress={() => setCheckedCopa ('5')}
                    />
                    <Text style={{ color: colors.text, marginTop: 8 }}>5</Text>
                </View>
                
                <View style={styles.checkbox}>
                    <Checkbox
                        status={status ? 'checked' : 'unchecked'}
                        onPress={() => { 
                            setStatus(!status);
                         }}
                    />
                    <Text style={{ color: colors.text, marginTop: 8 }}>Ativa?</Text>
                </View>

            <FAB
                style={styles.fab}
                icon='content-save'
                label='Salvar'
                loading={salvandoJogador}
                onPress={() => salvaJogador()}
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
    },
    radiobutton: {
        flexDirection: 'row',
        marginBottom: 8
    }
})

export default withTheme(AdicionaJogador)