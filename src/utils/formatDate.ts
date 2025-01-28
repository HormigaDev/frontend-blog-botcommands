export const formatDate = (date: Date | string, format: string = 'd/m/y'): string => {
    let [y, m, d] = ['', '', ''];
    if (date instanceof Date) {
        [y, m, d] = date.toISOString().split('T')[0].split('-');
    }
    if (typeof date === 'string') {
        [y, m, d] = date.split('T')[0].split('-');
    }
    return format.replace('d', d).replace('m', m).replace('y', y);
};
