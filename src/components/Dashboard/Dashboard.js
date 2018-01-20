import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Route,
    BrowserRouter,
    Switch,
    Redirect,
    NavLink
} from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import purple from 'material-ui/colors/purple';

import { titleCase } from '../../utils/constants';
import { actionRemoveUser } from './../../actions/UserAction';

import AllEvents from './AllEvents';
import AddEvent from './AddEvent';
import EventDetails from './EventDetails';
import SearchEvent from './SearchEvent';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        minHeight: '100vh',
        zIndex: 1,
        overflow: 'hidden'
    },
    flex: {
        flex: 1
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%'
    },
    appBar: {
        position: 'absolute',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`
        }
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    drawerHeader: theme.mixins.toolbar,
    drawerPaper: {
        width: 250,
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            position: 'relative',
            height: '100%'
        },
        height: '100vh !important'
    },
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        padding: theme.spacing.unit * 3,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64
        },
        overflow: 'auto'
    }
});

class DashBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mobileOpen: false
        };

        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
    }

    handleDrawerToggle() {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    }

    logoutUser() {
        this.props.removeUser();
        this.props.history.push('/');
    }

    render() {
        const { classes, theme } = this.props;

        const drawer = (
            <div>
                <div className={classes.drawerHeader} />
                <Typography
                    type="headline"
                    component="h3"
                    style={{ textAlign: 'center', marginBottom: '14px' }}
                >
                    Quick Open
                </Typography>
                <Divider />
                <List>
                    <ListItem
                        button
                        component={NavLink}
                        exact
                        to="/dashboard"
                        activeClassName="active"
                    >
                        <ListItemIcon>
                            <Icon>home</Icon>
                        </ListItemIcon>
                        <ListItemText primary="All Events" />
                    </ListItem>
                    <ListItem
                        button
                        component={NavLink}
                        exact
                        to="/dashboard/add"
                        activeClassName="active"
                    >
                        <ListItemIcon>
                            <Icon>note_add</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Add Event" />
                    </ListItem>
                    <ListItem
                        button
                        component={NavLink}
                        exact
                        to="/dashboard/search"
                        activeClassName="active"
                    >
                        <ListItemIcon>
                            <Icon>search</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Search" />
                    </ListItem>
                </List>
                <Divider />
            </div>
        );

        return (
            <BrowserRouter>
                <div className={classes.root}>
                    <div className={classes.appFrame}>
                        <AppBar className={classes.appBar}>
                            <Toolbar style={{ backgroundColor: purple[500] }}>
                                <IconButton
                                    color="contrast"
                                    aria-label="open drawer"
                                    onClick={this.handleDrawerToggle}
                                    className={classes.navIconHide}
                                >
                                    <Icon>menu</Icon>
                                </IconButton>
                                <Typography
                                    type="title"
                                    color="inherit"
                                    noWrap
                                    className={classes.flex}
                                >
                                    {titleCase(
                                        this.props.user.userDetails.username
                                    )}'s DashBoard
                                </Typography>
                                <Button
                                    color="contrast"
                                    onClick={this.logoutUser}
                                >
                                    Logout
                                </Button>
                            </Toolbar>
                        </AppBar>
                        <Hidden mdUp>
                            <Drawer
                                type="temporary"
                                anchor={
                                    theme.direction === 'rtl' ? 'right' : 'left'
                                }
                                open={this.state.mobileOpen}
                                classes={{
                                    paper: classes.drawerPaper
                                }}
                                onClose={this.handleDrawerToggle}
                                ModalProps={{
                                    keepMounted: true // Better open performance on mobile.
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden smDown implementation="css">
                            <Drawer
                                type="permanent"
                                open
                                classes={{
                                    paper: classes.drawerPaper
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <main className={classes.content}>
                            <Switch>
                                <Route
                                    exact
                                    path="/dashboard"
                                    component={AllEvents}
                                />
                                <Route
                                    exact
                                    path="/dashboard/search"
                                    component={SearchEvent}
                                />
                                <Route
                                    path="/dashboard/search/:organiser"
                                    component={SearchEvent}
                                />
                                <Route
                                    path="/dashboard/add"
                                    component={AddEvent}
                                />
                                <Route
                                    path="/dashboard/events/:id"
                                    component={EventDetails}
                                />
                                <Route
                                    render={() => {
                                        return <Redirect to="/dashboard" />;
                                    }}
                                />
                            </Switch>
                        </main>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

DashBoard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            removeUser: actionRemoveUser
        },
        dispatch
    );
}

const StyledDash = withStyles(styles, { withTheme: true })(DashBoard);
export default withRouter(
    connect(mapStateToProps, matchDispatchToProps)(StyledDash)
);
