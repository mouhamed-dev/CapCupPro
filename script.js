// Fonction pour le défilement fluide
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: "smooth" });
}

// Gestion du formulaire de commande
document
  .getElementById("commande-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Récupération des données du formulaire
    const formData = {
      nom: document.getElementById("nom").value,
      whatsapp: document.getElementById("whatsapp").value,
      email: document.getElementById("email").value,
      forfait: document.getElementById("forfait").value,
    };

    // Ici, vous pouvez ajouter la logique pour envoyer les données à votre backend
    // Par exemple, en utilisant fetch() ou en redirigeant vers WhatsApp

    // Message de confirmation
    alert(
      "Votre demande a été envoyée avec succès ! Nous vous contacterons bientôt."
    );

    // Réinitialisation du formulaire
    this.reset();
  });

// Animation des cartes d'offres au scroll
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Application de l'animation aux cartes d'offres
document.querySelectorAll(".offre-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "all 0.5s ease-out";
  observer.observe(card);
});

// Animation des avantages au scroll
document.querySelectorAll(".avantage-item").forEach((item) => {
  item.style.opacity = "0";
  item.style.transform = "translateY(20px)";
  item.style.transition = "all 0.5s ease-out";
  observer.observe(item);
});

function scrollToForm() {
  const formElement = document.getElementById('contact');
  formElement.scrollIntoView({ behavior: 'smooth' });
}

document.querySelectorAll('.abonnement-button').forEach(button => {
  button.addEventListener('click', scrollToForm);
});