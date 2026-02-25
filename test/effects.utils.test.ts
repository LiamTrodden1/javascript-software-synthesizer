import { createEffectElements } from '../src/elements/panels/effects/effects.utils.js';
import * as panels from '../src/elements/panels/panels.js';

jest.mock('../src/components/collapsibleComponent.js', () => ({
  __esModule: true,
  default: jest.fn(() => ({ fragment: document.createElement('div') })),
}));

jest.mock('../src/elements/panels/panels.js', () => ({
  __esModule: true,
  createPanelSubtitle: jest.fn(() => document.createElement('div')),
}));


describe('Effects Utils - Description Feature', () => {
  it('assigns the description to the subtitle title attribute', () => {
    const mockDescription = 'Adds depth and space to the signal';
    
    const mockSubtitle = document.createElement('div');
    (panels.createPanelSubtitle as jest.Mock).mockReturnValue(mockSubtitle);

    createEffectElements('reverb', 'Reverb', mockDescription);

    expect(mockSubtitle.title).toBe(mockDescription);
  });
});