import { TableSkeleton } from '@/components/skeleton'

export default function HallOfFameLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <div className="mx-auto h-10 w-48 animate-pulse rounded-lg bg-gray-200" />
        <div className="mx-auto mt-3 h-4 w-72 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="flex justify-center gap-4 mb-8">
        <div className="h-10 w-48 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-10 w-48 animate-pulse rounded-lg bg-gray-200" />
      </div>
      <TableSkeleton rows={8} />
    </div>
  )
}
