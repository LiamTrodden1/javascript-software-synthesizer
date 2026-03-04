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

import { type PianoOptions } from 'nexusui2/dist/types/interfaces/piano';
import Nexus, { NexusPiano } from 'nexusui2';

import { constants, keyMapper } from './keyboard.utils.js';

// @todo make keyboard responsive
const options = {
  size: [1080, 90],
  mode: 'button',
  lowNote: 24,
  highNote: 108,
} as PianoOptions;

let keyboard: NexusPiano;

export const getInterface = () => keyboard;

// Turn off all active notes when shifting octave
const flushNotes = () => {
  pressedKeys.clear();
  if (keyboard && keyboard.keys) {
    keyboard.keys.forEach((key, index) => {
      if (key._state.state) {
        keyboard.toggleIndex(index, false);
      }
    });
  }
};

export default function createKeyboard(section: HTMLElement) {
  keyboard = new Nexus.Piano(section, options);

  // Makes keyboard playble both with right and left click - prevents right click context menu
  section.addEventListener(
    'contextmenu',
    (event) => {
      event.preventDefault();
    },
    false
  );
}

// @todo
// @bug differentiate buttons
// when user presses a mouse button
// - while pressing another mouse buttton
// - while keyboard keys are pressed
// then triggerRelease is not called

// ---------------------------------------------------------------------
// Computer Keyboard Playbility Implementation
// ---------------------------------------------------------------------

// default C3
// Range: C1 to C8
let base = 24;
const pressedKeys = new Set<string>();

// consider keyboard offset
// console.log(Midi(base + options.lowNote).toNote());

export const handlers = <KeyboardHandlers>{
  keydown: (event: KeyboardEvent) => {
    const keyIndex = keyMapper(event.code, base);

    if (keyIndex === null) return;

    const isPressed = keyboard.keys[keyIndex]._state.state;

    if (!isPressed) {
      pressedKeys.add(event.code);
      keyboard.toggleIndex(keyIndex, true);
    }
  },
  keyup: (event: KeyboardEvent) => {
    // Handle octave shifts: Flush notes first so none get stuck in the old octave
    if (event.code === 'KeyZ' || event.code === 'KeyX') {
      flushNotes();

      if (event.code === 'KeyZ' && base >= constants.minBase) {
        base -= constants.octave;
      } else if (event.code === 'KeyX' && base < constants.maxBase) {
        base += constants.octave;
      }
      return;
    }

    // Normal key release logic
    pressedKeys.delete(event.code);
    const keyIndex = keyMapper(event.code, base);

    if (keyIndex === null) return;

    const isPressed = keyboard.keys[keyIndex]._state.state;

    if (isPressed) {
      keyboard.toggleIndex(keyIndex, false);
    }
  },
};

export type KeyboardHandlerKeys = Pick<DocumentEventMap, 'keydown' | 'keyup'> &
  string;

type KeyboardHandlers = {
  [K in KeyboardHandlerKeys]: EventListener;
};
