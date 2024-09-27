import React from 'react'
import errorPizza from '../assets/images/error.png';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div className="container px-5">
      <div className="text-center">
        <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">


          <Image src={errorPizza} alt="Error 404" width="300" height="300" />

        </h2>
        <h3 className="h2 mb-2">Oops!</h3>
        <p className="mb-5">La página que buscas no fue encontrada.</p>
        <Link className="btn bsb-btn-5xl btn-dark rounded-pill px-5 fs-6 m-0" to="/" role="button">Regresar al Home</Link>
      </div>
    </div>
  )
}

export default NotFound