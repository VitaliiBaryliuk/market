
(function landing() {
  const products = [
    {
      title: 'C Motorola XOOM™ with Wi-Fi',
      date: new Date('July 21, 2018 01:15:00'),
      description: `Motorola XOOM with Wi-Fi has a super-powerful dual-core processor and Android™ 3.0 (Honeycomb) — 
      the Android platform designed specifically for tablets. With its 10.1-inch HD widescreen display, 
      you’ll enjoy HD video in a thin, light, powerful and upgradeable tablet.`,
      images: [
        'images/motorolla1.1.jpg',
        'images/motorolla1.2.jpg',
        'images/motorolla1.3.jpg',
        'images/motorolla1.4.jpg',
        'images/motorolla1.5.jpg',
        'images/motorolla1.6.jpg',
      ],
    },
    {
      title: 'B MOTOROLA XOOM™',
      date: new Date('Sept 21, 2018 01:15:00'),
      description: `MOTOROLA XOOM has a super-powerful dual-core processor and Android™ 3.0 
      (Honeycomb) — the Android platform designed specifically for tablets. With its 10.1-inch HD widescreen display, 
      you’ll enjoy HD video in a thin, light, powerful and upgradeable tablet.`,
      images: [
        'images/motorolla2.1.jpg',
        'images/motorolla2.2.jpg',
        'images/motorolla2.3.jpg',
      ],
    },
    {
      title: 'A MOTOROLA ATRIX™ 4G',
      date: new Date('Oct 21, 2018 01:15:00'),
      description: `MOTOROLA ATRIX 4G gives you dual-core processing power and the revolutionary webtop application. 
      With webtop and a compatible Motorola docking station, sold separately, you can surf the Internet with a full Firefox browser, 
      create and edit docs, or access multimedia on a large screen almost anywhere.`,
      images: [
        'images/motorolla3.1.jpg',
        'images/motorolla3.2.jpg',
        'images/motorolla3.3.jpg',
        'images/motorolla3.4.jpg',
      ],
    },
  ];

  function debounce(f, delay) {
    let timers = 0;
    return function (arg) {
      clearTimeout(timers);
      timers = setTimeout(() => {
        f.call(productsList, arg);
      }, delay);
    };
  }

  class ProductsList {
    constructor(options, parrent) {
      this.parrent = parrent;
      this.options = options;
      this.busket = [];
    }

    rander(options) {
      console.log('rander', options);
      this.parrent.innerHTML = `
      <ul class=""products>
        ${options.map(item => `
          <li class="products__item">
          <div class="products__product">
            <div class="products__product-photo-wrapper">
              <img class="products__product-photo" src="${item.images[0]}" />
            </div>
            <div class="products__product-info">
              <h2 class="products__product-title">
                <a class="products__product-link" href="#">
                  ${item.title}
                </a>
              </h2>
              <p class="products__product-desc">
                ${item.date.getDate() + 1} 
                ${item.date.getMonth() + 1} 
                ${item.date.getFullYear()}, 
                ${item.description.substring(0, 99)}
              </p>
            </div>
            <div class="products__button-wrapper">
            <button class="products__to-cart-button" data-item="${item.title}">Add</button>
            </div>
          </div>
        </li>  
        `).join('')}
      </ul>  
      `;
    }
  }

  class SideBar {
    constructor(options, parrent) {
      this.options = options;
      this.parrent = parrent;
      this.busket = new Map();
      this.itemList = this.options;
    }

    rander() {
      this.parrent.innerHTML = '';
      let temp = '';
      for (const key of this.busket.entries()) {
        temp += `${key[0].title}, ${key[1]} <br>`;
      }
      this.parrent.innerHTML = `
        <p>header</p>
        <div class="sidebar__search-wrapper">
            <label for="">Search</label>
            <input type="text" class="sidebar__search-input value="${this.inp}">
        </div>
        <br>
        <label for="">Sort by:</label>
        <select class="sidebar__sort" name="sort" id="">
          <option value="name">Alphabetical</option>
          <option value="date">Newest</option>
        </select>
        <H2>Shoping cart</H2>
        <div class="sidebar__cart">
        </div>
        ${temp}
      `;
    }

    addEvent() {
      this.parrent.addEventListener('change', () => {
        const select = document.querySelector('.sidebar__sort');
        if (!select) {
          return;
        }
        this.sortMethod(select.value);
      });

      this.parrent.addEventListener('keydown', (event) => {
        const search = document.querySelector('.sidebar__search-input');
        if (!search) {
          return;
        }
        if (event.target === search) {
          this.searcMethod(search);
        }
      });


      this.parrent.closest('.container').addEventListener('click', (event) => {
        if (event.target.classList.contains('products__to-cart-button')) {
          const product = this.itemList.find(a => a.title === event.target.dataset.item);
          const toBusket = this.addToBusket();
          toBusket(product);
        }
      });
    }

    searcMethod(input) {
      this.inp = input.value;
      const reg = RegExp(input.value, 'i');
      const res = this.options.filter(a => reg.test(a.title));
      this.itemList = res;
      const bounced = debounce(productsList.rander, 500);
      bounced(this.itemList);
    }

    sortMethod(value) {
      if (value === 'name') {
        this.options.sort((a, b) => {
          if (a.title < b.title) { return -1; }
          if (a.title > b.title) { return 1; }
          return 0;
        });
      } else if (value === 'date') {
        this.options.sort((a, b) => {
          if (a.date > b.date) { return -1; }
        });
      }
      productsList.rander(this.itemList);
    }

    addToBusket() {
      let count = 1;
      return (product) => {
        if (this.busket.has(product)) {
          count = this.busket.get(product);
          this.busket.set(product, count += 1);
        } else {
          count = 1;
          this.busket.set(product, count);
        }
        this.rander();
      };
    }
  }

  const listContainer = document.querySelector('.product-list');
  const productsList = new ProductsList(products, listContainer);
  // productsList.rander(products);

  const sidebar = document.querySelector('.sidebar');
  const sort = new SideBar(products, sidebar);
  sort.rander();
  sort.sortMethod();
  sort.addEvent();
}());
