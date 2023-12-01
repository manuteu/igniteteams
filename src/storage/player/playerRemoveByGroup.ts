import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLAYER_COLLECTION } from '@storage/storageConfig';

import { PlayerStorageDTO } from './PlayerStorageDTO';
import { playersGetByGroups } from './playersGetByGroup';

export default async function playerRemoveByGroup(
  playerName: string,
  group: string
) {
  try {
    const storage = await playersGetByGroups(group);

    const filtered = storage.filter((p) => p.name !== playerName);
    const players = JSON.stringify(filtered);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players);
  } catch (error) {
    throw error;
  }
}
