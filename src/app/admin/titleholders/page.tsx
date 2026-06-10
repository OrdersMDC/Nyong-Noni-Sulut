import { getTitleholders } from '@/server/actions/finalists'
import { TitleholdersClient } from './titleholders-client'

export default async function AdminTitleholdersPage() {
  const data = await getTitleholders().catch(() => [])
  return <TitleholdersClient data={data as any[]} />
}
