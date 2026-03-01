/*
 *  JSS-01 |JavaScript Software Synthesizer
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 *
 *  ATTENTION! FREE SOFTWARE
 *  This website is free software (free as in freedom).
 *  If you use any part of this code, you must make your entire project's source code
 *  publicly available under the same license. This applies whether you modify the code
 *  or use it as it is in your own project. This ensures that all modifications and
 *  derivative works remain free software, so that everyone can benefit.
 *  If you are not willing to comply with these terms, you must refrain from using any part of this code.
 *
 *  For full license terms and conditions, you can read the AGPL-3.0 here:
 *  https://www.gnu.org/licenses/agpl-3.0.html
 */

export type SequencerUI = {
  rate: HTMLInputElement;
  subdivision: HTMLInputElement;
  sequence: HTMLInputElement;
  set: HTMLButtonElement;
  play: HTMLButtonElement;
  stop: HTMLButtonElement;
};

export type SequencerUIKeys = {
  [K in keyof SequencerUI]: string;
};

export const ids = <SequencerUIKeys>{
  rate: 'seq-rate',
  subdivision: 'seq-subdivision',
  sequence: 'seq-notes',
  set: 'seq-set',
  play: 'seq-play',
  stop: 'seq-stop',
};

// descriptions for playing sequencer
export const descriptions = {
  rate: "Playback Rate: Multiplier for sequence speed (1 = normal, 2 = double, 0.5 = half speed).",
  subdivision: "Subdivision: Rhythmic value for each step (e.g. 8th notes, 16th notes..).",
  sequence: "Notes: Enter your list of notes (e.g. E4 G5 C3 A2) using square brackets puts the note sin the smae subdivision (e.g. C5 E5 [G5 F5])",
  set: "Add new sequence",
  play: "Start sequence",
  stop: "Stop sequence",
}