import { makeStyles } from '@/utils/makeStyles';
import { useState, useRef } from 'react';

type SelectProps = {
    id: string;
    label?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { label: string; value: number | string }[];
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
    const [selectedOption, setSelectedOption] = useState(value);

    const selectRef = useRef<HTMLDivElement>(null);

    const handleOptionClick = (option: { label: string; value: number | string }) => {
        setSelectedOption(option.value);
        onChange({ target: { value: option.value } } as React.ChangeEvent<HTMLSelectElement>);
        setIsOpen(false);
    };

    return (
        <div>
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
                ])}
            >
                <span>
                    {selectedOption
                        ? options.find((opt) => opt.value === selectedOption)?.label
                        : 'Selecciona...'}
                </span>
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
                    {options.map((option, index) => (
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

            <select id={id} value={selectedOption} onChange={onChange} className="hidden">
                <option value="">Selecciona...</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
