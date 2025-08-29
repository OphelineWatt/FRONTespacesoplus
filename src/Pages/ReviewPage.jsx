import { Button, Card, Form } from "react-bootstrap";
import ReviewModal from "../Components/ReviewModal";
import { useEffect, useState } from "react";
import {
  deleteReviews,
  reviewsPlace,
  updateReviews,
} from "../Services/reviewServices";
import { useParams, useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { jwtDecode } from "jwt-decode";
import { checkToken } from "../Services/authService";

const ReviewPage = () => {
  const [showModalReview, setShowModalReview] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const { place_id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(checkToken());

  let admin = "";
  let idUser = "";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      admin = decoded.admin;
      idUser = decoded.idUser;
    } catch (e) {
      console.error("Token invalide", e);
    }
  }

  const fetchReviews = async () => {
    try {
      const response = await reviewsPlace(place_id);
      setReviews(response.data);
    } catch (error) {
      console.error("Erreur récupération des avis:", error);
    }
  };

  const handleDelete = async (idReviews) => {
    try {
      await deleteReviews(idReviews);
      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (review) => {
    setEditingId(review.id_reviews);
    setEditedText(review.text);
  };

  const handleSaveEdit = async (idReviews) => {
    try {
      await updateReviews(idReviews, { text: editedText });
      setEditingId(null);
      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
    setIsLoggedIn(checkToken());
  }, []);

  return (
    <div className="container mt-2">
      {/* Croix de fermeture */}
      <div className="position-absolute top-0 end-0 m-2">
        <Button
          variant="link"
          size="sm"
          onClick={() => navigate(-1)}
          className="p-0 text-dark"
          title="Retour"
        >
          <i className="bi bi-x-lg fs-5"></i>
        </Button>
      </div>
      {/* Bouton d'ajout d'avis */}
      {isLoggedIn && (
        <div className="text-center my-3">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowModalReview(true)}
          >
            <i className="bi bi-chat-left-text me-2"></i>Donne ton avis
          </Button>
        </div>
      )}

      {/* Liste des avis */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <Card key={review.id_reviews} className="mb-3 shadow-sm">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Utilisateur :</strong> {review.username} <br />
                    <strong>Note :</strong> {review.rating} <br />
                    <strong>Date :</strong> {review.date} <br />
                    <strong>Commentaire :</strong>
                    {editingId === review.id_reviews ? (
                      <>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                          className="mt-2"
                        />
                      </>
                    ) : (
                      <p className="mt-2 text-break">{review.text}</p>
                    )}
                    {/* Boutons plus petits et côte à côte */}
                    <div className="d-flex justify-content-end gap-1 mt-2 flex-wrap">
                      {(admin === 1 || idUser === review.user_id) && (
                        <>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(review.id_reviews)}
                            title="Supprimer"
                          >
                            Supprimer <i className="bi bi-trash"></i>
                          </Button>
                          {editingId === review.id_reviews ? (
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => handleSaveEdit(review.id_reviews)}
                              title="Sauvegarder"
                            >
                              <i className="bi bi-check-lg"></i>
                            </Button>
                          ) : (
                            <Button
                              variant="primary" // bouton bleu
                              size="sm"
                              onClick={() => handleEditClick(review)}
                              title="Modifier"
                            >
                              Modifier <i className="bi bi-pencil-square"></i>
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            ))
          ) : (
            <p className="text-muted text-center">
              Aucune contribution pour le moment.
            </p>
          )}
        </div>
      </div>

      <ReviewModal
        show={showModalReview}
        onHide={() => setShowModalReview(false)}
      />
    </div>
  );
};

export default ReviewPage;
