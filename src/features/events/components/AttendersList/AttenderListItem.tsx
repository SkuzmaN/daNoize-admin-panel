import React from "react";
import { Attender } from "./types";
import {
    CardHeader,
    Card,
    Avatar,
    makeStyles,
    CardContent,
    Typography,
    Divider,
    Chip,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { ChangeScore } from "../ChangeScore";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2, 0),
        "&:first-child": {
            marginTop: 0,
        },
    },
    reactionsWrapper: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(0.5),
        },
    },
}));

interface AttenderListItem {
    item: Attender;
}

export const AttenderListItem: React.FC<AttenderListItem> = ({ item }) => {
    const styles = useStyles();
    const { t } = useTranslation();
    return (
        <Card className={styles.root}>
            <CardHeader
                title={item.team.name}
                avatar={<Avatar alt={item.team.name} src={item.team.logo} />}
                action={
                    <ChangeScore
                        defaultScore={item.score}
                        teamName={item.team.name}
                        attenderUuid={item.uuid}
                    />
                }
            />
            <CardContent>
                <Typography variant="h6" color="textSecondary">
                    {t("eventDetails.attenderList.score", {
                        score: item.score,
                    })}
                </Typography>
                <Divider />
                <Typography variant="h6" color="textSecondary">
                    {t("eventDetails.attenderList.availableReactions")}
                </Typography>
                <div className={styles.reactionsWrapper}>
                    {item.availableReactions.map((availableReaction) => (
                        <Chip
                            key={availableReaction.uuid}
                            label={availableReaction.reaction.type}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
