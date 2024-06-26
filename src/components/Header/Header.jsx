import React from 'react'

function Header() {
  return (
    <nav className="navbar navbar-dark navbar-expand-md bg-dark">
      <a className="navbar-brand" href="#">Tutorials</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
          <a className="nav-item nav-link" href="#">0o0</a>
        </div>
      </div>
    </nav>
  )
}

export default Header