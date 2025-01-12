import { CardProps } from "@/types";
import Example from "../../assets/images/exampleImg.png"

const Card: React.FC<CardProps> = ({img, title, time, food}) =>{
    const {src, alt, className =''} = img;

    return (
        <div className="flex flex-col justify-center  bg-black text-white items-center p-3 rounded-lg">
            <img src={typeof src === 'string' ? src : src.src} alt={alt} className={`md:w-full md:h-auto w-32 rounded-lg ${className}`} />
            <div>
                <p className="line-clamp-2">{title}</p>
                <div className="flex gap-3">
                    <p className="text-sm">{time}</p>
                    <p className="whitespace-nowrap text-sm">{food}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;