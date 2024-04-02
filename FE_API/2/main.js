const config = {
  brands: [],
  ALL: [],
  PrevSelectedBrand: "ALL",
  page: 1,
  maxpage: 8,
};

const Table = document.getElementById("main-table");
const Brands = document.querySelector(".form-select");
const selector = document.getElementById("ALL");
const buttons = document.querySelectorAll(".btn");
// const PriceRegulator = document.querySelectorAll(".PriceRegulator");
// LOADING DATA FROM API
LoadProducts();

async function LoadProducts(page = 1) {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://api.everrest.educata.dev/shop/products/all?page_index=${page}`,
  );
  xhr.send();
  xhr.onload = () => {
    const products = JSON.parse(xhr.responseText).products;
    products.forEach((el) => {
      if (!config.brands.includes(el.brand.toUpperCase())) {
        config.brands.push(el.brand.toUpperCase());
      }
      const iterHTML = `    <tr class="product">
        <td  class="fs-5 text-wrap title" style="width: 10rem;">${el.title}</td>
        <td class="fs-4 brand">${el.brand.toUpperCase()}</td>
        <td class="fs-6 text-wrap desc" >${el.description} </td>
        <td class="fs-2 font-weight-bold price" >${el.price.current}$</td>
        <td class="img"><img width="200px" height="200px" src="${el.images[0]}" class="user-select-none img-thumbnail img-fluid" alt="...">
        </td>
    </tr>`;
      Table.innerHTML += iterHTML;
      config.ALL.push(iterHTML);
    });
    setTimeout(() => {
      config.brands.forEach(
        (el) =>
          (Brands.innerHTML += `<option class="selector" >${el}</option>`),
      );
    });
  };
  xhr.onerror = () => {
    document.write("Error");
  };
}

function sort(brand) {
  Table.innerHTML = "";
  config.ALL.forEach((el) => {
    if (el.includes(`<td class="fs-4 brand">${brand}</td>`)) {
      Table.innerHTML += el;
    }
  });
}

// SELECTOR
selector.addEventListener("click", function () {
  if (selector.value === config.PrevSelectedBrand) {
    return;
  }
  config.PrevSelectedBrand = selector.value;
  if (selector.value === "ALL") {
    Table.innerHTML = "";
    config.ALL.forEach((el) => {
      Table.innerHTML += el;
    });
    return;
  }
  sort(selector.value);
});
//

buttons.forEach((el) => {
  el.addEventListener("click", () => {
    if (el.textContent == ">") {
      config.page += 1 ? config.page < config.maxpage && config.page >= 1 : {};
      Loadnext();
    } else {
      config.page -= 1 ? config.page <= config.maxpage && config.page > 1 : {};
      Loadnext();
    }
  });
});

function Loadnext() {
  config.brands = [];
  config.ALL = [];
  Brands.innerHTML = '<option class="selector">ALL</option>';
  Table.innerHTML = "";
  LoadProducts((page = config.page));
}
