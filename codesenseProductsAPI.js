const express = require('express');
const sql = require ('mssql');

const app = express();
const port = process.env.PORT||5000;

const config = {
    user: 'codesense',
    server: 'codesense.database.windows.net',
    database: 'codesense',
    password: 'C0desense',
    options:{
        encrypt: true,
    }
};

app.get('/api/products', async(req, res)=> {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT id, productname FROM codesense.product_services.products');
        res.json(result.recordset);
    } 
    catch (error){
        console.error('Error fetching data',error);
        res.status(500).json({error:'An error has occurred'});
    }
});