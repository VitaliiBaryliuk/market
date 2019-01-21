
export default class Component {
  constructor({ element }) {
    this._element = element;
  }

  hide() {
    this._element.style.display = 'none';
  }

  show(phoneDetails) {
    this._element.style.display = 'flex';
  }
  
}
