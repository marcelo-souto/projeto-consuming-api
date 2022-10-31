import { run, showError } from './modules/input.js';

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

async function checkUser(email, cpf) {
  const req = await fetch(
    'https://server-marcelo676.herokuapp.com/sellers/list',
  );
  const json = await req.json();

  let status = true;

  await json.map((user) => {
    if (user.email === email || user.cpf === cpf) {
      status = false;
    }
  });

  return status;
}

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
    checkUser(inputs[1].value, inputs[2].value).then((response) => {
      if (response) {
        const user = new User(
          inputs[0].value,
          inputs[1].value,
          inputs[2].value,
          inputs[3].value,
        );

        fetch('https://server-marcelo676.herokuapp.com/sellers/create', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(user),
        }).then(response => response.status === 201 && (window.location.href = './login.html'))

        
      } else {
        showError(inputs[1], 'Usuario já existe', 1)
        showError(inputs[2], 'usuario já existe', 2)

      }
    });
  }
});
