import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import he from 'he';

const BASE_URL = 'https://www.vaticannews.va';
const FALLBACK_IMAGE = 'https://www.vaticannews.va/content/dam/vaticannews/web/banner/banner%20santi.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg';
const MONTH_NAMES = [
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

const daysInMonth2025 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const decodeEntities = (text) => {
    let value = text;
    for (let index = 0; index < 3; index += 1) {
        const decoded = he.decode(value);
        if (decoded === value) break;
        value = decoded;
    }
    return value;
};

const stripHtml = (value) =>
    decodeEntities(value)
        .replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style[\s\S]*?<\/style>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

const attrValue = (tag, attr) => {
    const regex = new RegExp(`${attr}\\s*=\\s*(["'])(.*?)\\1`, 'i');
    const match = tag.match(regex);
    return match?.[2]?.trim() ?? null;
};

const getMetaContent = (html, key) => {
    const tags = html.match(/<meta\s+[^>]*>/gi) || [];
    for (const tag of tags) {
        const name = attrValue(tag, 'name');
        const property = attrValue(tag, 'property');
        if (name === key || property === key) {
            const content = attrValue(tag, 'content');
            if (content) return decodeEntities(content);
        }
    }
    return null;
};

const cleanParagraph = (text) => {
    const value = stripHtml(text)
        .replace(/^\s*[-•]\s*/, '')
        .replace(/\s+[–—-]\s+Leia tudo.*/i, '')
        .replace(/\s+[–—-]\s+Vatican News.*/i, '')
        .trim();

    if (!value) return null;

    const blocked = [
        'cookie policy',
        'privacy policy',
        'todos os direitos reservados',
        'inscreva-se',
        'newsletter',
        'programação',
        'podcast',
        'busca',
        'facebook',
        'youtube',
        'instagram',
        'x.com',
        'descubra no vatican news a história',
        'quem é o santo do dia? visite vatican news',
        'o santo do dia é uma resenha diária',
        'histórias de mestres da vida cristã',
    ];

    const lower = value.toLowerCase();
    if (blocked.some((token) => lower.includes(token))) return null;
    if (value.length < 80) return null;

    return value;
};

const getParagraphs = (html, limit = 2) => {
    const paragraphs = [];
    const matches = html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi);
    for (const match of matches) {
        const cleaned = cleanParagraph(match[1]);
        if (!cleaned) continue;
        if (!paragraphs.includes(cleaned)) paragraphs.push(cleaned);
        if (paragraphs.length >= limit) break;
    }
    return paragraphs;
};

const buildPrayer = (saintName) => [
    `Ó ${saintName}, testemunha fiel de Cristo, intercede por nós para que vivamos com humildade, esperança e caridade no caminho do Evangelho.`,
    'Alcança-nos a graça de permanecer firmes na fé, perseverantes na oração e generosos no serviço aos irmãos. Amém.',
];

const buildBioIntro = (saintName, month, day) => {
    const feastDay = buildFeastDay(month, day);
    return `Hoje, ${feastDay}, a Igreja celebra ${saintName}. Abaixo, você encontra um resumo breve da vida e da espiritualidade desta memória litúrgica.`;
};

const extractNameFromHistory = (historyLines) => {
    for (const line of historyLines) {
        const match = line.match(/vicissitudes de\s+(.+?),(?:\s*o\s+Santo\s+do\s+dia|\s*Santo\s+do\s+dia)/i);
        if (match?.[1]) {
            return match[1].trim().replace(/\.$/, '');
        }
    }
    return null;
};

const normalizeSaintNamePtBr = (rawName, fallbackName = '') => {
    const name = (rawName || '').trim();
    if (!name) return fallbackName || rawName;

    if (/^SS\.\s+/i.test(name)) {
        if (/^Santos\b/i.test(fallbackName)) {
            return fallbackName;
        }
        return name.replace(/^SS\.\s+/i, 'Santos ');
    }

    if (/^S\.\s+/i.test(name)) {
        const rest = name.replace(/^S\.\s+/i, '').trim();

        if (/^Santa\b/i.test(fallbackName)) return `Santa ${rest}`;
        if (/^São\b/i.test(fallbackName)) return `São ${rest}`;
        if (/^Santo\b/i.test(fallbackName)) return `Santo ${rest}`;

        const feminineHints = [
            /^Maria\b/i,
            /^Teresa\b/i,
            /^Inês\b/i,
            /^Clara\b/i,
            /^Mônica\b/i,
            /^Ângela\b/i,
            /^Joana\b/i,
            /^Rosa\b/i,
            /^Catarina\b/i,
            /^Cecília\b/i,
            /^Balbina\b/i,
            /^Gemma\b/i,
            /^Verônica\b/i,
            /^Isabel\b/i,
            /^Paulina\b/i,
            /^Faustina\b/i,
            /,\s*virgem\b/i,
            /,\s*religiosa\b/i,
            /,\s*mística\b/i,
        ];

        const isFeminine = feminineHints.some((pattern) => pattern.test(rest));
        return `${isFeminine ? 'Santa' : 'São'} ${rest}`;
    }

    return name;
};

const buildFeastDay = (month, day) => `${day} de ${MONTH_NAMES[month - 1]}`;

const readCalendarMap = async (calendarPath) => {
    const source = await readFile(calendarPath, 'utf8');
    const parsed = {};

    const matcher = /'(\d{2}-\d{2})':\s*'((?:\\'|[^'])*)'/g;
    for (const match of source.matchAll(matcher)) {
        const key = match[1];
        const name = match[2].replace(/\\'/g, "'").trim();
        parsed[key] = name;
    }

    return parsed;
};

const sleep = (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms);
});

const fetchText = async (url, attempts = 2) => {
    for (let attempt = 1; attempt <= attempts; attempt += 1) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000);

        try {
            const response = await fetch(url, {
                headers: {
                    'user-agent': 'Mozilla/5.0 (compatible; OCatolicoCientistaBot/1.0)',
                    accept: 'text/html,application/xhtml+xml',
                },
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status} for ${url}`);
            }

            return response.text();
        } catch (error) {
            clearTimeout(timeoutId);
            if (attempt >= attempts) {
                throw error;
            }
            await sleep(400 * attempt);
        }
    }

    throw new Error(`Falha ao carregar: ${url}`);
};

const getDayDetailInfo = (dayHtml, monthKey, dayKey) => {
    const regex = new RegExp(`<a[^>]*href=(["'])([^"']*/pt/santo-do-dia/${monthKey}/${dayKey}/[^"']+\\.html)\\1[^>]*>([\\s\\S]*?)<\\/a>`, 'i');
    const match = dayHtml.match(regex);
    if (!match) return { url: null, label: null };

    const value = decodeEntities(match[2]);
    const label = cleanParagraph(match[3]) || stripHtml(match[3]) || null;

    if (value.startsWith('http')) return { url: value, label };
    if (value.startsWith('/')) return { url: `${BASE_URL}${value}`, label };
    return { url: `${BASE_URL}/${value}`, label };
};

const getHeadingFromHtml = (html) => {
    const m = html.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/i);
    const text = m ? stripHtml(m[1]) : null;
    return text && text.length > 6 ? text : null;
};

const buildEntry = async ({ key, month, day, saintName }) => {
    const mm = String(month).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const dayUrl = `${BASE_URL}/pt/santo-do-dia/${mm}/${dd}.html`;

    let dayHtml = '';
    let detailUrl = null;
    let detailHtml = '';

    try {
        dayHtml = await fetchText(dayUrl);
        const detailInfo = getDayDetailInfo(dayHtml, mm, dd);
        detailUrl = detailInfo.url;
    } catch {
        dayHtml = '';
    }

    if (detailUrl) {
        try {
            detailHtml = await fetchText(detailUrl);
        } catch {
            detailHtml = '';
        }
    }

    const title =
        getHeadingFromHtml(detailHtml) ||
        getHeadingFromHtml(dayHtml) ||
        'Memória litúrgica do calendário católico';

    const image =
        getMetaContent(detailHtml, 'og:image') ||
        getMetaContent(dayHtml, 'og:image') ||
        FALLBACK_IMAGE;

    const description =
        getMetaContent(detailHtml, 'description') ||
        getMetaContent(dayHtml, 'description') ||
        '';

    const paragraphs = [
        ...getParagraphs(detailHtml, 2),
        ...getParagraphs(dayHtml, 2),
    ];

    const uniqueHistory = [];
    const pushHistory = (text) => {
        const cleaned = cleanParagraph(text || '');
        if (!cleaned) return;
        if (!uniqueHistory.includes(cleaned)) uniqueHistory.push(cleaned);
    };

    pushHistory(description);
    for (const p of paragraphs) pushHistory(p);

    if (uniqueHistory.length === 0) {
        uniqueHistory.push(
            `${saintName} é celebrado pela Igreja nesta data no calendário litúrgico.`,
            'Seu testemunho cristão permanece como convite à santidade na vida cotidiana, na fidelidade a Cristo e no amor à Igreja.',
        );
    }

    const extractedName = extractNameFromHistory(uniqueHistory);
    const rawEffectiveName = extractedName && extractedName.length > 2 ? extractedName : saintName;
    const effectiveName = normalizeSaintNamePtBr(rawEffectiveName, saintName);

    const historyWithIntro = [
        buildBioIntro(effectiveName, month, day),
        ...uniqueHistory,
    ].slice(0, 3);

    const sourceLinks = [
        { label: 'Vatican News — Santo do Dia', url: dayUrl },
        { label: 'Canção Nova — Busca de Santos', url: `https://www.cancaonova.com/?s=${encodeURIComponent(effectiveName)}` },
    ];

    if (detailUrl) {
        sourceLinks.splice(1, 0, { label: 'Vatican News — Perfil do Santo', url: detailUrl });
    }

    return {
        key,
        value: {
            name: effectiveName,
            title,
            feastDay: buildFeastDay(month, day),
            image,
            sourceLinks,
            history: historyWithIntro,
            prayer: buildPrayer(effectiveName),
            attributes: ['Memória litúrgica diária', 'Exemplo de vida cristã', 'Intercessão dos santos'],
        },
    };
};

const toTsObjectString = (entries) => {
    const rows = entries
        .map(({ key, value }) => `    '${key}': ${JSON.stringify(value, null, 8).replace(/\n/g, '\n    ')}`)
        .join(',\n');

    return `import type { SaintContent } from './saints';\n\n// Arquivo gerado automaticamente por scripts/generate-saints-content.mjs\n// Fontes católicas: Vatican News (santo do dia) e Canção Nova (link de referência).\nexport const GENERATED_SAINTS_BY_DATE: Record<string, SaintContent> = {\n${rows}\n};\n`;
};

const run = async () => {
    const root = process.cwd();
    const calendarPath = path.join(root, 'src/data/saints-calendar.ts');
    const outputPath = path.join(root, 'src/data/saints-generated.ts');

    const calendarMap = await readCalendarMap(calendarPath);

    const keys = [];
    for (let month = 1; month <= 12; month += 1) {
        const totalDays = daysInMonth2025[month - 1];
        for (let day = 1; day <= totalDays; day += 1) {
            keys.push(`${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
        }
    }

    const entries = [];
    for (let index = 0; index < keys.length; index += 1) {
        const key = keys[index];
        const [mm, dd] = key.split('-');
        const month = Number(mm);
        const day = Number(dd);
        const saintName = calendarMap[key] || `Santo do dia ${dd}/${mm}`;

        const result = await buildEntry({ key, month, day, saintName });
        entries.push(result);

        if ((index + 1) % 20 === 0) {
            console.log(`processados: ${index + 1}/${keys.length}`);
        }
    }

    await writeFile(outputPath, toTsObjectString(entries), 'utf8');
    console.log(`arquivo gerado: ${outputPath}`);
    console.log(`total de entradas: ${entries.length}`);
};

run().catch((error) => {
    console.error(error);
    process.exit(1);
});