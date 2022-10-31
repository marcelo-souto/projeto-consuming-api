import { run, showError } from './modules/input.js';

const btn = document.querySelector("[type='submit']");
const inputs = document.querySelectorAll('input');
let apertou = false;

async function authUser(email, senha) {
  const req = await fetch(
    'https://server-marcelo676.herokuapp.com/sellers/list',
  );
  const json = await req.json();

  let id = null;

  await json.map((user) => {
    if (user.email === email && user.password === senha) {
      id = user.id
    }
  });

  return id;
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
    authUser(inputs[0].value, inputs[1].value).then((response) => {
      if (response) {
        window.location.href = `./usuario.html?user=${response}`;
      } else {
        showError(inputs[0], 'Usuario ou senha invalido', 0);
        showError(inputs[1], 'Usuario ou senha invalido', 1);
      }
    });
  }
});
