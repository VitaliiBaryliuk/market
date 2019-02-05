
const Utils = {

  debounce(f, delay) {
    let timers = 0;

    return (value) => {
      console.log(this);
      clearTimeout(timers);
      timers = setTimeout(() => {
        f.call(this, value);
      }, delay);
    };
  },
}

export default Utils;