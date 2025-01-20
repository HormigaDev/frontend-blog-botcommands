// Input estilizado con TailwindCSS
type InputProps = {
    type: 'text' | 'password' | 'email' | 'number' | 'textarea';
    id: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    rows?: number;
    hiddenLabel?: boolean;
};

const Input = ({
    type,
    id,
    placeholder,
    value,
    onChange,
    rows,
    hiddenLabel = false,
}: InputProps) => {
    if (type === 'textarea') {
        return (
            <div>
                {!hiddenLabel && (
                    <label htmlFor={id} className="block text-neutral mb-2">
                        {placeholder}
                    </label>
                )}
                <textarea
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    rows={rows || 4}
                    className="w-full p-3 bg-secondary-dark text-white border border-neutral rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
            </div>
        );
    }

    return (
        <div>
            {!hiddenLabel && (
                <label htmlFor={id} className="block text-neutral mb-2">
                    {placeholder}
                </label>
            )}
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full p-3 bg-secondary-dark text-white border border-neutral rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
        </div>
    );
};

export default Input;
