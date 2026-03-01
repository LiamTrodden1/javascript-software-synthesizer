/*
 * JSS-01 |JavaScript Software Synthesizer
 * Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 * GNU Affero General Public License v3.0
 *
 * ATTENTION! FREE SOFTWARE
 * This website is free software (free as in freedom).
 * If you use any part of this code, you must make your entire project's source code
 * publicly available under the same license. This applies whether you modify the code
 * or use it as it is in your own project. This ensures that all modifications and
 * derivative works remain free software, so that everyone can benefit.
 * If you are not willing to comply with these terms, you must refrain from using any part of this code.
 *
 * For full license terms and conditions, you can read the AGPL-3.0 here:
 * https://www.gnu.org/licenses/agpl-3.0.html
 */

import { ids, descriptions} from './sequencer.options';

// Helper to create the hover description div
const createDescription = (idKey: keyof typeof descriptions) => {
  const description = document.createElement('div');
  description.className = 'info-popout hover-description';
  description.textContent = descriptions[idKey] || '';
  return description;
};

const createInputWithHover = (idKey: keyof typeof ids, placeholder: string, value?: string) => {
  const container = document.createElement('div');
  container.className = 'sequencer-input-wrapper'; 

  const input = document.createElement('input');
  input.type = 'text';
  input.id = ids[idKey];
  input.placeholder = placeholder;
  if (value) input.value = value;

  container.append(input, createDescription(idKey as keyof typeof descriptions));

  return { container, input };
};

// New helper to wrap buttons with hover descriptions
const createButtonWithHover = (idKey: keyof typeof ids) => {
  const container = document.createElement('div');
  container.className = 'sequencer-input-wrapper';

  const button = document.createElement('button');
  button.type = 'button';
  button.id = ids[idKey];

  container.append(button, createDescription(idKey as keyof typeof descriptions));

  return { container, button };
};

// Create the groups (Inputs)
const rateGroup = createInputWithHover('rate', 'Rate', '1');
const subdivisionGroup = createInputWithHover('subdivision', 'Value', '16n');
const sequenceGroup = createInputWithHover('sequence', 'Enter sequence');

// Create the groups (Buttons)
const setGroup = createButtonWithHover('set');
const playGroup = createButtonWithHover('play');
const stopGroup = createButtonWithHover('stop');

export const interfaces = {
  rate: rateGroup.input,
  subdivision: subdivisionGroup.input,
  sequence: sequenceGroup.input,
  set: setGroup.button,
  play: playGroup.button,
  stop: stopGroup.button,
};

// List of elements to append to the fragment
// We MUST append the .container so the hidden description is included in the DOM
const uiElements = [
  rateGroup.container,
  subdivisionGroup.container,
  sequenceGroup.container,
  setGroup.container,
  playGroup.container,
  stopGroup.container
];

interfaces.set.innerHTML = '<img src="./assets/icons/add.svg" alt="" />';
interfaces.play.innerHTML = '<img src="./assets/icons/play.svg" alt="" />';
interfaces.stop.innerHTML = '<img src="./assets/icons/stop.svg" alt="" />';

export default function createSequencer() {
  const fragment = new DocumentFragment();

  fragment.append(...uiElements);

  return fragment;
}