const MongoClient = require('mongodb').MongoClient;
//const url = 'mongodb+srv://zz1999526:Zhouzhe526@cluster0.lwbk2we.mongodb.net/?retryWrites=true&w=majority';
const url = 'mongodb://mongo:27017/';
let client = undefined;
let db = undefined;



async function main(){

  try{
    await client.connect();
    console.log('Database Connected successfully');
  }catch(e){
    console.log(e);
  }finally{
    await client.close();
  }

}
module.exports = {
    connectToDb: async () => {
        if( ! client ){
            try{
                client = await MongoClient.connect(url);
                db = await client.db('Lab2');
            }catch(e){
                console.log(e);
            }

        }
        return db;
    },
    closeConnection: () => {
        client.close();
    }
}