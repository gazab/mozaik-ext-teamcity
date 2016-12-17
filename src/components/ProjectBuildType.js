import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import ProjectBuildTypeBuildStatus     from './ProjectBuildTypeBuildStatus.jsx';
import ProjectBuildTypeHealthReport    from './ProjectBuildTypeHealthReport.jsx';
import ProjectBuildTypeBuildTime       from './ProjectBuildTypeBuildTime.jsx';
import ProjectBuildTypeBuildDuration   from './ProjectBuildTypeBuildDuration.jsx';


class ProjectBuildType extends Component {
    render() {
        const { buildtype } = this.props;

        console.log(this.props.buildtype);

        return (
            <tr className="table__row">
                <ProjectBuildTypeBuildStatus build={buildtype.lastBuild.build[0]} />
                <td className="table__cell">{buildtype.name}</td>
                <ProjectBuildTypeHealthReport builds={buildtype.lastBuild.build} cap={10}/>
                <ProjectBuildTypeBuildTime build={buildtype.success.build[0]} />
                <ProjectBuildTypeBuildTime build={buildtype.failure.build[0]} />
                <ProjectBuildTypeBuildDuration build={buildtype.lastBuild.build[0]} />
            </tr>
        );
    }
}

ProjectBuildType.displayName = 'ProjectBuildType';

ProjectBuildType.propTypes = {
    buildtype: PropTypes.object.isRequired
};


export default ProjectBuildType;
