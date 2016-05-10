import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import moment                          from 'moment';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';
import JobStatusPreviousBuild          from './JobStatusPreviousBuild.jsx';


class BuildTypeStatus extends Component {
    constructor(props) {
        super(props);

        this.state = { builds: [] };
    }

    getApiRequest() {
        const { buildtypeid, layout } = this.props;

        return {
            id:     `teamcity.buildtype.${buildtypeid}`,
            params: { buildtypeid, layout }
        };
    }

    onApiData(builds) {
        this.setState({ builds });
    }

    render() {
        const { buildtypeid, layout, title } = this.props;
        const { builds }             = this.state;

        let currentNode  = null;
        let previousNode = null;
        let statusClasses;
        let iconClasses;

        const finalTitle = title || `TeamCity build config: ${ buildtypeid }`;

        if (layout === 'bold') {
            if (builds.length > 0) {
                const currentBuild = builds[0];
                if (currentBuild.status === 'SUCCESS') {
                    iconClasses = 'fa fa-check';
                }

                statusClasses = `widget__body__colored jenkins__view__job__build__colored_status--${ currentBuild.status.toLowerCase() }`;

                currentNode = (
                    <div className="jenkins__job-status__current">
                        Build #{currentBuild.number}<br />
                        <span className="jenkins__job-status__current__status">
                            {finalTitle}&nbsp;
                            <i className={iconClasses}/>
                        </span><br/>
                        <time className="jenkins__job-status__current__time">
                            <i className="fa fa-clock-o"/>&nbsp;
                            {moment(currentBuild.finishDate).fromNow()}
                        </time>
                    </div>
                );

            }

            return (
                <div className={statusClasses}>
                    {currentNode}
                </div>
            );
        }

        iconClasses = 'fa fa-close';

        if (builds.length > 0) {
            const currentBuild = builds[0];
            if (currentBuild.status === 'SUCCESS') {
                iconClasses = 'fa fa-check';
            }

            statusClasses = `jenkins__job-status__current__status jenkins__job-status__current__status--${ currentBuild.status.toLowerCase() }`;

            currentNode = (
                <div className="jenkins__job-status__current">
                    Build #{currentBuild.number}<br />
                    <span className={statusClasses}>
                        {currentBuild.status}&nbsp;
                        <i className={iconClasses} />
                    </span><br/>
                    <time className="jenkins__job-status__current__time">
                        <i className="fa fa-clock-o" />&nbsp;
                        {moment(currentBuild.finishDate).fromNow()}
                    </time>
                </div>
            );

            if (builds.length > 1) {
                previousNode = <JobStatusPreviousBuild build={builds[1]} />;
            }
        }

        return (
            <div>
                <div className="widget__header">
                    {finalTitle}
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
                    {currentNode}
                    {previousNode}
                </div>
            </div>
        );
    }
}

BuildTypeStatus.displayName = 'BuildTypeStatus';

BuildTypeStatus.propTypes = {
    buildtypeid:    PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired,
    title:  PropTypes.string
};

BuildTypeStatus.defaultProps = {
    layout: 'default'
};

reactMixin(BuildTypeStatus.prototype, ListenerMixin);
reactMixin(BuildTypeStatus.prototype, Mozaik.Mixin.ApiConsumer);


export default BuildTypeStatus;
