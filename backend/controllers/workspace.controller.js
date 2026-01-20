import workspaceRepository from "../repository/workspaces-repository.js"

class WorkspaceController {

    async createWorkspace(req,res){
        try{
            const {title, description, image} = req.body

            const user = req.user

            const workspace = await workspaceRepository.createWorkspace(user.id, title, image, description)

            return res.status(200).json({ message: 'Workspace creado con exito', workspace: workspace })
        }
        catch(error){
            return res.status(500).json({ message: 'Error al crear el workspace', error: error.message })
        }
    }

    async getMyWorkspaces(req,res){
        try{
            const user = req.user

            const workspaces = await workspaceRepository.getMyWorkspaces(user.id)

            if(workspaces.length === 0) {
                return res.status(404).json({ message: 'No se encontraron workspaces.' })
            }

            return res.status(200).json({ message: 'Workspaces obtenidos con exito', workspaces: workspaces })
        }
        catch(error){
            return res.status(500).json({ message: 'Error al obtener los workspaces', error: error.message })
        }
    }

    async leaveWorkspace(req,res){
        try{
            const {idWorkspace} = req.params

            const user = req.user

            const workspace = await workspaceRepository.leaveWorkspace(idWorkspace, user.id)

            return res.status(200).json({ message: 'Workspace abandonado con exito', workspace: workspace })
        }
        catch(error){
            return res.status(500).json({ message: 'Error al abandonar el workspace', error: error.message })
        }
    }

    async deleteWorkspace(req,res){
        try{
            const {idWorkspace} = req.params

            const member = await workspaceRepository.findWorkspaceByIdAndUser(idWorkspace, req.user.id)

            if(member.role !== 'owner') {
                return res.status(403).json({ message: 'No tienes permiso para eliminar el workspace.' })
            }

            const workspace = await workspaceRepository.deleteWorkspace(idWorkspace)

            return res.status(200).json({ message: 'Workspace eliminado con exito', workspace: workspace })
        }
        catch(error){
            return res.status(500).json({ message: 'Error al eliminar el workspace', error: error.message })
        }
    }
}

const workspaceController = new WorkspaceController()
export default workspaceController