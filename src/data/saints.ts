export type SaintContent = {
    name: string;
    title: string;
    feastDay: string;
    image: string;
    sourceLinks?: {
        label: string;
        url: string;
    }[];
    imageCredit?: {
        title: string;
        artist: string;
        style: string;
    };
    history: string[];
    attributes: string[];
};

import { SAINT_NAMES_BY_DATE } from './saints-calendar';

export type SaintDayEntry = {
    key: string;
    month: number;
    day: number;
    isPlaceholder: boolean;
    saint: SaintContent;
};

const monthNames = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
];

const pad2 = (value: number) => String(value).padStart(2, '0');

const formatFeastDay = (month: number, day: number) => `${day} de ${monthNames[month - 1]}`;

const buildSourceLinks = (saintName: string) => [
    {
        label: `Wikipedia: ${saintName}`,
        url: `https://pt.wikipedia.org/w/index.php?search=${encodeURIComponent(saintName)}&title=Especial:Pesquisa&ns0=1`,
    },
];

const buildGeneratedSaint = (month: number, day: number, saintName: string): SaintContent => ({
    name: saintName,
    title: 'Memória litúrgica do calendário católico',
    feastDay: formatFeastDay(month, day),
    image: 'assets/cover-example.jpg',
    sourceLinks: buildSourceLinks(saintName),
    history: [
        `${saintName} é lembrado pela Igreja nesta data no calendário litúrgico.`,
        'Use os links de referência para conhecer melhor a vida, o testemunho e a devoção relacionados a esta celebração.',
    ],
    attributes: ['Memória litúrgica diária', 'Calendário católico 2025', 'Vida e testemunho cristão'],
});

const defaultSaint = (month: number, day: number): SaintContent => ({
    name: 'Santo do Dia',
    title: 'Biografia em preparação',
    feastDay: formatFeastDay(month, day),
    image: 'assets/cover-example.jpg',
    sourceLinks: buildSourceLinks(`Santo do dia ${pad2(day)}-${pad2(month)}`),
    history: [
        'Estamos preparando o conteúdo completo deste santo para esta data. Em breve, esta página trará uma biografia detalhada e a espiritualidade própria do dia.',
        'Enquanto isso, permaneça unido à Igreja na oração diária e volte novamente para acompanhar as novas publicações do calendário dos santos.',
    ],
    attributes: ['Memória litúrgica diária', 'Vida e testemunho cristão', 'Conteúdo em atualização contínua'],
});

const saintsByDate: Record<string, SaintContent> = {
    '03-19': {
        name: 'São José',
        title: 'Esposo da Virgem Maria, Protetor da Igreja',
        feastDay: '19 de março',
        image: 'assets/saint-joseph.jpg',
        imageCredit: {
            title: 'Saint Joseph with the child Jesus',
            artist: 'Bartolomé Esteban Perez Murillo (1618 - 1682)',
            style: 'Baroque',
        },
        sourceLinks: buildSourceLinks('São José'),
        history: [
            'São José foi o protetor e padrasto de Jesus Cristo, escolhido por Deus para cuidar de sua Mãe e de seu Filho. Embora poucos detalhes sobre sua vida nos sejam conhecidos através dos Evangelhos, a Tradição da Igreja nos revela um homem de profunda fé e virtude.',
            'Descendente da linhagem real de Davi, José era carpinteiro de profissão, um trabalho respeitável e dignificado. Sua vida foi marcada pelo trabalho, dedicação e entrega total à vontade de Deus. Casado com Maria, viveu em Nazaré mantendo a Sagrada Família com seu labor honesto.',
            'Como protetor da Sagrada Família, José demonstrou seu amor através de atos concretos: protegeu Maria de qualquer acusação injusta, educou Jesus nos costumes judeus e nas habilidades de um carpinteiro, e fugiu para o Egito para salvar o Menino Jesus da perseguição de Herodes.',
            'A morte de São José é cercada de amor de Jesus e Maria. Considerado protetor dos moribundos, invocamos sua intercessão para obter uma boa morte. A Igreja celebra sua festa no dia 19 de março, quando recordamos suas virtudes de castidade, obediência e justiça.',
        ],
        attributes: [
            'Protetor da Igreja Católica',
            'Padroeiro dos trabalhadores',
            'Intercessor dos moribundos',
            'Modelo de paternidade responsável',
            'Exemplo de humildade e silêncio contemplativo',
            'Protetor da Sagrada Família e do lar cristão',
        ],
    },
};

export const getSaintForDay = (month: number, day: number): SaintDayEntry => {
    const key = `${pad2(month)}-${pad2(day)}`;
    const saintName = SAINT_NAMES_BY_DATE[key];
    const saint = saintsByDate[key] || (saintName ? buildGeneratedSaint(month, day, saintName) : defaultSaint(month, day));

    return {
        key,
        month,
        day,
        isPlaceholder: !Boolean(saintsByDate[key] || saintName),
        saint,
    };
};

export const getAllSaintDays = (): SaintDayEntry[] => {
    const year = 2025;
    const days: SaintDayEntry[] = [];

    for (let month = 1; month <= 12; month += 1) {
        const totalDays = new Date(year, month, 0).getDate();
        for (let day = 1; day <= totalDays; day += 1) {
            days.push(getSaintForDay(month, day));
        }
    }

    return days;
};
