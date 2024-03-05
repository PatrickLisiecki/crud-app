const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new contact
router.post("/", async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;

    const result = await prisma.contact.create({
      data: {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
      },
    });

    res.json(result);
  } catch (error) {
    console.error("Error creating contact:", error);
    // Return an error response to the client
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany();

    if (contacts.length === 0) {
      return res.status(404).json({ message: "Contacts not found" });
    }

    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    // Return an error response to the client
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a contact by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await prisma.contact.findUnique({
      where: { id: Number(id) },
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contact);
  } catch (error) {
    console.error("Error fetching contact:", error);
    // Return an error response to the client
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a contact
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber } = req.body;

    const contact = await prisma.contact.findUnique({
      where: { id: Number(id) },
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const updatedContact = await prisma.contact.update({
      where: { id: Number(id) },
      data: { name: name, email: email, phoneNumber: phoneNumber },
    });

    res.json(updatedContact);
  } catch (error) {
    console.error("Error updating contact:", error);
    // Return an error response to the client
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a contact
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await prisma.contact.findUnique({
      where: { id: Number(id) },
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const deleted = await prisma.contact.delete({
      where: { id: Number(id) },
    });

    res.json(deleted);
    // res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    // Return an error response to the client
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
