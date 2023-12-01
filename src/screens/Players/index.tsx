import React, { useEffect, useState, useRef } from 'react'
import { FlatList, Alert, TextInput } from 'react-native'

import { useRoute, useNavigation } from '@react-navigation/native'
import { AppError } from '@utils/AppError'
import playerAddByGroup from '@storage/player/playerAddByGroup'
import playersGetByGroupAndTeam from '@storage/player/playersGetByGroupAndTeam'
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'
import playerRemoveByGroup from '@storage/player/playerRemoveByGroup'

import Header from '@components/Header'
import Highlight from '@components/Highlight'
import Buttonicon from '@components/ButtonIcon'
import Input from '@components/Input'
import Filter from '@components/Filter'
import PlayerCard from '@components/PlayerCard'
import ListEmpty from '@components/ListEmpty'
import Button from '@components/Button'

import { Container, Form, HeaderList, NumberOfPlayers } from './styles'
import groupRemoveByName from '@storage/group/groupRemoveByName'
import { LoadingIndicator } from '@components/Loading/styles'

type RouteParams = {
  group: string;
}

export default function Players() {
  const [isLoading, setIsLoading] = useState(true)
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [newPlayerName, setNewPlayerName] = useState('')
  const { navigate } = useNavigation()

  const { params } = useRoute()
  const { group } = params as RouteParams

  const newPlayerNameInputRef = useRef<TextInput>(null)

  const handleAddPlayer = async () => {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Novo Jogador', 'Informe o nome do jogador para adicionar.');
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group)

      newPlayerNameInputRef.current?.blur()

      fetchPlayersByTeam()
      setNewPlayerName('')
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Jogador', error.message);
      } else {
        console.log(error);
        Alert.alert('Novo Jogador', 'Não foi possível adicionar');
      }
    }
  }
  const fetchPlayersByTeam = async () => {
    setIsLoading(true)
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
    } catch (error) {
      console.log(error);
      Alert.alert('Jogadores', 'Não foi possível carregar as pessoas do time selecionado')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePlayerRemove = async (playerName: string) => {
    try {
      const playersByTeam = await playerRemoveByGroup(playerName, group)
      fetchPlayersByTeam()

    } catch (error) {
      console.log(error);
      Alert.alert('Remover Jogador', 'Não foi possível esse jogador.')
    }
  }

  const groupRemove = async () => {
    try {
      await groupRemoveByName(group);
      navigate('groups');

    } catch (error) {
      console.log(error);
      Alert.alert('Remover turma', 'Não foi possível remover o turma.')
    }
  }

  const handleGroupRemove = async () => {
    Alert.alert(
      'Remover',
      'Deseja remover o turma',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => groupRemove() },
      ]
    )
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])


  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle='adicione a galera e separe os times'
      />
      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder='Nome da pessoa'
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
        />
        <Buttonicon
          icon='add'
          onPress={handleAddPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B', 'Time C']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              onPress={() => setTeam(item)}
              title={item}
              isActive={item === team}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
      {isLoading ? (
        <LoadingIndicator size={32} />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={
            ({ item }) => (
              <PlayerCard
                name={item.name}
                onRemove={() => handlePlayerRemove(item.name)}
              />
            )}
          ListEmptyComponent={() => (
            <ListEmpty message='Não há pessoas nesse time.' />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[{ paddingBottom: 42, paddingTop: 20 }, players.length === 0 && { flex: 1 }]}
        />
      )}

      <Button
        title='Remover Turma'
        type='SECONDARY'
        onPress={handleGroupRemove}
      />
    </Container>
  )
}