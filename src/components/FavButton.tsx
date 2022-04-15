import { Button } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import {theme} from '../themes/Theme';

export function FavButton() {
    return( 
        <Button>
            <Ionicons name='star-outline' size={12} color={theme.colors.background} />
        </Button>
    )
}

export default FavButton;