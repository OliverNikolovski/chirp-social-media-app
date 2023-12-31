import {Post} from "../models/post";
import {NavigationLinks, PaginationMetaData} from "./pagination-data";

export interface PostsPaginationResponse {
  data: Post[];
  links: NavigationLinks;
  meta: PaginationMetaData;
}
