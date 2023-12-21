import express from "express";
import bodyParser from "body-parser";
import qrImage from "qr-image";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index.ejs", { showQrCode: false });
});

app.post("/generate", (req, res) => {
    let qrCode = qrImage.image(req.body["URL"], { type: 'png' });
    qrCode.pipe(fs.createWriteStream(`${__dirname}/public/images/qrCode.png`));
    res.render("index.ejs", { url: req.body["URL"], showQrCode: true});
    
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});