/*// ============================================
// IMPORTER LES DÉPENDANCES
// ============================================
// Ces lignes chargent les outils qu'on a installés

const express = require('express');           // Pour créer le serveur web
const cors = require('cors');                 // Pour permettre la communication frontend-backend
const bodyParser = require('body-parser');    // Pour lire les données du formulaire
const fs = require('fs');                     // Pour lire/écrire des fichiers
const path = require('path');                 // Pour gérer les chemins des fichiers

// ============================================
// CRÉER L'APPLICATION EXPRESS
// ============================================
// app = notre serveur web

const app = express();

// ============================================
// DÉFINIR LE PORT
// ============================================
// Le port c'est comme une "porte" du serveur
// 3000 est un port couramment utilisé en développement
// Quand on lance le serveur, on accèdera à http://localhost:3000

const PORT = 3000;

// ============================================
// CONFIGURER LES MIDDLEWARES
// ============================================
// Les middlewares sont des "intermédiaires" qui traitent les données

// 1. CORS = Permet au frontend (localhost:5500) de parler au backend (localhost:3000)
//    Sans CORS, le navigateur bloque la communication pour des raisons de sécurité
app.use(cors());

// 2. body-parser JSON = Transforme les données JSON en objet JavaScript
//    Ex: { "name": "Jean" } → { name: 'Jean' }
app.use(bodyParser.json());

// 3. body-parser URL = Transforme les données de formulaire
app.use(bodyParser.urlencoded({ extended: true }));

// 4. Servir les fichiers statiques (HTML, CSS, JS, JPG)
//    '..' = Remonte un dossier (du backend/ au digitci-website/)
app.use(express.static('../'));

// ============================================
// DÉFINIR LE FICHIER DE STOCKAGE DES MESSAGES
// ============================================
// On va sauvegarder les messages dans un fichier JSON
// messages.json sera créé dans le dossier backend/

const messagesFile = path.join(__dirname, 'messages.json');

// __dirname = le chemin du dossier courant (backend/)
// path.join() = construit un chemin correct (compatible Windows/Mac/Linux)

// ============================================
// ROUTE 1 : RECEVOIR LES MESSAGES DU FORMULAIRE
// ============================================
// app.post() = Écouter les demandes POST (envoi de données)
// '/api/contact' = L'adresse où le formulaire envoie les données
// (req, res) = req = requête, res = réponse

app.post('/api/contact', (req, res) => {
    // ============================================
    // EXTRAIRE LES DONNÉES DU FORMULAIRE
    // ============================================
    // req.body contient les données envoyées par le formulaire
    // On les extrait pour plus de clarté

    const { name, email, subject, message } = req.body;

    // Équivalent à :
    // const name = req.body.name;
    // const email = req.body.email;
    // const subject = req.body.subject;
    // const message = req.body.message;

    // ============================================
    // VALIDER LES DONNÉES
    // ============================================
    // On vérifie que tous les champs sont remplis
    // Si un champ est vide, on renvoie une erreur

    if (!name || !email || !subject || !message) {
        // .status(400) = Code d'erreur HTTP (400 = Mauvaise requête)
        // .json() = Envoyer une réponse en format JSON
        return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
    }

    // ============================================
    // CRÉER UN OBJET MESSAGE
    // ============================================
    // On structure les données avec une date et un ID unique

    const newMessage = {
        id: Date.now(),                          // ID unique basé sur la date/heure
        name: name,                              // Nom du client
        email: email,                            // Email du client
        subject: subject,                        // Sujet du projet
        message: message,                        // Le message complet
        date: new Date().toLocaleString('fr-FR') // Date et heure en format français
    };

    // ============================================
    // LIRE LES MESSAGES EXISTANTS
    // ============================================
    // On récupère les anciens messages avant d'en ajouter un nouveau

    let messages = []; // Tableau vide par défaut

    // Vérifier si le fichier messages.json existe déjà
    if (fs.existsSync(messagesFile)) {
        // Lire le contenu du fichier
        const data = fs.readFileSync(messagesFile, 'utf8');
        // 'utf8' = format de texte standard

        // Convertir le texte JSON en objet JavaScript
        // JSON.parse() = transforme du JSON en objet
        messages = JSON.parse(data || '[]');
        // Si data est vide, utiliser un tableau vide []
    }

    // ============================================
    // AJOUTER LE NOUVEAU MESSAGE
    // ============================================
    // On ajoute le nouveau message à la liste

    messages.push(newMessage);
    // .push() = ajouter un élément à la fin du tableau

    // ============================================
    // SAUVEGARDER LES MESSAGES DANS LE FICHIER
    // ============================================
    // On écrit les messages dans messages.json

    // JSON.stringify() = transforme un objet JavaScript en texte JSON
    // messages = l'objet à transformer
    // null = (pas de remplacement spécial)
    // 2 = indenter avec 2 espaces (pour que ce soit lisible)
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
    // writeFileSync = écrire de façon synchrone (attendre que ce soit fini)

    // ============================================
    // AFFICHER UN MESSAGE DANS LE TERMINAL
    // ============================================
    // Pour que toi tu vois quand un message arrive

    console.log(`✅ Message reçu de ${name} (${email})`);

    // ============================================
    // RENVOYER UNE RÉPONSE POSITIVE
    // ============================================
    // On dit au frontend que tout s'est bien passé

    res.json({
        success: true,                    // Succès = true
        message: 'Message reçu avec succès!',
        data: newMessage                  // On renvoie aussi le message créé
    });
});

// ============================================
// ROUTE 2 : VOIR TOUS LES MESSAGES (OPTIONNEL - POUR ADMIN)
// ============================================
// app.get() = Écouter les demandes GET (récupérer des données)
// '/api/messages' = L'adresse pour accéder à tous les messages

app.get('/api/messages', (req, res) => {
    // Vérifier si le fichier existe
    if (fs.existsSync(messagesFile)) {
        // Lire le fichier
        const data = fs.readFileSync(messagesFile, 'utf8');
        // Convertir en objet JavaScript
        const messages = JSON.parse(data || '[]');
        // Envoyer les messages au client
        res.json(messages);
    } else {
        // Si le fichier n'existe pas, renvoyer un tableau vide
        res.json([]);
    }
});

// ============================================
// DÉMARRER LE SERVEUR
// ============================================
// C'est la ligne qui lance réellement le serveur

app.listen(PORT, () => {
    // Afficher un message dans le terminal quand le serveur démarre
    console.log(`🚀 Serveur DigitCI lancé sur http://localhost:${PORT}`);
    console.log(`📝 Les messages seront sauvegardés dans: ${messagesFile}`);
});

// ============================================
// RÉSUMÉ DU FLUX
// ============================================
// 1. Utilisateur remplit le formulaire et clique "Envoyer"
// 2. JavaScript du frontend envoie les données au backend (http://localhost:3000/api/contact)
// 3. Le backend reçoit les données
// 4. On vérifie que tout est bon
// 5. On crée un objet message avec ID et date
// 6. On lit les anciens messages du fichier messages.json
// 7. On ajoute le nouveau message à la liste
// 8. On sauvegarde tout dans messages.json
// 9. On envoie une réponse positive au frontend
// 10. Le frontend affiche "Message envoyé!" à l'utilisateur
*/



















// Importer les outils
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer'); // Pour envoyer les emails

// Créer le serveur
const app = express();
const PORT = 3000;

// Configurer les middlewares
app.use(cors({
    origin: ['https://digitci-website.vercel.app', 'https://digitci.ci', 'https://www.digitci.ci', 'http://localhost:3000', 'http://localhost:*'],
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('../frontend')); // Servir les fichiers frontend

// Chemin du fichier messages
const messagesFile = path.join(__dirname, 'messages.json');

// ============================================
// CONFIGURER NODEMAILER
// ============================================
// C'est ici qu'on configure l'envoi d'emails

// IMPORTANT : À MODIFIER AVEC TES INFOS!
// Pour Gmail : tu dois créer un "mot de passe d'application"
// Lien : https://myaccount.google.com/apppasswords

const transporter = nodemailer.createTransport({
    service: 'gmail', // On utilise Gmail
    auth: {
        user: 'yannstephane85@gmail.com', // ← REMPLACE PAR TON EMAIL GMAIL (Mail de l'Agence)
        pass: 'lbkm gmle nxgc xfgj' // ← REMPLACE PAR LE MOT DE PASSE D'APP
    }
});

// ============================================
// FONCTION POUR ENVOYER LES EMAILS
// ============================================

async function sendEmails(name, email, subject, message) {
    try {
        // EMAIL 1 : Confirmation au CLIENT
        await transporter.sendMail({
            from: 'yannstephane85@gmail.com', // Qui envoie
            to: email, // À qui envoyer (le client)
            subject: '✅ Nous avons reçu votre message - DigitCI Agency',
            html: `
                <h2>Merci ${name}!</h2>
                <p>Nous avons bien reçu votre demande.</p>
                <p><strong>Sujet :</strong> ${subject}</p>
                <p><strong>Votre message :</strong></p>
                <p>${message}</p>
                <hr>
                <p>Notre équipe vous recontactera très bientôt!</p>
                <p>Cordialement,<br>DigitCI Agency</p>
            `
        });
        
        console.log(`📧 Email de confirmation envoyé à ${email}`);

        // EMAIL 2 : Notification à L'AGENCE
        await transporter.sendMail({
            from: 'yannstephane85@gmail.com',
            to: 'yannstephane85@gmail.com', // ← L'EMAIL DE L'AGENCE
            subject: `📬 Nouveau message de ${name}`,
            html: `
                <h2>Nouveau message reçu!</h2>
                <p><strong>Nom :</strong> ${name}</p>
                <p><strong>Email :</strong> ${email}</p>
                <p><strong>Sujet :</strong> ${subject}</p>
                <hr>
                <p><strong>Message :</strong></p>
                <p>${message}</p>
                <hr>
                <p>Date : ${new Date().toLocaleString('fr-FR')}</p>
            `
        });
        
        console.log(`📧 Email de notification envoyé à l'agence`);
        return true;
    } catch (error) {
        console.error('❌ Erreur lors de l\'envoi des emails:', error);
        return false;
    }
}

// ============================================
// ROUTE 1 : Recevoir les messages
// ============================================

app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Vérifier que tous les champs sont remplis
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
    }

    // Créer le message
    const newMessage = {
        id: Date.now(),
        name: name,
        email: email,
        subject: subject,
        message: message,
        date: new Date().toLocaleString('fr-FR')
    };

    // Lire les anciens messages
    let messages = [];
    if (fs.existsSync(messagesFile)) {
        const data = fs.readFileSync(messagesFile, 'utf8');
        messages = JSON.parse(data || '[]');
    }

    // Ajouter le nouveau message
    messages.push(newMessage);

    // Sauvegarder dans le fichier
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));

    // Afficher dans le terminal
    console.log(`✅ Message reçu de ${name} (${email})`);

    // ENVOYER LES EMAILS
    const emailsSent = await sendEmails(name, email, subject, message);

    // Envoyer la réponse au frontend
    res.json({
        success: true,
        message: emailsSent ? 'Message reçu et emails envoyés!' : 'Message reçu mais erreur d\'envoi d\'emails',
        data: newMessage
    });
});

// ============================================
// ROUTE 2 : Voir tous les messages
// ============================================

app.get('/api/messages', (req, res) => {
    if (fs.existsSync(messagesFile)) {
        const data = fs.readFileSync(messagesFile, 'utf8');
        const messages = JSON.parse(data || '[]');
        res.json(messages);
    } else {
        res.json([]);
    }
});

// ============================================
// ROUTE 3 : Supprimer un message (pour l'admin)
// ============================================

app.delete('/api/messages/:id', (req, res) => {
    const messageId = parseInt(req.params.id);

    if (fs.existsSync(messagesFile)) {
        const data = fs.readFileSync(messagesFile, 'utf8');
        let messages = JSON.parse(data || '[]');

        // Supprimer le message avec cet ID
        messages = messages.filter(msg => msg.id !== messageId);

        // Sauvegarder
        fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));

        console.log(`🗑️ Message ${messageId} supprimé`);
        res.json({ success: true, message: 'Message supprimé' });
    } else {
        res.status(404).json({ error: 'Aucun message trouvé' });
    }
});

// ============================================
// LANCER LE SERVEUR
// ============================================
// Servir la page admin

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
    console.log(`📧 Emails configurés`);
    console.log(`🔐 Page admin : http://localhost:${PORT}/admin`);
});