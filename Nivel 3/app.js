const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// Cnfig do MySQL
const connection = mysql.createConnection({
    host: 'bmfinvfiel7aainzzjvk-mysql.services.clever-cloud.com',
    user: 'ukzgkzci2nnavmli',
    password: 'bofzSn16qDJ7lE6nPy2O',
    database: 'bmfinvfiel7aainzzjvk'
});

// para receber os dados
app.post('/salvar', (req, res) => {
    const { nome, sobrenome, idade, celular, principal, whatsapp, email, corporativo } = req.body;

    // Inserindo os dados no MySQL
    const sql = `INSERT INTO funcionarios (nome, sobrenome, idade, celular, principal, whatsapp, email, corporativo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [nome, sobrenome, idade, celular, principal, whatsapp, email, corporativo];

    connection.query(sql, values, (error, results, fields) => {
        if (error) {
            console.error('Erro ao inserir no banco de dados:', error);
            res.status(500).send('Erro ao salvar os dados. Por favor, tente novamente.');
        } else {
            console.log('Dados inseridos com sucesso no banco de dados.');
            res.status(200).send('Dados salvos com sucesso!');
        }
    });
});

// Iniciando o servidor localhost
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
