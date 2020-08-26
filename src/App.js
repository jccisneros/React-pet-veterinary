import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario.js';
import Cita from './components/Cita.js';

function App() {

  let citasIniciales = JSON.parse(localStorage.getItem('citas'));

  if(!citasIniciales){
    citasIniciales = [];
  }

  const [citas, guardarCitas] = useState(citasIniciales);

  useEffect( () => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales]);

  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ])
  }
  
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }
  
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administrar Citas';

  return (
    <>    
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {}
            {citas.map( cita => (
              <Cita
                key={cita.id}
                cita = {cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </>    
  );
}

export default App;