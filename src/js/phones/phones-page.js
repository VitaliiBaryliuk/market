import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import ShoppingCart from './components/shopping-cart.js';
import Filter from './components/filter.js';
import PhoneService from './services/phone-service.js';
// import Component from '../component.js';


export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
      phones: PhoneService.getAll(),
      onPhoneSelected: (phoneId) => {
        const phoneDetails = PhoneService.getById(phoneId);
        this._catalog.hide();
        this._viewer.show(phoneDetails);
      },
      onAddToCart: (phoneId) => {
        this._shoppingCart.toCart(phoneId);
      },
    });

    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
      onAddToCart: (phoneId) => {
        this._shoppingCart.toCart(phoneId);
      },
      toCatalog: () => {
        this._catalog.show();
        this._viewer.hide();
      },
    });

    this._shoppingCart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]'),
      phones: PhoneService.getAll(),
    });

    this._filter = new Filter({
      element: this._element.querySelector('[data-compotent="filter"]'),
      phones: PhoneService.getAll(),
      onSortChange: (value) => {
        this._catalog.sort(value);
      },
      onSearchKeyDown: (value) => {
        this._catalog.debounced(value);
      },
    });
  }

  _render() {
  }

}
