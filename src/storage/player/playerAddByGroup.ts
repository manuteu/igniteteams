import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '@utils/AppError';
import { PLAYER_COLLECTION } from '@storage/storageConfig';

import { PlayerStorageDTO } from './PlayerStorageDTO';
import { playersGetByGroups } from './playersGetByGroup';

export default async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const storedPlayers = await playersGetByGroups(group);

    const playersAlreadyExists = storedPlayers.filter(
      (p) => p.name === newPlayer.name
    );

    if (playersAlreadyExists.length > 0) {
      throw new AppError('Essa pessoa já está adicionada em um time.');
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
}
