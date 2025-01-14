
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
}