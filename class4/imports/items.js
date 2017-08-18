
const Items = ({readFile, db, saveData}) => {
    const data = readFile('items.csv', [0, 3, 4], 14)
    .map(l =>  ({
        idItem : l[0],
        name: l[1],
        desciption: l[2],
      })
    );
    return saveData('items', data);
}

module.exports = Items;
