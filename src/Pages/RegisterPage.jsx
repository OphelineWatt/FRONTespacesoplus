import { useState } from "react";
import { register } from "../Services/userServices";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../Styles/registerPage.css"

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    username: "",
    mail: "",
    password: "",
    verify_password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !userData.username ||
        !userData.mail ||
        !userData.password ||
        !userData.verify_password
      ) {
        toast.error("Tous les champs sont obligatoires");
        return;
      }

      if (userData.password !== userData.verify_password) {
        toast.error("Les mots de passe ne correspondent pas");
        return;
      }
      if (
        RegExp(
          /^(?=.{1,254}$)(?=.{1,64}@)(?!.*\.\.)[\p{L}\p{N}!#$%&'*+/=?^_`{|}~-]+(?:\.[\p{L}\p{N}!#$%&'*+/=?^_`{|}~-]+)*@(?:(?!-)[\p{L}\p{N}-]{1,63}(?<!-)\.)+[\p{L}]{2,63}$/u
        ).test(userData.mail) === false
      ) {
        toast.error("L'email n'est pas valide");
        return;
      }

      await register(userData);
      toast.success("enregistrement réussi");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register-page">
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

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirmation de votre mot de passe :</Form.Label>
              <Form.Control
                name="verify_password"
                type="password"
                placeholder="Entrer votre mot de passe"
                required
                value={userData.verify_password}
                onChange={(e) =>
                  setUserData({ ...userData, verify_password: e.target.value })
                }
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
