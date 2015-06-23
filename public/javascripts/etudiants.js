/* TP3
Mathieu Pronovost
PROM18118300
Code basé sur la solution du laboratoire 8 rédigée par Alexandar Dimitrov */

$('#boutonAjUtil').on('click', verifierDonnees);
$('#boutonSupprimer').on('click', supprimeretudiant);


function verifierDonnees(event){
    event.preventDefault();
    
    var existeErreur = false;
    
	if(!verifierCodePermanent($('#ajoutUtil fieldset input#codePermanent').val())){
        $('#ajoutUtil fieldset input#codePermanent').addClass('erreur');
        existeErreur = true;
    }
	
    if(!verifierNomOuPrenom($('#ajoutUtil fieldset input#nom').val())){
        $('#ajoutUtil fieldset input#nom').addClass('erreur');
        existeErreur = true;
    }
    
    if(!verifierNomOuPrenom($('#ajoutUtil fieldset input#prenom').val())){
        $('#ajoutUtil fieldset input#prenom').addClass('erreur');
        existeErreur = true;
    }
	
	if(!verifierDateNaissance($('#ajoutUtil fieldset input#dateNaissance').val())){
        $('#ajoutUtil fieldset input#dateNaissance').addClass('erreur');
        existeErreur = true;
    }

    if(existeErreur){
        affichMessageErreur("Veuillez remplir/corriger les champs en rouge!");
    }else{
        ajouterEtudiant();
    }    
}


$(document).ready(function() {
    remplirTableau();
});

$('#ajoutUtil fieldset input#nom').on('change input', function(){

    if(verifierNomOuPrenom($(this).val())){
        $(this).removeClass("erreur");
    }else{
        $(this).addClass("erreur");
        affichMessageErreur("Nom invalide!");
    }
    
});


$('#ajoutUtil fieldset input#prenom').on('change input', function(){

    if(verifierNomOuPrenom($(this).val())){
        $(this).removeClass("erreur");
    }else{
        $(this).addClass("erreur");
        affichMessageErreur("prenom invalide!");
    }
    
});


function ajouterEtudiant() {
    
    
    var xmletudiant = '<?xml version="1.0" encoding="UTF-8"?>' +
                        '<etudiant><codePermanent>' +
                        $('#ajoutUtil fieldset input#codePermanent').val() +
                        '</codePermanent><nom>' +
                        $('#ajoutUtil fieldset input#nom').val() +
                        '</nom><prenom>' +
                        $('#ajoutUtil fieldset input#prenom').val() +
                        '</prenom><sexe>' +
                        $('#ajoutUtil fieldset input:radio[name ="sexeGroupe"]:checked').val() +
                        '</sexe><dateNaissance>' +
                        $('#ajoutUtil fieldset input#dateNaissance').val() +
                        '</dateNaissance></etudiant>';

    $.ajax({
        type: "POST",
        data: xmletudiant,
        url: "/nouvel/etudiant",
        contentType: "text/xml",
        dataType: "xml; charset=UTF-8",
        success: function (data) {
            
        },
        error: function (xhr, status) {
            
        },
        complete: function (xhr, status) {
            window.location.href = '/';
        } 
    });
    
};


function supprimeretudiant(event) {

    event.preventDefault();
    
    var confirmation = confirm('Supprimer l\'étudiant suivant?');
    
    if (true === confirmation) {
        
        var idetudiant = $(this).attr('data-util-mongoid');
        
        $.ajax({
            type: 'DELETE',
            url: '/supprimer/etudiant/' + idetudiant
        }).done(function(data, statusText, xhr ) {
            window.location.href = '/';
            
        });
    }
    else {
        return false;
    }
};


function nettoyerChamps(){
	$('#ajoutUtil fieldset input#codePermanent').val('');
    $('#ajoutUtil fieldset input#nom').val('');
    $('#ajoutUtil fieldset input#prenom').val('');
	$('#ajoutUtil fieldset input:radio[name ="sexeGroupe"][value="homme"]').prop('checked', true);
	$('#ajoutUtil fieldset input#dateNaissance').val('');
}

function remplirTableau() {

    var tableContent = '';

    $.getJSON('/etudiants', function( data ) {

        $.each(data, function(){
            tableContent += '<tr>';
			tableContent += '<td>' + this.codePermanent + '</td>';
            tableContent += '<td>' + this.nom + '</td>';
            tableContent += '<td>' + this.prenom + '</td>';
			tableContent += '<td>' + this.dateNaissance + '</td>';
			tableContent += '<td><a href=/site/dossieretudiant/' + this._id + '>Consulter le dossier</a></td>';
            tableContent += '</tr>';
        });

        $('#listeUt table tbody').html(tableContent);
    });
};
