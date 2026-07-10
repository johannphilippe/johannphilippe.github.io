---
title: "Faust JSFX"
date: 2024-04-17
summary: "Backend Faust permettant le support des plugins JSFX dans Reaper"
github: "https://github.com/grame-cncm/faust"
cover: "faust.png"
cover_credit: ""
gallery:
links:
  - name: "Faust Documentation"
    url: "https://faustdoc.grame.fr/"
  - name: "Tutorial"
    url: "https://faustdoc.grame.fr/tutorials/jsfx/"
  - name: "Article"
    url: "https://hal.science/hal-05102319"
---

Dans le cadre du projet européen *Métamorphoses*, et en collaboration avec GRAME, j'ai pu contribuer au projet [Faust](https://faust.grame.fr/) à travers le développement d'un nouveau backend : JSFX. Les backends Faust correspondent aux langages de programmation cible dans lesquels le compilateur de Faust peut générer du code.
[JSFX](https://www.reaper.fm/sdk/js/js.php) est l'environnement de description de programmes de traitement du signal audio dédié du logiciel [Reaper](https://www.reaper.fm/). Il est basé sur un logiciel conçu par les développeurs du DAW : [EEL2](https://www.cockos.com/EEL2/).

Le backend JSFX est donc un générateur de code, qui permet de traduire la sortie du compilateur Faust en langage JSFX, et donc de rapidement créer des plugins pour Reaper qui soient à la fois textuels et portables (pas de binaire). Cette portabilité, ainsi que la grande abstraction permise par le langage Faust, permettent entre autres de répondre à un enjeu central de l'informatique musicale, à savoir la capacité des programme à survivre aux systèmes pour lesquels et avec lesquels ils ont été conçus. Une petit pas peut-être, mais un pas affirmé vers la pérennité et l'accessibilité des outils d'informatique musicale.

