type ObjectResponse<T> = { [key: string]: T };

interface PublicContentResponse {
  status?: number | string;
  statusText?: string;
  url?: string;
  action: string;
  message: string;
  system: 'content';
  errors?: { [key: string]: any };
}

interface PostsResponse extends PublicContentResponse {
  entries: Array<ObjectResponse<any>>;
  page_number: number;
  page_size: number;
  total_entries: number;
  total_pages: number;
}

interface PostResponse extends PublicContentResponse {
  post_info: ObjectResponse<any>;
}

export const posts = () => {};

export const post = () => {};

export const likePost = () => {};

export const deleteLikePost = () => {};

export const categories = () => {};

export const category = () => {};

export const comments = () => {};

export const likeComment = () => {};

export const deleteCommentLike = () => {};

export const tags = () => {};

export const tagPosts = () => {};

export const createBookmark = () => {};

export const deleteBookmark = () => {};

export const createSubscription = () => {};

export const deleteSubscription = () => {};

export const postLinks = () => {};
