
const PrecioListaDetalle = ({readFile, db, saveData}) => {
    const data = readFile('preciolistadetalle.csv', [0, 1, 20])
    .map(l =>  ({
        idItem : l[0],
        idList: l[1],
        price: l[2],
      })
    );
    return saveData('preciolistadetalle', data);
}

module.exports = PrecioListaDetalle;
