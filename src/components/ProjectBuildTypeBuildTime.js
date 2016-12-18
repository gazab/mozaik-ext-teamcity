import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import moment                          from 'moment';


class ProjectBuildTypeBuildTime extends Component {
    render() {
        if (!this.props.build) {
            return <td className="table__cell">n/a</td>;
        }

        const { build } = this.props;

        return (
            <td className="table__cell">
                {moment(build.finishDate).fromNow()}
            </td>
        );
    }
}

ProjectBuildTypeBuildTime.propTypes = {
    build: PropTypes.object
};

export default ProjectBuildTypeBuildTime;
