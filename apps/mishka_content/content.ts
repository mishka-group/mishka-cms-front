import { contentApiRequestSender } from './helper/contentHelper';
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

export interface PostsResponse extends PublicContentResponse {
  entries: Array<ObjectResponse<any>>;
  page_number: number;
  page_size: number;
  total_entries: number;
  total_pages: number;
}

export interface PostResponse extends PublicContentResponse {
  post_info: ObjectResponse<any>;
}

export interface CategoriesResponse extends PublicContentResponse {
  categories: ObjectResponse<any>;
}

export interface CommentsResponse extends PostsResponse {}

/**
 * `posts` is a function that takes a `params` object and returns a `Promise` of a `PostsResponse` which has last 20 posts of API
 * object
 * @param params - ObjectResponse<any>
 * @returns A function that takes a parameter of type ObjectResponse<any> and returns a Promise of type
 * PostsResponse.
 */
export const posts = async (params: ObjectResponse<any>, header: object = {}) => {
  const response = await contentApiRequestSender<PostsResponse>('/content/v1/posts', params, header, 'POST');
  return response;
};

/**
 * It sends a POST request to the Content API to show a post
 * @param {string} aliasLink - The alias link of the post you want to retrieve.
 * @param {string} [status=active] - string = 'active'
 * @returns PostResponse
 */
export const post = async (aliasLink: string, status: string, header: object = {}) => {
  const response = await contentApiRequestSender<PostResponse>('/content/v1/post', { alias_link: aliasLink, status: status }, header, 'POST');
  return response;
};

export const likePost = () => {};

export const deleteLikePost = () => {};

/**
 * It sends a POST request to the /content/v1/categories endpoint, and returns the response of all categories
 * @returns A function that returns a promise that resolves to a PostsResponse
 */
export const categories = async () => {
  const response = await contentApiRequestSender<PostsResponse>('/content/v1/categories', {}, {}, 'POST');
  return response;
};

export const category = () => {};

export const comments = async (accessToken: string, postID: string, status: string, page: number = 1) => {
  const commentParams = {
    page: page,
    filters: {
      section_id: postID,
      status: status,
      section: 'blog_post',
    },
  };

  const response = await contentApiRequestSender<CommentsResponse>(
    '/content/v1/comments',
    commentParams,
    {
      Authorization: `Bearer ${accessToken}`,
    },
    'POST'
  );
  return response;
};

export const likeComment = () => {};

export const deleteCommentLike = () => {};

export const tags = () => {};

export const tagPosts = () => {};

export const createBookmark = () => {};

export const deleteBookmark = () => {};

export const createSubscription = () => {};

export const deleteSubscription = () => {};

export const postLinks = () => {};
