import { EventDetailsQuery } from "../../../api/graphql";

export type Attender = EventDetailsQuery['event']['attenders'][0]