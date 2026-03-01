import createSequencer, { interfaces } from '../src/elements/extras/sequencer/sequencer.ts'; // Adjust path
import { descriptions } from '../src/elements/extras/sequencer/sequencer.options.ts';

describe('Sequencer Hover Documentation Tests', () => {
    let container: HTMLDivElement;

    beforeEach(() => {
        container = document.createElement('div');
        container.appendChild(createSequencer());
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });
    
    // Helper to find a description text within the same wrapper as an element
    const getTooltipText = (element: HTMLElement) => {
        const wrapper = element.closest('.sequencer-input-wrapper');
        const tooltip = wrapper?.querySelector('.hover-description');
        return tooltip?.textContent;
    };

    test('speed description', () => {
        const text = getTooltipText(interfaces.rate);
        expect(text).toBe(descriptions.rate);
    });

    test('subdivision description', () => {
        const text = getTooltipText(interfaces.subdivision);
        expect(text).toBe(descriptions.subdivision);
    });

    test('sequence input description', () => {
        const text = getTooltipText(interfaces.sequence);
        expect(text).toBe(descriptions.sequence);
    });

    test('set button description', () => {
        const text = getTooltipText(interfaces.set);
        expect(text).toBe(descriptions.set);
    });

    test('play button description', () => {
        const text = getTooltipText(interfaces.play);
        expect(text).toBe(descriptions.play);
    });

    test('stop button description', () => {
        const text = getTooltipText(interfaces.stop);
        expect(text).toBe(descriptions.stop);
    });

    test('all descriptions are using the correct CSS class for styling', () => {
        const allTooltips = container.querySelectorAll('.hover-description');
        expect(allTooltips.length).toBe(6);
        allTooltips.forEach(tooltip => {
        expect(tooltip.classList).toContain('info-popout');
        });
    });
});