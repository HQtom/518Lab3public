const dbConnection = require("./mongoConnection");


const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection.connectToDb();
      _col = await db.collection(collection);
    }
    
    return _col;
  };
};

module.exports = {
    Datainfo : getCollectionFn('Inventory'),
    Datainfo2 : getCollectionFn('Account')
//   CandyData: getCollectionFn('CandyData'),
//   OrderData: getCollectionFn('OrderData')

};