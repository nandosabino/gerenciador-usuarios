import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", age: "", email: "" });

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3001/usuarios/todos");
      console.log("📦 Dados recebidos:", res.data);
      setUsers(res.data);
    } catch (err) {
      console.error("Erro ao carregar usuários", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/usuarios/cadastro", formData);
      setFormData({ name: "", age: "", email: "" });
      fetchUsers();
    } catch (err) {
      console.error("Erro ao cadastrar usuário", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/usuarios/deletar/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Erro ao excluir usuário", err);
    }
  };

  return (
    <div className="container">
      <h1>Cadastro de Usuários</h1>

      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          placeholder="Nome"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Idade"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      <h2>Usuários Cadastrados</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id}>
            <span>
              {user.name} ({user.age} anos) - {user.email}
            </span>
            <button onClick={() => handleDelete(user.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
