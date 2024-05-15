import { PrismaClient } from "@prisma/client";
import { error } from "console";

// FilterNotStartingWith -> filtra todos os atributos que não comecem com uma certa string:
// Exemplo: "FilterNotStartingWith<keyof PrismaClient, "$">;"
// Nesse exemplo, ele irá filtrar por todas as propriedades que não comece com "$"
export type FilterNotStartingWith<Set, Needle extends string> = Set extends
  | `${Needle}${infer _X}`
  | symbol
  ? never
  : Set;

// UnionToIntersection -> converter os tipos de "união" (|) para "interseção" (&).
export type UnionToIntersection<U> = (
  U extends any ? (x: U) => void : never
) extends (x: infer I) => void
  ? I
  : never;

export type PrismaClientKeys = FilterNotStartingWith<keyof PrismaClient, "$">;
export type PrismaClientGeneric = UnionToIntersection<
  PrismaClient[PrismaClientKeys]
>;

export type DynamicParamsIdFinder = {
  searchKey: `${PrismaClientKeys}Id` | (string & {});
  error: string;
  model: PrismaClientKeys;
};

export type FindUniqueValues = {
  [key in PrismaClientKeys]: keyof Parameters<
    PrismaClient[key]["findUnique"]
  >[0]["where"];
};

export type PrismaUniqueWhereClause = {
  [key in PrismaClientKeys]: Parameters<
    PrismaClient[key]["findUnique"]
  >[0]["where"];
};

export type PrismaUniqueWhereClauseDynamic = UnionToIntersection<
  PrismaUniqueWhereClause[PrismaClientKeys]
>;

export type DynamicUniqueFieldFinder<PCK extends PrismaClientKeys> = {
  field: FindUniqueValues[PCK];
  error: string;
  model: PCK;
};
