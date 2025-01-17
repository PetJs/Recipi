import { CardProps } from "@/types";
import Forkknife from "../../assets/images/ForkKnife.svg"
import Timer from "../../assets/images/Timer.svg"

const Card: React.FC<CardProps> = ({img, title, time, food}) =>{
    const {src, alt, className =''} = img;

    if (!img) {
        return null; // Or return a placeholder/fallback UI
    }

    return (
        <div className="flex flex-col justify-center  bg-gradient-to-t from-[#E7F9FD] to-[#E7F9FD]/10 text-black items-center p-3 rounded-lg">
            <img src={typeof src === 'string' ? src : src.src} alt={alt} className={`md:w-full md:h-auto w-32 rounded-lg ${className}`} />
            <div>
                <p className="text-ellipsis whitespace-pre-wrap w-[14rem] line-clamp-2 text-lg font-bold">{title}</p>
                <div className="flex md:gap-6 gap-2 mt-2">
                        <div className="flex items-center bg-[#00000099] w-fit rounded-lg md:px-2 px-1">
                            <img src={Timer} alt="" className="w-3 h-3"/>
                            <p className="md:text-sm text-[12px] whitespace-nowrap">{time} mins</p>
                        </div>
                        <div className="flex items-center bg-[#00000099] w-fit rounded-lg md:px-2 px-1 ">
                            <img src={Forkknife} alt="" className="w-3 h-3"/>
                            <p className="md:text-sm text-[12px] whitespace-nowrap">{food}</p>
                        </div>
                    </div>     
            </div>
        </div>
    )
}

export default Card;