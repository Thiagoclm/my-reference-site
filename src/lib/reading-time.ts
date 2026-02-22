export const calculateReadingTimeMinutes = (text: string, wordsPerMinute = 200): number => {
    const words = String(text || '')
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;

    if (!words) return 1;

    return Math.max(1, Math.ceil(words / wordsPerMinute));
};

export const formatReadingTime = (minutes: number): string => {
    return `${minutes} min de leitura`;
};

export const getEstimatedReadingTimeLabel = (text: string, wordsPerMinute = 200): string => {
    const minutes = calculateReadingTimeMinutes(text, wordsPerMinute);
    return formatReadingTime(minutes);
};
