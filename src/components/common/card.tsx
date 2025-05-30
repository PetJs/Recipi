import { CardProps } from "@/types";
import Forkknife from "../../assets/svgs/ForkKnife.svg";
import Timer from "../../assets/svgs/Timer.svg";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Card: React.FC<CardProps> = ({ img, title, time, food, isFavorited, onToggleFavorite }) => {
  const { src, alt, className = '' } = img;

  if (!img) return null;

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();     
    e.stopPropagation();


    if (onToggleFavorite) {
      onToggleFavorite();
    }
  };

  return (
    <div className="flex flex-col justify-center md:h-auto h-[10em] items-center bg-gradient-to-t from-[#E7F9FD] to-[#E7F9FD]/10 text-black p-3 rounded-lg">
      <div className="relative w-full h-auto">
        <img src={typeof src === "string" ? src : src.src} alt={alt} className={`md:w-full md:h-auto w-32 rounded-lg ${className}`} />
        <Heart
          onClick={handleHeartClick}
          className={`cursor-pointer absolute top-2 right-2 transition-all ${
            isFavorited ? "fill-red-500 text-red-500" : "text-gray-400 fill-white"
          }`}
        />
      </div>

      <div className="flex flex-col items-center">
        <p className="text-ellipsis whitespace-pre-wrap md:w-[14rem] w-[10em] line-clamp-3 md:text-lg text-[10px] font-bold text-center">
          {title}
        </p>
        <div className="md:flex md:gap-6 grid gap-2 mt-2 justify-center text-white items-center">
          <div className="flex items-center bg-[#00000099] w-fit rounded-lg md:px-2 px-1">
            <img src={Timer} alt="" className="w-3 h-3" />
            <p className="md:text-sm text-[10px] whitespace-nowrap">{time} mins</p>
          </div>
          <div className="flex items-center bg-[#00000099] w-fit rounded-lg md:px-2 px-1">
            <img src={Forkknife} alt="" className="w-3 h-3" />
            <p className="md:text-sm text-[10px] whitespace-nowrap">{food}</p>
          </div>
        </div>
      </div>
      <Link to={``}></Link>
    </div>
  );
};

export default Card;
