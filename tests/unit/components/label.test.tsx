import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Label } from '@/components/ui/label'

describe('Label', () => {
  it('renders label text', () => {
    render(<Label>Nama Lengkap</Label>)
    expect(screen.getByText('Nama Lengkap')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Label className="custom-class">Label</Label>)
    expect(screen.getByText('Label')).toHaveClass('custom-class')
  })

  it('renders with htmlFor', () => {
    render(<Label htmlFor="name-input">Nama</Label>)
    expect(screen.getByText('Nama')).toHaveAttribute('for', 'name-input')
  })

  it('renders as child component', () => {
    render(
      <Label asChild>
        <button>Click</button>
      </Label>,
    )
    expect(screen.getByText('Click')).toBeInTheDocument()
  })

  it('applies font-medium class', () => {
    render(<Label>Nama</Label>)
    expect(screen.getByText('Nama')).toHaveClass('font-medium')
  })
})
