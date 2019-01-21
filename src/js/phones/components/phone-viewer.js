import Component from '../../component.js'

export default class PhoneViwer extends Component {
  constructor({ 
    element,
    onAddToCart,
    toCatalog,
  }) {
    super(element);
    this._element = element;
    this._onAddToCart = onAddToCart;
    this._toCatalog = toCatalog;

    this._element.addEventListener('click', (event) => {
      let toCartButton = this._element.querySelector('[data-element="to-cart"]');
      let toCatalogButton  = this._element.querySelector('[data-element="to-catalog"]');

      if (toCartButton && event.target === toCartButton) {
        let phoneId = toCartButton.closest('[data-phone-id]').dataset.phoneId;
        onAddToCart(phoneId);
      } else if (toCatalogButton && event.target === toCatalogButton) {
        toCatalog();
      }
    });
  }

  _render() {
    this._element.innerHTML = `
      <div class="product__wrapper" data-phone-id="${this._phoneDetails.id}">
        <div class="product__buttons">
          <button data-element="to-catalog">Back to catalog</button>
          <button data-element="to-cart">Add to cart</button>
        </div>
        <div class="product__item">
          <div class="product__image-wrapper">
            <img class="product__image" src="${this._phoneDetails.images[0]}">
          </div>
          <div class="product__info">
            <div class="product__title"><h2>${this._phoneDetails.name}</h2></div>
            <hr>
            <div class="product__description">${this._phoneDetails.description}</div>
            <div class="product__gallery">
            ${ this._phoneDetails.images.map(item => 
                `<img class="product__gallery-image" src="${item}">`
              ).join('') }
            </div>
          </div>
        </div>
      </div>    
    `;
  }

  show(phoneDetails) {
    this._phoneDetails = phoneDetails;

    this._render();
    super.show();
  }
}