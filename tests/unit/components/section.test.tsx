import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Section } from '@/components/section'

describe('Section', () => {
  it('renders children', () => {
    render(<Section><p>Test content</p></Section>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies default variant class', () => {
    const { container } = render(<Section>Content</Section>)
    expect(container.firstChild).toHaveClass('bg-background')
  })

  it('applies cream variant class', () => {
    const { container } = render(<Section variant="cream">Content</Section>)
    expect(container.firstChild).toHaveClass('bg-cream')
  })

  it('applies ocean variant class', () => {
    const { container } = render(<Section variant="ocean">Content</Section>)
    expect(container.firstChild).toHaveClass('ocean-gradient')
  })

  it('applies dark variant class', () => {
    const { container } = render(<Section variant="dark">Content</Section>)
    expect(container.firstChild).toHaveClass('bg-dark')
  })

  it('applies custom className', () => {
    const { container } = render(<Section className="custom-class">Content</Section>)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders pattern when pattern prop is true', () => {
    const { container } = render(<Section pattern>Content</Section>)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('does not render pattern when pattern prop is false', () => {
    const { container } = render(<Section>Content</Section>)
    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })

  it('sets id prop', () => {
    const { container } = render(<Section id="test-section">Content</Section>)
    expect(container.querySelector('#test-section')).toBeInTheDocument()
  })
})
