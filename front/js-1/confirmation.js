const urlParams = new URLSearchParams(window.location.search);// Crée un objet 'URLSearchParams' à partir des paramètres de l'URL actuelle
const orderIdp = document.getElementById('orderId'); // Récupère l'élément HTML avec l'ID 'orderId'

orderIdp.innerText = urlParams.get('orderId'); // Définit le contenu de l'élément 'orderId' avec la valeur du paramètre 'orderId' de l'URL




