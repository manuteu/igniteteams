import { View, Text, TouchableOpacityProps } from 'react-native'
import React from 'react'
import { Container, FilterStyleProps, Title } from './styles'

type Props = TouchableOpacityProps & FilterStyleProps & {
  title: string;
}

export default function Filter({ title, isActive = false, ...rest }: Props) {
  return (
    <Container isActive={isActive} {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}