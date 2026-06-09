import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/ui/badge'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Status</Badge>)
    expect(screen.getByText('Status')).toBeDefined()
  })

  it('applies default variant', () => {
    render(<Badge>Default</Badge>)
    const badge = screen.getByText('Default')
    expect(badge.className).toContain('bg-primary')
  })

  it('applies gold variant', () => {
    render(<Badge variant="gold">Gold</Badge>)
    const badge = screen.getByText('Gold')
    expect(badge.className).toContain('bg-gold')
  })

  it('applies success variant', () => {
    render(<Badge variant="success">Success</Badge>)
    const badge = screen.getByText('Success')
    expect(badge.className).toContain('bg-green-600')
  })
})
