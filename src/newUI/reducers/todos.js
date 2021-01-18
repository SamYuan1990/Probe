const todos = (state = [{order:0, cmdType: 'Shell', args:['']}], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    order: state.length,
                    cmdType: 'Shell',
                    args : ['']
                }
            ];
        case 'REMOVE_TODO':
            state.pop();
            return state;
        case 'TYPE_TAPE':
            state.map(data => {
                if (data.order === action.order) {
                    data.cmdType = 'Tape';
                }
            }
            );
            return state;
        case 'TYPE_SHELL':
            state.map(data => {
                if (data.order === action.order) {
                    data.cmdType = 'Shell';
                }
            }
            );
            return state;
        case 'ADD_ARG':
            state.map(data => {
                if (data.order === action.order) {
                    data.args.push('');
                }
            }
            );
            return state;
        case 'REMOVE_ARG':
            state.map(data => {
                if (data.order === action.order) {
                    data.args.pop();
                }
            }
            );
            return state;
        default:
            return state;
    }
};

export default todos;

/*
id:{
  orderer: id,
  cmdType: string,
  args : []
}
*/