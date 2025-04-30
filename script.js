// Initialisation de EmailJS
(function () {
  emailjs.init("TnzGfbRG75wr6JGKx");
})();

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

    const form = this;
    // Récupération des données du formulaire
    const formData = {
      from_name: document.getElementById("nom").value,
      whatsapp:
        document.getElementById("phone-prefix").value +
        document.getElementById("whatsapp").value,
      email: document.getElementById("email").value,
      forfait: document.getElementById("forfait").value,
    };
    console.log(formData.forfait);
    // Obtenir la date du jour
    const today = new Date();

    // Fonction pour formater la date en "Samedi 24 mai 2025"
    function formatDate(date) {
      return date.toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    // Initialisation des variables personnalisées
    let type = "";
    let expireDate = new Date(today); // Copie de la date actuelle
    let total = "";

    // Traitement du forfait
    switch (formData.forfait) {
      case "1mois":
        type = "1 Mois - 2500F";
        expireDate.setMonth(today.getMonth() + 1);
        total = "2 500F";
        linkPay = "https://pay.wave.com/m/M_sn_3rVgFeQKkRIX/c/sn/?amount=2500";
        break;
      case "3mois":
        type = "3 Mois - 6000F";
        expireDate.setMonth(today.getMonth() + 3);
        total = "6 000F";
        linkPay = "https://pay.wave.com/m/M_sn_3rVgFeQKkRIX/c/sn/?amount=6000";
        break;
      case "6mois":
        type = "6 Mois - 10500F";
        expireDate.setMonth(today.getMonth() + 6);
        total = "10 500F";
        linkPay = "https://pay.wave.com/m/M_sn_3rVgFeQKkRIX/c/sn/?amount=10500";
        break;
      case "1an":
        type = "1 An - 18000F";
        expireDate.setFullYear(today.getFullYear() + 1);
        total = "18 000F";
        linkPay = "https://pay.wave.com/m/M_sn_3rVgFeQKkRIX/c/sn/?amount=18000";
        break;
      default:
        type = "Forfait inconnu";
        total = "0F";
    }
    expireDate.setDate(expireDate.getDate() + 1);

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Ajout des données dans formData pour l'email utilisateur
    formData.type = type;
    formData.expire = capitalizeFirstLetter(formatDate(expireDate));
    formData.total = total;
    formData.linkPay = linkPay;

    // Afficher un message de chargement
    const submitButton = this.querySelector(".submit-button");
    const originalText = submitButton.textContent;
    submitButton.textContent = "Envoi en cours...";
    submitButton.disabled = true;

    // Envoi de l'email via EmailJS
    emailjs
      .send("service_er4fw0o", "template_pn2dkd9", formData) // Envoi à toi
      .then(function (response) {
        alert("Votre demande a été envoyée avec succès !");
        form.reset();

        // 👇 Envoi du mail automatique à l'utilisateur
        emailjs
          .send("service_er4fw0o", "template_dhbw166", formData)
          .then(function (res) {
            console.log("Email de confirmation envoyé à l'utilisateur !");
          })
          .catch(function (err) {
            console.error("Erreur envoi email utilisateur :", err);
          });
      })
      .catch(function (error) {
        alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
        console.error("EmailJS error:", error);
      })
      .finally(function () {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      });
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
  const formElement = document.getElementById("contact");
  formElement.scrollIntoView({ behavior: "smooth" });
}

document.querySelectorAll(".abonnement-button").forEach((button) => {
  button.addEventListener("click", scrollToForm);
});

function message() {
  const numero = "221774731341";
  const texte = "Bonjour ! je suis intéressé.e pour l'abonnement CapCut Pro.";
  const lien = `https://wa.me/${numero}?text=${encodeURIComponent(texte)}`;
  window.open(lien, "_blank");
}


function shareWebsite() {
  if (navigator.share) {
    navigator.share({
      title: 'Takku Liggeey - CapCut Pro',
      text: 'Abonnez-vous facilement à CapCut Pro via Takku Liggeey. Paiement rapide et sécurisé.',
      url: window.location.href
    })
    .then(() => console.log('Partage réussi'))
    .catch((error) => console.log('Erreur de partage', error));
  } else {
    alert("Le partage n'est pas pris en charge sur ce navigateur.");
  }
}