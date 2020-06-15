import React from "react";
import { Incident } from "../../types";
import { makeStyles, Typography } from "@material-ui/core";
import dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        "&:first-child": {
            marginTop: 0,
        },
    },
    message: {
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.secondary.contrastText,
    },
    timestamp: {
        fontSize: 12,
    },
    divider: {
        margin: theme.spacing(1, 0),
    },
}));

interface IncidentsListItemProps {
    item: Incident;
}

export const IncidentsListItem: React.FC<IncidentsListItemProps> = ({
    item,
}) => {
    const styles = useStyles();
    const { message } = item.variables;
    if (!message) {
        return null;
    }
    return (
        <div className={styles.root}>
            <Typography className={styles.message}>{message}</Typography>
            <Typography className={styles.timestamp} align="right">
                {dayjs(item.createdAt).format("DD-MM-YYYY HH:mm:ss")}
            </Typography>
        </div>
    );
};
