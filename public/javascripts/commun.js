/* TP3
Mathieu Pronovost
PROM18118300
Code basé sur la solution du laboratoire 8 rédigée par Alexandar Dimitrov */


function verifierCodePermanent(codePermanent){
    return /^[A-ZÀ-ÿ]{4}\d{8}/.test(codePermanent);
}

function verifierNomOuPrenom(nomOuPrenom){
    return /^[a-zA-ZÀ-ÿ]+(\s*[a-zA-ZÀ-ÿ]+)*$/.test(nomOuPrenom);
}

function verifierDateNaissance(dateNaissance){
    return /\d{4}-\d{2}-\d{2}/.test(dateNaissance);
}

function affichMessageSucces(){
    $("#message").stop(true, true);
    $("#message span").text("Données enregistrées dans la base de données");
    $("#message").removeClass('couleurRouge').addClass('couleurVerte').fadeIn(750);
    $("#message").fadeOut(1400);
}

function affichMessageErreur(mess, doitDispar){
    doitDispar = typeof doitDispar !== 'undefined' ? doitDispar : true;
    
    $("#message").stop(true, true);
    $("#message span").text(mess);
    $("#message").removeClass('couleurVerte').addClass('couleurRouge').fadeIn(750);
    
    if(doitDispar){
        $("#message").fadeOut(1400);
    }
}