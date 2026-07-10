---
title: "Idyl"
date: 2026-06-03
summary: "A language to program time"
github: "https://github.com/johannphilippe/idyl"
cover: ""
cover_credit: ""
gallery:
links:
  - name: "Idyl Documentation"
    url: "https://johannphilippe.github.io/idyl"
---

## The Origin

For a while now, I have been thinking about a **time programming** language.
Naturally, this reflection is tied to a set of needs. Starting with the need for a means of expression that truly fits me for designing, writing, and performing music. But it was also out of a desire for exhaustiveness that I wanted to make it a tool capable of ensuring the precise sequencing of any temporal system. This is why Idyl is not an audio language: it is a temporal language.

During this journey, I encountered and discovered many other languages from which I borrowed concepts and ideas. The Antescofo project whispered the concept of reactivity into my ear: thinking of time as a set of reaction chains. Faust, on the other hand, inspired me with the purity of its functional syntax and its semantic expressiveness. This attraction to functional languages, combined with a growing exhaustion from certain absurdities of object-oriented programming, finally convinced me.

## The Impulse

Every project needs a deadline. And it was the one on June 4th—a live-coding concert at the Studio Lumière of the Pôle Pixel in Villeurbanne—that imposed itself as the first milestone for Idyl's development.
Due to time constraints, I undertook, for the very first time, to outsource the code writing to *Claude*. My first vibe-coded project.
After a few weeks of work, the language was functional (it worked, in addition to being functional).

## The Language

One of the unique features of the language is the embedding of a temporal notion within a purely functional paradigm. By nature, any function can be temporal if it takes a `dt` (delta time) argument.

```idyl
sum(a, b) = a + b // non-temporal function
noise(minvalue, maxvalue, dt=50ms) // noise is temporal, defaults to update every 50ms if not explicitel

// The process is an execution/instantiation block. Here equivalent to a "main" function (in C)
process: {
    s1 = sum(1, 2) // Equals 3, non-temporal 
    n1 = noise(0, 1) // Changes every 50ms 
    n2 = noise(0, 1, 100ms) // Changes every 100ms 
    s2 = sum(n1, n2) // Changes every 50ms (reacting to n1 and n2)
}
```

The other important concept is that of `flow`: a flexible data structuring system that allows the description of sequences running in parallel with one another:

```idyl
flow melody = {
    rhythm: [!, _, _, !, !, _, !, !, _, _, _] // where ! is a trigger, _ is the absence of a trigger
    degree: [0, 2, 4, 7, -1, 5]
    base: [c3, d4]
}

process: {
    m = sync(1b) // metronome synchronized to the main clock

    // instantiates the melody flow, and advances at each trigger of m
    // Every time a member goes "out of bounds", it automatically wraps around to its first index
    mel = melody[m] 


    // Possibility to instantiate a single member 
    r = melody.rhythm[m] 

    // Also, possibility to index a flow with a float number between 0 and 1 
    // In this case, the indexing of each member is done proportionally to its size 
    fl = melody[phasor(1b)] // when the phasor reaches 0.5, each element is indexed at its central element
}

```

These are only a few of Idyl's features, which would be quite long to describe fully here.
We can also mention the possibility of creating reactive blocks `on(trig): {/* do something */}`, applying a delay to functions `'(signal, delay)`, and even deferring blocks to later `@(100ms) {/* do something */}`.

## Libraries and Modules

### Libraries

In addition to core-integrated functions, Idyl comes with a standard library written in the language itself, containing most of the standard temporal functions a user might need: oscillators, rhythm generators, downclockers (...). A music library is also available, offering useful constants (like music notes `c4` etc.), as well as scale management features.

### Modules

Modules are the gateways to the outside world. They are compiled C++ libraries dynamically loaded by the Idyl interpreter. The standard modules already allow for designing flexible architectures for most use cases:

* OSC
* MIDI
* Csound
* Serial

## Project Status

At the moment, Idyl is still in alpha version, as the project remains potentially subject to major changes.
That being said, I was happy to give it a baptism by fire in concert, using the Csound module as the audio engine.