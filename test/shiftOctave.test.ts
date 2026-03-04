import { jest } from '@jest/globals';
import type { MockedFunction } from 'jest-mock';

// mock synth keyboard
const mockToggleIndex = jest.fn();
const mockKeyboard = {
  keys: Array.from({ length: 100 }, () => ({ _state: { state: false } })),
  toggleIndex: mockToggleIndex,
};

// mock nexusui2
jest.mock('nexusui2', () => {
  return {
    __esModule: true,
    default: {
      Piano: jest.fn().mockImplementation(() => mockKeyboard)
    },
    NexusPiano: jest.fn()
  };
});

// mock keyboard utils
jest.mock('../src/elements/keyboard/keyboard.utils.js', () => ({
  constants: {
    minBase: 0,
    maxBase: 120,
    octave: 12
  },
  keyMapper: jest.fn()
}));

import * as KeyboardModule from '../src/elements/keyboard/keyboard.js';
import { keyMapper } from '../src/elements/keyboard/keyboard.utils.js';

describe('Keyboard integration and reliability test', () => {
  let section: HTMLElement;
  let handlers: any;

  beforeEach(() => {
    handlers = KeyboardModule.handlers;
    
    if (!handlers) {
      throw new Error("Keyboard handlers not defined");
    }

    section = document.createElement('div');
    // initialise keyboard
    KeyboardModule.default(section); 
    
    jest.clearAllMocks();
    
    // reset mock keys
    mockKeyboard.keys.forEach(k => k._state.state = false);
    
    // mock the key pressed to the keyboard
    const mockedKeyMapper = keyMapper as MockedFunction<(code: string, base: number) => number | null>;
    
    mockedKeyMapper.mockImplementation((code: string) => {
      return code === 'KeyA' ? 60 : null;
    });
  });

  describe('prevent multiple calls', () => {
    it('toggle index called once per key trigger', () => {
      const event = { code: 'KeyA' } as KeyboardEvent;

      handlers.keydown(event);
      mockKeyboard.keys[60]._state.state = true; 

      handlers.keydown(event);
      handlers.keydown(event);

      expect(mockToggleIndex).toHaveBeenCalledTimes(1);
      expect(mockToggleIndex).toHaveBeenCalledWith(60, true);
    });
  });

  describe('octave shift reliability', () => {
    it('clear notes when pressing z', () => {
      // start playing a note
      handlers.keydown({ code: 'KeyA' } as KeyboardEvent);
      mockKeyboard.keys[60]._state.state = true;

      // press octave down (KeyZ)
      handlers.keyup({ code: 'KeyZ' } as KeyboardEvent);

      // verify flush happened before base changed
      expect(mockToggleIndex).toHaveBeenCalledWith(60, false);
    });

    it('clear notes when pressing x', () => {
      handlers.keydown({ code: 'KeyA' } as KeyboardEvent);
      mockKeyboard.keys[60]._state.state = true;

      handlers.keyup({ code: 'KeyX' } as KeyboardEvent);

      expect(mockToggleIndex).toHaveBeenCalledWith(60, false);
    });
  });

  describe('standard playing', () => {
    it('release the correct note on keyup', () => {
      // trigger keydown first to track the key
      handlers.keydown({ code: 'KeyA' } as KeyboardEvent);
      mockKeyboard.keys[60]._state.state = true;

      // trigger keyup
      handlers.keyup({ code: 'KeyA' } as KeyboardEvent);

      expect(mockToggleIndex).toHaveBeenLastCalledWith(60, false);
    });
  });
});