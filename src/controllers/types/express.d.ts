// import { JwtPayload} from 'jsonwebtoken'
import { MyjwtPayload } from './jwt.d.ts'

declare global {
    namespace Express {
        interface Request {
            user?: MyjwtPayload
        }
    }
}