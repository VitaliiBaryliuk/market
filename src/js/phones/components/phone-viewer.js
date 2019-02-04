import Component from '../../component.js'

export default class PhoneViwer extends Component {
  constructor({ element }) {
    super(element);
    this._element = element;

    this.on('click', 'to-catalog', (event) => {
      this.emit('to-catalog');
    });

    this.on('click', 'gallery-image', (event) => {
      const mainImage = this._element.querySelector('[data-element="main-image"]');
      mainImage.src = event.target.src;
    });

    this.on('click', 'to-cart', (event) => {
      const phoneItem = event.target.closest('[data-phone-id]');
      this.emit('add-to-cart', phoneItem.dataset.phoneId);
    });
  }

  _render() {
    window.scrollTo(0, 0);
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
    if (!phoneDetails) {
      this._element.innerHTML = `<h2>Sorry, no have such phone</h2>`;
    } else {
      this._render();
    }

    super.show();
  }
}