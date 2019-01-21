import Component from '../../component.js';

export default class PhoneCatalog extends Component {
  constructor({
    element,
    phones = [],
    onPhoneSelected = () => {},
    onAddToCart,
  }) {
    super({ element });
    this._element = element;
    this._phones = phones;
    this._filtred = phones;
    this.onPhoneSelected = onPhoneSelected;
    this._onAddToCart = onAddToCart;
    this.debounced = this.debounce(this.search, 500);

    this._render();

    this._element.addEventListener('click', (event) => {
      const detailsLink = event.target.closest('[data-element="details-link"]');
      const toCart = this._element.querySelector('[data-element="to-cart"]');
      if (event.target.dataset.element === 'details-link') {
        if (!detailsLink) {
          return;
        }
        const phoneElement = detailsLink.closest('[data-element="phone-item"');
        onPhoneSelected(phoneElement.dataset.phoneId);
      } else if (event.target.dataset.element === 'to-cart') {
        if (!toCart) {
          return;
        }
        const phoneId = event.target.closest('[data-element="phone-item"]').dataset.phoneId;
        onAddToCart(phoneId);
      }
    });
  }

  _render() {
    this._element.innerHTML = `
    <ul class="catalog__list">
       ${this._phones.map(phone => `
        <li class="catalog__item" data-phone-id="${phone.id}"  data-element="phone-item">
        <div class="catalog__product">
          <div class="catalog__product-photo-wrapper">
            <a href="#!phones/${phone.id}" data-element="details-link">
              <img class="catalog__product-photo" src="${phone.imageUrl}">
            </a>
          </div>
          <div class="catalog__product-info">
            <h2 class="catalog__product-title">
              <a class="catalog__product-link" href="#" data-element="details-link">
                ${phone.name}
              </a>
            </h2>
            <p class="catalog__product-desc">
            ${phone.age}, ${phone.snippet}
            </p>
          </div>
          <div class="catalog__button-wrapper">
          <button class="catalog__to-cart-button" data-element="to-cart">Add</button>
          </div>
        </div>
      </li>
      `).join('')}
    </ul>`;
  }

  sort(value) {
    if (value === 'name') {
      this._phones.sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      });
    } else if (value === 'age') {
      this._phones.sort((a, b) => {
        if (a.age < b.age) { return -1; }
      });
    }
    this._render();
  }

  search(value) {
    const reg = RegExp(value, 'i');
    const res = this._filtred.filter(a => reg.test(a.name));
    this._phones = res;
    this._render();
  }

  debounce(f, delay) {
    let timers = 0;

    return (value) => {
      clearTimeout(timers);
      timers = setTimeout(() => {
        f.call(this, value);
      }, delay);
    };
  }

}
