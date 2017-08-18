
const Clients = ({readFile, db, saveData}) => {
    const data = readFile('clients.csv', [0, 8, 10, 13])
    .map(l =>  ({
        idClient : l[0],
        description: l[1],
        company: l[2],
        clientName: l[3]
      })
    );
    return saveData('clients', data);
}

module.exports = Clients;
