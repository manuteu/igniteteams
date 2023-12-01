import React, { useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { AppError } from '@utils/AppError'

import Header from '@components/Header'
import Highlight from '@components/Highlight'
import Button from '@components/Button'
import Input from '@components/Input'
import { groupCreate } from '@storage/group/groupCreate'

import { Container, Content, Icon } from './styles'

export default function NewGroup() {
  const [group, setGroup] = useState('')

  const navigation = useNavigation()

  const handleNew = async () => {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Nova turma', 'Informe o nome da turma.');
      }
      await groupCreate(group)
      navigation.navigate('players', { group })
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo turma', error.message);
      } else {
        Alert.alert('Novo turma', 'Não foi possível criar um novo turma.');
        console.error(error);
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title='Nova Turma'
          subtitle='crie a turma para adicionar pessoas'
        />
        <Input placeholder='Nome da turma' value={group} onChangeText={setGroup} />
        <Button
          title='Criar'
          style={{ marginTop: 20 }}
          onPress={handleNew}
        />
      </Content>
    </Container>
  )
}