import styles from './Input.module.css'

export const Input = ({
    id,
    type = 'text',
    label,
    value,
    onChange,
    placeholder,
    icon,
    required = false,
    minLength,
    autoComplete,
    ...props
}) => {
    return (
        <div className={styles.inputGroup}>
            {label && (
                <label htmlFor={id} className={styles.label}>
                    {label}
                </label>
            )}
            <div className={styles.inputWrapper}>
                {icon && <div className={styles.inputIcon}>{icon}</div>}
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`${styles.input} ${icon ? styles.withIcon : ''}`}
                    required={required}
                    minLength={minLength}
                    autoComplete={autoComplete}
                    {...props}
                />
            </div>
        </div>
    )
}
