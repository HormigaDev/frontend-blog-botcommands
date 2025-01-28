import Image from 'next/image';

interface ThumbnailProps {
    alt: string;
    src: string;
}

const Thumbnail = ({ alt, src }: ThumbnailProps) => {
    return (
        <div className="justify-center items-center flex mb-4 mt-4">
            <Image alt={alt} src={src} width={200} height={200} className="rounded-md" />
        </div>
    );
};

export default Thumbnail;
