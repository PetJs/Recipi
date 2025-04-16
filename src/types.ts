
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
    imageType: string;
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
        src?: string | any;
        alt?: string;
        className?: string;
    };
    title?: string | any;
    time?: number | any;
    food?: string | any;
    isFavorited?: boolean;
    onToggleFavorite?: () => void;
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


export interface Nutrient{
    name: string;
    amount: number;
    unit: string;
    percentOfDailyNeeds: number;
}

export interface NutirionInfo{
    nutrients: Nutrient[];
}

export type User = {
    firstName?: string;
    lastName?: string;
    email?: string;
    username: string;
    spoonacularPassword: string;
};

export type AuthUser = {
    username: string;
    spoonacularPassword: string;
    hash: string;
};
  
export type ApiResponse<T> = {
    status: string;
    data: T;
};
  
  
  