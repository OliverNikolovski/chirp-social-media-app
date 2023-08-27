export interface NavigationLinks {
  first: string;
  last: string;
  next: string;
  prev: string;
}

export interface PaginationLink {
  active: boolean;
  label: string;
  url: string;
}

export interface PaginationMetaData {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}
