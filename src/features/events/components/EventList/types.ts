import { EventsListQuery } from "../../../api/graphql";

export type Event = EventsListQuery['events'][0]