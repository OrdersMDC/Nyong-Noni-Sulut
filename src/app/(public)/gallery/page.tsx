import { getPublicGallery } from '@/server/actions/content'
import GalleryClient from './GalleryClient'

export default async function GalleryPage() {
  const images = await getPublicGallery().catch(() => [])
  return <GalleryClient images={images} />
}
