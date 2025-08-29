import { useState, useEffect } from "react";
import {
  Modal,
  Card,
  Button,
  Form,
  OverlayTrigger,
  Tooltip,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { PencilSquare, CheckLg, XLg, KeyFill } from "react-bootstrap-icons";
import "../Styles/modal.css"

import { updateUsername, updateMail, updatePassword } from "../Services/userServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserModal = ({ show, onHide, initialUser }) => {
  const [user, setUser] = useState({ username: "", mail: "" });
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");
  const [isEditingMail, setIsEditingMail] = useState(false);
  const [editedMail, setEditedMail] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [formPassword, setFormPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (initialUser) {
      setUser({
        username: initialUser.username || "",
        mail: initialUser.mail || "",
      });
      setEditedUsername(initialUser.username || "");
      setEditedMail(initialUser.mail || "");
    }
  }, [initialUser]);

  const handleUpdateProfile = async () => {
    try {
      const updatePromises = [];

      if (editedUsername !== user.username) {
        updatePromises.push(updateUsername({ username: editedUsername }));
      }

      if (editedMail !== user.mail) {
        updatePromises.push(updateMail({ mail: editedMail }));
      }

      await Promise.all(updatePromises);

      

      setUser({
        username: editedUsername,
        mail: editedMail,
      });

      setIsEditingUsername(false);
      setIsEditingMail(false);
    } catch (error) {
      if (error.response?.status === 409) {
        const conflictField = error.config?.url?.includes("updateMail")
          ? "L'adresse mail"
          : "Le nom d'utilisateur";
        setToastMessage(`${conflictField} est déjà utilisé.`);
        setShowToast(true);
      } else {
        setToastMessage("Une erreur est survenue.");
        setShowToast(true);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditedUsername(user.username);
    setIsEditingUsername(false);
    setEditedMail(user.mail);
    setIsEditingMail(false);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      if (formPassword.oldPassword !== formPassword.newPassword) {
        const response = await updatePassword(formPassword);
        console.log(response.data);

        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setToastMessage("Le mot de passe est identique à l'ancien.");
        setShowToast(true);
      }
    } catch (error) {
      console.error("Error updating password", error);
      setToastMessage("Erreur lors de la mise à jour du mot de passe.");
      setShowToast(true);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Card className="user-profile-card p-3">
        <Card.Body>
          <div className="d-flex align-items-center mb-3">
            <div className="avatar-circle me-3">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex-grow-1">
              <div className="d-flex align-items-center">
                <Card.Title className="mb-1 me-2">
                  {isEditingUsername ? (
                    <Form.Control
                      type="text"
                      value={editedUsername}
                      onChange={(e) => setEditedUsername(e.target.value)}
                      size="sm"
                    />
                  ) : (
                    user.username
                  )}
                </Card.Title>
                <div>
                  {isEditingUsername ? (
                    <>
                      <Button
                        variant="outline-success"
                        size="sm"
                        className="me-1"
                        onClick={handleUpdateProfile}
                      >
                        <CheckLg />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={handleCancelEdit}
                      >
                        <XLg />
                      </Button>
                    </>
                  ) : (
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Modifier le pseudo</Tooltip>}
                    >
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => setIsEditingUsername(true)}
                      >
                        <PencilSquare />
                      </Button>
                    </OverlayTrigger>
                  )}
                </div>
              </div>

              <div className="d-flex align-items-center mt-2">
                <Card.Subtitle className="text-muted me-2">
                  {isEditingMail ? (
                    <Form.Control
                      type="email"
                      value={editedMail}
                      onChange={(e) => setEditedMail(e.target.value)}
                      size="sm"
                    />
                  ) : (
                    user.mail
                  )}
                </Card.Subtitle>
                <div>
                  {isEditingMail ? (
                    <>
                      <Button
                        variant="outline-success"
                        size="sm"
                        className="me-1"
                        onClick={handleUpdateProfile}
                      >
                        <CheckLg />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={handleCancelEdit}
                      >
                        <XLg />
                      </Button>
                    </>
                  ) : (
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Modifier l’email</Tooltip>}
                    >
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => setIsEditingMail(true)}
                      >
                        <PencilSquare />
                      </Button>
                    </OverlayTrigger>
                  )}
                </div>
              </div>
            </div>
          </div>

          <hr />

          <div className="d-grid gap-2">
            <Button variant="primary" onClick={() => setIsEditingPassword(true)}>
              <KeyFill className="me-2" />
              Modifier le mot de passe
            </Button>
          </div>

          {isEditingPassword && (
            <Form onSubmit={handleUpdatePassword} className="mt-3">
              <Form.Group className="mb-2">
                <Form.Label>Ancien mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  value={formPassword.oldPassword}
                  onChange={(e) =>
                    setFormPassword({ ...formPassword, oldPassword: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Nouveau mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  value={formPassword.newPassword}
                  onChange={(e) =>
                    setFormPassword({ ...formPassword, newPassword: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button variant="success" type="submit" className="me-2">
                  <CheckLg /> Enregistrer
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsEditingPassword(false);
                    setFormPassword({ oldPassword: "", newPassword: "" });
                  }}
                >
                  <XLg /> Annuler
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg="danger"
        >
          <Toast.Header>
            <strong className="me-auto">Erreur</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Modal>
  );
};

export default UserModal;