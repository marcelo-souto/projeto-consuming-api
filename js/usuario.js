const userId = window.location.search.replace('?user=', '');

let data = null;
function setData(response) {
  data = response;
}

fetch(
  `https://fake-server-company.herokuapp.com/sellers/${userId}?_embed=products`,
)
  .then((res) => res.json())
  .then((json) => setData(json))
  .then(() => seeJson(data));

class Product {
  constructor(name, price, image, description, credit, sellerId) {
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description;
    this.credit = credit;
    this.sellerId = sellerId;
  }
}

const seeJson = (user) => {
  const productsArea = document.querySelector('.products-painel');

  document.querySelector('.user-name').innerHTML = user.name;
  document.querySelector('.user-email').innerHTML = user.email;
  document.querySelector('.user-cpf').innerHTML = user.cpf;
  document.querySelector('.user-senha').innerHTML = user.password;

  user.products.map(({ id, image, name, price, credit }) => {
    const product_demo = document
      .querySelector('.model .product')
      .cloneNode(true);

    product_demo.setAttribute('data-product', id);
    product_demo.querySelector('.product-image img').src = image;
    product_demo.querySelector('.product-image-src').value = image;
    product_demo.querySelector('.product-name').value = name;
    product_demo.querySelector('.product-price').value = Number(
      price.replace('R$ ', ''),
    ).toFixed(2);

    product_demo.querySelector('.credit-options',).innerHTML = 
      `<input type="radio" id="yes${id}" name="debit${id}" value="true" checked/>
      <label for="yes${id}">Sim</label>
      <input type="radio" id="nao${id}" name="debit${id}" value="false"/>
      <label for="nao${id}">Não</label>`;

    product_demo.querySelector(`input[value="${credit}"]`).checked = true

    const inputs = product_demo.querySelectorAll('input');
    product_demo.querySelector('.btn-editar').addEventListener('click', (e) => {
      const el = e.target;

      if (el.classList.contains('ativo')) {
        console.log(document.querySelector('#name').value)
      }

      el.innerText = 'Enviar';
      el.classList.add('ativo');

      inputs.forEach((input) => (input.disabled = false));
    });

    productsArea.append(product_demo);
  });
};
