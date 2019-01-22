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
      const toCartButton = this._element.querySelector('[data-element="to-cart"]');
      const toCatalogButton  = this._element.querySelector('[data-element="to-catalog"]');
      const mainImage = this._element.querySelector('[data-element="main-image"]');

      if (toCartButton && event.target === toCartButton) {
        let phoneId = toCartButton.closest('[data-phone-id]').dataset.phoneId;
        onAddToCart(phoneId);
      } else if (toCatalogButton && event.target === toCatalogButton) {
        toCatalog();
      } else if (event.target.dataset.element === 'gallery-image') {
        mainImage.src = event.target.src;
      }
    });
  }

  _render() {
    this._element.innerHTML = `
      <div class="product__wrapper" data-phone-id="${this._phoneDetails.id}">
        <div class="product__buttons">
          <div class="button" data-element="to-catalog">Back to catalog</div>
          <div class="button to-cart" data-element="to-cart">Add to cart</div>
        </div>
        <div class="product__item">
          <div class="product__image-wrapper">
            <img class="product__image" src="${this._phoneDetails.images[0]}" data-element="main-image">
          </div>
          <div class="product__info">
            <div class="product__title"><h2>${this._phoneDetails.name}</h2></div>
            <hr>
            <div class="product__description">${this._phoneDetails.description}</div>
            <div class="product__gallery">
            ${ this._phoneDetails.images.map(item => 
                `<img class="product__gallery-image" src="${item}" data-element="gallery-image">`
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