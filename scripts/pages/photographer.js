// Récupérer l'id de l'utilisateur
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
console.log('UserID:', userId);

const fetchDataProfile = async () => {
    const response = await fetch("data/photographers.json");
    const jsonResponse = await response.json();
    console.log('Tous les photographes:', jsonResponse.photographers);

    // Trouver le photographe correspondant à l'id
    const photographerById = jsonResponse.photographers.find((photographer) => photographer.id === parseInt(userId));
    console.log('Photographe trouvé:', photographerById);

    if (photographerById) {
        // Afficher les données du photographe
        console.log('Données du photographe:', photographerById);
    } else {
        console.error("Aucun photographe trouvé avec l'ID : ", userId);
    }

    // Retourner les données du photographe (si besoin)
    return photographerById;
};


fetchDataProfile();




