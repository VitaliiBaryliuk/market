
export default class Filter {
  constructor({ 
    element,
    onSortChange,
    onSearchKeyDown,
  }) {
    this._element = element;
    this._onSortChenge = onSortChange;
    this._onSearchKeyDown = onSearchKeyDown;
    this._render();
    this._dropdown();


    this._element.addEventListener('change', (event) => {
      const sort = document.querySelector('.sidebar__sort');

      if (sort && event.target === sort) {
        if (!sort) {
          return;
        }
        const value = sort.value;
        onSortChange(value);
      }
    });

    this._element.addEventListener('keydown', (event) => {
      const search = this._element.querySelector('.sidebar__search-input');
      if (search && event.target === search) {
        onSearchKeyDown(search.value);
      }
    })

    this._element.addEventListener('click', (event) => {
      const sortSelected = this._element.querySelector('[data-element="selected"]');
      const dropList = this._element.querySelector('[data-element="dropdown-list"]');
      const selectedImage = this._element.querySelector('[data-element="selected-image"]');

      if (sortSelected && event.target.closest('[data-element="selected"]')) {
        dropList.classList.toggle('hide');
        selectedImage.classList.toggle('rotate');
      } else if (event.target.dataset.sort) {
        onSortChange(event.target.dataset.sort);
        this._setDropdown(event.target);
        dropList.classList.toggle('hide');
        selectedImage.classList.toggle('rotate');
      }
    });
  }

  _render() {
    this._element.innerHTML = `
    <div class="sidebar__search-wrapper">
      <label for="">Search</label>
      <input type="text" class="sidebar__search-input">
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
            <li class="sidebar__dropdown-item" data-sort="${a.value}">
              ${a.innerHTML}
            </li>       
          `).join('')
        }
      </ul>
    `;

    const selectedText = this._element.querySelector('[data-element="selected-text"]');
    const firstOption = this._element.querySelector('[data-sort]');
    selectedText.innerHTML = firstOption.innerHTML;
    selectedText.dataset.selected = firstOption.dataset.sort;
  }

  _setDropdown(clickedElement) {
    const selectedText = this._element.querySelector('[data-element="selected-text"]');
    selectedText.innerHTML = clickedElement.innerHTML;
  }
}