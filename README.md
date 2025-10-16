# Carte d'anniversaire — Forêt Enchantée

Une mini aventure web interactive (type escape game) sur le thème des tomte, elfes et fées. Conçue pour fonctionner sur smartphone et hébergée sur GitHub Pages.

## Parcours

- `index.html` – Accueil et introduction.
- `foret.html` – Énigme 1 (runes des elfes).
- `clairiere.html` – Énigme 2 (phases de lune).
- `ruisseau.html` – Énigme 3 (pierres du ruisseau).
- `sanctuaire.html` – Message final et célébration.

## Déploiement sur GitHub Pages

1. Crée un nouveau repository (public ou privé) sur GitHub et pousse ces fichiers à la racine.
2. Dans les paramètres du repo → Pages → Source: sélectionne la branche `main` (ou `master`) et le dossier `/root`.
3. GitHub générera une URL de type `https://<ton-compte>.github.io/<nom-du-repo>/`.
4. Teste sur ton smartphone. Le site est entièrement statique (HTML/CSS/JS).

Astuce: Personnalise le titre et les textes si tu le souhaites (par ex. dans `index.html` et `sanctuaire.html`).

## QR Code (facultatif)

Une fois l’URL GitHub Pages connue, tu peux créer un QR code avec n’importe quel générateur (ex: `qr-code-generator.com`) ou via la ligne de commande:

```bash
# macOS avec Homebrew
brew install qrencode
qrencode -o qrcode.png "https://<ton-compte>.github.io/<nom-du-repo>/"
```

## Personnalisation

- Couleurs et styles: `assets/styles.css` (variables CSS en haut de fichier).
- Effets (étoiles, lucioles, confettis): `assets/main.js`.
- Textes: principalement dans les fichiers `.html`.

## Notes

- Aucune dépendance externe obligatoire (Google Fonts est optionnel). Le site fonctionne hors connexion après chargement, mais l’hébergement reste en ligne.
- Les énigmes n’exigent pas d’audio et sont tactiles (tap/clic).

