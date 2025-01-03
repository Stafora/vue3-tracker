export const dateFilter = (value): string => {
    if (!value) return '';
    const date = new Date(value);
    return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};