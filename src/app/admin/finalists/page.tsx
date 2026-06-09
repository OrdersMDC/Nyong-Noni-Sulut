import { getApplicants } from '@/server/actions/applicants'
import { FinalistsClient } from './finalists-client'

export default async function AdminFinalistsPage() {
  const applicants = await getApplicants().catch(() => [])

  return <FinalistsClient applicants={applicants as any[]} />
}
