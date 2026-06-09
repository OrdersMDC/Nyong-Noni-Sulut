import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { BentenanPattern, CornerAccent, WaveDivider } from '@/components/pattern'

describe('BentenanPattern', () => {
  it('renders an SVG element', () => {
    const { container } = render(<BentenanPattern />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders with aria-hidden="true"', () => {
    const { container } = render(<BentenanPattern />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('accepts className prop', () => {
    const { container } = render(<BentenanPattern className="custom-class" />)
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })

  it('renders path elements', () => {
    const { container } = render(<BentenanPattern />)
    expect(container.querySelectorAll('path').length).toBeGreaterThan(0)
  })

  it('renders circle elements', () => {
    const { container } = render(<BentenanPattern />)
    expect(container.querySelectorAll('circle').length).toBeGreaterThan(0)
  })
})

describe('CornerAccent', () => {
  it('renders an SVG element', () => {
    const { container } = render(<CornerAccent />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders with aria-hidden="true"', () => {
    const { container } = render(<CornerAccent />)
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  it('accepts className prop', () => {
    const { container } = render(<CornerAccent className="custom-class" />)
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })
})

describe('WaveDivider', () => {
  it('renders an SVG element', () => {
    const { container } = render(<WaveDivider />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders with aria-hidden="true"', () => {
    const { container } = render(<WaveDivider />)
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  it('accepts className prop', () => {
    const { container } = render(<WaveDivider className="custom-class" />)
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })

  it('preserves aspect ratio', () => {
    const { container } = render(<WaveDivider />)
    expect(container.querySelector('svg')).toHaveAttribute('preserveAspectRatio', 'none')
  })
})
