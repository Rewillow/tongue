require("dotenv").config()
const mysql = require("mysql2")

// Configurazione e definizione variabili del database
const connection = mysql.createConnection ({
    host: "localhost", 
    user: "root",
    password: "sam123",
    database: "tongue"
})

// Creo una connessione col database, specificando i messaggi di riuscita o errore
connection.connect((err) => {
    if(err) {
        console.error("Errore nella connessione", err);
        return
    } else {
        console.log("Connessione riuscita");
    }
    
})

// Creo il database di Tongue
// connection.query("CREATE DATABASE IF NOT EXISTS tongue", (err,res) => {
//     if(err) {
//         console.error("Errore durante la creazione del database", err);
//     } else {
//         console.log("Creazione database riuscita");
//     }
//     connection.end()
// })





