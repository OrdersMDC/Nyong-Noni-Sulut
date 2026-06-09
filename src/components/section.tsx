import { type ReactNode } from 'react'
import { BentenanPattern } from './pattern'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  variant?: 'default' | 'cream' | 'ocean' | 'dark'
  pattern?: boolean
}

const variantStyles: Record<string, string> = {
  default: 'bg-background',
  cream: 'bg-cream',
  ocean: 'ocean-gradient text-white',
  dark: 'bg-dark text-white',
}

export function Section({ children, className = '', id, variant = 'default', pattern = false }: SectionProps) {
  return (
    <section id={id} className={`section-padding relative overflow-hidden ${variantStyles[variant]} ${className}`}>
      {pattern && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
          <BentenanPattern className="absolute -top-20 -right-20 h-[400px] w-[400px] text-primary/10" />
          <BentenanPattern className="absolute -bottom-20 -left-20 h-[300px] w-[300px] text-gold/10 rotate-45" />
        </div>
      )}
      <div className="section-container relative z-10">{children}</div>
    </section>
  )
}
