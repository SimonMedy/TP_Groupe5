const cors = require("cors"),
  express = require("express"),
  dotenv = require("dotenv"),
  path = require("path");

dotenv.config({ path: path.resolve(__dirname, ".env") });

require("./src/model/user");
const sequelize = require("./src/config/db");

//Connection a la base de donnée

const app = express();

// cross origin ressources sharing
// Partage de ressources entre server distant et hote different de l'app
// * = toutes les origines
app.use(
  cors({
    origin: "*",
    method: ["GET", "POST", "DELETE", "PATCH", "PUT"],
  })
);

// encodade de l'url
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./src/routes")(app);

//chemin vers les vues
const viewsPath = path.join(__dirname, "src", "views");

//défini le répertoire des vues
app.set("views", viewsPath);

// défini le moteur de vue avec ejs.
app.set("view engine", "ejs");
// route racine avec ejs
app.get("/", async (req, res) => {
  try {
    const apiResponse = await fetch("http://localhost:3000/api/v1/articles/"); // Faites une requête GET à votre route API pour récupérer les articles
    const articles = await apiResponse.json(); // Récupérer les données JSON de la réponse
    console.log(articles);
    res.render(path.join(viewsPath, "index"), { title: "Articles", articles:articles.articles }); // Passer les articles à la vue
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "Une erreur s'est produite lors de la récupération des articles depuis l'API"
      );
  }
});

app.get("/login", async (req, res) => {
  res.render(path.join(viewsPath, "pageConnection"), { title: "Connexion" });
});

app.get("/register", async (req, res) => {
  res.render(path.join(viewsPath, "pageInscription"), { title: "Inscription" }); 
});

//route racine
// app.get('/', (req, res) => {
//   res.sendFile(path.join(viewsPath, 'index.html'));
// });

//Route non trouvée
app.use((req, res) => {
  res.status(404).send("Page non trouvée");
});

app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, async (err) => {
  if (err) {
    console.log("Error in server setup");
  } else {
    console.log(
      `Server running at http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`
    );
    //await sequelize.sync();
    //await sequelize.sync({ alter: true });
    await sequelize.sync();
  }
});

