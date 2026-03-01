/*
 *  JSS-01 |JavaScript Software Synthesizer
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 *
 *  ATTENTION! FREE SOFTWARE
 *  This website is free software (free as in freedom).
 *  If you use any part of this code, you must make your entire project's source code
 *  publicly available under the same license. This applies whether you modify the code
 *  or use it as it is in your own project. This ensures that all modifications and
 *  derivative works remain free software, so that everyone can benefit.
 *  If you are not willing to comply with these terms, you must refrain from using any part of this code.
 *
 *  For full license terms and conditions, you can read the AGPL-3.0 here:
 *  https://www.gnu.org/licenses/agpl-3.0.html
 */

import { assertInstanceOf } from '../utils/utils.js';

const selectors = {
  toggle: 'collapsible-toggle',
  wrapper: 'collapsible-wrapper',
  content: 'collapsible-content',
};

class Component {
  private _title: HTMLElement;

  private _body: HTMLElement;

  public fragment: DocumentFragment;

  constructor(title: HTMLElement, toggle: HTMLElement, wrapper: HTMLElement) {
    this.fragment = new DocumentFragment();
    this.fragment.append(title, toggle, wrapper);

    const body = wrapper.children[0];
    assertInstanceOf(body, HTMLElement);

    this._title = title;
    this._body = body;
  }

  // Detailed information about functionality when pressin "I" button
  set infoContent(value: string) {
    const id = Math.random().toString(36).substring(2, 9);
    const infoHtml = `
      <div class="info-button-container">
        <input type="checkbox" id="info-${id}" class="info-toggle-check">
        <label for="info-${id}" class="info-icon">ⓘ</label>
        <div class="info-popout">${value}</div>
      </div>
    `;
    // Append the info button to the header label
    this._title.insertAdjacentHTML('beforeend', infoHtml);
  }

  // Description of what the section does
  set description(value: string) {
      this._title.title = value; 
  }

  set title(value: string) {
    this._title.innerHTML = value;
  }
  get title(): HTMLElement {
    return this._title;
  }
  set body(value: string) {
    this._body.innerHTML = value;
  }
  get body(): HTMLElement {
    return this._body;
  }
  appendtToTitle(element: HTMLElement) {
    this.title.append(element);
  }
  appendToBody(element: HTMLElement | DocumentFragment) {
    this.body.append(element);
  }
}

export default function CollapsibleComponent(
  id: string,
  title?: HTMLElement,
  ...body: HTMLElement[]
) {
  const identifier = `${id}-content-toggle`;

  const label = document.createElement('label');
  label.setAttribute('for', identifier);
  label.classList.add('collapse-header');

  const arrow = document.createElement('span');
  arrow.className = 'collapse-arrow';

  const toggle = document.createElement('input');
  toggle.id = identifier;
  toggle.type = 'checkbox';
  toggle.classList.add(selectors.toggle);
  toggle.setAttribute('hidden', 'hidden');

  const [wrapper, content] = [selectors.wrapper, selectors.content].map(
    (selector) => {
      const element = document.createElement('div');
      element.classList.add(selector);
      return element;
    }
  );

  label.append(arrow);
  if (title) {
    label.append(title);
  }

  content.append(...body);
  wrapper.append(content);

  return new Component(label, toggle, wrapper);

  //	return `
  //		<label for="${identifier}">
  // 			${title}
  //		</label>
  //		<input id="${identifier}" type="checkbox" hidden />
  //		<div class="${selectors.wrapper}">
  //			<div class="${selectors.content}">
  // 				${body}
  // 			</div>
  //		</div>`;
}

export type TCollapsibleComponent = Component;
