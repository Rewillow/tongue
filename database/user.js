const mysql = require("mysql2")

// Configurazione e definizione variabili del database
const connection = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "sam123",
    database: "tongue"
})

// Creo una connessione col database, specificando i messaggi di riuscita o errore
connection.connect((err) => {
    if(err) {
        console.error("Errore nella connessione", err);
        return;
    } else {
        console.log("Connessione riuscita");
    }   
})

// Creazione della tabella "post" con la colonna "created_at" per la data di inserimento
connection.query(
    "CREATE TABLE IF NOT EXISTS user (id INT AUTO_INCREMENT PRIMARY KEY, nickname VARCHAR(255) NOT NULL, age INT NOT NULL, city VARCHAR(255) NOT NULL)"
, (err, res) => {
    if(err) {
        console.error("Errore nella creazione della tabella", err);
    } else {
        console.log("Tabella creata correttamente");
    }
    connection.end();
});