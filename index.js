const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const port = process.env.PORT || 5000;

const products = require('./data/Products.json')

app.get('/', (req, res) => {
    res.send('Now server is running')
});

app.get('/products', (req, res) => {
    res.send(products)
});

app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const product = products.find(p => p.id == id)
    if(!product){
        res.send('no data found')
    }
    res.send(product)
});

app.get('/category/:name', (req, res) => {
    const name = req.params.name;
    const categories = products.filter(pro => pro.category == name)
    res.send(categories)
})

app.get('/price/:taka', (req, res) => {
    const taka = req.params.taka;
    const allPriceProducts = products.filter(pro => pro.price <= taka)
    res.send(allPriceProducts)
})


app.listen(port, () => {
    console.log('server is running port', port);
});