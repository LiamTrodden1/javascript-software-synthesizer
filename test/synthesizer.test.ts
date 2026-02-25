import createSynthesizer from '../src/elements/panels/synthesizer/synthesizer.js';
import CollapsibleComponent from '../src/components/collapsibleComponent.js';

// mock collapsible component
jest.mock('../src/components/collapsibleComponent.js', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    fragment: document.createElement('div'),
    body: document.createElement('div'), 
    description: '' 
  })),
}));

// mock UI components
jest.mock('../src/components/waveformComponent.js', () => jest.fn(() => ({})));
jest.mock('../src/components/envelopeComponent.js', () => jest.fn(() => ({})));
jest.mock('../src/components/numberDialComponent.js', () => jest.fn());

// mock UI controller set method
jest.mock('../src/elements/panels/synthesizer/synthesizer.ui.js', () => ({ set: jest.fn() }));

// mock subtitle
jest.mock('../src/elements/panels/panels.js', () => ({ createPanelSubtitle: jest.fn() }));

// Test descriptions for synthesizer sections
describe('Synthesizer Description', () => {
  it('description amplitude envelope and oscillator', () => {
    
    createSynthesizer();

    // Check the results of the mock
    const mockInstances = (CollapsibleComponent as jest.Mock).mock.results;
    
    // In synthesizer.js, Envelope is created first, then Oscillator
    const envelopeSection = mockInstances[0].value;
    const oscillatorSection = mockInstances[1].value;

    expect(envelopeSection.description).toBe("Controls the volume from the moment a key is pressed to after its released");
    expect(oscillatorSection.description).toBe("Generates the sound and defines the basic tone and texture of the sound");
  });
});