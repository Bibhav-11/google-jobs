export function slugify(str) { 
    return str.split(' ').splice(0, 3).join(' ').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

}

export function randomize (str) {
    return str[20] + str[40] + str[60] + str[80] + str[100];
}