//@ts-check

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import { formatPrice } from '../../utils/constants';

const styles = {
    card: {
        minWidth: 275,
        textAlign: 'center'
    },
    textCenter: {
        textAlign: 'center'
    },
    flex: {
        display: 'flex',
        flexDirection: 'column'
    },
    alignEnd: {
        alignSelf: 'flex-end',
        margin: '7px'
    },
    paddingTop: {
        paddingTop: '14px'
    }
};

class EventCard extends Component {
    render() {
        const { classes, element } = this.props;

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography type="headline" component="h2">
                        {element.title}
                    </Typography>
                    <Typography
                        component="p"
                        style={{ fontWeight: 'bold' }}
                        className={classes.paddingTop}
                    >
                        {element.date}
                    </Typography>
                    <Typography component="p" className={classes.paddingTop}>
                        Organiser: {element.organiser}
                    </Typography>
                    <Typography component="p" className={classes.paddingTop}>
                        Price: Rs. {formatPrice(element.price)}
                    </Typography>
                </CardContent>
                <CardActions className={classes.flex}>
                    <Button
                        dense
                        component={NavLink}
                        to={`/dashboard/events/${element.id}`}
                        className={classes.alignEnd}
                    >
                        View Details
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

EventCard.propTypes = {
    classes: PropTypes.object.isRequired,
    element: PropTypes.object.isRequired
};

export default withStyles(styles)(EventCard);
