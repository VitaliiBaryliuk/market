
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
