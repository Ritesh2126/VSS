/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { getUserDetails } from "./userUtils";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function RecommendationDynamic() {
  const userDetails = getUserDetails();
  const user_id = userDetails.user_id;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  console.log("test check aaa", queryParams.size);

  const [cards, setCards] = useState([
    { id: 1, name: "Rahul Gupta", age: 58, isWish: false, image: "rahul" },
    { id: 2, name: "Salman Gangil", age: 55, isWish: false, image: "salman" },
    { id: 3, name: "Popat Bandil", age: 49, isWish: false, image: "popat" },
  ]);

  const [isCtn, setIsCtn] = useState(true);
  const [errors, setErrors] = useState("");

  const handleClick = () => {
    setIsCtn((prevState) => !prevState);
  };

  //getting data from apis

  React.useEffect(() => {
    const fetchData = () => {
      axios
        .get("/api/users/getrecomdprofile")
        .then((response) => {
          if (response.data.success) {
            setCards(response.data.data);
          } else {
            setErrors("Invalid email or password."); // Display error message
          }
        })
        .catch(() => {
          setErrors("An error occurred. Please try again."); // Display error message
        });
    };
    fetchData();
  }, []);

  const [screenWidth, setscreenWidth] = useState(
    window.innerWidth <= 770 ? 1 : 3
  );

  React.useEffect(() => {
    const handleResize = () => {
      setscreenWidth(window.innerWidth <= 767 ? 1 : 3);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: screenWidth,
    slidesToScroll: 1,
  };

  const toggleWish = (pid) => {
    // setCards((prevCards) =>
    //   prevCards.map((card) =>
    //     card.id === id ? { ...card, isWish: !card.isWish } : card
    //   )
    // );
    const ids = [pid, user_id];
    console.log("check id", ids);
    axios
      .post("/api/users/saveprofile", ids)
      .then((response) => {
        if (response.data.success) {
          console.log(response);
        } else {
          setErrors("Invalid email or password."); // Display error message
        }
      })
      .catch(() => {
        setErrors("An error occurred. Please try again."); // Display error message
      });
  };

  return (
    <div className="mycontainer recom">
      <h3 className="mb-5">Recommendations..</h3>

      {errors}

      <Slider
        {...settings}
        className={`${screenWidth === 1 ? "w-75 ms-5" : ""}`}
      >
        {cards.map((card,i) => (
          <div className="recomCard" key={i}>
            <div className="card col-12 ShowfullCard  border border-2">
              <div className="text-center">
                <img
                  src={`image/user_images.jpg`}
                  className="card-img-top"
                  alt="..."
                />
              </div>
              <div className="card-body d-flex align-items-center justify-content-between">
                <p className="card-text">
                  <b>Name</b> : {card.Name}
                  <br />
                  <b>DOB</b> : {card.DOB}
                </p>
                <a onClick={() => toggleWish(card.Pro_id)}>
                  {card.isWish ? (
                    <i className="fa-solid fa-heart text-danger fa-xl"></i>
                  ) : (
                    <i className="fa-regular fa-heart text-danger fa-xl bg-transparent"></i>
                  )}
                </a>
              </div>

              <div className="card-btn text-center mb-3">
                <Link
                  to={`/singleprofile?data=${card.Pro_id}`}
                  className="btn btn-light"
                  style={{ color: "#B03060" }}
                >
                  More details..
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
