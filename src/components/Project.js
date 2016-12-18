import React, { Component, PropTypes } from 'react' // eslint-disable-line no-unused-vars
import ProjectBuildTypes               from './ProjectBuildTypes'

class Project extends Component {
    
    static getApiRequest({projectid}) {
        return {
            id:     `teamcity.project.${projectid}`,
            params: { projectid }
        }
    }

    render() {
        const {title, projectid, apiData: project } = this.props

        let titleNode = (
            <span>
                TeamCity <span className="widget__header__subject">{projectid}</span> project
            </span>
        )
        if (title) {
            titleNode = this.props.title
        }

        let buildtypesNode = null
        if (project) {
            buildtypesNode = <ProjectBuildTypes buildtypes={project.buildTypes.buildType} />
        }

        return (
            <div>
                <div className="widget__header">
                    {titleNode}
                    <i className="fa fa-tasks" />
                </div>
                <div className="widget__body">
                    {buildtypesNode}
                </div>
            </div>
        )
    }
}

Project.propTypes = {
    projectid: PropTypes.string.isRequired,
    title: PropTypes.string,
    apiData: PropTypes.object
}

export default Project
