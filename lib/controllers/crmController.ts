import * as mongoose from "mongoose";
import { ContactSchema } from "../models/crmModel";
import { Request, Response } from "express";

const Contact = mongoose.model("Contact", ContactSchema);
export class ContactController {
  public async addNewContact(req: Request, res: Response): Promise<any> {
    if (req.body) {
      try {
        const newContact = new Contact(req.body);
        newContact.save();
        res.status(201).send({ response: "Contact was create" });
      } catch (err) {
        return res.status(500).send(new Error("Something was wrong"));
      }
    } else {
      return res.status(404).send(new Error("Bad request"));
    }
  }

  public async getContacts(req: Request, res: Response): Promise<any> {
    try {
      const contacts = await Contact.find({});
      if (!contacts) {
        return res.status(404).send(new Error("CONTACT LIST not found"));
      } else {
        res.send(contacts);
      }
    } catch (err) {
      return res.status(500).send(new Error("Something was wrong"));
    }
  }

  public async getContactWithID(req: Request, res: Response): Promise<any> {
    if (req.params) {
      try {
        const itemContact = await Contact.findById(req.params.contactId);
        if (!itemContact) {
          return res.status(404).send(new Error("CONTACT LIST not found"));
        } else {
          res.json(itemContact);
        }
      } catch (err) {
        return res.status(500).send(new Error("Something was wrong"));
      }
    } else {
      return res.status(404).send(new Error("Bad request"));
    }
  }

  public async updateContact(req: Request, res: Response): Promise<any> {
    if (req.body) {
      try {
        const updatedContact = await Contact.findOneAndUpdate(
          {
            _id: req.params.contactId
          },
          req.body,
          { new: true }
        );
        if (!updatedContact) {
          return res.status(404).send(new Error("Bad request"));
        } else {
          res.status(200).send(updatedContact);
        }
      } catch (err) {
        return res.status(500).send(new Error("Something was wrong"));
      }
    } else {
      return res.status(404).send(new Error("Bad request"));
    }
  }

  public async deleteContact(req: Request, res: Response): Promise<any> {
    try {
      let itemUser = await Contact.remove({
        _id: req.params.contactId
      });
      if (!itemUser) {
        return res.status(404).send(new Error("Contact not found"));
      } else {
        res.status(204).send("Contact was successfulle deleted");
      }
    } catch (err) {
      return res.status(500).send(new Error("Something was wrong"));
    }
  }
}
