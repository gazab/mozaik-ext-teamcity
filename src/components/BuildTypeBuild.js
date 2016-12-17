import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import moment                          from 'moment';


class BuildTypeBuild extends Component {
    render() {
        const { build } = this.props;

        const classes = `list__item list__item--with-status list__item--with-status--${ build.status.toLowerCase() }`;

        return (
            <div className={classes}>
                #{build.number} {build.status}&nbsp;
                <time className="list__item__time">
                    <i className="fa fa-clock-o" />&nbsp;
                    {moment(build.finishDate).fromNow()}
                </time>
            </div>
        );
    }
}

BuildTypeBuild.propTypes = {
    build: PropTypes.shape({
        number:    PropTypes.number.isRequired,
        status:    PropTypes.string.isRequired,
        finishDate: PropTypes.string.isRequired
    }).isRequired
};


export default BuildTypeBuild;
