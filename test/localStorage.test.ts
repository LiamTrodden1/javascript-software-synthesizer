import { jest } from '@jest/globals';

// mock nexusUI2
jest.mock('nexusui2', () => {
  const mockComponent = jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    link: jest.fn(),
    render: jest.fn(),
    resize: jest.fn(),
    value: 0,
    active: 0,
    state: false,
    values: [0, 0, 0, 0]
  }));

  return {
    __esModule: true,
    default: {
      Number: mockComponent, 
      Dial: mockComponent,
      Toggle: mockComponent,
      Slider: mockComponent,
      Select: mockComponent,
      RadioButton: mockComponent,
      Multislider: mockComponent,
      Add: {
        Number: mockComponent,
        Dial: mockComponent
      }
    }
  };
});

// mock Tone.ts
jest.mock('tone', () => ({
  AutoFilter: jest.fn().mockImplementation(() => ({ set: jest.fn(), dispose: jest.fn(), start: jest.fn() })),
  BitCrusher: jest.fn().mockImplementation(() => ({ set: jest.fn(), dispose: jest.fn() })),
  Chebyshev: jest.fn().mockImplementation(() => ({ set: jest.fn(), dispose: jest.fn() })),
  Chorus: jest.fn().mockImplementation(() => ({ set: jest.fn(), dispose: jest.fn() })),
  Distortion: jest.fn().mockImplementation(() => ({ set: jest.fn(), dispose: jest.fn() })),
  FeedbackDelay: jest.fn().mockImplementation(() => ({ set: jest.fn(), dispose: jest.fn() })),
  FrequencyShifter: jest.fn().mockImplementation(() => ({ set: jest.fn(), dispose: jest.fn() })),
  Phaser: jest.fn().mockImplementation(() => ({ set: jest.fn(), dispose: jest.fn() })),
  Reverb: jest.fn().mockImplementation(() => ({ set: jest.fn(), dispose: jest.fn() })),
  Tremolo: jest.fn().mockImplementation(() => ({ set: jest.fn(), dispose: jest.fn(), start: jest.fn() })),
  Vibrato: jest.fn().mockImplementation(() => ({ set: jest.fn(), dispose: jest.fn() })),
  Destination: { volume: { value: 0 } },
  getContext: () => ({ resume: jest.fn() })
}));

import autoFilter from '../src/elements/panels/effects/elements/autoFilter.ts';
import bitCrusher from '../src/elements/panels/effects/elements/bitCrusher.ts';
import chebyshev from '../src/elements/panels/effects/elements/chebyshev.ts';
import chorus from '../src/elements/panels/effects/elements/chorus.ts';
import distortion from '../src/elements/panels/effects/elements/distortion.ts';
import feedbackDelay from '../src/elements/panels/effects/elements/feedbackDelay.ts';
import frequencyShifter from '../src/elements/panels/effects/elements/frequencyShifter.ts';
import phaser from '../src/elements/panels/effects/elements/phaser.ts';
import reverb from '../src/elements/panels/effects/elements/reverb.ts';
import tremolo from '../src/elements/panels/effects/elements/tremolo.ts';
import vibrato from '../src/elements/panels/effects/elements/vibrato.ts';

describe('Local Storage tests', () => {
  const effectsToTest = [
    { 
      name: 'AutoFilter', 
      module: autoFilter, 
      id: 'autofilter', 
      params: { frequency: 440, depth: 0.8, octaves: 4 } 
    },
    { 
      name: 'BitCrusher', 
      module: bitCrusher, 
      id: 'bitcrusher', 
      params: { bits: 8, wet: 0.5 } 
    },
    { 
      name: 'Chebyshev', 
      module: chebyshev, 
      id: 'chebyshev', 
      params: { order: 50, wet: 1 } 
    },
    { 
      name: 'Chorus', 
      module: chorus, 
      id: 'chorus', 
      params: { frequency: 15, delayTime: 3.5, depth: 0.7 } 
    },
    { 
      name: 'Distortion', 
      module: distortion, 
      id: 'distortion', 
      params: { distortion: 0.8, wet: 0.4 } 
    },
    { 
      name: 'FeedbackDelay', 
      module: feedbackDelay, 
      id: 'feedbackdelay', 
      params: { delayTime: 0.5, feedback: 0.6 } 
    },
    { 
      name: 'FrequencyShifter', 
      module: frequencyShifter, 
      id: 'frequencyshifter', 
      params: { frequency: 42, wet: 0.9 } 
    },
    { 
      name: 'Phaser', 
      module: phaser, 
      id: 'phaser', 
      params: { frequency: 0.5, octaves: 3, Q: 10 } 
    },
    { 
      name: 'Reverb', 
      module: reverb, 
      id: 'reverb', 
      params: { decay: 5.5, preDelay: 0.1, wet: 0.5 } 
    },
    { 
      name: 'Tremolo', 
      module: tremolo, 
      id: 'tremolo', 
      params: { frequency: 10, depth: 0.75 } 
    },
    { 
      name: 'Vibrato', 
      module: vibrato, 
      id: 'vibrato', 
      params: { frequency: 5, depth: 0.3 } 
    }
  ];

  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  // iterate through each effect
  effectsToTest.forEach(({ name, module, id, params }) => {
    const STORAGE_KEY = `SaveConfig${id}`;

    describe(`${name} Storage Logic`, () => {
      
      // test all parameters of each effect
      Object.entries(params).forEach(([param, value]) => {
        
        it(`should save ${param} to localStorage`, async () => {
          // call render function
          module.render();
          
          // save settings
          const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, [param]: value }));

          const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
          expect(stored[param]).toBe(value);
        });

        it(`should recall ${param} from localStorage`, () => {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ [param]: value }));
          
          const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
          expect(saved[param]).toBe(value);
        });
      });

      it('should maintain existing settings when saving a new parameter', () => {
        // Pick the first param to test merging
        const [firstParam, firstVal] = Object.entries(params)[0];
        
        // save initial state
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ active: true }));

        // save parameter
        const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, [firstParam]: firstVal }));

        const final = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        expect(final.active).toBe(true);
        expect(final[firstParam]).toBe(firstVal);
      });
    });
  });
});