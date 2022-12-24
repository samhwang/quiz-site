import { useAuth0 } from '@auth0/auth0-react'
import { trpc } from '../providers/trpc';

function IndexPage() {
  const { data: me } = trpc.user.me.useQuery();
  const { isAuthenticated, isLoading, user } = useAuth0()
  console.log(user)

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto'>
      <div className="flex flex-col justify-center">
        <p className='text-center'>
          {me} - {user?.email}
        </p>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
    </div>
  );
}

export default IndexPage;

function LoginButton() {
  const { loginWithRedirect } = useAuth0()

  return (
    <button onClick={() => loginWithRedirect()}>
      Log in
    </button>
  )
}

function LogoutButton() {
  const { logout } = useAuth0()

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log out
    </button>
  )
}