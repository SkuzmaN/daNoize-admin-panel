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

export type EventDetailsQueryVariables = {
  uuid: Scalars['String'];
};


export type EventDetailsQuery = (
  { __typename?: 'Query' }
  & { event: (
    { __typename?: 'Event' }
    & Pick<Event, 'uuid' | 'title'>
    & { incidents: Array<(
      { __typename?: 'Incident' }
      & Pick<Incident, 'uuid' | 'type' | 'variables'>
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


export const EventDetailsDocument = gql`
    query EventDetails($uuid: String!) {
  event(uuid: $uuid) {
    uuid
    title
    incidents {
      uuid
      type
      variables
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