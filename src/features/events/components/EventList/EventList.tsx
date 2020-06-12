import React from "react";
import { Event } from "./types";
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "block",
        margin: theme.spacing(2, 0),
        textDecoration: "none",
    },
}));

interface EventListProps {
    items: Event[];
}

export const EventList: React.FC<EventListProps> = ({ items }) => {
    const styles = useStyles();
    return (
        <>
            {items.map((event) => (
                <Link
                    to={`/event/${event.uuid}`}
                    key={event.uuid}
                    className={styles.root}
                >
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                {dayjs(event.plannedStartDate).format(
                                    "DD-MM-YYYY HH:mm:ss"
                                )}
                            </Typography>
                            <Typography variant="h5" component="h3">
                                {event.title}
                            </Typography>
                            <Typography
                                color="primary"
                                gutterBottom
                                align="center"
                            >
                                {event.attenders
                                    .map(({ team: { name } }) => name)
                                    .join(" vs ")}
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </>
    );
};
