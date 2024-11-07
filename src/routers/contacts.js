import { Router } from "express";

import * as contactsController from '../controllers/contacts.js';

import ctrlWrapper from "../utils/ctrlWrapper.js";

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactsController.getContactsController)); 

contactsRouter.get('/:contactId', ctrlWrapper(contactsController.getContactByIdController));

contactsRouter.post('/', ctrlWrapper(contactsController.addContactsController));

contactsRouter.put('/:contactId', ctrlWrapper(contactsController.upsertContactsController));

contactsRouter.patch('/:contactId', ctrlWrapper(contactsController.patchContactsController));

contactsRouter.delete('/:contactId', ctrlWrapper(contactsController.deleteContactsController));

export default contactsRouter;