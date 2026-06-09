import { ProfileCardSkeleton } from '@/components/skeleton'

export default function FinalistsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <div className="mx-auto h-8 w-48 animate-pulse rounded-lg bg-gray-200" />
        <div className="mx-auto mt-3 h-4 w-72 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProfileCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
