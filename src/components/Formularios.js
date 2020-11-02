import React, { Fragment, useState } from "react";

import { v4 as uuidv4 } from "uuid";

const Formulario = ({ crearCita }) => {
  //Crear State de citas
  const [cita, actualizarCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  const [error, actualizarError] = useState({
    estado: false,
    campo: "",
  });

  const errorFormulario = (estado, campo) => {
    actualizarError({
      estado: estado,
      campo: campo,
    });
  };
  const { estado, campo } = error;
  //funcion para saber que campo contiene el error

  //funcion que se ejeuta cada vez que escribe
  const actualizarState = (e) => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  const { mascota, propietario, fecha, hora, sintomas } = cita;

  const submitCita = (e) => {
    e.preventDefault();
    errorFormulario(false, "");
    //Validamos
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      errorFormulario(true, "Error de formulario  ");
      return;
    }
    //Asignamos id
    cita.id = uuidv4();

    //Crear la cita
    crearCita(cita);
    //REiniciar el form
    actualizarCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  return (
    <Fragment>
      {estado ? (
        <p className="alerta-error">
          Todos los campos son obligatorios, {campo}
        </p>
      ) : null}
      <form onSubmit={submitCita}>
        <label>Nombre de mascotas</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Mascota"
          onChange={actualizarState}
          value={mascota}
        />

        <label>Nombre de dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre del dueño de Mascota"
          onChange={actualizarState}
          value={propietario}
        />

        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />

        <label>Sintomas</label>
        <textarea
          type="text"
          name="sintomas"
          className="u-full-width"
          placeholder="Describa los sintomas presentados"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>
        <button type="submit" className="u-full-width button-primary">
          Agregar cita
        </button>
      </form>
    </Fragment>
  );
};

export default Formulario;
