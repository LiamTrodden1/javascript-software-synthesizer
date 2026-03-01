// Mock tone.ts
jest.mock('tone', () => ({
  log: jest.fn(),
  now: jest.fn(() => 0),
  Transport: { stop: jest.fn(), start: jest.fn() },
  getContext: jest.fn(() => ({ resume: jest.fn() }))
}));

// Mock NexusUI2
jest.mock('nexusui2', () => {
  return {
    __esModule: true,
    default: {
      Number: jest.fn().mockImplementation(() => ({ on: jest.fn(), destroy: jest.fn(), link: jest.fn() })),
      Dial: jest.fn().mockImplementation(() => ({ on: jest.fn(), destroy: jest.fn() })),
      Toggle: jest.fn().mockImplementation(() => ({ on: jest.fn(), state: false })),
      Slider: jest.fn().mockImplementation(() => ({ on: jest.fn(), value: 0 })),
      Multislider: jest.fn().mockImplementation(() => ({ on: jest.fn(), values: [] })),
      RadioButton: jest.fn().mockImplementation(() => ({ on: jest.fn(), active: 0 })),
      Select: jest.fn().mockImplementation(() => ({ on: jest.fn(), value: '' })),
    }
  };
});

import createSynthesizer from '../src/elements/panels/synthesizer/synthesizer.ts';
import createModulator from '../src/elements/panels/modulation/modulation.ts';
import createEffects from '../src/elements/panels/effects/effects.ts';


describe('All info prompt tests', () => {
  let container: HTMLDivElement;

  // create new DOM for each test
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  // clear for next test
  afterEach(() => {
    document.body.innerHTML = '';
  });

  const findPopoutByKeyword = (keyword: string) => {
    const popouts = Array.from(container.querySelectorAll('.info-popout'));
    return popouts.find(p => p.textContent?.toLowerCase().includes(keyword.toLowerCase()));
  };

  // synthesizer section prompts tests
  describe('Synthesizer Section', () => {
    beforeEach(() => { container.appendChild(createSynthesizer()); });

    it('dials info prompt', () => {
      expect(findPopoutByKeyword('harmonicity')).toBeTruthy();
    });

    it('amplitude envelope prompt', () => {
      expect(findPopoutByKeyword('sustain')).toBeTruthy();
    });

    it('Oscillator info prompt', () => {
      expect(findPopoutByKeyword('sawtooth')).toBeTruthy();
    });
  });

  // modulation section info prompts
  describe('Modulation Section', () => {
    beforeEach(() => { 
      container.appendChild(createModulator()); 
    });

    it('modualtion type info prompt', () => {
      expect(findPopoutByKeyword('sine')).toBeTruthy();
    });

    it('partial count info prompt', () => {
      expect(findPopoutByKeyword('harmonics')).toBeTruthy();
    });

    it('partials info prompt', () => {
      expect(findPopoutByKeyword('individual')).toBeTruthy();
    });

    it('modulation envelope info prompt', () => {
      expect(findPopoutByKeyword('step: sudden')).toBeTruthy();
    });
  });

  // effects section info prompts
  describe('Effects Section', () => {
    it('check all effects ahve an info prompt', () => {
      container.appendChild(createEffects());
      
      const infoButtons = container.querySelectorAll('.info-btn, .info-icon');
      expect(infoButtons.length).toBeGreaterThan(5);

      infoButtons.forEach(btn => {
        expect(btn.textContent).toBe('ⓘ');
        const parent = btn.parentElement;
        expect(parent?.querySelector('.info-popout')).toBeTruthy();
      });
    });
  });
});