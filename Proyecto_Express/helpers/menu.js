const colors = require("colors");
const inquirer = require("inquirer");
const { validate } = require("uuid");

const preg = [
  {
    type: "list",
    name: "options",
    message: "Escoje la opción de tu preferencia.",
    choices: [
      {
        value: "1",
        name: `${"1.".yellow} Crear Usuario`,
      },
      {
        value: "2",
        name: `${"2.".yellow} Listar Usuarios`,
      },
      {
        value: "3",
        name: `${"3.".yellow} Listar Usuarios Completos`,
      },
      {
        value: "4",
        name: `${"4.".yellow} Listar Usuarios Pendientes`,
      },
      {
        value: "5",
        name: `${"5.".yellow} Completar Usuarios`,
      },
      {
        value: "6",
        name: `${"6.".yellow} Borrar Usuario`,  // Nueva opción
      },
      {
        value: "0",
        name: `${"0.".yellow} Salir`,
      },
    ],
  },
];

const menu = async () => {
  console.clear();
  console.log(
    `${"=".repeat(115)}\n` +
    `${"    Gestionar Usuarios    ".magenta} \n` +
    `${"=".repeat(115)}`
  );

  const { options } = await inquirer.default.prompt(preg);
  return options;
};

const pause = async () => {
  const questions = [
    {
      type: "input",
      name: "enter",
      message: `Presione la tecla ${"enter".green}`,
    },
  ];
  console.log('\n');
  await inquirer.default.prompt(questions);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.lenght === 0) {
          return "Por favor ingrese una descripción";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.default.prompt(question);
  return desc;
};

// Nueva función para completar un usuario
const completarUsuario = async (usuarios) => {
  await usuarios.completarUsuario();
};

// Nueva función para borrar usuario
const borrarUsuario = async (usuarios) => {
  const id = await leerInput("Ingrese el ID del usuario a borrar: ");
  await usuarios.borrarUsuario(id);
};

// Exportar completarUsuario junto con las demás funciones
module.exports = {
  menu,
  pause,
  leerInput,
  borrarUsuario,  // Exporta la función para borrar
  completarUsuario,  // Exporta la función para completar usuario
};
