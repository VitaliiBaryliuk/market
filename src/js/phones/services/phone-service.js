const PhoneService = {
  getAll: (callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      'https://vitaliybaryliuk.github.io/phones-file/phones.json',
      true,
    );
    xhr.send();

    xhr.onload = () => {
      if (xhr.status !== 200) {
        return [];
      }

      const phones = JSON.parse(xhr.responseText);
      callback(phones);
    };
  },
  
  getById: (phoneId, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `js/phones-base/${phoneId}.json`, true);
    xhr.send();

    xhr.onload = () => {
      if (!xhr.status === 200) {
        return [];
      }

      const phoneDetails = JSON.parse(xhr.responseText);
      callback(phoneDetails);
    };
  },
};

export default PhoneService;
