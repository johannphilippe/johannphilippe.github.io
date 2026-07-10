---
title: "Faust JSFX"
date: 2024-04-17
summary: "Faust backend to support Reaper's JSFX plugins"
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

Within the framework of the European project *Métamorphoses*, and in collaboration with GRAME, I contributed to the [Faust](https://faust.grame.fr/) project through the development of a new backend: JSFX. Faust backends correspond to the target programming languages into which the Faust compiler can generate code.
[JSFX](https://www.reaper.fm/sdk/js/js.php) is the dedicated audio signal processing description environment of the software [Reaper](https://www.reaper.fm/). It is based on a language designed by the DAW's developers: [EEL2](https://www.cockos.com/EEL2/).

The JSFX backend is therefore a code generator, making it possible to translate the Faust compiler's output into the JSFX language, and thus to rapidly create plugins for Reaper that are both textual and portable (no binaries). This portability, combined with the high level of abstraction provided by the Faust language, makes it possible, among other things, to address a central challenge in computer music: the capacity of programs to outlive the systems for which and with which they were designed. A small step perheaps, though a determined towards an important goal : sustainability and accessibility of tools in computer music.