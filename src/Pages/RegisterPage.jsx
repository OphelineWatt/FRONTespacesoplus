import { useState } from "react";
import { register } from "../Services/userServices";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
      toast.success("enregistrement réussi");
        navigate("/login");
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
    </div>
  );
};

export default RegisterPage;

