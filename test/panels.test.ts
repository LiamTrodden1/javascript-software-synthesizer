import createPanels from '../src/elements/panels/panels.ts';

// use '__esModule: true' to tell Jest this is a modern module with a default export
jest.mock('../src/elements/panels/synthesizer/synthesizer.js', () => ({
  __esModule: true,
  default: jest.fn(() => document.createElement('div'))
}));

jest.mock('../src/elements/panels/modulation/modulation.js', () => ({
  __esModule: true,
  default: jest.fn(() => document.createElement('div'))
}));

jest.mock('../src/elements/panels/effects/effects.js', () => ({
  __esModule: true,
  default: jest.fn(() => document.createElement('div'))
}));

// mock Nexus so it doesn't try to use Canvas in the test
jest.mock('nexusui2', () => ({
  __esModule: true,
  default: {
    colors: { accent: '' }
  }
}));

describe('Panels Section Integration', () => {
  let container: HTMLElement;

  beforeEach(() => {
    // Container to run tests
    container = document.createElement('section');
    createPanels(container);
  });

  it('apply description to the synthesizer panel', () => {
    const panel = container.querySelector('#synthesizer');
    const label = panel?.querySelector('label');
    
    expect(label?.title).toBe("Main Sound Settings: Volume Adjustments, Amplitude Envelope, Oscillator Type and Partials");
  });

  it('apply description to the modulation panel', () => {
    const panel = container.querySelector('#modulation');
    const label = panel?.querySelector('label');
    
    expect(label?.title).toBe("Adjust the sound wave: Modulation Type and Partials, Modulation Envelope");
  });

  it('apply description to the effects panel', () => {
    const panel = container.querySelector('#effects');
    const label = panel?.querySelector('label');
    
    expect(label?.title).toBe("Apply Audio Effects");
  });
});