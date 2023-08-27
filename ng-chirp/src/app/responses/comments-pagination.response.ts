import {NavigationLinks, PaginationMetaData} from "./pagination-data";

export interface CommentsPaginationResponse {
  data: Comment[];
  links: NavigationLinks;
  meta: PaginationMetaData;
}
