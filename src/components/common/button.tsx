import { ButtonProps } from "@/types";


const Button: React.FC<ButtonProps> = ({text, className}) => {

    return(
        <div className={`w-24 py-1 text-center flex justify-center  items-center bg-black text-white rounded-lg ${className}`}>
            <p className="text-sm">{text}</p>
        </div>
    )
}

export default Button;