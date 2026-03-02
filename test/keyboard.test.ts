import { keyMapper, constants } from '../src/elements/keyboard/keyboard.utils.ts';

describe('keyboard mapping', () => {
    //24 notes   
    const testBase = 24;

    describe('Test all notes', () => {
    const cases = [
        // Top Row
        ['KeyQ', 0],   ['Digit2', 1], ['KeyW', 2],   ['Digit3', 3],
        ['KeyE', 4],   ['Digit4', 5], ['KeyR', 6],   ['Digit5', 7],
        ['KeyT', 8],   ['Digit6', 9], ['KeyY', 10],  ['Digit7', 11],
        ['KeyU', 12],  ['Digit8', 13], ['KeyI', 14], ['Digit9', 15],
        ['KeyO', 16],  ['Digit0', 17],
        // Bottom Row
        ['KeyZ', 12],  ['KeyS', 13],  ['KeyX', 14],  ['KeyD', 15],
        ['KeyC', 16],  ['KeyF', 17],  ['KeyV', 18],  ['KeyG', 19],
        ['KeyB', 20],  ['KeyH', 21],  ['KeyN', 22],  ['KeyJ', 23],
        ['KeyM', 24]
        ];
    });

    describe('non mapped keys', () => {
        test('returns null for keys not in the map', () => {
        expect(keyMapper('Space', testBase)).toBeNull();
        });
    });
});