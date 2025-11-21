import type {
  FilterOptionsResponse,
  GuideSearchOptions,
  GuideSearchResponse,
  SuggestResultItem,
} from "@/types/Types";
import axios from "axios";
import { config } from "@/config";

const apiClient = axios.create({
  headers: {
    Authorization: `Bearer ${config.token}`,
    "Content-Type": "application/json",
  },
});

// Only set baseURL in production, use proxy in development
if (!import.meta.env.DEV) {
  apiClient.defaults.baseURL = config.apiUrl;
}

function buildSearchParams(options: GuideSearchOptions) {
  const params: Record<string, unknown> = {};

  if (options.searchQuery) params.searchQuery = options.searchQuery;

  if (options.topicIDs?.length) params["topicID[]"] = options.topicIDs;

  if (options.types?.length) params["type[]"] = options.types;

  if (options.language) {
    if (Array.isArray(options.language)) params["language"] = options.language;
  }

  if (options.page) params.page = options.page;
  if (options.hitsPerPage) params.hitsPerPage = options.hitsPerPage;

  if (options.searchable) params["searchable[]"] = options.searchable;

  if (options.keywords) params["keywords[]"] = options.keywords;

  if (options.includeProcess !== undefined) params.includeProcess = options.includeProcess;

  if (options.sort !== undefined) params["sort[]"] = options.sort;

  return params;
}

export async function searchGuides(options: GuideSearchOptions): Promise<GuideSearchResponse> {
  const params = buildSearchParams(options);

  const res = await apiClient.get("/API/public/guides", {
    params,
  });

  return res.data as GuideSearchResponse;
}

export async function suggestGuides(
  query: string,
  options?: {
    topicIDs?: number[];
    types?: number[];
  },
): Promise<SuggestResultItem[]> {
  const params: Record<string, unknown> = { searchQuery: query };

  if (options?.topicIDs?.length) params["topicID[]"] = options.topicIDs;

  if (options?.types?.length) params["type[]"] = options.types;

  const res = await apiClient.get("/API/public/guides/suggest", {
    params,
  });

  return res.data;
}

export async function getFilterOptions(subPage?: string): Promise<FilterOptionsResponse> {
  const res = await apiClient.get(`/API/filters/options/${subPage || ""}`);
  return res.data;
}

export const icApi = {
  searchGuides,
  suggestGuides,
};

export default icApi;
