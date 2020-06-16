import React, { useEffect, useCallback, useRef } from "react";

import { useParams } from "react-router-dom";
import {
    CircularProgress,
    Typography,
    Divider,
    Grid,
    makeStyles,
    Paper,
} from "@material-ui/core";
import {
    useEventDetailsQuery,
    AttenderModifiedDocument,
    AttenderModifiedSubscription,
    AttenderModifiedSubscriptionVariables,
    IncidentAppearedSubscription,
    IncidentAppearedSubscriptionVariables,
    IncidentAppearedDocument,
    EventStatusChangedSubscription,
    EventStatusChangedSubscriptionVariables,
    EventStatusChangedDocument
} from "../features/api/graphql";
import { AttendersList } from "../features/events/components/AttendersList";
import { IncidentsList } from "../features/incidents/components/IncidentsList";
import { AddIncident } from "../features/incidents/components/AddIncident";
import dayjs from "dayjs";
import { Trans, useTranslation } from "react-i18next";
import { ChangeStatus } from "../features/events/components/ChangeStatus";

const useStyles = makeStyles((theme) => ({
    divider: {
        marginBottom: theme.spacing(1),
    },
    section: {
        padding: theme.spacing(2, 1),
    },
    incidentsListWrapper: {
        height: 500,
        overflowY: "auto",
    },
}));

export const EventDetailsPage: React.FC = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const { loading, data, subscribeToMore } = useEventDetailsQuery({
        variables: {
            uuid,
        },
    });
    const styles = useStyles();
    const { t } = useTranslation();
    const incidentsListWrapperRef = useRef<HTMLDivElement | null>(null);

    const subscribeToAttenderModified = useCallback(
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

    const subscribeToIncidentAdded = useCallback(
        () =>
            subscribeToMore<
                IncidentAppearedSubscription,
                IncidentAppearedSubscriptionVariables
            >({
                document: IncidentAppearedDocument,
                variables: {
                    event: uuid,
                },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) {
                        return prev;
                    }
                    const newIncident = subscriptionData.data.incidentAppeared;
                    return {
                        ...prev,
                        event: {
                            ...prev.event,
                            incidents: [newIncident, ...prev.event.incidents],
                        },
                    };
                },
            }),
        [subscribeToMore, uuid]
    );

    const subscribeToStatusChanged = useCallback(
        () =>
            subscribeToMore<
                EventStatusChangedSubscription,
                EventStatusChangedSubscriptionVariables
            >({
                document: EventStatusChangedDocument,
                variables: {
                    event: uuid,
                },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) {
                        return prev;
                    }
                    const { status } = subscriptionData.data.eventStatusChanged;
                    return {
                        ...prev,
                        event: {
                            ...prev.event,
                            status,
                        },
                    };
                },
            }),
        [subscribeToMore, uuid]
    );

    useEffect(() => {
        subscribeToAttenderModified();
        subscribeToIncidentAdded();
        subscribeToStatusChanged();
    }, [
        subscribeToAttenderModified,
        subscribeToIncidentAdded,
        subscribeToStatusChanged,
    ]);

    useEffect(() => {
        if (incidentsListWrapperRef.current) {
            incidentsListWrapperRef.current.scrollTo(0, 0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.event.incidents]);

    if (loading) {
        return <CircularProgress color="primary" size={40} />;
    }
    return (
        <div>
            <Typography variant="h3" component="h1" gutterBottom>
                {data?.event.title}
            </Typography>
            <Divider className={styles.divider} />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={styles.section}>
                        <Typography>
                            <Trans
                                i18nKey="eventDetails.plannedStartedDate"
                                values={{
                                    date: dayjs(
                                        data?.event.plannedStartDate
                                    ).format("DD-MM-YYYY HH:mm:ss"),
                                }}
                            >
                                Planned start date <strong>date</strong>
                            </Trans>
                        </Typography>
                        <Divider className={styles.divider} />
                        <Trans
                            i18nKey="eventDetails.actualStatus"
                            values={{
                                status: t(
                                    `eventStatuses.${(
                                        data?.event.status || ""
                                    ).toLowerCase()}`
                                ),
                            }}
                        >
                            Actual state: <strong>state</strong>
                        </Trans>
                        <ChangeStatus
                            event={uuid}
                            defaultStatus={data?.event.status}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <AttendersList items={data?.event.attenders || []} />
                </Grid>
                <Grid item xs={6}>
                    <Paper className={styles.section}>
                        <div
                            className={styles.incidentsListWrapper}
                            ref={incidentsListWrapperRef}
                        >
                            <IncidentsList
                                items={data?.event.incidents || []}
                            />
                        </div>
                        <Divider className={styles.divider} />
                        <AddIncident eventUuid={uuid} />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};
