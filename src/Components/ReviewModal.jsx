import { Modal, Form, Button } from "react-bootstrap";
import { addReview } from "../Services/reviewServices";
import { useParams } from "react-router-dom";
import { useState } from "react";

const ReviewModal = ({ show, onHide }) => {
  const { place_id } = useParams();

  const [review, setReview] = useState({
    text: "",
    rating: "",
  });

  const handleCreateReview = async (e) => {
    e.preventDefault();

    const payload = {
      text: review.text,
      rating: review.rating ,
      place_id,
    };

    try {
      await addReview(payload);
      location.reload()
      onHide();
    } catch (error) {
      console.error("Error add review", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleCreateReview}>
        <Modal.Header closeButton>
          <Modal.Title>Ajout d'un avis</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Note :</Form.Label>
            <Form.Select
              value={review.rating}
              onChange={(e) => setReview({ ...review, rating: e.target.value })}
              required
            >
              <option value="">Choisissez une note</option>
              <option value="1">1 - Très mauvais</option>
              <option value="2">2 - Mauvais</option>
              <option value="3">3 - Moyen</option>
              <option value="4">4 - Bon</option>
              <option value="5">5 - Excellent</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Commentaire :</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={review.text}
              onChange={(e) => setReview({ ...review, text: e.target.value })}
              placeholder="Votre avis sur ce lieu..."
              required
            />
          </Form.Group>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Annuler
          </Button>
          <Button type="submit" variant="primary">
            Enregistrer
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ReviewModal;
