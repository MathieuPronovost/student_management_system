/* TP3
Mathieu Pronovost
PROM18118300
Code basé sur la solution du laboratoire 8 rédigée par Alexandar Dimitrov */


function envoyerModifications() {
    
    var etudiant = {
			"codePermanent": $('#ajoutUtil fieldset input#codePermanent').val(),
            "nom": $('#ajoutUtil fieldset input#nom').val(),
            "prenom": $('#ajoutUtil fieldset input#prenom').val(),
            "sexe": $('#ajoutUtil fieldset input:radio[name ="sexeGroupe"]:checked').val(),
			"dateNaissance": $('#ajoutUtil fieldset input#dateNaissance').val()
        };
        
        $.ajax({
            type: "PUT",
            data: JSON.stringify(etudiant),
            url: "/modifier/etudiant/" + $('#ajoutUtil fieldset input#id').val(),
            contentType: "application/json; charset=utf-8",
            timeout: 5000,
            success: function (data) {
                affichMessageSucces();
            },
            error: function (xhr, status) {
                if(status==="timeout") {
                    affichMessageErreur("Erreur: serveur indisponible!", false);
                }else{
                    affichMessageErreur("Erreur: impossible de sauvegarder les changements!", false);
                }
            },
            complete: function (xhr, status) {
            } 
        });

};

$('#ajoutUtil fieldset input#codePermanent').on('change input', function(){

    if(verifierCodePermanent($(this).val())){
        $(this).removeClass("erreur");
		console.log ("allo");
        envoyerModifications();
    }else{
        $(this).addClass("erreur");
        affichMessageErreur("Code permanent invalide!");
    }    
});

$('#ajoutUtil fieldset input#nom').on('change input', function(){

    if(verifierNomOuPrenom($(this).val())){
        $(this).removeClass("erreur");
        envoyerModifications();
    }else{
        $(this).addClass("erreur");
        affichMessageErreur("Nom invalide!");
    }    
});


$('#ajoutUtil fieldset input#prenom').on('change input', function(){

    if(verifierNomOuPrenom($(this).val())){
        $(this).removeClass("erreur");
        envoyerModifications();
    }else{
        $(this).addClass("erreur");
        affichMessageErreur("Prénom invalide!");
    }
    
});

$('#ajoutUtil fieldset input#dateNaissance').on('change input', function(){

    if(verifierDateNaissance($(this).val())){
        $(this).removeClass("erreur");
        envoyerModifications();
    }else{
        $(this).addClass("erreur");
        affichMessageErreur("Date de naissance invalide!");
    }    
});

$('#ajoutUtil fieldset input:radio[name ="sexeGroupe"]').on('change', function(){
    envoyerModifications();    
});