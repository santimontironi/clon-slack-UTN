import workspaceRepository from "../repository/workspaces-repository.js";

export const memberMiddleware = async (req, res, next) => {
    try {
        const { idWorkspace } = req.params

        const user = req.user.id

        const member = await workspaceRepository.findWorkspaceByIdAndUser(idWorkspace, user)

        if (!member) {
            return res.status(403).json({ message: 'No perteneces a este workspace.' })
        }

        if (!member.fk_id_workspace) {
            return res.status(403).json({ message: 'Workspace inactivo o no disponible' })
        }

        req.member = member

        next()
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al verificar el miembro', error: error.message })
    }
}