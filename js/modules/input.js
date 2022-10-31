export const run = (input, indice) => {
  clearErrors(input, indice);

  let check = checkInput(input);
  if (check !== true) {
    showError(input, check, indice);
  } else {
    return check;
  }
};

export const checkInput = (input) => {
  let rules = input.getAttribute('data-rules');

  if (rules !== null) {
    rules = rules.split(' ');

    for (let rule in rules) {
      let ruleDetails = rules[rule].split('=');

      switch (ruleDetails[0]) {
        case 'required':
          if (input.value == '') {
            return `Campo Vazio`;
          }
          break;
        case 'min':
          if (input.value.length < ruleDetails[1]) {
            return `Obrigatorio pelo menos ${ruleDetails[1]} caracteres.`;
          }
          break;
        case 'email':
          if (input.value !== '') {
            if (
              !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(
                input.value.toLowerCase(),
              )
            ) {
              return `Insira um email válido.`;
            }
          }
          break;
        case 'cpf':
          if (
            !/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/gi.test(
              input.value,
            )
          ) {
            return `Insira um CPF válido`
          }
            break;
        case 'html':
          if (!/<[^\/].*?>/gi.test(input.value)) {
            return `Insira um código html válido.`;
          }
          break;
        case 'css':
          if (!/.*?\{+?\n*?.*?\n*?\}+?/gi.test(input.value)) {
            return `Insira um código css válido.`;
          }
          break;
      }
    }
  }

  return true;
};

export const showError = (input, erro, indice) => {
  input.classList.add('invalido');

  let elementError = document.querySelectorAll('.invalid-feedback')[indice];

  elementError.innerHTML = erro;
};

export const clearErrors = (input, indice) => {
  input.classList.remove('invalido');
  let elementError = document.querySelectorAll('.invalid-feedback')[indice];

  if (elementError) {
    elementError.innerHTML = '';
  }
};
