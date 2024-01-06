// פונקציה לשינוי הסדר
function print(wordToPrint) {
  console.log(wordToPrint.split('').reverse().join(''));
}

const fs = require('fs')
const path = require('path');
const express = require('express')
const app = express()
const logger = require('./middleware/logger')
const cors = require('cors')
const syncModels = require('./models/index').syncModels

app.use(cors())
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(logger)
app.use(express.urlencoded({ extended: true }))

require("dotenv").config()
const port = process.env.PORT

const config = require('config');
// const port = config.get('port')

// למחיקת הנתונים בחר true
syncModels(false)
// app.get('/:name', (req, res) => {
//   console.log(`Hello ${req.params.name}`);
//   console.log(`msg ${req.query.msg}`);
//   res.status(418)
//   res.send(`Hello ${req.params.name}, msg ${req.query.msg}`)
// })

// חיבור לדף HTML
// app.get('/', (req, res) => {
//   res.status(418)
//   fs.createReadStream(path.join(__dirname, 'src/index.html')).pipe(res)
// })

// app.get('/new', (req, res) => {
//   fs.createReadStream(path.join(__dirname, 'src/new.html')).pipe(res)
// })

// להוסיף מתודה מדף אחר
const user = require('./routes/user-routes')
app.use('/user', user)


const Article = require('./routes/Article')
app.use('/article', Article)



let ITEMS = [
  { id: 1, name: 'appl', price: '2$' },
  { id: 2, name: 'appl', price: '2$' },
  { id: 3, name: 'appl', price: '2$' },
  { id: 4, name: 'appl', price: '2$' },
  { id: 5, name: 'appl', price: '2$' },
  { id: 6, name: 'appl', price: '2$' },
  { id: 7, name: 'appl', price: '2$' },
  { id: 8, name: 'appl', price: '2$' }
]


// יצירת אייטם
app.post("/item", (req, res) => {
  let item = req.body;
  ITEMS.push(item)
  res.status(201)
  print("אייטם נוצר בהצלחה")
  console.log({ item });
  res.send({ "msg": "אייטם נוצר בהצלחה", item })
})

// הצגת האייטמים הקיימים
app.get("/items", (req, res) => {
  let limit = parseInt(req.query.limit, 10) || 5
  let offset = parseInt(req.query.offset, 10) || 0
  let limitItems = ITEMS.slice(offset, offset + limit)
  print("כל האייטמים הקיימים")
  console.log(ITEMS);
  res.send(limitItems)
})

// קבלת אייטם לפי id
app.get("/item/:id", (req, res) => {
  let id = req.params.id
  let item = ITEMS.find((item) => item.id == id)
  if (item) {
    print("קבלת אייטם לפי מיקום")
    console.log(item);
    res.send(item)
  } else {
    res.status(404)
    print("אייטם לא קיים")
    res.send({ msg: "אייטם לא קיים" })
  }
})

// שינוי אייטם
app.put("/item/:id", (req, res) => {
  let id = req.params.id;
  let item = ITEMS.find((item) => item.id == id)
  if (item) {
    let updatedltem = req.body;
    ITEMS = ITEMS.map((item) => {
      if (item.id == id) {
        return updatedltem;
      }
      return item;
    })
    res.send({ "msg": "Item updated successfully", updatedltem })
  }
  else {
    res.status(404);
    print("אייטם לא קיים")
    res.send({ msg: "Item not found" });
  }
});

// הפעלת הפורט
app.listen(port, () => {
  print("שרת הופעל בהצלחה, הכתובת היא")
  console.log(`http://localhost:${port}`)
})
