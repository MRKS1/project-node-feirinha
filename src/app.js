import express, { json } from "express";
import cors from "cors"

const app = express();
app.use(cors());
app.use(json());

const items = [
    {
        id: 1,
        name: "Maçã",
        quantity: 1,
        type: "Fruta"
    },
    {
        id: 2,
        name: "Laranja",
        quantity: 2,
        type: "Fruta"
    }
];
const validNames = [items[0].name, items[1].name];


app.listen(5000, () => {
    console.log("Funcionou");
});

app.get("/items", (req, res) => {
    const { type } = req.query;

    if (type) {
        const typeFilter = items.filter(item => {
            return item.type.includes(type)
        }
        );
        return res.send(typeFilter);
    }

    res.send(items);
});

app.get("/items/:id", (req, res) => {
    const id = req.params.id;
    const item = items.find(item => {
        return item.id === Number(id);
    })

    if (Number(id) <= 0 || !Number.isInteger(Number(id))) {
        res.sendStatus(400);
        return;
    }
    if (Number(id) > items.length) {
        res.sendStatus(404);
        return;
    }

    res.send(item);
});

app.post("/items", (req, res) => {
    const item = req.body;

    if (!item.name || !item.quantity || !item.type) {
        res.status(422).send("Preencha corretamente os dados name, quantity e type.")
        return;
    }
    if (validNames.includes(item.name)) {
        res.status(409).send("O recurso que você está tentando inserir já foi inserido.")
        return;
    }

    items.push({
        id: items.length + 1,
        ...item
    });
    validNames.push(item.name);
    res.status(201).send("Item recebido!");
});