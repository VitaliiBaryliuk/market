
export default class Dropdown {
  constructor({select, dropdown }) {
    this._select = select;
    this._dropdown = dropdown;

    this._render();
  }

  _render() {
    this._dropdown.innerHTML = `
      <div
        class="sidebar__dropdown-item sidebar__dropdown-selected"
        data-element="selected"
      >
        <div data-element="selected-text"></div>
        <div class="sidebar__selected-image" data-element="dropdown-arrow"></div>
      </div>
      <ul class="sidebar__dropdown-list hide" data-element="dropdown-list">
        ${ Array.from(this._select.children).map(a => `
        <li
          class="sidebar__dropdown-item"
          data-sort-value="${a.value}"
          data-element="sort-item"
        >
          ${a.innerHTML}
        </li>
        `).join('') }
      </ul>
    `;

    const selectedText = this._dropdown.querySelector('[data-element="selected-text"]');
    const firstOption = this._dropdown.querySelector('[data-sort-value]');
    selectedText.innerHTML = firstOption.innerHTML;
    selectedText.dataset.selected = firstOption.dataset.sort;
  }

  _setDropdown(clickedElement) {
    const selectedText = this._dropdown.querySelector('[data-element="selected-text"]');
    selectedText.innerHTML = clickedElement.innerHTML;
  }
}