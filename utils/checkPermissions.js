import { UnauthenticatedError } from '../errors/index.js'

const checkPermissions = (requestUser, ressourceUserId) => {
  if (requestUser.userId === ressourceUserId.toString()) return
  throw new UnauthenticatedError('Not autorized to access this route')
}

export default checkPermissions
