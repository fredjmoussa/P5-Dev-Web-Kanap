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

/* 
const addBasket = (event, id) => { //déclare la fonction addBasket en prenant en compte l'événement et l'id de l'objet kanap
  let basket = JSON.parse(localStorage.getItem("kanap")); // Récupère les articles du panier depuis le local storage
  let foundProduct = basket.find(p => p.id === id); // Recherche l'article dans le panier à partir de son ID
  if (foundProduct.quantity > 100) { // Si la quantité est supérieur ou égale à 100,
      alert ('la quantité maximum est déjà atteinte');
      event.preventDefault();
      basket = basket.filter(p => p.id !== id);
      localStorage.setItem("kanap", JSON.stringify(basket));
  }
}
*/



const addBasket = () => { //déclare la fonction addBasket
  const select = document.querySelector('#colors').value; //récupère la couleur sélectionnée dans le select
  const quantity = document.querySelector('#quantity').value; //récupère la quantité souhaitée dans l'input

  if (quantity > 100) { //Ne pas autoriser à ajouter plus de 100 produits
    alert('Vous ne pouvez pas ajouter plus de 100 produits.');
    addBasket.preventDefault();
  }

  if (quantity < 0) { //Ne pas autoriser à ajouter des produits négatifs
    alert('Vous devez sélectionner une quantité positive.');
    addBasket.preventDefault();
  }

  if (quantity == 0){ //vérifier que l'utilisateur a sélectionné une quantité avant d'ajouter un produit au panier
    alert('Vous devez sélectionner une quantité.');
    addBasket.preventDefault();
}

  if (select === ''){ //vérifier que l'utilisateur a sélectionné une couleur avant d'ajouter un produit au panier
    alert('Vous devez sélectionner une couleur.');
    addBasket.preventDefault();
}

  saveKanap({ id, color: select, quantity: +quantity }); //enregistre le canapé dans le panier avec l'id, la couleur et la quantité

}
let totalQuantity = 0;
button.addEventListener("click", addBasket); //ajoute un écouteur d'évènement au clic sur le bouton pour lancer la fonction addBasket

const saveKanap = (kanap) => { // Enregistre un nouveau canapé dans le panier
  
  const cart = localStorage.getItem("kanap"); // Récupère les items du panier présents dans le localStorage


  if (cart) { // Si le panier n'est pas vide
    const quantity = document.querySelector('#quantity').value; //récupère la quantité souhaitée dans l'input

    const array = JSON.parse(cart); // Convertit les items du panier en tableau
    const isElementAlreadyInCart = array.find(el => el.id === kanap.id && el.color === kanap.color) // Vérifie si le canapé à ajouter est déjà présent dans le panier en vérifiant si son id et sa couleur sont déjà présents
    const totalArray = isElementAlreadyInCart.quantity + parseInt(quantity)
    console.log(typeof quantity)
    console.log(totalArray)
    console.log(quantity)
    if (isElementAlreadyInCart) { // Si le canapé est déjà présent
      if (totalArray < 100) {

      isElementAlreadyInCart.quantity = +isElementAlreadyInCart.quantity + +kanap.quantity; // Modifie la quantité du canapé en ajoutant la quantité souhaitée à la quantité existante
      } else {
        alert("La quantité ne peut pas être audessus de 100")
      }
    } else {
      array.push(kanap); // Ajoute le canapé au panier
    }
    localStorage.setItem("kanap", JSON.stringify(array)); // Met à jour le panier dans le localStorage en convertissant le tableau en chaîne de caractères
 
  } else {
    const array = []; // Si le panier est vide, crée un tableau avec le canapé à ajouter et met à jour le panier dans le localStorage
    array.push(kanap);
    localStorage.setItem("kanap", JSON.stringify(array));
  }
};


