const dateOptions = {
    timeZone: 'UTC',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};
export const formatDate = date => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('es-ES', dateOptions);
};