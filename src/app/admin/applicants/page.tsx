import { getApplicants, getApplicantStats } from '@/server/actions/applicants'
import { ApplicantsClient } from './applicants-client'

export default async function AdminApplicantsPage() {
  const [applicants, stats] = await Promise.all([
    getApplicants().catch(() => []),
    getApplicantStats().catch(() => ({ total: 0, pending: 0, verified: 0, rejected: 0, finalist: 0 })),
  ])

  return <ApplicantsClient applicants={applicants as any[]} stats={stats} />
}
