import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Recommendation() {
  const [screenWidth, setscreenWidth] = useState(
    window.innerWidth <= 770 ? 1 : 3
  );

  useEffect(() => {
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

  const [cards, setCards] = useState([
    { id: 1, name: "Rahul Gupta", age: 58, isWish: false, image: "rahul" },
    { id: 2, name: "Salman Gangil", age: 55, isWish: false, image: "salman" },
    { id: 3, name: "Popat Bandil", age: 49, isWish: false, image: "popat" },
  ]);

  // getting data from apis

  const [error , setErrors] = useState("");

  useEffect(() => {
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

  const [mywish, setmywish] = useState({ wish: false, id: null });

  const toggleWish = (myid) => {
    setmywish((prev) => ({
      wish: prev.id === myid ? !prev.wish : true,
      id: myid,
    }));
  };

  return (
    <div className="mycontainer recom">
      
      <h1>{error}</h1>

      <h3 className="mb-5">Recommendations..</h3>

      <Slider
        {...settings}
        className={`${screenWidth === 1 ? "w-75 ms-5" : ""}`}
      >
        {cards.map((card) => (
          <div key={card.Pro_id} className="recomCard">
            <div className="card col-12 ShowfullCard  border border-2">
              <div className="text-center">
                <img
                  src={`image/user_images.jpg`}
                  className="card-img-top"
                  alt="..."
                />
              </div>
              <div className="card-body  d-flex align-items-center justify-content-between">
                <p className="card-text">
                  <b>Name</b> : {card.Name}
                  <br />
                  <b>DOB</b> : {card.DOB}
                </p>
                <a onClick={() => toggleWish(card.Pro_id)}>
                  {mywish.wish && mywish.id === card.Pro_id ? (
                    <i className="fa-solid fa-heart text-white"></i>
                  ) : (
                    <i className="fa-regular fa-heart  text-white"></i>
                  )}
                </a>
              </div>

              <div className="card-btn text-center mb-3">
                <Link
                  to="/register"
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

export default Recommendation;
