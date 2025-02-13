interface TagBadgeProps {
  tag: string;
  key: any;
}

const formatTag = (tag: string) => tag.replace(/\s+/g, "_").toLowerCase();

const TagBadge = ({ tag, key }: TagBadgeProps) => (
  <div
    key={key}
    className={`rounded-lg py-1 px-2 text-nowrap ${formatTag(tag)}`}
  >
    {tag}
  </div>
);

export default TagBadge;
