'use client';
import { makeStyles } from '@/utils/makeStyles';
import React, { useState } from 'react';
import DatePickerLib from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parse } from 'date-fns';

type DatePickerProps = {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    dateFormat?: string;
    hiddenLabel?: boolean;
};

const DatePicker = ({ id, label, value, onChange, dateFormat = 'dd/MM/yyyy', hiddenLabel = false }: DatePickerProps) => {
    const [selectedDate, setSelectedDate] = useState(
        value ? parse(value, 'yyyy-MM-dd', new Date()) : null,
    );

    const handleChange = (date: Date | null) => {
        setSelectedDate(date);

        onChange({
            target: {
                value: date ? format(date, 'yyyy-MM-dd') : '',
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <div className="relative">
            {!hiddenLabel && <label htmlFor={id} className="block text-neutral mb-2">
                {label}
            </label>}
            <div
                className={makeStyles([
                    'relative w-full p-3 pr-10 bg-secondary-dark text-white border border-neutral rounded',
                    'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                    'h-[50px]'
                ])}
            >
                <DatePickerLib
                    id={id}
                    selected={selectedDate}
                    onChange={handleChange}
                    dateFormat={dateFormat}
                    className="w-full bg-transparent text-white focus:outline-none"
                    placeholderText="Selecciona una fecha"
                    calendarClassName="custom-calendar"
                />
                <i className="fa fa-calendar absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral" />
            </div>
        </div>
    );
};

export default DatePicker;
