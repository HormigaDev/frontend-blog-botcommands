import { makeStyles } from '@/utils/makeStyles';

type ButtonProps = {
    label?: string;
    onClick: (e?: any) => void;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
    size?: 'small' | 'medium' | 'large';
    rounded?: boolean;
    disabled?: boolean;
    className?: string;
    icon?: string;
    onRightClick?: (e?: any) => void;
};

const Button = ({
    label = '',
    onClick,
    color = 'primary',
    size = 'medium',
    rounded = false,
    disabled = false,
    className = '',
    icon = '',
    onRightClick = () => {},
}: ButtonProps) => {
    const baseStyles = 'text-white font-semibold transition-colors duration-200 focus:outline-none';
    const sizeStyles = {
        small: 'px-3 py-1 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg',
    };
    const colorStyles = {
        primary: 'bg-primary hover:bg-primary-dark',
        secondary: 'bg-secondary hover:bg-secondary-dark',
        success: 'bg-success hover:bg-success-dark',
        warning: 'bg-warning hover:bg-warning-dark',
        error: 'bg-error hover:bg-red-700',
        neutral: 'bg-neutral hover:bg-neutral-dark',
    };

    const roundedStyles = rounded ? 'rounded-full' : 'rounded-md';
    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : colorStyles[color];

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={makeStyles([
                baseStyles,
                sizeStyles[size],
                roundedStyles,
                disabledStyles,
                className,
            ])}
            onContextMenu={onRightClick}
        >
            {icon && <i className={`${icon} ${label && 'mr-2'}`}></i>}
            {label}
        </button>
    );
};

export default Button;
