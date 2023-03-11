let params = new URLSearchParams(document.location.search); // Récupère le paramètre 'id' de l'URL de la page
let id = params.get("id");

fetch(`http://localhost:3000/api/products/${id}`) // Envoie une requête HTTP GET à l'API pour récupérer les informations du canapé
  .then((response) => response.json())
  .then((kanap) => {
    if (!kanap._id) { // Si l'ID du canapé n'existe pas dans l'API, redirige vers la page d'accueil
      window.location.href = './';
    }
    const itemImg = document.querySelector('.item__img'); // Récupère les éléments de la page pour afficher les informations du canapé
    const h1 = document.getElementById('title');
    const price = document.getElementById('price');
    const description = document.getElementById('description');
    const selectColors = document.getElementById('colors');

    const img = document.createElement("img"); // Crée une balise img et ajoute les informations du canapé dedans
    img.src = kanap.imageUrl;
    img.alt = kanap.altTxt;
    itemImg.appendChild(img);

    h1.innerText = kanap.name; // Ajoute le nom du canapé dans la balise h1

    price.innerText = kanap.price; // Ajoute le prix du canapé dans la balise p

    description.innerText = kanap.description; // Ajoute la description du canapé

    kanap.colors.forEach((color) => { //récupère les couleurs de kanap et crée une option pour chaque couleur dans le select
      const option = document.createElement('option');
      option.value = color;
      option.innerText = color;
      selectColors.appendChild(option);
    });
  });

  


const button = document.querySelector("#addToCart"); //récupère le bouton d'ajout au panier

const addBasket = () => { //déclare la fonction addBasket
  const select = document.querySelector('#colors').value; //récupère la couleur sélectionnée dans le select
  const quantity = document.querySelector('#quantity').value; //récupère la quantité souhaitée dans l'input

  saveKanap({ id, color: select, quantity: +quantity }); //enregistre le canapé dans le panier avec l'id, la couleur et la quantité

}

button.addEventListener("click", addBasket); //ajoute un écouteur d'évènement au clic sur le bouton pour lancer la fonction addBasket

const saveKanap = (kanap) => { // Enregistre un nouveau canapé dans le panier
  const cart = localStorage.getItem("kanap"); // Récupère les items du panier présents dans le localStorage
  if (cart) { // Si le panier n'est pas vide
    const array = JSON.parse(cart); // Convertit les items du panier en tableau
    const isElementAlreadyInCart = array.find(el => el.id === kanap.id && el.color === kanap.color) // Vérifie si le canapé à ajouter est déjà présent dans le panier en vérifiant si son id et sa couleur sont déjà présents
    if (isElementAlreadyInCart) { // Si le canapé est déjà présent
      isElementAlreadyInCart.quantity = +isElementAlreadyInCart.quantity + +kanap.quantity; // Modifie la quantité du canapé en ajoutant la quantité souhaitée à la quantité existante
    } else {
      array.push(kanap); // Ajoute le canapé au panier
    }
    localStorage.setItem("kanap", JSON.stringify(array)); // Met à jour le panier dans le localStorage en convertissant le tableau en chaîne de caractères
  } else {
    const array = []; // Si le panier est vide, crée un tableau avec le canapé à ajouter et met à jour le panier dans le localStorage
    array.push(kanap);
    localStorage.setItem("kanap", JSON.stringify(array));
  }
}

