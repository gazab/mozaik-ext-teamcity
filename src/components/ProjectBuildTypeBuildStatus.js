import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars


class ProjectBuildTypeBuildStatus extends Component {
    render() {
        if (!this.props.build) {
            return (
                <td className="table__cell">
                    <span className="teamcity__project__buildtype__build__status teamcity__project__buildtype__build__status--unknown">
                        <i className="fa fa-question-circle" />
                    </span>
                </td>
            );
        }

        const { build } = this.props;

        let iconClasses = 'fa fa-';
        switch (build.status) {
            case 'SUCCESS':
                iconClasses += 'check-circle';
                break;

            case 'FAILURE':
                iconClasses += 'warning';
                break;

            default:
                iconClasses += 'question-circle';
                break;
        }

        let statusClasses = 'teamcity__project__buildtype__build__status ';
        if (build.status) {
            statusClasses += `teamcity__project__buildtype__build__status--${build.status.toLowerCase()}`;
        }

        return (
            <td className="table__cell">
                <span className={statusClasses}>
                    <i className={iconClasses} />
                </span>
            </td>
        );
    }
}

ProjectBuildTypeBuildStatus.propTypes = {
    build: PropTypes.object
};


export default ProjectBuildTypeBuildStatus;
