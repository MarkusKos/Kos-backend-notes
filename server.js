"use strict";

const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const nocache = require("nocache");

app.use(nocache());

// разрешили запросы с других сайтов
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    fs.readFile(__dirname + "/notes.json", "utf-8", (err, data) => {
        if (err) return res.send("Ошибка при загрузке данных");
        // заголовок ответа сервера, который сообщает клиенту, что пришли данные в JSON и кодировки utf-8
        res.setHeader("Content-type", "application/json;charset=utf-8");
        // отправили данные в формате json
        return res.send(data);
    });
});

app.post("/", cors(), (req,res) => {
    let data = JSON.stringify(req.body);
    fs.writeFile(__dirname + "/notes.json", data, (err) => {
        if(err) return res.json({status:"fail", message:"Не удалось сохранить"});
        return res.json({status:"ok",message:"Заметки успешно сохранены"});
    });
});

const port = process.env.PORT || 9000;

app.listen(port, () => {
   console.log("Сервер запущен!");
});
