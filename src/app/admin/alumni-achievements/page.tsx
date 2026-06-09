import { getAlumniAchievements } from '@/server/actions/finalists'
import { AlumniAchievementsClient } from './achievements-client'

export default async function AdminAlumniAchievementsPage() {
  const data = await getAlumniAchievements().catch(() => [])
  return <AlumniAchievementsClient data={data as any[]} />
}
