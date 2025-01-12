import PasswordSetting from "./PasswordSetting";
import UserSetting from "./UserSetting";


const Page = () => {
  
  return (
    <div className="w-full h-full py-4">
      <UserSetting />

      <PasswordSetting />
    </div>
  );
};

export default Page;
