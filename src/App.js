import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then(({ data }) => {
      setRepositories(data);
    });
  }, []);
  async function handleAddRepository() {
    try {
      const { data } = await api.post("repositories", {
        title: "Desafio ReactJS",
        url: "teste",
        techs: ["NOde.js"],
      });
      setRepositories([...repositories, data]);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      const repositoryIndex = repositories.findIndex(
        (repository) => repository.id === id
      );
      const auxRepositories = [...repositories];
      auxRepositories.splice(repositoryIndex, 1);
      setRepositories(auxRepositories);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
