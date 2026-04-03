import { Button } from "../Components/Button";
import { Input } from "../Components/Input";

export function SignUp() {
  return (
    <div className="bg-gray-200 h-screen w-screen flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input placeholder="UserName" />
        <Input placeholder="Password" />
        <div className="pt-4 flex justify-center">
                  <Button varient="primary" text="SignUp" fullWidth={true} loading={false} />
        </div>
      </div>
    </div>
  );
}
