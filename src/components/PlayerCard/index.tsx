import { View, Text } from 'react-native'
import React from 'react'
import { Container, Icon, Name } from './styles'
import Buttonicon from '@components/ButtonIcon'

type Props = {
  name: string
  onRemove: () => void
}

export default function PlayerCard({ name, onRemove }: Props) {
  return (
    <Container>
      <Icon
        name="person"
      />
      <Name>
        {name}
      </Name>
      <Buttonicon
        onPress={onRemove}
        icon='close'
        type='SECONDARY'
      />
    </Container>
  )
}