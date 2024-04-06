import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getUserDetails } from "./userUtils";
import { Header2 } from "./Header";

export default function Saveprofile() {
  const userDetails = getUserDetails();
  const user_id = userDetails.user_id;
  console.log(userDetails.user_id);
  const [cards, setCards] = useState([]);

  

  //getting data from apis

  const [error, setErrors] = useState("");

  React.useEffect(() => {
    const fetchData = () => {
      axios
        .get(`/api/users/getsaveprofile?user_id=${user_id}`)
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

  const toggleWish = (pid) => {
    // setCards((prevCards) =>
    //   prevCards.map((card) =>
    //     card.id === id ? { ...card, isWish: !card.isWish } : card
    //   )
    // );
    const ids = [pid, user_id];
    console.log("check id", ids);
    axios
      .post("/api/users/unsaveprofile", ids)
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
    <>
      <Header2 showAnimation2={false} mybgclass2="#b03060" />

      <div className="mycontainer recom h2r">
        <h3 className="mb-2">Your Favourite Profiles</h3>
        <div className="col-12 rcom2 row">
          {error}
          {cards.map((card) => (
            <div
              className="recomCard mb-5  col-lg-4 col-md-6 col-sm-8 kps "
              key={card.id}
            >
             
                <div className="card ShowfullCard border w-100">
                  <div className="text-center">
                    <img
                      src={`image/${card.image}.jpg`}
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
        </div>
      </div>
    </>
  );
}
