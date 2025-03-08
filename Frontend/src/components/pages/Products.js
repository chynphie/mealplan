import React, { useState } from "react";
import "../../App.css";
// import { Button, Icon } from 'semantic-ui-react';
import "../Cards.css";
import CardItem from "../CardItem";
import Button from "react-bootstrap/Button";
import Fade from "react-bootstrap/Fade";

const cardItems = [
  {
    src: "images/img-1.jpg",
    text: "Explore the hidden waterfall deep inside the Amazon Jungle",
    label: "Adventure",
    hoverItems: "hihi",
  },
  {
    src: "images/img-2.jpg",
    text: "Travel through the Islands of Bali in a Private Cruise",
    label: "Luxury",
    hoverItems: ["Item 1", "Item 2", "Item 3"],
  },
  {
    src: "images/img-3.jpg",
    text: "Set Sail in the Atlantic Ocean visiting Uncharted Waters",
    label: "Mystery",
    hoverItems: ["Item 1", "Item 2", "Item 3"],
  },
  {
    src: "images/img-4.jpg",
    text: "Set Sail in the Atlantic Ocean visiting Uncharted Waters",
    label: "Mystery",
    hoverItems: ["Item 1", "Item 2", "Item 3"],
  },
  {
    src: "images/img-5.jpg",
    text: "Set Sail in the Atlantic Ocean visiting Uncharted Waters",
    label: "Mystery",
    hoverItems: ["Item 1", "Item 2", "Item 3"],
  },
];

const Product = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [contentView, setContentView] = useState("");
  const [open, setOpen] = useState(false);

  const handleButtonClick = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cardItems.length);
    setContentView(
      <div style={{ textAlign: "center" }}>
        <CardItem
          src={cardItems[currentCardIndex].src}
          text={cardItems[currentCardIndex].text}
          label={cardItems[currentCardIndex].label}
          path={cardItems[currentCardIndex].path}
          hoverItems={cardItems[currentCardIndex].hoverItems}
        />
      </div>
    );
  };

  return (
    <>
      {/*<div style={{ position: 'absolute', left: '250px', top: '50%', transform: 'translateY(-50%)' }}>
           <Button animated='fade' onClick={ handleButtonClick}>
            <Button.Content visible>Select Your Meal!</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow right' />
            </Button.Content>
          </Button> */}
      <div style={{ position: "absolute", left: "250px" }}>
      <button type="button" class="btn btn-outline-info btn-lg"
          onClick={() => {
            handleButtonClick();
            setOpen(true);
          }}
          aria-controls="example-fade-text"
          aria-expanded={open}
        >
          Select your meal!
        </button>
      </div>

      <Fade in={true}>
        <div id="example-fade-text">{contentView}</div>
      </Fade>

      {/* </div> */}
    </>
  );
};

const Products = () => {
  return (
    <div className="products">
      <Product />
    </div>
  );
};

export default Products;
