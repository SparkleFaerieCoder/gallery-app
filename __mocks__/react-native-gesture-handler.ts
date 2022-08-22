/** Pretty frustrating that we have to add this, but the RNGH implementation
 *  of TouchableOpacity was causing tests to fail.
 */
const TouchableOpacity = (): JSX.Element => null;
export { TouchableOpacity };
