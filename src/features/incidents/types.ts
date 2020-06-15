import { EventDetailsQuery } from "../api/graphql";

export type Incident = EventDetailsQuery['event']['incidents'][0]