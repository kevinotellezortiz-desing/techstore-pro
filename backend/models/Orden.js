const mongoose = require('mongoose');

const ordenSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  productos: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
      cantidad:  { type: Number, required: true, min: 1 }
    }
  ],
  total:  { type: Number, required: true },
  estado: { type: String, enum: ['pendiente','pagado','enviado','entregado'], default: 'pendiente' }
}, { timestamps: true });

const Orden = mongoose.model('Orden', ordenSchema);
module.exports = Orden;
