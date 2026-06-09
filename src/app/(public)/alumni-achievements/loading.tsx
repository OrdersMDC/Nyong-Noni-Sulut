import { CardSkeleton } from '@/components/skeleton'

export default function AlumniAchievementsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <div className="mx-auto h-10 w-48 animate-pulse rounded-lg bg-gray-200" />
        <div className="mx-auto mt-3 h-4 w-72 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="flex justify-center gap-2 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 w-24 animate-pulse rounded-full bg-gray-200" />
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
