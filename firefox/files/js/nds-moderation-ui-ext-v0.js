// C'est quoi ?
// Ce fichier c'est le fichier Javascript utilisé avant l'implémentation du Dark Mode
// -------------------------------
// Snippet by Yong Wang (https://stackoverflow.com/users/4556536/yong-wang)
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

// ------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------

// Rajouter un bouton dans les historiques de devoir
// Pour accédeur aux nouveaux profils nouvelle version
function newLinks() {

    // On récupère les utilisateurs stockés ds le HTML
    usersData = document.querySelector('div.js-users-data').getAttribute('data-z')
    users = JSON.parse(usersData)
    // On créé des méthodes pour convertir key <=> nick
    const usersArray = Object.values(users);
    const getUserById = (userId, array) => array.find( (user) => user.id === userId );
    const getUserByNick = (userNick, array) => array.find( (user) => user.nick === userNick );

    // ----------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------
        
    // Les liens des répondants
    rpdants = document.querySelectorAll('[data-testid="answer_box_author_link"] span')
    for( i = 0; i < rpdants.length; i++) { 
        try {
            username = rpdants[i].innerHTML
            rpdantsId = getUserByNick(username, usersArray).id
            rpdants[i].innerHTML = `<a href="https://nosdevoirs.fr/profil/${username}-${rpdantsId}" class="nds-links" target="_blank">${username}</a>`

            // Création du nouveau lien <a>
            newLink = document.createElement('a');
            newLink.href = `https://nosdevoirs.fr/app/profile/${rpdantsId}`;
            newLink.classList.add("nds-new-links")
            newLink.textContent = '+';

            // Injection
            rpdants[i].append(newLink)
        } catch (error) {
            console.debug(error)
        }
    }

    // Les liens du questionneur
    qstner = document.querySelectorAll('[data-testid="question_box_header_author_link"] span')
    for( i = 0; i < qstner.length; i++) { 
        try {
            username = qstner[i].outerText // Permet de renvoyer seulement le nom, propriété du NodeList
            qstnerId = getUserByNick(username, usersArray).id
            qstner[i].innerHTML = `<a href="https://nosdevoirs.fr/profil/${username}-${qstnerId}" class="nds-links" target="_blank">${username}</a>`

            // Création du nouveau lien <a>
            newLink = document.createElement('a');
            newLink.href = `https://nosdevoirs.fr/app/profile/${qstnerId}`;
            newLink.classList.add("nds-new-links")
            newLink.textContent = '+';

            // Injection
            qstner[i].append(newLink)
        } catch (error) {
            if(error.message == "Cannot read properties of undefined (reading 'id')") {
                console.debug("🔌 Un lien est introuvable")
            } else {
                console.debug(error)
            }
        }
    }

    // ----------------------------------------------------------------------------------------------

    // Choppe tous les liens de l'historique
    var historique = document.querySelectorAll('.QuestionActivityGroup-module__listItem--t3Zn- a')
    // Choppe un parent sûr qui risque pas de changer avec les Màj Brainly
    var parent = document.querySelectorAll('[data-testid="entry_text_formatter"]')

    function insertAfter(newNode, existingNode) {
        existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    }

    for(i = 0; i < parent.length; i++) {
        try {
            // histHref = historique[i].href; // Lien du <a>
            histHref = parent[i].children[0].href; // Lien du <a>
            histUserID = histHref.slice(-7).replace('-', ''); // ID de l'utilisateur-trice
            histNewHref = 'https://nosdevoirs.fr/app/profile/' + histUserID; // URL vers le profil version nouvelle
            
            // Création du nouveau lien <a>
            histLink = document.createElement('a');
            histLink.href = histNewHref;
            histLink.classList.add("nds-new-links")
            histLink.textContent = '+';
            
            // Injection
            if(parent[i].children.length >= 2 && parent[i].children[0].classList.contains('nds-new-links')) {
                // console.log('Deux liens, deuxième ajouté')
                parent[i].insertBefore(histLink, parent[i].children[2])
            } else if (parent[i].children.length >= 2 && !parent[i].children[0].classList.contains('nds-new-links')) {
                // console.log('Deux liens, premier ajouté')
                parent[i].insertBefore(histLink, parent[i].children[0])
            } else {
                // console.log('Un seul lien', parent[i].children.length, parent[i].children[0].classList.contains('nds-new-links'))
                parent[i].insertBefore(histLink, parent[i].children[0])
            }
            // console.log('Added')

        } catch (error) {
            console.debug(error)
            console.debug('Problème au lien suivant')
            console.debug(histLink)
        }
    }
}
// ------------------------------------------------------------------------------------------------------------------

// window.addEventListener('load', newLinks);
waitForElm('[data-testid="entry_text_formatter"]').then((elm) => {
    newLinks()
    console.log('✅ Historique enrichi');
});

// ------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------
// Profil nouvelle interface, ajout de 2 boutons

function newProfile() {
    userName = document.querySelector('h1[data-testid="user_profile_username"]').innerHTML
    userID = document.querySelector('.UserActivity__tab--dTf-w').href.slice(-15).replace('/answers', '').replace('/', '')

    let summary = document.querySelector('[data-testid="profile_page_summary"] :first-child')

    // Ancien profil
    var newProfileBtn = document.createElement("div")
    newProfileBtn.classList += 'sg-flex sg-flex--full-width sg-flex'
    newProfileBtn.innerHTML = `<a class="sg-button sg-button--m sg-button--solid-indigo sg-button--full-width sg-flex--margin-bottom-s" href="https://nosdevoirs.fr/profil/${userName}-${userID}">      <span class="sg-button__icon sg-button__icon--m">
        <div aria-hidden="true" class="sg-icon sg-icon--icon-whitesg-icon--x16">
            <svg class="sg-icon__svg" role="img" aria-labelledby="title-profile-t2lix" focusable="false">  
            <text id="title-profile-t2lix" hidden="">pencil</text><use xlink:href="#icon-profile" aria-hidden="true"></use>
            </svg>
        </div>
        </span>
        <span class="sg-button__text">Ancien profil</span>
    </a>`

    // Voir les contenus
    var newContentBtn = document.createElement("div")
    newContentBtn.classList += 'sg-flex sg-flex--full-width sg-flex'
    newContentBtn.innerHTML = `<a class="sg-button sg-button--m sg-button--solid-light sg-flex--margin-bottom-s sg-flex--full-width" href="https://nosdevoirs.fr/users/user_content/${userID}">
    <span class="sg-button__icon sg-button__icon--m"><div class="sg-icon sg-icon--adaptive sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-answers-qwjex" focusable="false"><text id="title-answers-qwjex" hidden="">answers</text><use xlink:href="#icon-answers" aria-hidden="true"></use></svg></div></span>

        <span class="sg-button__text">Voir les contenus</span>
    </a>`

    function insertAfter(newNode, existingNode) {
        existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    }

    insertAfter(newProfileBtn, summary)
    insertAfter(newContentBtn, newProfileBtn)
}
// ------------------------------------------------------------------------------------------------------------------

waitForElm('h1[data-testid="user_profile_username"]').then((elm) => {
    newProfile()
    console.log('✅ Profil enrichi');
});

// ------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------
// Nouveau bouton profil dans les DM

// ------------- ATTENTION
// Ca ne marche que sur la conv ouverte au load
function newDMBtn() {
    convUser = document.querySelector('.sg-content-box__header .sg-actions-list__hole a')
    
    // Création du nouveau lien
    newDMLink = 'https://nosdevoirs.fr/app/profile/' + convUser.href.slice(-7).replace('-', '')
    newDM = document.createElement('a');
    newDM.href = newDMLink;
    newDM.classList.add("nds-new-links")
    newDM.textContent = '+';
    
    
    function insertAfter(newNode, existingNode) {
        existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    }
    
    insertAfter(newDM, convUser)
}
// ------------------------------------------------------------------------------------------------------------------

waitForElm('.js-chatbox a[title]').then((elm) => {
    newDMBtn()
    console.log('✅ Messagerie enrichie');
});


// ------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------

// AJOUT DU BOUTON "CONFIRMER"
window.addEventListener('load', function() {
    // #1 - Fonction pour confirmer un signalement
    function ndsConfirm(devoirID, answerID) {
        fetch("https://nosdevoirs.fr/api/28/moderation_new/accept", {
          "referrer": `https://nosdevoirs.fr/devoir/${devoirID}`,
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": `{"model_id":${answerID},"model_type_id":2,"schema":""}`,
          "method": "POST",
          "mode": "cors",
          "credentials": "include"
        });
    }
    
    // #2 - Fonction pour styliser la réponse après confirmation
    function confirmResponseStyle(responseDiv) {
      const confirmButton = responseDiv.querySelector('button.js-nds-confirm');
      confirmButton.disabled = true;
      confirmButton.textContent = '✓';
    
      const reasonElements = responseDiv.querySelectorAll('.report.boxxy .reason');
      reasonElements.forEach(element => {
        element.style.display = 'none';
      });
    
      const reporterNickSpan = responseDiv.querySelector('span.reporter.nick');
      reporterNickSpan.textContent = 'Signalement traité avec succès !';
      responseDiv.style.transition = 'all 300ms';
      responseDiv.classList.remove('reported');
    
      // Modifier l'attribut "xlink:href" de "#answer-<ID> .sg-button__icon--m svg > use"
      const answerID = responseDiv.classList[1].split('-')[1];
      const useElement = responseDiv.querySelector(`#answer-${answerID} .sg-button__icon--m svg > use`);
      useElement.setAttribute('xlink:href', '#icon-report_flag_outlined');
    
      // Ajouter la classe "sg-icon--icon-gray-50" à "#answer-<ID> .sg-button__icon--m > div > *"
      const iconElements = responseDiv.querySelectorAll(`#answer-${answerID} .sg-button__icon--m > div > *`);
      iconElements.forEach(element => {
        element.classList.add('sg-icon--icon-gray-50');
      });
    }
    
    // #3 - Fonction pour ajouter le bouton "Confirmer"
    function addConfirmButton(responseDiv) {
      const devoirID = document.querySelector('.moderation-task').classList[1].split('-')[1];
      const answerID = responseDiv.classList[1].split('-')[1];
    
      const confirmButton = document.createElement('button');
      confirmButton.classList.add("btn", "btn-mini", "btn-info", "js-nds-confirm");
      confirmButton.textContent = 'Confirmer';
      confirmButton.addEventListener('click', () => {
        ndsConfirm(devoirID, answerID);
        confirmResponseStyle(responseDiv);
      });
    
      // Sélectionner la div "actions pull-right"
      const actionsDiv = responseDiv.querySelector('.actions.pull-right');
      actionsDiv.insertBefore(confirmButton, actionsDiv.firstChild);
    }
    
    // #4 - Fonction pour lancer le processus
    function handleModerateTaskDisplay() {
      // Sélectionner toutes les réponses dans la fenêtre de modération
      const responsesDivs = document.querySelectorAll('.moderation-response');
    
      responsesDivs.forEach(responseDiv => {
        if (responseDiv.classList.contains('reported')) {
            addConfirmButton(responseDiv);
        }
      });
        // #Annexe · Suppression "Commentaires" si vide
        commSections = document.querySelectorAll(".moderation-comments")
        commSections.forEach(function(section) {
            console.log(section.childElementCount);
            if (section.childElementCount <= 1) {
                section.style.display = "none";
            }
        });
    }
    
    // Sélectionner la div #moderate-task-toplayer
    const moderateTaskToplayerDiv = document.querySelector('#moderate-task-toplayer');
      
    
    // waitForElm('[data-testid="question_activity"]').then((elm) => {
    //     handleModerateTaskDisplay()
    //     console.log('✅ Panel contextuel de modération enrichi');
    // });
    
    // Créer un observateur de mutation
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            const displayStyle = moderateTaskToplayerDiv.style.display;
            if (displayStyle === 'block') {
              handleModerateTaskDisplay();
              console.log('✅ Panel contextuel de modération enrichi');
            }
          }
        });
    });
    
    // Configuration de l'observateur
    const config = { attributes: true, childList: false, subtree: false };
    
    // Commencer à observer la div #moderate-task-toplayer
    observer.observe(moderateTaskToplayerDiv, config);
});