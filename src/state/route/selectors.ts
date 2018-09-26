import { RootState } from '@app/state/root/reducer'
import { RouteState } from '@app/state/route/reducer'

export const selectRoute = ({ route }: RootState): RouteState => route
