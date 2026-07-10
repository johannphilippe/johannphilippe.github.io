---
title: "Hypercurve"
date: 2022-06-05
summary: "La forge des courbes hybrides pour l'informatique musicale"
github: "https://github.com/johannphilippe/hypercurve"
cover: "polynomial.png"
cover_credit: "Johann Philippe"
gallery:
links:
  - name: "Documentation"
    url: "https://github.com/johannphilippe/hypercurve/tree/main/doc"
  - name: "Article"
    url: "https://csound.com/icsc2022/proceedings/HYPERCURVE%20-%20An%20hybrid%20curve%20forge%20in%20Csound.pdf"
---

*Hypercurve* est une librairie, développée en C++, permettant la composition de courbes par morceaux issues de différents algorithmes. 
Pensée comme un mécanisme de création d'enveloppes temporelles flexible, ainsi que comme un catalogue de courbes mathématiques applicables à l'audio, cette librairie expose ses fonctions à travers des modules pour *Csound*, *Faust*, et *Lua*, ainsi qu'une API *C++*. 

Ce système est inspiré des routines *GEN* de *Csound*. Toutefois, Csound ne permet pas directement de composer des courbes où les segments sont créés à partir de différents algorithmes. Par exemple, la routine *GEN08* de *Csound* permet de créer une courbe générées par un algorithme spline cubique. 
Hypercurve, en plus d'apporter de nombreuses fonctions de courbures supplémentaires, propose par défaut un mécanisme permettant pour chaque segment de spécifier la fonction de calcul des échantillons. 

Les courbes sont crées et stockées dans des tables à l'initialisation ou à l'instanciation. Elles peuvent ensuite être lues immédiatement, où à l'aide d'un outil d'interpolation permettant une meilleure définition entre les échantillons. 


Exemple C++ : 
```cpp
auto crv = hypercurve::hypercurve( 2048, 0, {
    hypercurve::segment(0.5, 1, hypercurve::share(hypercurve::cubic_curve())),
    hypercurve::segment(0.5, 0, hypercurve::share(hypercurve::diocles_curve(1)))
});
```

Exemple Csound : 
```c
gidiocles = hc_gen(0, 2048, 0, 
              hc_segment(1/2, 1, hc_diocles_curve(0.51)), 
              hc_segment(1/2, 0, hc_diocles_curve(1.5)))
```

Le projet a été imaginé avec Jacopo Greco d'Alceo, qui l'utilise quotidiennement pour le live-coding avec [Cordelia](https://github.com/jacopogrecodalceo/CORDELIA-REBORN)