/* TP3
Mathieu Pronovost
PROM18118300
Code basé sur la solution du laboratoire 8 rédigée par Alexandar Dimitrov */

var mongodb = require("mongodb");

// instance de la base de données
var instanceMongoDB;


// Implémentation d'un Singleton
module.exports = function(callback) {

    if (instanceMongoDB) {
        console.log("[Singleton] Retour instance MongoDB existante.");
        callback(instanceMongoDB);
        return;
    }

    var server = new mongodb.Server("localhost", 27017, {auto_reconnect: true});
    var db = new mongodb.Db("PROM18118300", server, {safe: true});

    // Vérification de db.openCalled pour éviter d'appeler db.open(...)
    // plusieurs fois avant l'appel du callback
    if (!db.openCalled) {

        db.open(function(error, dbConn) {

            if (error) {
                throw new Error(error);
            }
            console.log("[Singleton] Retour nouvelle instance MongoDB.");
            
            instanceMongoDB = dbConn;
            callback(instanceMongoDB);
        });
    }
};