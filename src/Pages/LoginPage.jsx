import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Toast from "react-bootstrap/Toast";

import { login } from "../Services/userServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userData, setUserData] = useState({
    mail: "",
    password: "",
  });
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(userData);

      localStorage.setItem("token", response.data.token);
      
      setShowToast(true);

      navigate("/application");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="d-flex flex-column align-items-center justify-content-center gap-3">
      <h1>Connexion :</h1>
      <Card style={{ width: "30rem" }}>
        <Card.Body className="d-flex flex-column align-items-center justify-content-center gap-3">
          <Form onSubmit={handleSubmit}>
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
                Connexion
              </Button>
            </div>
          </Form>
          <div className="d-flex justify-content-end gap-3">
            <Card.Link href="#">Créer un compte</Card.Link>
          </div>
        </Card.Body>
      </Card>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        className="toast-success"
      >
        <Toast.Header>
          <strong className="me-auto">Connexion</strong>
        </Toast.Header>
        <Toast.Body>Connexion réussie ! 🎉</Toast.Body>
      </Toast>
    </div>
  );
};

export default LoginPage;
