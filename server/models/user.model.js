import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: 'El nombre es requerido' },
  email: {
    type: String,
    trim: true,
    unique: 'El correo ya fue registrado',
    match: [/.+\@.+\..+/, 'Ingresa un mail válido'],
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date,
  hashed_password: {
    type: String,
    required: 'El password es requerido'
  },
  salt: String
});

UserSchema.virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  authenticate: (plainText) => {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: (password) => {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (error) {
      return '';
    }
  },
  makeSalt: () => {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  }
};

//validacion del password
UserSchema.path('hashed_password').validate(function (v) {
  if (this._password && this._password.length < 4) {
    this.invalidate(
      'password',
      'El password tiene que ser de al menos 4 caracteres'
    );
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'El password es requerido');
  }
}, null);

export default mongoose.model('User', UserSchema);
