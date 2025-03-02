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
        type: "Fruta",
    },
    {
        id: 2,
        name: "Laranja",
        quantity: 2,
        type: "Fruta",
    }
]

app.listen(5000, () => {
    console.log("Funcionou");
});

// pega todas os itens
app.get("/items", (req, res) => {
    res.send(items);
})

// pega o item pelo ID
app.get("/items/:id", (req, res) => {
    const id = req.params.id;
    const item = items.find(item => {
        return item.id === Number(id);
    })
    res.send(item);
})

// recebe item 
app.post("/items", (req, res) => {
    const item = req.body;

    if(!item.name || !item.quantity || !item.type) {
        res.status(422).send("Preencha corretamente os dados name, quantity e type.")
        return
    }

    items.push({
        id: items.length + 1,
        ...item});
    res.send("Item recebido");
})
