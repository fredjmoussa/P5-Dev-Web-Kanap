const getCartItems = () => {// Définit une fonction qui récupère les articles dans le panier
  let basket = JSON.parse(localStorage.getItem("kanap")); // Récupère les articles du panier depuis le local storage
  if (!basket) { // Si le panier est vide,
    return []; // renvoie un tableau vide
  } else { // Sinon,
    return basket; // renvoie le panier
  }
}

const getTotalPrice = (kanapList) => { // Définit une fonction qui calcule le prix total
  let basket = getCartItems(); // Récupère les articles du panier
  let number = 0; // Initialise le prix total à 0
  basket.forEach((product) => { // Pour chaque article dans le panier,
    const productWithPrice = kanapList.find(k => k._id === product.id); // récupère l'article du panier avec son prix
    number += product.quantity * productWithPrice.price; // Ajoute le prix de l'article au prix total
  });
  return number; // Renvoie le prix total
  
}

const getTotalQuantity = (product) => { // Définit une fonction qui calcule la quantité totale
  let basket = getCartItems(); // Récupère les articles du panier
  let number = 0; // Initialise la quantité totale à 0
  basket.forEach((product) => { // Pour chaque article dans le panier,
    number += parseInt(product.quantity);// Ajoute la quantité de cet article à la quantité totale
  });
  return number; // Renvoie la quantité totale
}

const changeQuantity = (product, quantity) => { // Définit une fonction qui modifie la quantité d'un article dans le panier
  let basket = getCartItems(); // Récupère les articles du panier
  let foundProduct = basket.find(p => p.id == product.id); // Recherche l'article dans le panier à partir de son ID
  if (foundProduct) { // Si l'article est trouvé,
    foundProduct.quantity = quantity; // modifie sa quantité
    if (foundProduct.quantity <= 0) { // Si la quantité est inférieure ou égale à 0,
      removeFromBasket(foundProduct); // supprime l'article du panier
    } else { // Sinon,
      localStorage.setItem("kanap", JSON.stringify(basket)); // met à jour le panier dans le local storage
    }
  }
  initPage(); // Initialise la page
}

const removeProductFromCart = (product) => { // Définit une fonction qui supprime un article du panier
  basket = getCartItems().filter(p => p.id !== product.id); // Récupère les articles du panier, en excluant l'article à supprimer
  localStorage.setItem("kanap", JSON.stringify(basket)); // Met à jour le panier dans le local storage
  initPage(); // Initialise la page
}

/*
basket = getCartItems().filter(p => p.id !== product.id && p.color !== product.color);
*/

const initPage = () => {  //Définit une fonction qui initialise la page
  fetch('http://localhost:3000/api/products') // Envoie une requête HTTP GET à l'URL spécifiée,  
    .then((response) => response.json())// et attend la réponse sous forme de JSON
    .then((kanap) => { // Vide le contenu HTML de l'élément ayant l'identifiant 'cart__items'
      document.getElementById('cart__items').innerHTML = '';

      const cartItems = JSON.parse(localStorage.getItem('kanap')); // Récupère les articles du panier dans le local storage et les stocke dans une variable
      
      cartItems.forEach((cartItem) => { //et pour chaque article du panier, 
        const kanapFromApi = kanap.find(k => k._id === cartItem.id); // vérifie s'il existe dans la liste de produits de l'API

        if (!kanapFromApi) { //Si l'article n'existe pas, 
          return // la fonction s'arrête.
        }

        const container = document.querySelector("#cart__items"); // Récupère l'élément de la page ayant l'ID "cart__items" et le stocke dans la variable "container"

        const article = document.createElement("article"); // Crée un élément "article" et lui ajoute la classe "cart__item"
        article.classList.add("cart__item"); // Crée un élément "article" et lui ajoute la classe "cart__item"
        article.setAttribute("data-id", cartItem.id); // Ajoute un attribut "data-id" à l'élément "article" avec la valeur de "cartItem.id" en tant que valeur
        article.setAttribute("product-color", cartItem.color); // Ajoute un attribut "product-color" à l'élément "article" avec la valeur de "cartItem.color" en tant que valeur
        container.appendChild(article); // Ajoute un article à la page

        const divItemImg = document.createElement('div'); // Crée un élément div pour l'image
        divItemImg.classList.add("cart__item__img");
        article.appendChild(divItemImg); 

        const img = document.createElement("img"); // Crée un élément img
        img.src = kanapFromApi.imageUrl;
        img.alt = kanapFromApi.altTxt;
        divItemImg.appendChild(img);

        const divItemContent = document.createElement('div'); // Crée un élément div pour le contenu
        divItemContent.classList.add("cart__item__content");
        article.appendChild(divItemContent);

        const divItemContentDescription = document.createElement('div'); // Crée un élément div pour la description
        divItemContentDescription.classList.add("cart__item__content__description");
        divItemContent.appendChild(divItemContentDescription);

        const title = document.createElement("h2"); // Crée un élément h2 pour le titre
        title.innerText = kanapFromApi.name;
        divItemContentDescription.appendChild(title);

        const color = document.createElement("p"); // Crée un élément p pour la couleur
        color.innerText = cartItem.color;
        divItemContentDescription.appendChild(color);

        const price = document.createElement("p"); // Crée un élément p pour le prix
        price.innerText = `${kanapFromApi.price}€`;
        divItemContentDescription.appendChild(price);

        const divItemContentSettings = document.createElement('div'); // Crée un élément div pour les paramètres
        divItemContentSettings.classList.add("cart__item__content__settings");
        divItemContent.appendChild(divItemContentSettings);

        const divQuantity = document.createElement('div'); // Crée un élément div pour la quantité
        divQuantity.classList.add("cart__item__content__settings__quantity");
        divItemContentSettings.appendChild(divQuantity);

        const pQuantity = document.createElement("p"); // Crée un élément p pour la quantité
        pQuantity.innerText = "Qté : ";
        divQuantity.appendChild(pQuantity);

        const input = document.createElement("input"); // Crée un élément input pour la quantité
        input.setAttribute("type", "number");
        input.classList.add('itemQuantity');
        input.setAttribute("name", "itemQuantity");
        input.setAttribute("min", "1");
        input.setAttribute("max", "100");
        input.setAttribute("value", cartItem.quantity);
        divQuantity.appendChild(input);
        input.addEventListener('change', (event) => changeQuantity(cartItem, event.target.value)); // Ajoute un gestionnaire d'événement sur l'élément "input" qui appelle la fonction "changeQuantity" avec les arguments "cartItem" et la valeur actuelle de l'élément "input" lorsque la valeur de l'élément "input" est modifiée

        const divItemContentSettingsDelete = document.createElement('div'); // Crée un élément HTML "div" avec la classe "cart__item__content__settings__delete"
        divItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
        divItemContentSettings.appendChild(divItemContentSettingsDelete); // Ajoute l'élément "div" comme enfant de "divItemContentSettings"

        const pDeleteItem = document.createElement("p"); // Crée un élément HTML "p" avec la classe "deleteItem"
        pDeleteItem.classList.add("deleteItem");
        pDeleteItem.innerHTML = "Supprimer";// Modifie le contenu HTML de l'élément "p" avec "Supprimer"
        divItemContentSettingsDelete.appendChild(pDeleteItem);// Ajoute l'élément "p" comme enfant de "divItemContentSettingsDelete"
        pDeleteItem.addEventListener('click', () => removeProductFromCart(cartItem)); // Ajoute un gestionnaire d'événement sur l'élément "p" qui appelle la fonction "removeProductFromCart" avec l'argument "cartItem" lorsque l'élément "p" est cliqué


      });


      const totalPrice = getTotalPrice(kanap);// Récupère le prix total des articles dans le panier
      document.getElementById('totalPrice').innerText = totalPrice; // Affiche le prix total dans l'élément HTML ayant l'ID 'totalPrice'

    });


  const productQuantity = getTotalQuantity(); // Récupère le nombre total d'articles dans le panier
  document.getElementById('totalQuantity').innerText = productQuantity; // Affiche le nombre total d'articles dans l'élément HTML ayant l'ID 'totalQuantity'

}

initPage(); // Exécute la fonction initPage pour initialiser la page

//formulaire
const form = document.querySelector('.cart__order__form'); // Sélectionne le formulaire de la classe cart__order__form
  form.addEventListener('submit', async (event) => { // Écoute l'événement submit sur le formulaire

    
 if (getTotalQuantity() == 0) {
      alert('Vous ne pouvez pas passer une commande avec un panier vide');
      event.preventDefault();
      isValid = false;
    }
    
  event.preventDefault(); // Empêche le comportement par défaut du formulaire (envoi de données)
  document.getElementById('firstNameErrorMsg').innerText = ''; // Réinitialise le message d'erreur du champ de prénom
  let isValid = true; // Initialise la variable isValid à true
  const firstNameField = document.getElementById('firstName'); // Sélectionne le champ de prénom

  if (/\d+/.test(firstNameField.value) === true || /^\s+$/.test(firstNameField.value) === true) { // Vérifie si le champ de prénom contient un chiffre
    document.getElementById('firstNameErrorMsg').innerText = 'Votre prénom est incorrect'; // Modifie le message d'erreur du champ de prénom
    isValid = false; // Modifie la variable isValid à false
  }

  document.getElementById('lastNameErrorMsg').innerText = ''; // Réinitialise le message d'erreur du champ de nom
  const lastNameField = document.getElementById('lastName'); // Sélectionne le champ de nom

  if (/\d+/.test(lastNameField.value) === true || /^\s+$/.test(firstNameField.value) === true) { // Vérifie si le champ de nom contient un chiffre
    document.getElementById('lastNameErrorMsg').innerText = 'Votre nom est incorrect'; // Modifie le message d'erreur du champ de nom
    isValid = false; // Modifie la variable isValid à false
  }

  document.getElementById('addressErrorMsg').innerText = ''; // Réinitialise le message d'erreur de l'adresse
  const addressField = document.getElementById('address'); // Récupère le champ de saisie de l'adresse

  if (/^\s+$/.test(addressField.value) === true) { // Vérifie si la valeur du champ de saisie de l'adresse contient des espaces
    document.getElementById('addressErrorMsg').innerText = 'Votre adresse est incorrecte'; // Affiche un message d'erreur si c'est le cas
    isValid = false; // Définit la validation du formulaire à false
  }

  document.getElementById('cityErrorMsg').innerText = ''; // Réinitialise le message d'erreur de la ville
  const cityField = document.getElementById('city'); // Récupère le champ de saisie de la ville

  if (/\d+/.test(cityField.value) === true || /^\s+$/.test(firstNameField.value) === true) { // Vérifie si la valeur du champ de saisie de la ville contient des chiffres
    document.getElementById('cityErrorMsg').innerText = 'Votre ville est incorrecte'; // Affiche un message d'erreur si c'est le cas
    isValid = false; // Définit la validation du formulaire à false
  }

  document.getElementById('emailErrorMsg').innerText = ''; // Réinitialise le message d'erreur de l'email
  const emailField = document.getElementById('email'); // Récupère le champ de saisie de l'email

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailField.value) === false) { // Vérifie si la valeur du champ de saisie de l'email est une adresse email valide
    document.getElementById('emailErrorMsg').innerText = 'Votre email est incorrect'; // Affiche un message d'erreur si c'est le cas
    isValid = false; // Définit la validation du formulaire à false
  }

  const address = document.getElementById("address"); // Récupère le champ de saisie de l'adresse

  if (isValid === true) { // Si le formulaire est valide
    const cartItems = getCartItems(); // Récupère les articles du panier

    let response = await fetch('http://localhost:3000/api/products/order', { // Envoie une requête HTTP POST à l'URL 'http://localhost:3000/api/products/order' avec les données du formulaire dans le corps de la requête
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contact: {
          firstName: firstNameField.value,
          lastName: lastNameField.value, city: cityField.value, email: emailField.value, address: address.value
        }, products: cartItems.map(item => { return item.id })
      })
    })
    let result = await response.json(); // Récupère la réponse de la requête et la parse en objet JavaScript
    localStorage.clear(); //vider le panier après que la commande soit passée
    window.location.href = `confirmation.html?orderId=${result.orderId}`; // Redirige l'utilisateur vers la page de confirmation en passant l'identifiant de la commande en paramètre de l'URL
  
}
});


