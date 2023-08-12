const express = require("express");
const app = express();
// const puppeteer = require("puppeteer");
const puppeteer = require("puppeteer-core");
const cvCanadaTemplate = require("./template/pdf-canada.template");
var cors = require("cors");

app.use(express.json());
app.use(cors());

const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//

app.post("/generate-pdf", async (req, res) => {
  try {
    const { name, email } = req.body; // Extract data from the request

    const template = cvCanadaTemplate(req.body);

    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/google-chrome",
    });
    const page = await browser.newPage();

    await page.setContent(template);

    // Convert HTML to PDF
    const pdfBuffer = await page.pdf();

    await browser.close();

    // Send the PDF back to the client
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
