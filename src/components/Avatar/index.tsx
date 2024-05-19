import { userLogout } from "@/redux/slice/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import avatarDefault from "@/assets/logo/avatar/avatar_default.svg";

const Avatar = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="cursor-pointer rounded-full border-2 border-[#493CE7] relative group/avatar">
      <div className="flex_center overflow-hidden w-11 h-11">
        <img
          src={
            user?.avatar
              ? `${import.meta.env.VITE_API_URL}/api/v1/blobs/${
                  user.avatar
                }`
              : avatarDefault
          }
          alt="avatar"
          width={42}
          height={42}
        />
      </div>

      <div className="absolute right-0 top-full min-w-[130px] transition-all origin-top-right opacity-0 scale-0 group-hover/avatar:opacity-100 group-hover/avatar:scale-100">
        <div className="p-2 bg-white rounded-xl shadow-lg border border-[#EAECF0] overflow-hidden ">
          <div
            className="p-2 hover:bg-slate-200 transition-colors"
            onClick={() => dispatch(userLogout())}
          >
            <p className="text-[#64748B] text-sm font-semibold">LogOut</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
