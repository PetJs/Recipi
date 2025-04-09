
export interface NavBarProps{
    Logo: string;
    Facebook: string;
    Twitter: string;
    Insta: string
}

export interface Random{
    image: string;
    summary: string;
    id: number;
    readyInMinutes: number;
    title: string;
    dishTypes: string[];
}

export interface ListCardProps{
    img: {
        src: any;
        alt: string;
        className?: string;
    };
    text: string;
    onClick?: () => void;
}

export interface CardProps{
    img: {
        src: string | any;
        alt: string;
        className?: string;
    };
    title: string | any;
    time: number | any;
    food: string | any;
}

export interface ButtonProps{
    text: string;
    className: string;
}

export interface Ingredient {
    name: string;
}
  
export interface Step {
    number: number;
    step: string;
}
  
export interface Instruction {
    steps: Step[];
}
  
export interface Recipe {
    id: number;
    title: string;
    image: string;
    readyInMinutes: number;
    dishTypes: string[];
    extendedIngredients: Ingredient[]; 
    summary: string;
    analyzedInstructions: Instruction[]; 
}
  