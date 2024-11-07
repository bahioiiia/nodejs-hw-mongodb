import createHttpError from 'http-errors';

import * as contactServices from '../services/contacts.js';

export const getContactsController = async (req, res, next) => {
    const data = await contactServices.getContacts();
    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data,
    });
};
    
export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    if (contactId.length !== 24) { throw createHttpError(404, 'Contact ID must be a 24 character hex string'); }
    
    const data = await contactServices.getContactById(contactId);
    if (!data) { throw createHttpError(404, `Contact with id=${id} not found`); }
    
    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data,
    });
};
/* ---------------------------
Створіть роут POST /contacts для створення нового контакту. Тіло запиту має в себе включати наступні властивості:

name - обов’язково
phoneNumber - обов’язково
email - не обовʼязково
isFavourite - не обовʼязково
contactType - обовʼязково


Обробка цього роута має включати:

Реєстрацію роута в файлі src/routers/contacts.js
Опис контролера для цього роута в файлі src/controllers/contacts.js
Створення сервісу в файлі src/services/contacts.js
Відповідь сервера, в разі успішного створення нового контакту, має бути зі статусом 201 і містити об’єкт з наступними властивостями:
---------------------------------- */
export const addContactsController = async (req, res, next) => {
    console.log("RUN!!!");

    const data = await contactServices.addContact(req.body);
    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data,
    });
};
/* ------------------
Створіть роут PATCH /contacts/:contactId для оновлення даних існуючого контакту. Тіло запиту має в себе включати наступні властивості:

name - не обов’язково
phoneNumber - не обов’язково
email - не обовʼязково
isFavourite - не обовʼязково
contactType - не обовʼязково


Обробка цього роута має включати:

Реєстрацію роута в файлі src/routers/contacts.js
Опис контролера для цього роута в файлі src/controllers/contacts.js
Створення сервісу в файлі src/services/contacts.js
Відповідь сервера, в разі успішного оновлення даних контакту, має бути зі статусом 200 і містити об’єкт з наступними властивостями:
-------------------- */
// export const patchContactsController = async (req, res, next) => {
//     const { contactId } = req.params;
//     if (contactId.length !== 24) { throw createHttpError(404, 'Contact ID must be a 24 character hex string'); }
    
//     const data = await contactServices.getContactById(contactId);

//     if (!data) { throw createHttpError(404, `Contact with id=${id} not found`); }
    
//     res.status(200).json({
//         status: 200,
//         message: `Successfully patched a contact with id ${contactId}!`,
//         data,
//     })
// };

/* Створіть роут DELETE /contacts/:contactId для видалення існуючого контакту.

Обробка цього роута має включати:

Реєстрацію роута в файлі src/routers/contacts.js
Опис контролера для цього роута в файлі src/controllers/contacts.js
Створення сервісу в файлі src/services/contacts.js
Відповідь сервера, в разі успішного видалення контакту, має бути зі статусом 204 без тіла відповіді
Якщо контакт не було знайдено, то за допомогою http-errors відповідь сервера має бути зі статусом 404 і повідомленням "Contact not found". */

// export const deleteContactsController = async (req, res, next) => {
//     const { contactId } = req.params;
//     if (contactId.length !== 24) { throw createHttpError(404, 'Contact ID must be a 24 character hex string'); }
    
//     const data = await contactServices.getContactById(contactId);

//     if (!data) { throw createHttpError(404, `Contact with id=${id} not found`); }
    
//     res.status(200).json({
//         status: 204,
//         message: `Successfully deleted a contact with id ${contactId}!`,
//         data,
//     })
// };