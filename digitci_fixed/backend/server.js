// ============================================
// SERVEUR DIGITCI AGENCY — VERSION SÉCURISÉE
// ============================================

const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const fs         = require('fs');
const path       = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

async function sendEmails(name, email, subject, message) {
    try {
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Nous avons recu votre message - DigitCI Agency',
            html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
                <div style="background:#1E2D5A;padding:20px;text-align:center">
                    <h1 style="color:#F97316;margin:0">DigitCI Agency</h1>
                </div>
                <div style="padding:30px;background:#f9f9f9">
                    <h2>Merci ${name} !</h2>
                    <p>Nous avons bien recu votre demande et reviendrons vers vous tres prochainement.</p>
                    <div style="background:white;padding:20px;border-left:4px solid #F97316;margin:20px 0">
                        <p><strong>Sujet :</strong> ${subject}</p>
                        <p><strong>Votre message :</strong><br>${message}</p>
                    </div>
                    <p>Cordialement,<br><strong>DigitCI Agency</strong></p>
                </div>
                <div style="background:#1E2D5A;padding:15px;text-align:center">
                    <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0">2025 DigitCI Agency - Abidjan, Cote d'Ivoire</p>
                </div>
            </div>`
        });

        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: process.env.AGENCY_EMAIL,
            subject: `Nouveau message de ${name} - DigitCI`,
            html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
                <div style="background:#1E2D5A;padding:20px">
                    <h2 style="color:#F97316;margin:0">Nouveau message recu !</h2>
                </div>
                <div style="padding:30px;background:#f9f9f9">
                    <p><strong>Nom :</strong> ${name}</p>
                    <p><strong>Email :</strong> ${email}</p>
                    <p><strong>Sujet :</strong> ${subject}</p>
                    <hr>
                    <p><strong>Message :</strong></p>
                    <p>${message}</p>
                    <hr>
                    <p style="color:#6B7280;font-size:12px">Recu le : ${new Date().toLocaleString('fr-FR')}</p>
                </div>
            </div>`
        });

        console.log(`Emails envoyes - client: ${email}`);
        return true;
    } catch (error) {
        console.error('Erreur envoi email:', error.message);
        return false;
    }
}

app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
    }
    const newMessage = { id: Date.now(), name, email, subject, message, date: new Date().toLocaleString('fr-FR') };
    const messagesFile = path.join(__dirname, 'messages.json');
    let messages = [];
    if (fs.existsSync(messagesFile)) messages = JSON.parse(fs.readFileSync(messagesFile, 'utf8') || '[]');
    messages.push(newMessage);
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
    const emailsSent = await sendEmails(name, email, subject, message);
    res.json({ success: true, message: emailsSent ? 'Message recu et email envoye !' : 'Message recu', data: newMessage });
});

app.get('/api/messages', (req, res) => {
    const messagesFile = path.join(__dirname, 'messages.json');
    if (fs.existsSync(messagesFile)) {
        res.json(JSON.parse(fs.readFileSync(messagesFile, 'utf8') || '[]'));
    } else res.json([]);
});

app.delete('/api/messages/:id', (req, res) => {
    const messagesFile = path.join(__dirname, 'messages.json');
    const messageId = parseInt(req.params.id);
    if (fs.existsSync(messagesFile)) {
        let messages = JSON.parse(fs.readFileSync(messagesFile, 'utf8') || '[]');
        messages = messages.filter(msg => msg.id !== messageId);
        fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
        res.json({ success: true });
    } else res.status(404).json({ error: 'Aucun message trouve' });
});

app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));

app.listen(PORT, () => {
    console.log(`Serveur DigitCI lance sur http://localhost:${PORT}`);
    console.log(`Email: ${process.env.GMAIL_USER}`);
});
