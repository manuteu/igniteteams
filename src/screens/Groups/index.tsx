import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Container } from './styles'
import Header from '@components/Header'
import Highlight from '@components/Highlight'
import GroupCard from '@components/GroupCard'
import ListEmpty from '@components/ListEmpty'
import Button from '@components/Button'

export default function Groups() {
  const [groups, setGroups] = useState<string[]>(['Galera da rocket'])

  return (
    <Container>
      <Header />
      <Highlight
        title='Turmas'
        subtitle='Jogue com a sua turma'
      />
      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
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
      <Button
        title='Criar nova turma'
      />
    </Container>
  )
}