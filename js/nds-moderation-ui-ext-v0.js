// C'est quoi ?
// Ce fichier c'est le fichier Javascript utilisé avant l'implémentation du Dark Mode
// -------------------------------

// Rajouter un bouton dans les historiques de devoir
// Pour accédeur aux nouveaux profils nouvelle version
function newLinks() {

    // Choppe tous les liens de l'historique
    var historique = document.querySelectorAll('.QuestionActivityGroup-module__listItem--t3Zn- a')
    // Choppe un parent sûr qui risque pas de changer avec les Màj Brainly
    var parent = document.querySelectorAll('[data-testid="entry_text_formatter"]')

    for(i = 0; i < historique.length; i++) {
        histHref = historique[i].href; // Lien du <a>
        histUserID = histHref.slice(-7).replace('-', ''); // ID de l'utilisateur-trice
        histNewHref = 'https://nosdevoirs.fr/app/profile/' + histUserID; // URL vers le profil version nouvelle
        
        // Création du nouveau lien <a>
        histLink = document.createElement('a');
        histLink.href = histNewHref;
        histLink.classList.add("nds-historique-links")
        histLink.textContent = '+';
    
        // Injection
        parent[i].insertBefore(histLink, parent[i].children[0])
        console.log('Added')
    }
}


window.addEventListener('load', newLinks);
