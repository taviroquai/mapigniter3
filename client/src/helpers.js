const applySort = (items, column, direction) => {
    let type;
    items = items.sort((a, b) => {
        type = a[column] === ''+a[column] ? 'string' : 'numeric';
        if (type === 'string') {
            return direction === 'ascending' ?
                (a[column].toUpperCase() < b[column].toUpperCase() ? -1 : 1)
                : (a[column].toUpperCase() > b[column].toUpperCase() ? -1 : 1);
        } else {
            return direction === 'ascending' ?
                (a[column] < b[column] ? -1 : 1)
                : (a[column] > b[column] ? -1 : 1);
        }
    });
    return items;
}

export default {
    applySort
}
