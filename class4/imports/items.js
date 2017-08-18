
const Items = ({readFile, db, saveData}, stock) => {
    const data = readFile('items.csv', [0, 3, 4], 14)
    .map(l =>  ({
        idItem : l[0],
        name: l[1],
        desciption: l[2],
        cant: stock[ l[0] ] || 0,
      })
    );
    return saveData('items', data);
}

module.exports = Items;
