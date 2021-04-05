// import React, {Fragment, useState} from 'react'
import React, {useState} from 'react'
import PropTypes from 'prop-types'
import unformat from './accounting/unformat'
import Error from './Error'
import shortid from 'shortid'

const Formulario = ({guardarGasto, guardarCrearGasto}) => {

    const [nombre, guardarNombre] = useState('')
    const [cantidad, guardarCantidad] = useState(0)
    const [error, guardarError] = useState(false)

    const agregarGasto = (e) => {
        e.preventDefault()
        guardarError(false)

        //Validar
        guardarCantidad(unformat(cantidad))
        if(cantidad<1 || nombre.trim()===''){
            guardarError(true)
            return false
        }

        //Construir el gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }

        //Pasar el gasto al componente principal
        guardarGasto(gasto)
        guardarCrearGasto(true)

        //Resetear el formulario
        guardarNombre('')
        guardarCantidad(0)

        // console.log(e.target.value)
    }

    return (
        // <Fragment>
            // { error ?
            //     <Error
            //         mensaje="Revise sus La cantidad del gasto es es incorrecto"
            //     />
            // : null
            // }
            <form
                onSubmit={agregarGasto}
            >
                <h2>Agrega tus gasto aqu&iacute;</h2>

                { error ?
                    <Error
                        mensaje="Ambos campos son obligatorios o presupuesto incorrecto"
                    />
                : null
                }

                <div className="campo">
                    <label>Nombre Gasto</label>
                    <input
                        type="text"
                        className="u-full-width"
                        placeholder="Ej. Transporte"
                        value={nombre}
                        onChange={e => guardarNombre(e.target.value)}
                        />
                </div>
                <div className="campo">
                    <label>Cantidad Gasto</label>
                    <input
                        type="number"
                        className="u-full-width"
                        placeholder="Ej. 300"
                        value={cantidad}
                        onChange={e => guardarCantidad(unformat(e.target.value))}
                    />
                </div>

                <input
                    type="submit"
                    className="button-primary u-full-width"
                    value="Agregar Gasto"
                />
            </form>
        // </Fragment>
    )
}

Formulario.propTypes = {
    guardarGasto:PropTypes.func.isRequired,
    guardarCrearGasto:PropTypes.func.isRequired
}

export default Formulario;