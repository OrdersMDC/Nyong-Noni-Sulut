import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/footer'

describe('Footer', () => {
  it('renders brand section', () => {
    render(<Footer />)
    const brandTitles = screen.getAllByText('Nyong Noni Sulut')
    expect(brandTitles.length).toBeGreaterThan(0)
    expect(
      screen.getByText(/Platform resmi pembinaan, pemilihan, dan kolaborasi/i)
    ).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Footer />)
    expect(screen.getByText('Tentang Kami')).toBeInTheDocument()
    expect(screen.getByText('Finalis')).toBeInTheDocument()
    expect(screen.getByText('Hall of Fame')).toBeInTheDocument()
    expect(screen.getByText('Prestasi Alumni')).toBeInTheDocument()
  })

  it('renders media links', () => {
    render(<Footer />)
    expect(screen.getByText('Galeri Kegiatan')).toBeInTheDocument()
    expect(screen.getByText('Berita & Rilis')).toBeInTheDocument()
    expect(screen.getByText('Agenda Acara')).toBeInTheDocument()
  })

  it('renders contact information', () => {
    render(<Footer />)
    expect(screen.getByText('Manado, Sulawesi Utara, Indonesia')).toBeInTheDocument()
    expect(screen.getByText('info@nyongnonisulut.id')).toBeInTheDocument()
  })

  it('renders social media links', () => {
    render(<Footer />)
    const instagramLink = screen.getByLabelText('Instagram Nyong Noni Sulut')
    expect(instagramLink).toBeInTheDocument()
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/nyongnonisulut')

    const emailLink = screen.getByLabelText('Email Nyong Noni Sulut')
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', 'mailto:info@nyongnonisulut.id')
  })

  it('renders copyright notice with current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`${year}`))).toBeInTheDocument()
  })

  it('renders bottom links', () => {
    render(<Footer />)
    expect(screen.getAllByText('Pendaftaran').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Tentang').length).toBeGreaterThan(0)
  })
})
