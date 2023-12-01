import { playersGetByGroups } from './playersGetByGroup';

export default async function playersGetByGroupAndTeam(
  group: string,
  team: string
) {
  try {
    const storage = await playersGetByGroups(group);

    const players = storage.filter((p) => p.team === team);

    return players;
  } catch (error) {
    throw error;
  }
}
