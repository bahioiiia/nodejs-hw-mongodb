import { Router } from "express";

import * as contactsController from '../controllers/contacts.js';

import ctrlWrapper from "../utils/ctrlWrapper.js";

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactsController.getContactsController)); 

contactsRouter.get('/:contactId', ctrlWrapper(contactsController.getContactByIdController));

contactsRouter.post('/', ctrlWrapper(contactsController.addContactsController));

contactsRouter.put('/:contactId', ctrlWrapper(contactsController.upsertContactController));

contactsRouter.patch('/:contactId', ctrlWrapper(contactsController.patchContactController));

contactsRouter.delete('/:contactId', ctrlWrapper(contactsController.deleteContactController));

export default contactsRouter;