import { useState } from "react";
import { register } from "../Services/userServices";
import { Button, Form, Card, InputGroup, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Styles/registerPage.css";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    username: "",
    mail: "",
    password: "",
    verify_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const getPasswordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const strength = getPasswordStrength(userData.password);
  const strengthLabels = ["Très faible", "Faible", "Moyen", "Fort"];
  const strengthColors = ["danger", "warning", "info", "success"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, mail, password, verify_password } = userData;

      if (!username || !mail || !password || !verify_password) {
        toast.error("Tous les champs sont obligatoires");
        return;
      }

      if (password !== verify_password) {
        toast.error("Les mots de passe ne correspondent pas");
        return;
      }

      const emailRegex = /^(?=.{1,254}$)(?=.{1,64}@)(?!.*\.\.)[\p{L}\p{N}!#$%&'*+/=?^_`{|}~-]+(?:\.[\p{L}\p{N}!#$%&'*+/=?^_`{|}~-]+)*@(?:(?!-)[\p{L}\p{N}-]{1,63}(?<!-)\.)+[\p{L}]{2,63}$/u;
      if (!emailRegex.test(mail)) {
        toast.error("L'email n'est pas valide");
        return;
      }

      await register(userData);
      toast.success("Enregistrement réussi");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register-page">
      <h1>Inscription :</h1>
      <Card style={{ width: "100%", maxWidth: "480px", margin: "auto" }}>
        <Card.Body className="d-flex flex-column gap-3">
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
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Entrer votre mot de passe"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                </Button>
              </InputGroup>
              {userData.password && (
                <>
                  <ProgressBar
                    now={(strength / 4) * 100}
                    variant={strengthColors[strength - 1] || "danger"}
                    className="mt-2"
                  />
                  <div className="text-muted mt-1">
                    Sécurité : <strong>{strengthLabels[strength - 1] || "Très faible"}</strong>
                  </div>
                </>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicVerifyPassword">
              <Form.Label>Confirmation du mot de passe :</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirmer votre mot de passe"
                value={userData.verify_password}
                onChange={(e) =>
                  setUserData({ ...userData, verify_password: e.target.value })
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
