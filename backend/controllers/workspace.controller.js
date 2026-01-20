import workspaceRepository from "../repository/workspaces-repository.js"

class WorkspaceController {

    async createWorkspace(req,res){
        try{
            const {title, description, image} = req.body

            const user = req.user

            const workspace = await workspaceRepository.createWorkspace(user.id, title, description, image)

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
}

const workspaceController = new WorkspaceController()
export default workspaceController