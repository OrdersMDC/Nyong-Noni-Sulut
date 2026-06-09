import { CardSkeleton } from '@/components/skeleton'

export default function NewsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <div className="mx-auto h-8 w-32 animate-pulse rounded-lg bg-gray-200" />
        <div className="mx-auto mt-3 h-4 w-64 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
