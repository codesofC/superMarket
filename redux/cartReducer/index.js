
const INITIAL_STATE = {
    cart: []
}

export const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'INITIALIZEDATABASE':

            return {
                cart: action.payload
            }
        case 'ADDITEM':
            const indexItem = state.cart.findIndex(obj => obj.id === action.payload.id)

            if(indexItem !== -1){
                const updatedItem = {
                    ...state.cart[indexItem],
                    quantity: state.cart[indexItem].quantity + action.payload.quantity
                }

                const newArray = [...state.cart]
                newArray.splice(indexItem, 1, updatedItem)

                return {
                    cart: newArray
                }
            }else{
                const newArray = [...state.cart]
                newArray.push(action.payload)

                return {
                    cart: newArray
                }
            }
        case "UPDATEITEM":
            const indexItemUpdate = state.cart.findIndex(item => item.id === action.payload.id)
            const updatedItem = {
                ...state.cart[indexItemUpdate],
                quantity: action.payload.quantity
            }
            const newArray = [...state.cart]
            newArray.splice(indexItemUpdate, 1, updatedItem)

            return {
                cart: newArray
            }
        case "DELETEITEM":
            const newArr = state.cart.filter(item => item.id !== action.payload.id)

            return {
                cart: newArr
            }
        case "RESETCART":

            return {
                cart: []
            }
        default: return {
            cart: state.cart
        }
    }
}