import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';
import ProjectBuildTypes               from './ProjectBuildTypes.jsx';


class Project extends Component {
    constructor(props) {
        super(props);

        this.state = { project: null };
    }

    getApiRequest() {
        const { projectid } = this.props;

        return {
            id:     `teamcity.project.${projectid}`,
            params: { projectid }
        };
    }

    onApiData(project) {
        this.setState({ project });
    }

    render() {
        let titleNode = (
            <span>
                TeamCity <span className="widget__header__subject">{this.props.projectid}</span> project
            </span>
        );
        if (this.props.title) {
            titleNode = this.props.title;
        }

        let buildtypesNode = null;
        if (this.state.project) {
            buildtypesNode = <ProjectBuildTypes buildtypes={this.state.project.buildTypes.buildType} />;
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
        );
    }
}

Project.displayName = 'Project';

Project.propTypes = {
    project:  PropTypes.string.isRequired,
    title: PropTypes.string
};

reactMixin(Project.prototype, ListenerMixin);
reactMixin(Project.prototype, Mozaik.Mixin.ApiConsumer);


export default Project;
