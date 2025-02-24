interface TagBadgeProps {
  tag: string;
  className?: string;
}

const formatTag = (tag: string) => tag.replace(/\s+/g, "_").toLowerCase();

const TagBadge = ({ tag, className }: TagBadgeProps) => (
  <div
    className={`rounded-lg py-1 px-2 text-nowrap ${formatTag(
      tag
    )} ${className}`}
  >
    {tag}
  </div>
);

export default TagBadge;
