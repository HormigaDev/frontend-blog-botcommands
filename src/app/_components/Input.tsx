import { makeStyles } from '@/utils/makeStyles';

// Input estilizado con TailwindCSS
type InputProps = {
    type: 'text' | 'password' | 'email' | 'number' | 'textarea';
    id: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    rows?: number;
    hiddenLabel?: boolean;
    label?: string;
    maxlength?: number;
    className?: string;
};

const Input = ({
    type,
    id,
    placeholder,
    label = '',
    value,
    onChange,
    rows,
    hiddenLabel = false,
    maxlength = 10000,
    className = '',
}: InputProps) => {
    if (type === 'textarea') {
        return (
            <div>
                {!hiddenLabel && (
                    <label htmlFor={id} className="block text-neutral mb-2">
                        {label || placeholder}
                    </label>
                )}
                <textarea
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    rows={rows || 4}
                    maxLength={maxlength}
                    className={makeStyles([
                        'w-full p-3 bg-secondary-dark text-white border',
                        'border-neutral rounded focus:outline-none',
                        'focus:ring-2 focus:ring-primary focus:border-transparent',
                        'h-[50px]',
                        className,
                    ])}
                />
            </div>
        );
    }

    return (
        <div>
            {!hiddenLabel && (
                <label htmlFor={id} className="block text-neutral mb-2">
                    {label || placeholder}
                </label>
            )}
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                max={maxlength}
                maxLength={maxlength}
                onChange={onChange}
                className={makeStyles([
                    'w-full p-3 bg-secondary-dark text-white border border-neutral rounded',
                    'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                    'h-[50px]',
                    className,
                ])}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
            />
        </div>
    );
};

export default Input;
