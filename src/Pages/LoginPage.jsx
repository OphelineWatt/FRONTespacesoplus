import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ForgottenPasswordModal from "../Components/ForgottenPasswordModal";

import { login } from "../Services/userServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "../Styles/LoginPage.css";

const LoginPage = () => {
  const [userData, setUserData] = useState({
    mail: "",
    password: "",
  });

  const [showModalPassword, setShowModalPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(userData);
      localStorage.setItem("token", response.data.token);
      navigate("/application");
    } catch (error) {
      toast.error("Email ou mot de passe invalide");
      console.error(error);
    }
  };

  return (
    <div className="login-page container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100">
      <Card className="login-card w-100" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Connexion</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
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
              <Form.Label>Mot de passe</Form.Label>
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

            <Button variant="primary" type="submit" className="w-100">
              Se connecter
            </Button>
          </Form>

          <div className="d-flex justify-content-between mt-3">
            <Card.Link href="/Register">Créer un compte</Card.Link>
            <Card.Link onClick={() => setShowModalPassword(true)}>
              Mot de passe oublié ?
            </Card.Link>
          </div>
        </Card.Body>
      </Card>

      <ForgottenPasswordModal
        show={showModalPassword}
        onHide={() => setShowModalPassword(false)}
      />
    </div>
  );
};

export default LoginPage;
