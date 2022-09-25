import type { NextPage } from 'next';
import Link from 'next/link';

interface PostTagsTypes {
  tags: { [key: string]: any }[];
}

const PostTags: NextPage<PostTagsTypes> = ({ tags }) => {
  return (
    <>
      <hr />
      <section className="client-post-footer vazir" id="client-blog-post-tags">
        <span>
          {tags.map((item) => (
            <span className="badge rounded-pill bg-secondary mx-1" key={item.id}>
              <Link href={`/blog/tag/${item.alias_link}`}>
                <a className="tag-live-link">{item.title}</a>
              </Link>
            </span>
          ))}
        </span>
      </section>
      <hr />
    </>
  );
};

export default PostTags;
