/**
 * Supported PostgreSQL versions.
 */
export enum PostgresVersion {
  /** 9.5 */
  VALUE_9_5 = '9.5',
  /** 9.6 */
  VALUE_9_6 = '9.6',
  /** 10 */
  VALUE_10 = '10',
  /** 11 */
  VALUE_11 = '11',
  /** 12 */
  VALUE_12 = '12',
  /** 13 */
  VALUE_13 = '13',
  /** 14 */
  VALUE_14 = '14',
}

/**
 * Flags that grant Postgres privileges to users.
 */
export enum UserFlag {
  BYPASSRLS = 'BYPASSRLS',
  NOBYPASSRLS = 'NOBYPASSRLS',
  CREATEDB = 'CREATEDB',
  NOCREATEDB = 'NOCREATEDB',
  CREATEROLE = 'CREATEROLE',
  NOCREATEROLE = 'NOCREATEROLE',
  INHERIT = 'INHERIT',
  NOINHERIT = 'NOINHERIT',
  LOGIN = 'LOGIN',
  NOLOGIN = 'NOLOGIN',
  REPLICATION = 'REPLICATION',
  NOREPLICATION = 'NOREPLICATION',
  SUPERUSER = 'SUPERUSER',
  NOSUPERUSER = 'NOSUPERUSER',
}


/**
 * A Postgres user.
 */
export interface User {
  /**
   * Permission flags for the user.
   */
  readonly flags: UserFlag[];

  /**
   * An alternative namespace to store the credentials secret in.
   *
   * @default - the same namespace as the cluster.
   */
  readonly namespace?: string;
}
