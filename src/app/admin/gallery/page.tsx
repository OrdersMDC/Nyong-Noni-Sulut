import { getGallery } from '@/server/actions/content'
import { GalleryClient } from './gallery-client'

export default async function AdminGalleryPage() {
  const gallery = await getGallery().catch(() => [])
  return <GalleryClient gallery={gallery as any[]} />
}
