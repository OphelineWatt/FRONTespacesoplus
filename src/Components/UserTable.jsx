import { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { deleteUser } from "../Services/userServices";

import "../Styles/placeTable.css"

const UserTable = ({ users, fetchUsers }) => {
  const [searchText, setSearchText] = useState("");

  // Filtrage des pseudos
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDeleteUser = async (idUser) => {
      try {
        const confirm = window.confirm("Confirmer la suppression ?");
        if (!confirm) return;
  
        await deleteUser(idUser);
        fetchUsers()
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Échec de la suppression");
      }
    };

  return (
    <div className="container text-center">

    <div className="d-flex justify-content-center my-4 ">
      <Form.Control 
        type="text"
        placeholder="Rechercher un pseudo..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="mb-3"
        style={{ maxWidth: '400px' }}

      />

      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Pseudo</th>
            <th>Mail</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id_user}>
              <td>{user.username}</td>
              <td>{user.mail}</td>
              <td>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDeleteUser(user.id_user)}
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

};

export default UserTable;
