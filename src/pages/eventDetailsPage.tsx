import React, { useEffect, useCallback } from "react";

import { useParams } from "react-router-dom";
import { CircularProgress, Typography, Divider, Grid } from "@material-ui/core";
import {
    useEventDetailsQuery,
    AttenderModifiedDocument,
    AttenderModifiedSubscription,
    AttenderModifiedSubscriptionVariables,
} from "../features/api/graphql";
import { AttendersList } from "../features/events/components/AttendersList";

export const EventDetailsPage: React.FC = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const { loading, data, subscribeToMore } = useEventDetailsQuery({
        variables: {
            uuid,
        },
    });

    const more = useCallback(
        () =>
            subscribeToMore<
                AttenderModifiedSubscription,
                AttenderModifiedSubscriptionVariables
            >({
                document: AttenderModifiedDocument,
                variables: {
                    event: uuid,
                },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) {
                        return prev;
                    }
                    const updatedAttender =
                        subscriptionData.data.attenderModified;
                    const updatedAttenders = prev.event.attenders.map(
                        (attender) => {
                            if (attender.uuid === updatedAttender.uuid) {
                                return updatedAttender;
                            }
                            return attender;
                        }
                    );
                    return {
                        ...prev,
                        event: {
                            ...prev.event,
                            attenders: updatedAttenders,
                        },
                    };
                },
            }),
        [subscribeToMore, uuid]
    );

    useEffect(() => {
        more();
    }, [more]);

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
