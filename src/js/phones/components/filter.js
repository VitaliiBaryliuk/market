
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

    this._element.addEventListener('change', () => {
      const sort = document.querySelector('.sidebar__sort');

      if (sort && event.target === sort) {
        if (!sort) {
          return;
        }
        console.log('sort');
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
  }

  _render() {
    this._element.innerHTML = `
    <div class="sidebar__search-wrapper">
      <label for="">Search</label>
      <input type="text" class="sidebar__search-input">
    </div>
    <br>
    <label for="">Sort by:</label>
    <select class="sidebar__sort" name="sort" id="">
      <option value="name">Alphabetical</option>
      <option value="age">Newest</option>
    </select>
    `;
  }
}