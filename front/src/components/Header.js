import React from 'react';
import Parallax from 'parallax-js'; // Assurez-vous d'importer la bibliothèque Parallax si vous ne l'avez pas déjà fait
import '../assets/Header.css'
import colonneverttibrale from '../images/colonneverttibrale.jpg';

class Header extends React.Component {
  componentDidMount() {
    if (this.scene) {
      this.parallax = new Parallax(this.scene);
    }
  }
  

  componentWillUnmount() {
    if (this.parallax) {
      this.parallax.destroy();
    }
  }
  render() {
    return (
      <header className="mainHeading">
        <div className="mainHeading__content">
          <Article />
          <Figure />
        </div>
      </header>
    );
  }
}

class Article extends React.Component {
  render() {
    return (
      <article className="mainHeading__text">
        <p className="mainHeading__preTitle">Site Médical</p>
        <h2 className="mainHeading__title">Facilitez l'Analyse des IRM et l'Extraction de la Colonne Vertébrale</h2>
        <p className="mainHeading__description">
          Notre site offre des outils avancés pour fragmenter les images IRM et extraire efficacement la colonne vertébrale, simplifiant ainsi le diagnostic des conditions médicales complexes.
        </p>
        <button className="cta">En savoir plus</button>
      </article>
    );
  }
}




class Figure extends React.Component {
  render() {
    return (
      <figure className="mainHeading__image" ref={el => (this.scene = el)}>
        <img src={colonneverttibrale} alt="" />
      </figure>
    );
  }
}

export default Header;
