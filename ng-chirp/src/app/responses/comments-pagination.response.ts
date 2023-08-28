import {NavigationLinks, PaginationMetaData} from "./pagination-data";
import {AppComment} from "../models/app-comment";

export interface CommentsPaginationResponse {
  data: AppComment[];
  links: NavigationLinks;
  meta: PaginationMetaData;
}
