import React from "react";
import { Attender } from "./types";
import {
    CardHeader,
    Card,
    Avatar,
    makeStyles,
    CardContent,
    Typography,
    IconButton,
    Divider,
    Chip,
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2, 0),
    },
    reactionsWrapper: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(0.5),
        },
    },
}));

interface AttendersListProps {
    items: Attender[];
}

export const AttendersList: React.FC<AttendersListProps> = ({ items }) => {
    const styles = useStyles();
    const { t } = useTranslation();
    return (
        <div>
            {items.map((attender) => {
                return (
                    <Card key={attender.uuid} className={styles.root}>
                        <CardHeader
                            title={attender.team.name}
                            avatar={
                                <Avatar
                                    alt={attender.team.name}
                                    src={attender.team.logo}
                                />
                            }
                        />
                        <CardContent>
                            <Typography variant="h6" color="textSecondary">
                                {t("eventDetails.attenderList.score", {
                                    score: attender.score,
                                })}
                                 <IconButton aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                            </Typography>
                            <Divider />
                            <Typography variant="h6" color="textSecondary">
                                {t(
                                    "eventDetails.attenderList.availableReactions"
                                )}
                            </Typography>
                            <div className={styles.reactionsWrapper}>
                                {attender.availableReactions.map(
                                    (availableReaction) => (
                                        <Chip
                                            key={availableReaction.uuid}
                                            label={
                                                availableReaction.reaction.type
                                            }
                                        />
                                    )
                                )}
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};
