const displayProduct = (kanap) => { // Définit une fonction qui affiche un produit
  const container = document.querySelector("#items"); // Récupère l'élément HTML avec l'ID 'items'
  const link = document.createElement("a"); // Crée un élément 'a' (lien)
  link.href = "./product.html?id=" + kanap._id; // Définit l'attribut 'href' du lien avec l'ID du produit
  container.appendChild(link); // Ajoute le lien à la fin de l'élément 'items'
  const article = document.createElement("article"); // Crée un élément 'article'
  link.appendChild(article); // Ajoute l'élément 'article' au lien
  const img = document.createElement("img"); // Crée un élément 'img' (image)
  img.src = kanap.imageUrl; // Définit l'attribut 'src' de l'image avec l'URL de l'image du produit
  img.alt = kanap.altTxt; // Définit l'attribut 'alt' de l'image avec le texte alternatif du produit
  article.appendChild(img); // Ajoute l'image à l'élément 'article'

  const h3 = document.createElement("h3"); // Crée un élément 'h3' (titre de niveau 3)
  h3.innerText = kanap.name; // Définit le contenu du titre avec le nom du produit
  h3.className = "productName"; // Ajoute une classe au titre
  article.appendChild(h3); // Ajoute le titre à l'élément 'article'

  const p = document.createElement("p"); // Crée un élément 'p' (paragraphe)
  p.innerText = kanap.description;// Définit le contenu du paragraphe avec la description du produit
  p.className = "productDescription"; // Ajoute une classe au paragraphe
  article.appendChild(p); // Ajoute le paragraphe à l'élément 'article'
}
fetch('http://localhost:3000/api/products') // Envoie une requête HTTP GET à l'URL spécifiée
  .then((response) => response.json()) // Convertit la réponse en JSON
  .then((data) => { // Une fois la réponse convertie en JSON,
    data.forEach((kanap) => { // pour chaque produit dans la réponse,
      displayProduct(kanap); // appelle la fonction 'displayProduct' avec le produit
    });
  });