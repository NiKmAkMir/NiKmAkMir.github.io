import React from 'react'
import Gallery from './components/Gallery'

export default function App() {
  return (
    <div className="page-root">
      <header className="hero">
        <h1 className="title">Digital Dreams</h1>
      </header>

      <main className="container">
        <div className="card">
          <Gallery />
        </div>
      </main>

      <footer className="footer">Made by GeoNTar</footer>
    </div>
  )
}
