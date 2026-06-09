import { getHallOfFame } from '@/server/actions/finalists'
import { HallOfFameClient } from './hall-of-fame-client'

export default async function AdminHallOfFamePage() {
  const data = await getHallOfFame().catch(() => [])
  return <HallOfFameClient data={data as any[]} />
}
