import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';
import TextField from 'material-ui/TextField';

import {
    getEventDetails,
    getEventComments,
    addNewComment
} from '../../utils/api';
import { formatPrice } from '../../utils/constants';
import Divider from 'material-ui/Divider';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        height: 140,
        width: 100
    },
    media: {
        height: 200
    },
    card: {
        textAlign: 'center',
        margin: '0 auto'
    },
    control: {
        padding: theme.spacing.unit * 2
    },
    listSection: {
        backgroundColor: 'inherit'
    },
    listRoot: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        margin: '0 auto',
        textAlign: 'center'
    }
});

class EventDetails extends Component {
    constructor(props) {
        super(props);

        // match.params.id

        this.state = {
            event: {
                title: '',
                date: '',
                organiser: '',
                price: ''
            },
            comments: [],
            newCommentDisplay: false,
            potentialComment: '',
            submitComment: false
        };

        this.fetchEventDetails = this.fetchEventDetails.bind(this);
        this.fetchEventComments = this.fetchEventComments.bind(this);
        this.addEventComment = this.addEventComment.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
    }

    componentDidMount() {
        this.fetchEventDetails();
        this.fetchEventComments();
    }

    componentWillReceiveProps(nextProps) {
        let currentId = this.props.match.params.id;
        if (currentId !== nextProps.match.params.id) {
            this.fetchEventDetails();
            this.fetchEventComments();
        }
    }

    fetchEventDetails() {
        getEventDetails(this.props.match.params.id).then(res => {
            if (!res.error) this.setState({ event: res });
        });
    }

    fetchEventComments() {
        getEventComments(this.props.match.params.id).then(res => {
            if (!res.error) this.setState({ comments: res.comments });
        });
    }

    handleCommentChange(event) {
        let value = event.target.value;

        if (value)
            this.setState({ potentialComment: value, submitComment: true });
        else this.setState({ potentialComment: '', submitComment: false });
    }

    addEventComment() {
        let { submitComment, potentialComment, newCommentDisplay } = this.state;

        if (submitComment) {
            let id = this.props.match.params.id;
            addNewComment(id, potentialComment).then(res => {
                if (!res.error) {
                    let comments = res.filter(element => {
                        return element.postId === parseInt(id, 10);
                    });

                    this.setState({
                        potentialComment: '',
                        newCommentDisplay: false,
                        submitComment: false,
                        comments: comments
                    });
                }
            });
        } else {
            this.setState({ newCommentDisplay: !newCommentDisplay });
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <Card className={classes.card}>
                            <CardMedia
                                image="/static/event.jpg"
                                title="Contemplative Reptile"
                                className={classes.media}
                            />
                            <CardContent>
                                <Typography
                                    type="headline"
                                    component="h2"
                                    gutterBottom={true}
                                >
                                    {this.state.event.title}
                                </Typography>
                                <Typography
                                    type="title"
                                    component="h4"
                                    gutterBottom={true}
                                >
                                    {this.state.event.date}
                                </Typography>
                                <Typography
                                    type="subheading"
                                    component="h6"
                                    gutterBottom={true}
                                >
                                    Organised By: {this.state.event.organiser}
                                </Typography>
                                <Typography
                                    type="subheading"
                                    component="h6"
                                    gutterBottom={true}
                                >
                                    Total Cost: Rs.{' '}
                                    {formatPrice(this.state.event.price)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <List
                            className={classes.listRoot}
                            subheader={<ListSubheader>Comments</ListSubheader>}
                        >
                            <Divider />
                            {this.state.comments.map(element => {
                                return (
                                    <ListItem
                                        key={element.id}
                                        style={{ margin: '7px 0' }}
                                        divider={true}
                                    >
                                        <ListItemText primary={element.body} />
                                    </ListItem>
                                );
                            })}
                            {this.state.newCommentDisplay && (
                                <ListItem
                                    style={{ margin: '7px 0' }}
                                    divider={true}
                                >
                                    <TextField
                                        id="comment"
                                        label="Comment"
                                        value={this.state.potentialComment}
                                        onChange={this.handleCommentChange}
                                        margin="normal"
                                        fullWidth
                                    />
                                </ListItem>
                            )}
                            <ListItem
                                button
                                style={{ margin: '7px 0', textAlign: 'center' }}
                                divider={true}
                                onClick={this.addEventComment}
                            >
                                <Typography
                                    type="subheading"
                                    style={{
                                        margin: '0 auto',
                                        fontWeight: 'bolder'
                                    }}
                                >
                                    {this.state.submitComment
                                        ? 'Submit'
                                        : this.state.newCommentDisplay
                                          ? 'Close Comment Field'
                                          : 'Open Comment Field'}
                                </Typography>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

EventDetails.propTypes = {
    classes: PropTypes.object.isRequired
};

const StyledEventDetails = withStyles(styles)(EventDetails);
export default StyledEventDetails;
