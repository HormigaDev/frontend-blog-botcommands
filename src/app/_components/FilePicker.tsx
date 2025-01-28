import { makeStyles } from '@/utils/makeStyles';
import { useState } from 'react';

interface FilePickerProps {
    onChange?: (file: File) => void;
    className?: string;
    accept?: string;
}

const FilePicker = ({ onChange = () => {}, className = '', accept = '' }: FilePickerProps) => {
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            onChange(file);
        }
    };

    return (
        <div className="relative">
            <input
                type="file"
                id="file-picker"
                className="hidden"
                onChange={handleFileChange}
                accept={accept}
            />

            <label
                htmlFor="file-picker"
                className={makeStyles([
                    'flex items-center justify-center px-4 py-2 bg-primary',
                    'text-white rounded-lg cursor-pointer',
                    'hover:bg-primary-dark transition-colors',
                    className,
                ])}
            >
                <span className="text-md">
                    <i className="fa fa-file-upload mr-2" />
                    {fileName ? fileName : 'Seleccione un archivo'}
                </span>
            </label>
        </div>
    );
};

export default FilePicker;
