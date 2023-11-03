inputPostNombre.value;
inputPostApellido.value;
inputPutId.value;
inputDelete.value;
inputPutNombre.value;
inputPutApellido.value;

//variables traidas por id
const urlUsers = "https://65451be45a0b4b04436da443.mockapi.io/users/";
const buscarBtn = document.getElementById("btnGet1");
const agregarBtn = document.getElementById("btnPost");
const modificarBtn = document.getElementById("btnPut");
const eliminarBtn = document.getElementById("btnDelete");
const resultado = document.getElementById("results");
const modal = document.getElementById("dataModal");
const guardarCambiosBtn = document.getElementById("btnSendChanges");
const alertaForm = document.getElementById("alert-error");

function alertaError() {
  setTimeout(() => {
    alertaForm.classList.add("show");
  }, 7000);
}

async function mostrarObjetos(id) {
  try {
    const resMostrar = await fetch(urlUsers + id);
    const data = await resMostrar.json();

    resultado.innerHTML = "";
    if (id.trim() == "") {
      data.forEach((element) => {
        resultado.innerHTML += `
              <p>ID: ${element.id}</p>
              <p>NAME: ${element.name}</p>
              <p>LASTNAME: ${element.lastname}</p>
          `;
      });
    } else {
      resultado.innerHTML += `
          <p>ID: ${data.id}</p>
          <p>NAME: ${data.name}</p>
          <p>LASTNAME: ${data.lastname}</p>
      `;
    }
  } catch (error) {
    console.log("cualquier cosa");
    alertaError();
  }
}

//método get, obtenemos los datos en lista o por id
buscarBtn.addEventListener("click", async () => {
  mostrarObjetos(inputGet1Id.value);
});

//verificación de los imput con valores para poder agregar un elemento nuevo
[inputPostNombre, inputPostApellido].forEach((input) =>
  input.addEventListener("input", () => {
    if (
      inputPostNombre.value.trim() != "" &&
      inputPostApellido.value.trim() != ""
    ) {
      agregarBtn.disabled = false;
    } else {
      agregarBtn.disabled = true;
    }
  })
);

//método post
agregarBtn.addEventListener("click", async () => {
  const resAgregar = await fetch(urlUsers, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: inputPostNombre.value,
      lastname: inputPostApellido.value,
    }),
  });
  mostrarObjetos("");
});

//verificación del campo completo para poder modificar
inputPutId.addEventListener("input", () => {
  modificarBtn.disabled = inputPutId.value.trim() == "";
});

//evento en el botón que abre modal con los valores precargados
modificarBtn.addEventListener("click", async () => {
  const resMostrar = await fetch(urlUsers + inputPutId.value);
  const data = await resMostrar.json();

  inputPutNombre.value = data.name;
  inputPutApellido.value = data.lastname;
});

//verificacion que los campos del modal no esten vacios
[inputPutNombre, inputPutApellido].forEach((input) =>
  input.addEventListener("input", () => {
    if (
      inputPutNombre.value.trim() != "" &&
      inputPutApellido.value.trim() != ""
    ) {
      guardarCambiosBtn.disabled = false;
    } else {
      guardarCambiosBtn.disabled = true;
    }
  })
);

//método put en el modal que modifica los valores
guardarCambiosBtn.addEventListener("click", async () => {
  const resModificar = await fetch(urlUsers + inputPutId.value, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: inputPutNombre.value,
      lastname: inputPutApellido.value,
    }),
  });
  mostrarObjetos("");
});

//verificacion del campo completo para poder eliminar
inputDelete.addEventListener("input", () => {
  eliminarBtn.disabled = inputDelete.value.trim() == "";
});

//método delete
eliminarBtn.addEventListener("click", async () => {
  const resEliminar = await fetch(urlUsers + inputDelete.value, {
    method: "DELETE",
  });
  mostrarObjetos("");
});
