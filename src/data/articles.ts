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
        author: 'O Católico Cientista',
        image: 'assets/st_albert_magnus.jpg',
        link: 'santo-alberto-magno',
        tags: ['Santos', 'Dominicanos', 'Doutores da Igreja'],
        date: '15 de Novembro',
        summary:
            "Conheça a vida do grande mestre dominicano que recebeu o título de 'Magno'. Mentor de São Tomás de Aquino, foi canonizado em 1931 e declarado Padroeiro dos cultores de Ciências naturais por Pio XII.",
    },
    {
        title: 'Fides et Ratio: Fé e Razão em Diálogo',
        subtitle: 'Encíclica de São João Paulo II sobre as relações entre fé e razão',
        author: 'São João Paulo II',
        image: 'assets/fides-et-ratio.jpg',
        link: 'fides-et-ratio',
        tags: ['Magistério', 'Filosofia', 'Fé e Razão'],
        date: '14 de Setembro',
        summary:
            'Síntese da encíclica Fides et Ratio, que propõe a fé e a razão como caminhos complementares para buscar a verdade, rejeitando relativismo e ceticismo.',
    },
    {
        title: '35+ crateras da Lua com nomes de cientistas jesuítas',
        subtitle: 'A presença histórica da Companhia de Jesus na astronomia lunar',
        author: 'O Católico Cientista',
        image: 'assets/clavius-crater.jpg',
        link: 'crateras-lunares-jesuitas',
        tags: ['Astronomia'],
        summary:
            'Síntese da tradição científica jesuíta na astronomia e das crateras lunares que homenageiam esses pesquisadores.',
    },
];
