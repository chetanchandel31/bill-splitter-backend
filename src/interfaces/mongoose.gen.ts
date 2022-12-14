/* tslint:disable */
/* eslint-disable */

// ######################################## THIS FILE WAS GENERATED BY MONGOOSE-TSGEN ######################################## //

// NOTE: ANY CHANGES MADE WILL BE OVERWRITTEN ON SUBSEQUENT EXECUTIONS OF MONGOOSE-TSGEN.

import mongoose from "mongoose";

/**
 * Lean version of GroupExpenseBorrowerDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `GroupExpenseDocument.toObject()`.
 * ```
 * const groupexpenseObject = groupexpense.toObject();
 * ```
 */
export type GroupExpenseBorrower = {
  user: User["_id"] | User;
  amountBorrowed: number;
  isSettled?: boolean;
  isApprovedByLender?: boolean;
  _id: mongoose.Types.ObjectId;
};

/**
 * Lean version of GroupExpenseDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `GroupDocument.toObject()`.
 * ```
 * const groupObject = group.toObject();
 * ```
 */
export type GroupExpense = {
  expenseTitle: string;
  lender: {
    user: User["_id"] | User;
    amountPaidForOwnExpense: number;
  };
  borrowers: GroupExpenseBorrower[];
  recordedAt: number;
  _id: mongoose.Types.ObjectId;
};

/**
 * Lean version of GroupDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `GroupDocument.toObject()`. To avoid conflicts with model names, use the type alias `GroupObject`.
 * ```
 * const groupObject = group.toObject();
 * ```
 */
export type Group = {
  groupName: string;
  admins: (User["_id"] | User)[];
  members: (User["_id"] | User)[];
  expenses: GroupExpense[];
  _id: mongoose.Types.ObjectId;
};

/**
 * Lean version of GroupDocument (type alias of `Group`)
 *
 * Use this type alias to avoid conflicts with model names:
 * ```
 * import { Group } from "../models"
 * import { GroupObject } from "../interfaces/mongoose.gen.ts"
 *
 * const groupObject: GroupObject = group.toObject();
 * ```
 */
export type GroupObject = Group;

/**
 * Mongoose Query type
 *
 * This type is returned from query functions. For most use cases, you should not need to use this type explicitly.
 */
export type GroupQuery = mongoose.Query<any, GroupDocument, GroupQueries> &
  GroupQueries;

/**
 * Mongoose Query helper types
 *
 * This type represents `GroupSchema.query`. For most use cases, you should not need to use this type explicitly.
 */
export type GroupQueries = {};

export type GroupMethods = {
  isAdmin: (this: GroupDocument, ...args: any[]) => any;
  isParticipant: (this: GroupDocument, ...args: any[]) => any;
};

export type GroupStatics = {};

/**
 * Mongoose Model type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Group = mongoose.model<GroupDocument, GroupModel>("Group", GroupSchema);
 * ```
 */
export type GroupModel = mongoose.Model<GroupDocument, GroupQueries> &
  GroupStatics;

/**
 * Mongoose Schema type
 *
 * Assign this type to new Group schema instances:
 * ```
 * const GroupSchema: GroupSchema = new mongoose.Schema({ ... })
 * ```
 */
export type GroupSchema = mongoose.Schema<
  GroupDocument,
  GroupModel,
  GroupMethods,
  GroupQueries
>;

/**
 * Mongoose Subdocument type
 *
 * Type of `GroupExpenseDocument["borrowers"]` element.
 */
export type GroupExpenseBorrowerDocument = mongoose.Types.Subdocument & {
  user: UserDocument["_id"] | UserDocument;
  amountBorrowed: number;
  isSettled?: boolean;
  isApprovedByLender?: boolean;
  _id: mongoose.Types.ObjectId;
};

/**
 * Mongoose Subdocument type
 *
 * Type of `GroupDocument["expenses"]` element.
 */
export type GroupExpenseDocument = mongoose.Types.Subdocument & {
  expenseTitle: string;
  lender: {
    user: UserDocument["_id"] | UserDocument;
    amountPaidForOwnExpense: number;
  };
  borrowers: mongoose.Types.DocumentArray<GroupExpenseBorrowerDocument>;
  recordedAt: number;
  _id: mongoose.Types.ObjectId;
};

/**
 * Mongoose Document type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Group = mongoose.model<GroupDocument, GroupModel>("Group", GroupSchema);
 * ```
 */
export type GroupDocument = mongoose.Document<
  mongoose.Types.ObjectId,
  GroupQueries
> &
  GroupMethods & {
    groupName: string;
    admins: mongoose.Types.Array<UserDocument["_id"] | UserDocument>;
    members: mongoose.Types.Array<UserDocument["_id"] | UserDocument>;
    expenses: mongoose.Types.DocumentArray<GroupExpenseDocument>;
    _id: mongoose.Types.ObjectId;
  };

/**
 * Lean version of UserInviteDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `UserDocument.toObject()`.
 * ```
 * const userObject = user.toObject();
 * ```
 */
export type UserInvite = {
  invitedTo?: Group["_id"] | Group;
  invitedBy?: User["_id"] | User;
  _id: mongoose.Types.ObjectId;
};

/**
 * Lean version of UserDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `UserDocument.toObject()`. To avoid conflicts with model names, use the type alias `UserObject`.
 * ```
 * const userObject = user.toObject();
 * ```
 */
export type User = {
  name: string;
  email: string;
  salt: string;
  encryptedPassword: string;
  groups: (Group["_id"] | Group)[];
  _id: mongoose.Types.ObjectId;
  invites: UserInvite[];
};

/**
 * Lean version of UserDocument (type alias of `User`)
 *
 * Use this type alias to avoid conflicts with model names:
 * ```
 * import { User } from "../models"
 * import { UserObject } from "../interfaces/mongoose.gen.ts"
 *
 * const userObject: UserObject = user.toObject();
 * ```
 */
export type UserObject = User;

/**
 * Mongoose Query type
 *
 * This type is returned from query functions. For most use cases, you should not need to use this type explicitly.
 */
export type UserQuery = mongoose.Query<any, UserDocument, UserQueries> &
  UserQueries;

/**
 * Mongoose Query helper types
 *
 * This type represents `UserSchema.query`. For most use cases, you should not need to use this type explicitly.
 */
export type UserQueries = {};

export type UserMethods = {
  getEncryptedPassword: (this: UserDocument, ...args: any[]) => any;
};

export type UserStatics = {};

/**
 * Mongoose Model type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const User = mongoose.model<UserDocument, UserModel>("User", UserSchema);
 * ```
 */
export type UserModel = mongoose.Model<UserDocument, UserQueries> & UserStatics;

/**
 * Mongoose Schema type
 *
 * Assign this type to new User schema instances:
 * ```
 * const UserSchema: UserSchema = new mongoose.Schema({ ... })
 * ```
 */
export type UserSchema = mongoose.Schema<
  UserDocument,
  UserModel,
  UserMethods,
  UserQueries
>;

/**
 * Mongoose Subdocument type
 *
 * Type of `UserDocument["invites"]` element.
 */
export type UserInviteDocument = mongoose.Types.Subdocument & {
  invitedTo?: GroupDocument["_id"] | GroupDocument;
  invitedBy?: UserDocument["_id"] | UserDocument;
  _id: mongoose.Types.ObjectId;
};

/**
 * Mongoose Document type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const User = mongoose.model<UserDocument, UserModel>("User", UserSchema);
 * ```
 */
export type UserDocument = mongoose.Document<
  mongoose.Types.ObjectId,
  UserQueries
> &
  UserMethods & {
    name: string;
    email: string;
    salt: string;
    encryptedPassword: string;
    groups: mongoose.Types.Array<GroupDocument["_id"] | GroupDocument>;
    _id: mongoose.Types.ObjectId;
    password: any;
    invites: mongoose.Types.DocumentArray<UserInviteDocument>;
  };

/**
 * Check if a property on a document is populated:
 * ```
 * import { IsPopulated } from "../interfaces/mongoose.gen.ts"
 *
 * if (IsPopulated<UserDocument["bestFriend"]>) { ... }
 * ```
 */
export function IsPopulated<T>(doc: T | mongoose.Types.ObjectId): doc is T {
  return doc instanceof mongoose.Document;
}

/**
 * Helper type used by `PopulatedDocument`. Returns the parent property of a string
 * representing a nested property (i.e. `friend.user` -> `friend`)
 */
type ParentProperty<T> = T extends `${infer P}.${string}` ? P : never;

/**
 * Helper type used by `PopulatedDocument`. Returns the child property of a string
 * representing a nested property (i.e. `friend.user` -> `user`).
 */
type ChildProperty<T> = T extends `${string}.${infer C}` ? C : never;

/**
 * Helper type used by `PopulatedDocument`. Removes the `ObjectId` from the general union type generated
 * for ref documents (i.e. `mongoose.Types.ObjectId | UserDocument` -> `UserDocument`)
 */
type PopulatedProperty<Root, T extends keyof Root> = Omit<Root, T> & {
  [ref in T]: Root[T] extends mongoose.Types.Array<infer U>
    ? mongoose.Types.Array<Exclude<U, mongoose.Types.ObjectId>>
    : Exclude<Root[T], mongoose.Types.ObjectId>;
};

/**
 * Populate properties on a document type:
 * ```
 * import { PopulatedDocument } from "../interfaces/mongoose.gen.ts"
 *
 * function example(user: PopulatedDocument<UserDocument, "bestFriend">) {
 *   console.log(user.bestFriend._id) // typescript knows this is populated
 * }
 * ```
 */
export type PopulatedDocument<DocType, T> = T extends keyof DocType
  ? PopulatedProperty<DocType, T>
  : ParentProperty<T> extends keyof DocType
  ? Omit<DocType, ParentProperty<T>> & {
      [ref in ParentProperty<T>]: DocType[ParentProperty<T>] extends mongoose.Types.Array<
        infer U
      >
        ? mongoose.Types.Array<
            ChildProperty<T> extends keyof U
              ? PopulatedProperty<U, ChildProperty<T>>
              : PopulatedDocument<U, ChildProperty<T>>
          >
        : ChildProperty<T> extends keyof DocType[ParentProperty<T>]
        ? PopulatedProperty<DocType[ParentProperty<T>], ChildProperty<T>>
        : PopulatedDocument<DocType[ParentProperty<T>], ChildProperty<T>>;
    }
  : DocType;

/**
 * Helper types used by the populate overloads
 */
type Unarray<T> = T extends Array<infer U> ? U : T;
type Modify<T, R> = Omit<T, keyof R> & R;

/**
 * Augment mongoose with Query.populate overloads
 */
declare module "mongoose" {
  interface Query<ResultType, DocType, THelpers = {}> {
    populate<T extends string>(
      path: T,
      select?: string | any,
      model?: string | Model<any, THelpers>,
      match?: any
    ): Query<
      ResultType extends Array<DocType>
        ? Array<PopulatedDocument<Unarray<ResultType>, T>>
        : ResultType extends DocType
        ? PopulatedDocument<Unarray<ResultType>, T>
        : ResultType,
      DocType,
      THelpers
    > &
      THelpers;

    populate<T extends string>(
      options: Modify<PopulateOptions, { path: T }> | Array<PopulateOptions>
    ): Query<
      ResultType extends Array<DocType>
        ? Array<PopulatedDocument<Unarray<ResultType>, T>>
        : ResultType extends DocType
        ? PopulatedDocument<Unarray<ResultType>, T>
        : ResultType,
      DocType,
      THelpers
    > &
      THelpers;
  }
}
