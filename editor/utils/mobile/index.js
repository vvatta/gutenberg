/**
 * Internal dependencies
 */
import { isMobile } from '../../selectors';
import { toggleSidebar } from '../../actions';

/**
 * Disables isSidebarOpened on rehydrate payload if the user is on a mobile screen size.
 *
 * @param  {Object}  payload   rehydrate payload
 * @param  {Boolean} isMobile  flag indicating if executing on mobile screen sizes or not
 *
 * @return {Object}            rehydrate payload with isSidebarOpened disabled if on mobile
 */
export const disableIsSidebarOpenedOnMobile = ( payload ) => (
	payload.isSidebarOpenedMobile ? { ...payload, isSidebarOpenedMobile: false } : payload
);

/**
 * Middleware
 */

export const mobileMiddleware = ( { getState } ) => next => action => {
	if ( action.type === 'REDUX_REHYDRATE' ) {
		return next( {
			type: 'REDUX_REHYDRATE',
			payload: disableIsSidebarOpenedOnMobile( action.payload ),
		} );
	}
	if ( action.type === 'TOGGLE_SIDEBAR' && action.isMobile === undefined ) {
		return next( toggleSidebar( isMobile( getState() ) ) );
	}
	return next( action );
};
