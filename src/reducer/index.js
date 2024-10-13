export const initTodo = {
    id: null,
    job: '',
    status: false, // Thêm thuộc tính status mặc định
};

const productsReducer = (state, action) => {
    console.log("Action received in reducer:", action);
    switch (action.type) { 
        case 'todoList/onSave':
            const newTodo = { ...action.payload }; 
            return {
                ...state,
                todoList: [...state.todoList, newTodo] 
            };

        case 'todoList/onStatus':
            // Cập nhật trạng thái `status` cho sản phẩm tại index tương ứng
            return {
                ...state,
                todoList: state.todoList.map((todo, index) =>
                    index === action.payload.index ? { ...todo, status: !todo.status } : todo
                ),
            };

        default:
            return state;
    }
};

const reducer = (state, action) => {
    return productsReducer(state, action);
};

export default reducer;
