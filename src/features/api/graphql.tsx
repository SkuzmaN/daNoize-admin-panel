import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Json: any;
};

export type Query = {
  __typename?: 'Query';
  events: Array<Event>;
  event: Event;
  upcoming: Array<Event>;
  mobileAppVersion: MobileAppVersion;
};


export type QueryEventsArgs = {
  orderBy?: Maybe<QueryEventsOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<EventWhereUniqueInput>;
  before?: Maybe<EventWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryEventArgs = {
  uuid: Scalars['String'];
};


export type QueryUpcomingArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};

export type QueryEventsOrderByInput = {
  plannedStartDate?: Maybe<OrderByArg>;
};

export enum OrderByArg {
  Asc = 'asc',
  Desc = 'desc'
}

export type EventWhereUniqueInput = {
  uuid?: Maybe<Scalars['String']>;
  countriesUuid?: Maybe<Scalars['String']>;
  leaguesUuid?: Maybe<Scalars['String']>;
  sportsUuid?: Maybe<Scalars['String']>;
};

export type Event = {
  __typename?: 'Event';
  uuid: Scalars['String'];
  title: Scalars['String'];
  status: EventStatus;
  plannedStartDate: Scalars['DateTime'];
  attenders: Array<Attender>;
  sport: Sport;
  league?: Maybe<League>;
  country: Country;
  incidents: Array<Incident>;
};


export type EventIncidentsArgs = {
  orderBy?: Maybe<EventIncidentsOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<IncidentWhereUniqueInput>;
  before?: Maybe<IncidentWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export enum EventStatus {
  Upcoming = 'UPCOMING',
  Live = 'LIVE',
  Archived = 'ARCHIVED'
}


export type Attender = {
  __typename?: 'Attender';
  uuid: Scalars['String'];
  team: Team;
  event: Event;
  score: Scalars['Int'];
  availableReactions: Array<AttenderAvailableReaction>;
  supportersNum: Scalars['Int'];
};


export type AttenderAvailableReactionsArgs = {
  where?: Maybe<AttenderAvailableReactionsWhereInput>;
};

export type Team = {
  __typename?: 'Team';
  uuid: Scalars['String'];
  name: Scalars['String'];
  logo: Scalars['String'];
};

export type AttenderAvailableReactionsWhereInput = {
  deletedAt?: Maybe<NullableDateTimeFilter>;
};

export type NullableDateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  not?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
};

export type AttenderAvailableReaction = {
  __typename?: 'AttenderAvailableReaction';
  uuid: Scalars['String'];
  reaction: Reaction;
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type Reaction = {
  __typename?: 'Reaction';
  uuid: Scalars['String'];
  type: Scalars['String'];
};

export type Sport = {
  __typename?: 'Sport';
  uuid: Scalars['String'];
  name: Scalars['String'];
};

export type League = {
  __typename?: 'League';
  uuid: Scalars['String'];
  name: Scalars['String'];
};

export type Country = {
  __typename?: 'Country';
  uuid: Scalars['String'];
  name: Scalars['String'];
};

export type EventIncidentsOrderByInput = {
  createdAt?: Maybe<OrderByArg>;
};

export type IncidentWhereUniqueInput = {
  eventUuid?: Maybe<Scalars['String']>;
  uuid?: Maybe<Scalars['String']>;
};

export type Incident = {
  __typename?: 'Incident';
  uuid: Scalars['String'];
  createdAt: Scalars['DateTime'];
  type: Scalars['String'];
  variables?: Maybe<Scalars['Json']>;
};


export type MobileAppVersion = {
  __typename?: 'MobileAppVersion';
  ios: IosAppVersion;
  android: AndroidAppVersion;
};

export type IosAppVersion = {
  __typename?: 'IosAppVersion';
  minimum: Scalars['String'];
  current: Scalars['String'];
};

export type AndroidAppVersion = {
  __typename?: 'AndroidAppVersion';
  minimum: Scalars['Int'];
  current: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  joinEvent: Attender;
  leaveEvent: Attender;
  addReaction: SupporterReaction;
  startEvent: Event;
  stopEvent: Event;
  setEventAsUpcoming: Event;
  addIncident: Incident;
  changeScore: Attender;
};


export type MutationJoinEventArgs = {
  attender: Scalars['String'];
  user: Scalars['String'];
};


export type MutationLeaveEventArgs = {
  attender: Scalars['String'];
  user: Scalars['String'];
};


export type MutationAddReactionArgs = {
  attender: Scalars['String'];
  reaction: Scalars['String'];
  user: Scalars['String'];
};


export type MutationStartEventArgs = {
  event: Scalars['String'];
};


export type MutationStopEventArgs = {
  event: Scalars['String'];
};


export type MutationSetEventAsUpcomingArgs = {
  event: Scalars['String'];
};


export type MutationAddIncidentArgs = {
  event: Scalars['String'];
  type: Scalars['String'];
  variables: Scalars['String'];
};


export type MutationChangeScoreArgs = {
  attender: Scalars['String'];
  score: Scalars['Int'];
};

export type SupporterReaction = {
  __typename?: 'SupporterReaction';
  uuid: Scalars['String'];
  createdAt: Scalars['DateTime'];
  attenderAvailableReaction: AttenderAvailableReaction;
};

export type Subscription = {
  __typename?: 'Subscription';
  attenderModified: Attender;
  attenderReactionCreated: Array<AttenderReaction>;
  eventStatusChanged: Event;
  incidentAppeared: Incident;
};


export type SubscriptionAttenderModifiedArgs = {
  event: Scalars['String'];
};


export type SubscriptionAttenderReactionCreatedArgs = {
  event: Scalars['String'];
};


export type SubscriptionEventStatusChangedArgs = {
  event: Scalars['String'];
};


export type SubscriptionIncidentAppearedArgs = {
  event: Scalars['String'];
};

export type AttenderReaction = {
  __typename?: 'AttenderReaction';
  uuid: Scalars['String'];
  createdAt: Scalars['DateTime'];
  intensity: Scalars['Float'];
  attender: Attender;
  attenderAvailableReaction: AttenderAvailableReaction;
};

export type SetEventAsUpcomingMutationVariables = {
  event: Scalars['String'];
};


export type SetEventAsUpcomingMutation = (
  { __typename?: 'Mutation' }
  & { setEventAsUpcoming: (
    { __typename?: 'Event' }
    & Pick<Event, 'status'>
  ) }
);

export type StartEventMutationVariables = {
  event: Scalars['String'];
};


export type StartEventMutation = (
  { __typename?: 'Mutation' }
  & { startEvent: (
    { __typename?: 'Event' }
    & Pick<Event, 'status'>
  ) }
);

export type StopEventMutationVariables = {
  event: Scalars['String'];
};


export type StopEventMutation = (
  { __typename?: 'Mutation' }
  & { stopEvent: (
    { __typename?: 'Event' }
    & Pick<Event, 'status'>
  ) }
);

export type ChangeScoreMutationVariables = {
  attender: Scalars['String'];
  score: Scalars['Int'];
};


export type ChangeScoreMutation = (
  { __typename?: 'Mutation' }
  & { changeScore: (
    { __typename?: 'Attender' }
    & Pick<Attender, 'uuid' | 'score'>
    & { team: (
      { __typename?: 'Team' }
      & Pick<Team, 'name' | 'logo'>
    ), availableReactions: Array<(
      { __typename?: 'AttenderAvailableReaction' }
      & Pick<AttenderAvailableReaction, 'uuid'>
      & { reaction: (
        { __typename?: 'Reaction' }
        & Pick<Reaction, 'type'>
      ) }
    )> }
  ) }
);

export type EventDetailsQueryVariables = {
  uuid: Scalars['String'];
};


export type EventDetailsQuery = (
  { __typename?: 'Query' }
  & { event: (
    { __typename?: 'Event' }
    & Pick<Event, 'uuid' | 'title' | 'plannedStartDate' | 'status'>
    & { incidents: Array<(
      { __typename?: 'Incident' }
      & Pick<Incident, 'uuid' | 'type' | 'variables' | 'createdAt'>
    )>, attenders: Array<(
      { __typename?: 'Attender' }
      & Pick<Attender, 'uuid' | 'score'>
      & { team: (
        { __typename?: 'Team' }
        & Pick<Team, 'name' | 'logo'>
      ), availableReactions: Array<(
        { __typename?: 'AttenderAvailableReaction' }
        & Pick<AttenderAvailableReaction, 'uuid'>
        & { reaction: (
          { __typename?: 'Reaction' }
          & Pick<Reaction, 'type'>
        ) }
      )> }
    )> }
  ) }
);

export type EventsListQueryVariables = {};


export type EventsListQuery = (
  { __typename?: 'Query' }
  & { events: Array<(
    { __typename?: 'Event' }
    & Pick<Event, 'uuid' | 'title' | 'plannedStartDate' | 'status'>
    & { attenders: Array<(
      { __typename?: 'Attender' }
      & Pick<Attender, 'uuid' | 'score'>
      & { team: (
        { __typename?: 'Team' }
        & Pick<Team, 'name' | 'uuid'>
      ) }
    )> }
  )> }
);

export type AttenderModifiedSubscriptionVariables = {
  event: Scalars['String'];
};


export type AttenderModifiedSubscription = (
  { __typename?: 'Subscription' }
  & { attenderModified: (
    { __typename?: 'Attender' }
    & Pick<Attender, 'uuid' | 'score'>
    & { team: (
      { __typename?: 'Team' }
      & Pick<Team, 'name' | 'logo'>
    ), availableReactions: Array<(
      { __typename?: 'AttenderAvailableReaction' }
      & Pick<AttenderAvailableReaction, 'uuid'>
      & { reaction: (
        { __typename?: 'Reaction' }
        & Pick<Reaction, 'type'>
      ) }
    )> }
  ) }
);

export type EventStatusChangedSubscriptionVariables = {
  event: Scalars['String'];
};


export type EventStatusChangedSubscription = (
  { __typename?: 'Subscription' }
  & { eventStatusChanged: (
    { __typename?: 'Event' }
    & Pick<Event, 'status'>
  ) }
);

export type AddIncidentMutationVariables = {
  event: Scalars['String'];
  variables: Scalars['String'];
};


export type AddIncidentMutation = (
  { __typename?: 'Mutation' }
  & { addIncident: (
    { __typename?: 'Incident' }
    & Pick<Incident, 'uuid' | 'type' | 'variables' | 'createdAt'>
  ) }
);

export type IncidentAppearedSubscriptionVariables = {
  event: Scalars['String'];
};


export type IncidentAppearedSubscription = (
  { __typename?: 'Subscription' }
  & { incidentAppeared: (
    { __typename?: 'Incident' }
    & Pick<Incident, 'uuid' | 'type' | 'variables' | 'createdAt'>
  ) }
);


export const SetEventAsUpcomingDocument = gql`
    mutation SetEventAsUpcoming($event: String!) {
  setEventAsUpcoming(event: $event) {
    status
  }
}
    `;
export type SetEventAsUpcomingMutationFn = ApolloReactCommon.MutationFunction<SetEventAsUpcomingMutation, SetEventAsUpcomingMutationVariables>;

/**
 * __useSetEventAsUpcomingMutation__
 *
 * To run a mutation, you first call `useSetEventAsUpcomingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetEventAsUpcomingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setEventAsUpcomingMutation, { data, loading, error }] = useSetEventAsUpcomingMutation({
 *   variables: {
 *      event: // value for 'event'
 *   },
 * });
 */
export function useSetEventAsUpcomingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetEventAsUpcomingMutation, SetEventAsUpcomingMutationVariables>) {
        return ApolloReactHooks.useMutation<SetEventAsUpcomingMutation, SetEventAsUpcomingMutationVariables>(SetEventAsUpcomingDocument, baseOptions);
      }
export type SetEventAsUpcomingMutationHookResult = ReturnType<typeof useSetEventAsUpcomingMutation>;
export type SetEventAsUpcomingMutationResult = ApolloReactCommon.MutationResult<SetEventAsUpcomingMutation>;
export type SetEventAsUpcomingMutationOptions = ApolloReactCommon.BaseMutationOptions<SetEventAsUpcomingMutation, SetEventAsUpcomingMutationVariables>;
export const StartEventDocument = gql`
    mutation StartEvent($event: String!) {
  startEvent(event: $event) {
    status
  }
}
    `;
export type StartEventMutationFn = ApolloReactCommon.MutationFunction<StartEventMutation, StartEventMutationVariables>;

/**
 * __useStartEventMutation__
 *
 * To run a mutation, you first call `useStartEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startEventMutation, { data, loading, error }] = useStartEventMutation({
 *   variables: {
 *      event: // value for 'event'
 *   },
 * });
 */
export function useStartEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<StartEventMutation, StartEventMutationVariables>) {
        return ApolloReactHooks.useMutation<StartEventMutation, StartEventMutationVariables>(StartEventDocument, baseOptions);
      }
export type StartEventMutationHookResult = ReturnType<typeof useStartEventMutation>;
export type StartEventMutationResult = ApolloReactCommon.MutationResult<StartEventMutation>;
export type StartEventMutationOptions = ApolloReactCommon.BaseMutationOptions<StartEventMutation, StartEventMutationVariables>;
export const StopEventDocument = gql`
    mutation StopEvent($event: String!) {
  stopEvent(event: $event) {
    status
  }
}
    `;
export type StopEventMutationFn = ApolloReactCommon.MutationFunction<StopEventMutation, StopEventMutationVariables>;

/**
 * __useStopEventMutation__
 *
 * To run a mutation, you first call `useStopEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStopEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [stopEventMutation, { data, loading, error }] = useStopEventMutation({
 *   variables: {
 *      event: // value for 'event'
 *   },
 * });
 */
export function useStopEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<StopEventMutation, StopEventMutationVariables>) {
        return ApolloReactHooks.useMutation<StopEventMutation, StopEventMutationVariables>(StopEventDocument, baseOptions);
      }
export type StopEventMutationHookResult = ReturnType<typeof useStopEventMutation>;
export type StopEventMutationResult = ApolloReactCommon.MutationResult<StopEventMutation>;
export type StopEventMutationOptions = ApolloReactCommon.BaseMutationOptions<StopEventMutation, StopEventMutationVariables>;
export const ChangeScoreDocument = gql`
    mutation ChangeScore($attender: String!, $score: Int!) {
  changeScore(attender: $attender, score: $score) {
    uuid
    team {
      name
      logo
    }
    score
    availableReactions {
      uuid
      reaction {
        type
      }
    }
  }
}
    `;
export type ChangeScoreMutationFn = ApolloReactCommon.MutationFunction<ChangeScoreMutation, ChangeScoreMutationVariables>;

/**
 * __useChangeScoreMutation__
 *
 * To run a mutation, you first call `useChangeScoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeScoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeScoreMutation, { data, loading, error }] = useChangeScoreMutation({
 *   variables: {
 *      attender: // value for 'attender'
 *      score: // value for 'score'
 *   },
 * });
 */
export function useChangeScoreMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangeScoreMutation, ChangeScoreMutationVariables>) {
        return ApolloReactHooks.useMutation<ChangeScoreMutation, ChangeScoreMutationVariables>(ChangeScoreDocument, baseOptions);
      }
export type ChangeScoreMutationHookResult = ReturnType<typeof useChangeScoreMutation>;
export type ChangeScoreMutationResult = ApolloReactCommon.MutationResult<ChangeScoreMutation>;
export type ChangeScoreMutationOptions = ApolloReactCommon.BaseMutationOptions<ChangeScoreMutation, ChangeScoreMutationVariables>;
export const EventDetailsDocument = gql`
    query EventDetails($uuid: String!) {
  event(uuid: $uuid) {
    uuid
    title
    plannedStartDate
    status
    incidents(orderBy: {createdAt: desc}) {
      uuid
      type
      variables
      createdAt
    }
    attenders {
      uuid
      team {
        name
        logo
      }
      score
      availableReactions {
        uuid
        reaction {
          type
        }
      }
    }
  }
}
    `;

/**
 * __useEventDetailsQuery__
 *
 * To run a query within a React component, call `useEventDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventDetailsQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useEventDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EventDetailsQuery, EventDetailsQueryVariables>) {
        return ApolloReactHooks.useQuery<EventDetailsQuery, EventDetailsQueryVariables>(EventDetailsDocument, baseOptions);
      }
export function useEventDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EventDetailsQuery, EventDetailsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EventDetailsQuery, EventDetailsQueryVariables>(EventDetailsDocument, baseOptions);
        }
export type EventDetailsQueryHookResult = ReturnType<typeof useEventDetailsQuery>;
export type EventDetailsLazyQueryHookResult = ReturnType<typeof useEventDetailsLazyQuery>;
export type EventDetailsQueryResult = ApolloReactCommon.QueryResult<EventDetailsQuery, EventDetailsQueryVariables>;
export const EventsListDocument = gql`
    query EventsList {
  events {
    uuid
    title
    plannedStartDate
    status
    attenders {
      uuid
      score
      team {
        name
        uuid
      }
    }
  }
}
    `;

/**
 * __useEventsListQuery__
 *
 * To run a query within a React component, call `useEventsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useEventsListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EventsListQuery, EventsListQueryVariables>) {
        return ApolloReactHooks.useQuery<EventsListQuery, EventsListQueryVariables>(EventsListDocument, baseOptions);
      }
export function useEventsListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EventsListQuery, EventsListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EventsListQuery, EventsListQueryVariables>(EventsListDocument, baseOptions);
        }
export type EventsListQueryHookResult = ReturnType<typeof useEventsListQuery>;
export type EventsListLazyQueryHookResult = ReturnType<typeof useEventsListLazyQuery>;
export type EventsListQueryResult = ApolloReactCommon.QueryResult<EventsListQuery, EventsListQueryVariables>;
export const AttenderModifiedDocument = gql`
    subscription attenderModified($event: String!) {
  attenderModified(event: $event) {
    uuid
    team {
      name
      logo
    }
    score
    availableReactions {
      uuid
      reaction {
        type
      }
    }
  }
}
    `;

/**
 * __useAttenderModifiedSubscription__
 *
 * To run a query within a React component, call `useAttenderModifiedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAttenderModifiedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAttenderModifiedSubscription({
 *   variables: {
 *      event: // value for 'event'
 *   },
 * });
 */
export function useAttenderModifiedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<AttenderModifiedSubscription, AttenderModifiedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<AttenderModifiedSubscription, AttenderModifiedSubscriptionVariables>(AttenderModifiedDocument, baseOptions);
      }
export type AttenderModifiedSubscriptionHookResult = ReturnType<typeof useAttenderModifiedSubscription>;
export type AttenderModifiedSubscriptionResult = ApolloReactCommon.SubscriptionResult<AttenderModifiedSubscription>;
export const EventStatusChangedDocument = gql`
    subscription EventStatusChanged($event: String!) {
  eventStatusChanged(event: $event) {
    status
  }
}
    `;

/**
 * __useEventStatusChangedSubscription__
 *
 * To run a query within a React component, call `useEventStatusChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useEventStatusChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventStatusChangedSubscription({
 *   variables: {
 *      event: // value for 'event'
 *   },
 * });
 */
export function useEventStatusChangedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<EventStatusChangedSubscription, EventStatusChangedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<EventStatusChangedSubscription, EventStatusChangedSubscriptionVariables>(EventStatusChangedDocument, baseOptions);
      }
export type EventStatusChangedSubscriptionHookResult = ReturnType<typeof useEventStatusChangedSubscription>;
export type EventStatusChangedSubscriptionResult = ApolloReactCommon.SubscriptionResult<EventStatusChangedSubscription>;
export const AddIncidentDocument = gql`
    mutation AddIncident($event: String!, $variables: String!) {
  addIncident(event: $event, type: "message", variables: $variables) {
    uuid
    type
    variables
    createdAt
  }
}
    `;
export type AddIncidentMutationFn = ApolloReactCommon.MutationFunction<AddIncidentMutation, AddIncidentMutationVariables>;

/**
 * __useAddIncidentMutation__
 *
 * To run a mutation, you first call `useAddIncidentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddIncidentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addIncidentMutation, { data, loading, error }] = useAddIncidentMutation({
 *   variables: {
 *      event: // value for 'event'
 *      variables: // value for 'variables'
 *   },
 * });
 */
export function useAddIncidentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddIncidentMutation, AddIncidentMutationVariables>) {
        return ApolloReactHooks.useMutation<AddIncidentMutation, AddIncidentMutationVariables>(AddIncidentDocument, baseOptions);
      }
export type AddIncidentMutationHookResult = ReturnType<typeof useAddIncidentMutation>;
export type AddIncidentMutationResult = ApolloReactCommon.MutationResult<AddIncidentMutation>;
export type AddIncidentMutationOptions = ApolloReactCommon.BaseMutationOptions<AddIncidentMutation, AddIncidentMutationVariables>;
export const IncidentAppearedDocument = gql`
    subscription IncidentAppeared($event: String!) {
  incidentAppeared(event: $event) {
    uuid
    type
    variables
    createdAt
  }
}
    `;

/**
 * __useIncidentAppearedSubscription__
 *
 * To run a query within a React component, call `useIncidentAppearedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useIncidentAppearedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIncidentAppearedSubscription({
 *   variables: {
 *      event: // value for 'event'
 *   },
 * });
 */
export function useIncidentAppearedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<IncidentAppearedSubscription, IncidentAppearedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<IncidentAppearedSubscription, IncidentAppearedSubscriptionVariables>(IncidentAppearedDocument, baseOptions);
      }
export type IncidentAppearedSubscriptionHookResult = ReturnType<typeof useIncidentAppearedSubscription>;
export type IncidentAppearedSubscriptionResult = ApolloReactCommon.SubscriptionResult<IncidentAppearedSubscription>;