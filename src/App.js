import React, { useEffect, useState } from 'react';
import './App.css';
import { Tmdb } from './Tmdb';
import MovieRow from './components/movie_row';
import FeaturedMovie from './components/featured_movie';
import Header from './components/header/';

export default function App() {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o Featured
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      window.scrollY > 20 ? setBlackHeader(true) : setBlackHeader(false);
    };

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />

      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        <p>Site desenvolvido na video-aula da B7Web</p>
        <p>Dados pegos do site <a href="https://www.themoviedb.org/">Themoviedb.org</a></p>
      </footer>
    </div>
  );
}
