import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Skeleton, CardSkeleton, ProfileCardSkeleton, TableSkeleton } from '@/components/skeleton'

describe('Skeleton', () => {
  it('renders with animate-pulse class', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toHaveClass('animate-pulse')
  })

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders with aria-hidden', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })
})

describe('CardSkeleton', () => {
  it('renders skeleton elements', () => {
    const { container } = render(<CardSkeleton />)
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0)
  })
})

describe('ProfileCardSkeleton', () => {
  it('renders skeleton elements with aspect ratio', () => {
    const { container } = render(<ProfileCardSkeleton />)
    const aspectDiv = container.querySelector('.aspect-\\[3\\/4\\]')
    expect(aspectDiv).toBeInTheDocument()
  })
})

describe('TableSkeleton', () => {
  it('renders specified number of rows', () => {
    const { container } = render(<TableSkeleton rows={3} />)
    expect(container.querySelectorAll('.animate-pulse').length).toBe(3)
  })

  it('defaults to 5 rows', () => {
    const { container } = render(<TableSkeleton />)
    expect(container.querySelectorAll('.animate-pulse').length).toBe(5)
  })
})
