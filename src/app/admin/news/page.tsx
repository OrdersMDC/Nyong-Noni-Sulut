import { getNews } from '@/server/actions/content'
import { NewsClient } from './news-client'

export default async function AdminNewsPage() {
  const news = await getNews().catch(() => [])
  return <NewsClient news={news as any[]} />
}
