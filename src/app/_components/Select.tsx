import { makeStyles } from '@/utils/makeStyles';
import { useState, useRef, useEffect } from 'react';

type Option = { label: string; value: string | number };
type SelectProps = {
    id: string;
    label?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Option[] | number[] | string[];
    className?: string;
    hiddenLabel?: boolean;
};

const Select = ({
    id,
    label,
    value,
    onChange,
    options,
    className = '',
    hiddenLabel = false,
}: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    const selectRef = useRef<HTMLDivElement>(null);

    const parseOptions = (): Option[] => {
        if (options.length > 0 && typeof options[0] === 'object') {
            return options as Option[];
        }
        return (options as (string | number)[]).map((opt) => ({
            label: String(opt),
            value: opt,
        }));
    };

    const parsedOptions = parseOptions();

    useEffect(() => {
        // Solo actualiza el estado si el valor inicial es diferente del estado actual
        if (!selectedOption || String(selectedOption.value) !== String(value)) {
            const initialOption =
                parsedOptions.find((opt) => String(opt.value) === String(value)) || null;
            setSelectedOption(initialOption);
        }
    }, [value, parsedOptions, selectedOption]);

    const handleOptionClick = (option: Option) => {
        setSelectedOption(option);
        onChange({ target: { value: option.value } } as React.ChangeEvent<HTMLSelectElement>);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            {!hiddenLabel && (
                <label htmlFor={id} className="block text-neutral mb-2">
                    {label}
                </label>
            )}
            <div
                ref={selectRef}
                onClick={() => setIsOpen(!isOpen)}
                className={makeStyles([
                    className,
                    'relative w-full p-3 bg-secondary-dark text-white border border-neutral',
                    'rounded cursor-pointer focus:outline-none focus:ring-2',
                    'focus:ring-primary focus:border-transparent',
                    'h-[50px]',
                ])}
            >
                <span>{selectedOption?.label || 'Selecciona...'}</span>
                <i
                    className={makeStyles([
                        'fa fa-chevron-down absolute right-3 top-1/2',
                        'transform -translate-y-1/2 text-neutral',
                    ])}
                />
            </div>

            {isOpen && (
                <div
                    className={makeStyles([
                        'absolute bg-secondary-dark text-white border border-neutral',
                        'rounded mt-1 max-h-40 overflow-auto z-10',
                    ])}
                    style={{
                        width: selectRef.current ? selectRef.current.offsetWidth : 'auto',
                    }}
                >
                    {parsedOptions.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className="p-3 hover:bg-primary hover:text-white cursor-pointer"
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}

            <select
                id={id}
                value={String(selectedOption?.value || '')}
                onChange={(e) => {
                    const selected = parsedOptions.find(
                        (opt) => String(opt.value) === e.target.value,
                    );
                    handleOptionClick(selected || { label: '', value: '' });
                }}
                className="hidden"
            >
                <option value="">Selecciona...</option>
                {parsedOptions.map((option, index) => (
                    <option key={index} value={String(option.value)}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
