import React, { Component, PropTypes } from 'react' // eslint-disable-line no-unused-vars
import ProjectBuildTypeBuildStatus     from './ProjectBuildTypeBuildStatus'
import ProjectBuildTypeHealthReport    from './ProjectBuildTypeHealthReport'
import ProjectBuildTypeBuildTime       from './ProjectBuildTypeBuildTime'
import ProjectBuildTypeBuildDuration   from './ProjectBuildTypeBuildDuration'


class ProjectBuildType extends Component {
    render() {
        const { buildtype } = this.props

        return (
            <tr className="table__row">
                <ProjectBuildTypeBuildStatus build={buildtype.lastBuild.build[0]} />
                <td className="table__cell">{buildtype.name}</td>
                <ProjectBuildTypeHealthReport builds={buildtype.lastBuild.build} cap={10}/>
                <ProjectBuildTypeBuildTime build={buildtype.success.build[0]} />
                <ProjectBuildTypeBuildTime build={buildtype.failure.build[0]} />
                <ProjectBuildTypeBuildDuration build={buildtype.lastBuild.build[0]} />
            </tr>
        )
    }
}

ProjectBuildType.propTypes = {
    buildtype: PropTypes.object.isRequired
}

export default ProjectBuildType
