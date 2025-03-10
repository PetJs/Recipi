import { ListCardProps } from "@/types";


const ListCard: React.FC<ListCardProps> = ({img, text, onClick}) => {
    const {src, alt, className =''} = img;
    return (
        <div onClick={onClick ? () => onClick() : undefined} className="md:w-20 md:h-20 w-16 flex flex-col items-center rounded-lg bg-gradient-to-t from-[#708246] to-[#708246]/10 mb-2 cursor-pointer">
            <img src={typeof src === 'string' ? src : src.src} alt={alt} className={`rounded-lg md:w-12 md:h-12 w-8 h-8 m-1 ${className}`} />
            <p className="text-white md:text-lg text-sm">{text}</p>
        </div>
    )
}

export default ListCard;