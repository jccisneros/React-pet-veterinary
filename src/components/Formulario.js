import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid';

const Formulario = ({crearCita}) => {

  const [cita, actualizarCita] = useState({
    mascota: '',
    dueño: '',
    fecha: '',
    hora: '',
    sintomas: ''
  });

  const [error, actualizarError] = useState(false);

  const handleChange = e => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value
    })
    return;
  }

  const {mascota, dueño, fecha, hora, sintomas} = cita;

  const submitCita = e => {
    e.preventDefault();

    //validar    
    if( mascota.trim() === '' || dueño.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
      actualizarError(true);      
      return;
    }

    actualizarError(false);

    //asignarId
    cita.id = uuidv4();

    //CrearLaCita
    crearCita(cita);

    //ReinicarElForm
    actualizarCita({
      mascota: '',
      dueño: '',
      fecha: '',
      hora: '',
      sintomas: ''
    })
  }

  

  return (
    <>
      <h2>Crear Cita</h2>

      { error ? <p className="alerta-error">Debe llenar todos los campos</p> : null }
      <form>
        <label htmlFor="mascota">Nombre de la mascota</label>
        <input 
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Ingrese el nombre de la mascota"
          onChange={handleChange}
          value={mascota}
        />
        <label htmlFor="dueño">Nombre del dueño</label>
        <input 
          type="text"
          name="dueño"
          className="u-full-width"
          placeholder="Ingrese el nombre del dueño"
          onChange={handleChange}
          value={dueño}
        />
        <label htmlFor="fecha">Fecha</label>
        <input 
          type="date"
          name="fecha"
          className="u-full-width"          
          onChange={handleChange}
          value={fecha}
        />
        <label htmlFor="hora">Hora</label>
        <input 
          type="time"
          name="hora"
          className="u-full-width"          
          onChange={handleChange}
          value={hora}
        />
        <label htmlFor="sintomas">Sintomas</label>
        <textarea 
          name="sintomas"
          className="u-full-width"     
          placeholder="Sintomas de la mascota"     
          onChange={handleChange}
          value={sintomas}
        ></textarea>
        <button 
          type="submit"
          className="u-full-width button-primary"          
          onClick={submitCita}
        >Agregar cita</button>
      </form>
    </>
  )
}

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default Formulario