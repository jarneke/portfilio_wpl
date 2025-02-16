interface TagBadgeProps {
  tag: string;
  key: any;
  className?: string;
}

const formatTag = (tag: string) => tag.replace(/\s+/g, "_").toLowerCase();

const TagBadge = ({ tag, key, className }: TagBadgeProps) => (
  <div
    className={`rounded-lg py-1 px-2 text-nowrap ${formatTag(
      tag
    )} ${className}`}
  >
    {tag}
  </div>
);

export default TagBadge;
