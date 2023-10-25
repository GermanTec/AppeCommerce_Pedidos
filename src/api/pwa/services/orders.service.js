import Pedidos from '../models/orders';
import { OK, FAIL, BITACORA, DATA, AddMSG } from '../../../middlewares/respPWA.handler';


//==========================================GET===========================================================S
export const getOrdersAll = async() => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Extraer todas los pedidos";
        data.method = "GET";
        data.api = "/pedido";
        data.process = "Extraer todas los pedidos de la coleccción de Pedidos";

        const PedidosAll = await Pedidos.find().then((pedidos) => {
            if(!pedidos) {
                data.status = 404;
                data.messageDEV = "La base de datos <<NO>> tiene Pedidos configurados";
                throw Error(data.messageDEV);
            }

            return pedidos;
        });

        data.status = 200; //200 = codigo cuando encuentras documentos
        data.messageUSR = "La extracción de los Pedidos <<SI>> tuvo exito";
        data.dataRes = PedidosAll;

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);

    }catch (error) {
        if(!data.status) data.status = error.statusCode;
        let {message} = error;
        if(!data.messageDEV) data.messageDEV = message;
        if(!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La extracción de los pedidos <<NO>> tuvo exito";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    }
    finally {
        //Haya o no error siempre ejecuta aqui
    }
}
//=========================================FIN GET===========================================================






//==========================================GET ONE BY ID===========================================================S
export const getOrdersOne = async (id) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = `Obtener Pedido por ID: ${id}`;
        data.method = "GET";
        data.api = `/pedido/${id}`;
        data.process = `Obtener un Pedido específico de la colección de Pedidos por su ID`;

        const PedidoId = await Pedidos.findOne({ id_ordenPedidoOK: id });
        if (!pedidos) {
            data.status = 404;
            data.messageDEV = `No se encontró un Pedido con el ID ${id}.`;
            throw Error(data.messageDEV);
        }

        data.status = 200;
        data.messageUSR = "La obtención del Pedido <<SI>> tuvo éxito";
        data.dataRes = PedidoId;

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);

    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La obtención del Pedido <<NO>> tuvo éxito";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    } finally {
        //Haya o no error siempre ejecuta aqui
    }
}
//=========================================FIN GET===========================================================








//=========================================POST===========================================================
export const addOrders = async(newOrder) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Agregar un nuevo pedido";
        data.method = "POST";
        data.api = "/pedido";
        data.process = "Agregar un nuevo pedido a la coleccción de Pedidos";

        const orderAdded = await Pedidos.insertMany(
            newOrder,
            { order: true }
        )
        .then((order) => {
            if(!order) {
                data.status = 400; //400 de que no se pudo insertar; es diferente a 404
                data.messageDEV = "La inserción del Pedido <<NO>> fue exitosa";
                throw Error(data.messageDEV);
            }

            return order;
        });

        data.status = 201; //201 = codigo cuando se inserta exitosamente SIUU
        data.messageUSR = "La inserción del Pedido <<SI>> fue exitosa";
        data.dataRes = orderAdded;

        bitacora = AddMSG(bitacora, data, 'OK', 201, true);

        return OK(bitacora);

    }catch (error) {
        if(!data.status) data.status = error.statusCode;
        let {message} = error;
        if(!data.messageDEV) data.messageDEV = message;
        if(!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La inserción del Pedido <<NO>> fue exitosa";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    }
    finally {
        //Haya o no error siempre ejecuta aqui
    }
}
//=========================================FIN POST===========================================================








//==============================================PUT===========================================================
export const updateOrder = async (id, newData) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = `Actualizar el Pedido con ID ${id}`;
        data.method = "PUT";
        data.api = `/pedido/${id}`;
        data.process = "Actualizar el Pedido en la colección de Pedidos";

        const updatedOrder = await Pedidos.findOneAndUpdate({ id_ordenPedidoOK: id }, newData, {
            new: true, 
        });

        if (!updatedOrder) {
            data.status = 404;
            data.messageDEV = `No se encontró un Pedido con el ID ${id}`;
            throw Error(data.messageDEV);
        }

        data.status = 200;
        data.messageUSR = `Pedido con ID ${id} se actualizó con éxito`;
        data.dataRes = updatedOrder;

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = `La actualización del Pedido con ID ${id} falló`;

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    }
    finally {
        // Haya o no error siempre ejecuta aquí
    }
}
//==========================================FIN PUT===========================================================








//===========================================DELETE===========================================================
export const deleteOrderOne = async (valueToDelete) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = `Actualizar el Pedido con ID ${id}`;
        data.method = "PUT";
        data.api = `/pedido/${id}`;
        data.process = "Actualizar el Pedido en la colección de Pedidos";
      // Realiza la eliminación del documento en función del valor proporcionado
      const result = await Pedidos.deleteOne({ id_ordenPedidoOK: valueToDelete });
  
      if (result.deletedCount === 0) {
        // Si no se encontró un documento para eliminar, lanza un error
        throw new Error('Pedido no encontrado.');
      }
  
      return { message: 'Pedido eliminado correctamente.' };
    } catch (error) {
        if(!data.status) data.status = error.statusCode;
        let {message} = error;
        if(!data.messageDEV) data.messageDEV = message;
        if(!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La eliminacion del pedido <<NO>> tuvo exito";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    }
    finally {
        // Haya o no error siempre ejecuta aquí
    }
  };
//=======================================FIN DELETE===========================================================