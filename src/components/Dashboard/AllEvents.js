import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';

import EventCard from './EventCard';

import { getEventsPage } from './../../utils/api';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        height: 140,
        width: 100
    },
    control: {
        padding: theme.spacing.unit * 2
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary
    }
});

class AllEvents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            spacing: '16',
            events: [],
            loading: false
        };

        this.fetchEvents = this.fetchEvents.bind(this);
    }

    componentDidMount() {
        this.fetchEvents();
    }

    fetchEvents() {
        this.setState({ loading: true });

        getEventsPage(1).then(res => {
            if (!res.error) {
                this.setState({
                    loading: false,
                    events: res
                });
            } else this.setState({ loading: false });
        });
    }

    render() {
        const { classes } = this.props;
        const { spacing } = this.state;

        return (
            <div>
                {this.state.loading ? (
                    <div
                        style={{
                            textAlign: 'center',
                            margin: '0 auto',
                            marginTop: '21px'
                        }}
                    >
                        <CircularProgress
                            style={{ color: purple[500] }}
                            thickness={7}
                        />
                    </div>
                ) : (
                    <Grid container className={classes.root}>
                        <Grid item xs={12}>
                            <Grid
                                container
                                className={classes.demo}
                                justify="center"
                                spacing={Number(spacing)}
                            >
                                {this.state.events.map(element => {
                                    return (
                                        <Grid key={element.id} item>
                                            <EventCard element={element} />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </div>
        );
    }
}

AllEvents.propTypes = {
    classes: PropTypes.object.isRequired
};

const StyledAllEvents = withStyles(styles)(AllEvents);
export default withRouter(StyledAllEvents);
