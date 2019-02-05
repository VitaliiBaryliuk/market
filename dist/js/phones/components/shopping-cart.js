
export default class ShoppingCart {
  constructor({
    element,
    phones = [],
  }) {
    this._element = element;
    this._phones = phones;
    this._shoppingCart = new Map();
    this._render();
  }

  _render() {
    if (this._shoppingCart) {
      let temp = '';
      for (const key of this._shoppingCart.entries()) {
        temp += `<li>${key[0].name} - ${key[1]}</li>`;
      }
      this._element.innerHTML = `
        <p>Shopping cart</p>
        <ul>
          ${temp}
        </ul>
        <img class="sidebar__banner" src="images/banner2.png">
      `;
    } else {
      this._element.innerHTML = `
        <p>Shopping cart</p>
        <img class="sidebar__banner" src="images/banner2.png">
      `;
    }
  }

  AddToCart(phoneId) {
    let count = 1;
    const selectedPhone = this._phones.find(a => a.id === phoneId);

    if (this._shoppingCart.has(selectedPhone)) {
      count = this._shoppingCart.get(selectedPhone);
      this._shoppingCart.set(selectedPhone, count += 1);
    } else {
      count = 1;
      this._shoppingCart.set(selectedPhone, count);
    }

    this._render();
  }
}
