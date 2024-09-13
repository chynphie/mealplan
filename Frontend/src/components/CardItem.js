import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  return (
    <>
      <div
        className="card-list-container"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="cards__item">
          <Link className="cards__item__link" to={props.path}>
            <figure
              className="cards__item__pic-wrap"
              data-category={props.label}
            >
              <img
                className="cards__item__img"
                alt="Travel Image"
                src={props.src}
              />
            </figure>
            <div className="cards__item__info">
              <h5 className="cards__item__text">{props.text}</h5>
            </div>
          </Link>
        </div>
        <div>
          <p>{props.hoverItems}</p>
        </div>
        <ul class="list-group list-group-flush" style={{ right: "250px" }}>
          <li class="list-group-item">An item</li>
          <li class="list-group-item">A second item</li>
          <li class="list-group-item">A third item</li>
          <li class="list-group-item">A fourth item</li>
          <li class="list-group-item">And a fifth one</li>
        </ul>
      </div>
    </>
  );
}

export default CardItem; 