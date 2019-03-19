import Component from '../../component.js'
import Dropdawn from './dropdawn.js';

export default class Filter extends Component {
  constructor({ element }) {
    super({ element });
    
    this._render();

    this.select = document.querySelector('[data-element="select"]');
    this.dropdawnWrapper = document.querySelector('[data-element="dropdown-wrapper"]');

    this._dropdown = new Dropdawn({ 
      select: this.select, 
      dropdown: this.dropdawnWrapper 
    });

    this.on('keydown', 'search-input', (event) => {
      this.emit('search-changed-value', event.target.value);
    });

    this.on('click', 'selected', () => {
      const dropList = this._element.querySelector('[data-element="dropdown-list"]');
      const selectedImage = this._element.querySelector('[data-element="dropdown-arrow"]');
      dropList.classList.toggle('hide');
      selectedImage.classList.toggle('rotate');
    });

    this.on('click', 'sort-item', (event) => {
      const dropList = this._element.querySelector('[data-element="dropdown-list"]');
      const selectedImage = this._element.querySelector('[data-element="dropdown-arrow"]');
      this._dropdown._setDropdown(event.target);
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
}