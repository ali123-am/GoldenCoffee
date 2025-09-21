import UserAccount from "../UserAccount.jsx";
import AccountAccess from "../AccountAccess.jsx";
import { useContextSelector } from "use-context-selector";
import { UserInfoContext } from "../../../Context/UserInfoContext.jsx";
export default function AuthStatusMenu() {
  const isLogin = useContextSelector(UserInfoContext, (ctx) => ctx.isLogin);
  return (
    <div className="flex items-center gap-1 pr-0 xl:mr-3 group relative w-auto lg:w-45">
      <AccountAccess />
      {isLogin && (
        <UserAccount
          hovered={
            "invisible opacity-0 group-hover:opacity-100 group-hover:visible"
          }
        />
      )}
    </div>
  );
}
