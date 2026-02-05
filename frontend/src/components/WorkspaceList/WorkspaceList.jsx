import './WorkspaceList.css'
import { useContext } from 'react'
import { WorkspaceContext } from '../../context/WorkspaceContext'

const WorkspaceList = ({ id, title, description, image, created_at }) => {

  const { deleteWorkspace } = useContext(WorkspaceContext);

  const handleDelete = async (idWorkspace) => {
    try {
      await deleteWorkspace(idWorkspace);
    } catch (error) {
      console.error('Error deleting workspace:', error);
    }
  }

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

  return (
    <div className="workspace-list-card">
      <div className="workspace-image-container">
        <button onClick={() => handleDelete(id)}
          className="workspace-delete-button"
          title="Eliminar workspace"
        >
          <i className="bi bi-trash"></i>
        </button>

        {image ? (
          <img
            src={image}
            alt={title}
            className="workspace-image"
          />
        ) : (
          <div className="workspace-image-placeholder">
            <span className="workspace-initial">
              {title?.[0]?.toUpperCase()}
            </span>
          </div>
        )}
      </div>

      <div className="workspace-content">
        <div className="workspace-header">
          <h3 className="workspace-title">{title}</h3>
          <span className="workspace-date">
            {formatDate(created_at)}
          </span>
        </div>

        {description && (
          <p className="workspace-description">{description}</p>
        )}

        <div className="workspace-footer">
          <button className="workspace-open-button">
            Abrir
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default WorkspaceList
