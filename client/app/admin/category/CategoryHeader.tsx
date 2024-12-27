import InputDebounce from "@/components/common/InputDebounce";
import { Button } from "@/components/ui/button";
import { ChangeSearch } from "@/types/system.type";

interface Props {
  handleOpen: () => void;
  handleChange: (value: ChangeSearch) => void;
}

const CategoryHeader = ({ handleOpen, handleChange }: Props) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <div>
        <InputDebounce
          placeholder="Tìm kiếm..."
          handleChange={(value) => {
            console.log("value", value);
            handleChange({
              keyword: value,
            });
          }}
          className="bg-white w-44 md:w-56"
        />
      </div>
      <div>
        <Button onClick={handleOpen}>Thêm môn</Button>
      </div>
    </div>
  );
};

export default CategoryHeader;
