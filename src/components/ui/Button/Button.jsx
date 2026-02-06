import styles from './Button.module.css'

export const Button = ({
    children,
    type = 'button',
    variant = 'primary',
    fullWidth = false,
    disabled = false,
    onClick,
    ...props
}) => {
    const className = `
    ${styles.button}
    ${styles[variant]}
    ${fullWidth ? styles.fullWidth : ''}
  `.trim()

    return (
        <button
            type={type}
            className={className}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}
