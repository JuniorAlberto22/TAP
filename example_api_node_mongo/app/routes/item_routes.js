let ObjectID =  require('mongodb').ObjectID;

module.exports = function(app, dbConnect){

    let collection = dbConnect.collection('itens');

    app.get('/item/:id', (req, res) => {
        let id = req.params.id;
        let details = {'_id' : new ObjectID(id)};
        collection.findOne(details, (err, result) => {
           if(err){
                res.send({'error' : 'an error has ocurred'});
           } else {
                res.send(result);
           }
        });
    });

    app.get('/itens', (req, res) => {
        collection.find().toArray((err, results) => {
           if(err){
                res.send({'error' : 'an error has ocurred'});
           } else {
                res.send(results);
           }
        });
    });

    app.put('/item/:id', (req, res) => {
        let id = req.params.id;
        let item = {
            name : req.body.name,
            efect : req.body.efect,
            efectPower : req.body.efectPower
        };
        let details = {'_id' : new ObjectID(id)};
        collection.update(details, item, (err, result) => {
           if(err){
                res.send({'error' : 'an error has ocurred'});
           } else {
                res.send('Item ' + id + ' updated !');
           }
        });
    });

    app.delete('/item/:id', (req, res) => {
        let id = req.params.id;
        let details = {'_id' : new ObjectID(id)};
        collection.remove(details, (err, result) => {
           if(err){
                res.send({'error' : 'an error has ocurred'});
           } else {
                res.send('Item ' + id + ' deleted !');
           }
        });
    });

    app.post('/item', (req, res) =>{
        let item = {
            name : req.body.name,
            efect : req.body.efect,
            efectPower : req.body.efectPower
        };
        collection.insert(item, (err, result) => {
            if(err){
                res.send({'error' : 'an error has ocurred'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });
}