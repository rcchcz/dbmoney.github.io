const ManagerService = require('../../services/managerService')

class ManagerController {
    async create_manager(request, response) {
        const managerReceived = request.body;
        try {
            await ManagerService.insertManager(managerReceived)
            response.status(200).json({
                msg: "Gerente inserido com sucesso"
            })
        } catch (err) {
            return response.status(400).json({
                error: err
            })
        }
    }
    async show_managers(request, response) {
        try {
            const managers = await ManagerService.getAllManagers()
            return response.status(200).json(managers)
        } catch (err) {
            return response.status(400).json({
                error: err
            })
        }
    }
    async show_manager(request, response) {
        const { id } = request.params;
        try {
            const manager = await ManagerService.getManagerById(id)
            return response.status(200).json(manager)
        } catch (err) {
            return response.status(400).json({
                error: err
            })
        }
    }
    async update_manager(request, response) {
        const { id } = request.params
        const managerReceived = request.body;
        try {
            await ManagerService.updateManager(id, managerReceived.nome)
            return response.status(200).json({
                msg: "Gerente alterado com sucesso"
            })
        } catch (err) {
            return response.status(400).json({
                error: err
            })
        }
    }
    async delete_manager(request, response) {
        const { id } = request.params
        try {
            await ManagerService.deleteManager(id)
            return response.status(200).json({
                msg: 'Gerente deletado com sucesso'
            })
        } catch (err) {
            return response.status(400).json({
                error: err
            })
        }
    }
}

module.exports = new ManagerController()