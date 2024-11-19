/* name - string, required
phoneNumber - string, required
email - string
isFavourite - boolean, default false
contactType - string, enum(’work’, ‘home’, ‘personal’), required, default ‘personal’
 */
import { Schema, model } from 'mongoose';
import { typeList } from '../../constants/contacts.js';

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  isFavourite: {
    type: Boolean,
    default: false,
  },
  contactType: {
    type: String,
    required: true,
    enum: typeList,
    default: 'personal',
  }  
},{versionKey: false, timestamps: true});

const ContactCollection = model('contacts', contactSchema);

export default ContactCollection;