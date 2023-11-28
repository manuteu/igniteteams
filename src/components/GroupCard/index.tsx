import { View, Text, TouchableOpacityProps } from 'react-native'
import React from 'react'
import { Container, Icon, Title } from './styles'

type Props = TouchableOpacityProps & {
  title: string;
}

export default function GroupCard({ title, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Icon />
      <Title>{title}</Title>
    </Container>
  )
}