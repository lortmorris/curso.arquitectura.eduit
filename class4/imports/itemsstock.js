
const ItemsStock = ({readFile, db, saveData}) => {
    const data = {};
    readFile('itemsstock.csv', [0, 6], 7)
    .forEach(l =>  (data[ l[0] ] = l[1] )
      );
      return Promise.resolve(data);
    // return saveData('itemsstock', data);
}

module.exports = ItemsStock;
