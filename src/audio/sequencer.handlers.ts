/*
 * JSS-01 |JavaScript Software Synthesizer
 * Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 * GNU Affero General Public License v3.0
 */

import audio from './audio';

import { interfaces } from '../elements/extras/sequencer/sequencer.js';

// make a string list input for sequence
type SequenceNote = string | string[];

const presets: Record<string, SequenceNote[]> = {
  default: ['C4', ['E4', 'D4', 'E4'], 'G4', ['A4', 'G4']],
  funkyTown: ['C4', 'C4', 'Bb3', 'C4', 'G3', 'G3', 'C4', 'F4', 'E4', 'C4'],
  iFeelLove: ['C2', 'C3', 'C2', 'C3', 'G1', 'G2', 'Bb1', 'Bb2'],
};

const subdivisions = [
  '1m',
  '1n',
  '1n.',
  '2n',
  '2n.',
  '2t', 
  '4n', 
  '4n.', 
  '4t', 
  '8n', 
  '8n.', 
  '8t', 
  '16n', 
  '16n.', 
  '16t', 
  '32n', 
  '32n.', 
  '32t',
];

export default async function createSequencerHandlers() {
  const { start, Sequence, Transport } = await import('./tone.js');
  const synth = audio.getSynth();

  let duration = interfaces.subdivision.value;

  // @todo set presets.default as placeholder
  const sequence = new Sequence((time, note) => {
    synth.triggerAttackRelease(note, duration, time);
  }, presets.default).start(0);

  // @todo use bpm range slider
  interfaces.rate.addEventListener('change', () => {
    const rate = Math.max(0, Math.min(parseFloat(interfaces.rate.value), 10));
    interfaces.rate.value = `${rate}`;
    sequence.set({ playbackRate: rate });
  });

  interfaces.subdivision.addEventListener('change', () => {
    const { value } = interfaces.subdivision;
    if (!subdivisions.includes(value)) {
      interfaces.subdivision.value = subdivisions[6];
    }
    duration = interfaces.subdivision.value;
  });

  // Add sequence event
  interfaces.set.addEventListener('click', () => {
    // get input and remove whitespace
    const rawValue = interfaces.sequence.value.trim();
    let notes: SequenceNote[];

    // make all inputs lowercase to reduce case sensitivity
    const lowerValue = rawValue.toLowerCase();

    // check for premade sequence
    if (lowerValue === 'funky town') {
      notes = presets.funkyTown;
    } else if (lowerValue === 'i feel love') {
      notes = presets.iFeelLove;
    } else if (lowerValue === 'default') {
      notes = presets.default;
    } else {
          // RegEx
          // Wrap notes in "" """ and convert spaces into "","" for JSON
          const jsonFriendly = rawValue
            .replace(/([A-Ga-g][#b]?\d)/g, '"$1"') 
            .replace(/\s+/g, ',');

          // try to parse input else error 
          try {
            notes = JSON.parse(`[${jsonFriendly}]`);
          }
          catch (e) {
            console.error("Invalid sequence");
            return; 
          }
        }

    if (notes && notes.length > 0) {
      sequence.events = notes;
      console.log("Sequence updated:", notes);
    }
  });

  interfaces.play.addEventListener('click', async () => {
    await start();
    Transport.start();
  });

  interfaces.stop.addEventListener('click', () => {
    Transport.stop();
  });
}