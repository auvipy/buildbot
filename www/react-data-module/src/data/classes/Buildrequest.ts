/*
  This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the
  MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.

  Copyright Buildbot Team Members
*/

import {BaseClass} from "./BaseClass";
import {IDataDescriptor} from "./DataDescriptor";
import {IDataAccessor} from "../DataAccessor";
import {RequestQuery} from "../DataQuery";
import {Build, buildDescriptor} from "./Build";

export class Buildrequest extends BaseClass {
  buildrequestid!: number;
  builderid!: number;
  buildsetid!: number;
  claimed!: boolean;
  claimed_at!: number|null;
  claimed_by_masterid!: number|null;
  complete!: boolean;
  complete_at!: number|null;
  priority!: number;
  properties!: {[key: string]: any}; // for subscription to properties use getProperties
  results!: number|null;
  submitted_at!: number;
  waited_for!: boolean;

  constructor(accessor: IDataAccessor, endpoint: string, object: any) {
    super(accessor, endpoint, String(object.buildrequestid));
    this.update(object);
  }

  update(object: any) {
    this.buildrequestid = object.buildrequestid;
    this.builderid = object.builderid;
    this.buildsetid = object.buildsetid;
    this.claimed = object.claimed;
    this.claimed_at = object.claimed_at;
    this.claimed_by_masterid = object.claimed_by_masterid;
    this.complete = object.complete;
    this.complete_at = object.complete_at;
    this.priority = object.priority;
    this.properties = object.properties ?? {};
    this.results = object.results;
    this.submitted_at = object.submitted_at;
    this.waited_for = object.waited_for;
  }

  toObject() {
    return {
      buildrequestid: this.buildrequestid,
      builderid: this.builderid,
      buildsetid: this.buildsetid,
      claimed: this.claimed,
      claimed_at: this.claimed_at,
      claimed_by_masterid: this.claimed_by_masterid,
      complete: this.complete,
      complete_at: this.complete_at,
      priority: this.priority,
      properties: this.properties,
      results: this.results,
      submitted_at: this.submitted_at,
      waited_for: this.waited_for,
    };
  }

  getBuilds(query: RequestQuery = {}) {
    return this.get<Build>("builds", query, buildDescriptor);
  }

  getProperties(query: RequestQuery = {}) {
    return this.getPropertiesImpl("properties", query);
  }

  static getAll(accessor: IDataAccessor, query: RequestQuery = {}) {
    return accessor.get<Buildrequest>("buildrequests", query, buildrequestDescriptor);
  }
}

export class BuildrequestDescriptor implements IDataDescriptor<Buildrequest> {
  restArrayField = "buildrequests";
  fieldId: string = "buildrequestid";

  parse(accessor: IDataAccessor, endpoint: string, object: any) {
    return new Buildrequest(accessor, endpoint, object);
  }
}

export const buildrequestDescriptor = new BuildrequestDescriptor();
