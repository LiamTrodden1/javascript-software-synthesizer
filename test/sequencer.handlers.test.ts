import createSequencer from '../src/audio/sequencer.handlers.ts';
import { interfaces } from '../src/elements/extras/sequencer/sequencer.js';

// mock sequence object
const mockSequence = { 
  start: jest.fn().mockReturnThis(), 
  events: [],
  set: jest.fn() 
};

// mock tone.js for test
jest.mock('../src/audio/tone.js', () => ({
  __esModule: true,
  Sequence: jest.fn(() => mockSequence),
  Transport: { start: jest.fn(), stop: jest.fn() },
  start: jest.fn()
}));

// mock synth 
jest.mock('../src/audio/audio', () => ({
  __esModule: true,
  default: {
    getSynth: () => ({ triggerAttackRelease: jest.fn() })
  }
}));

// mock UI intercaces for input box and buttons
jest.mock('../src/elements/extras/sequencer/sequencer.js', () => ({
  __esModule: true,
  interfaces: {
    sequence: { value: '' },
    set: { addEventListener: jest.fn() },
    rate: { value: '1', addEventListener: jest.fn() },
    subdivision: { value: '4n', addEventListener: jest.fn() },
    play: { addEventListener: jest.fn() },
    stop: { addEventListener: jest.fn() }
  }
}));

describe('Sequencer RegEx & Logic Diversity', () => {
  let triggerSet: Function;

  beforeEach(async () => {
    mockSequence.events = [];
    await createSequencer();
    // Test the add sequence button
    triggerSet = (interfaces.set.addEventListener as jest.Mock).mock.calls.find(
      call => call[0] === 'click'
    )[1];
  });

  // Test sequence with just spaces
  it('Test space seperated sequence', () => {
    interfaces.sequence.value = 'C4 E4 G4';
    triggerSet();
    expect(mockSequence.events).toEqual(['C4', 'E4', 'G4']);
  });

  // Test sharp/flat notes
  it('Test sharp and flat notes', () => {
    interfaces.sequence.value = 'F#2 Bb3 G#4 Eb5';
    triggerSet();
    expect(mockSequence.events).toEqual(['F#2', 'Bb3', 'G#4', 'Eb5']);
  });

  // test if user puts too many spaces
  it('Test lots of spaces', () => {
    interfaces.sequence.value = 'C4    E4		G4'; 
    triggerSet();
    expect(mockSequence.events).toEqual(['C4', 'E4', 'G4']);
  });

  // Test premade sequences arent case sensitive
  it('Test premade sequence arent case sensitive', () => {
    interfaces.sequence.value = 'FUNKY TOWN';
    triggerSet();
    expect(mockSequence.events).toEqual(['C4', 'C4', 'Bb3', 'C4', 'G3', 'G3', 'C4', 'F4', 'E4', 'C4']);
  });

  // Test lowercase inputs
  it('RegEx: Handles lowercase input', () => {
    interfaces.sequence.value = 'a1 b2 c8';
    triggerSet();
    expect(mockSequence.events).toEqual(['a1', 'b2', 'c8']);
  });

  // Test uppercase inputs
  it('RegEx: Handles lowercase input', () => {
    interfaces.sequence.value = 'A1 B2 C8';    
    triggerSet();
    expect(mockSequence.events).toEqual(['A1', 'B2', 'C8']);
  });

  // Test mix of cases
  it('RegEx: Handles mixed case inputs correctly', () => {
      interfaces.sequence.value = 'a1 B2 c#3 D#4';
      triggerSet();

      // This proves the RegEx is flexible enough to catch everything 
      // regardless of the user's shift key
      expect(mockSequence.events).toEqual(['a1', 'B2', 'c#3', 'D#4']);
    });

  // Test using quotation marks
  it('RegEx: Handles inputs that already contain quotation marks', () => {
      interfaces.sequence.value = '"C4" "E4" "G4"';
      
      triggerSet();
      expect(mockSequence.events).toEqual(['C4', 'E4', 'G4']);
    });

  // Test using commas
  it('RegEx: Handles inputs that already contain commas', () => {
      interfaces.sequence.value = 'C4, E4, G4';
      
      triggerSet();
      expect(mockSequence.events).toEqual(['C4', 'E4', 'G4']);
    });
});