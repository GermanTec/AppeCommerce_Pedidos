import * as mongoose from 'mongoose';
import config from '../../../config/config';
import obtenerConexion from '../../../config/connectionsFactory';
import obtenerModelo from '../../../config/modelsFactory';

const ordenSchemaPWA = new mongoose.Schema({
	Id_OrdenOK: { type: String },
		pedido: {
		  _id: false,
		  fecha_pedido: { type: String },
		  cliente: {
			nombre: { type: String },
			email: { type: String },
			telefono: { type: String },
			direccion_envio: {
			  calle: { type: String },
			  ciudad: { type: String },
			  codigo_postal: { type: String },
			  pais: { type: String }
			}
		  },
		  productos: [
			{
			  _id: false,
			  nombre: { type: String },
			  descripcion: { type: String },
			  precio_unitario: { type: String },
			  cantidad: { type: String },
			  subtotal: { type: String }
			},
			{
			  _id: false,
			  nombre: { type: String },
			  descripcion: { type: String },
			  precio_unitario: { type: String },
			  cantidad: { type: String },
			  subtotal: { type: String }
			}
		  ],
		  total_subtotal: { type: String },
		  metodo_pago: {
			tipo: { type: String },
			ultimos_cuatro_digitos: { type: String },
			titular: { type: String }
		  },
		  estado_pedido: { type: String },
		  metodo_envio: {
			tipo: { type: String },
			fecha_entrega_estimada: { type: String },
			numero_seguimiento: { type: String }
		  },
		  notas_cliente: { type: String }
		}
});

const dbName = config.DATABASE;
const dbCluster = config.CLUSTER;
  
const conn =  obtenerConexion(dbName, dbCluster);
	
const model = obtenerModelo('Ordenes', 
						  ordenSchemaPWA,
						  conn, 
						  dbName, 
						  dbCluster);

export default model;