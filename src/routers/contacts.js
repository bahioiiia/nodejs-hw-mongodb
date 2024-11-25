import { Router } from "express";
import * as contactsController from '../controllers/contacts.js';

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import { contactAddSchema, contactUpdateSchema } from "../validation/contacts.js";
import { isValidId } from '../middlewares/isValidId.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactsController.getContactsController)); 

contactsRouter.get('/:contactId', isValidId, ctrlWrapper(contactsController.getContactByIdController));

contactsRouter.post('/', validateBody(contactAddSchema), ctrlWrapper(contactsController.addContactsController));

contactsRouter.put('/:contactId', isValidId, validateBody(contactAddSchema), ctrlWrapper(contactsController.upsertContactController));

contactsRouter.patch('/:contactId', isValidId, validateBody(contactUpdateSchema), ctrlWrapper(contactsController.patchContactController));

contactsRouter.delete('/:contactId', isValidId, ctrlWrapper(contactsController.deleteContactController));

export default contactsRouter;