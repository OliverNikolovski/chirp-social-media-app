import {Post} from "../models/post";

export interface PostsPaginationResponse {
  data: Post[];
  links: NavigationLinks;
  meta: PaginationMetaData;
}

interface NavigationLinks {
  first: string;
  last: string;
  next: string;
  prev: string;
}

interface PaginationLink {
  active: boolean;
  label: string;
  url: string;
}

interface PaginationMetaData {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}
