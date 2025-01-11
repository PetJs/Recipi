
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
    diets: string[];
}

export interface ListCardProps{
    img: {
        src: string | any;
        alt: string;
        className?: string;
    };
    text: string;
}