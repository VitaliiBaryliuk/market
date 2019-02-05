const PhoneService = {
  getAll(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open(
      'GET', 
      `https://mate-academy.github.io/phone-catalogue-static/phones/phones.json`,
      true
    );
    xhr.send();
    
    xhr.onload = () => {
      if (xhr.status !== 200) {
        return [];
      }

      let phones = JSON.parse(xhr.responseText); 
      callback(phones);
    }
  },

  getById(phoneId, callback) {
    let xhr = new XMLHttpRequest(); 
    xhr.open('GET', `js/phones-base/${phoneId}.json`, true);
    xhr.send();

    xhr.onload = () => {
      if (!xhr.status === 200) {
        return [];
      }

      let phoneDetails = JSON.parse(xhr.responseText);
      callback(phoneDetails);
    }
  }
}

export default PhoneService;