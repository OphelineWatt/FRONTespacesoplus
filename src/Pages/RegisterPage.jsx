import { useState } from "react";
import { register } from "../Services/userServices";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    username: "",
    mail: "",
    password: "",
  });

  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(userData);
      setShowToast(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center gap-3">
      <h1>Inscription :</h1>
      <Card style={{ width: "30rem" }}>
        <Card.Body className="d-flex flex-column align-items-center justify-content-center gap-3">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Nom d'utilisateur :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer votre nom"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email :</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrer votre email"
                value={userData.mail}
                onChange={(e) =>
                  setUserData({ ...userData, mail: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mot de passe :</Form.Label>
              <Form.Control
                type="password"
                placeholder="Entrer votre mot de passe"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit">
                S'inscrire
              </Button>
            </div>
          </Form>
          <div className="d-flex justify-content-end gap-3">
            <Card.Link href="/login">Déjà un compte ? Connectez-vous</Card.Link>
          </div>
        </Card.Body>
      </Card>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          className="toast-success"
        >
          <Toast.Header>
            <strong className="me-auto">Inscription</strong>
          </Toast.Header>
          <Toast.Body>Inscription réussie ! Redirection en cours... 🚀</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default RegisterPage;

