import Component from '../../component.js'


export default class Filter extends Component {
  constructor({ element }) {
    super(element);
    this._element = element;
    this._render();
    this._dropdown();

    this.on('keydown', 'search-input', (event) => {
      this.emit('search-changed-value', event.target.value);
    });

    this.on('click', 'selected', () => {
      const dropList = this._element.querySelector('[data-element="dropdown-list"]');
      const selectedImage = this._element.querySelector('[data-element="selected-image"]');
      dropList.classList.toggle('hide');
      selectedImage.classList.toggle('rotate');
    });

    this.on('click', 'sort-item', (event) => {
      const dropList = this._element.querySelector('[data-element="dropdown-list"]');
      const selectedImage = this._element.querySelector('[data-element="selected-image"]');
      this._setDropdown(event.target);
      dropList.classList.toggle('hide');
      selectedImage.classList.toggle('rotate');
      this.emit('catalog-sorted', (event.target.dataset.sortValue));

    });
  }

  _render() {
    this._element.innerHTML = `
    <div class="sidebar__search-wrapper">
      <label for="">Search</label>
      <input type="text" class="sidebar__search-input" data-element="search-input">
    </div>
    <br>
    <div class="sidebar__sort-wrapper" data-element="sort-wrapper">
    <label>Sort by:</label>
      <select class="sidebar__select hide" data-element="select">
        <option value="age">Newest</option>
        <option value="name">Alphabetical</option>
      </select>
      <div class="sidebar__dropdown-wrapper" data-element="dropdown-wrapper"></div>
    </div>
    `;
  }

  _dropdown() {
    const sort = this._element.querySelector('[data-element="select"]');
    const dropdown = this._element.querySelector('[data-element="dropdown-wrapper"]');

    dropdown.innerHTML = `
      <div class="sidebar__dropdown-item sidebar__dropdown-selected" data-element="selected">
        <div data-element="selected-text"></div>
        <div class="sidebar__selected-image" data-element="selected-image"></div>
      </div>
      <ul class="sidebar__dropdown-list hide" data-element="dropdown-list">
        ${
          Array.from(sort.children).map(a => `
            <li class="sidebar__dropdown-item" data-sort-value="${a.value}" data-element="sort-item">
              ${a.innerHTML}
            </li>       
          `).join('')
        }
      </ul>
    `;

    const selectedText = this._element.querySelector('[data-element="selected-text"]');
    const firstOption = this._element.querySelector('[data-sort-value]');
    selectedText.innerHTML = firstOption.innerHTML;
    selectedText.dataset.selected = firstOption.dataset.sort;
  }

  _setDropdown(clickedElement) {
    const selectedText = this._element.querySelector('[data-element="selected-text"]');
    selectedText.innerHTML = clickedElement.innerHTML;
  }
}