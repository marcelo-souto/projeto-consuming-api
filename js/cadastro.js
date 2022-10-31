import { run } from './modules/input.js';

const btn = document.querySelector("[type='submit']");
const inputs = document.querySelectorAll('input');
let apertou = false;

class User {
  constructor(name, email, cpf, password) {
    this.name = name;
    this.email = email;
    this.cpf = cpf;
    this.password = password;
  }
}

inputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    if (apertou) {
      run(input, index);
    }
  });
});

btn.addEventListener('click', (e) => {
  e.preventDefault();
  apertou = true;
  let status = true;

  for (let i = 0; i < inputs.length; i++) {
    if (!run(inputs[i], i)) {
      status = false;
    }
  }

  if (status) {
    const user = new User(
      inputs[0].value,
      inputs[1].value,
      inputs[2].value,
      inputs[3].value,
    );

    console.log(user);

    fetch('https://server-marcelo676.herokuapp.com/sellers/create', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }
});
