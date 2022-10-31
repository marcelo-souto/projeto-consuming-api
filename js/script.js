fetch('https://server-marcelo676.herokuapp.com/products/list')
  .then((response) => response.json())
  .then((json) => seeJson(json));

const calculateCredit = (price) => {
  const parcels = price > 500 ? 12 : 6;
  return `${parcels}x de ${(price / parcels).toFixed(2)} no cartão`;
};

const seeJson = (products) => {
  const productsArea = document.querySelector('.products');

  products.map(({ id, image, name, price, credit }) => {

    const product_demo = document
      .querySelector('.model .product')
      .cloneNode(true);
    const priceTreated = Number(price.replace('R$ ', '')).toFixed(2);

    product_demo.setAttribute('data-product', id);
    product_demo.querySelector('.product-image img').src = image;
    product_demo.querySelector('.product-name').innerText = name;
    product_demo.querySelector('.product-prev-price').innerText =
      'R$ ' + (priceTreated * 1.05).toFixed(2);
    product_demo.querySelector('.product-price').innerText = price;
    product_demo.querySelector('.product-payments-methods').innerText = credit ? calculateCredit(priceTreated) : `À vista`

    product_demo.addEventListener('click', () => {
      window.location = `./product.html?product=${id}`
    })

    productsArea.append(product_demo);
  });
};
