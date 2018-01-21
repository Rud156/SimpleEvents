//@ts-check

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';

import { actionAddUser } from './../../actions/UserAction';
import { actionDisplayMessage } from './../../actions/NotificationAction';

const styles = theme => ({
    card: {
        maxWidth: 345,
        margin: '0 auto',
        marginTop: '21px'
    },
    media: {
        height: 200
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200
    },
    menu: {
        width: 200
    },
    justifyCont: {
        justifyContent: 'space-between'
    },
    marginRight: {
        marginRight: '21px'
    }
});

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showLogin: true,
            username: 'Rud156',
            password: '00000'
        };

        this.toggleSignup = this.toggleSignup.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleFromSubmit = this.handleFromSubmit.bind(this);
    }

    toggleSignup() {
        let { showLogin } = this.state;
        this.setState({ showLogin: !showLogin });
    }

    handleUsernameChange(event) {
        let username = event.target.value;
        this.setState({ username: username });
    }

    handlePasswordChange(event) {
        let password = event.target.value;
        this.setState({ password: password });
    }

    handleFromSubmit(event) {
        if (event) event.preventDefault();

        let { username, password } = this.state;
        if (!username || !password) {
            this.props.displayNotification(
                'Fields cannot be blank',
                Date.now(),
                'warning'
            );
            return;
        }

        if (this.state.showLogin) {
            this.props.addUser(
                {
                    username: 'Rud156'
                },
                'TestToken'
            );
            this.props.history.push('/dashboard');
            this.props.displayNotification(
                'Login Successful',
                Date.now(),
                'success'
            );
        } else {
            this.props.displayNotification(
                'Registration Successful. Please login to continue',
                Date.now(),
                'success'
            );
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Typography
                    type="headline"
                    component="h2"
                    style={{
                        margin: '0 auto',
                        textAlign: 'center',
                        marginTop: '14px'
                    }}
                    color="accent"
                >
                    EventIst
                </Typography>
                <Typography
                    type="headline"
                    component="h3"
                    style={{ margin: '0 auto', textAlign: 'center' }}
                >
                    A manager for all your Events
                </Typography>
                <Card className={classes.card}>
                    <CardMedia
                        image="/static/background.jpg"
                        title="Contemplative Reptile"
                        className={classes.media}
                    />
                    <CardContent>
                        <Typography type="headline" component="h2">
                            {this.state.showLogin ? 'Login' : 'Register'}
                        </Typography>
                        <Typography component="p">
                            <form
                                className={classes.container}
                                noValidate
                                autoComplete="off"
                                onSubmit={this.handleFromSubmit}
                            >
                                <TextField
                                    id="name"
                                    label="Name"
                                    value={this.state.username}
                                    onChange={this.handleUsernameChange}
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    id="password"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    margin="dense"
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                    fullWidth
                                />
                            </form>
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.justifyCont}>
                        <Button
                            dense
                            color="primary"
                            onClick={this.toggleSignup}
                        >
                            {this.state.showLogin
                                ? 'Not yet registered?'
                                : 'Already Registered?'}
                        </Button>
                        <Button
                            dense
                            onClick={this.handleFromSubmit}
                            style={{
                                backgroundColor: red[500],
                                color: 'white'
                            }}
                            raised
                            className={classes.marginRight}
                        >
                            {this.state.showLogin ? 'Login' : 'Register'}
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            addUser: actionAddUser,
            displayNotification: actionDisplayMessage
        },
        dispatch
    );
}

const CompHomepage = withStyles(styles)(HomePage);
export default withRouter(connect(null, matchDispatchToProps)(CompHomepage));
