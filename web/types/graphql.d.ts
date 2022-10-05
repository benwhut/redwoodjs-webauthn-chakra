import { Prisma } from "@prisma/client"
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: number;
  Date: string;
  DateTime: string;
  JSON: Prisma.JsonValue;
  JSONObject: Prisma.JsonObject;
  Time: string;
};

export type CreateUserInput = {
  email: Scalars['String'];
  hashedPassword: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  resetToken?: InputMaybe<Scalars['String']>;
  resetTokenExpiresAt?: InputMaybe<Scalars['DateTime']>;
  roles: Scalars['String'];
  salt: Scalars['String'];
  webAuthnChallenge?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  deleteUser: User;
  updateUser: User;
};


export type MutationcreateUserArgs = {
  input: CreateUserInput;
};


export type MutationdeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationupdateUserArgs = {
  id: Scalars['Int'];
  input: UpdateUserInput;
};

/** About the Redwood queries. */
export type Query = {
  __typename?: 'Query';
  /** Fetches the Redwood root schema. */
  redwood?: Maybe<Redwood>;
  user?: Maybe<User>;
  users: Array<User>;
};


/** About the Redwood queries. */
export type QueryuserArgs = {
  id: Scalars['Int'];
};

/**
 * The RedwoodJS Root Schema
 *
 * Defines details about RedwoodJS such as the current user and version information.
 */
export type Redwood = {
  __typename?: 'Redwood';
  /** The current user. */
  currentUser?: Maybe<Scalars['JSON']>;
  /** The version of Prisma. */
  prismaVersion?: Maybe<Scalars['String']>;
  /** The version of Redwood. */
  version?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  hashedPassword?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  resetToken?: InputMaybe<Scalars['String']>;
  resetTokenExpiresAt?: InputMaybe<Scalars['DateTime']>;
  roles?: InputMaybe<Scalars['String']>;
  salt?: InputMaybe<Scalars['String']>;
  webAuthnChallenge?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  hashedPassword: Scalars['String'];
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  resetToken?: Maybe<Scalars['String']>;
  resetTokenExpiresAt?: Maybe<Scalars['DateTime']>;
  roles: Scalars['String'];
  salt: Scalars['String'];
  webAuthnChallenge?: Maybe<Scalars['String']>;
};

export type EditUserByIdVariables = Exact<{
  id: Scalars['Int'];
}>;


export type EditUserById = { __typename?: 'Query', user?: { __typename?: 'User', id: number, name?: string | null, email: string, hashedPassword: string, salt: string, resetToken?: string | null, resetTokenExpiresAt?: string | null, roles: string, webAuthnChallenge?: string | null } | null };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['Int'];
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: number, name?: string | null, email: string, hashedPassword: string, salt: string, resetToken?: string | null, resetTokenExpiresAt?: string | null, roles: string, webAuthnChallenge?: string | null } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'User', id: number } };

export type FindUserByIdVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FindUserById = { __typename?: 'Query', user?: { __typename?: 'User', id: number, name?: string | null, email: string, hashedPassword: string, salt: string, resetToken?: string | null, resetTokenExpiresAt?: string | null, roles: string, webAuthnChallenge?: string | null } | null };

export type FindUsersVariables = Exact<{ [key: string]: never; }>;


export type FindUsers = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, name?: string | null, email: string, hashedPassword: string, salt: string, resetToken?: string | null, resetTokenExpiresAt?: string | null, roles: string, webAuthnChallenge?: string | null }> };
