/**
 * Community and registration payload data models.
 */
export interface CommunityJoinPayload {
  name: string;
  email: string;
  country: string;
  dreamCulture?: string;
  reflectionNote?: string;
  hasOfferedStay?: boolean;
}

export interface CommunityMemberData {
  id: string;
  name: string;
  email: string;
  country: string;
  dreamCulture?: string | null;
  hasOfferedStay?: boolean;
  createdAt?: string;
}

export interface CommunityStats {
  totalMembers: number;
  countriesCount: number;
  topCountries: Array<{ country: string; count: number }>;
  activeExchanges: number;
}
