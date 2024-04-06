/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
// import OurPlans from "./OurPlans";
import axios from "axios";
import { getUserDetails } from "./userUtils";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Alluserprofile() {
  const [smShow, setSmShow] = useState(false);
  const [dlc, setDlc] = useState(null);

  const handleClose = () => setSmShow(false);
  const handleShow = (e) => {
    setSmShow(true);
    console.log(e);
    setDlc(e);
  };

  const [error, setErrors] = useState("");
  const userDetails = getUserDetails();
  console.log(userDetails.user_id);
  const headerRef = useRef(null);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [cards, setCards] = useState([]);
  const [isCtn, setIsCtn] = useState(true);

  const handleClick = () => {
    setIsCtn((prevState) => !prevState);
  };

  function deleteprofilebyuser(e) {
    axios
      .post(`/api/users/deleteprofilebyuser/${e}`)
      .then((response) => {
        if (response.data.success) {
          window.location.href = `/home2`;
        } else {
          setErrors("Invalid email or password."); // Display error message
        }
      })
      .catch(() => {
        setErrors("An error occurred. Please try again."); // Display error message
      });
  }

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(
          `/api/users/getprofilebyuser/${userDetails.user_id}`
        )
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
  }, [prevScrollY]);

  return (
    <>
      {cards.map((card) => (
        <div key={card.Pro_id} className="card allusr col-sm">
            {error}
          <div className="text-center mt-4">
            <img src={`/image/salman.jpg`} className="card-img-top" alt="..." />
          </div>
          <div className="card-body">
            <p className="card-text text-white">
              <b>Name</b> : {card.Name}
              {card.Pro_id}
              <br />
              <b>DOB</b> : {card.DOB}
            </p>
            {/* <button onClick={() => toggleWish(card.id)}>
                {card.isWish ? (
                  <i className="fa-solid fa-heart"></i>
                ) : (
                  <i className="fa-regular fa-heart"></i>
                )}
              </button> */}
          </div>

          {/* <div className="card-btn text-center mb-3">
              <Register text="More details.." />
            </div> */}

          <div className="d-flex justify-content-evenly ">
            <div className="card-btn text-center mb-3">
              <Link
                to={`/singleprofile?data=${card.Pro_id}`}
                className={`btn btn-info text-white`}
              >
                More details..
              </Link>
            </div>
            <div className="card-btn text-center mb-3">
              <Button variant="danger" onClick={() => handleShow(card.Pro_id)}>
                Delete
              </Button>
              <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                centered
                aria-labelledby="deleteprofile"
              >
                <Modal.Header closeButton>
                  <Modal.Title>
                    <h4>Are you Sure ?</h4>{" "}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                  <h5 className="text-danger">
                    Warning! You will Lost your data
                  </h5>
                </Modal.Body>
                <Modal.Footer className="d-flex gap-5">
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>

                  <Button
                    variant="primary"
                    className="btn btn-danger"
                    onClick={() => deleteprofilebyuser(dlc)}
                  >
                    Delete Anyways
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      ))}
      {/* react modal */}

      {/* react modal end */}
    </>
  );
}

export { Alluserprofile };
