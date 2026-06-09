import { getEvents } from '@/server/actions/content'
import { EventsClient } from './events-client'

export default async function AdminEventsPage() {
  const events = await getEvents().catch(() => [])
  return <EventsClient events={events as any[]} />
}
