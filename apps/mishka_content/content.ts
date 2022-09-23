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

export const posts = async (accessToken: string, params: ObjectResponse<any>) => {
  const response = await contentApiRequestSender<PostsResponse>(
    '/content/v1/posts',
    params,
    {
      Authorization: `Bearer ${accessToken}`,
    },
    'POST'
  );
  return response;
};

export const post = async (accessToken: string, aliasLink: string, status: string = 'active') => {
  const response = await contentApiRequestSender<PostResponse>(
    '/content/v1/post',
    { alias_link: aliasLink, status: status },
    {
      Authorization: `Bearer ${accessToken}`,
    },
    'POST'
  );
  return response;
};

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
