import React, { useState, useCallback } from 'react'
import { FlatList, Alert } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { groupsGetAll } from '@storage/group/groupGetAll'

import Header from '@components/Header'
import Highlight from '@components/Highlight'
import GroupCard from '@components/GroupCard'
import ListEmpty from '@components/ListEmpty'
import Button from '@components/Button'

import { Container } from './styles'
import { LoadingIndicator } from '@components/Loading/styles'

export default function Groups() {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>(['Galera da rocket'])
  const navigation = useNavigation()

  const handleNewGroup = () => {
    navigation.navigate('new')
  }

  const fetchGroups = async () => {
    setIsLoading(true)
    try {
      const data = await groupsGetAll()
      setGroups(data)
    } catch (error) {
      console.log(error);
      Alert.alert('Turmas', 'Não foi possível carregar as turmas')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenGroup = (group: string) => {
    navigation.navigate('players', { group })
  }

  useFocusEffect(useCallback(() => {
    fetchGroups()
  }, []));

  return (
    <Container>
      <Header />
      <Highlight
        title='Turmas'
        subtitle='Jogue com a sua turma'
      />
      {isLoading ? (
        <LoadingIndicator size={32} />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <GroupCard
              title={item}
              onPress={() => handleOpenGroup(item)}
            />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={
            <ListEmpty
              message='Nenhuma turma cadastrada'
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
      <Button
        title='Criar nova turma'
        onPress={handleNewGroup}
      />
    </Container>
  )
}