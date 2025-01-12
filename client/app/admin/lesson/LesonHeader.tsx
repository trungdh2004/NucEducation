import InputDebounce from "@/components/common/InputDebounce";
import { ChangeSearch } from "@/types/system.type";

interface Props {
  handleChange: (value: ChangeSearch) => void;
}

const LesonHeader = ({ handleChange }: Props) => {
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
          className="bg-white w-44 md:w-56 px-2"
        />
      </div>
    </div>
  );
};

export default LesonHeader;
