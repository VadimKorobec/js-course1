"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const movieDB = {
    movies: [
      "Логан",
      "Лига справедливости",
      "Ла-ла лэнд",
      "Одержимость",
      "Скотт Пилигрим против...",
    ],
  };

  const adv = document.querySelectorAll(".promo__adv img");
  const poster = document.querySelector(".promo__bg");
  const genre = document.querySelector(".promo__genre");
  const movieList = document.querySelector(".promo__interactive-list");
  const addForm = document.querySelector("form.add");
  const addInput = document.querySelector(".adding__input");
  const checkbox = addForm.querySelector("[type='checkbox']");

  addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let newFilm = addInput.value.trim();
    const favorite = checkbox.checked;

    if (newFilm) {
      if (newFilm.length > 21) {
        newFilm = `${newFilm.slice(0, 21)}...`;
      }

      if (favorite) {
        console.log("Add favorite movie");
      }
      movieDB.movies.push(newFilm);
      sortArr(movieDB.movies);
      createMovieList(movieDB.movies, movieList);
    }
    e.target.reset();
  });

  const deleteAdv = (arr) => {
    arr.forEach((item) => item.remove());
  };

  deleteAdv(adv);

  const makeChanges = () => {
    genre.textContent = "драма";
    poster.style.backgroundImage = "url('img/bg.jpg')";
  };

  makeChanges();

  const sortArr = (arr) => {
    arr.sort();
  };

  function createMovieList(films, parent) {
    parent.innerHTML = "";
    sortArr(films);

    films.forEach(
      (film, i) =>
        (parent.innerHTML += `
    <li class="promo__interactive-item">
     ${i + 1} ${film}
     <div class="delete"></div>
     </li>`)
    );

    document.querySelectorAll(".delete").forEach((btn, i) => {
      btn.addEventListener("click", () => {
        btn.parentElement.remove();
        movieDB.movies.splice(i, 1);

        createMovieList(films, parent);
      });
    });
  }

  createMovieList(movieDB.movies, movieList);
});
