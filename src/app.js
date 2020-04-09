const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body; 
  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repositorie);
  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repositoryIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositoryIndex < 0){
    return response.status(400).json({error: "Repositorie not found!"})
  }

  const repositorie = {
    id: id,
    title,
    url,
    techs,
    likes: 0
  }

  repositories[repositoryIndex] = repositorie;
  return response.status(200).json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositoryIndex < 0){
    return response.status(400).json({error: "Repositorie not found!"})
  }

  repositories.splice(repositoryIndex, 1);
  return response.send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repositorie => repositorie.id === id);
  if (repositoryIndex < 0){
    return response.status(400).json({error: "Repositorie not found!"})
  }
  
  repositories[repositoryIndex].likes = repositories[repositoryIndex].likes + 1;

  return response.status(200).json(repositories[repositoryIndex]);

});

module.exports = app;
