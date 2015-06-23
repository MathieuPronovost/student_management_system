/* TP3
Mathieu Pronovost
PROM18118300
Code basé sur la solution du laboratoire 8 rédigée par Alexandar Dimitrov */

var express = require('express');
var mongodb = require('mongodb');
var BSON = mongodb.BSONPure;
var xmlparser = require('express-xml-bodyparser');
var createSchema = require('json-gate').createSchema;

var mongoDbConnection = require('./connection.js');
var router = express.Router();


router.post('/nouvel/etudiant', xmlparser({trim: false, explicitArray: false}), function(req, res) {

    var etudiantRecu = req.body.etudiant;
    
    var nouveauDossier = {
        'codePermanent': etudiantRecu.codePermanent,
        'nom': etudiantRecu.nom,
        'prenom': etudiantRecu.prenom,
		'sexe': etudiantRecu.sexe,
		'dateNaissance': etudiantRecu.dateNaissance
    };

    mongoDbConnection(function(databaseConnection) {
        databaseConnection.collection('dossiers').insert(nouveauDossier, function(err, result) {
            if (err) {
                res.json(500, {error: err});
            } else {
                res.json(200);
            }
        });
    });

});


router.get('/etudiants', function(req, res) {

    mongoDbConnection(function(databaseConnection) {
        databaseConnection.collection('dossiers').find().sort({codePermanent: 1}).toArray(function(err, items) {
            res.json(items);
        });
    });
});


router.get('/', function(req, res) {
    res.render('etudiants');
});

router.get('/ajout', function(req, res) {
    res.render('ajouteretudiants');
});

router.get('/site/dossieretudiant/:id', function(req, res) {
    
    var idEtudiant = req.params.id;
    var idValideRegEx = new RegExp("^[0-9a-fA-F]{24}$");

    if (idValideRegEx.test(idEtudiant)) {

        mongoDbConnection(function(databaseConnection) {

            databaseConnection.collection('dossiers').find({'_id': new BSON.ObjectID(idEtudiant)}).toArray(
            function(err, result) {
                if (err) {
                    res.json(500, {error: err});
                } else {
                    res.render('dossieretudiant', {etudiant: result[0]});
                }
            });
        });

    }else{
        res.send(500, {msg: "Erreur: " + err});
    }
});


router.get('/site/modifieretudiant/:id', function(req, res) {
    
    var idEtudiant = req.params.id;
    var idValideRegEx = new RegExp("^[0-9a-fA-F]{24}$");

    if (idValideRegEx.test(idEtudiant)) {

        mongoDbConnection(function(databaseConnection) {

            databaseConnection.collection('dossiers').find({'_id': new BSON.ObjectID(idEtudiant)}).toArray(
            function(err, result) {
                if (err) {
                    res.json(500, {error: err});
                } else {
                    res.render('modifieretudiant', {etudiant: result[0]});
                }
            });
        });

    }else{
        res.send(500, {msg: "Erreur: " + err});
    }
});


router.delete('/supprimer/etudiant/:id', function(req, res) {

    var idEtudiant = req.params.id;
    var idValideRegEx = new RegExp("^[0-9a-fA-F]{24}$");

    if (idValideRegEx.test(idEtudiant)) {

        mongoDbConnection(function(databaseConnection) {

            databaseConnection.collection('dossiers').remove({'_id': new BSON.ObjectID(idEtudiant)},
            function(err, result) {
                if (err) {
                    res.json(500, {error: err});
                } else {
                    res.json(200, {msg: 'OK', nombreDocumentsSupprimes: result});
                }
            });
        });

    } else {
        res.send(500, {msg: "Erreur: " + err});
    }
});

router.put('/modifier/etudiant/:id', function(req, res) {
    var idEtudiant = req.params.id;
    var modifsUtil = req.body;
        
    var modifFormatUtilBD = {
		'codePermanent': modifsUtil.codePermanent,
		'nom': modifsUtil.nom,
		'prenom': modifsUtil.prenom,
		'sexe': modifsUtil.sexe,
		'dateNaissance': modifsUtil.dateNaissance
    };

    console.log('\n\nModifications à apporter:\n');
    console.log(JSON.stringify(modifFormatUtilBD, null, 4));
        
    mongoDbConnection(function(databaseConnection) {

        databaseConnection.collection('dossiers').update(
        {'_id': new BSON.ObjectID(idEtudiant)},
        {$set: modifFormatUtilBD},
        function(err, result) {

            if (err) {
                res.json(500, {error: err});
            } else {
                res.json(200, {msg: 'OK', nombreDocumentsAffectesParUpdate: result});
            }
        });
    });


});


module.exports = router;