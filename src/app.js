import express from "express";
import cors from "cors"

const app = express();
app.use(cors());

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
