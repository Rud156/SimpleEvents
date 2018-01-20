import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Grid from 'material-ui/Grid';

import EventCard from './EventCard';

import { getEventByOrganiser } from '../../utils/api';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    menu: {
        width: 200
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        margin: theme.spacing.unit
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3
    },
    gridRoot: {
        flexGrow: 1
    }
});

class SearchEvent extends Component {
    constructor(props) {
        super(props);

        console.log(props);

        this.state = {
            searchQuery: props.match.params.organiser,
            events: []
        };

        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }

    componentDidMount() {
        let organiser = this.props.match.params.organiser;
        if (organiser) this.fetchSearchData(organiser);
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.match.params.organiser !==
                this.props.match.params.organiser &&
            nextProps.match.params.organiser
        )
            this.fetchSearchData(nextProps.match.params.organiser);
    }

    handleSearchInput(event) {
        this.setState({ searchQuery: event.target.value });
    }

    handleSearchSubmit() {
        const { searchQuery } = this.state;
        this.props.history.push(`/dashboard/search/${searchQuery}`);
    }

    fetchSearchData(organiser) {
        getEventByOrganiser(organiser).then(res => {
            if (!res.error) this.setState({ events: res });
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <FormControl className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="password">Search</InputLabel>
                    <Input
                        id="search"
                        type="text"
                        value={this.state.searchQuery}
                        onChange={this.handleSearchInput}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={this.handleSearchSubmit}>
                                    send
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <br />
                <Grid
                    container
                    className={classes.gridRoot}
                    style={{ marginTop: '21px' }}
                >
                    <Grid item xs={12}>
                        <Grid
                            container
                            className={classes.demo}
                            justify="center"
                            spacing={Number('16')}
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
            </div>
        );
    }
}

SearchEvent.propTypes = {
    classes: PropTypes.object.isRequired
};

const StyledSearchEvent = withStyles(styles)(SearchEvent);
export default withRouter(StyledSearchEvent);
