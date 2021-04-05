import React, {Fragment, useState} from "react"
import PropTypes from "prop-types"
import unformat from './accounting/unformat'
import Error from './Error'

const Pregunta = ({guardarPresupuesto, guardarRestante, actualizarPregunta}) => {
    //definir cantidad
    const [cantidad, guardarCantidad] = useState(0)
    const [error, guardarError] = useState(false)

    // Funcion que lee el presupuesto
    const definirPresupuesto = (e) => {
        guardarCantidad(unformat(e.target.value))

        /* if(Math.sign(unformat(e.target.value))>0){
            // console.log(unformat(e.target.value))
            guardarCantidad(unformat(e.target.value))
        }else{
            console.log("Define un valor valido")
            guardarCantidad(0)
        } */
        // if(!isNaN(parseFloat(e.target.value))){
        //     console.log(parseFloat(e.target.value))
        // }
    }

    // Submit para definir el presupuesto
    const agregarPresupuesto = (e) => {
        e.preventDefault()

        //Validar
        guardarError(false)
        if(cantidad<1){
            guardarError(true)
            return false;
        }

        //si se pasa la validacion
        guardarPresupuesto(cantidad)
        guardarRestante(cantidad)
        actualizarPregunta(false)
    }


    return (
        <Fragment>
            <h2>Coloca tu presupuesto</h2>

            { error ?
                <Error
                    mensaje="El presupuesto es incorrecto"
                />
            : null
            }

            <form
                onSubmit={agregarPresupuesto}
            >
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Coloca tu presupuesto"
                    onChange={definirPresupuesto}
                />
                <input
                    type="submit"
                    className="button-primary u-full-width"
                    value="Definir presupuesto"
                />
            </form>
        </Fragment>
    )
}

Pregunta.propTypes = {
    guardarPresupuesto:PropTypes.func.isRequired,
    guardarRestante:PropTypes.func.isRequired,
    actualizarPregunta:PropTypes.func.isRequired
}

export default Pregunta