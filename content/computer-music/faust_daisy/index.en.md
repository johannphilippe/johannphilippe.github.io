---
title: "Faust Daisy"
date: 2026-07-04
summary: "Improved faust2daisy tool to target Electrosmith Daisy boards"
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

[Electrosmith Daisy](https://daisy.audio/) boards are truly impressive in the world of microcontrollers designed for audio & music. And Faust has been targetting Daisy boards since 2021. 
However, at the autumn 2025, with GRAME research team, we acknowledged that *faust2daisy* tool was broken. I started investigation, while fixing bugs, and also found that the tool was designed to target platforms (like Daisy Pod, Patch etc) rather than boards themselves (Seed and PatchSM). This caused the tool to drastically limit the features of the boards when used with Faust. 
For example, the control ADC's and DAC's were not fully implemented : the only ones available were the ones that could be found on major platforms. 

We decided to change this, and switched the main target to boards. 
After a few weeks of development, the new *faust2daisy* tool targets boards : Daisy Seed and PatchSM. Both are somehow similar, if not for the voltage. Seed works with 3.3v, while PatchSM uses Eurorack voltage (powered with -12v/12v). 
Now, *faust2daisy* supports a complete set of different controls : 
- ADC & DAC (CV in & Out for PatchSM)
- GPIO & Gates (and software PWM for GPIO output)
- Hardware PWM output 
- Serial input/output to communicate controls with another board or a completely different microcontroller
- MIDI input 

It also adds soundfile support, conform to Faust specification.

Also, the new model has been developped keeping somme embedded constraints in mind. It provides an almost constant compile time awareness of memory usage, and allows to choose where the program is stored (Flash or QSPI) & where it is executed (Flash, SRAM, QSPI). 
Finally, it gives an option to move some buffers to SRAM when they exceed a specified size threshold. 

Finally, *faust2daisy* seems complete : it unleashes the full power of Daisy boards with the expressivity and audio quality of Faust. 