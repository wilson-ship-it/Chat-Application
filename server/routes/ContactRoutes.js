import { Router } from "express";
import { getAllContacts, getContactsForDMList, searchContacts } from "../Controllers/ContactsController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const contactsRoute =Router();
contactsRoute.post("/search",verifyToken,searchContacts);
contactsRoute.get("/get-contacts-for-dm",verifyToken,getContactsForDMList)
contactsRoute.get("/get-all-contacts",verifyToken,getAllContacts)

export default contactsRoute;