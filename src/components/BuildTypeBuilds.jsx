import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';
import BuildTypeBuild                  from './BuildTypeBuild.jsx';


class BuildTypeBuilds extends Component {
    constructor(props) {
        super(props);

        this.state = { builds: [] };
    }

    getApiRequest() {
        const { buildtypeid } = this.props;

        return {
            id:     `teamcity.buildtype.${buildtypeid}`,
            params: { buildtypeid }
        };
    }

    onApiData(builds) {
        this.setState({ builds });
    }

    render() {
        const { builds } = this.state;
        const { title }  = this.props;

        return (
            <div>
                <div className="widget__header">
                    {title}
                    <span className="widget__header__count">
                        {builds.length}
                    </span>
                    <i className="fa fa-tasks" />
                </div>
                <div className="widget__body">
                    {builds.map(build => (
                        <BuildTypeBuild key={build.number} build={build} />
                    ))}
                </div>
            </div>
        );
    }
}

BuildTypeBuilds.displayName = 'BuildTypeBuilds';

BuildTypeBuilds.propTypes = {
    title: PropTypes.string.isRequired,
    buildtypeid:   PropTypes.string.isRequired
};

BuildTypeBuilds.defaultProps = {
    title: 'TeamCity build type builds'
};

reactMixin(BuildTypeBuilds.prototype, ListenerMixin);
reactMixin(BuildTypeBuilds.prototype, Mozaik.Mixin.ApiConsumer);


export default BuildTypeBuilds;
