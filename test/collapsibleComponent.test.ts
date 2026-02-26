import CollapsibleComponent from '../src/components/collapsibleComponent';

describe('CollapsibleComponent Class', () => {
  it('Add a description to the title', () => {
    const title = document.createElement('span');
    const component = CollapsibleComponent('testId', title);

    const testDescription = 'Test Description';
    component.description = testDescription;

    // check title has a description
    expect(component.title.title).toBe(testDescription);
  });
});

describe('Collapsible UI: Logic & State', () => {
  it('UI: Clicking the header toggles the checkbox (which triggers CSS arrow)', () => {
    // create the component
    const title = document.createElement('span');
    title.textContent = 'OSCILLATOR';
    const comp = CollapsibleComponent('osc1', title);

    // add to the test doc
    document.body.appendChild(comp.fragment);

    const label = document.querySelector('.collapse-header') as HTMLLabelElement;
    const checkbox = document.querySelector('.collapsible-toggle') as HTMLInputElement;
    const arrow = document.querySelector('.collapse-arrow') as HTMLElement;

    // expect arrow to be false (open) and also not null
    expect(checkbox.checked).toBe(false);
    expect(arrow).not.toBeNull(); 

    // click the header
    label.click();
    
    // expect checkbox to become true (closed)
    expect(checkbox.checked).toBe(true);
  });
});
