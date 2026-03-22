import { Magnetic } from '@/components/ui/Magnetic'
import { ArrowRight } from 'lucide-react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  href?: string
  className?: string
  onClick?: () => void
  /** Wraps button in Magnetic effect (default: true for primary) */
  magnetic?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  href,
  className = '',
  onClick,
  magnetic,
}: ButtonProps) {
  const useMagnetic = magnetic ?? variant === 'primary'

  const baseStyles = 'inline-flex items-center gap-2 font-sans font-semibold transition-all duration-300'

  const variants = {
    primary:
      'btn-primary text-[#090a0c] px-7 py-4 rounded-full text-sm',
    secondary:
      'text-text-primary text-sm font-medium hover:gap-3',
    outline:
      'border border-text-primary text-text-primary hover:bg-accent-light hover:border-accent-light px-5 py-2 rounded-full text-sm',
  }

  const classes = `${baseStyles} ${variants[variant]} ${className}`

  const inner = href ? (
    <a href={href} className={classes}>
      {children}
      {variant === 'secondary' && <ArrowRight className="w-4 h-4" />}
    </a>
  ) : (
    <button onClick={onClick} className={classes}>
      {children}
      {variant === 'secondary' && <ArrowRight className="w-4 h-4" />}
    </button>
  )

  return useMagnetic ? <Magnetic>{inner}</Magnetic> : inner
}
