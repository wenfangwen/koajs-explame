/**
 * 用户表
 */

const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
);

// export default model('User', userSchema);
module.exports = model('User', userSchema);
