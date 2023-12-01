import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION } from '@storage/storageConfig';
import { groupsGetAll } from './groupGetAll';
import { AppError } from '@utils/AppError';

export async function groupCreate(newGroup: string) {
  try {
    const storadeGroups = await groupsGetAll()

    const groupAlreadyExists = storadeGroups.includes(newGroup)
    if (groupAlreadyExists) {
      throw new AppError('Já existe um turma cadastrado com esse nome.')
    }
    
    const storage = JSON.stringify([...storadeGroups, newGroup])
    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}
