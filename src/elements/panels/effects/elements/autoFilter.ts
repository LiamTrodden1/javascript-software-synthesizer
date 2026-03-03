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

import { type AutoFilterOptions } from 'tone';
import Nexus from 'nexusui2';

import { EffectController } from '../../../../audio/effect.controller.js';

import NumberDialComponent, {
  type CreateDialOptions,
} from '../../../../components/numberDialComponent.js';

import { assertNotNull } from '../../../../utils/utils.js';
import {
  createEffectElements,
  defaultToggleOptions,
  type BaseEffectUI,
  type EffectUI,
} from '../effects.utils.js';

type AutoFilterUIOptions = {
  [K in keyof Pick<
    AutoFilterOptions,
    'depth' | 'frequency' | 'octaves'
  >]: CreateDialOptions;
};

type AutoFilterUIKeys = {
  [K in keyof AutoFilterUIOptions]: string;
};

type AutoFilterUI = EffectUI<AutoFilterUIOptions>;

const id = 'auto-filter';

// define storage key
const STORAGE_KEY = `SaveConfig${id}`;
// get saved settings
function getSavedSettings(): Partial<AutoFilterOptions> {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : {};
}
// save settings
function saveSettings(settings: Partial<AutoFilterOptions>) {
  const current = getSavedSettings();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...settings }));
}
// get the saved settings
const savedSettings = getSavedSettings();

const ids = <AutoFilterUIKeys>{
  depth: `${id}-depth`,
  frequency: `${id}-frequency`,
  octaves: `${id}-octaves`,
};

const labels = <AutoFilterUIKeys>{
  depth: 'Depth',
  frequency: 'Frequency',
  octaves: 'Octaves',
};

const options = <AutoFilterUIOptions>{
  depth: {
    min: 0,
    max: 1,
    step: 0,
    value: savedSettings.depth ?? 1,
  },
  frequency: {
    min: 0,
    max: 1000,
    step: 0,
    value: savedSettings.frequency ?? 10,
  },
  octaves: {
    min: -10,
    max: 10,
    step: 0,
    value: savedSettings.octaves ?? 2.6,
  },
};

const interfaces = <BaseEffectUI<AutoFilterUI>>{
  toggle: null,
  depth: null,
  frequency: null,
  octaves: null,
};

function render() {
  const [wrapper, toggleWrapper, contentWrapper] = createEffectElements(
    id,
    'Auto Filter',
    'Sweeping filter to cut of high frequencies giving a "wah" sounding effect',
    `Frequency: The speed of the wah sound
     Depth: Intensity to which the auto filter will go between octaves
     Octaves: How many octaves above the effect will go`
    
  );

  interfaces.toggle = new Nexus.Toggle(toggleWrapper, defaultToggleOptions);

  interfaces.depth = NumberDialComponent(
    contentWrapper,
    ids.depth,
    labels.depth,
    options.depth
  );
  interfaces.frequency = NumberDialComponent(
    contentWrapper,
    ids.frequency,
    labels.frequency,
    options.frequency
  );
  interfaces.octaves = NumberDialComponent(
    contentWrapper,
    ids.octaves,
    labels.octaves,
    options.octaves
  );

  return wrapper;
}

async function create() {
  const { AutoFilter } = await import('../../../../audio/tone.js');

  assertNotNull(interfaces.toggle);
  assertNotNull(interfaces.depth);
  assertNotNull(interfaces.frequency);
  assertNotNull(interfaces.octaves);

  const effect = new EffectController(
    new AutoFilter({
      depth: interfaces.depth.value,
      frequency: interfaces.frequency.value,
      octaves: interfaces.octaves.value,
    })
  );

  // @todo
  // console.log(effect.node.name, effect.node.get());
  // name === 'Chorus'
  // get() === Object {
  // 	baseFrequency: 200,
  // 	depth: 1,
  // 	filter: { Q: 1, rolloff: -12, type: 'lowpass' },
  // 	frequency: 10,
  // 	octaves: 2.6,
  // 	type: 'sine',
  // 	wet: 1,
  // };

  interfaces.toggle.on('change', (state) => {
    effect.active = state;
    effect.update();
  });

  Object.entries(<AutoFilterUI>interfaces).forEach(([key, item]) => {
    item.on('change', (value) => {
      saveSettings({ [key]: value });
      effect.node.set({
        [key]: value,
      });
    });
  });
}

export default {
  render,
  create,
};
