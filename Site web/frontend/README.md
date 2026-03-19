# 🚀 DigitCI Agency - Site Web

## 📁 Structure des fichiers

```
📦 digitci-website/
├── 📄 index.html          # Structure HTML
├── 🎨 styles.css          # Tous les styles CSS
├── ⚙️ script.js           # Interactions JavaScript
├── 🖼️ bg-network.jpg      # Image de fond réseau
└── 📖 README.md           # Ce fichier
```

## 🎯 Caractéristiques

✅ **Design moderne blanc et épuré**
- Fond blanc avec accents orange (#ff8c00)
- Image réseau bleue en arrière-plan (sections hero et about)
- Textes noirs pour meilleure lisibilité

✅ **Sections**
1. **Header/Navbar** - Navigation sticky avec fond blanc transparent
2. **Hero** - Section accueil avec image réseau en fond
3. **Services** - 6 services en grid
4. **Portfolio** - 3 projets exemples
5. **À propos** - Infos agence avec image en fond
6. **Contact** - Formulaire de contact
7. **Footer** - Liens et infos avec image en fond

✅ **Fonctionnalités**
- Navigation lisse (smooth scroll)
- Animations au scroll
- Formulaire de contact avec validation
- Design responsive (mobile, tablette, desktop)
- Effets hover professionnels
- Images de fond optimisées

## 🚀 Comment utiliser

### 1️⃣ Télécharger les fichiers
- Télécharge tous les 4 fichiers (HTML, CSS, JS, JPG)

### 2️⃣ Placer dans le même dossier
```
Mon-Site/
├── index.html
├── styles.css
├── script.js
└── bg-network.jpg
```

### 3️⃣ Ouvrir dans un navigateur
- Double-clic sur `index.html`
- C'est prêt! 🎉

## 🎨 Personnaliser les couleurs

Modifier les variables CSS en haut de `styles.css` :

```css
:root {
    --primary: #ffffff;      /* Couleur principale (blanc) */
    --secondary: #f5f5f5;    /* Gris clair */
    --accent: #ff8c00;       /* Orange (accent) */
    --accent-light: #ffb84d; /* Orange clair */
    --text: #1a1a1a;         /* Texte noir */
    --text-muted: #666666;   /* Texte gris */
    --bg: #ffffff;           /* Fond blanc */
    --border: #e0e0e0;       /* Bordures grises */
}
```

## 📝 Modifier le contenu

### Textes
- Ouvre `index.html`
- Modifie les titres, descriptions, etc. directement

### Services
- Ajoute/retire des `<div class="service-card">`

### Portfolio
- Remplace les gradients par des `<img src="...">`

### Contacts
- Change l'email: `contact@digitci.com`
- Change le téléphone: `+212 6 12 34 56 78`
- Change l'adresse: `Casablanca, Maroc`

## 📧 Formulaire de contact

Actuellement, le formulaire affiche un message de succès localement.

Pour l'intégrer à un serveur, ajoute une API:
```javascript
// Dans script.js, remplace le console.log par:
fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, subject, message })
})
```

## 🎬 Animations

Les animations sont activées automatiquement au scroll :
- `fadeInUp` : Éléments qui remontent en apparaissant
- `slideDown` : Navbar qui glisse vers le bas
- Hover effects : Effets de survol sur cartes et boutons

## 📱 Responsive Design

- **Desktop** : Layout optimal 1200px+
- **Tablet** : 768px - 1199px
- **Mobile** : 480px - 767px

## 🔧 Fichiers modifiables

| Fichier | Rôle | À modifier pour |
|---------|------|-----------------|
| `index.html` | Structure | Contenu, textes, sections |
| `styles.css` | Design | Couleurs, fonts, animations |
| `script.js` | Interactions | Fonctionnalités, validation |
| `bg-network.jpg` | Image | Fond (remplace le fichier) |

## ✨ Conseils

1. **Testez sur mobile** - Utilisez F12 dans le navigateur
2. **Optimisez les images** - Compressez pour web
3. **Ajoutez votre logo** - Remplacez "DigitCI" par une image
4. **Testez les liens** - Vérifiez que tous les liens fonctionnent
5. **Vérifiez les formulaires** - Testez la validation

## 🐛 Troubleshooting

### L'image de fond n'apparaît pas
- Vérifie que `bg-network.jpg` est dans le même dossier
- Vérifie le chemin dans `styles.css` (ligne ~130, ~270, ~580)

### Les styles ne s'appliquent pas
- Vérifier que `styles.css` est bien lié dans `index.html`
- Rafraîchir le navigateur (Ctrl+F5)

### Les animations ne fonctionnent pas
- Vérifier que `script.js` est chargé (bas de `index.html`)
- Vérifier la console (F12 > Console)

## 📞 Support

Pour d'autres questions ou modifications, consultez le code ou contactez un développeur.

---

**DigitCI Agency © 2024** - Tous droits réservés
