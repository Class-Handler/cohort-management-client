import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import projectService from "../services/project.services"

const ProjectPreferencesPage = () => {
    const [project, stProject] = useState(null)

const {cohortId, projectId} = useParams()

const getProject = async () => {
try {
    const response = await projectService.getProject(cohortId, projectId)
    stProject(response.data)
} catch (error) {
    console.log(error)
}
}

useEffect(() => {
    getProject()
}, [])

if(!project){
    return <h1>Loading....</h1>
}

    return (
        <div>PREFEEN</div>
    )
}

export default ProjectPreferencesPage