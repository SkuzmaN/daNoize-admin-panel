import React from "react";

import { useParams } from "react-router-dom";
import { CircularProgress, Typography, Divider, Grid } from "@material-ui/core";
import { useEventDetailsQuery } from "../features/api/graphql";
import { AttendersList } from "../features/events/components/AttendersList";

export const EventDetailsPage: React.FC = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const { loading, data } = useEventDetailsQuery({
        variables: {
            uuid,
        },
    });
    if (loading) {
        return <CircularProgress color="primary" size={40} />;
    }
    return (
        <div>
            <Typography variant="h3" component="h1" gutterBottom>
                {data?.event.title}
            </Typography>
            <Divider />
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <AttendersList items={data?.event.attenders || []} />
                </Grid>
            </Grid>
        </div>
    );
};
