'use client'

import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { ButtonHTMLAttributes, forwardRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export interface CustomButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      className,
      children,
      disabled,
      variant = 'default',
      size = 'md',
      isLoading,
      ...props
    },
    ref
  ) => {
    const buttonSettings = useQuery(api.buttons.getButton)
    const [isHovered, setIsHovered] = useState(false)

    // Default styles if button settings are not yet loaded
    const defaultStyles = {
      bg: '#4f46e5', // Default indigo color
      color: '#ffffff',
      radius: 4,
    }

    const styles = buttonSettings || defaultStyles

    // Size variants
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    // Style variants
    const getVariantStyles = () => {
      switch (variant) {
        case 'outline':
          return {
            backgroundColor: 'transparent',
            color: styles.color,
            border: `1px solid ${styles.color}`,
            boxShadow: isHovered ? `0 0 0 1px ${styles.color}` : 'none',
          }
        case 'ghost':
          return {
            backgroundColor: 'transparent',
            color: styles.color,
            boxShadow: 'none',
            border: 'none',
          }
        default:
          return {
            backgroundColor: styles.bg,
            color: styles.color,
            border: 'none',
            opacity: isHovered ? 0.9 : 1,
          }
      }
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'relative font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          sizeClasses[size],
          className
        )}
        style={{
          ...getVariantStyles(),
          borderRadius: `${styles.radius}px`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {isLoading ? (
          <div className='absolute inset-0 flex items-center justify-center'>
            <Loader2 className='h-4 w-4 animate-spin' />
          </div>
        ) : null}
        <span
          className={cn(
            'flex items-center justify-center gap-3',
            isLoading ? 'invisible' : ''
          )}
        >
          {children}
        </span>
      </button>
    )
  }
)

CustomButton.displayName = 'CustomButton'

export default CustomButton
