import express from "express";
const cors = require("cors");
const port = 3000;

const contactsRouter = require("./routes/contacts");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
};

app.use(express.json());
app.use(cors(corsOptions));

// Middleware to console log requests and responses
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`);
  res.on("finish", () => {
    console.log(`Response Status: ${res.statusCode}`);
  });
  next();
});

app.use("/api/contacts", contactsRouter);

app.listen(port, () =>
  console.log(`Server listening on: http://localhost:${port}`),
);
