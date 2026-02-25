import createModulator from '../src/elements/panels/modulation/modulation.js';
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

// mock UI
jest.mock('../src/components/waveformComponent.js', () => jest.fn(() => ({})));
jest.mock('../src/components/envelopeComponent.js', () => jest.fn(() => ({})));

// mock UI controller set method
jest.mock('../src/elements/panels/modulation/modulation.ui.js', () => ({ set: jest.fn() }));

// mock subtitle
jest.mock('../src/elements/panels/panels.js', () => ({ createPanelSubtitle: jest.fn() }));

// Test description for modulation envelope 
describe('Modulation Description', () => {
  it('description modulation enevlope', () => {
    
    createModulator();

    // Check the results of the mock
    const mockInstances = (CollapsibleComponent as jest.Mock).mock.results;
    
    // createsCollapsibleComponent for modulation envelope
    const envelopeSection = mockInstances[0].value;

    expect(envelopeSection.description).toBe("Controls how an effect behaves from pressing the key to letting go of the key");
  });
});