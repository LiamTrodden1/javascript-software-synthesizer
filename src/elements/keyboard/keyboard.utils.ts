/*
 * Key Mapper
 * Part of the JSS-01 | JavaScript Software Synthesizer project
 * Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 * GNU Affero General Public License v3.0
 *
 * The Key Mapper function takes computer key letters as input
 * and maps them to the on-screen keyboard keys by returning
 * the index number of the respective on-screen keyboard. It
 * works well with the octave switch function as it is build
 * around a "base" variable to refer to the keys, which can
 * then be modified accordingly.
 *
 */

// @todo => class Controller
const minValue = 0;
const maxValue = 84;

const octave = 12;

export const constants = {
  octave,
  minBase: minValue + octave,
  maxBase: maxValue - octave,
};

export function keyMapper(key: string, base: number) {
  const keyMap: { [key: string]: number } = {
    KeyQ: 0,
    Digit2: 1,
    KeyW: 2,
    Digit3: 3,
    KeyE: 4,
    Digit4: 5,
    KeyR: 6,
    Digit5: 7,
    KeyT: 8,
    Digit6: 9,
    KeyY: 10,
    Digit7: 11,
    KeyU: 12,
    Digit8: 13,
    KeyI: 14,
    Digit9: 15,
    KeyO: 16,
    Digit0: 17,
    // Bottom row
    KeyZ: 12,
    KeyS: 13,
    KeyX: 14,
    KeyD: 15,
    KeyC: 16,
    KeyF: 17,
    KeyV: 18,
    KeyG: 19,
    KeyB: 20,
    KeyH: 21,
    KeyN: 22,
    KeyJ: 23, 
    KeyM: 24,     
  };

  if (!(key in keyMap)) return null;

  const value = base + keyMap[key];

  if (value < minValue || value > maxValue) return null;

  return value;
}
