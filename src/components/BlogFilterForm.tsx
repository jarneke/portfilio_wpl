import Select, { MultiValue } from "react-select";
import { tagOptions } from "@/types/types";
import { customStyles } from "@/styles/SelectStyle";

interface BlogFilterFormProps {
  onFilterChange: (filter: string[]) => void;
}

const BlogFilterForm = ({ onFilterChange }: BlogFilterFormProps) => {
  const handleFilterChange = (
    selectedOptions: MultiValue<{ value: string }>
  ) => {
    onFilterChange(selectedOptions.map((option) => option.value));
  };

  return (
    <Select
      styles={customStyles}
      isMulti
      name="tags"
      placeholder="Filter by tag(s)"
      options={tagOptions.map((opt) => ({ value: opt, label: opt }))}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={(selectedOptions) => {
        handleFilterChange(selectedOptions);
      }}
    />
  );
};

export default BlogFilterForm;
