import { admin_users, regular_users } from "./UserDemoData";
import { User } from "./UserTypes";
import UsersTable from "./UsersTable";

const UsersPage = () => {
  const GetUsers = (): User[][] => {
    /*
    const cookieStore = cookies();

    // query cloudflare in actual version but for demo we can use nextjs server actions
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    // now get all the users in this org
    */
    return [admin_users, regular_users];
  };

  const users = GetUsers();

  return (
    <div className="">
      <UsersTable admin_users={users[0]} regular_users={users[1]} />
    </div>
  );
};

export default UsersPage;
