/**
 * Client-safe operator types. Keep free of server-only imports — OperatorsSection
 * is a client component. The database read lives in ./operators.server.
 */
export interface Operator {
  id: string | number;
  name: string;
  role: string;
  badge: string;
  image_url: string;
}

export interface OperatorsSectionData {
  operators: Operator[];
  hideTeamImages: boolean;
}

export const EMPTY_OPERATORS_DATA: OperatorsSectionData = {
  operators: [],
  hideTeamImages: true,
};
