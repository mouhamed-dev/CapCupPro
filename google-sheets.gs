function doPost(e) {
  try {
    // Récupérer les données du formulaire
    const data = JSON.parse(e.postData.contents);

    // Ouvrir la feuille de calcul
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();

    // Préparer les données à enregistrer
    const rowData = [
      new Date(), // Date et heure de la commande
      data.from_name, // Nom
      data.whatsapp, // WhatsApp
      data.email, // Email
      data.type, // Type de forfait
      data.expire, // Date d'expiration
      data.total, // Montant total
      data.linkPay, // Lien de paiement
    ];

    // Ajouter les données à la feuille
    sheet.appendRow(rowData);

    // Retourner une réponse de succès
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Données enregistrées avec succès",
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // En cas d'erreur, retourner un message d'erreur
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
