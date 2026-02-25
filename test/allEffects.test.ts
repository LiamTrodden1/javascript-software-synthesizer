import autoFilter from '../src/elements/panels/effects/elements/autoFilter.js';
import bitCrusher from '../src/elements/panels/effects/elements/bitCrusher.js';
import chebyshev from '../src/elements/panels/effects/elements/chebyshev.js';
import chorus from '../src/elements/panels/effects/elements/chorus.js';
import distortion from '../src/elements/panels/effects/elements/distortion.js';
import feedbackDelay from '../src/elements/panels/effects/elements/feedbackDelay.js';
import frequencyShifter from '../src/elements/panels/effects/elements/frequencyShifter.js';
import phaser from '../src/elements/panels/effects/elements/phaser.js';
import reverb from '../src/elements/panels/effects/elements/reverb.js';
import tremolo from '../src/elements/panels/effects/elements/tremolo.js';
import vibrato from '../src/elements/panels/effects/elements/vibrato.js';

// mock createEffectElements and retrun the structure needed for render function
jest.mock('../src/elements/panels/effects/effects.utils.js', () => ({
  __esModule: true,
  createEffectElements: jest.fn(() => [
    document.createElement('div'),
    document.createElement('div'),
    document.createElement('div')
  ]),
  defaultToggleOptions: {}
}));

// mock other UI components
jest.mock('../src/components/numberDialComponent.js', () => ({
  __esModule: true,
  default: jest.fn(() => ({ on: jest.fn() }))
}));
jest.mock('nexusui2', () => ({
  __esModule: true,
  default: {
    Toggle: jest.fn(() => ({ on: jest.fn() }))
  }
}));

// autoFilter description Test
describe('autoFilter Component', () => {
  it('pass description to createEffectElements', async () => {
    // call mock function
    const { createEffectElements } = await import('../src/elements/panels/effects/effects.utils.js');
    
    // call render function
    autoFilter.render();

    // check description
    const expectedDescription = 'Sweeping filter to cut of high frequencies giving a "wah" sounding effect';
    
    expect(createEffectElements).toHaveBeenCalledWith(
      'auto-filter',
      'Auto Filter',
      expectedDescription
    );
  });
});

// bitCrusher description Test
describe('bitCrusher Component', () => {
  it('pass description to createEffectElements', async () => {
    // call mock function
    const { createEffectElements } = await import('../src/elements/panels/effects/effects.utils.js');
    
    // call render function
    bitCrusher.render();

    // check description
    const expectedDescription = 'Reduce the audio resolution to add a more gritty distorted lo-fi noise';
    
    expect(createEffectElements).toHaveBeenCalledWith(
      'bit-crusher',
      'Bit Crusher',
      expectedDescription
    );
  });
});
// chebyshev description Test
describe('chebyshev Component', () => {
  it('pass description to createEffectElements', async () => {
    // call mock function
    const { createEffectElements } = await import('../src/elements/panels/effects/effects.utils.js');
    
    // call render function
    chebyshev.render();

    // check description
    const expectedDescription = 'Add harmonics for distortion';
    
    expect(createEffectElements).toHaveBeenCalledWith(
      'chebyshev',
      'Chebyshev',
      expectedDescription
    );
  });
});
// chorus description Test
describe('chorus Component', () => {
  it('pass description to createEffectElements', async () => {
    // call mock function
    const { createEffectElements } = await import('../src/elements/panels/effects/effects.utils.js');
    
    // call render function
    chorus.render();

    // check description
    const expectedDescription = 'Vary pitch and timing to produce a heavenly sound';
    
    expect(createEffectElements).toHaveBeenCalledWith(
      'chorus',
      'Chorus',
      expectedDescription
    );
  });
});
// distortion description Test
describe('distortion Component', () => {
  it('pass description to createEffectElements', async () => {
    // call mock function
    const { createEffectElements } = await import('../src/elements/panels/effects/effects.utils.js');
    
    // call render function
    distortion.render();

    // check description
    const expectedDescription = 'Increase audio saturation for a more aggressive tone';
    
    expect(createEffectElements).toHaveBeenCalledWith(
      'distortion',
      'Distortion',
      expectedDescription
    );
  });
});
// feedbackDelay description Test
describe('feedbackDelay Component', () => {
  it('pass description to createEffectElements', async () => {
    // call mock function
    const { createEffectElements } = await import('../src/elements/panels/effects/effects.utils.js');
    
    // call render function
    feedbackDelay.render();

    // check description
    const expectedDescription = 'Echoes the sound that has been played';
    
    expect(createEffectElements).toHaveBeenCalledWith(
      'feedback-delay',
      'Feedback Delay',
      expectedDescription
    );
  });
});
// frequencyShifter description Test
describe('frequencyShifter Component', () => {
  it('pass description to createEffectElements', async () => {
    // call mock function
    const { createEffectElements } = await import('../src/elements/panels/effects/effects.utils.js');
    
    // call render function
    frequencyShifter.render();

    // check description
    const expectedDescription = 'Adjust frequencies to create a metallic inharmonic sound';
    
    expect(createEffectElements).toHaveBeenCalledWith(
      'freq-shifter',
      'Freq. Shifter',
      expectedDescription
    );
  });
});
// phaser description Test
describe('phaser Component', () => {
  it('pass description to createEffectElements', async () => {
    // call mock function
    const { createEffectElements } = await import('../src/elements/panels/effects/effects.utils.js');
    
    // call render function
    phaser.render();

    // check description
    const expectedDescription = 'Creates a swirling spacey sound by shifting the phase of the signal';
    
    expect(createEffectElements).toHaveBeenCalledWith(
      'phaser',
      'Phaser',
      expectedDescription
    );
  });
});
// reverb description Test
describe('reverb Component', () => {
  it('pass description to createEffectElements', async () => {
    // call mock function
    const { createEffectElements } = await import('../src/elements/panels/effects/effects.utils.js');
    
    // call render function
    reverb.render();

    // check description
    const expectedDescription = 'Add space and depth to the sound giving a feeling of playing in a large room';
    
    expect(createEffectElements).toHaveBeenCalledWith(
      'reverb',
      'Reverb',
      expectedDescription
    );
  });
});
// tremolo description Test
describe('tremolo Component', () => {
  it('pass description to createEffectElements', async () => {
    // call mock function
    const { createEffectElements } = await import('../src/elements/panels/effects/effects.utils.js');
    
    // call render function
    tremolo.render();

    // check description
    const expectedDescription = 'A rhthmic pulsing effect by rapidly modulating volume';
    
    expect(createEffectElements).toHaveBeenCalledWith(
      'tremolo',
      'Tremolo',
      expectedDescription
    );
  });
});
// vibrato description Test
describe('vibrato Component', () => {
  it('pass description to createEffectElements', async () => {
    // call mock function
    const { createEffectElements } = await import('../src/elements/panels/effects/effects.utils.js');
    
    // call render function
    vibrato.render();

    // check description
    const expectedDescription = 'Wobble pitch to simulate vocal singing';
    
    expect(createEffectElements).toHaveBeenCalledWith(
      'vibrato',
      'Vibrato',
      expectedDescription
    );
  });
});