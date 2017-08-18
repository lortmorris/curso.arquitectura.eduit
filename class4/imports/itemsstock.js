
const ItemsStock = ({readFile, db, saveData}) => {
    const data = readFile('itemsstock.csv', [0, 6], 7)
    .map(l =>  ({
        idItem : l[0],
        cant: l[1],
      })
    );
    return saveData('itemsstock', data);
}

module.exports = ItemsStock;
