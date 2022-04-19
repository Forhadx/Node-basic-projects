const express = require("express");

const { google } = require("googleapis");

const app = express();

app.use(express.json());

const googleDatas = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // create client instance for auth
  const client = await auth.getClient();

  //instance of google sheets api
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1FZUe3wwJR8cdw-j_G5o0hH-unYxBLpct9EC8uOTvYXw"; // this id get from google sheet url
  return {
    auth,
    googleSheets,
    spreadsheetId,
  };
};

app.get("/", async (req, res) => {
  const { auth, googleSheets, spreadsheetId } = await googleDatas();

  // get meatada about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1",
  });

  res.send({ message: "Fetch all sheets data!", persons: getRows.data.values });
});

// Write row(s) to spreadsheet
app.post("/", async (req, res) => {
  const { name, age, gender } = req.body;

  const { auth, googleSheets, spreadsheetId } = await googleDatas();

  googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[name, age, gender]],
    },
  });

  res.send("Add values successfully");
});

app.listen(5000, () => {
  console.log("Server run at 5000..");
});
