import { jest } from '@jest/globals';

// mock nexusUI2
jest.mock('nexusui2', () => ({
  __esModule: true,
  default: {
    Toggle: jest.fn().mockImplementation(() => ({ on: jest.fn() })),
    Number: jest.fn().mockImplementation(() => ({ on: jest.fn(), link: jest.fn() })),
    Dial: jest.fn().mockImplementation(() => ({ on: jest.fn(), link: jest.fn() })),
  }
}));

describe('Feedback Delay Warning Logic', () => {
    // mock warning
    let alertSpy: any;

    beforeEach(() => {
        alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    });

    afterEach(() => {
        alertSpy.mockRestore();
    });

    test('Alert when feedback reaches 1', () => {
        let warning = false;
        
        const triggerChange = (value: number) => {
        if (value === 1) {
            if (!warning) {
            alert("Increasing Feedback to 1 creates an infinite loop meaning the the echo will never stop");
            warning = true;
            }
        } 
        else 
            {
                warning = false;
            }
        };

        // test warning triggering at 1
        triggerChange(1.0);
        expect(alertSpy).toHaveBeenCalledTimes(1);

        // test warning triggering once
        triggerChange(1.0);
        expect(alertSpy).toHaveBeenCalledTimes(1);

        // 3. Test reset and re trigger
        triggerChange(0.5);
        triggerChange(1.0);
        expect(alertSpy).toHaveBeenCalledTimes(2);
    });
});