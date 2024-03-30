const config = {
  brands: [],
  ALL: [],
  PrevSelectedBrand: "ALL",
};

const Table = document.getElementById("main-table");
const Brands = document.querySelector(".form-select");
const selector = document.getElementById("ALL");
// const PriceRegulator = document.querySelectorAll(".PriceRegulator");
// LOADING DATA FROM API
Init();
//

function Init() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.everrest.educata.dev/shop/products/all");
  xhr.send();
  xhr.onload = () => {
    const products = JSON.parse(xhr.responseText).products;
    products.forEach((el) => {
      if (!config.brands.includes(el.brand)) {
        config.brands.push(el.brand);
      }
      const iterHTML = `    <tr class="product">
        <td  class="fs-5 text-wrap title" style="width: 10rem;">${el.title}</td>
        <td class="fs-4 brand">${el.brand}</td>
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
function sort(brand) {
  Table.innerHTML = "";
  config.ALL.forEach((el) => {
    if (el.includes(`<td class="fs-4 brand">${brand}</td>`)) {
      Table.innerHTML += el;
    }
  });
}
//
// PriceRegulator.forEach((el) =>
//   el.addEventListener("keyup", (event) => {
//     if (event.key === "Enter") {
//       SortByPrice();
//     }
//   }),
// );
// function SortByPrice() {
//   const min = document.getElementById("MinPrice");
//   const max = document.getElementById("MaxPrice");
//   const trs = document.querySelectorAll(".product");
//   trs.forEach((el) => {
//     const price = el.querySelector(".price").text.slice(0, -1);
//     if (min <= price && price >= max) {
//       Table.innerHTML += el;
//     }
//   });
// }
