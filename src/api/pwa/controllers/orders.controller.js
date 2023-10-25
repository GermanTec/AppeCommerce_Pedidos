import * as ordersService from '../services/orders.service';

// GET ALL************************************************************************************************ */

export const getOrdersAll = async(req, res, next) => {
    try{
        const ordersAll = await ordersService.getOrdersAll();
        if(ordersAll) {
            return res.status(ordersAll.status).json(ordersAll);
        }
    }catch(error){
        next(error);
    }
};

// GET ONE BY ID************************************************************************************************ */

export const getOrdersOne = async (req, res, next) => {
    try {
        const { id } = req.params; // Obtén el valor a consultar de los parámetros de la solicitud
    
        // Llamar a la función para buscar y pasa el valor
        const result = await ordersService.getOrdersOne(id);
    
        if(result) {
            return res.status(result.status).json(result);
        }
      } catch (error) {
        next(error);
      }
};

// POST********************************************************************************************** */
export const addOrders = async(req, res, next) => {
    try{
        const ordersAdded = await ordersService.addOrders(req.body);
        
        if(ordersAdded) {
            return res.status(ordersAdded.status).json(ordersAdded);
        }
    }catch(error){
        next(error);
    }
};
// FIN POST*************************************************************************************** */

// PUT*********************************************************************************************** */
export const updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params; // Obtén el ID de la entrega desde los parámetros de la solicitud
        const newData = req.body; // Obtén los nuevos datos desde el cuerpo de la solicitud

        const result = await ordersService.updateOrder(id, newData);

        if (result.status === 200) {
            return res.status(200).json(result);
        } else if (result.status === 404) {
            return res.status(404).json(result);
        }
    } catch (error) {
        next(error);
    }
};
// FIN PUT********************************************************************************************* */

// DELETE************************************************************************************************ */
export const deletePedidoByValue = async (req, res, next) => {
    try {
      const { id } = req.params; // Obtén el id del Pedido para eliminar
      
      // Llama al servicio de eliminación y pasa el valor a eliminar
      const result = await ordersService.deleteOrderOne(id);
  
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
// FIN DELETE********************************************************************************************* */