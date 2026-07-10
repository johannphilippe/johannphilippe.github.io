---
title: "Hypercurve"
date: 2022-06-05
summary: "Hybrid curve forge for computer music"
github: "https://github.com/johannphilippe/hypercurve"
cover: "polynomial.png"
cover_credit: "Johann Philippe"
gallery:
links:
  - name: "Documentation"
    url: "https://github.com/johannphilippe/hypercurve/tree/main/doc"
  - name: "Paper"
    url: "https://csound.com/icsc2022/proceedings/HYPERCURVE%20-%20An%20hybrid%20curve%20forge%20in%20Csound.pdf"
---

*Hypercurve* is a C++ library designed for composing piecewise curves using various algorithms.
Conceived as a flexible mechanism for creating temporal envelopes, as well as a catalog of mathematical curves applicable to audio, this library exposes its functions through modules for *Csound*, *Faust*, and *Lua*, as well as a *C++* API.

This system is inspired by Csound's *GEN* routines. However, Csound does not inherently allow the composition of curves where segments are created from different algorithms. For example, Csound's *GEN08* routine generates a curve using a cubic spline algorithm.
In addition to providing numerous supplementary curvature functions, Hypercurve natively offers a mechanism allowing the user to specify the sample calculation function for each individual segment.

The curves are created and stored in tables upon initialization or instantiation. They can then be read immediately, or accessed via an interpolation tool that provides better definition between samples.

C++ Example:
```cpp

auto crv = hypercurve::hypercurve( 2048, 0, {
    hypercurve::segment(0.5, 1, hypercurve::share(hypercurve::cubic_curve())),
    hypercurve::segment(0.5, 0, hypercurve::share(hypercurve::diocles_curve(1)))
});
```

Csound Example:
```c
gidiocles = hc_gen(0, 2048, 0, 
              hc_segment(1/2, 1, hc_diocles_curve(0.51)), 
              hc_segment(1/2, 0, hc_diocles_curve(1.5)))
```

The project was envisioned alongside Jacopo Greco d'Alceo, who uses it daily for live-coding with [Cordelia](https://github.com/jacopogrecodalceo/CORDELIA-REBORN)