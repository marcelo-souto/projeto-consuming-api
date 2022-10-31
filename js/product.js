const id = window.location.search.replace('?product=', '');

fetch(`https://fake-server-company.herokuapp.com/products/${id}?_expand=seller`)
  .then((response) => response.json())
  .then((json) => seeJson(json));

const calculateCredit = (price) => {
  const parcels = price > 500 ? 12 : 6;
  return `${parcels}x de ${(price / parcels).toFixed(2)} no cartão`;
};

const seeJson = ({ id, image, name, price, credit, description, seller }) => {
  console.log();
  const priceTreated = Number(price.replace('R$ ', '')).toFixed(2);

  document.querySelector(
    '.product-image',
  ).style.backgroundImage = `url('${image}')`;
  document.querySelector(
    '.product-seller',
  ).innerText = `Vendido e entregue por ${seller.name}`;
  document
    .querySelectorAll('.product-name')
    .forEach((i) => (i.innerText = name));
  document.querySelector('.product-prev-price').innerText =
    'R$ ' + (priceTreated * 1.05).toFixed(2);
  document.querySelector('.product-price').innerText = price;
  document.querySelector('.product-payments-methods').innerText = credit
    ? calculateCredit(priceTreated)
    : `À vista`;
  document.querySelector('.product-description').innerText = description;
};
