---
title: "Idyl"
date: 2026-06-03
summary: "Un langage pour programmer le temps"
github: "https://github.com/johannphilippe/idyl"
cover: ""
cover_credit: ""
gallery:
links:
  - name: "Idyl Documentation"
    url: "https://johannphilippe.github.io/idyl"
---

## L'origine 

Voilà un moment que je réfléchis à un langage de **programmation du temps**. 
Bien entendu, cette réflexion est corrélée à un ensemble de nécessités. À commencer par celle d'un moyen d'expression qui me corresponde pour concevoir la musique, l'écrire et la jouer. Mais c'est aussi par un besoin d'exhaustivité que j'ai voulu en faire un outil permettant d'assurer le séquencement précis de n'importe quel système temporel. C'est pour cette raison qu'Idyl n'est pas un langage audio : c'est un langage temporel. 

Au cours de cette réflexion, j'ai rencontré et découvert de nombreux autres langages, auxquels j'ai emprunté des concepts et idées. Le projet Antescofo m'a ainsi soufflé à l'oreille le concept de réactivité : penser le temps comme un ensemble de chaînes de réaction. Faust de son côté m'a inspiré pour la pureté de sa syntaxe fonctionnelle, et son expressivité sémantique. Cet attrait pour les langages fonctionnels combiné à un essouflement face à certaines absurdités de la programmation objet ont fini par me convaincre. 

## L'impulsion 

Tout projet a besoin d'une deadline. Et c'est celle du 4 juin, concert live-coding au studio lumière du pôle pixel à Villeurbanne qui s'est imposé à moi comme la première échéance du développement d'Idyl. 
Par contrainte de temps, j'ai entrepris, pour la première fois, de sous-traiter l'écriture du code à *Claude*. Premier projet vibe-codé. 
Après quelques semaines de travail, le langage était fonctionnel (il fonctionnait, en plus d'être fonctionnel). 

## Le langage 

L'une des originalités du langage, est l'imbrication d'une notion temporelle dans un langage purement fonctionnel. Par essence, toute fonction peut être temporelle, si elle prend un argument `dt` (delta time).

```idyl
sum(a, b) = a + b // fonction non-temporelle
noise(minvalue, maxvalue, dt=50ms) // noise is temporal, defaults to update every 50ms if not explicitel

// Le process est un bloc d'exécution/instanciation. Ici équivalent à une fonction "main" (en C)
process: {
    s1 = sum(1, 2) // Vaut 3, non-temporel 
    n1 = noise(0, 1) // Change toutes les 50ms 
    n2 = noise(0, 1, 100ms) // Change toutes les 100ms 
    s2 = sum(n1, n2) // Change toutes les 50ms (en réaction à n1 et n2)
}
```

L'autre concept important, est celui des `flow` : un système de structuration des données flexible, permettant de décrire des séquences en parallèle les unes des autres : 
```idyl
flow melody = {
    rhythm: [!, _, _, !, !, _, !, !, _, _, _] // où ! est un trigger, _ l'absence de trigger
    degree: [0, 2, 4, 7, -1, 5]
    base: [c3, d4]
}

process: {
    m = sync(1b) // métronome synchronisé à l'horloge principale

    // instancie le flow melody, et avance à chaque trigger de m
    // A chaque fois qu'un membre arrive "out of bounds", il est wrappé automatiquement à son premier index
    mel = melody[m] 


    // Possibilité d'instancier uniquement un membre 
    r = melody.rhythm[m] 

    // Aussi, possibilité d'indexer un flow avec un nombre flottant entre 0 et 1 
    // Dans ce cas, l'indexation de chaque membre est faite proportionnellement à la taille de ce dernier 
    fl = melody[phasor(1b)] // lorsque le phasor atteint 0.5, chaque élément est indexé à son élément central 
}
```

Ce ne sont que quelques unes des fonctionnalités d'Idyl, qui serait bien long à décrire intégralement ici. 
On peut aussi citer la possibilité de créer des blocs réactifs `on(trig): {/* do something */}`, d'appliquer un délais à des fonctions `'(signal, retard)`, et même de déférer des blocs à plus tard `@(100ms) {/* do something */}`. 


## Librairies et modules 

### Librairies 

En plus de fonctions intégrées au noyau, Idyl est fourni avec une librairie standard écrites dans le langage lui-même, contenant la plupart des fonctions temporelles standard dont un utilisateur pourrait avoir besoin : oscillateurs, générateurs de rythme, downclocker (...). Une librairie de musique est également disponible, proposant quelques constantes utiles (comme les notes de musique `c4` etc), ainsi que des fonctionnalités de gestion d'échelles de hauteurs. 

### Modules 

Les modules sont les portes vers le monde extérieur. Il s'agit de librairies C++ compilées, chargées dynamiquement par l'interpréteur Idyl. Les modules standards permettent déjà d'imaginer des architectures flexibles pour la plupart des cas d'usage : 
- OSC 
- MIDI 
- Csound 
- Serial 

## État du projet 

Idyl, à l'heure actuelle, est encore en version alpha, le projet étant toujours potentiellement sujet à d'importants changements. 
Cela étant dit, j'ai été heureux de lui offrir un baptême du feu en concert, avec le module Csound en guise de moteur audio.
