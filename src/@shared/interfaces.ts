import { PrismaClient } from "@prisma/client";

// FilterNotStartingWith -> filtra todos os atributos que não comecem com uma certa string:
// Exemplo: "FilterNotStartingWith<keyof PrismaClient, "$">;"
// Nesse exemplo, ele irá filtrar por todas as propriedades que não comece com "$"
type FilterNotStartingWith<Set, Needle extends string> = Set extends
  | `${Needle}${infer _X}`
  | symbol
  ? never
  : Set;

// UnionToIntersection -> converter os tipos de "união" (|) para "interseção" (&).
type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (
  x: infer I
) => void
  ? I
  : never;

type PrismaClientKeys = FilterNotStartingWith<keyof PrismaClient, "$">;
type PrismaClientGeneric = UnionToIntersection<PrismaClient[PrismaClientKeys]>;

type DynamicParamsIdFinder = {
  searchKey: `${PrismaClientKeys}Id` | string & {};
  error: string;
  model: PrismaClientKeys;
};

export { DynamicParamsIdFinder, PrismaClientGeneric };
