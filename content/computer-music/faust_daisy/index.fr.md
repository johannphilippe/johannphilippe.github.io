---
title: "Faust Daisy"
date: 2026-07-04
summary: "Amélioration du support des cartes Daisy d'Electrosmith par Faust"
github: "https://github.com/grame-cncm/faust/tree/master-dev/architecture/daisy"
cover: "faustdaisy.png"
cover_credit: ""
gallery:
links:
  - name: "Faust Documentation"
    url: "https://faustdoc.grame.fr/"
  - name: "README - Documentation"
    url: "https://github.com/grame-cncm/faust/blob/master-dev/architecture/daisy/README.md"
---
Les cartes [Electrosmith Daisy](https://daisy.audio/) sont véritablement impressionnantes dans le monde des microcontrôleurs conçus pour l'audio et la musique. Et Faust cible les cartes Daisy depuis 2021.
Cependant, à l'automne 2025, avec l'équipe de recherche de GRAME, nous avons constaté que l'outil *faust2daisy* était cassé. J'ai commencé à investiguer tout en corrigeant les bugs, et j'ai également découvert que l'outil avait été conçu pour cibler des plateformes (telles que le Daisy Pod, le Patch, etc.) plutôt que les cartes elles-mêmes (Seed et PatchSM). En conséquence, l'outil limitait considérablement les fonctionnalités des cartes lorsqu'elles étaient utilisées avec Faust.
Par exemple, les ADC et DAC de contrôle n'étaient pas entièrement implémentés : les seuls disponibles étaient ceux que l'on pouvait trouver sur les principales plateformes.

Nous avons décidé de changer cela et avons réorienté la cible principale vers les cartes.
Après quelques semaines de développement, le nouvel outil *faust2daisy* cible désormais les cartes : la Daisy Seed et la PatchSM. Toutes deux sont assez similaires, si ce n'est pour la tension. La Seed fonctionne en 3,3 V, tandis que la PatchSM utilise la tension Eurorack (alimentée en -12 V / 12 V).
Désormais, *faust2daisy* prend en charge un ensemble complet de contrôles différents :

* ADC & DAC (CV In & Out pour la PatchSM)
* GPIO & Gates (ainsi que la PWM logicielle pour les sorties GPIO)
* Sortie PWM matérielle
* Entrée/sortie série pour communiquer les contrôles avec une autre carte ou un microcontrôleur complètement différent
* Entrée MIDI

Cette nouvelle version ajoute également la prise en charge des fichiers audio (*soundfiles*), conformément aux spécifications de Faust.

De plus, le nouveau modèle a été développé en gardant à l'esprit certaines contraintes de l'embarqué. Il offre un suivi de l'utilisation de la mémoire lors de la compilation, et permet de choisir où le programme est stocké (Flash ou QSPI) et où il est exécuté (Flash, SRAM, QSPI).
Enfin, il offre une option permettant de déplacer certains *buffers* vers la SRAM lorsqu'ils dépassent un seuil de taille spécifié.

Au final, *faust2daisy* est complet : il libère toute la puissance des cartes Daisy tout en profitant de l'expressivité et la qualité audio de Faust.