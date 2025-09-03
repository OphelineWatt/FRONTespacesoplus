import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, ProgressBar, Container, Card, InputGroup } from "react-bootstrap";
import { passwordReset } from "../Services/userServices";
import 'bootstrap-icons/font/bootstrap-icons.css';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const tokenReset = useParams().resetToken;
  const navigate = useNavigate();

  const getPasswordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const strength = getPasswordStrength(password);
  const strengthLabels = ["Très faible", "Faible", "Moyen", "Fort"];
  const strengthColors = ["danger", "warning", "info", "success"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await passwordReset({ password }, tokenReset);
      localStorage.removeItem("token");
      navigate("/login"); 
    } catch (error) {
      console.error("Erreur lors de la réinitialisation :", error);
      
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Card className="p-4 shadow-sm w-100" style={{ maxWidth: "400px" }}>
        <h3 className="text-center text-primary mb-4">Réinitialiser le mot de passe</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Mot de passe</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nouveau mot de passe"
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
            {password && (
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
          <Button type="submit" variant="primary" className="w-100 mt-3">
            Envoyer
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default ResetPasswordPage;
