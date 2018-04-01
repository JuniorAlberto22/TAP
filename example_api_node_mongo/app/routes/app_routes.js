let ObjectID =  require('mongodb').ObjectID;


module.exports = function(app, db){
    let dbConnect = db.db('products');
    let collection = dbConnect.collection('products');

    app.get('/products/:id', (req, res) => {
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

    app.get('/products', (req, res) => {
        let id = req.params.id;
        let details = {};
        collection.find().toArray( (err, results) => {
           if(err){
                res.send({'error' : 'an error has ocurred'});
           } else {
                res.send(results);
           }
        });
    });

    app.put('/products/:id', (req, res) => {
        let id = req.params.id;
        let product = {
            name : req.body.name,
            preco : req.body.preco
        };
        let details = {'_id' : new ObjectID(id)};
        collection.update(details, product, (err, result) => {
           if(err){
                res.send({'error' : 'an error has ocurred'});
           } else {
                res.send('Product ' + id + ' updated !');
           }
        });
    });

    app.delete('/products/:id', (req, res) => {
        let id = req.params.id;
        let details = {'_id' : new ObjectID(id)};
        collection.remove(details, (err, result) => {
           if(err){
                res.send({'error' : 'an error has ocurred'});
           } else {
                res.send('Product ' + id + ' deleted !');
           }
        });
    });

    app.post('/products', (req, res) =>{
        let product = {
            name : req.body.name,
            preco : req.body.preco
        };
        collection.insert(product, (err, result) => {
            if(err){
                res.send({'error' : 'an error has ocurred'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });
}