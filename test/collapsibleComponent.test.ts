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

