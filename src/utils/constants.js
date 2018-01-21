//@ts-check

export const ERROR_MESSAGE =
    'Sorry about that. But it looks like we made a mistake.';
export const BASE_URL = 'https://eventmanager-server.herokuapp.com';

export const titleCase = data => {
    data = data.trim();
    return data
        .toLowerCase()
        .split(' ')
        .map(function(word) {
            return word.replace(word[0], word[0].toUpperCase());
        })
        .join(' ');
};

export const formatPrice = data => {
    if (data) return data.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    else return '';
};
