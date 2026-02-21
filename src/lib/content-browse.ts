import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { articles } from '../data/articles';

export type BrowseEntry = {
    title: string;
    slug: string;
    summary: string;
    cover: string;
    tags: string[];
    category: string;
    subcategory: string;
};

export type BrowseGroup = {
    slug: string;
    name: string;
    count: number;
    entries: BrowseEntry[];
};

const contentRoot = path.resolve('./content');

const slugify = (value: string) =>
    value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

const walkMarkdownFiles = (dir: string, files: string[] = []) => {
    for (const item of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            walkMarkdownFiles(fullPath, files);
        } else if (item.endsWith('.md')) {
            files.push(fullPath);
        }
    }
    return files;
};

export const getBrowseEntries = (): BrowseEntry[] => {
    const files = walkMarkdownFiles(contentRoot);

    const markdownEntries: BrowseEntry[] = files.map((file) => {
        const rel = path.relative(contentRoot, file);
        const segments = rel.split(path.sep);
        const category = segments[0] || 'geral';
        const subcategory = segments[1] || 'geral';

        const raw = fs.readFileSync(file, 'utf-8');
        const { data } = matter(raw);

        return {
            title: data.title || path.basename(file, '.md'),
            slug: path.basename(file, '.md'),
            summary: data.summary || '',
            cover: data.cover || '',
            tags: Array.isArray(data.tags) ? data.tags : [],
            category,
            subcategory,
        };
    });

    const articleEntries: BrowseEntry[] = articles.map((article) => ({
        title: article.title,
        slug: article.link,
        summary: article.summary,
        cover: article.image,
        tags: article.tags,
        category: 'artigos',
        subcategory: 'estudos',
    }));

    return [...markdownEntries, ...articleEntries];
};

export const getCategoryGroups = (): BrowseGroup[] => {
    const entries = getBrowseEntries();
    const groups = new Map<string, BrowseGroup>();

    for (const entry of entries) {
        for (const tag of entry.tags) {
            const name = String(tag).trim();
            if (!name) continue;

            const slug = slugify(name);
            if (!groups.has(slug)) {
                groups.set(slug, { slug, name, count: 0, entries: [] });
            }

            const group = groups.get(slug)!;
            group.entries.push(entry);
            group.count += 1;
        }
    }

    return [...groups.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
};

export const getTopicGroups = (): BrowseGroup[] => {
    const entries = getBrowseEntries();
    const groups = new Map<string, BrowseGroup>();

    for (const entry of entries) {
        for (const tag of entry.tags) {
            const name = String(tag).trim();
            if (!name) continue;

            const slug = slugify(name);
            if (!groups.has(slug)) {
                groups.set(slug, { slug, name, count: 0, entries: [] });
            }

            const group = groups.get(slug)!;
            group.entries.push(entry);
            group.count += 1;
        }
    }

    return [...groups.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
};
