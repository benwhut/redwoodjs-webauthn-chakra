import User from 'src/components/Admin/User/User'

export const QUERY = gql`
  query FindUserById($id: Int!) {
    user: user(id: $id) {
      id
      name
      email
      hashedPassword
      salt
      resetToken
      resetTokenExpiresAt
      roles
      webAuthnChallenge
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>User not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ user }) => {
  return <User user={user} />
}
