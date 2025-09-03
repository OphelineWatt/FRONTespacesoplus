import { useState } from "react";
import { forgottenPassword } from "../Services/userServices";
import { Button, Form, Modal } from "react-bootstrap";

const ForgottenPasswordModal = ({ show, onHide }) => {
  const [mail, setMail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Utilise directement la valeur du state
    console.log("Réinitialisation du mot de passe pour l'email :", mail);

    // Appel du service de réinitialisation
    forgottenPassword({ mail });

    // Affiche un message de confirmation ou reset le formulaire
    setSubmitted(true);
  };

  const handleClose = () => {
    setMail('');
    setSubmitted(false);
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Mot de passe oublié</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {submitted ? (
            <p className="text-success">
              Un email de réinitialisation a été envoyé à <strong>{mail}</strong>.
            </p>
          ) : (
            <Form.Group controlId="formEmail">
              <Form.Label>Email :</Form.Label>
              <Form.Control
                type="email"
                name="mail"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                required
                placeholder="Entrez votre adresse email"
              />
            </Form.Group>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {submitted ? "Fermer" : "Annuler"}
          </Button>
          {!submitted && (
            <Button type="submit" variant="primary">
              Envoyer
            </Button>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ForgottenPasswordModal;