import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { Container, Form, HeaderList, NumberOfPlayers } from './styles'

import Header from '@components/Header'
import Highlight from '@components/Highlight'
import Buttonicon from '@components/ButtonIcon'
import Input from '@components/Input'
import Filter from '@components/Filter'
import PlayerCard from '@components/PlayerCard'
import ListEmpty from '@components/ListEmpty'
import Button from '@components/Button'

export default function Players() {
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState([])

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title='Nome da Turma'
        subtitle='adicione a galera e separe os times'
      />
      <Form>
        <Input
          placeholder='Nome da pessoa'
          autoCorrect={false}
        />
        <Buttonicon icon='add' />
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

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard
            name={item}
            onRemove={() => { }}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message='Não há pessoas nesse time.' />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ paddingBottom: 42, paddingTop: 20 }, players.length === 0 && { flex: 1 }]}
      />

      <Button
        title='Remover Turma'
        type='SECONDARY'
      />
    </Container>
  )
}