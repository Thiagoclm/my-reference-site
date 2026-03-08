export type ScientistItem = {
    name: string;
    subtitle: string;
    summary: string;
    image: string;
    link: string;
    tags: string[];
};

export const scientists: ScientistItem[] = [
    {
        name: 'Irmã Mary Kenneth Keller',
        subtitle: 'Primeira mulher a obter um PhD em Ciência da Computação nos EUA (1965)',
        summary:
            'Religiosa católica e pioneira da computação na educação, Irmã Mary Kenneth Keller foi uma das primeiras doutoras em ciência da computação nos EUA. Defendeu o uso da tecnologia como instrumento de inclusão e criou um departamento acadêmico que formou gerações de estudantes.',
        image: 'assets/sister-mary-kenneth-keller.jpg',
        link: 'cientistas/sister-mary-kenneth-keller',
        tags: ['Computação', 'Educação']
    },
    {
        name: 'Pe. Georges Lemaître',
        subtitle: 'Sacerdote e físico belga, pioneiro da teoria do universo em expansão',
        summary:
            'Padre e físico teórico, Georges Lemaître formulou em 1927 um modelo de universo em expansão e, em 1931, a hipótese do átomo primordial. Seu trabalho está na origem da cosmologia moderna e é referência no diálogo equilibrado entre fé e razão.',
        image: 'assets/georges-lemaitre.jpg',
        link: 'cientistas/georges-lemaitre',
        tags: ['Cosmologia', 'Big Bang']
    },
    {
        name: 'Gregor Mendel',
        subtitle: 'Monge agostiniano e fundador da genética clássica',
        summary:
            'Em experimentos rigorosos com ervilhas, Mendel identificou padrões matemáticos da hereditariedade e estabeleceu leis que estruturam a genética até hoje. Sua pesquisa foi reconhecida plenamente apenas décadas após sua morte, tornando-se base da biologia moderna.',
        image: 'assets/gregor-mendel.jpg',
        link: 'cientistas/gregor-mendel',
        tags: ['Genética', 'Hereditariedade']
    },
    {
        name: 'Pe. Stanley Jaki',
        subtitle: 'Monge beneditino, físico e historiador da ciência',
        summary:
            'Com doutorados em teologia e física, Stanley Jaki analisou os limites epistemológicos das teorias científicas e criticou reducionismos cientificistas. Sua obra se tornou importante para o diálogo intelectual entre cosmologia, filosofia e tradição cristã.',
        image: 'assets/stanley-jaki.jpg',
        link: 'cientistas/stanley-jaki',
        tags: ['Física', 'Filosofia da Ciência']
    },
    {
        name: 'Sir Charles Kuen Kao',
        subtitle: 'Engenheiro e físico, pioneiro da comunicação por fibra óptica',
        summary:
            'Conhecido como “pai da fibra óptica”, Charles Kuen Kao demonstrou que fibras de vidro ultra puras podiam transportar luz por longas distâncias, tornando viáveis as telecomunicações modernas. Sua descoberta foi decisiva para a infraestrutura da internet e lhe rendeu o Nobel de Física em 2009.',
        image: 'assets/charles-kuen-kao.jpg',
        link: 'cientistas/charles-kuen-kao',
        tags: ['Fibra Óptica', 'Nobel']
    }
];