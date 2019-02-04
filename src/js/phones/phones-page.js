import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import ShoppingCart from './components/shopping-cart.js';
import Filter from './components/filter.js';
import PhoneService from './services/phone-service.js';


export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    PhoneService.getAll((phones) => {
      this._catalog = new PhoneCatalog({
        element: this._element.querySelector('[data-component="phone-catalog"]'),
        phones: phones
      });

      this._catalog.subscribe(
        'phone-selected',
        (phoneId) => {
          PhoneService.getById(phoneId, (phoneDetails) => {
            this._catalog.hide();
            this._viewer.show(phoneDetails);
          });
      });
  
      this._catalog.subscribe(
        'add-to-cart',
        (phoneId) => {
          this._shoppingCart.toCart(phoneId);
      });

      this._shoppingCart = new ShoppingCart({
        element: this._element.querySelector('[data-component="shopping-cart"]'),
        phones: phones,
      });
  
      this._filter = new Filter({
        element: this._element.querySelector('[data-compotent="filter"]'),
        phones: phones
      });
  
      this._filter.subscribe(
        'catalog-sorted',
        (selectedValue) => {
          this._catalog.sort(selectedValue);
        });
  
      this._filter.subscribe(
        'search-changed-value',
        (inoutValue) => {
          this._catalog.searchDebounced(inoutValue);
        });
    });

    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]')
    });

    this._viewer.subscribe(     
      'add-to-cart',
      (phoneId) => {
      this._shoppingCart.toCart(phoneId);
    });

    this._viewer.subscribe(     
      'to-catalog',
      () => {
        this._catalog.show();
        this._viewer.hide();
    });
  }
}
