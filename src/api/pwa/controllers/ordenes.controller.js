import * as ordenesService from '../services/ordenes.service';

// GET ALL************************************************************************************************ */

export const getOrdenesAll = async(req, res, next) => {
    try{
        const ordenesAll = await ordenesService.getOrdenesAll();
        if(ordenesAll) {
            return res.status(ordenesAll.status).json(ordenesAll);
        }
    }catch(error){
        next(error);
    }
};

// GET ONE BY ID************************************************************************************************ */

export const getOrdenesOne = async (req, res, next) => {
    try {
        const { id } = req.params; // Obtén el valor a consultar de los parámetros de la solicitud
    
        // Llamar a la función para buscar y pasa el valor
        const result = await ordenesService.getOrdenesOne(id);
    
        if(result) {
            return res.status(result.status).json(result);
        }
      } catch (error) {
        next(error);
      }
};

// POST********************************************************************************************** */
export const addOrdenes = async(req, res, next) => {
    try{
        const ordenesAdded = await ordenesService.addOrdenes(req.body);
        
        if(ordenesAdded) {
            return res.status(ordenesAdded.status).json(ordenesAdded);
        }
    }catch(error){
        next(error);
    }
};
// FIN POST*************************************************************************************** */

// PUT*********************************************************************************************** */
export const updateOrden = async (req, res, next) => {
    try {
        const { id } = req.params; // Obtén el ID de la entrega desde los parámetros de la solicitud
        const newData = req.body; // Obtén los nuevos datos desde el cuerpo de la solicitud

        const result = await ordenesService.updateOrden(id, newData);

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
export const deleteOrdenOne = async (req, res, next) => {
    try {
      const { id } = req.params; // Obtén el id del Pedido para eliminar
      
      // Llama al servicio de eliminación y pasa el valor a eliminar
      const result = await ordenesService.deleteOrdenOne(id);
  
      if (result.status === 200) {
        return res.status(200).json(result);
    } else if (result.status === 404) {
        return res.status(404).json(result);
    }
    } catch (error) {
      next(error);
    }
  };
// FIN DELETE********************************************************************************************* */