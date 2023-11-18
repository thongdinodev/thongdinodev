import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "thongdino";
const yourPassword = "123456";
const yourAPIKey = "302cb609-e44f-459d-980b-1cf9f5e70375";
const yourBearerToken = "2fa4e16f-ec18-45a1-b850-ccf298dcfb7a";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` }
};

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  
  try {
    const response = await axios.get(`${API_URL}random`);
    const result = JSON.stringify(response.data);
    console.log((result));
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message
    });
  }
});

app.get("/basicAuth", async (req, res) => {
  
  try {
    const response = await axios.get(`${API_URL}all?page=2`, {
       auth: {
         username: yourUsername,
         password: yourPassword,
       },
       
     });
   const result = JSON.stringify(response.data);
   res.render("index.ejs", {content: result});
    
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message
    });
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}filter?score=5&apiKey=${yourAPIKey}`);
    const result = JSON.stringify(response.data);
    res.render("index.ejs", {content: result});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message
    });
  }
});

app.get("/bearerToken", async (req, res) => {
  
  try {
    const response = await axios.get(`${API_URL}secrets/42`, config);
    const result = JSON.stringify(response.data);
    console.log(result);
    res.render("index.ejs", {content: result});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message
    });
  }

// axios.get(`${API_URL}secrets/42` , config)
// .then(response => {
// const result = JSON.stringify(response.data);
// res.render("index.ejs", {content: result})
// .catch((error) => {
//   console.log(error)
// });
// });

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
