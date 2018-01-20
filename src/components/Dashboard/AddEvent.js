import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

import moment from 'moment';
import { addNewEvent } from '../../utils/api';
import { actionDisplayMessage } from './../../actions/NotificationAction';

const styles = theme => ({
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
    card: {
        maxWidth: 345,
        margin: '0 auto',
        marginTop: '21px'
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

class AddEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            organiser: '',
            price: 0,
            date: moment().format('YYYY-MM-DD'),
            loading: false
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleOrganiserChange = this.handleOrganiserChange.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }

    handleOrganiserChange(event) {
        this.setState({ organiser: event.target.value });
    }

    handlePriceChange(event) {
        let accepted = parseFloat(event.target.value);
        if (accepted) this.setState({ price: accepted });
        else if (event.target.value === '') this.setState({ price: '' });
    }

    handleDateChange(event) {
        let value = event.target.value;

        this.setState({
            date: moment(value).format('YYYY-MM-DD')
        });
    }

    handleFormSubmit(event) {
        if (event) event.preventDefault();

        let { title, organiser, price, date } = this.state;
        if (
            price <= 1 ||
            moment().isAfter(moment(date)) ||
            !title ||
            !organiser
        ) {
            this.props.displayNotification(
                'Invalid Form Fields',
                new Date(),
                'error'
            );
            return;
        }

        addNewEvent(title, date, organiser, price).then(res => {
            if (!res.error) {
                this.resetForm();
                this.props.displayNotification(
                    'Event successfully added',
                    new Date(),
                    'success'
                );
            } else this.setState({ loading: false });
        });
    }

    resetForm() {
        this.setState({
            title: '',
            organiser: '',
            price: 0,
            date: moment().format('YYYY-MM-DD'),
            loading: false
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Typography
                    component="h2"
                    type="headline"
                    style={{ textAlign: 'center' }}
                >
                    Add Event
                </Typography>
                <Card className={classes.card}>
                    <CardContent>
                        <TextField
                            id="title"
                            label="Event Title"
                            value={this.state.title}
                            onChange={this.handleTitleChange}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            id="title"
                            label="Event Organiser"
                            value={this.state.organiser}
                            onChange={this.handleOrganiserChange}
                            margin="normal"
                            fullWidth
                        />
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="amount">Price</InputLabel>
                            <Input
                                id="adornment-amount"
                                value={this.state.price}
                                onChange={this.handlePriceChange}
                                startAdornment={
                                    <InputAdornment position="start">
                                        Rs.
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <TextField
                            id="date"
                            label="Date"
                            type="date"
                            value={this.state.date}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true
                            }}
                            onChange={this.handleDateChange}
                        />
                    </CardContent>
                    <CardActions className="display-flex">
                        <Button
                            dense
                            onClick={this.handleFormSubmit}
                            raised
                            color="accent"
                            className="align-end"
                            disabled={this.state.loading}
                            style={{ margin: '7px' }}
                        >
                            Submit
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

AddEvent.propTypes = {
    classes: PropTypes.object.isRequired
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            displayNotification: actionDisplayMessage
        },
        dispatch
    );
}

const StyledAddEvent = withStyles(styles)(AddEvent);
export default withRouter(connect(null, matchDispatchToProps)(StyledAddEvent));
