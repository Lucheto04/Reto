let tabla = document.querySelector('#crud-table');
let form = document.querySelector('.miFormulario');
let template = document.querySelector('#crud-template');
let fragment = document.createDocumentFragment();
fetch("http://localhost:5000/reclutas")
    .then(result => result.json())
    .then(data => {
        console.log(data);
        data.forEach(data => {
            template.querySelector('.nombre').textContent = data.nombre;
            template.querySelector('.documentoIdentidad').textContent = data.documento;
            template.querySelector('.edad').textContent = data.edad;
            template.querySelector('.telefono').textContent = data.telefono;
            template.querySelector('.email').textContent = data.email;
            template.querySelector('.direccion').textContent = data.direccion;
            template.querySelector('.fechaNacimiento').textContent = data.fechaNacimiento;
            template.querySelector('.fechaIngreso').textContent = data.fechaIngreso;
            template.querySelector('.team').textContent = data.teamsID;
            let clone = document.importNode(template, true);
            fragment.appendChild(clone);
        })
        tabla.querySelector("tbody").appendChild(fragment)
    })
    .catch((err) => {
        console.log("Error al consumir la API\n", err.message);
    })
    .finally(() => {
        console.log("Se ha consumido todo el API");
    })
document.addEventListener("submit", e => {
    if (e.target === form) {
        e.preventDefault();
        if (!e.target.id.value) {
                let options = {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify({
                        documento: e.target.documento.value,
                        nombre: e.target.nombre.value,
                        edad: e.target.edad.value,
                        telefono: e.target.telefono.value,
                        email: e.target.email.value,
                        direccion: e.target.direccion.value,
                        fechaNacimiento: e.target.fechaNacimiento.value,
                        fechaIngreso: e.target.fechaIngreso.value,
                        teamsID: e.target.team.value,
                    })
                }
                fetch("http://localhost:5000/reclutas", options)
                .then(result => result.json())
                .then(data => {
                    console.log("hola");
                    console.log(data);
                })
            .catch((err) => {
                let message = err.statusText || "Ocurrió un error";
                form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
            })
            .finally(() => {
                console.log("Se ha consumido todo el API");
            })
        }
    }  
});
