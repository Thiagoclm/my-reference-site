export type ArticleItem = {
    title: string;
    subtitle: string;
    author: string;
    image: string;
    link: string;
    tags: string[];
    date?: string;
    summary: string;
};

export const articles: ArticleItem[] = [
    {
        title: 'Santo Alberto Magno: Bispo e Doutor da Igreja',
        subtitle: 'O grande mestre dominicano e mentor de São Tomás de Aquino',
        author: 'Katholikos',
        image: 'assets/st_albert_magnus.jpg',
        link: 'santo-alberto-magno',
        tags: ['Santos', 'Dominicanos', 'Doutores da Igreja'],
        date: '15 de Novembro',
        summary:
            "Conheça a vida do grande mestre dominicano que recebeu o título de 'Magno'. Mentor de São Tomás de Aquino, foi canonizado em 1931 e declarado Padroeiro dos cultores de Ciências naturais por Pio XII.",
    },
];
