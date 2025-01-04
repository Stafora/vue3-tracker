export const dateFilter = (value): string => {
    if (!value) return '';
    const date = new Date(value);
    return date.toLocaleDateString('EN', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    });
};