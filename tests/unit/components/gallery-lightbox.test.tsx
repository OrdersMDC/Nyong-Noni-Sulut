import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GalleryLightbox } from '@/components/gallery-lightbox'

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}))

const sampleImages = [
  { id: '1', image_url: '/photo1.jpg', title: 'Photo 1', description: 'First photo' },
  { id: '2', image_url: '/photo2.jpg', title: 'Photo 2' },
  { id: '3', image_url: '/photo3.jpg', title: 'Photo 3', description: 'Third photo' },
]

describe('GalleryLightbox', () => {
  const onClose = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    document.body.style.overflow = ''
  })

  afterEach(() => {
    document.body.style.overflow = ''
  })

  it('renders current image', () => {
    render(<GalleryLightbox images={sampleImages} initialIndex={0} onClose={onClose} />)
    expect(screen.getByAltText('Photo 1')).toBeInTheDocument()
  })

  it('renders image counter', () => {
    render(<GalleryLightbox images={sampleImages} initialIndex={0} onClose={onClose} />)
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('renders image title', () => {
    render(<GalleryLightbox images={sampleImages} initialIndex={0} onClose={onClose} />)
    expect(screen.getByText('Photo 1')).toBeInTheDocument()
  })

  it('renders image description when available', () => {
    render(<GalleryLightbox images={sampleImages} initialIndex={0} onClose={onClose} />)
    expect(screen.getByText('First photo')).toBeInTheDocument()
  })

  it('does not render description when not available', () => {
    render(<GalleryLightbox images={sampleImages} initialIndex={1} onClose={onClose} />)
    expect(screen.queryByText('Second photo')).not.toBeInTheDocument()
  })

  it('renders close button', () => {
    render(<GalleryLightbox images={sampleImages} initialIndex={0} onClose={onClose} />)
    expect(screen.getByLabelText('Tutup')).toBeInTheDocument()
  })

  it('renders prev and next buttons', () => {
    render(<GalleryLightbox images={sampleImages} initialIndex={0} onClose={onClose} />)
    expect(screen.getByLabelText('Sebelumnya')).toBeInTheDocument()
    expect(screen.getByLabelText('Selanjutnya')).toBeInTheDocument()
  })

  it('calls onClose when close button clicked', async () => {
    const user = userEvent.setup()
    render(<GalleryLightbox images={sampleImages} initialIndex={0} onClose={onClose} />)
    await user.click(screen.getByLabelText('Tutup'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when backdrop clicked', async () => {
    const user = userEvent.setup()
    render(<GalleryLightbox images={sampleImages} initialIndex={0} onClose={onClose} />)
    await user.click(screen.getByRole('dialog'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('navigates to next image when next button clicked', async () => {
    const user = userEvent.setup()
    render(<GalleryLightbox images={sampleImages} initialIndex={0} onClose={onClose} />)
    expect(screen.getByText('Photo 1')).toBeInTheDocument()
    await user.click(screen.getByLabelText('Selanjutnya'))
    expect(screen.getByText('Photo 2')).toBeInTheDocument()
    expect(screen.getByText('2 / 3')).toBeInTheDocument()
  })

  it('navigates to prev image when prev button clicked', async () => {
    const user = userEvent.setup()
    render(<GalleryLightbox images={sampleImages} initialIndex={1} onClose={onClose} />)
    await user.click(screen.getByLabelText('Sebelumnya'))
    expect(screen.getByText('Photo 1')).toBeInTheDocument()
  })

  it('wraps around to last image when going prev from first', async () => {
    const user = userEvent.setup()
    render(<GalleryLightbox images={sampleImages} initialIndex={0} onClose={onClose} />)
    await user.click(screen.getByLabelText('Sebelumnya'))
    expect(screen.getByText('Photo 3')).toBeInTheDocument()
    expect(screen.getByText('3 / 3')).toBeInTheDocument()
  })

  it('wraps around to first image when going next from last', async () => {
    const user = userEvent.setup()
    render(<GalleryLightbox images={sampleImages} initialIndex={2} onClose={onClose} />)
    await user.click(screen.getByLabelText('Selanjutnya'))
    expect(screen.getByText('Photo 1')).toBeInTheDocument()
  })

  it('handles keyboard navigation (Escape to close)', async () => {
    render(<GalleryLightbox images={sampleImages} initialIndex={0} onClose={onClose} />)
    act(() => { document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })) })
    await waitFor(() => { expect(onClose).toHaveBeenCalledTimes(1) })
  })

  it('handles keyboard navigation (ArrowRight)', async () => {
    render(<GalleryLightbox images={sampleImages} initialIndex={0} onClose={onClose} />)
    act(() => { document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })) })
    await waitFor(() => { expect(screen.getByText('Photo 2')).toBeInTheDocument() })
  })

  it('handles keyboard navigation (ArrowLeft)', async () => {
    render(<GalleryLightbox images={sampleImages} initialIndex={1} onClose={onClose} />)
    act(() => { document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })) })
    await waitFor(() => { expect(screen.getByText('Photo 1')).toBeInTheDocument() })
  })

  it('sets role="dialog" and aria-modal="true"', () => {
    render(<GalleryLightbox images={sampleImages} initialIndex={0} onClose={onClose} />)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-label', 'Galeri foto')
  })

  it('does not close when clicking on the image container', async () => {
    const user = userEvent.setup()
    render(<GalleryLightbox images={sampleImages} initialIndex={0} onClose={onClose} />)
    const imageContainer = screen.getByAltText('Photo 1').closest('div')
    if (imageContainer) await user.click(imageContainer)
    expect(onClose).not.toHaveBeenCalled()
  })
})
