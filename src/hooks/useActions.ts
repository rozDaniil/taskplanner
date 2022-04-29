import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { AuthActionCreators } from '../store/reducers/auth/action-creators'
import { EventActionCreatos } from '../store/reducers/event/action-creators'


export const useAction = () => {
    const dispatch = useDispatch()
    return bindActionCreators({...AuthActionCreators,...EventActionCreatos}, dispatch)
}