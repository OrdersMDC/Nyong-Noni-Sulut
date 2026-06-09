import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/footer'

describe('Footer', () => {
  it('renders brand section', () => {
    render(<Footer />)
    expect(screen.getByText('Nyong Noni')).toBeInTheDocument()
    expect(screen.getByText('Sulawesi Utara')).toBeInTheDocument()
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
    expect(screen.getByText('Galeri')).toBeInTheDocument()
    expect(screen.getByText('Berita')).toBeInTheDocument()
    expect(screen.getByText('Acara')).toBeInTheDocument()
  })

  it('renders contact information', () => {
    render(<Footer />)
    expect(screen.getByText('Manado, Sulawesi Utara')).toBeInTheDocument()
    expect(screen.getByText('info@nyongnonisulut.id')).toBeInTheDocument()
    expect(screen.getByText('@nyongnonisulut')).toBeInTheDocument()
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

  it('renders newsletter section', () => {
    render(<Footer />)
    expect(screen.getByText('Ikuti Perkembangan Terbaru')).toBeInTheDocument()
    expect(screen.getByLabelText('Email untuk newsletter')).toBeInTheDocument()
    expect(screen.getByText('Berlangganan')).toBeInTheDocument()
  })

  it('renders copyright notice with current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`${year}`))).toBeInTheDocument()
  })

  it('renders bottom links', () => {
    render(<Footer />)
    expect(screen.getByText('Pendaftaran')).toBeInTheDocument()
    expect(screen.getByText('Tentang')).toBeInTheDocument()
  })
})
